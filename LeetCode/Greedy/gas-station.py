from typing import List


# O(n) time | O(1) space
# n == length of the gas or cost array, since they are equal length
# There is only one solution for the starting index to return
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        if sum(gas) < sum(cost):
            return -1

        total, res = 0, 0

        for i in range(len(gas)):
            total += gas[i] - cost[i]

            if total < 0:
                total = 0
                res = i + 1

        return res
