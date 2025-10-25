from typing import List

# O(2^(t/m)) time | O(t/m) space 
# t == target value
# m == the minimum candidate
#
# The solution uses backtracking, and the time complexity comes
# from the fact that at each step, we can either include or exclude
# the current candidate, leading to an incomplete binary tree.
class Solution:
  def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
    result = []

    def depthFirstSearch(index: int, currentCombination: List[int], currentSum: int):
      # If we hit the target, add a copy of the current combination
      if currentSum == target:
        result.append(currentCombination.copy())
        return

      # If out of bounds or sum exceeded, stop exploring this path
      if index >= len(candidates) or currentSum > target:
        return

      # Include the current number and stay at the same index (can reuse)
      currentCombination.append(candidates[index])
      depthFirstSearch(index, currentCombination, currentSum + candidates[index])
      currentCombination.pop()

      # Skip the current number and move to the next index
      depthFirstSearch(index + 1, currentCombination, currentSum)

    depthFirstSearch(0, [], 0)
    return result
