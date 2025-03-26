// O(n^2) time | O(n) space
// n == length of the input array
export function juiceBottling(prices: number[]) {
  const numSizes = prices.length;
  const maxProfit = new Array(numSizes).fill(0);
  const dividingPoints = new Array(numSizes).fill(0);

  for (let size = 0; size < numSizes; size++) {
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      const possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        dividingPoints[size] = dividingPoint;
      }
    }
  }

  const solution: number[] = [];
  let currentDividingPoint = numSizes - 1;
  while (currentDividingPoint > 0) {
    solution.push(dividingPoints[currentDividingPoint]);
    currentDividingPoint -= dividingPoints[currentDividingPoint];
  }

  return solution;
}
