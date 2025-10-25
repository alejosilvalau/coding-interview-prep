// O(nlog(n)) time | O(n) space
// n is the length of the array
// Uses the two heaps technique by separating the input array in two parts.

export function sweetAndSavory(dishes: number[], target: number) {
	const sweetDishes = dishes.filter((dish) => dish < 0).sort((a, b) => b - a);
	const savoryDishes = dishes.filter((dish) => dish > 0).sort((a, b) => a - b);

	let bestPair = [0, 0];
	let bestDifference = Infinity;
	let sweetIndex = 0,
		savoryIndex = 0;

	while (sweetIndex < sweetDishes.length && savoryIndex < savoryDishes.length) {
		const currentSum = sweetDishes[sweetIndex] + savoryDishes[savoryIndex];

		if (currentSum <= target) {
			const currentDifference = target - currentSum;
			if (currentDifference < bestDifference) {
				bestDifference = currentDifference;
				bestPair = [sweetDishes[sweetIndex], savoryDishes[savoryIndex]];
			}
			savoryIndex += 1;
		} else {
			sweetIndex += 1;
		}
	}
	return bestPair;
}
