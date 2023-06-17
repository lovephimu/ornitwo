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

export type UserWithPasswordHash = User & {
  passwordHash: string;
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

export type Session = {
  id: number;
  token: string;
  userId: number;
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

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT id, username FROM users
    WHERE users.username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});

// POST USER METHODS

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
  INSERT INTO users
  (username, password_hash)
  VALUES (${username}, ${passwordHash})
  RETURNING id, username
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

// Sessions

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export const createSession = cache(async (token: string, userId: number) => {
  const [session] = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      id,
      token,
      user_id
  `;

  // delete all sessions that are expired
  await deleteExpiredSessions();

  return session;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});

export const getValidSessionByToken = cache(async (token: string) => {
  // Get the session if match the token AND is not expired
  const [session] = await sql<{ id: number; token: string }[]>`
    SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;

  return session;
});
