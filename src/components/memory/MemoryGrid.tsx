import React from 'react';
import type { Memory } from '../../types';
import { filterMemoriesByDate } from '../../utils/memory';
import { MemoryCard } from './MemoryCard';
import { FlipWordsDemo as HeaderTitle} from "../HeaderTitle";
interface MemoryGridProps {
  memories: Memory[];
  onMemoryClick: (memory: Memory) => void;
  selectedDate: string;
}

export function MemoryGrid({ memories, onMemoryClick, selectedDate }: MemoryGridProps) {
  const filteredMemories = filterMemoriesByDate(memories, selectedDate);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-center text-pink-600 font-bold text-2xl mb-6">
        Cherished Moments Together ❤️
      </h2> */}

      <HeaderTitle/>
      <div className="flex flex-col ">
        {filteredMemories.map((memory, index) => (
          <div
            key={memory.id}
            className={`bg-gradient-to-br from-pink-100 to-white rounded-lg  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
              index % 2 === 0 ? 'mt-8' : 'mt-16'
            }`}
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