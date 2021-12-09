/**
 * generateTimestamp
 * @description Generate a timestamp
 */
export const generateTimestamp = (): string => {
  return Math.floor(new Date('2021.10.27').getTime() / 1000).toString();
};
