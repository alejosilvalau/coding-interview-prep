// O(n^2) time | O(n) space
// n == length of the input array
// It uses dynamic programming to solve the problem.
type Disk = [number, number, number];

export function diskStacking(disks: Disk[]) {
  disks.sort((a, b) => a[2] - b[2]);
  const heights = disks.map(disk => disk[2]);
  const sequences: number[] = new Array(disks.length);
  let maxHeightIdx = 0;
  for (let i = 1; i < disks.length; i++) {
    const currentDisk = disks[i];
    for (let j = 0; j < i; j++) {
      const otherDisk = disks[j];
      if (areValidDimensions(otherDisk, currentDisk)) {
        if (heights[i] <= currentDisk[2] + heights[j]) {
          heights[i] = currentDisk[2] + heights[j];
          sequences[i] = j;
        }
      }
    }
    if (heights[i] >= heights[maxHeightIdx]) maxHeightIdx = i;
  }
  return buildSequence(disks, sequences, maxHeightIdx);
}

function areValidDimensions(o: Disk, c: Disk) {
  return o[0] < c[0] && o[1] < c[1] && o[2] < c[2];
}

function buildSequence(array: Disk[], sequences: number[], currentIdx: number) {
  const sequence: Disk[] = [];
  while (currentIdx !== undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}
