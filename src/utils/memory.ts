import type { Memory } from '../types';

export const createMemory = (data: Omit<Memory, 'id'>): Memory => {
  return {
    ...data,
    id: Date.now().toString(),
  };
};

export const filterMemoriesByDate = (memories: Memory[], selectedDate: string) => {
  return selectedDate
    ? memories.filter((memory) => memory.date === selectedDate)
    : memories;
};