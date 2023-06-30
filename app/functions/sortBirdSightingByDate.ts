import { SightingsByBirdResponse } from '../explore/birds/[birdId]/BirdData';

export function sortBirdSightingsByDate(
  sightingsArray: SightingsByBirdResponse,
) {
  // sort
  // check for moth by splitting date

  const sightingData = sightingsArray.sightingsByBird
    .slice(-5)
    .map((sighting) => {
      const dateArray = sighting.timeStamp.split('.');
      const dateDay = parseInt(dateArray[0] || 'non valid date');
      const dateMonth = parseInt(dateArray[1] || 'non valid date') - 1;
      const dateYear = 2000 + parseInt(dateArray[2] || 'non valid date');
      const timeObject = new Date(dateYear, dateMonth, dateDay);

      return {
        id: sighting.id,
        userId: sighting.userData.id,
        username: sighting.userData.username,
        location: sighting.location,
        time: timeObject,
        lat: sighting.lat,
        lng: sighting.lng,
      };
    });

  sightingData.sort((a, b) => b.time.getTime() - a.time.getTime());

  return sightingData;
}
