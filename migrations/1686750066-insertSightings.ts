import { Sql } from 'postgres';
import { Sighting } from '../database/database';

// INSERTING SIGHTING DATA

export const sightings: Sighting[] = [
  {
    id: 1,
    userId: 1,
    birdId: 2,
    location: 'Museumquartier',
    timeStamp: '10:11',
  },
  {
    id: 2,
    userId: 2,
    birdId: 2,
    location: 'Rathaus',
    timeStamp: '11:11',
  },
  {
    id: 3,
    userId: 3,
    birdId: 4,
    location: 'Stadtpark',
    timeStamp: '12:11',
  },
  {
    id: 4,
    userId: 1,
    birdId: 4,
    location: 'Karlsplatz',
    timeStamp: '13:11',
  },
];

export async function up(sql: Sql) {
  for (const sighting of sightings) {
    await sql`
    INSERT INTO sightings
    (user_id, bird_id, location, time_stamp )
    VALUES
    (${sighting.userId}, ${sighting.birdId}, ${sighting.location}, ${sighting.timeStamp})
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
