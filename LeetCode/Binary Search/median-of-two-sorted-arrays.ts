// O(log(min(m, n))) time | O(1) space
// n = length of nums1,
// m = length of nums2
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let A = nums1;
  let B = nums2;
  const total = A.length + B.length;
  const half = Math.floor((total + 1) / 2); // + 1 is added to handle even and odd lengths

  if (B.length < A.length) {
    [A, B] = [B, A];
  }

  let left = 0;
  let right = A.length;
  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = half - i;

    const ALeft = i > 0 ? A[i - 1] : -Infinity;
    const ARight = i < A.length ? A[i] : Infinity;
    const BLeft = j > 0 ? B[j - 1] : -Infinity;
    const BRight = j < B.length ? B[j] : Infinity;

    // Check if the partition is correct
    if (ALeft <= BRight && BLeft <= ARight) {
      // Check if the total length is even or odd
      if (total % 2 !== 0) {
        return Math.max(ALeft, BLeft);
      }
      return (Math.max(ALeft, BLeft) + Math.min(ARight, BRight)) / 2;
    } else if (ALeft > BRight) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }
  return -1;
}
