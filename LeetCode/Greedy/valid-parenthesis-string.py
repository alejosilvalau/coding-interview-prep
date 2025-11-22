# O(n) time | O(1) space
# n == length of the s string
class Solution:
    def checkValidString(self, s: str) -> bool:
        openParMin, openParMax = 0, 0

        for c in s:
            if c == "(":
                openParMin, openParMax = openParMin + 1, openParMax + 1
            elif c == ")":
                openParMin, openParMax = openParMin - 1, openParMax - 1
            else:
                # "*" case, in which it can be either " ", "(" or ")"
                openParMin, openParMax = openParMin - 1, openParMax + 1
            if openParMax < 0:
                # There are more ")" than other character possible
                return False
            if openParMin < 0:
                # In this case, we are not considering "(" as a
                # possible value for "*"
                openParMin = 0
        return openParMin == 0  # All the "(" needs to be closed to return True
