import { Sql } from 'postgres';
import { Bird } from '../database/database';

export const birds: Bird[] = [
  { id: 1, name: 'house sparrow', species: 'passer domesticus', bio: '' },
  {
    id: 2,
    name: 'eurasian tree sparrow',
    species: 'passer montanus',
    bio: 'never alone',
  },
  {
    id: 3,
    name: 'nightingale',
    species: 'luscinia megarynchos',
    bio: 'a legendary bird',
  },
  {
    id: 4,
    name: 'great spotted woodpecker',
    species: 'dendrocopos major',
    bio: 'facade pecker',
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
