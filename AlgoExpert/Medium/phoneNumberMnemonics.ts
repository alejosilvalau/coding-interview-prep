// O(4^n * n) time | O(4^n * n) time space
// n = length of the phone number
//
// The time complexity comes from having n recursive calls
// for each of the digits. Additionally, from using the ".join()"
// function that takes O(n) time.
//
// The space complexity comes from the return array "mnemonicsFound".
export function phoneNumberMnemonics(phoneNumber: string) {
	const currentMnemonic = new Array(phoneNumber.length).fill("0");
	const mnemonicsFound: string[] = [];

	phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound);
	return mnemonicsFound;
}

function phoneNumberMnemonicsHelper(
	idx: number,
	phoneNumber: string,
	currentMnemonic: string[],
	mnemonicsFound: string[]
) {
	if (idx === phoneNumber.length) {
		const mnemonic = currentMnemonic.join("");
		mnemonicsFound.push(mnemonic);
	} else {
		const digit = phoneNumber[idx];
		const letters = DIGIT_LETTERS[digit];
		for (const letter of letters) {
			currentMnemonic[idx] = letter;
			phoneNumberMnemonicsHelper(
				idx + 1,
				phoneNumber,
				currentMnemonic,
				mnemonicsFound
			);
		}
	}
}

const DIGIT_LETTERS: { [digit: string]: string[] } = {
	0: ["0"],
	1: ["1"],
	2: ["a", "b", "c"],
	3: ["d", "e", "f"],
	4: ["g", "h", "i"],
	5: ["j", "k", "l"],
	6: ["m", "n", "o"],
	7: ["p", "q", "r", "s"],
	8: ["t", "u", "v"],
	9: ["w", "x", "y", "z"],
};
