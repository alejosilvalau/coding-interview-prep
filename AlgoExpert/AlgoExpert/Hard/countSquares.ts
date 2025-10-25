// O(n^2) time | O(n) space
// n == The number of points

export function countSquares(points: number[][]) {
  const set = new Set();
  for (const point of points) set.add(pointToString(point));

  let count = 0;
  for (const pointA of points) {
    for (const pointB of points) {
      if (pointA === pointB) continue;

      const midpoint = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
      const xDistanceFromMid = pointA[0] - midpoint[0];
      const yDistanceFromMid = pointA[1] - midpoint[1];

      const pointC = [midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid];
      const pointD = [midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid];

      if (set.has(pointToString(pointC)) && set.has(pointToString(pointD))) count++;
    }
  }
  return count / 4;
}

function pointToString(point: number[]) {
  return point.join(",");
}
