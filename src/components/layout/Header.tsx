import React from 'react';
import { Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-pink-100 shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-center">
        <Heart className="w-8 h-8 text-pink-500 mr-3 animate-pulse" />
        <h1 className="text-3xl font-bold text-pink-600 font-serif">Our Love Story / Our Life of PI</h1>
        <Heart className="w-8 h-8 text-pink-500 ml-3 animate-pulse" />
      </div>
    </header>
  );
}