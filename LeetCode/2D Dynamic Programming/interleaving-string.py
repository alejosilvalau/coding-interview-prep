# Being s = number of substrings of s1,
# and t = number of substrings of s2,
# it's not possible mathematically to have
# |s - t| > 1, therefore that condition
# is not checked

# O(n * m) time | O(n * m) space
# n = numbers of characters of s1
# m = numbers of characters of s2


# It can be spaced-optimized further by only using
# two rows instead of all of the rows on the matrix
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False

        result = [[False] * (len(s2) + 1) for i in range(len(s1) + 1)]
        result[len(s1)][len(s2)] = True

        for i in range(len(s1), -1, -1):
            for j in range(len(s2), -1, -1):
                if i < len(s1) and s1[i] == s3[i + j] and result[i + 1][j]:
                    result[i][j] = True
                if j < len(s2) and s2[j] == s3[i + j] and result[i][j + 1]:
                    result[i][j] = True

        return result[0][0]
