// O(n) time | O(n) space
// n = length of the nums array
// It uses Bucket Sort
function topKFrequent(nums: number[], k: number): number[] {
  const counted = new Map<number, number>();
  const bucket: number[][] = [];

  // Fills the array with the frequencies for each number
  for (const num of nums) {
    const count = counted.get(num) || 0;
    counted.set(num, count + 1);
  }

  // Populates the bucket based on number frequencies
  for (const [num, count] of counted.entries()) {
    if (!bucket[count]) bucket[count] = [];
    bucket[count].push(num);
  }

  const results: number[] = [];
  // Traverse the bucket from the end, until we have k elements on the results array
  Main: for (let idx = bucket.length - 1; idx >= 0; idx--) {
    if (!bucket[idx]) continue;

    for (const num of bucket[idx]) {
      results.push(num);
      if (results.length === k) break Main;
    }
  }
  return results;
}
