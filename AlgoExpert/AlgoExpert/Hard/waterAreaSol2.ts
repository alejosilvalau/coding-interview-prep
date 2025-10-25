// O(n) time | O(1) space
//  n == length of the input array
// The solution uses a mix of two-pointers and dynamic programming
export function waterArea(heights: number[]) {
  if (heights.length === 0) return 0;

  let leftIdx = 0;
  let rightIdx = heights.length - 1;
  let leftMax = heights[leftIdx];
  let rightMax = heights[rightIdx];
  let surfaceArea = 0;

  while (leftIdx < rightIdx) {
    if (heights[leftIdx] < heights[rightIdx]) {
      leftIdx++;
      let leftHeight = heights[leftIdx];
      leftMax = Math.max(leftMax, leftHeight);
      surfaceArea += leftMax - leftHeight;
    } else {
      rightIdx--;
      let rightHeight = heights[rightIdx];
      rightMax = Math.max(rightMax, rightHeight);
      surfaceArea += rightMax - rightHeight;
    }
  }
  return surfaceArea;
}
