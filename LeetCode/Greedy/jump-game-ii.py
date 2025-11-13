from typing import List


# O(n) time | O(1) space
# n == length of nums
# It uses two pointers and greedy techniques.
class Solution:
    def jump(self, nums: List[int]) -> int:
        count = 0
        left = right = 0

        while right < len(nums) - 1:
            right_max = 0
            for i in range(left, right + 1):  # The right pointer needs to be included
                right_max = max(right_max, i + nums[i])  # Index plus the jump distance
            left = right + 1  # Start of the next window
            right = right_max
            count += 1
        return count
