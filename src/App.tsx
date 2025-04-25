import Hangman from "./components/Hangman";
import Keyboard from "./components/Keyboard";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { useRef, useState, useEffect } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>(""); // State for the div content
  const divRef = useRef<HTMLDivElement>(null);
  const wrongGuesses: number = useSelector(
    (state: RootState) => state.hangman.wrongGuesses
  );
  const guessedLetters = useSelector(
    (state: RootState) => state.hangman.guessedLetters
  );

  const word: string[] = useSelector((state: RootState) => state.hangman.word);

  const areArraysEqual = (array1: string[], array2: string[]): boolean => {
    // Check if lengths are the same
    if (array1.length !== array2.length) {
      return false;
    }

    // Sort both arrays and compare each element
    const sortedArray1 = [...array1].sort();
    const sortedArray2 = [...array2].sort();

    return sortedArray1.every((value, index) => value === sortedArray2[index]);
  };

  useEffect(() => {
    if (areArraysEqual(word, guessedLetters)) {
      setMessage("You saved my LIFE...🥹");
    } else if (wrongGuesses === 7) {
      setMessage("Hangman is hanged..🤐");
    } else {
      setMessage(""); // Clear the message if no condition is met
    }
  }, [word, guessedLetters, wrongGuesses]); // Re-run when these dependencies change

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div
        ref={divRef}
        className="w-full flex justify-center items-center text-4xl  font-semibold bg-black pt-4 text-blue-100"
      >
        {message}
      </div>
      <div className="bg-black pt-5 w-full flex justify-center items-center">
        <button
          onClick={handleRefresh}
          className={`text-blue-100 ${
            message == "" ? "hidden" : "font-sans"
          } text-2xl p-2 font-semibold rounded-md active:scale-95 hover:bg-blue-600 cursor-pointer bg-blue-500`}
        >
          Refresh
        </button>
      </div>
      <div className="bg-black h-screen w-full md:grid md:grid-cols-2 md:place-items-center flex flex-col justify-center items-center">
        <Hangman />
        <Keyboard />
      </div>
    </>
  );
};

export default App;
