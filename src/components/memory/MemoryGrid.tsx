import React from 'react';
import type { Memory } from '../../types';
import { filterMemoriesByDate } from '../../utils/memory';
import { MemoryCard } from './MemoryCard';

interface MemoryGridProps {
  memories: Memory[];
  onMemoryClick: (memory: Memory) => void;
  selectedDate: string;
}

export function MemoryGrid({ memories, onMemoryClick, selectedDate }: MemoryGridProps) {
  const filteredMemories = filterMemoriesByDate(memories, selectedDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-pink-600 font-bold text-2xl mb-6">
        "Cherished Moments Together ❤️"
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {filteredMemories.map((memory, index) => (
          <div
            key={memory.id}
            className={`relative p-4 rounded-lg shadow-lg transform transition-all hover:scale-105 
                        ${index % 2 === 0 ? 'mt-4' : 'mb-4'}
                        bg-gradient-to-br from-pink-100 to-pink-300`}
          >
            <MemoryCard
              memory={memory}
              onClick={() => onMemoryClick(memory)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
