// import { minWindow } from './minWindow';

// function minWindow(s: string, t: string): string {

// }

// Test cases
const testCases = [
  { s: 'ADOBECODEBANC', t: 'ABC', expected: 'BANC' },
  { s: 'a', t: 'a', expected: 'a' },
  { s: 'a', t: 'aa', expected: '' },
];

testCases.forEach(test => {
  const result = minWindow(test.s, test.t);
  console.log(`Input: s="${test.s}", t="${test.t}"`);
  console.log(`Output: "${result}"`);
  console.log(`Expected: "${test.expected}"`);
  console.log(`Test ${result === test.expected ? 'PASSED' : 'FAILED'}`);
  console.log('-------------------');
});
