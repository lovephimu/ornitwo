export function decreaseDate(date: string) {
  const newDateArray = date.split('.');
  const day = parseInt(newDateArray[0] || 'non valid date');
  const month = parseInt(newDateArray[1] || 'non valid date') - 1;
  const year = 2000 + parseInt(newDateArray[2] || 'non valid date');
  const timeObject = new Date(year, month, day);

  // Get the current date
  const currentDate = new Date();

  // Set the maximum range allowed to decrease
  const maxRange = 3;

  // Calculate the date three days ago
  const maxRangeDate = new Date();
  maxRangeDate.setDate(currentDate.getDate() - maxRange);

  if (timeObject >= maxRangeDate) {
    // Decrease the date by one day
    timeObject.setDate(timeObject.getDate() - 1);
    return timeObject;
  } else {
    return maxRangeDate;
  }
}

export function increaseDate(date: string) {
  const newDateArray = date.split('.');
  const day = parseInt(newDateArray[0] || 'non valid date');
  const month = parseInt(newDateArray[1] || 'non valid date') - 1;
  const year = 2000 + parseInt(newDateArray[2] || 'non valid date');
  const timeObject = new Date(year, month, day);

  // Get the current date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (timeObject < currentDate) {
    // Decrease the date by one day
    timeObject.setDate(timeObject.getDate() + 1);
    return timeObject;
  } else {
    return currentDate;
  }
}
