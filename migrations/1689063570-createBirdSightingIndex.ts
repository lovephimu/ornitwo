import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE INDEX
      bird_sightings_id
    ON
      sightings(bird_id)
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP INDEX bird_sightings_id
  `;
}
