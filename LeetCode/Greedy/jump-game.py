from typing import List


# O(n) time | O(1) space
# n == length of the input array
# It uses the greedy technique
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        goalIdx = len(nums) - 1

        # Start from the end to the start of the array
        for i in range(len(nums) - 1, -1, -1):
            # If the previous index has a sufficient step size, then move the goalIdx backwards
            if i + nums[i] >= goalIdx:
                goalIdx = i

        # If the goalIdx is at the start of the array, means that there
        # is a way to reach the beginning, otherwise there is not
        return True if goalIdx == 0 else False
