# O(n) time | O(1) space
# DP solution
class Solution:
    def climbStairs(self, n: int) -> int:
        one, two = 1, 1

        # Starting from the end, there are two
        # possibilities on each iteration
        for i in range(n - 1, 0, -1):
            temp = one
            one = one + two
            two = temp

        return one
