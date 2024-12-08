import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface MemoryUploaderProps {
  onUpload: (memory: { imageUrl: string; description: string; date: string }) => void;
}

export function MemoryUploader({ onUpload }: MemoryUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!imageUrl || !description || !date) {
      setError('All fields are required. Please upload an image, enter a description, and select a date.');
      return;
    }
    setError('');
    onUpload({ imageUrl, description, date });
    setImageUrl(null);
    setDescription('');
    setDate('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold text-pink-600 mb-4">Add a Memory</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose an Image
          </label>
          <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-pink-400 focus:outline-none">
            <div className="flex flex-col items-center space-y-2">
              <Upload className="w-6 h-6 text-pink-500" />
              <span className="text-sm text-gray-600">Click to upload an image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows={3}
            placeholder="Write something sweet..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          Upload Memory
        </button>
      </div>
    </div>
  );
}
