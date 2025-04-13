// O(n) time | O(n) space
// n == length of the heights array
//
// Even if there are two nested loops,
// each element is evaluated once.
function largestRectangleArea(heights: number[]): number {
  let maxArea = 0;
  const stack: [number, number][] = [];

  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length > 0 && stack[stack.length - 1][0] > heights[i]) {
      const [height, index] = stack.pop()!;
      maxArea = Math.max(maxArea, height * (i - index));
      start = index;
    }
    stack.push([heights[i], start]);
  }

  for (const [height, index] of stack) {
    maxArea = Math.max(maxArea, height * (heights.length - index));
  }

  return maxArea;
}
