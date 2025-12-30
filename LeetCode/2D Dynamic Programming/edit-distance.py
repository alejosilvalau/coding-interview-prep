# O(m * n) time | O(m * n) space
# m = length of the word1
# n = length of the word2
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        dp = [[float("inf")] * (len(word2) + 1) for _ in range(len(word1) + 1)]

        # The amount of options is relative to the length of the word,
        # when the second word is empty. Either by deleting or adding all
        # the letters
        # hola kfdajfkfajf
        for i in range(len(word1) + 1):
            dp[i][len(word2)] = len(word1) - i

        for j in range(len(word2) + 1):
            dp[len(word1)][j] = len(word2) - j

        for i in range(len(word1) - 1, -1, -1):
            for j in range(len(word2) - 1, -1, -1):
                if word1[i] == word2[j]:
                    dp[i][j] = dp[i + 1][j + 1]
                else:
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])

        return int(dp[0][0])
