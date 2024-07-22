export function isValidSubsequence(array: number[], sequence: number[]) {
	let arrIdx = 0;
	let seqIndx = 0;
	while (arrIdx < array.length && seqIndx < sequence.length) {
		if (array[arrIdx] === sequence[seqIndx]) seqIndx++;
		arrIdx++;
	}
	return seqIndx === sequence.length;
}
