// O(n) time | O(1) space
// n == length of s2.
//
// In reality is O(26*n) time, as we drop
// the constant numbers we are left with O(n).
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) {
    return false;
  }

  const numberOfChar = 26;
  const initialCharCode = 'a'.charCodeAt(0);

  let s1Count = new Array(numberOfChar).fill(0);
  let s2Count = new Array(numberOfChar).fill(0);
  for (let i = 0; i < s1.length; i++) {
    s1Count[s1.charCodeAt(i) - initialCharCode]++;
    s2Count[s2.charCodeAt(i) - initialCharCode]++;
  }

  let matches = 0;
  for (let i = 0; i < numberOfChar; i++) {
    if (s1Count[i] === s2Count[i]) {
      matches++;
    }
  }

  let left = 0;
  for (let right = s1.length; right < s2.length; right++) {
    if (matches === numberOfChar) {
      return true;
    }

    let index = s2.charCodeAt(right) - initialCharCode;
    s2Count[index]++;
    if (s1Count[index] === s2Count[index]) {
      matches++;
    } else if (s1Count[index] + 1 === s2Count[index]) {
      matches--;
    }

    index = s2.charCodeAt(left) - initialCharCode;
    s2Count[index]--;
    if (s1Count[index] === s2Count[index]) {
      matches++;
    } else if (s1Count[index] - 1 === s2Count[index]) {
      matches--;
    }
    left++;
  }
  return matches === numberOfChar;
}
