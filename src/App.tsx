import  { useState } from 'react';
import { Header } from './components/layout/Header';
import { AddMemoryButton } from './components/memory/AddMemoryButton';
import { MemoryGrid } from './components/memory/MemoryGrid';
import { MemoryViewer } from './components/memory/MemoryViewer';
import { DateFilter } from './components/layout/DateFilter';
import { createMemory } from './utils/memory';
import type { Memory } from './types';

function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleUpload = (memoryData: Omit<Memory, 'id'>) => {
    const newMemory = createMemory(memoryData);
    setMemories((prev) => [...prev, newMemory]);
  };

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 192, 203, 0.3), rgba(255, 255, 255, 0.7)), url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80')`,
      }}
    >
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <DateFilter
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <MemoryGrid
          memories={memories}
          onMemoryClick={setSelectedMemory}
          selectedDate={selectedDate}
        />
        {selectedMemory}
        {selectedMemory && (
          <MemoryViewer
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
          />
        )}
        <AddMemoryButton onUpload={handleUpload} />
      </main>
    </div>
  );
}

export default App;