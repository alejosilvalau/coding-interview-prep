// O(n) time | O(1) space
// n = length of the input array

// The algorithm uses the sliding window technique to
// find the longest subarray with a target sum.
export function longestSubarrayWithSum(array: number[], targetSum: number) {
  let indices: number[] = [];

  let currentSubarraySum = 0;
  let startingIndex = 0;
  let endingIndex = 0;

  while (endingIndex < array.length) {
    currentSubarraySum += array[endingIndex];
    while (startingIndex < endingIndex && currentSubarraySum > targetSum) {
      currentSubarraySum -= array[startingIndex];
      startingIndex += 1;
    }

    if (currentSubarraySum === targetSum) {
      if (indices.length === 0 || indices[1] - indices[0] < endingIndex - startingIndex) {
        indices = [startingIndex, endingIndex];
      }
    }
    endingIndex += 1;
  }
  return indices;
}
