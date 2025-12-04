export function isValidSubsequence(array: number[], sequence: number[]) {
	let i = 0,
		j = 0;
	for (; i < array.length; i++) {
		if (array[i] == sequence[j]) j++;
		if (j == sequence.length) return true;
	}
	return false;
}
