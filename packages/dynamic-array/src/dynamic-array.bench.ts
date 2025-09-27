import { bench, describe } from 'vitest';
import { DynamicArray } from './dynamic-array.js';

describe('DynamicArray vs Native Array', () => {
  const size = 10000;

  describe(`Push`, () => {
    bench(`DynamicArray push ${size} elements`, () => {
      const arr = new DynamicArray<number>();
      for (let i = 0; i < size; i++) {
        arr.push(i);
      }
    });

    bench(`Native Array push ${size} elements`, () => {
      const arr: number[] = [];
      for (let i = 0; i < size; i++) {
        arr.push(i);
      }
    });
  });

  describe(`Pop`, () => {
    const arr = new DynamicArray<number>();
    for (let i = 0; i < size; i++) {
      arr.push(i);
    }
    bench(`DynamicArray pop ${size} elements`, () => {
      for (let i = 0; i < size; i++) {
        arr.pop();
      }
    });

    const arr2: number[] = [];
    for (let i = 0; i < size; i++) {
      arr2.push(i);
    }
    bench(`Native Array pop ${size} elements`, () => {
      for (let i = 0; i < size; i++) {
        arr2.pop();
      }
    });
  });

  describe('Access', () => {
    const arr = new DynamicArray<number>();
    for (let i = 0; i < size; i++) {
      arr.push(i);
    }
    bench(`DynamicArray random access ${size} elements`, () => {
      for (let i = 0; i < 1000; i++) {
        const index = Math.floor(Math.random() * size);
        arr.get(index);
      }
    });

    const arr2: number[] = [];
    for (let i = 0; i < size; i++) {
      arr2.push(i);
    }
    bench(`Native Array random access ${size} elements`, () => {
      for (let i = 0; i < 1000; i++) {
        const index = Math.floor(Math.random() * size);
        arr2[index];
      }
    });
  });
});
