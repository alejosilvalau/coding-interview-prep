from typing import List


# Time Complexity: O(n)
# Space Complexity: O(1)
# n is the length of the input array. This algorithm
# is also known as Kadane's Algorithm
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxSum = nums[0]
        curSum = 0

        for num in nums:
            # If current sum is negative, reset it to 0
            # because starting fresh from the next element might result in a larger sum
            if curSum < 0:
                curSum = 0
            curSum += num
            maxSum = max(maxSum, curSum)
        return maxSum
