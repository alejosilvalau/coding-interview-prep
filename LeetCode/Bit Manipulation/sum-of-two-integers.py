# This solution considers ints as 32 bits
class Solution:
    def getSum(self, a: int, b: int) -> int:
        mask = 0xFFFFFFFF

        # b & mask limits binary to 32 bits
        while (b & mask) > 0:
            # Calculate the carry and move one position to the left
            carry = (a & b) << 1
            # XOR a and b, equivalent to + without carry
            a = a ^ b
            b = carry

        res = a & mask

        # The last bit was left to check if it's negative or not,
        # If the last digit from right to left is 1, it means
        # that the character is negative. Otherwise is positive
        if res <= 0x7FFFFFFF:
            return res
        else:
            # This acts as -
            return ~(res ^ mask)


"""
Example Trace: getSum(2, 3)  ->  Binary: a = 10, b = 11

Iteration 1:
 a = 10 (2)
 b = 11 (3)
 carry = (a & b) << 1  => (10 & 11) << 1 => 10 << 1 = 100 (4)
 a = (a ^ b)           => 10 ^ 11 = 01 (1)
 b = carry             => 100 (4)
 Current: a=1, b=4

Iteration 2:
 a = 001 (1)
 b = 100 (4)
 carry = (001 & 100) << 1 => 000 << 1 = 0 (0)
 a = (001 ^ 100)          => 101 (5)
 b = carry                => 0
 Current: a=5, b=0

Loop Ends (b is 0). Result is 5.

Key Logic:
- XOR (^) handles addition without carrying (1+1=0).
- AND (&) identifies where carries occur (1+1=1).
- Left Shift (<<) moves the carry to the next position.
- Masking (& 0xFFFFFFFF) keeps it within 32-bit limits.
"""
