# 2^31 - 1 is the maximum value of a 32 bit integer.
# Thanks to this, the time and space complexity are
# both O(1).
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            # Checks if the number n
            # is odd or even.
            res += n % 2

            # Bit shift to the right by 1
            n = n >> 1

        return res


"""
# My solution, which is as efficient as the 
# bitwise one in regards to time and space complexity.
class Solution:
    def hammingWeight(self, n: int) -> int:
        binary_without_prefix = bin(n)[2:]
        
        total = 0
        for n in binary_without_prefix:
            if n == "1":
                total += 1

        return total
"""
