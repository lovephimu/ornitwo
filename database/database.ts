import { cache } from 'react';
import { sql } from './connect';

// generate fake object

export type User = {
  id: number;
  username: string;
  passwordHash: string | null;
  userPic: string | null;
};

export type UserWithPasswordHash = User & {
  passwordHash: string | null;
};

export type UserWithoutSession = {
  id: number;
  username: string;
};

export type UserWithPic = {
  id: number;
  username: string;
  userPic: string | null;
};

export type Bird = {
  id: number;
  name: string;
  species: string | null;
  bio: string | null;
};

export type Sighting = {
  id: number;
  userId: number;
  birdId: number;
  location: string | null;
  timeStamp: string | null;
  lat: number | null;
  lng: number | null;
};

export type SightingUsername = {
  id: number;
  userId: number;
  username: string | null;
};
export type SightingBirdName = {
  id: number;
  birdId: number;
  name: string | null;
  species: string | null;
};

export type Session = {
  id: number;
  token: string;
  userId: number | null;
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

export const getBirdIdByName = cache(async (birdName: string) => {
  const [bird] = await sql<Bird[]>`
  SELECT * FROM birds
  WHERE name = ${birdName}
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
  const [user] = await sql<UserWithoutSession[]>`
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
  const [user] = await sql<UserWithoutSession[]>`
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
    const [user] = await sql<UserWithoutSession[]>`
  INSERT INTO users
  (username, password_hash)
  VALUES (${username.toLowerCase()}, ${passwordHash})
  RETURNING id, username
  `;
    return user;
  },
);

export const changeUserPic = cache(async (id: number, userPic: string) => {
  const [user] = await sql<UserWithPic[]>`
  UPDATE users
  SET user_pic = ${userPic}
  WHERE id = ${id}
  RETURNING id, username, user_pic
  `;
  return user;
});

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

export const getJointUserSightings = cache(async () => {
  const usernameSightings = await sql<SightingUsername[]>`
  SELECT sightings.id, sightings.user_id, users.username FROM sightings LEFT JOIN users ON sightings.user_id = users.id`;
  return usernameSightings;
});

export const getJointBirdSightings = cache(async () => {
  const birdNameSightings = await sql<SightingBirdName[]>`
  SELECT sightings.id, sightings.bird_id, birds.name, birds.species FROM sightings LEFT JOIN birds ON sightings.bird_id = birds.id`;
  return birdNameSightings;
});

// POST SIGHTING METHODS

export const createSightingReport = cache(
  async (
    userId: number,
    birdId: number,
    location: string,
    timeStamp: string,
    lat: number,
    lng: number,
  ) => {
    const [sighting] = await sql<Sighting[]>`
  INSERT INTO sightings
  (user_id, bird_id, location, time_stamp, lat, lng)
  VALUES (${userId}, ${birdId}, ${location}, ${timeStamp}, ${lat},${lng})
  RETURNING id, user_id, bird_id, location, time_stamp, lat, lng
  `;
    return sighting;
  },
);

export const deleteSightingById = cache(async (id: number) => {
  const [sighting] = await sql<{ id: number }[]>`
  DELETE from sightings WHERE sightings.id = ${id}
  RETURNING id
  `;
  return sighting;
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
