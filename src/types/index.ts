export interface Memory {
  id: string;
  imageUrl: string;
  description: string;
  date: string;
  imageID : string;
}

export interface MemoryViewerProps {
  memory: Memory;
  onClose: () => void;
}