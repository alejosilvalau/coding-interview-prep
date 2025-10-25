import React, { useState, useEffect, useReducer } from "react";

const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
const WORD_LENGTH = 5;
const NUM_GUESSES = 6;

function reducer(state, { key, solution }) {
  const { guesses, currentGuess } = state;
  if (guesses[NUM_GUESSES - 1] != null || guesses.includes(solution)) {
    return state;
  }

  switch (key) {
    case "Backspace":
      return { guesses, currentGuess: currentGuess.slice(0, -1) };
    case "Enter":
      if (currentGuess.length !== WORD_LENGTH) return state;
      const currentGuessIndex = guesses.findIndex(guess => guess == null);
      const guessesClone = [...guesses];
      guessesClone[currentGuessIndex] = currentGuess;
      return { guesses: guessesClone, currentGuess: "" };
    default:
      const charCode = key.toLowerCase().charCodeAt(0);
      const isLetter =
        key.length === 1 &&
        charCode >= "a".charCodeAt(0) &&
        charCode <= "z".charCodeAt(0);

      if (currentGuess.length < WORD_LENGTH && isLetter) {
        return { guesses, currentGuess: currentGuess + key.toLowerCase() };
      }
      return state;
  }
}

export default function Wordle() {
  const [{ guesses, currentGuess }, dispatch] = useReducer(reducer, {
    guesses: Array(NUM_GUESSES).fill(null),
    currentGuess: "",
  });
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      const response = await fetch(WORD_LIST_API_URL);
      const words = await response.json();
      setSolution(
        words[Math.floor(Math.random() * words.length)].toLowerCase()
      );
    };

    fetchSolution();
  }, []);

  useEffect(() => {
    if (solution == null) return;

    const onPressKey = event => {
      dispatch({ key: event.key, solution });
    };
    window.addEventListener("keydown", onPressKey);

    return () => window.removeEventListener("keydown", onPressKey);
  }, [solution]);

  const currentGuessIndex = guesses.findIndex(guess => guess == null);

  if (solution == null) return null;

  return (
    <div className='board'>
      {guesses.map((guess, index) => {
        return (
          <GuessLine
            key={index}
            guess={(index === currentGuessIndex
              ? currentGuess
              : guess ?? ""
            ).padEnd(WORD_LENGTH)}
            solution={solution}
            isFinal={currentGuessIndex > index || currentGuessIndex === -1}
          />
        );
      })}
    </div>
  );
}

function GuessLine({ guess, solution, isFinal }) {
  return (
    <div className='line'>
      {guess.split("").map((char, index) => {
        let className = "tile";

        if (isFinal) {
          if (char === solution[index]) {
            className += " correct";
          } else if (solution.includes(char)) {
            className += " close";
          } else {
            className += " incorrect";
          }
        }

        return (
          <div key={index} className={className}>
            {char}
          </div>
        );
      })}
    </div>
  );
}
