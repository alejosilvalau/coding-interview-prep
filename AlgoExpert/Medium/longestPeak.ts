// O(n) Time | O(1) Space
// n is the length of the array
// Even if there are multiple loops, the time complexity is still O(n) because
// the elements that can be visited twice are the elements which are on the left
// of the peak. Meaning that it doesn't reach an O(n^2) time complexity.

export function longestPeak(array: number[]) {
	let longestPeakLength = 0;
	let i = 1;
	while (i < array.length - 1) {
		const isPeak = array[i - 1] < array[i] && array[i + 1] < array[i];
		if (!isPeak) {
			i++;
			continue;
		}

		let leftIdx = i - 2;
		while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
			leftIdx--;
		}

		let rightIdx = i + 2;
		while (rightIdx < array.length && array[rightIdx] < array[rightIdx - 1]) {
			rightIdx++;
		}

		const currentPeakLength = rightIdx - leftIdx - 1;
		longestPeakLength = Math.max(longestPeakLength, currentPeakLength);
		i = rightIdx;
	}
	return longestPeakLength;
}
