from typing import List

# Time complexity: O(n * 4^n)
# Space complexity:
#   O(n*4^n) for the result list, in the worst case where all digits map to 4 letters
#   O(n) for the recursion stack
#
# n == length of the input string
# letterCombinations should be named letter_combinations for better readability
# but LeetCode uses camelCase for method names
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        combinations = []
        digit_to_letters = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        def backtrack(index, current_combination):
            # Base case: if the current combination is complete
            if len(current_combination) == len(digits):
                combinations.append(current_combination)
                return
            
            # Iterate through the letters corresponding to the current digit
            for letter in digit_to_letters[digits[index]]:
                backtrack(index + 1, current_combination + letter)

        if digits:
            backtrack(0, "")

        return combinations
