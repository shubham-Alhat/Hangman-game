import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addGuessLetter, wrongGuess } from "../features/hangmanSlice";
import { useEffect } from "react";

const Keyboard: React.FC = () => {
  const dispatch = useDispatch();
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Split the string into an  // array of letters

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

  const wrongGuesses: number = useSelector(
    (state: RootState) => state.hangman.wrongGuesses
  );

  const guessedLetters = useSelector(
    (state: RootState) => state.hangman.guessedLetters
  );

  const word: string[] = useSelector((state: RootState) => state.hangman.word);

  const category = useSelector((state: RootState) => state.hangman.category);

  const checkCorrectLetter = (guessedLetter: string) => {
    if (word.includes(guessedLetter)) {
      dispatch(addGuessLetter(guessedLetter));
      const letterIndex = word.indexOf(guessedLetter);
      const spanElement = document.querySelector(
        `span[id="${String(letterIndex)}"][data-key="${guessedLetter}"]`
      );
      if (spanElement) {
        spanElement.textContent = guessedLetter;
      }
    } else {
      dispatch(wrongGuess());
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedBtn = e.currentTarget;
    clickedBtn.disabled = true;
    clickedBtn.classList.remove(
      "cursor-pointer",
      "hover:bg-blue-200",
      "bg-blue-100"
    );
    clickedBtn.classList.add("cursor-not-allowed");
    const guessedLetter = clickedBtn.innerText;
    checkCorrectLetter(guessedLetter);
  };

  useEffect(() => {
    if (wrongGuesses == 7) {
      for (let index = 0; index < word.length; index++) {
        const element = document.getElementById(index.toString());
        if (element) {
          element.innerText = word[index];
          element.classList.add("text-green-400");
        }
      }
    }
  }, [wrongGuesses]);

  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        {/* Category */}
        <div className="border-4 border-white font-semibold  px-6 py-2 rounded-md text-xl cursor-pointer text-blue-200">
          {category}
        </div>

        {/* Hidden Word */}
        <div className="flex space-x-4 text-4xl font-bold text-white">
          {word.map((letter: string, index: number) => {
            return (
              <span
                id={index.toString()}
                data-key={letter}
                className="border-b-8 border-amber-50 p-2"
              ></span>
            );
          })}
        </div>

        {/* Keyboard */}
        <div className="grid grid-cols-10 gap-3 place-items-center text-blue-600 text-xl font-medium pt-8">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={handleClick}
              disabled={
                wrongGuesses === 7 || areArraysEqual(word, guessedLetters)
              }
              className={`w-10 h-10 ${
                wrongGuesses == 7
                  ? "disabled cursor-not-allowed"
                  : "bg-blue-100"
              } cursor-pointer active:scale-90 hover:bg-blue-200 bg-blue-100 rounded transition cursor`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Keyboard;
