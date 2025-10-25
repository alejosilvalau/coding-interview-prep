// O(n) time | O(n) space
// n = the height of the staircase
//
// This solution is much more effective than the previous one
// because it uses the sliding window technique.
export function staircaseTraversal(height: number, maxSteps: number) {
	let currentNumberOfWays = 0;
	const waysToTop = [1];

	for (let currentHeight = 1; currentHeight < height + 1; currentHeight++) {
		const startOfWindow = currentHeight - maxSteps - 1;
		const endOfWindow = currentHeight - 1;
		if (startOfWindow >= 0) currentNumberOfWays -= waysToTop[startOfWindow];

		currentNumberOfWays += waysToTop[endOfWindow];
		waysToTop.push(currentNumberOfWays);
	}

	return waysToTop[height];
}
