from typing import List

# O(n*2^n) time | O(n) space
# n == number of candidates
#
# The space complexity doesn't include the space for the output.
# Including it results on O(n*2^n) space complexity.
class Solution:
  def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
    res = []
    candidates.sort()

    def backtrack(start_idx, current_combination, current_sum):
      if current_sum == target:
        res.append(current_combination.copy())
        return
      for i in range(start_idx, len(candidates)):
        if i > start_idx and candidates[i] == candidates[i - 1]:
          continue
        if current_sum + candidates[i] > target:
          break

        current_combination.append(candidates[i])
        backtrack(i + 1, current_combination, current_sum + candidates[i])
        current_combination.pop()

    backtrack(0, [], 0)
    return res