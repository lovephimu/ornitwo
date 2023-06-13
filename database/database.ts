import { cache } from 'react';
import { sql } from './connect';

// generate fake object

export type User = {
  id: number;
  email: string;
  password: string;
  created: string;
  updated: string;
};

export type Bird = {
  id: number;
  name: string;
  species: string;
};

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

export const user = [
  {
    id: 1,
    username: 'tdegoey0',
    email: 'kplaunch0@nifty.com',
    password: '$2a$04$I4GADbz421bdhXfLrIQEFuTfayHKgitMzwpb3miNczdWDmSE6kNn6',
    created: '6/29/2022',
    updated: '5/18/2023',
  },
  {
    id: 2,
    username: 'mnew1',
    email: 'abeddingham1@wikipedia.org',
    password: '$2a$04$LG.a8S2IkLP3m7NfwjpERuQ2BiNnnDk14acwxWRDPwnOm9MFzpYiO',
    created: '9/10/2022',
    updated: '7/17/2022',
  },
  {
    id: 3,
    username: 'ehayton2',
    email: 'ccantillon2@lycos.com',
    password: '$2a$04$iJRhcafiX3Fxkvcoje.gGORIXsvZP8xpurodTp6SskBzk4jYGyhoG',
    created: '7/22/2022',
    updated: '12/26/2022',
  },
  {
    id: 4,
    username: 'egabbitus3',
    email: 'hbastin3@cafepress.com',
    password: '$2a$04$qs/EdFPdYunlaaGJ18qTB.gUMwGo0E4Yo0TVBtRbgT8SUNWEd8jlS',
    created: '12/18/2022',
    updated: '4/5/2023',
  },
];
