# O(m * n) time | O(m * n) space
# m == length of string t
# n == length of string s


# dp[i][j + 1] == Skip the current character
# dp[i + 1][j + 1] == Use the current character
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(t), len(s)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        # The empty string t can be matched
        # only 1 way, by choosing nothing
        for j in range(n + 1):
            dp[m][j] = 1

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if t[i] == s[j]:
                    dp[i][j] = dp[i + 1][j + 1] + dp[i][j + 1]
                else:
                    dp[i][j] = dp[i][j + 1]

        return dp[0][0]
