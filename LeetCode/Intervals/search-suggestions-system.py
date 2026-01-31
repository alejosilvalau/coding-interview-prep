# O(i * p) time | O(p) for algorithm, O(i * p) for output array 
# i == length of the searchWord
# p == length of the products array
class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        sortedProducts = products.sort()
        output = []

        for i in range(len(searchWord)):
            currWord = searchWord[0 : i + 1]
            currRow = []
            for p in products:
                substring = p[0 : i + 1]
                if currWord == substring and len(currRow) < 3:
                    currRow.append(p)
            output.append(currRow)            

        return output
