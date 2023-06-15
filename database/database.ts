import { cache } from 'react';
import { sql } from './connect';

// generate fake object

export type User = {
  id: number;
  username: string;
  // email: string;
  password_hash: string;
  // created: string;
  // updated: string;
};

export type Bird = {
  id: number;
  name: string;
  species: string;
};

export type Sighting = {
  id: number;
  userId: number;
  birdId: number;
};

// GET BIRD METHODS
// array destructuring in second function because only one result expected

export const getBirds = cache(async () => {
  const birds = await sql<Bird[]>`
SELECT * FROM birds
`;
  return birds;
});

export const getBirdById = cache(async (id: number) => {
  const [bird] = await sql<Bird[]>`
  SELECT * FROM birds
  WHERE id = ${id}
  `;
  return bird;
});

// GET USER METHODS

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
SELECT * FROM users
`;
  return users;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
  SELECT * FROM users
  WHERE id = ${id}
  `;
  return user;
});

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
  INSERT INTO users
  (username, password_hash)
  VALUES (${username}, ${passwordHash})
  RETURNING *
  `;
    return user;
  },
);

// GET SIGHTING METHODS

export const getSightings = cache(async () => {
  const sightings = await sql<Sighting[]>`
  SELECT * FROM sightings
`;
  return sightings;
});

export const getSightingById = cache(async (id: number) => {
  const [sighting] = await sql<Sighting[]>`
  SELECT * FROM sightings
  WHERE id = ${id}
  `;
  return sighting;
});

export const getSightingsByUserId = cache(async (id: number) => {
  const sightingByUser = await sql<Sighting[]>`
  SELECT * FROM sightings
  WHERE user_id = ${id};
  `;
  return sightingByUser;
});

export const getSightingsByBirdId = cache(async (id: number) => {
  const sightingByBird = await sql<Sighting[]>`
  SELECT * FROM sightings
  WHERE bird_id = ${id};
  `;
  return sightingByBird;
});
