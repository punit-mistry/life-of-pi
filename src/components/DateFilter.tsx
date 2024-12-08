import React from 'react';

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function DateFilter({ selectedDate, onDateChange }: DateFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Date
      </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
}