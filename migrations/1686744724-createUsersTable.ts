import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(30) NOT NULL,
    password_hash varchar(80)
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
  `;
}
