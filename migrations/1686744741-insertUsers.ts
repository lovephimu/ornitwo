import { Sql } from 'postgres';
import { User } from '../database/database';

export const users: User[] = [
  {
    id: 1,
    username: 'cheekychipper',
    passwordHash:
      '$2a$04$I4GADbz421bdhXfLrIQEFuTfayHKgitMzwpb3miNczdWDmSE6kNn6',
  },
  {
    id: 2,
    username: 'goldwinggoldie',
    passwordHash:
      '$2a$04$LG.a8S2IkLP3m7NfwjpERuQ2BiNnnDk14acwxWRDPwnOm9MFzpYiO',
  },
  {
    id: 3,
    username: 'jacksparrow',
    passwordHash:
      '$2a$04$iJRhcafiX3Fxkvcoje.gGORIXsvZP8xpurodTp6SskBzk4jYGyhoG',
  },
  {
    id: 4,
    username: 'dovetail',
    passwordHash:
      '$2a$04$qs/EdFPdYunlaaGJ18qTB.gUMwGo0E4Yo0TVBtRbgT8SUNWEd8jlS',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
    (username, password_hash)
    VALUES
    (${user.username}, ${user.passwordHash})
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
