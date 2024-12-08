export const ROMANTIC_SONGS = [
  'https://s21.aconvert.com/convert/p3r68-cdx67/gb2xy-1i2xn.mp3', // Perfect - Ed Sheeran
  'https://s17.aconvert.com/convert/p3r68-cdx67/bg7pg-o7gqg.mp3', // Tu Hai Toh
  // 'https://audio.jukehost.co.uk/2H4Y8JQwLN6KGpMtR3vXj7BfDnWk9PmZ', // At Last - Etta James
];

export const getRandomSong = () => {
  return ROMANTIC_SONGS[Math.floor(Math.random() * ROMANTIC_SONGS.length)];
};