// O(n) time | O(n) space
// n = length of the input array
function longestConsecutive(nums: number[]): number {
  let numSet = new Set(nums);
  let longest = 0;

  for (let num of numSet) {
    if (!numSet.has(num - 1)) {
      let length = 0;
      while (numSet.has(num + length)) {
        length++;
      }
      longest = Math.max(longest, length);
    }
  }
  return longest;
}
