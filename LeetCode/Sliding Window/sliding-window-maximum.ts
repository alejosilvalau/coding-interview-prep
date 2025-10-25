// O(n) time | O(n) space
// n == length of the nums array
//
// Even if the shift operation has an O(n) time complexity,
// it can only happen once per element. This means
// O(n + n) == O(2n) ~= O(n) time complexity.
//
// An actual deque implementation would be more efficient
function maxSlidingWindow(nums: number[], k: number): number[] {
  const n = nums.length;
  const res: number[] = new Array(n - k + 1);
  const deque: number[] = [];
  let left = 0,
    right = 0;

  while (right < n) {
    console.log(`ALGORITHM STATE > left: ${left}, right: ${right}, deque: ${deque}, res: ${res}`);
    // Keep deque in decreasing order
    while (deque.length && nums[deque[deque.length - 1]] < nums[right]) {
      deque.pop();
    }
    deque.push(right);

    // Remove elements outside the window
    if (left > deque[0]) {
      deque.shift();
    }

    // Add result when we have a full window
    if (right + 1 >= k) {
      res[left] = nums[deque[0]];
      left++;
    }
    right++;
  }
  console.log(`ALGORITHM STATE > left: ${left}, right: ${right}, deque: ${deque}, res: ${res}`);
  return res;
}

export default maxSlidingWindow;

//Local test cases:
/*
ALGORITHM STATE > left: 0, right: 0, deque: , res: ,,,,,
ALGORITHM STATE > left: 0, right: 1, deque: 0, res: ,,,,,
ALGORITHM STATE > left: 0, right: 2, deque: 1, res: ,,,,,
ALGORITHM STATE > left: 1, right: 3, deque: 1,2, res: 3,,,,,
ALGORITHM STATE > left: 2, right: 4, deque: 1,2,3, res: 3,3,,,,
ALGORITHM STATE > left: 3, right: 5, deque: 4, res: 3,3,5,,,
ALGORITHM STATE > left: 4, right: 6, deque: 4,5, res: 3,3,5,5,,
ALGORITHM STATE > left: 5, right: 7, deque: 6, res: 3,3,5,5,6,
ALGORITHM STATE > left: 6, right: 8, deque: 7, res: 3,3,5,5,6,7
Input: s="1,3,-1,-3,5,3,6,7", t="3"
Output: "3,3,5,5,6,7"
Expected: "3,3,5,5,6,7"
Test PASSED
*/
