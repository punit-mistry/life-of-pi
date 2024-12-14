export const ROMANTIC_SONGS = [
  'https://ekluylnmhjedyhartala.supabase.co/storage/v1/object/public/bday_images/perfect_2.mp4?t=2024-12-14T08%3A31%3A00.621Z', // Perfect - Ed Sheeran
  'https://ekluylnmhjedyhartala.supabase.co/storage/v1/object/public/bday_images/tu-hain-toh.mp4?t=2024-12-14T08%3A18%3A25.151Z', //Tu Hai Toh
  // 'https://s17.aconvert.com/convert/p3r68-cdx67/bg7pg-o7gqg.mp3', // 
  // 'https://audio.jukehost.co.uk/2H4Y8JQwLN6KGpMtR3vXj7BfDnWk9PmZ', // At Last - Etta James
];

export const getRandomSong = () => {
  return ROMANTIC_SONGS[Math.floor(Math.random() * ROMANTIC_SONGS.length)];
};