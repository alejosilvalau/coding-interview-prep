from typing import List

# O(n) time | O(1) space
# n == length of nums


# The difference from House Robber is that the houses
# are arranged on a circle, so that the first house
# is adjacent to the last house of the array
class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0

        if len(nums) == 1:
            return nums[0]

        return max(self._helper(nums[1:]), self._helper(nums[:-1]))

    def _helper(self, nums: List[int]) -> int:
        sum1, sum2 = 0, 0

        # [sum1, sum2, n, n+1, ...]
        for n in nums:
            # n and sum1 are not adjacent
            temp = max(n + sum1, sum2)
            sum1 = sum2
            sum2 = temp

        return sum2
