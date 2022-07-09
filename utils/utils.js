export const getRandomFileName = (mainWord, extension) =>
  `${mainWord}_${Math.random().toString().slice(2, 10)}.${extension}`
