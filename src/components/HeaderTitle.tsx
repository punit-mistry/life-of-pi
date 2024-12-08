import { BackgroundGradient } from "./ui/background-gradient";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Cute", "Lovely", "gorgeous", "irreplaceable"];

  return (
    // <BackgroundGradient className="rounded-[22px]  p-4 sm:p-10 bg-pink-300 dark:bg-zinc-900">
     <div className="flex justify-center items-center px-4 bg-pink-300 py-8 rounded-lg shadow-2xl"> 
      <div className="text-4xl mx-auto font-bold text-pink-600 dark:text-neutral-400 text-center">
        Mootu will always be
        <FlipWords words={words} /> <br />
        my one and only love!
      </div>
    </div> 
    // </BackgroundGradient>
  );
}