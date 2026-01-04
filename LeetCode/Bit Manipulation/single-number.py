# Bit manipulation solution
from typing import List


# O(n) time | O(1) space
# n == length of nums array
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # Since we are using XOR, the starting points is 0
        # because n ^ 0 = n
        res = 0
        for n in nums:
            # ^ is XOR operator
            res = n ^ res
        return res


"""
My own solution: Using a set

# O(n) time | O(n) space
# n == length of nums array
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        visit = set()

        for n in nums:
            if n not in visit:
                visit.add(n)
            else:
                visit.remove(n)

        return visit.pop()
"""
