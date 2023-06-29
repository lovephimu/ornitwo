import { Sql } from 'postgres';
import { Bird } from '../database/database';

export const birds: Bird[] = [
  { id: 1, name: 'house sparrow', species: 'passer domesticus', bio: '' },
  { id: 2, name: 'kestrel', species: 'falco tinnunculus', bio: '' },
  { id: 3, name: 'wagtail', species: 'motacilla alba', bio: '' },
  {
    id: 4,
    name: 'stork',
    species: 'ciconia ciconia',
    bio: '',
  },
];

export async function up(sql: Sql) {
  for (const bird of birds) {
    await sql`
    INSERT INTO birds
    (name, species, bio)
    VALUES
    (${bird.name}, ${bird.species}, ${bird.bio})
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
