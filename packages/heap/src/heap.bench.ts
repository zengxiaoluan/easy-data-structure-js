import { Heap } from "./heap.js";
import { bench, describe } from "vitest";

describe("Heap Benchmark", () => {
  bench("insert 10000 items", () => {
    const heap = new Heap<[string, number]>((a, b) => a[1] - b[1]);
    for (let i = 0; i < 10000; i++) {
      heap.insert([`item${i}`, Math.random() * 1000]);
    }
  });

  bench("remove 10000 items", () => {
    const heap = new Heap<[string, number]>((a, b) => a[1] - b[1]);
    for (let i = 0; i < 10000; i++) {
      heap.insert([`item${i}`, Math.random() * 1000]);
    }
    while (heap.size > 0) {
      heap.remove();
    }
  });

  bench("build heap from 10000 items", () => {
    const items: [string, number][] = [];
    for (let i = 0; i < 10000; i++) {
      items.push([`item${i}`, Math.random() * 1000]);
    }
    const heap = new Heap<[string, number]>((a, b) => a[1] - b[1]);
    heap.build(items);
  });
});

describe("Array Swap Benchmark", () => {
  const arr = Array.from({ length: 100000 }, (_, i) => i);

  bench("temp variable swap", () => {
    const testArr = [...arr];
    for (let i = 0; i < 10000; i++) {
      const a = Math.floor(Math.random() * testArr.length);
      const b = Math.floor(Math.random() * testArr.length);
      const temp = testArr[a];
      testArr[a] = testArr[b];
      testArr[b] = temp;
    }
  });

  bench("destructuring swap", () => {
    const testArr = [...arr];
    for (let i = 0; i < 10000; i++) {
      const a = Math.floor(Math.random() * testArr.length);
      const b = Math.floor(Math.random() * testArr.length);
      [testArr[a], testArr[b]] = [testArr[b], testArr[a]];
    }
  });

  // bench("XOR swap", () => {
  //   const testArr = [...arr];
  //   for (let i = 0; i < 10000; i++) {
  //     const a = Math.floor(Math.random() * testArr.length);
  //     const b = Math.floor(Math.random() * testArr.length);
  //     if (a !== b) {
  //       testArr[a] ^= testArr[b];
  //       testArr[b] ^= testArr[a];
  //       testArr[a] ^= testArr[b];
  //     }
  //   }
  // });
});
