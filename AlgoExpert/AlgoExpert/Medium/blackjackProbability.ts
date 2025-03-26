// O(t - s) time | O(t - s) space
// t = target value
// s = starting hand
//
// It uses Dynamic Programming and Memoization
export function blackjackProbability(target: number, startingHand: number) {
	const memo: { [hand: number]: number } = {};
	return parseFloat(
		calculateProbability(startingHand, target, memo).toFixed(3)
	);
}

function calculateProbability(
	currentHand: number,
	target: number,
	memo: { [hand: number]: number }
) {
	if (currentHand in memo) return memo[currentHand];
	if (currentHand > target) return 1;
	if (currentHand + 4 >= target) return 0;

	let totalProbability = 0;
	for (let drawCard = 1; drawCard <= 10; drawCard++) {
		totalProbability +=
			0.1 * calculateProbability(currentHand + drawCard, target, memo);
	}

	memo[currentHand] = totalProbability;
	return totalProbability;
}
