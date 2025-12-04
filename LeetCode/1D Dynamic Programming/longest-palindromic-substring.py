# O(n^2) time | O(1) space
# n == length of the s string


# the time complexity comes from traversing
# the string twice on the checkPalindrome method
# for each character.


# This solution uses the two pointer technique.
class Solution:
    res = ""
    resLen = 0

    def longestPalindrome(self, s: str) -> str:
        for i in range(len(s)):

            # odd length
            self.checkPalindrome(i, i, s)

            # even length
            self.checkPalindrome(i, i + 1, s)

        return self.res

    def checkPalindrome(self, sIdx: int, eIdx: int, string: str):
        left, right = sIdx, eIdx

        while left >= 0 and right < len(string) and string[left] == string[right]:
            if (right - left + 1) > self.resLen:
                self.res = string[left : right + 1]
                self.resLen = right - left + 1

            left -= 1
            right += 1
