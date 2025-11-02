from typing import List


# O(v + e) time | O(v + e) space
# v == number of vertices
# e =
class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > (n - 1):
            return False

        adj = [[] for _ in range(n)]
        for x, y in edges:
            adj[x].append(y)
            adj[y].append(x)

        visit = set()

        def dfs(node, parent):
            if node in visit:
                return False

            visit.add(node)
            for n in adj[node]:
                if n == parent:
                    continue
                if not dfs(n, node):
                    return False
            return True

        return dfs(0, -1) and len(visit) == n
