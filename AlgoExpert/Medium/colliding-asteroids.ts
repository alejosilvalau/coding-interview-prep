// O(n) time | O(n) space
// n = number of asteroids
//
// The algorithm feels like O(n^2). However,
// each asteroid can only be destroyed one time.
// This means, that in the worst case scenario, we
// end up seeing each element twice. Which means O(2n).
//
// Due to Big O being an asymptotic operation, we
// end up getting O(n) time.
export function collidingAsteroids(asteroids: number[]) {
	const resultStack: number[] = [];
	for (const asteroid of asteroids) {
		if (asteroid > 0) {
			resultStack.push(asteroid);
			continue;
		}

		while (true) {
			const lastStackIdx = resultStack.length - 1;
			if (resultStack.length === 0 || resultStack[lastStackIdx] < 0) {
				resultStack.push(asteroid);
				break;
			}

			const asteroidSize = Math.abs(asteroid);
			if (resultStack[lastStackIdx] > asteroidSize) {
				break;
			}

			if (resultStack[lastStackIdx] === asteroidSize) {
				resultStack.pop();
				break;
			}

			resultStack.pop();
		}
	}

	return resultStack;
}
