// O(n) time | O(1) space
// n == length of the input array
//
// There is a more elegant solution using DP,
// but I wanted to practice the sliding window technique.
function maxProfit(prices: number[]): number {
  let left = 0;
  let right = 1;
  let maxP = 0;

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      let profit = prices[right] - prices[left];
      maxP = Math.max(maxP, profit);
    } else {
      left = right;
    }
    right++;
  }
  return maxP;
}
