# @easy-data-structure-js/heap

A TypeScript implementation of heap data structure with customizable comparator.

## Installation

```bash
npm install @easy-data-structure-js/heap
# or
pnpm add @easy-data-structure-js/heap
```

## Usage

```typescript
import { Heap } from "@easy-data-structure-js/heap";

// Create a min heap
const minHeap = new Heap<number>((a, b) => a - b);

// Create a max heap
const maxHeap = new Heap<number>((a, b) => b - a);

// Insert elements
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(15);

// Get minimum element
console.log(minHeap.findMax()); // 5

// Remove minimum element
console.log(minHeap.remove()); // 5
```

```javascript
import { Heap } from "./heap.js";

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
```

## API

- `insert(value)` - Insert an element into the heap
- `remove()` - Remove and return the top element
- `findMax()` - Get the top element without removing it
- `size` - Get the number of elements in the heap
- `build(array)` - Build heap from an array
- `withConstantCount(count, item)` - Maintain fixed size heap

## License

MIT
