# Trie

A TypeScript implementation of trie (prefix tree) data structure.

## Installation

```bash
npm install @easy-data-structure-js/trie
```

## Usage

```typescript
import { Trie } from '@easy-data-structure-js/trie';

const trie = new Trie();

// Insert words
trie.insert('apple');
trie.insert('app');

// Search for words
console.log(trie.search('app')); // true
console.log(trie.search('apple')); // true
console.log(trie.search('appl')); // false

// Check if any word starts with prefix
console.log(trie.startsWith('app')); // true
console.log(trie.startsWith('xyz')); // false
```

## API

### `insert(word: string): void`
Inserts a word into the trie.

### `search(word: string): boolean`
Returns true if the word is in the trie.

### `startsWith(prefix: string): boolean`
Returns true if there is any word in the trie that starts with the given prefix.