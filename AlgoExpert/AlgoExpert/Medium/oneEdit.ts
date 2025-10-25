// O(n) time | O(1) space
// n = length of the shorter string
export function oneEdit(stringOne: string, stringTwo: string) {
	const lengthOne = stringOne.length;
	const lengthTwo = stringTwo.length;
	if (Math.abs(lengthOne - lengthTwo) > 1) return false;

	let madeEdit = false;
	let indexOne = 0;
	let indexTwo = 0;

	while (indexOne < lengthOne && indexTwo < lengthTwo) {
		if (stringOne[indexOne] !== stringTwo[indexTwo]) {
			if (madeEdit) return false;
			madeEdit = true;

			if (lengthOne > lengthTwo) {
				indexOne++;
			} else if (lengthTwo > lengthOne) {
				indexTwo++;
			} else {
				indexOne++;
				indexTwo++;
			}
		} else {
			indexOne++;
			indexTwo++;
		}
	}

	return true;
}
