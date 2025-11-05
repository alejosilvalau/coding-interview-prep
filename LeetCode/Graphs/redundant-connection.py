from typing import List


# O(V + E * a(V)) time | O(V) space
# V == Number of vertices
# E == Number of edges
# a() is a function used on the union find algorithm to amortize complexity
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        N = len(edges)
        par = [i for i in range(N + 1)]  # Nodes are numbered from 1 to n
        rank = [1] * (N + 1)

        # Finds the root parent of the node recursively
        def find(n):
            if n != par[n]:
                par[n] = find(par[n])  # Amortizes complexity
            return par[n]

        def union(n1, n2):
            p1, p2 = find(n1), find(n2)

            # If the nodes are already connected, returns False
            if p1 == p2:
                return False

            # Path compression
            if rank[p1] > rank[p2]:
                par[p2] = p1
                rank[p1] += rank[p2]
            else:
                par[p1] = p2
                rank[p2] += rank[p1]
            # If the nodes are not already connected, return True
            return True

        for n1, n2 in edges:
            # Returns false if it's not the redundant edge
            if not union(n1, n2):
                return [n1, n2]
