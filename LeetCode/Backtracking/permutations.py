from typing import List


# O(n!*n^2) time | O(n) space
# n == length of nums
class Solution:
  def permute(self, nums: List[int]) -> List[List[int]]:
    # Base case: if nums is empty, return a list with an empty list
    if len(nums) == 0:
      return [[]]

    # Recursive case: take the first element and permute the rest
    rest_perms = self.permute(nums[1:])
    result = []

    # For each permutation of the rest, insert the first element at every position
    for perm in rest_perms:
      for i in range(len(perm) + 1):
        new_perm = perm.copy()
        new_perm.insert(i, nums[0])
        result.append(new_perm)

    return result
