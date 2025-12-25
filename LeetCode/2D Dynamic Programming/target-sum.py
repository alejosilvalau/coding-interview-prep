from collections import defaultdict
from typing import List


# O(n * m) time | O(m) space
# n == number of elements on nums
# m == sum of all the elements on the array
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        map = defaultdict(int)

        # There is one way of adding up to 1,
        # which is not using any number
        map[0] = 1

        for num in nums:
            # Another dictionary not to override the prev values
            nextMap = defaultdict(int)

            for sum, countWays in map.items():
                nextMap[sum + num] += countWays
                nextMap[sum - num] += countWays

            map = nextMap

        return map[target]


# Example walkthrough:
# nums = [2, 3, 5], target = 0
#
# Step 0: Initialize map = {0: 1}
#   (One way to reach sum 0: use no numbers)
#
# Step 1: Process num = 2
#   For each sum in map:
#     sum = 0, countWays = 1
#       nextMap[0 + 2] += 1 -> nextMap[2] = 1
#       nextMap[0 - 2] += 1 -> nextMap[-2] = 1
#   After this step: map = {2: 1, -2: 1}
#
# Step 2: Process num = 3
#   For each sum in map:
#     sum = 2, countWays = 1
#       nextMap[2 + 3] += 1 -> nextMap[5] = 1
#       nextMap[2 - 3] += 1 -> nextMap[-1] = 1
#     sum = -2, countWays = 1
#       nextMap[-2 + 3] += 1 -> nextMap[1] = 1
#       nextMap[-2 - 3] += 1 -> nextMap[-5] = 1
#   After this step: map = {5: 1, -1: 1, 1: 1, -5: 1}
#
# Step 3: Process num = 5
#   For each sum in map:
#     sum = 5, countWays = 1
#       nextMap[5 + 5] += 1 -> nextMap[10] = 1
#       nextMap[5 - 5] += 1 -> nextMap[0] = 1
#     sum = -1, countWays = 1
#       nextMap[-1 + 5] += 1 -> nextMap[4] = 1
#       nextMap[-1 - 5] += 1 -> nextMap[-6] = 1
#     sum = 1, countWays = 1
#       nextMap[1 + 5] += 1 -> nextMap[6] = 1
#       nextMap[1 - 5] += 1 -> nextMap[-4] = 1
#     sum = -5, countWays = 1
#       nextMap[-5 + 5] += 1 -> nextMap[0] += 1 (now nextMap[0] = 2)
#       nextMap[-5 - 5] += 1 -> nextMap[-10] = 1
#   After this step: map = {10: 1, 0: 2, 4: 1, -6: 1, 6: 1, -4: 1, -10: 1}
#
# Final answer: map[0] = 2
# There are 2 ways to assign + and - to [2, 3, 5] to get sum 0:
#   +2 +3 -5 = 0
#   -2 -3 +5 = 0
