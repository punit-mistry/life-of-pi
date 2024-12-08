import React from 'react';
import type { Memory } from '../types';

interface MemoryGridProps {
  memories: Memory[];
  onMemoryClick: (memory: Memory) => void;
  selectedDate: string;
}

export function MemoryGrid({ memories, onMemoryClick, selectedDate }: MemoryGridProps) {
  const filteredMemories = selectedDate
    ? memories.filter((memory) => memory.date === selectedDate)
    : memories;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMemories.map((memory, index) => (
          <div
            key={memory.id}
            className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
              index % 2 === 0 ? 'md:translate-y-8' : ''
            }`}
            onClick={() => onMemoryClick(memory)}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={memory.imageUrl}
                alt={memory.description}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700 mb-2 line-clamp-2">{memory.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(memory.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}