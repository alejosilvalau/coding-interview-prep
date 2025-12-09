from typing import List

# O(s * w * l) time | O(1) space
# s == length of the string s
# w == amount of words on wordDict
# l == maximum length of any of the words on wordDict


# This is the DP solution for the problem
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Extra slot for the base case
        dp = [False] * (len(s) + 1)
        # Base case
        dp[len(s)] = True

        for i in range(len(s) - 1, -1, -1):
            for word in wordDict:

                # If the s word length is less than the wordDict word length,
                # and the substring word is equal to the actual word from wordDict
                # Then continue the thread of True or False
                if i + len(word) <= len(s) and s[i : i + len(word)] == word:
                    dp[i] = dp[i + len(word)]

                # If it's possible to break the word,
                # then break the cycle
                if dp[i]:
                    break

        return dp[0]
