import { describe, it, expect } from 'vitest';
import { DynamicArray } from './dynamic-array.js';

describe('DynamicArray', () => {
  it('should create empty array with default capacity', () => {
    const arr = new DynamicArray<number>();
    expect(arr.length).toBe(0);
  });

  it('should push and get elements', () => {
    const arr = new DynamicArray<number>();
    arr.push(1);
    arr.push(2);
    arr.push(3);
    
    expect(arr.length).toBe(3);
    expect(arr.get(0)).toBe(1);
    expect(arr.get(1)).toBe(2);
    expect(arr.get(2)).toBe(3);
  });

  it('should expand capacity when full', () => {
    const arr = new DynamicArray<number>(2);
    arr.push(1);
    arr.push(2);
    arr.push(3); // Should trigger expansion
    arr.push(4);
    
    expect(arr.length).toBe(4);
    expect(arr.get(3)).toBe(4);
  });

  it('should pop elements and reduce capacity', () => {
    const arr = new DynamicArray<number>();
    for (let i = 0; i < 10; i++) {
      arr.push(i);
    }
    
    // Pop elements to trigger reduction
    for (let i = 0; i < 8; i++) {
      arr.pop();
    }
    
    expect(arr.length).toBe(2);
    expect(arr.get(0)).toBe(0);
    expect(arr.get(1)).toBe(1);
  });

  it('should handle insert and remove operations', () => {
    const arr = new DynamicArray<number>();
    arr.push(1);
    arr.push(3);
    arr.insert(1, 2);
    
    expect(arr.length).toBe(3);
    expect(arr.get(0)).toBe(1);
    expect(arr.get(1)).toBe(2);
    expect(arr.get(2)).toBe(3);
    
    const removed = arr.remove(1);
    expect(removed).toBe(2);
    expect(arr.length).toBe(2);
    expect(arr.get(1)).toBe(3);
  });

  it('should throw error for invalid index access', () => {
    const arr = new DynamicArray<number>();
    arr.push(1);
    
    expect(() => arr.get(-1)).toThrow('Index out of bounds');
    expect(() => arr.get(1)).toThrow('Index out of bounds');
    expect(() => arr.set(-1, 5)).toThrow('Index out of bounds');
    expect(() => arr.remove(5)).toThrow('Index out of bounds');
  });

  it('should convert to regular array', () => {
    const arr = new DynamicArray<number>();
    arr.push(1);
    arr.push(2);
    arr.push(3);
    
    const regularArray = arr.toArray();
    expect(regularArray).toEqual([1, 2, 3]);
  });

  it('should handle pop on empty array', () => {
    const arr = new DynamicArray<number>();
    expect(arr.pop()).toBeUndefined();
  });
});