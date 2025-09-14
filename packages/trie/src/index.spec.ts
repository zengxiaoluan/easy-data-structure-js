import { describe, it, expect } from 'vitest';
import { Trie } from './index';

describe('Trie', () => {
  it('should insert and search words', () => {
    const trie = new Trie();
    trie.insert('apple');

    expect(trie.search('apple')).toBe(true);
    expect(trie.search('app')).toBe(false);
  });

  it('should handle prefix searches', () => {
    const trie = new Trie();
    trie.insert('apple');
    trie.insert('app');

    expect(trie.startsWith('app')).toBe(true);
    expect(trie.startsWith('appl')).toBe(true);
    expect(trie.startsWith('banana')).toBe(false);
  });

  it('should handle multiple words', () => {
    const trie = new Trie();
    trie.insert('cat');
    trie.insert('car');
    trie.insert('card');

    expect(trie.search('cat')).toBe(true);
    expect(trie.search('car')).toBe(true);
    expect(trie.search('card')).toBe(true);
    expect(trie.search('ca')).toBe(false);
  });

  it('should handle empty string', () => {
    const trie = new Trie();
    trie.insert('');

    expect(trie.search('')).toBe(true);
    expect(trie.startsWith('')).toBe(true);
  });

  it('should find the lowest head string', () => {
    const trie = new Trie();
    trie.insert('ca');
    trie.insert('car');
    trie.insert('card');

    expect(trie.findLowestHeadStr('cartoon')).toBe('ca');
    expect(trie.findLowestHeadStr('cater')).toBe('ca');
    expect(trie.findLowestHeadStr('dog')).toBe('dog');
  });
});
