# 2-3 Tree

A TypeScript implementation of 2-3 tree data structure - a balanced search tree where each internal node has either 2 or 3 children.

## Installation

```bash
npm install @easy-data-structure-js/2-3-tree

# or
pnpm add @easy-data-structure-js/2-3-tree
```

## Usage

```typescript
import { Tree23 } from '@easy-data-structure-js/2-3-tree';

const tree = new Tree23<number>();

// Insert values
tree.insert(10);
tree.insert(20);
tree.insert(5);
tree.insert(15);

// Search for values
console.log(tree.search(10)); // true
console.log(tree.search(25)); // false

// Custom comparator
const stringTree = new Tree23<string>((a, b) => a.localeCompare(b));
stringTree.insert('apple');
stringTree.insert('banana');
console.log(stringTree.search('apple')); // true
```

## Features

- Self-balancing tree structure
- Guaranteed O(log n) search, insert operations
- Generic implementation supporting any comparable type
- Custom comparator function support
- TypeScript support with full type safety
- Zero dependencies

## API

### `constructor(compareFn?: (a: T, b: T) => number)`

Creates a new 2-3 tree. Optional comparator function for custom ordering.

### `insert(key: T): void`

Inserts a key into the tree. Time complexity: O(log n).

### `search(key: T): boolean`

Searches for a key in the tree. Returns true if found. Time complexity: O(log n).

## Properties

- **Balanced**: All leaf nodes are at the same level
- **Ordered**: In-order traversal yields sorted sequence
- **Efficient**: Guaranteed logarithmic height

## Use Cases

- Database indexing
- Symbol tables
- Ordered data storage
- Range queries preparation
- Educational purposes for understanding balanced trees