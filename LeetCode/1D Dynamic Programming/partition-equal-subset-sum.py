from typing import List


# O(n * t) time || O(t) space
# n == size of nums
# t == the target number
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        if sum(nums) % 2:
            return False

        t = sum(nums) // 2
        prevRes = set()

        prevRes.add(0)
        for i in range(len(nums) - 1, -1, -1):
            temp = set()
            for e in prevRes:
                if (e + nums[i]) == t:
                    return True

                temp.add(e)
                temp.add(e + nums[i])

            prevRes = temp

        return True if t in prevRes else False
