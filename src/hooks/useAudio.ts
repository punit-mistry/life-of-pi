import { useEffect, useRef, useState } from 'react';
import { getRandomSong } from '../utils/audio';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  useEffect(() => {
    if (audioRef.current ) {
      const song = getRandomSong();
      audioRef.current.src = song;
      audioRef.current.load();
      
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsAudioLoaded(true);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    console.log(isAudioLoaded,audioRef)
    if (isAudioLoaded && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log('Autoplay was prevented');
        });
      }
    }
  }, [isAudioLoaded]);

  return { audioRef };
};