import React from 'react';
import type { Memory } from '../../types';
import { formatDate } from '../../utils/date';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
  isOffset?: boolean;
}

export function MemoryCard({ memory, onClick, isOffset }: MemoryCardProps) {
  return (
    <div
      className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
        isOffset ? 'md:translate-y-8' : ''
      }`}
      onClick={onClick}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <img
          src={memory.imageUrl}
          alt={memory.description}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-700 mb-2 line-clamp-2">{memory.description}</p>
          <p className="text-sm text-gray-500">{formatDate(memory.date)}</p>
        </div>
      </div>
    </div>
  );
}