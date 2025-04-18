class TimeMap {
  keyStore: Map<string, [number, string][]>;

  constructor() {
    this.keyStore = new Map<string, [number, string][]>();
  }

  // O(1) time | O(m * n) space
  // m == number of keys in the keyStore
  // n == length of the pair array for each key
  set(key: string, value: string, timestamp: number): void {
    if (!this.keyStore.has(key)) {
      this.keyStore.set(key, []);
    }
    this.keyStore.get(key)!.push([timestamp, value]);
  }

  // O(log n) time | O(m * n) space
  // m == number of keys in the keyStore
  // n == length of the pair array for each key
  get(key: string, timestamp: number): string {
    const values = this.keyStore.get(key) || [];
    let left = 0;
    let right = values.length - 1;
    let result = '';

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (values[mid][0] <= timestamp) {
        result = values[mid][1];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }
}
