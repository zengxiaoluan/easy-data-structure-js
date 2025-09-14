# Union-Find

A TypeScript implementation of union-find (disjoint set) data structure with path compression and union by rank optimizations.

## Installation

```bash
npm install @easy-data-structure-js/union-find

# or
pnpm add @easy-data-structure-js/union-find
```

## Usage

```typescript
import { UnionFind } from '@easy-data-structure-js/union-find';

const uf = new UnionFind(5); // Create union-find with 5 elements (0-4)

// Union operations
uf.union(0, 1);
uf.union(2, 3);

// Check if elements are connected
console.log(uf.connected(0, 1)); // true
console.log(uf.connected(0, 2)); // false

// Get number of disjoint sets
console.log(uf.getCount()); // 3

// Find root of element
console.log(uf.find(0)); // root of element 0
```

## Features

- Path compression for efficient find operations
- Union by rank for balanced trees
- TypeScript support with full type safety
- Zero dependencies
- Optimized performance: nearly O(1) for both union and find operations

## API

### `constructor(n: number)`

Creates a union-find data structure with n elements (0 to n-1).

### `find(x: number): number`

Finds the root of element x with path compression. Time complexity: O(α(n)) where α is the inverse Ackermann function.

### `union(x: number, y: number): boolean`

Unions the sets containing x and y. Returns true if union was performed, false if they were already connected. Time complexity: O(α(n)).

### `connected(x: number, y: number): boolean`

Returns true if x and y are in the same set. Time complexity: O(α(n)).

### `getCount(): number`

Returns the number of disjoint sets.

## Use Cases

- Network connectivity problems
- Kruskal's minimum spanning tree algorithm
- Dynamic connectivity queries
- Percolation problems
- Image processing (connected components)