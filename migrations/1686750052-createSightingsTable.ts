import { Sql } from 'postgres';

// SIGHTING TABLE

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE sightings (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL,
    bird_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (bird_id) REFERENCES birds (id)
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE sightings
  `;
}
