from typing import List


# O(n) time | O(n) space
# n == length of the intervals list
# The space complexity comes from the results list
class Solution:
    def insert(
        self, intervals: List[List[int]], newInterval: List[int]
    ) -> List[List[int]]:
        result = []

        for i in range(len(intervals)):
            if newInterval[1] < intervals[i][0]:
                result.append(newInterval)
                return result + intervals[i:]
            elif newInterval[0] > intervals[i][1]:
                result.append(intervals[i])
            else:
                newInterval = [
                    min(newInterval[0], intervals[i][0]),
                    max(newInterval[1], intervals[i][1]),
                ]
        result.append(newInterval)
        return result
