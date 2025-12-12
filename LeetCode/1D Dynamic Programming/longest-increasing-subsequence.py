from typing import List


# O(n^2) time | O(n) space
# n == length of the nums array
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        # DP[i] will store the length of the longest increasing subsequence starting at index i
        DP = [1] * len(nums)  # Every element is at least an LIS of length 1 (itself)

        # Iterate backwards through the array
        for i in range(len(nums) - 1, -1, -1):
            # For each i, check all elements to its right (j > i)
            for j in range(i + 1, len(nums)):
                # If nums[i] < nums[j], we can extend the subsequence
                if nums[i] < nums[j]:
                    # Update DP[i] if a longer subsequence is found via j
                    DP[i] = max(DP[i], 1 + DP[j])

        # The answer is the maximum value in DP, which represents the LIS anywhere in the array
        return max(DP)


# Example and step-by-step explanation:
#
# Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
#
# Step 1: Initialize DP = [1, 1, 1, 1, 1, 1, 1, 1]
# Each DP[i] means the length of the longest increasing subsequence starting at index i.
#
# Step 2: Iterate from right to left (i from 7 to 0):
#
# i = 7: nums[7] = 18
#   No j > 7, so DP[7] = 1
#
# i = 6: nums[6] = 101
#   j = 7: 101 < 18? No. So DP[6] = 1
#
# i = 5: nums[5] = 7
#   j = 6: 7 < 101? Yes. DP[5] = max(1, 1 + DP[6]) = 2
#   j = 7: 7 < 18? Yes. DP[5] = max(2, 1 + DP[7]) = 2
#   So DP[5] = 2
#
# i = 4: nums[4] = 3
#   j = 5: 3 < 7? Yes. DP[4] = max(1, 1 + DP[5]) = 3
#   j = 6: 3 < 101? Yes. DP[4] = max(3, 1 + DP[6]) = 3
#   j = 7: 3 < 18? Yes. DP[4] = max(3, 1 + DP[7]) = 3
#   So DP[4] = 3
#
# i = 3: nums[3] = 5
#   j = 4: 5 < 3? No.
#   j = 5: 5 < 7? Yes. DP[3] = max(1, 1 + DP[5]) = 3
#   j = 6: 5 < 101? Yes. DP[3] = max(3, 1 + DP[6]) = 3
#   j = 7: 5 < 18? Yes. DP[3] = max(3, 1 + DP[7]) = 3
#   So DP[3] = 3
#
# i = 2: nums[2] = 2
#   j = 3: 2 < 5? Yes. DP[2] = max(1, 1 + DP[3]) = 4
#   j = 4: 2 < 3? Yes. DP[2] = max(4, 1 + DP[4]) = 4
#   j = 5: 2 < 7? Yes. DP[2] = max(4, 1 + DP[5]) = 4
#   j = 6: 2 < 101? Yes. DP[2] = max(4, 1 + DP[6]) = 4
#   j = 7: 2 < 18? Yes. DP[2] = max(4, 1 + DP[7]) = 4
#   So DP[2] = 4
#
# i = 1: nums[1] = 9
#   j = 2: 9 < 2? No.
#   j = 3: 9 < 5? No.
#   j = 4: 9 < 3? No.
#   j = 5: 9 < 7? No.
#   j = 6: 9 < 101? Yes. DP[1] = max(1, 1 + DP[6]) = 2
#   j = 7: 9 < 18? Yes. DP[1] = max(2, 1 + DP[7]) = 2
#   So DP[1] = 2
#
# i = 0: nums[0] = 10
#   j = 1: 10 < 9? No.
#   j = 2: 10 < 2? No.
#   j = 3: 10 < 5? No.
#   j = 4: 10 < 3? No.
#   j = 5: 10 < 7? No.
#   j = 6: 10 < 101? Yes. DP[0] = max(1, 1 + DP[6]) = 2
#   j = 7: 10 < 18? Yes. DP[0] = max(2, 1 + DP[7]) = 2
#   So DP[0] = 2
#
# Final DP: [2, 2, 4, 3, 3, 2, 1, 1]
# The answer is max(DP) = 4 (the LIS is [2, 3, 7, 101])
