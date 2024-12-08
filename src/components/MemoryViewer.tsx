import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { MemoryViewerProps } from '../types';

const ROMANTIC_SONGS = [
  'https://audio.jukehost.co.uk/9jyXMWxBiQPBZwK4qVNrM8XBFaJjZjvE', // Perfect - Ed Sheeran
  'https://audio.jukehost.co.uk/KQtj8vPXN4F9LJxE8mXZw6bN7Y2M8Jy2', // All of Me - John Legend
  'https://audio.jukehost.co.uk/2H4Y8JQwLN6KGpMtR3vXj7BfDnWk9PmZ', // At Last - Etta James
];

export function MemoryViewer({ memory, onClose }: MemoryViewerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    
    // Setup audio
    if (audioRef.current) {
      const randomSong = ROMANTIC_SONGS[Math.floor(Math.random() * ROMANTIC_SONGS.length)];
      audioRef.current.src = randomSong;
      audioRef.current.load();
      
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsAudioLoaded(true);
      });
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [onClose]);

  useEffect(() => {
    if (isAudioLoaded && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, we'll handle this gracefully
          console.log('Autoplay was prevented');
        });
      }
    }
  }, [isAudioLoaded]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-viewer-title"
    >
      <audio ref={audioRef} />
      <div className="relative max-w-4xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors"
          aria-label="Close memory viewer"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src={memory.imageUrl}
            alt={memory.description}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h2 id="memory-viewer-title" className="sr-only">Memory Details</h2>
            <p className="text-gray-700 mb-2">{memory.description}</p>
            <p className="text-sm text-gray-500">{new Date(memory.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}