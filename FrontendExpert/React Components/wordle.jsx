import React, { useState, useEffect } from "react";

const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
const WORD_LENGTH = 5;
const NUM_GUESSES = 6;

export default function Wordle() {
	const [guesses, setGuesses] = useState(Array(NUM_GUESSES).fill(null));
	const [currentGuess, setCurrentGuess] = useState("");
	const [solution, setSolution] = useState(null);

	useEffect(() => {
		const fetchSolution = async () => {
			const response = await fetch(WORD_LIST_API_URL);
			const words = await response.json();
			setSolution(
				words[Math.floor(Math.random() * words.length)]
			).toLowerCase();
		};

		fetchSolution();
	}, []);

	useEffect(() => {
		if (solution == null) return;

		const onPressKey = (event) => {
			if (guesses[NUM_GUESSES - 1] != null || guesses.includes(solution))
				return;

			const charCode = event.key.toLowerCase().charCodeAt(0);
			const isLetter =
				event.key.length === 1 &&
				charCode >= "a".charCodeAt(0) &&
				charCode <= "z".charCodeAt(0);

			setCurrentGuess((prevGuess) => {
				if (event.key === "Backspace") {
					return prevGuess.slice(0, -1);
				} else if (event.key === "Enter" && prevGuess.length === WORD_LENGTH) {
					const currentGuessIndex = guesses.findIndex((guess) => guess == null);
					const guesssesClone = [...guesses];
					guessesClone[currentGuessIndex] = prevGuess;
					setGuesses(guessesClone);
					return "";
				} else if (prevGuess.length < WORD_LENGTH && isLetter) {
					return prevGuess + event.key.toLowerCase();
				}
				return prevGuess;
			});
		};

		window.addEventListener("keydown", onPressKey);
		return () => window.removeEventListener("keydown", onPressKey);
	}, [guesses, solution]);

	const currentGuessIndex = guesses.findIndex((guess) => guess == null);

	if (solution == null) return null;

	return (
		<div className='board'>
			{guesses.map((guess, index) => {
				return (
					<GuessLine
						key={index}
						guess={(i === currentGuessIndex
							? currentGuess
							: guess ?? ""
						).padEnd(WORD_LENGTH)}
						solution={solution}
						isFinal={currentGuessIndex > i || currentGuessIndex === -1}
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
				let className = "title";

				if (isFinal) {
					if (char === solution[index]) {
						className += "correct";
					} else if (solution.includes(char)) {
						className += "close";
					} else {
						className += "incorrect";
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
