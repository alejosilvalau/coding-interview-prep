// O(n * m) time | O(n * m) space
// n = width, m = height
// This is a Dynamic Programming solution

export function numberOfWaysToTraverseGraph(width: number, height: number) {
	const numberOfWays: number[][] = [];
	for (let i = 0; i < height + 1; i++) {
		numberOfWays.push([]);
		for (let j = 0; j < width + 1; j++) {
			numberOfWays[i].push(0);
		}
	}

	for (let widthIdx = 1; widthIdx < width + 1; widthIdx++) {
		for (let heightIdx = 1; heightIdx < height + 1; heightIdx++) {
			if (widthIdx === 1 || heightIdx === 1) {
				numberOfWays[heightIdx][widthIdx] = 1;
			} else {
				const waysLeft = numberOfWays[heightIdx][widthIdx - 1];
				const waysUp = numberOfWays[heightIdx - 1][widthIdx];
				numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp;
			}
		}
	}
	return numberOfWays[height][width];
}
