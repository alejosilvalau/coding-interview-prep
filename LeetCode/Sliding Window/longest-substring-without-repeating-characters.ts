// O(n) time | O(m) space
// n == length of the input string
// m == number of unique characters in the input string
function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    if (map.has(currentChar)) {
      left = Math.max(left, map.get(currentChar)! + 1);
    }
    map.set(currentChar, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
