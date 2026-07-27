export const getSafePrize = (questionNumber) => {
   if (questionNumber >= 15) {
    return 10000000;
  }

  if (questionNumber >= 10) {
    return 320000;
  }

  if (questionNumber >= 5) {
    return 10000;
  }

  return 0;
};