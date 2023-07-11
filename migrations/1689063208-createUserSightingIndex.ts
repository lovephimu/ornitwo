import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE INDEX
      user_sightings_id
    ON
      sightings(user_id)
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP INDEX user_sightings_id
  `;
}
