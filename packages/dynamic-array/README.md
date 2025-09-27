# Dynamic Array

A TypeScript implementation of a dynamic array data structure that supports automatic expansion and reduction.

## Features

- **Automatic Expansion**: Doubles capacity when full
- **Automatic Reduction**: Halves capacity when size drops to 1/4 of capacity
- **Type Safe**: Full TypeScript support with generics
- **Efficient Operations**: O(1) amortized push/pop operations

## Installation

```bash
npm install @easy-data-structure-js/dynamic-array
```

## Usage

```typescript
import { DynamicArray } from '@easy-data-structure-js/dynamic-array';

// Create a new dynamic array
const arr = new DynamicArray<number>();

// Add elements
arr.push(1);
arr.push(2);
arr.push(3);

// Access elements
console.log(arr.get(0)); // 1
console.log(arr.length); // 3

// Remove elements
const popped = arr.pop(); // 3
const removed = arr.remove(0); // 1

// Insert at specific position
arr.insert(0, 10);

// Convert to regular array
const regularArray = arr.toArray();
```

## API

### Constructor

- `new DynamicArray<T>(initialCapacity?: number)` - Creates a new dynamic array with optional initial capacity (default: 4)

### Properties

- `length: number` - Returns the number of elements in the array

### Methods

- `get(index: number): T` - Gets element at index
- `set(index: number, value: T): void` - Sets element at index
- `push(value: T): void` - Adds element to the end
- `pop(): T | undefined` - Removes and returns last element
- `insert(index: number, value: T): void` - Inserts element at index
- `remove(index: number): T` - Removes and returns element at index
- `toArray(): T[]` - Returns a copy as regular array

## Time Complexity

- Access (get/set): O(1)
- Push: O(1) amortized
- Pop: O(1) amortized
- Insert: O(n)
- Remove: O(n)

## Space Complexity

- O(n) where n is the number of elements