# Think it as counting branches of a decision tree,
# In which a new possibility is added if a new branch
# of possible solutions is valid


# O(n) time | O(1) space
# n == length of the s string
class Solution:
    def numDecodings(self, s: str) -> int:
        count = dp2 = 0
        dp1 = 1

        # [..., n-2, n-1, n, dp2, dp1]
        for i in range(len(s) - 1, -1, -1):
            if s[i] == "0":
                # Invalid
                count = 0
            else:
                # Valid, single digit decode
                count = dp1

            if i + 1 < len(s) and (
                s[i] == "1" or s[i] == "2" and s[i + 1] in "0123456"
            ):
                # Valid, double digit decode
                count += dp2
            count, dp1, dp2 = 0, count, dp1

        return dp1


"""
Example: 226

Possible ways to decode:
- "2 2 6"
- "22 6"
- "2 26"

Answer: 3
"""
