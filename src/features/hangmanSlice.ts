import { createSlice } from "@reduxjs/toolkit";
import { wordBank } from "../components/Wordbank";

export interface HangManState {
  category: string;
  word: string[];
  guessedLetters: string[];
  wrongGuesses: number;
}

// Step 1: Get all keys (categories)
const categories = Object.keys(wordBank);

// Step 2: Choose a random category
const randomCategory =
  categories[Math.floor(Math.random() * categories.length)];

const words = wordBank[randomCategory];
const randomWord =
  words[Math.floor(Math.random() * words.length)].toUpperCase();

const initialState: HangManState = {
  category: randomCategory,
  word: randomWord.split(""),
  guessedLetters: [],
  wrongGuesses: 0,
};

export const hangmanSlice = createSlice({
  name: "hangman",
  initialState,
  reducers: {
    addGuessLetter: (state, action) => {
      state.guessedLetters.push(action.payload);
    },
    wrongGuess: (state) => {
      state.wrongGuesses = state.wrongGuesses + 1;
    },
  },
});

export const { addGuessLetter, wrongGuess } = hangmanSlice.actions;
export default hangmanSlice.reducer;
