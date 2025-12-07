from typing import List

# O(n * t) time | O(t) space
# t == amount
# n == length of the coins array


# This is the DP solution for the problem. There are others
# like using DFS, BFS or even recursion.
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # An array of amount + 1 slots, with an initial value of amount + 1
        # so that it can be replaced later with the algorithm
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0

        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    # Add 1 coin of the type if results on the min amount needed
                    dp[a] = min(dp[a], 1 + dp[a - c])

        # If there is an amount of coins smaller than amount + 1,
        # means that the algorithm wasn't skipped due to a - c >= 0
        return dp[amount] if dp[amount] != amount + 1 else -1


"""
Example made by AI:

### 💰 Coin Change Algorithm Example: Dynamic Programming

**Goal:** Find the minimum number of coins to make a target amount.
* **Coins:** `[1, 3, 4]`
* **Amount:** `6`

The DP array `dp` stores the minimum number of coins needed for each amount from 0 to 6.

---

### 1. Initialization
$$dp = [amount + 1] * (amount + 1)$$

Since $amount = 6$, $dp$ is initialized to 7 in all spots, and $dp[0]$ is set to 0.

| Amount ($a$) | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$dp[a]$** | 0 | 7 | 7 | 7 | 7 | 7 | 7 |

---

### 2. Iteration (Calculating $dp[a]$)

The core update logic is: $$dp[a] = \min(dp[a], 1 + dp[a - c])$$

#### Amount $a = 1$:
* Using coin $c=1$: $dp[1] = \min(7, 1 + dp[0]) = \min(7, 1 + 0) = \mathbf{1}$
    * *Result:* $dp$ becomes `[0, **1**, 7, 7, 7, 7, 7]`

#### Amount $a = 2$:
* Using coin $c=1$: $dp[2] = \min(7, 1 + dp[1]) = \min(7, 1 + 1) = \mathbf{2}$
    * *Result:* $dp$ becomes `[0, 1, **2**, 7, 7, 7, 7]`

#### Amount $a = 3$:
* Using coin $c=1$: $dp[3] = \min(7, 1 + dp[2]) = \min(7, 1 + 2) = 3$
* Using coin $c=3$: $dp[3] = \min(3, 1 + dp[0]) = \min(3, 1 + 0) = \mathbf{1}$
    * *Result:* $dp$ becomes `[0, 1, 2, **1**, 7, 7, 7]`

#### Amount $a = 4$:
* Using coin $c=1$: $dp[4] = \min(7, 1 + dp[3]) = \min(7, 1 + 1) = 2$
* Using coin $c=3$: $dp[4] = \min(2, 1 + dp[1]) = \min(2, 1 + 1) = 2$
* Using coin $c=4$: $dp[4] = \min(2, 1 + dp[0]) = \min(2, 1 + 0) = \mathbf{1}$
    * *Result:* $dp$ becomes `[0, 1, 2, 1, **1**, 7, 7]`

#### Amount $a = 5$:
* Using coin $c=1$: $dp[5] = \min(7, 1 + dp[4]) = \min(7, 1 + 1) = 2$
* Using coin $c=3$: $dp[5] = \min(2, 1 + dp[2]) = \min(2, 1 + 2) = 2$
* Using coin $c=4$: $dp[5] = \min(2, 1 + dp[1]) = \min(2, 1 + 1) = \mathbf{2}$
    * *Result:* $dp$ becomes `[0, 1, 2, 1, 1, **2**, 7]`

#### Amount $a = 6$ (Target):
* Using coin $c=1$: $dp[6] = \min(7, 1 + dp[5]) = \min(7, 1 + 2) = 3$
* Using coin $c=3$: $dp[6] = \min(3, 1 + dp[3]) = \min(3, 1 + 1) = \mathbf{2}$
* Using coin $c=4$: $dp[6] = \min(2, 1 + dp[2]) = \min(2, 1 + 2) = 2$
    * *Result:* $dp$ becomes `[0, 1, 2, 1, 1, 2, **2**]`

---

### 3. Conclusion

The minimum number of coins required for the amount 6 is stored in $dp[6]$.

**Final Answer:** $dp[6] = \mathbf{2}$ (e.g., two coins of value 3).
"""
