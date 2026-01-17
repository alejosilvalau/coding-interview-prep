# O(log(n)) time | O(log(n)) space
# n = the input number
class Solution:
    def isHappy(self, n: int) -> bool:
        if n < 0:
            return False

        prevCalc = set()
        res, prevRes = 0, n
        while res != 1:
            digits = [int(d) for d in str(prevRes)]
            for d in digits:
                res += d**2

            if res in prevCalc:
                return False

            prevCalc.add(res)

            prevRes = res
            if res != 1:
                res = 0

        return True
