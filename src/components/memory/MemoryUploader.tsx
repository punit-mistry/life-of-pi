import React, { useState } from "react";
import { Upload, X, Loader } from "lucide-react"; // Add Loader icon if required
import { Button } from "../ui/Button";
import supabase from "@/db";
import { useToast } from "@/hooks/use-toast"


interface MemoryUploaderProps {
  onUpload: (memory: {
    imageUrl: string;
    description: string;
    date: string;
    imageID: string;
  }) => void;
}

export function MemoryUploader({ onUpload }: MemoryUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [imageID , setImageID] = useState('');
  const [loading, setLoading] = useState(false); // Loader state
  const { toast } = useToast()
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setLoading(true); // Start loader
    const reader = new FileReader();

    reader.onloadend = async () => {
      setImageUrl(reader.result as string); // Set preview image

      // Upload the image to Supabase Storage
      const { data, error } = await supabase.storage
        .from("bday_images")
        .upload(`uploaded_memorys/${file.name}`, file);

      setLoading(false); // Stop loader

      if (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Error uploading image",
          description: error.message,
          variant: "destructive",
        })
      } else {
        console.log("Image uploaded successfully:", data);
        setImageID(data.path); // Set image ID
        toast({
          title: "Image uploaded successfully",
          description: 'Enjoy our sweet memory moootu love you too !',
          variant: "default",
        })
      }
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setImageID('');
  };

  const handleSubmit = () => {
    if (!imageUrl || !description || !date || !imageID) {
      setError(
        "All fields are required. Please upload an image, enter a description, and select a date."
      );
      return;
    }

    setError("");
    onUpload({ imageUrl, description, date, imageID });
    setImageUrl(null);
    setImageID('');
    setDescription("");
    setDate("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8 w-full">
      <h2 className="text-xl font-semibold text-pink-600 mb-4">Add a Memory</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose an Image
          </label>
          {imageUrl ? (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-pink-400 focus:outline-none">
              {loading ? (
                <Loader className="animate-spin text-pink-500 w-6 h-6" />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="w-6 h-6 text-pink-500" />
                  <span className="text-sm text-gray-600">
                    Click to upload an image
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={loading}
              />
            </label>
          )}
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
            placeholder="Write something sweet like my moootu ..."
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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className={`${
              loading ? "bg-gray-300 cursor-not-allowed" : "bg-pink-500"
            } text-white p-2 w-fit font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Memory"}
          </Button>
        </div>
      </div>
    </div>
  );
}
