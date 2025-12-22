#     t e x t 2 +
# t |           0 |
# e |           0 |
# x |           0 |
# t |        ?- 0 |
# 1 |        |\ 0 |
# + | 0 0 0 0 0 0 |


# O(m * n) time | O(m * n) space
# m = length of the text1 string
# n = length of the text2 string
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0 for j in range(len(text2) + 1)] for i in range(len(text1) + 1)]
        for i in range(len(text1) - 1, -1, -1):
            for j in range(len(text2) - 1, -1, -1):
                if text1[i] == text2[j]:
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                else:
                    dp[i][j] = max(dp[i][j + 1], dp[i + 1][j])

        return dp[0][0]
