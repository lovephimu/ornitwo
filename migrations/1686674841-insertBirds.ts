import { Sql } from 'postgres';
import { Bird } from '../database/database';

export const birds: Bird[] = [
  { id: 1, name: 'house sparrow', species: 'passer domesticus' },
  { id: 2, name: 'kestrel', species: 'falco tinnunculus' },
  { id: 3, name: 'wagtail', species: 'motacilla alba' },
  {
    id: 4,
    name: 'stork',
    species: 'ciconia ciconia',
  },
];

export async function up(sql: Sql) {
  for (const bird of birds) {
    await sql`
    INSERT INTO birds
    (name, species)
    VALUES
    (${bird.name}, ${bird.species})
    `;
  }
}

export async function down(sql: Sql) {
  for (const bird of birds) {
    await sql`
  DELETE FROM birds WHERE id = ${bird.id}
  `;
  }
}
