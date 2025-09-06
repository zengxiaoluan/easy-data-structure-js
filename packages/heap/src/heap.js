class Heap {
  constructor(comparator = (a, b) => a[1] - b[1]) {
    this.heapList = [0]; // adding a dummy element at index 0
    this.heapSize = 0;
    this.comparator = comparator;
  }

  /**
   * 某个节点的左节点索引
   */
  _leftChildIndex(index) {
    return index * 2;
  }

  /**
   * 某个节点的右节点索引
   */
  _rightChildIndex(index) {
    return index * 2 + 1;
  }

  /**
   * 某个节点的父节点索引
   */
  _parentIndex(index) {
    return Math.floor(index / 2);
  }

  get size() {
    return this.heapSize;
  }

  getHeapList() {
    return this.heapList;
  }

  /**
   * 往堆中插入一个元素
   */
  insert(value) {
    if (!Array.isArray(value)) {
      throw new Error("Value must be an array, like [key, value]");
    }

    this.heapList.push(value);
    this.heapSize += 1;

    this._moveUp(this.heapSize);
  }

  _moveUp(position) {
    while (this._parentIndex(position) > 0) {
      const parent = this._parentIndex(position);

      if (this.comparator(this.heapList[position], this.heapList[parent]) > 0) {
        const temp = this.heapList[position];
        this.heapList[position] = this.heapList[parent];
        this.heapList[parent] = temp;

        position = parent;
      } else {
        break;
      }
    }
  }

  /**
   * 获取堆中最大的元素，但不删除它
   */
  findMax() {
    if (this.heapSize === 0) return null;

    return this.heapList[1];
  }

  /**
   * 取出堆中最大的元素
   */
  remove() {
    const maxValue = this.findMax();

    this.heapList[1] = this.heapList[this.heapSize];
    this.heapList.pop();
    this.heapSize -= 1;

    this._moveDown(1);

    return maxValue;
  }

  _moveDown(parentPosition) {
    while (this._leftChildIndex(parentPosition) <= this.heapSize) {
      const maxChildPosition = this._findMaxChild(parentPosition);

      if (
        this.comparator(
          this.heapList[maxChildPosition],
          this.heapList[parentPosition]
        ) > 0
      ) {
        const temp = this.heapList[maxChildPosition];

        this.heapList[maxChildPosition] = this.heapList[parentPosition];
        this.heapList[parentPosition] = temp;

        parentPosition = maxChildPosition;
      } else {
        break;
      }
    }
  }

  /**
   * 堆里保持固定数量的元素，并且插入一个新的元素
   * @param {number} count
   * @param {Array} item
   */
  withConstantCount(count, item) {
    if (this.heapSize < count) {
      this.insert(item);
    } else if (this.comparator(item, this.findMax()) > 0) {
      this.remove();
      this.insert(item);
    }
  }

  /**
   * 获取最大的子节点索引
   */
  _findMaxChild(position) {
    const leftChild = this._leftChildIndex(position);
    const rightChild = this._rightChildIndex(position);

    if (rightChild > this.heapSize) {
      return leftChild;
    }

    if (
      this.comparator(this.heapList[rightChild], this.heapList[leftChild]) > 0
    ) {
      return rightChild;
    }

    return leftChild;
  }

  /**
   * 根据给定的数组构建最大堆 heapify
   */
  build(arrayList) {
    const len = arrayList.length;

    this.heapSize = len;
    this.heapList = [0, ...arrayList];

    let position = this._parentIndex(len);

    while (position > 0) {
      this._moveDown(position);
      position -= 1;
    }
  }
}

let heap = new Heap((a, b) => {
  if (a[1] === b[1]) {
    return b[0].localeCompare(a[0]);
  }

  return a[1] - b[1];
});
// heap.insert(["a", 10]);
// heap.insert(["b", 20]);
// heap.insert(["c", 30]);
// heap.insert(["d", 40]);

heap.withConstantCount(1, ["ac", 40]);
heap.withConstantCount(1, ["ac", 30]);

// heap.build([
//   ["a", 20],
//   ["b", 20],
//   ["c", 30],
//   ["d", 40],
// ]);

while (heap.size > 0) {
  console.log(heap.remove());
}
