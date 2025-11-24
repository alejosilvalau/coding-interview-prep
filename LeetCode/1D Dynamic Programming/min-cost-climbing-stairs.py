from typing import List


# O(n) time | O(1) space
# n == length of the cost array


# DP solution
# Instead of modifying the input array, another solution
# would be to directly have only two variables and return
# the min of those two.
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        # Start from the end - 3, due to being a zero-indexed
        # array and having two possible choices
        for i in range(len(cost) - 3, -1, -1):
            # On each step, we sum the step with the minimum cost
            cost[i] += min(cost[i + 1], cost[i + 2])

        return min(cost[0], cost[1])
