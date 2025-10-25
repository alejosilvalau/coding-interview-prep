// O(nd) time | O(n) space
// n is the target amount and d is the number of coin denominations
// Uses a dynamic programming approach to solve the problem

export function numberOfWaysToMakeChange(n: number, denoms: number[]) {
	const ways: number[] = new Array(n + 1).fill(0);
	ways[0] = 1;
	for (let denom of denoms) {
		for (let amount = 1; amount < n + 1; amount++) {
			if (denom <= amount) {
				ways[amount] += ways[amount - denom];
			}
		}
	}
	return ways[n];
}
