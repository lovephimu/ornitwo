import crypto from 'node:crypto';
import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import {
  createSession,
  createSightingReport,
  createUser,
  deleteSessionByToken,
  getBirdById,
  getBirdIdByName,
  getBirds,
  getSightingById,
  getSightings,
  getSightingsByBirdId,
  getSightingsByUserId,
  getUserById,
  getUserByUsername,
  getUsers,
  getUserWithPasswordHashByUsername,
  getValidSessionByToken,
} from '../../../database/database';
import { secureCookieOptions } from '../../../util/cookies';

// TS Types

type Token = {
  token: string;
};

type IsUserContext = {
  isUser: { id: number; token: string } | null;
};

// SCHEMA GRAPHQL

const typeDefs = gql`
  type Query {
    "Fetch all birds"
    birds: [Bird]
    "Fetch a bird by ID"
    bird(id: ID!): Bird
    "Fetch all users"
    users: [User]
    "Fetch a user by ID"
    user(id: ID!): User
    "Fetch all sightings"
    sightings: [Sighting]
    "Fetch a sighting by ID"
    sighting(id: ID!): Sighting
    "Fetch a sighting by user ID"
    sightingsByUser(id: ID!): [Sighting]
    "Fetch a sighting by bird ID"
    sightingsByBird(id: ID!): [Sighting]
  }
  type Mutation {
    "Add a new user"
    createNewUser(username: String!, passwordToHash: String!): User
    "Login with zod checks and session creation"
    login(username: String!, password: String!): User
    "Logout by deleting sessionToken"
    logout(token: String!): Token
    "Create a new sighting entry"
    createSighting(
      userId: Int!
      birdName: String!
      location: String
      timeStamp: String
      lat: Float
      lng: Float
    ): Sighting
  }
  type Bird {
    "The bird's ID"
    id: ID!
    "The bird's common name"
    name: String!
    "The bird's scientific name"
    species: String
    "Short description"
    bio: String
  }

  type User {
    "User ID"
    id: ID!
    "Username"
    username: String!
    "Encrypted password"
    passwordHash: String
    "Sightings by user"
    sightings: [Sighting]
    "Individual user pic"
    userPic: String
  }

  type Sighting {
    "Sighting ID"
    id: ID!
    "User ID"
    userId: ID!
    "Bird ID"
    birdId: ID!
    "Location"
    location: String
    "Timestamp"
    timeStamp: String
    "Related Bird"
    birdData: Bird
    "Related User"
    userData: User
    "Latitude"
    lat: Float
    "Longitude"
    lng: Float
  }

  type Token {
    "Token name"
    token: String
  }
`;

// RESOLVERS

