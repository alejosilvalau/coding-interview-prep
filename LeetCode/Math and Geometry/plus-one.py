# The easiest solution is to just treat this as a number

# Still is O(n) time | O(n) space due to
# inserting at the first position of the array
from typing import List


class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        carry = False

        for i in range(len(digits) - 1, -1, -1):
            if carry and digits[i] != 9:
                digits[i] += 1
                carry = False
                break

            if digits[i] == 9:
                carry = True
                digits[i] = 0
                continue
            else:
                digits[i] += 1
                break

        if carry:
            digits.insert(0, 1)  # insert 1 at the beginning
        return digits
