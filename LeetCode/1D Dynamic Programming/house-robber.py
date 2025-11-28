from typing import List


# O(n) time | O(1) space
# n == length of the nums array
class Solution:
    def rob(self, nums: List[int]) -> int:
        sum1, sum2 = 0, 0

        # [sum1, sum2, n, n+1, ...]
        for n in nums:
            # n and sum1 are not adjacent
            temp = max(n + sum1, sum2)
            sum1 = sum2
            sum2 = temp

        return sum2
