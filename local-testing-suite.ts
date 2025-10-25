import maxSlidingWindow from './LeetCode/Sliding Window/sliding-window-maximum';

// Test cases
const testCases = [{ s: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, expected: [3, 3, 5, 5, 6, 7] }];

testCases.forEach(test => {
  const result = maxSlidingWindow(test.s, test.k);
  console.log(`Input: s="${test.s}", t="${test.k}"`);
  console.log(`Output: "${result}"`);
  console.log(`Expected: "${test.expected}"`);
  console.log(`Test ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'PASSED' : 'FAILED'}`);
  console.log('-------------------');
});
