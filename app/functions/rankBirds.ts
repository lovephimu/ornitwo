import { ExploreQuery } from '../explore/Statistics';

export function rankBirds(dataInput: ExploreQuery) {
  const birdNameList = dataInput.sightings.map((sighting) => {
    return {
      birdName: sighting.birdData.name,
      species: sighting.birdData.species,
      birdId: sighting.birdId,
    };
  });

  // create list of unique bird names

  const birdSet = [...new Set(birdNameList.map((bird) => bird.birdName))];

  // count the occurrences of birds

  const birdCount = birdSet.map((birdName) => {
    const count = birdNameList.filter(
      (bird) => bird.birdName === birdName,
    ).length;
    return { birdName, count };
  });

  // sort counted birds - most seen goes first

  const birdRank = birdCount.sort((a, b) => b.count - a.count);

  // rejoin rest of relevant data

  const rankedBirds = birdRank.slice(0, 3).map((bird) => {
    const matchedBird = birdNameList.find(
      (item) => item.birdName === bird.birdName,
    );
    const species = matchedBird ? matchedBird.species : '';
    const birdId = matchedBird ? matchedBird.birdId : '';
    return {
      birdName: bird.birdName,
      species: species,
      count: bird.count,
      birdId: birdId,
    };
  });

  return rankedBirds;
}
