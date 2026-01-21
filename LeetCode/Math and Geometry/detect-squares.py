# This solution can be optimized further with
# an additional map to store the relationship
# between x and y, so that we can only iterate
# on the points that share the same x.

from typing import List


class DetectSquares:
    # O(1) time | O(1) space
    def __init__(self):
        # graph: { (x, y): [count, [list of adjacent points]] }
        self.graph = {}

    # O(N) time | O(N + E) overall
    # N == Number of unique points
    # E == Number of edges for each point
    #
    # The worst space complexity of this solution
    # is O(N^2), which is when all the nodes points
    # to each other.
    def add(self, point: List[int]) -> None:
        tPoint = tuple(point)

        if tPoint in self.graph:
            self.graph[tPoint][0] += 1
            return

        self.graph[tPoint] = [1, []]

        for key in self.graph:
            if key == tPoint:
                continue

            # Check if they share the same X or same Y (but not both)
            if key[0] == tPoint[0] or key[1] == tPoint[1]:
                self.graph[tPoint][1].append(key)
                self.graph[key][1].append(tPoint)

    # Same as add, since the space complexity is per instance
    def count(self, point: List[int]) -> int:
        tPoint = tuple(point)
        px, py = tPoint
        res = 0

        for p1 in self.graph:
            # Finds the vertical neighbour of the reference point
            if p1[0] == px and p1[1] != py:
                side_len = abs(p1[1] - py)

                for nx in [px + side_len, px - side_len]:
                    # Find the horizontal neighbour of the reference point
                    p2 = (nx, py)

                    # Diagonal to the reference point
                    p3 = (nx, p1[1])

                    if p2 in self.graph and p3 in self.graph:
                        # Multiply all the amount of nodes to get the number of ways
                        res += self.graph[p1][0] * self.graph[p2][0] * self.graph[p3][0]

        return res


"""
Most Optimal Solution:

from collections import defaultdict
from typing import List

class DetectSquares:
    def __init__(self):
        # pts_count: stores the frequency of each (x, y) tuple
        self.pts_count = defaultdict(int)
        # x_to_ys: maps an X-coordinate to a set of Y-coordinates present at that X
        # This allows us to only iterate over relevant points in count()
        self.x_to_ys = defaultdict(set)

    def add(self, point: List[int]) -> None:
        x, y = point
        self.pts_count[(x, y)] += 1
        self.x_to_ys[x].add(y)

    def count(self, point: List[int]) -> int:
        px, py = point
        res = 0
        
        # Optimization: Only iterate over Y-coordinates that share the query's X
        # This replaces the "for p1 in self.graph" O(N) loop with a much smaller one
        for y in self.x_to_ys[px]:
            if y == py:
                continue
            
            side_len = abs(y - py)
            
            # Check both right and left sides
            for nx in [px + side_len, px - side_len]:
                # We need three specific corners to exist:
                # 1. (px, y)  -> Already found in our loop
                # 2. (nx, py) -> Same Y as query, different X
                # 3. (nx, y)  -> Same Y as p1, same X as p2
                
                if (nx, py) in self.pts_count and (nx, y) in self.pts_count:
                    # Multiply frequencies of the three other corners
                    res += self.pts_count[(px, y)] * \
                           self.pts_count[(nx, py)] * \
                           self.pts_count[(nx, y)]
        return res
"""
