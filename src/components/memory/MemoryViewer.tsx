import { useEffect } from "react";
import { X, Heart, Infinity } from "lucide-react";
import type { MemoryViewerProps } from "../../types";
import { useAudio } from "../../hooks/useAudio";
import { formatDate } from "../../utils/date";

export function MemoryViewer({ memory, onClose }: MemoryViewerProps) {
  const { audioRef } = useAudio();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-viewer-title"
    >
      <audio ref={audioRef} />

      <div className="relative max-w-4xl w-full mx-4 max-h-[600px] overflow-hidden rounded-lg bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4  hover:text-pink-300 transition-colors"
          aria-label="Close memory viewer"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="bg-white rounded-lg max-h-[600px] overflow-auto">
          <div className="p-4 font-bold italic  flex  items-center">
            <Heart className="w-4 h-4 text-pink-500 mr-2 " />
            <div className="flex gap-2 items-center">
              Love You Mootu EveryDay from 9/10/2022 to
              <Infinity className=" text-pink-500 " />
            </div>
          </div>
          <div className="p-5 max-w-[450px] mx-auto ">
            <img
              src={memory.imageUrl}
              alt={memory.description}
              className="w-full h-full object-cover" // Use object-cover to maintain aspect ratio
            />
          </div>
          <div className="p-6">
            <h2 id="memory-viewer-title" className="sr-only">
              Memory Details
            </h2>
            <b>Description:</b>
            <p className="text-gray-700 mb-2">{memory.description}</p>
            <b>Date:</b>
            <p className="text-sm text-gray-500">{formatDate(memory.date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
