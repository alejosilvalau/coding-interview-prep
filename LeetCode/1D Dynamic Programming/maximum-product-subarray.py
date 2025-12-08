from typing import List


# O(n) time | O(1) space
# n == length of the nums list
# Dynamic Programming solution
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        res = max(nums)

        # A variable to track positive max and negative min
        # is needed since -1 * -1 = 1
        currMin, currMax = 1, 1

        for n in nums:
            # Store the previous currMax value
            tmp = currMax * n

            # Triple comparison, useful when the
            # n value is bigger, smaller or is 0
            currMax = max(currMax * n, n, currMin * n)
            currMin = min(tmp, n, currMin * n)

            res = max(res, currMax)

        return res
