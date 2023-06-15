import { Sql } from 'postgres';
import { Sighting } from '../database/database';

// INSERTING SIGHTING DATA

export const sightings: Sighting[] = [
  {
    id: 1,
    userId: 1,
    birdId: 2,
  },
  {
    id: 2,
    userId: 2,
    birdId: 2,
  },
  {
    id: 3,
    userId: 3,
    birdId: 4,
  },
  {
    id: 4,
    userId: 1,
    birdId: 4,
  },
];

export async function up(sql: Sql) {
  for (const sighting of sightings) {
    await sql`
    INSERT INTO sightings
    (user_id, bird_id)
    VALUES
    (${sighting.userId}, ${sighting.birdId})
    `;
  }
}

export async function down(sql: Sql) {
  for (const sighting of sightings) {
    await sql`
  DELETE FROM sightings WHERE id = ${sighting.id}
  `;
  }
}
