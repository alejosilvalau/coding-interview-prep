// O(w * h) Time | O(w * h) Space
// w = width of the matrix
// h = height of the matrix
// It uses dynamic programming.
export function maximumSumSubmatrix(matrix: number[][], size: number) {
  const sums = createSumMatrix(matrix);
  let maxSubMatrixSum = -Infinity;

  for (let row = size - 1; row < matrix.length; row++) {
    for (let col = size - 1; col < matrix[row].length; col++) {
      let total = sums[row][col];

      const touchesTopBorder = row - size < 0;
      if (!touchesTopBorder) total -= sums[row - size][col];

      const touchesLeftBorder = col - size < 0;
      if (!touchesLeftBorder) total -= sums[row][col - size];

      const touchesTopOrLeftBorder = touchesLeftBorder || touchesTopBorder;
      if (!touchesTopOrLeftBorder) total += sums[row - size][col - size];

      maxSubMatrixSum = Math.max(maxSubMatrixSum, total);
    }
  }

  return maxSubMatrixSum;
}

function createSumMatrix(matrix: number[][]) {
  const sums: number[][] = [];
  for (let row = 0; row < matrix.length; row++) {
    sums.push([]);
    for (let col = 0; col < matrix[row].length; col++) {
      sums[row].push(0);
    }
  }
  sums[0][0] = matrix[0][0];

  for (let idx = 1; idx < matrix[0].length; idx++) {
    sums[0][idx] = sums[0][idx - 1] + matrix[0][idx];
  }

  for (let idx = 1; idx < matrix.length; idx++) {
    sums[idx][0] = sums[idx - 1][0] + matrix[idx][0];
  }

  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      sums[row][col] = sums[row - 1][col] + sums[row][col - 1] - sums[row - 1][col - 1] + matrix[row][col];
    }
  }

  return sums;
}
