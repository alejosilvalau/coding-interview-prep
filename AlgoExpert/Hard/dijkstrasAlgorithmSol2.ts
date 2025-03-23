// O((v + e) * log(v)) time | O(v) space
// v = number of vertices
// e = number of edges in the input array
export function dijkstrasAlgorithm(start: number, edges: number[][][]) {
  const numberOfVertices = edges.length;

  const minDistances: number[] = [];
  const initialDistances: [number, number][] = [];
  for (let i = 0; i < numberOfVertices; i++) {
    minDistances.push(Infinity);
    initialDistances.push([i, Infinity]);
  }
  minDistances[start] = 0;

  const minDistancesHeap = new MinHeap(initialDistances);
  minDistancesHeap.update(start, 0);

  while (!minDistancesHeap.isEmpty()) {
    const [vertex, currentMinDistance] = minDistancesHeap.remove()!;

    if (currentMinDistance === Infinity) break;

    for (const edge of edges[vertex]) {
      const [destination, distanceToDestination] = edge;

      const newPathDistance = currentMinDistance + distanceToDestination;
      const currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
        minDistancesHeap.update(destination, newPathDistance);
      }
    }
  }
  return minDistances.map(x => (x === Infinity ? -1 : x));
}

// Adapted from previous question
export class MinHeap {
  vertexMap: { [vertex: number]: number };
  heap: [number, number][];

  constructor(array: [number, number][]) {
    // Holds the position in the heap that each vertex is at
    this.vertexMap = array.reduce((obj, _, i) => {
      obj[i] = i;
      return obj;
    }, {} as { [vertex: number]: number });

    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  // O(n) time | O(1) space
  buildHeap(array: [number, number][]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx: number, endIdx: number, heap: [number, number][]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx: number, heap: [number, number][]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(log(n)) time | O(1) space
  remove() {
    if (this.isEmpty()) return;

    this.swap(0, this.heap.length - 1, this.heap);
    const [vertex, distance] = this.heap.pop()!;
    delete this.vertexMap[vertex];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return [vertex, distance];
  }

  swap(i: number, j: number, heap: [number, number][]) {
    this.vertexMap[heap[i][0]] = j;
    this.vertexMap[heap[j][0]] = i;
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }

  update(vertex: number, value: number) {
    this.heap[this.vertexMap[vertex]] = [vertex, value];
    this.siftUp(this.vertexMap[vertex], this.heap);
  }
}
