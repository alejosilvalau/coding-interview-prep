// O(log(n)) time | O(1) space
// n == length of the nums array
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (target === nums[middle]) {
      return middle;
    }

    if (nums[left] <= nums[middle]) {
      // Left sorted portion
      if (target > nums[middle] || target < nums[left]) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    } else {
      // Right sorted portion
      if (target < nums[middle] || target > nums[right]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
  }
  return -1;
}
