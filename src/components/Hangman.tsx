import { RootState } from "../app/store";
import React from "react";
import { useSelector } from "react-redux";

const Hangman: React.FC = () => {
  const wrongGuesses = useSelector(
    (state: RootState) => state.hangman.wrongGuesses
  );

  return (
    <>
      {/* this is border or container of hangman */}
      <div className="relative w-40 h-80">
        {/* this is should be base */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
        {/* this should be pole */}
        <div className="absolute bottom-0 left-1/2 w-1 h-full bg-white"></div>
        {/* this should be top bar */}
        <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-white"></div>
        {/* Corner support */}
        <div className="absolute h-1 w-1/4 bg-white top-[15.5px] rotate-[-45deg]  left-[calc(60%-20px)]"></div>
        {/* Here start our hidden Hangman */}
        {/* this should first rope */}
        <div
          id="first-rope"
          className={`absolute ${
            wrongGuesses > 0 ? "bg-red-600" : "hidden"
          } top-0 right-0 w-1 h-1/6 bg-red-400`}
        ></div>
        {/* this should head */}
        <div
          id="head"
          className={`absolute ${
            wrongGuesses > 1 ? "bg-white" : "hidden"
          } top-1/7 right-0 w-16 h-16 bg-white rounded-full`}
          style={{ right: "-32px" }}
        >
          <div className="flex justify-between absolute top-1/4 right-[6px]">
            <span> ✖️ </span>
            <span className="text-white">1</span>
            <span> ✖️ </span>
          </div>
        </div>
        {/* this should body */}
        <div
          id="body"
          className={`absolute ${
            wrongGuesses > 2 ? "bg-white" : "hidden"
          } top-25 right-0 w-1.5 h-28 bg-white`}
          style={{ right: "-4px" }}
        ></div>
        {/* this should left hand */}
        <div
          id="left-hand"
          className={`absolute ${
            wrongGuesses > 3 ? "bg-white" : "hidden"
          } bg-white h-15 w-1.5 right-4 top-28 rotate-[45deg]`}
        ></div>
        {/* this should right hand */}
        <div
          id="right-hand"
          className={`absolute ${
            wrongGuesses > 4 ? "bg-white" : "hidden"
          } bg-white h-15 w-1.5 right-4 top-28 rotate-[-45deg]`}
          style={{ right: "-25px" }}
        ></div>
        {/* this should left leg */}
        <div
          id="left-leg"
          className={`absolute ${
            wrongGuesses > 5 ? "bg-white" : "hidden"
          } bg-white h-15 w-1.5 right-3 top-50 rotate-[35deg]`}
        ></div>
        {/* this should right leg */}
        <div
          id="right-leg"
          className={`absolute ${
            wrongGuesses > 6 ? "bg-white" : "hidden"
          } bg-white h-15 w-1.5 right-4 top-50 rotate-[-41deg]`}
          style={{ right: "-25px" }}
        ></div>
      </div>
    </>
  );
};

export default Hangman;
