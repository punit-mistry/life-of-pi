import React from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
import { Plus, Heart,} from 'lucide-react';
import { MemoryUploader } from './MemoryUploader';
import type { Memory } from '../../types';
import { Button } from '../ui/Button';

import {
  Dialog,
  DialogContent,
  
  DialogTrigger,
} from "@/components/ui/dialog"




interface AddMemoryButtonProps {
  onUpload: (memory: Omit<Memory, 'id'>) => void;
}

export function AddMemoryButton({ onUpload }: AddMemoryButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-8 right-8 p-4 shadow-lg"
        >
          <Plus className="w-6 h-6" />
          <span>Add Memory</span>
          <Heart className="w-4 h-4 animate-pulse" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
          <Dialog.Title className="sr-only">Add New Memory</Dialog.Title>
          <Dialog.Description className="sr-only">
            Form to add a new memory with an image, description, and date
          </Dialog.Description> */}
          <MemoryUploader onUpload={(memory) => {
            const closeEvent = new Event('close-dialog');
            document.dispatchEvent(closeEvent);
            onUpload(memory);
          }} />
          {/* <Dialog.Close asChild>
            <button
              className="absolute top-3 right-11 text-black hover:text-pink-300 transition-colors"aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </Dialog.Close> */}
        {/* </Dialog.Content> */}
      </DialogContent>
    </Dialog>
  );
}