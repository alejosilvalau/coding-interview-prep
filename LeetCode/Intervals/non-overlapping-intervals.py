from typing import List


# O(n log n) time due to sorting
# O(1) or O(n) depending on the sorting algorithm
# It implements the greedy technique
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda i: i[0])  # Sort based on the start value
        cnt = 0

        pEnd = intervals[0][1]
        for str, end in intervals[1:]:
            if str >= pEnd:
                pEnd = end  # No overlap
            else:
                cnt += 1  # There is an overlap
                pEnd = min(end, pEnd)
        return cnt
