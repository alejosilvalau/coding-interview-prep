// O(n) time | O(m) space
// n == length of the input string
// m == number of unique characters in the input string
const characterReplacement = (s: string, k: number): number => {
  const count: { [key: string]: number } = {};
  let longest: number = 0;
  let maxFreq: number = 0;
  let left: number = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right]] = (count[s[right]] || 0) + 1;

    maxFreq = Math.max(maxFreq, count[s[right]]);

    if (maxFreq + k < right - left + 1) {
      count[s[left]]--;
      left++;
    }

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
};
