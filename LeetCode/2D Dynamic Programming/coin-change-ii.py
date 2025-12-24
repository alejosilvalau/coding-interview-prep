from typing import List


class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        currRow = [0] * (amount + 1)
        currRow[0] = 1

        for i in range(len(coins) - 1, -1, -1):
            nextRow = [0] * (amount + 1)
            nextRow[0] = 1

            for a in range(1, amount + 1):
                nextRow[a] = currRow[a]
                if a - coins[i] >= 0:
                    nextRow[a] += nextRow[a - coins[i]]
            currRow = nextRow
        return currRow[amount]


"""
Example: amount = 5, coins = [1, 2, 5] (Processed 5 -> 2 -> 1)

1. START STATE:
   currRow = [1, 0, 0, 0, 0, 0]

2. PROCESSING COIN 5:
   currRow     (old): [1, 0, 0, 0, 0, 0]
   nextRow (new): [1, 0, 0, 0, 0, 1]  (nextRow[5] = currRow[5] + nextRow[0])
   currRow becomes nextRow.

3. PROCESSING COIN 2:
   currRow     (old): [1, 0, 0, 0, 0, 1]
   nextRow (new): [1, 0, 1, 0, 1, 1]
   Calculation steps for nextRow:
   - a=2: currRow[2](0) + nextRow[0](1) = 1
   - a=4: currRow[4](0) + nextRow[2](1) = 1
   - a=5: currRow[5](1) + nextRow[3](0) = 1
   currRow becomes nextRow.

4. PROCESSING COIN 1:
   currRow     (old): [1, 0, 1, 0, 1, 1]
   nextRow (new): [1, 1, 2, 2, 3, 4]
   Calculation steps for nextRow:
   - a=1: currRow[1](0) + nextRow[0](1) = 1
   - a=2: currRow[2](1) + nextRow[1](1) = 2
   - a=3: currRow[3](0) + nextRow[2](2) = 2
   - a=4: currRow[4](1) + nextRow[3](2) = 3
   - a=5: currRow[5](1) + nextRow[4](3) = 4
   currRow becomes nextRow.

RESULT: currRow[5] = 4
"""
