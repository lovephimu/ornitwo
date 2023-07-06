import { expect, test } from '@jest/globals';
import { rankUsers } from '../../app/functions/rankUsers';

test('ranks users based on sightings', () => {
  const testData = {
    sightings: [
      {
        userId: '1',
        birdId: '2',
        location: 'Museumquartier, Wien',
        timeStamp: '12.2.23',
        birdData: {
          name: 'eurasian tree sparrow',
          species: 'passer montanus',
        },
        userData: {
          username: 'peter',
        },
      },
      {
        userId: '2',
        birdId: '2',
        location: 'Museumquartier, Wien',
        timeStamp: '12.2.23',
        birdData: {
          name: 'eurasian tree sparrow',
          species: 'passer montanus',
        },
        userData: {
          username: 'cheekychipper',
        },
      },
      {
        userId: '2',
        birdId: '2',
        location: 'Museumquartier, Wien',
        timeStamp: '12.2.23',
        birdData: {
          name: 'eurasian tree sparrow',
          species: 'passer montanus',
        },
        userData: {
          username: 'cheekychipper',
        },
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
