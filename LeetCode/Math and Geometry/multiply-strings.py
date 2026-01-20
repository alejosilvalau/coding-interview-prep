# O(m * n) time | O(m + n) space
# m == length of num1
# n == length of num2

# The space complexity comes from currentRowDigits
# and the appended zeros in rowValStr
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        # Edge case for zero
        if num1 == "0" or num2 == "0":
            return "0"

        # Ensure num1 is the longer string for consistent looping
        if len(num2) > len(num1):
            num1, num2 = num2, num1

        prevNum = 0
        # Iterate through num2 (bottom number)
        for j in range(len(num2) - 1, -1, -1):
            carry = 0
            currentRowDigits = []
            dig2 = int(num2[j])

            # Iterate through num1 (top number)
            for i in range(len(num1) - 1, -1, -1):
                dig1 = int(num1[i])

                res = (dig1 * dig2) + carry
                carry = res // 10
                currentRowDigits.append(str(res % 10))

            # The final carry for this row
            if carry:
                currentRowDigits.append(str(carry))

            # Reverse the digits (since we appended), join, and add positional zeros
            # Power of 10 is (length - 1 - current index) since we are traversing backwards
            rowValStr = "".join(currentRowDigits[::-1]) + ("0" * (len(num2) - 1 - j))
            prevNum += int(rowValStr)

        return str(prevNum)
