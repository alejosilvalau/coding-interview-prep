// O(n) time | O(m) space
// n == length of the string s
// m == total number of unique characters in t and s
function minWindow(s: string, t: string): string {
  if (t.length > s.length) return '';

  let countTFreqMap: Record<string, number> = {};
  let windowFreqMap: Record<string, number> = {};

  // Fill out the frequency map for string t
  for (let char of t) {
    countTFreqMap[char] = (countTFreqMap[char] || 0) + 1;
  }

  let have = 0;
  let need = Object.keys(countTFreqMap).length;

  let res = [-1, -1];
  let resLen = Infinity;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    // Update the frequency map for the sliding window
    let char = s[right];
    windowFreqMap[char] = (windowFreqMap[char] || 0) + 1;

    // Increase have if the sliding window count is the same
    // for the string t for the given character
    if (countTFreqMap[char] && windowFreqMap[char] === countTFreqMap[char]) {
      have++;
    }

    while (have === need) {
      // Update the result
      let newResLen = right - left + 1;
      if (newResLen < resLen) {
        resLen = newResLen;
        res = [left, right];
      }

      // Reduce the result substring from the left
      // until while condition is not met anymore
      windowFreqMap[s[left]]--;
      if (countTFreqMap[s[left]] && windowFreqMap[s[left]] < countTFreqMap[s[left]]) {
        // If the character reduced was on the string s, then reduce have count
        have--;
      }
      left++;
    }
  }
  return resLen === Infinity ? '' : s.slice(res[0], res[1] + 1);
}
