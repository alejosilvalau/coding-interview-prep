// O(n * k) time | O(n) space
// n = height of the staircase
// k = number of allowed steps
//
// This uses memoization and dynamic programming to solve the problem.
export function staircaseTraversal(height: number, maxSteps: number) {
	const waysToTop = new Array(height + 1).fill(0);
	waysToTop[0] = 1;
	waysToTop[1] = 1;

	for (let currentHeight = 2; currentHeight < height + 1; currentHeight++) {
		let step = 1;
		while (step <= maxSteps && step <= currentHeight) {
			waysToTop[currentHeight] += waysToTop[currentHeight - step];
			step++;
		}
	}
	return waysToTop[height];
}
