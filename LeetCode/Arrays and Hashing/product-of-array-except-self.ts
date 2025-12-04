// O(n) time | O(1) space
// n = length of the input array
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const ans = new Array(n).fill(0);

  // Calculates the prefixes on the answer array
  let prefProd = 1;
  for (let i = 0; i < n; i++) {
    ans[i] = prefProd;
    prefProd *= nums[i];
  }

  // Calculates the suffixes on the answer array, multiplying with the prefix number.
  let suffProd = 1;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] *= suffProd;
    suffProd *= nums[i];
  }

  return ans;
}
