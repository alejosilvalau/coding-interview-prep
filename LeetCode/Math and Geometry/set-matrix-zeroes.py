from typing import List


# O(m*n) time | O(m + n) space
# m == length of rows
# n == length of columns
#
#
# The space complexity comes from using
# two separated sets, rows can grow up to m elements
# and cols can grow up to n elements in the worst case.
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        R, C = len(matrix), len(matrix[0])
        cols, rows = set(), set()
        for r in range(R):
            for c in range(C):
                if matrix[r][c] == 0:
                    cols.add(c)
                    rows.add(r)

        for r in range(R):
            for c in range(C):
                if (r in rows) or (c in cols):
                    matrix[r][c] = 0
