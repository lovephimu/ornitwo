import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { GraphQLError } from 'graphql';
// import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { getBirds } from '../../../database/database';

// SCHEMA GRAPHQL

const typeDefs = gql`
  type Query {
    birds: [Bird]
  }
  type Bird {
    id: ID!
    name: String!
    species: String
  }
`;

// RESOLVERS

const resolvers = {
  Query: {
    birds: async () => {
      return await getBirds();
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
