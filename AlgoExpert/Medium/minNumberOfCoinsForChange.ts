// O(nd) Time | O(n) space
// n is the target amount and d is the number of coin denominations
// It uses Dynamic Programming

export function minNumberOfCoinsForChange(n: number, denoms: number[]) {
	const numOfCoins: number[] = new Array(n + 1).fill(Infinity);
	numOfCoins[0] = 0;
	for (const denom of denoms) {
		for (let amount = 0; amount < numOfCoins.length; amount++) {
			if (denom <= amount) {
				numOfCoins[amount] = Math.min(
					numOfCoins[amount],
					numOfCoins[amount - denom] + 1
				);
			}
		}
	}
	return numOfCoins[n] !== Infinity ? numOfCoins[n] : -1;
}
