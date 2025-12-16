from collections import defaultdict
from typing import List


class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        dict = defaultdict(list)

        for src, dest in sorted(tickets, reverse=True):
            # We add the dest on reverse order to
            # pop it later from the last to the
            # beginning on lexical order
            dict[src].append(dest)

        res = []

        def dfs(src):
            while dict[src]:
                dfs(dict[src].pop())
            res.append(src)

        dfs("JFK")

        return res[::-1]  # Return the result on reverse order


"""
EXAMPLE TRACE:
    Input: [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]

    Graph State:
      JFK: ["NRT", "KUL"]  <-- "KUL" is at the end (popped first)
      NRT: ["JFK"]
      KUL: []

    Execution Stack:
    1. dfs("JFK"): Pops "KUL". Calls dfs("KUL").
    2.   dfs("KUL"): No neighbors. STUCK.
         -> Append "KUL". Itinerary: ["KUL"]
         -> Returns to Step 1.
    3. dfs("JFK"): Pops "NRT" (next available). Calls dfs("NRT").
    4.   dfs("NRT"): Pops "JFK". Calls dfs("JFK").
    5.     dfs("JFK"): No neighbors left. STUCK.
           -> Append "JFK". Itinerary: ["KUL", "JFK"]
           -> Returns to Step 4.
    6.   dfs("NRT"): No neighbors left. STUCK.
         -> Append "NRT". Itinerary: ["KUL", "JFK", "NRT"]
         -> Returns to Step 1.
    7. dfs("JFK"): No neighbors left. STUCK.
       -> Append "JFK". Itinerary: ["KUL", "JFK", "NRT", "JFK"]

    Final Result:
    The list is currently reversed (End -> Start).
    Return itinerary[::-1] -> ["JFK", "NRT", "JFK", "KUL"]
"""
