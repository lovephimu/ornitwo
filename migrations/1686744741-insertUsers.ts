import { Sql } from 'postgres';
import { User } from '../database/database';

export const users: User[] = [
  {
    id: 1,
    username: 'cheekychipper',
    passwordHash:
      '$2b$10$jocJAV1uHwlT2ehYzy2oJuA152UJWtgOc0aRmBdAzuImNpH9J5qi6',
    userPic: '01',
  },
  {
    id: 2,
    username: 'goldwinggoldie',
    passwordHash:
      '$2b$10$sZPQKKetuditfMeH1ttdCe0l7Xj.vzLZAJ0BvMaltsVW7joO7u1z.',
    userPic: '02',
  },
  {
    id: 3,
    username: 'jacquelinesparrow',
    passwordHash:
      '$2b$10$Msv1q1HAhf90ciGa1Oqn1ODHtyOV0JZ9XIh7nTiCMdfWVGGct/OXy',
    userPic: '03',
  },
  {
    id: 4,
    username: 'dovetail',
    passwordHash:
      '$2b$10$Di4FieSVwmRKjlYv.Kb5y.5pEDe2FnFpnycFeMEpK0TU9iCbUe8Fe',
    userPic: '05',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
    (username, password_hash, user_pic)
    VALUES
    (${user.username}, ${user.passwordHash}, ${user.userPic})
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
