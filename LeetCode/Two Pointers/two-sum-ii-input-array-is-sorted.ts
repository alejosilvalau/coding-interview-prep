// O(n) time | O(1) space
// n = length of the input array
function twoSum(numbers: number[], target: number): number[] {
  let start = 0;
  let end = numbers.length - 1;
  let result: number[] = [];

  while (start < end) {
    let sum = numbers[start] + numbers[end];
    if (sum === target) {
      result[0] = start + 1;
      result[1] = end + 1;
      break;
    } else if (sum < target) {
      start++;
    } else if (sum > target) {
      end--;
    }
  }
  return result;
}
