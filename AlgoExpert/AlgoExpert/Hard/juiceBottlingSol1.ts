// O(n^3) time | O(n^2) space
// n == length of the input array
export function juiceBottling(prices: number[]) {
  const numSizes = prices.length;
  const maxProfit = new Array(numSizes).fill(0);
  const solutions: number[][] = new Array(numSizes).fill(undefined).map(_ => []);

  for (let size = 0; size < numSizes; size++) {
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      const possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        solutions[size] = [dividingPoint].concat(solutions[size - dividingPoint]);
      }
    }
  }

  return solutions[numSizes - 1];
}
