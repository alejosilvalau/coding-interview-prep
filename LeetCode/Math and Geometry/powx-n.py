# O(log(n)) time | O(log(n)) space
# n == the exponent given
# Divide and Conquer approach
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def rec(x, n):
            # Base cases
            if x == 0:
                return 0
            if n == 0:
                return 1

            # Recursive call
            res = rec(x, n // 2)

            # Actual calculation
            res = res * res

            # Odd case handling
            return x * res if n % 2 else res

        res = rec(x, abs(n))

        # Negative case handling
        return res if n >= 0 else 1 / res


"""
TLE Solution:
class Solution:
   def myPow(self, x: float, n: int) -> float:
       if n == 0: return 1
      
       if n < 0:
           res = 1 / x
           for i in range(abs(n) - 1):
               res *= 1 / x
       else:
           res = x
           for i in range(abs(n) - 1):
               res *= x

       return res
"""
