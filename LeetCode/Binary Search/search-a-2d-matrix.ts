// O(log(m*n)) time | O(1) space
// m == number of rows in the matrix
// n == number of columns in the matrix
function searchMatrix(matrix: number[][], target: number): boolean {
  let rows = matrix.length;
  let cols = matrix[0].length;

  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    let row = Math.floor(mid / cols);
    let col = mid % cols;

    if (target > matrix[row][col]) {
      left = mid + 1;
    } else if (target < matrix[row][col]) {
      right = mid - 1;
    } else {
      return true;
    }
  }
  return false;
}
