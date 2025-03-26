// O(n) time | O(n) space
// n == length of the input array
export function maximizeExpression(array: number[]) {
  if (array.length < 4) return 0;
  if (array.length == 4) return array[0] - array[1] + array[2] - array[3];

  const maxOfA = new Array(1).fill(array[0]);
  const maxOfAMinusB = new Array(1).fill(-Infinity);
  const maxOfAMinusBPlusC = new Array(2).fill(-Infinity);
  const maxOfAMinusBPlusCMinusD = new Array(3).fill(-Infinity);

  for (let idx = 1; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfA[idx - 1], array[idx]);
    maxOfA.push(currentMax);
  }

  for (let idx = 1; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusB[idx - 1], maxOfA[idx - 1] - array[idx]);
    maxOfAMinusB.push(currentMax);
  }

  for (let idx = 2; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusBPlusC[idx - 1], maxOfAMinusB[idx - 1] + array[idx]);
    maxOfAMinusBPlusC.push(currentMax);
  }

  for (let idx = 3; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusBPlusCMinusD[idx - 1], maxOfAMinusBPlusC[idx - 1] - array[idx]);
    maxOfAMinusBPlusCMinusD.push(currentMax);
  }

  return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.length - 1];
}
