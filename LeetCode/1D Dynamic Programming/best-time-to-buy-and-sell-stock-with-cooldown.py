from typing import List


# This is like a state machine:
# hold: You own a stock. You either bought it today or held it from yesterday.
# sold: You just sold a stock today. You are now entering the mandatory cooldown.
# rest: You don't own a stock and you didn't just sell one. You are free to buy.


# O(n) time | O(1) space
# n == length of the input array
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0

        # Initial states
        # hold: started by buying on day 0
        # sold: impossible to sell on day 0, so set to 0
        # rest: no action taken
        hold, sold, rest = -prices[0], 0, 0

        for i in range(1, len(prices)):
            prev_sold = sold

            # 1. To 'hold', you either keep holding what you had,
            # or you buy today (must have been 'resting' yesterday).
            hold = max(hold, rest - prices[i])

            # 2. To 'sold', you must have 'held' a stock and sold it today.
            sold = hold + prices[i]

            # 3. To 'rest', you either rested yesterday or
            # you are coming off a cooldown (yesterday was 'sold').
            # accumulator of sold / profit
            rest = max(rest, prev_sold)

        # The answer is the max profit of not owning a stock at the end
        return max(sold, rest)


"""
Example Trace: prices = [1, 2, 3, 0, 2]

Initial (Day 0, Price 1):
    hold = -1  (Bought at 1)
    sold =  0  (Can't sell yet)
    rest =  0  (Doing nothing)

Day 1 (Price 2):
    hold = max(-1, 0 - 2)          = -1  (Stay holding)
    sold = -1 + 2                  =  1  (Sold! Profit is 1)
    rest = max(0, 0)               =  0  (Stay resting)

Day 2 (Price 3):
    hold = max(-1, 0 - 3)          = -1  (Stay holding)
    sold = -1 + 3                  =  2  (Sold! Profit is 2)
    rest = max(0, 1)               =  1  (Resting after Day 1's sale)

Day 3 (Price 0):
    hold = max(-1, 1 - 0)          =  1  (Bought at 0 using profit from Day 1)
    sold = -1 + 0                  = -1  (Sold at 0; lower than previous)
    rest = max(1, 2)               =  2  (Resting after Day 2's sale)

Day 4 (Price 2):
    hold = max(1, 2 - 2)           =  1  (Stay holding)
    sold = 1 + 2                   =  3  (Sold! Profit is 3)
    rest = max(2, -1)              =  2  (Stay resting)

Final Result: max(sold, rest) = 3
"""
