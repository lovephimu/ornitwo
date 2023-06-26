export type SightingsResponse = {
  sightingsByBird: [ResponseData];
};
type ResponseData = {
  userData: {
    id: number;
    username: string;
  };
  location: string;
  timeStamp: string;
  birdData: {
    name: string;
    species: string;
  };
  id: number;
};

export function monthSum(dataInput: SightingsResponse) {
  // loop through each month
  const sumArray = [];
  for (let i = 1; i <= 12; i++) {
    // reduce-loop through data.timeStamp
    const sum = dataInput.sightingsByBird.reduce((acc, singleData) => {
      const extractedMonth = singleData.timeStamp.split('.')[1];
      if (Number(extractedMonth) === i) {
        return acc + 1;
      }
      return acc;
    }, 0);
    sumArray.push(sum);
  }
  return sumArray;
}
