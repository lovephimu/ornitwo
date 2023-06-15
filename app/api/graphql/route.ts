import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { GraphQLError } from 'graphql';
// import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import {
  createUser,
  getBirdById,
  getBirds,
  getSightingById,
  getSightings,
  getSightingsByBirdId,
  getSightingsByUserId,
  getUserById,
  getUsers,
} from '../../../database/database';

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
    createNewUser(username: String, passwordHash: String): User
  }
  type Bird {
    "The bird's ID"
    id: ID!
    "The bird's common name"
    name: String!
    "The bird's scientific name"
    species: String
  }

  type User {
    "User ID"
    id: ID!
    "Username"
    username: String!
    "User's email"
    email: String!
    "Encrypted password"
    passwordHash: String
    "Sightings by user"
    sightings: [Sighting]
  }

  type Sighting {
    "Sighting ID"
    id: ID!
    "User ID"
    userId: ID!
    "Bird ID"
    birdId: ID!
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
      args: { username: string; passwordHash: string },
    ) => {
      return await createUser(args.username, args.passwordHash);
    },
  },

  // resolver for type user and field sightings

  User: {
    sightings: async (parent: { id: number }) => {
      return await getSightingsByUserId(parent.id);
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
    return await { req };
  },
});

export async function GET(req: NextRequest) {
  return await handler(req);
}

export async function POST(req: NextRequest) {
  return await handler(req);
}
