import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE birds (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(50) NOT NULL,
    species varchar(100),
    bio varchar
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE birds
  `;
}
