// O(n*log(n)) time | O(n) space
// n = length of one of the input arrays
function carFleet(target: number, position: number[], speed: number[]): number {
  let pair = position.map((p, i) => [p, speed[i]]);
  pair.sort((a, b) => b[0] - a[0]);
  let stack: number[] = [];
  for (let [p, s] of pair) {
    stack.push((target - p) / s);
    if (stack.length >= 2 && stack[stack.length - 1] <= stack[stack.length - 2]) {
      stack.pop();
    }
  }
  return stack.length;
}
