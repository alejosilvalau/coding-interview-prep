class DoublyNode {
  key: number;
  val: number;
  prev: DoublyNode | null;
  next: DoublyNode | null;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  private cap: number;
  private cache: Map<number, DoublyNode>;
  private left: DoublyNode;
  private right: DoublyNode;

  constructor(capacity: number) {
    this.cap = capacity;
    this.cache = new Map();
    this.left = new DoublyNode(0, 0);
    this.right = new DoublyNode(0, 0);
    this.left.next = this.right;
    this.right.prev = this.left;
  }

  remove(node: DoublyNode) {
    const prev: DoublyNode | null = node.prev;
    const nxt: DoublyNode | null = node.next;
    prev!.next = nxt;
    nxt!.prev = prev;
  }

  insert(node: DoublyNode) {
    const prev: DoublyNode | null = this.right.prev;
    prev!.next = node;
    node.prev = prev;
    node.next = this.right;
    this.right.prev = node;
  }

  // O(1) time | O(n) space
  // n = capacity of the cache
  get(key: number): number {
    if (this.cache.has(key)) {
      const node: DoublyNode | undefined = this.cache.get(key);
      if (node) {
        // Move the accessed node to the right end (most recently used)
        this.remove(node);
        this.insert(node);
      }
      return node!.val;
    }
    return -1;
  }

  // O(1) time | O(n) space
  // n = capacity of the cache
  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key)!);
    }
    const newNode = new DoublyNode(key, value);
    this.cache.set(key, newNode);
    this.insert(newNode);

    if (this.cache.size > this.cap) {
      const lru: DoublyNode | null = this.left.next;
      this.remove(lru!);
      this.cache.delete(lru!.key);
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
