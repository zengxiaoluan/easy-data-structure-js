export class DynamicArray<T> {
  private data: T[];
  private size: number;
  private capacity: number;

  constructor(initialCapacity: number = 4) {
    this.capacity = Math.max(initialCapacity, 1);
    this.data = new Array(this.capacity);
    this.size = 0;
  }

  get length(): number {
    return this.size;
  }

  get(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    return this.data[index];
  }

  set(index: number, value: T): void {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    this.data[index] = value;
  }

  push(value: T): void {
    if (this.size === this.capacity) {
      this.expand();
    }
    this.data[this.size++] = value;
  }

  pop(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }
    const value = this.data[--this.size];
    if (this.size <= this.capacity / 4 && this.capacity > 4) {
      this.reduce();
    }
    return value;
  }

  insert(index: number, value: T): void {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }
    if (this.size === this.capacity) {
      this.expand();
    }
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = value;
    this.size++;
  }

  remove(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    const value = this.data[index];
    for (let i = index; i < this.size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;
    if (this.size <= this.capacity / 4 && this.capacity > 4) {
      this.reduce();
    }
    return value;
  }

  private expand(): void {
    this.capacity *= 2;
    const newData = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }

  private reduce(): void {
    this.capacity = Math.floor(this.capacity / 2);
    const newData = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }

  toArray(): T[] {
    return this.data.slice(0, this.size);
  }
}