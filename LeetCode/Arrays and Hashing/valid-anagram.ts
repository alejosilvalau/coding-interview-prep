// O(n) time | O(n) space
// n == length of the longer string
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    const char = map.get(s[i]);
    map.set(s[i], char + 1 || 1);
  }

  let i = 0;
  while (i < t.length) {
    const value = map.get(t[i]);

    if (value === 'undefined') return false;
    if (value === 0) map.delete(t[i]);
    if (value > 0) map.set(t[i], value - 1);

    i++;
  }

  return ![...map.values()].some(Boolean);
}
