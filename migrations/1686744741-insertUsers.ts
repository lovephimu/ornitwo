import { Sql } from 'postgres';
import { User } from '../database/database';

export const users: User[] = [
  {
    id: 1,
    username: 'herb',
    // email: 'kplaunch0@nifty.com',
    password_hash:
      '$2a$04$I4GADbz421bdhXfLrIQEFuTfayHKgitMzwpb3miNczdWDmSE6kNn6',
    // created: '6/29/2022',
    // updated: '5/18/2023',
  },
  {
    id: 2,
    username: 'gogo',
    // email: 'abeddingham1@wikipedia.org',
    password_hash:
      '$2a$04$LG.a8S2IkLP3m7NfwjpERuQ2BiNnnDk14acwxWRDPwnOm9MFzpYiO',
    // created: '9/10/2022',
    // updated: '7/17/2022',
  },
  {
    id: 3,
    username: 'valerie',
    // email: 'ccantillon2@lycos.com',
    password_hash:
      '$2a$04$iJRhcafiX3Fxkvcoje.gGORIXsvZP8xpurodTp6SskBzk4jYGyhoG',
    // created: '7/22/2022',
    // updated: '12/26/2022',
  },
  {
    id: 4,
    username: 'mu',
    // email: 'hbastin3@cafepress.com',
    password_hash:
      '$2a$04$qs/EdFPdYunlaaGJ18qTB.gUMwGo0E4Yo0TVBtRbgT8SUNWEd8jlS',
    // created: '12/18/2022',
    // updated: '4/5/2023',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
    (username, password_hash)
    VALUES
    (${user.username}, ${user.password_hash})
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
  DELETE FROM users WHERE id = ${user.id}
  `;
  }
}
