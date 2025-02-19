// O(n * m) time | O(n * m) space
// n == horizontal distance between knightA and knightB
// m == vertical distance between knightA and knightB
type Items = [number, number, number][];

class Queue {
  private items: Items;
  private frontIndex: number;
  private backIndex: number;

  constructor() {
    this.items = [];
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(item: [number, number, number]): void {
    this.items[this.backIndex] = item;
    this.backIndex++;
  }

  dequeue(): [number, number, number] | null {
    if (this.frontIndex === this.backIndex) return null;
    const item = this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }
}

export function knightConnection(knightA: number[], knightB: number[]): number {
  const isVisited: Record<string, boolean> = { [knightA.join(",")]: true };
  const queue = new Queue();
  queue.enqueue([knightA[0], knightA[1], 0]);

  const possibleMoves: [number, number][] = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];

  while (true) {
    let currentPosition = queue.dequeue();
    if (!currentPosition) break;

    if (currentPosition[0] === knightB[0] && currentPosition[1] === knightB[1]) {
      return Math.ceil(currentPosition[2] / 2);
    }

    for (let possibleMove of possibleMoves) {
      const position = [currentPosition[0] + possibleMove[0], currentPosition[1] + possibleMove[1]];
      const newPosition = position.join(",");

      if (!(newPosition in isVisited)) {
        queue.enqueue([position[0], position[1], currentPosition[2] + 1]);
        isVisited[newPosition] = true;
      }
    }
  }

  return -1;
}
