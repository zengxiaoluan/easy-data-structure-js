import { Heap } from '@easy-data-structure-js/heap';

// Create output element
const output = document.getElementById('output')!;

function log(message: string) {
  const p = document.createElement('p');
  p.textContent = message;
  output.appendChild(p);
}

// Heap playground
log('=== Heap Playground ===');

const heap = new Heap<[string, number]>((a, b) => {
  if (a[1] === b[1]) {
    return b[0].localeCompare(a[0]);
  }
  return a[1] - b[1];
});

// Test heap operations
heap.insert(['a', 10]);
heap.insert(['b', 20]);
heap.insert(['c', 5]);

log(`Heap size: ${heap.size}`);
log(`Top element: ${JSON.stringify(heap.findMax())}`);

while (heap.size > 0) {
  log(`Removed: ${JSON.stringify(heap.remove())}`);
}