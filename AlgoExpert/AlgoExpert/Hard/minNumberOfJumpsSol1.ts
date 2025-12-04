// O(n^2) time | O(n) space
// n == length of the input array
// It uses dynamic programming

export function minNumberOfJumps(array: number[]) {
  const jumps: number[] = new Array(array.length).fill(Infinity);
  jumps[0] = 0;
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] >= i - j) {
        jumps[i] = Math.min(jumps[j] + 1, jumps[i]);
      }
    }
  }
  return jumps[jumps.length - 1];
}
