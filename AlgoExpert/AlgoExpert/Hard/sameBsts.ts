// O(n^2) Time | O(d) Space
// n = number of nodes in the tree
// d = depth of the BST tree that the arrays represent

export function sameBsts(arrayOne: number[], arrayTwo: number[]) {
  return areSameBsts(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity);
}

function areSameBsts(
  arrayOne: number[],
  arrayTwo: number[],
  rootIdxOne: number,
  rootIdxTwo: number,
  minVal: number,
  maxVal: number
): boolean {
  if (rootIdxOne === -1 || rootIdxTwo === -1) return rootIdxOne === rootIdxTwo;
  if (arrayOne.length !== arrayTwo.length) return false;
  if (arrayOne[rootIdxOne] !== arrayTwo[rootIdxTwo]) return false;

  const leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal);
  const leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal);
  const rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal);
  const rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal);

  const currentValue = arrayOne[rootIdxOne];
  const leftAreTheSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue);
  const rightAreTheSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal);

  return leftAreTheSame && rightAreTheSame;
}

function getIdxOfFirstSmaller(array: number[], startingIdx: number, minVal: number) {
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] < array[startingIdx] && array[i] >= minVal) return i;
  }
  return -1;
}

function getIdxOfFirstBiggerOrEqual(array: number[], startingIdx: number, maxVal: number) {
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] >= array[startingIdx] && array[i] < maxVal) return i;
  }
  return -1;
}
