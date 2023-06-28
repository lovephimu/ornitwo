import { ExploreQuery } from '../explore/Statistics';

export function rankBirds(dataInput: ExploreQuery) {
  const birdNameList = dataInput.sightings.map((sighting) => {
    return {
      birdName: sighting.birdData.name,
      species: sighting.birdData.species,
    };
  });

  const birdSet = [...new Set(birdNameList.map((bird) => bird.birdName))];

  const birdCount = birdSet.map((birdName) => {
    const count = birdNameList.filter(
      (bird) => bird.birdName === birdName,
    ).length;
    return { birdName, count };
  });

  console.log(birdSet);
  console.log(birdCount);

  const birdRank = birdCount.sort((a, b) => b.count - a.count);

  const rankedBirds = birdRank.slice(0, 3).map((bird) => {
    const matchedBird = birdNameList.find(
      (item) => item.birdName === bird.birdName,
    );
    const species = matchedBird ? matchedBird.species : '';
    return {
      birdName: bird.birdName,
      species: species,
      count: bird.count,
    };
  });

  return rankedBirds;
}
