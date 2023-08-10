export const getPreviousDate = (date: Date, days: number) => {
  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - days);
  return previousDate;
};
