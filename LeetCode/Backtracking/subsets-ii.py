from typing import List

# Time complexity: O(n*2^n)
# Space complexity:
#   O(2^n) for for the result list
#   O(n) for the recursion stack
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
      result = []
      nums.sort()

      def backtracking(idx, subset):
        # Base case: if idx is equal to the length of nums, append the current subset
        if idx == len(nums):
          result.append(subset[::])
          return 

        # Include the current number in the subset
        subset.append(nums[idx])
        backtracking(idx + 1, subset)

        # Exclude the current number from the subset
        subset.pop()
        while idx + 1 < len(nums) and nums[idx] == nums[idx + 1]:
          idx += 1
        backtracking(idx + 1, subset)

      # Start backtracking from index 0 with an empty subset  
      backtracking(0, [])
      return result