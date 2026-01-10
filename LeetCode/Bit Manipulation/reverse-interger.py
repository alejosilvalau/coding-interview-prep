import math


# O(1) time | O(1) space
# Since is a 32 bits integer max
class Solution:
    def reverse(self, x: int) -> int:
        MIN = -(2**31)
        MAX = 2**31 - 1

        res = 0
        while x:
            # x % 10 returns the last digit.
            # Python does mod operation based on the divisor.
            # We need the helper function to maintain the negative sign.
            digit = int(math.fmod(x, 10))
            # x / 10 integer division returns everything
            # except the last digit, rounding to 0.
            # x // 10 rounds to -Inf otherwise.
            x = int(x / 10)

            if (res > MAX // 10) or (res == MAX // 10 and digit > MAX % 10):
                return 0
            if (res < MIN // 10) or (res == MIN // 10 and digit <= MIN % 10):
                return 0

            # res * 10 moves the digit one place
            res = (res * 10) + digit
        return res
