// O(nlog(n)) Time | O(n) Space
// n is the length of the array

export function mergeOverlappingIntervals(intervals: number[][]) {
	const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);

	const mergedIntervals: number[][] = [];
	let currentInterval = sortedIntervals[0];
	mergedIntervals.push(currentInterval);

	for (const nextInterval of sortedIntervals) {
		const [_, currentIntervalEnd] = currentInterval;
		const [nextIntervalStart, nextIntervalEnd] = nextInterval;

		if (currentIntervalEnd >= nextIntervalStart)
			currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
		else {
			currentInterval = nextInterval;
			mergedIntervals.push(currentInterval);
		}
	}

	return mergedIntervals;
}
