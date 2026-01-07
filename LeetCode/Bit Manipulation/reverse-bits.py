"""
# String manipulation solution
# O(1) time | O(1) space
# If the size of the int length is
# unbounded, then time and space are O(n).
# However, this problem involves max 32 bits integer
# Therefore, both are O(1) as we drop the constant
class Solution:
    def reverseBits(self, n: int) -> int:
        b = bin(n)[2:]
        rb = b[::-1]
        mis_zeros = '0' * (32 - len(rb))
        rb += mis_zeros
        return int(rb, 2)
"""
