import { Sql } from 'postgres';
import { sightings } from '../database/mockData';

// INSERTING SIGHTING DATA

export async function up(sql: Sql) {
  for (const sighting of sightings) {
    await sql`
    INSERT INTO sightings
    (user_id, bird_id, location, time_stamp, lat, lng )
    VALUES
    (${sighting.userId}, ${sighting.birdId}, ${sighting.location}, ${sighting.timeStamp}, ${sighting.lat},${sighting.lng})
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
