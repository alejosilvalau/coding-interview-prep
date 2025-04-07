type MinStackNode = {
  val: number;
  min: number;
};

class MinStack {
  private stack: MinStackNode[];
  constructor() {
    this.stack = [];
  }

  // O(1) time | O(n) space
  // n == number of elements in the stack
  push(val: number): void {
    this.stack.push({
      val,
      min: this.stack.length === 0 ? val : Math.min(val, this.getMin()),
    });
  }

  // O(1) time | O(n) space
  // n == number of elements in the stack
  pop(): void {
    this.stack.pop();
  }

  // O(1) time | O(n) space
  // n == number of elements in the stack
  top(): number {
    return this.stack[this.stack.length - 1].val;
  }

  // O(1) time | O(n) space
  // n == number of elements in the stack
  getMin(): number {
    return this.stack.length === 0 ? 0 : this.stack[this.stack.length - 1].min;
  }
}
