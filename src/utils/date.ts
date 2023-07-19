export const getPreviousDate = (date: Date, days: number) => {
  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - days);
  return previousDate;
};

export const getTimeInMilliseconds = (seconds: number, nanoseconds: number) => {
  return seconds * 100 + nanoseconds / 1000000;
};