const resolvers = {
  Query: {
    birds: async () => {
      return await getBirds();
    },
    bird: async (parent: null, args: { id: number }) => {
      return await getBirdById(args.id);
    },
    users: async () => {
      return await getUsers();
    },
    user: async (parent: null, args: { id: number }) => {
      return await getUserById(args.id);
    },
    sightings: async () => {
      return await getSightings();
    },
    sighting: async (parent: null, args: { id: number }) => {
      return await getSightingById(args.id);
    },
    sightingsByUser: async (parent: null, args: { id: number }) => {
      return await getSightingsByUserId(args.id);
    },
    sightingsByBird: async (parent: null, args: { id: number }) => {
      return await getSightingsByBirdId(args.id);
    },
  },

  Mutation: {
    createNewUser: async (
      parent: null,
      args: { username: string; passwordToHash: string },
    ) => {
      // check if input contains data
      if (!args.username || !args.passwordToHash) {
        throw new GraphQLError('Required field is missing');
      }
      // zod check if username length is ok
      const username = z.string().nonempty().min(3).max(30);
      if (!username.safeParse(args.username).success) {
        throw new GraphQLError(
          'Username must be between 3 and 30 characters long.',
        );
      }
      // zod check password
      const password = z.string().min(3).max(10);
      if (!password.safeParse(args.passwordToHash).success) {
        throw new GraphQLError(
          'Password must be between 3 and 10 characters long and contain at least one number and one special character.',
        );
      }
      // compare username to database
      const user = await getUserByUsername(args.username);
      if (user) {
        throw new GraphQLError('Username already exists.');
      }
      // encrypt password
      const hashedPassword = await bcrypt.hash(args.passwordToHash, 10);
      // create User and check process
      const newUser = await createUser(args.username, hashedPassword);
      if (!newUser) {
        throw new GraphQLError(
          'Internal server error (500): User creation failed',
        );
      }
      // create token for newly registered user
      const token = crypto.randomBytes(100).toString('base64');

      // create session for new user
      const session = await createSession(token, newUser.id);

      // test whether session creation succeeded
      if (!session) {
        throw new GraphQLError('Creating session failed');
      }

      await cookies().set({
        name: 'sessionToken',
        value: session.token,
        ...secureCookieOptions,
      });

      return newUser;
    },
    login: async (
      parent: null,
      args: { username: string; password: string },
    ) => {
      // if (context.isUserLoggedIn) {
      //   throw new GraphQLError('Unauthorized operation');
      // }

      // zod check definition
      const username = z.string().min(1);
      const password = z.string().min(1);

      // zod input check
      if (
        !args.username ||
        !args.password ||
        !username.safeParse(args.username).success ||
        !password.safeParse(args.password).success
      ) {
        throw new GraphQLError('Credentials are not valid');
      }

      // check if username exists
      const userWithPasswordHash = await getUserWithPasswordHashByUsername(
        args.username,
      );
      if (!userWithPasswordHash) {
        throw new GraphQLError("Credentials don't match");
      }

      // check if password compares to hash
      const isPasswordValid = await bcrypt.compare(
        args.password,
        userWithPasswordHash.passwordHash,
      );
      if (!isPasswordValid) {
        throw new GraphQLError("Credentials don't match");
      }

      // create token for newly registered user
      const token = crypto.randomBytes(100).toString('base64');

      // create session for new user
      const session = await createSession(token, userWithPasswordHash.id);

      // test whether session creation succeeded
      if (!session) {
        throw new GraphQLError('Creating session failed');
      }

      await cookies().set({
        name: 'sessionToken',
        value: session.token,
        ...secureCookieOptions,
      });

      return userWithPasswordHash;
    },
    logout: async (parent: null, args: Token) => {
      if (!args.token) return undefined;
      const cookieStore = cookies();
      const token = cookieStore.get(args.token);

      // delete the session from the database
      if (token) await deleteSessionByToken(token.value);

      // set the cookie to be expired
      await cookies().set('sessionToken', '', { maxAge: -1 });
      // return await deleteSessionByToken(args.token);
    },
    createSighting: async (
      parent: null,
      args: {
        userId: number;
        birdName: string;
        location: string;
        timeStamp: string;
        lat: number;
        lng: number;
      },
      context: IsUserContext,
    ) => {
      if (context.isUser === null) {
        throw new GraphQLError('Unauthorized operation');
      }
      const birdData = await getBirdIdByName(args.birdName);

      if (!birdData) {
        throw new GraphQLError('Bird name not in database.');
      }

      const newSighting = await createSightingReport(
        args.userId,
        birdData.id,
        args.location,
        args.timeStamp,
        args.lat,
        args.lng,
      );

      await cookies().set({
        name: 'reportSummary',
        value: newSighting!.id.toString(),
        ...secureCookieOptions,
      });

      return newSighting;
    },
  },

  // resolver for type user and field sightings

  User: {
    sightings: async (parent: { id: number }) => {
      return await getSightingsByUserId(parent.id);
    },
  },

  Sighting: {
    birdData: async (parent: { birdId: number }) => {
      const birdData = await getBirdById(parent.birdId);
      return birdData;
    },
    userData: async (parent: { userId: number }) => {
      const userData = await getUserById(parent.userId);
      return userData;
    },
  },
};

// APOLLO SERVER CONFIG

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

// run Apollo in context of next.js - handler not necessary in node for example

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req) => {
    const sessionToken = req.cookies.get('sessionToken');

    const isUser = sessionToken
      ? await getValidSessionByToken(sessionToken.value)
      : null;

    return await { req, isUser };
  },
});

export async function GET(req: NextRequest): Promise<NextResponse<any>> {
  return (await handler(req)) as NextResponse<any>;
}

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  return (await handler(req)) as NextResponse<any>;
}

// export default startServerAndCreateNextHandler(apolloServer, {
//   context: async (req, res) => {
//     const user = await getUserBySessionToken(req.cookies.sessionToken!);
//     const isUserLoggedIn = user ? true : false;
//     return { req, res, isUserLoggedIn, user };
//   },
// });

// export async function GET(req: NextRequest) {
//   return await handler(req);
// }

// export async function POST(req: NextRequest) {
//   return await handler(req);
// }
