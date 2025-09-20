import { describe, it, expect } from 'vitest';
import { Tree23 } from './index';

describe('Tree23', () => {
  it('should insert and search values', () => {
    const tree = new Tree23<number>();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    
    expect(tree.search(10)).toBe(true);
    expect(tree.search(5)).toBe(true);
    expect(tree.search(15)).toBe(true);
    expect(tree.search(20)).toBe(false);
  });

  it('should handle custom comparator', () => {
    const tree = new Tree23<string>((a, b) => a.localeCompare(b));
    tree.insert('banana');
    tree.insert('apple');
    tree.insert('cherry');
    
    expect(tree.search('apple')).toBe(true);
    expect(tree.search('banana')).toBe(true);
    expect(tree.search('cherry')).toBe(true);
    expect(tree.search('date')).toBe(false);
  });

  it('should handle node splitting', () => {
    const tree = new Tree23<number>();
    for (let i = 1; i <= 10; i++) {
      tree.insert(i);
    }
    
    for (let i = 1; i <= 10; i++) {
      expect(tree.search(i)).toBe(true);
    }
    expect(tree.search(11)).toBe(false);
  });
});