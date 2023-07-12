import { expect, test } from '@jest/globals';
import { rankUsers } from '../../app/functions/rankUsers';

test('ranks users based on sightings', () => {
  const testData = {
    sightingsJointUsers: [
      {
        id: 1,
        userId: 1,
        username: 'Anita',
      },
      {
        id: 2,
        userId: 2,
        username: 'Bert',
      },
      {
        id: 3,
        userId: 2,
        username: 'Bert',
      },
    ],
  };

  expect(rankUsers(testData)).toStrictEqual([
    {
      userId: '2',
      username: 'cheekychipper',
      sightings: 2,
    },
    {
      userId: '1',
      username: 'peter',
      sightings: 1,
    },
  ]);
});
