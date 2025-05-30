
/**
 * Array utility functions
 */

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const groupBy = <T, K extends keyof any>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const group = key(item);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T | ((item: T) => any)): T[] => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === 'function' ? key(a) : a[key];
    const bVal = typeof key === 'function' ? key(b) : b[key];
    
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
};

export const findBy = <T>(array: T[], key: keyof T, value: any): T | undefined => {
  return array.find(item => item[key] === value);
};

export const removeBy = <T>(array: T[], key: keyof T, value: any): T[] => {
  return array.filter(item => item[key] !== value);
};

export const updateBy = <T>(array: T[], key: keyof T, value: any, updates: Partial<T>): T[] => {
  return array.map(item => item[key] === value ? { ...item, ...updates } : item);
};

export const paginate = <T>(array: T[], page: number, limit: number): T[] => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return array.slice(start, end);
};

export const flatten = <T>(array: (T | T[])[]): T[] => {
  return array.reduce<T[]>((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};
