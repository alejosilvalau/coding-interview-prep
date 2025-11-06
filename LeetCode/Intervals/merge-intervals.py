from typing import List

# Time: O(n log n) due to sorting
# Space: o(n) due to the res list


# This algorithm can be further optimized using the greedy technique
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda i: i[0])
        res = [intervals[0]]  # Add the first one to avoid exceptions

        for s, e in intervals[1:]:
            le = res[-1][1]

            if s <= le:
                res[-1][1] = max(le, e)  # There is an overlap in this case
            else:
                res.append([s, e])
        return res
