// O(n) time | O(n) space
// n == number of characters of the string s
function isValid(s: string): boolean {
  if (s.length % 2 !== 0) return false;
  let stack: string[] = [];
  let pairs = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  const pairValues = Object.values(pairs);
  for (let char of s) {
    if (pairValues.includes(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
