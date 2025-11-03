from typing import List


# O(v + (e * a(v))) time | O(v) space
# v == number of vertices
# e == number of edges
# a(v) == Line used to amortize complexity, resulting on lower overall time
class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        par = [i for i in range(n)]
        rank = [1] * n

        # Method to find the root parent of the node
        def find(n):
            res = n
            while res != par[res]:
                par[res] = par[par[res]]  # amortized time complexity
                res = par[res]
            return res

        # Method to union nodes with the root parent of the node with the highest rank
        def union(n1, n2):
            p1, p2 = find(n1), find(n2)

            if p1 == p2:
                return 0

            if rank[p2] > rank[p1]:
                par[p1] = p2
                rank[p2] += rank[p1]
            else:
                par[p2] = p1
                rank[p1] += rank[p2]
            return 1

        res = n
        for n1, n2 in edges:
            res -= union(n1, n2)
        return res
