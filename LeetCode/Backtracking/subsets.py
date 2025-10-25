from typing import List

# O(n*2^n) time | O(n*2^n) space
# n === length of nums
class Solution:
  def subsets(self, nums: List[int]) -> List[List[int]]:
    response = []

    current_subset = []
    def depth_first_search(idx):
      # Base case: if we've considered all numbers
      if idx >= len(nums):
        # Append a copy of the current subset to the response
        # This ensures we do not modify the subset later
        response.append(current_subset.copy())
        return

      # Include the current number and move to the next index
      current_subset.append(nums[idx])
      depth_first_search(idx + 1)

      # Exclude the current number and move to the next index
      current_subset.pop()
      depth_first_search(idx + 1)

    depth_first_search(0)
    return response