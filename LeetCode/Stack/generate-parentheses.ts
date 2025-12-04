// O(4^n/√n) time | O(4^n/√n) space
// The number of valid parenthesis combination is given
// by the Catalan number (Cn). Thanks for the fact that strings
// are immutable, then each concatenation of strings takes O(n)
// time. Therefore O(Cn * n) = O(4^n/√n).
//
// In regards to space complexity, the situation is similar. Therefore
// are a max recursion depth of 2n, which takes O(n) space on the call
// stack. Then the algorithm stores Cn of length 2n. This results on
// a space complexity O(Cn * n) = O(4^n/√n).
function generateParenthesis(n: number): string[] {
  const ans: string[] = [];

  function solve(s: string, open: number, close: number): void {
    if (close === n && open === n) {
      ans.push(s);
      return;
    }

    if (open < n) {
      solve(s + '(', open + 1, close);
    }
    if (close < open) {
      solve(s + ')', open, close + 1);
    }
  }

  solve('', 0, 0);
  return ans;
}
