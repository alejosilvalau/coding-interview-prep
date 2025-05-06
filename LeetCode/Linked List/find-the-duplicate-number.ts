// O(n) time | O(1) space
// n == length of the input array
function findDuplicate(nums: number[]): number {
  let slowPointer = 0,
    fastPointer = 0;

  // Traverse through the list until finding the cycle
  while (true) {
    slowPointer = nums[slowPointer];
    fastPointer = nums[nums[fastPointer]];
    if (slowPointer === fastPointer) break;
  }

  // Find the start of the cycle
  let slowPointer2 = 0;
  while (true) {
    slowPointer = nums[slowPointer];
    slowPointer2 = nums[slowPointer2];
    if (slowPointer === slowPointer2) return slowPointer;
  }
}
