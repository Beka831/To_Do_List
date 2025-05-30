
/**
 * Math utility functions
 */

export const round = (num: number, decimals: number = 2): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const percentage = (value: number, total: number): number => {
  return total === 0 ? 0 : round((value / total) * 100);
};

export const average = (numbers: number[]): number => {
  return numbers.length === 0 ? 0 : numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

export const median = (numbers: number[]): number => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const sum = (numbers: number[]): number => {
  return numbers.reduce((total, num) => total + num, 0);
};

export const max = (numbers: number[]): number => {
  return Math.max(...numbers);
};

export const min = (numbers: number[]): number => {
  return Math.min(...numbers);
};
