from typing import List

# Time complexity: O(n * 2^n) | O(n*2^n) space
# Space complexity:
#   O(n*2^n) for the result list
#   O(n) for the recursion stack
class Solution:
  def partition(self, s: str) -> List[List[str]]:
    result = []

    def backtrack(start, path):
      # Base case: if we've considered the entire string
      if start == len(s):
        result.append(path.copy())
        return

      # Explore all possible end indices for the current partition
      for end in range(start, len(s)):
        if self.is_palindrome(s, start, end):
          path.append(s[start : end + 1])
          backtrack(end + 1, path)
          path.pop()

    backtrack(0, [])
    return result

  # Helper function to check if a substring is a palindrome using two pointers
  def is_palindrome(self, word, left, right):
    while left < right:
      if word[left] != word[right]:
        return False
      left += 1
      right -= 1
    return True
