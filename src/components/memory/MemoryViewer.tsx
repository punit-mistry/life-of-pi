import  { useEffect } from 'react';
import { X } from 'lucide-react';
import type { MemoryViewerProps } from '../../types';
import { useAudio } from '../../hooks/useAudio';
import { formatDate } from '../../utils/date';

export function MemoryViewer({ memory, onClose }: MemoryViewerProps) {
  const { audioRef } = useAudio();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  console.log(audioRef.current?.src)
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-viewer-title"
    >
        <audio ref={audioRef} />

      <div className="relative max-w-4xl w-full mx-4 max-h-[600px] overflow-y-auto rounded-lg bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors"  
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
            <p className="text-sm text-gray-500">{formatDate(memory.date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}