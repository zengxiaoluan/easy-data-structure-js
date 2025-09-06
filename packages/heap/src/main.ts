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
