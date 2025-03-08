// O(n) time | O(1) space
// n == length of the input array
// It uses dynamic programming

export function minNumberOfJumps(array: number[]) {
  if (array.length === 1) return 0;
  let jumps = 0;
  let maxReach = array[0];
  let steps = array[0];
  for (let i = 1; i < array.length - 1; i++) {
    maxReach = Math.max(maxReach, i + array[i]);
    steps--;
    if (steps === 0) {
      jumps++;
      steps = maxReach - i;
    }
  }
  return jumps + 1;
}
