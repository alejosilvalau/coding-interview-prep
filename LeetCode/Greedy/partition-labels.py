from typing import List

# O(n) time | O(1) space

# The space complexity is O(1) because its maximum is O(26)
# which is the number of letters in the alphabet.


# This algorithm is greedy because it
# makes the most local choice at each step.
class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        li = {}  # Map of the last index of each character
        for i, c in enumerate(s):
            li[c] = i

        r = []
        size = end = 0
        # The partition goes on to the max index of the characters on the partition
        for i, c in enumerate(s):
            size += 1
            end = max(end, li[c])

            # the current index is the end index,
            # then add the length of the full partition
            if i == end:
                r.append(size)
                size = 0

        return r
