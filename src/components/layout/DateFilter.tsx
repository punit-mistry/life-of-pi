import React from 'react';
import { Button } from '../ui/Button';

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function DateFilter({ selectedDate, onDateChange }: DateFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 mx-auto mb-8 w-1/2 justify-center">
      <label className="block text-sm font-medium text-gray-700 ">
        Filter by Date
      </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <Button className="text-sm text-gray-500  capitalize p-3 w-fit font-semibold " onClick={() => onDateChange('')}>
    clear date 
    </Button>
    </div>
  );
}