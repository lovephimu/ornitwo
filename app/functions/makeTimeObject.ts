export function makeTimeObject(stringDate: string) {
  const timeArray = stringDate.split('.');
  const day = parseInt(timeArray[0] || '0');
  const month = parseInt(timeArray[1] || '1') - 1;
  const year = 2000 + parseInt(timeArray[2] || '0');

  const timeObject = new Date(year, month, day);

  return timeObject;
}

export function makeMaxRange(date: string) {
  const timeObject = makeTimeObject(date);

  const maxRange = 3;

  // Calculate the date three days ago
  const maxRangeDate = new Date();
  maxRangeDate.setDate(timeObject.getDate() - maxRange);
  maxRangeDate.setHours(0, 0, 0, 0);
  return maxRangeDate;
}
