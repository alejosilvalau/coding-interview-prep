from typing import List

"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""


# O(n log n) time due to sorting
# O(1) or O(n) depending on the sorting algorithm
# It implements the greedy technique
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        if len(intervals) == 0:
            return True

        intervals.sort(key=lambda i: i.start)  # Sort based on the start value

        pEnd = intervals[0].end
        for elem in intervals[1:]:
            if elem.start >= pEnd:
                pEnd = elem.end  # No overlap
            else:
                return False  # There is an overlap
        return True
