# O(n^2) time | O(1) space
# n == length of the s string


# the time complexity comes from traversing
# the string twice on the checkPalindrome method
# for each character.

# The real time complexity is O(2*(n^2)), but
# as this is an asymptotic calculation, we drop
# the constant leaving only O(n^2).


# This solution uses the two pointer technique.
class Solution:
    res = 0

    def countSubstrings(self, s: str) -> str:
        for i in range(len(s)):

            # odd length
            self.countPalindrome(i, i, s)

            # even length
            self.countPalindrome(i, i + 1, s)

        return self.res

    def countPalindrome(self, sIdx: int, eIdx: int, string: str):
        left, right = sIdx, eIdx

        while left >= 0 and right < len(string) and string[left] == string[right]:
            self.res += 1
            left -= 1
            right += 1
