from typing import List


# O(n) time | O(1) space
# n == length of nums array
#
# This solution is based on the "Single Number" problem.
# When doing the XOR(^) operation, same numbers will cancel each other out.
# Therefore, by doing XOR with all the numbers first, then with
# the given array, the only number left will be the missing number.
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        res = 0
        N = len(nums)

        for n in range(N + 1):
            res = n ^ res

        for i in range(N):
            res = nums[i] ^ res

        return res
