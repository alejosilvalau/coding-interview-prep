# This is a DP bottom-up solution

# Mathematically speaking, the last row and the last
# column of the matrix will always be 1 on the
# bottom-up approach, since there is only 1 possible move
# on each one:
# | _  _  _  _  1 |
# | _  _  _  _  1 |
# | _  _  _  _  1 |
# | 1  1  1  1  1 |
# The _ represents the sum


# O(m * n) time | O(n) space
# m == Number of rows
# n == Number of columns
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # Make a full row of 1s
        row = [1] * n

        for i in range(m - 1):
            # Make a second row of 1s, ordered from bottom to top
            newRow = [1] * n

            # Iterate from last to first,
            # ignoring the first line of 1s
            for j in range(n - 2, -1, -1):
                newRow[j] = newRow[j + 1] + row[j]

            # Replace the old row with the new one
            row = newRow

        # Return the first cell of the first row
        return row[0]
