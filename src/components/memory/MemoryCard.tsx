import  { useEffect ,useState} from 'react';
import type { Memory } from '../../types';
import { formatDate } from '../../utils/date';
import { Trash2 } from 'lucide-react';
import supabase from '@/db';
interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
  isOffset?: boolean;
}

export function MemoryCard({ memory, onClick, isOffset }: MemoryCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const { data } = supabase
  .storage
  .from('bday_images')
  .getPublicUrl(memory.image_id)
    setImageUrl(data.publicUrl)
  },[])
  return (
    <div
      className={`transform transition-all duration-300  cursor-pointer ${
        isOffset ? 'md:translate-y-8' : ''
      }`}
      onClick={onClick}
    >
      <div className='bg-white rounded-full p-1 w-fit absolute top-2 right-2 flex items-center justify-center'>
      <Trash2 className='text-red-500' />
      </div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        {imageUrl &&
        <img
          src={imageUrl}
          alt={memory.description}
          className="w-full h-48 object-cover"
        />
      }
        <div className="p-4">
          <p className="text-gray-700 mb-2 line-clamp-2 font-semibold italic">{memory.description}</p>
          <p className="text-sm text-gray-500">{formatDate(memory.memory_date)}</p>
        </div>
      </div>
    </div>
  );
}