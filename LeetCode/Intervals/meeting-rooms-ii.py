from typing import List


class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end


# O(n log n) time due to sorting
# O(n) space due to s_list and e_list
# This implements two pointer technique
class Solution:
    def minMeetingRooms(self, intervals: List[Interval]) -> int:
        s_list = sorted([i.start for i in intervals])
        e_list = sorted([i.end for i in intervals])

        r = c = 0
        s = e = 0  # Two pointers
        while s < len(intervals):
            # If the time when the current meeting ends is greater than the time
            # when the next meeting starts, then a new meetings is concurrently running
            if s_list[s] < e_list[e]:
                s += 1  # A meeting has started
                c += 1
            else:
                e += 1  # A meeting has ended
                c -= 1
            r = max(r, c)
        return r
