from typing import List
from collections import Counter


# O(n) time | O(1) space
# n == length of the hand array
# This is a greedy algorithm
class Solution:
    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
        # If the hand list cannot be divided into the group size
        if len(hand) % groupSize != 0:
            return False

        counterMap = Counter(hand)
        for n in hand:
            start = n

            # While there are numbers available to start,
            # keep pushing backwards the start of the group
            while counterMap[start - 1]:
                start -= 1

            while start <= n:
                # while there are cards left, keep iterating
                while counterMap[start]:
                    for i in range(start, start + groupSize):
                        if not counterMap[i]:
                            return False
                        counterMap[i] -= 1
                start += 1
        return True
