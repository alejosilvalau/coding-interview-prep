# DP solution

# O(n) time | O(n) space
#  The space complexity comes from:
#       O(1) extra space,
#       O(n) for the return array
from typing import List


class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        offset = 1

        for i in range(1, n + 1):
            # Offset is the most significant bit
            # 1, 2, 4, 7, 16...
            if offset * 2 == i:
                offset = i
            dp[i] = 1 + dp[i - offset]
        return dp


"""
# Brute force solution
# Pretty inefficient
# O(n * log(n)) time | O(n) space
# O(1) of extra space, O(n) for the output array
#
# log(n) comes from i starting from 0 to n.
class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = []

        for i in range(n + 1):
            res = 0
            ic = i
            while ic:
                res += ic %2
                ic = ic >> 1
            ans.append(res)

        return ans
"""
