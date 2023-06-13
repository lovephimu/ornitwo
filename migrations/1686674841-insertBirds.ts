import { Sql } from 'postgres';
import { Bird } from '../database/database';

export const birds: Bird[] = [
  { id: 1, name: 'White rhinoceros', species: 'Ceratotherium simum' },
  { id: 2, name: 'Otter, cape clawless', species: 'Aonyx capensis' },
  { id: 3, name: 'Komodo dragon', species: 'Varanus komodensis' },
  {
    id: 4,
    name: 'Opossum, american virginia',
    species: 'Didelphis virginiana',
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
