import { UserSightingResponse } from '../report/account/[userId]/AccountData';

export type SortedValues = {
  birdName: string;
  spottings: number;
};

export function extractAndSortBirds(dataInput: UserSightingResponse) {
  // map get all the bird names

  const birdList = dataInput.user.sightings.map((bird) => {
    return bird.birdData.name;
  });

  // delete duplicates

  const uniqueBirdList = [...new Set(birdList)];

  // count occurences of birds

  const birdSum = uniqueBirdList.map((birdName) => {
    return birdList.reduce((acc, birdEntry) => {
      if (birdEntry === birdName) {
        return acc + 1;
      }
      return acc;
    }, 0);
  });

  // combine two arrays:

  const combinedBirdList = uniqueBirdList.map((bird, index) => ({
    birdName: bird,
    spottings: birdSum[index],
  }));

  // sort arrays

  const sortedBirdList = combinedBirdList.sort(
    (a, b) => b.spottings! - a.spottings!,
  );

  // extract three most seen birds

  const threeMostSeenBirds = sortedBirdList.slice(0, 3);

  return threeMostSeenBirds;
}
