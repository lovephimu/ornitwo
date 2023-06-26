import { UserSightingResponse } from '../report/account/[userId]/AccountData';

export function sortUserSightingsByDate(sightingsArray: UserSightingResponse) {
  // sort
  // check for moth by splitting date

  const sightingData = sightingsArray.user.sightings
    .slice(-5)
    .map((sighting) => {
      const dateArray = sighting.timeStamp.split('.');
      const dateDay = parseInt(dateArray[0] || 'non valid date');
      const dateMonth = parseInt(dateArray[1] || 'non valid date') - 1;
      const dateYear = 2000 + parseInt(dateArray[2] || 'non valid date');
      const timeObject = new Date(dateYear, dateMonth, dateDay);

      return {
        id: sighting.id,
        birdId: sighting.birdData.id,
        name: sighting.birdData.name,
        species: sighting.birdData.species,
        location: sighting.location,
        time: timeObject,
      };
    });

  sightingData.sort((a, b) => b.time.getTime() - a.time.getTime());

  return sightingData;
}
