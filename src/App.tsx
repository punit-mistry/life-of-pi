import { useEffect, useState } from "react";
import { Header } from "./components/layout/Header";
import { AddMemoryButton } from "./components/memory/AddMemoryButton";
import { MemoryGrid } from "./components/memory/MemoryGrid";
import { MemoryViewer } from "./components/memory/MemoryViewer";
import { DateFilter } from "./components/layout/DateFilter";
import { createMemory } from "./utils/memory";

import type { Memory } from "./types";
import Supabase from "./db";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const { toast } = useToast();
  const uploadMemory = async (currentData: Omit<Memory, "id">) => {
    const { data, error } = await Supabase.from("bday_irika").insert({
      memory_date: currentData.date,
      description: currentData.description,
      image_id: currentData.imageID,
    });
    if (error) {
      console.error(error);
      toast({
        title: "Error uploading memory",
        description: error.message,
        variant: "destructive",
      });
    } else {
      console.log(data);
      setMemories((prev) => [...prev, data! as Memory]);
      toast({
        title: "Memory uploaded successfully",
        description: "Enjoy our sweet memory moootu love you too !",
        variant: "default",
      });
    }
  };

  const handleUpload = (memoryData: Omit<Memory, "id">) => {
    console.log(memoryData);
    uploadMemory(memoryData);
    // const newMemory = createMemory(memoryData);
  };
  const fetchMemories = async () => {
    const { data, error } = await Supabase.from("bday_irika").select();
    // .eq('date', selectedDate)

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      setMemories(data as Memory[]);
    }
  };
  useEffect(() => {
    fetchMemories();
  }, []);
  // fetchMemories();

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 192, 203, 0.3), rgba(255, 255, 255, 0.7)), url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80')`,
      }}
    >
      <Toaster />
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
