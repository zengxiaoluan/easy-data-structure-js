// Unit tests for heap.js
describe("MinHeap", () => {
  let heap;

  beforeEach(() => {
    heap = new MinHeap();
  });

  test("should create empty heap", () => {
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
  });

  test("should insert elements correctly", () => {
    heap.insert(5);
    heap.insert(3);
    heap.insert(7);

    expect(heap.size()).toBe(3);
    expect(heap.peek()).toBe(3);
  });

  test("should extract min element", () => {
    heap.insert(5);
    heap.insert(3);
    heap.insert(7);

    expect(heap.extractMin()).toBe(3);
    expect(heap.extractMin()).toBe(5);
    expect(heap.extractMin()).toBe(7);
    expect(heap.isEmpty()).toBe(true);
  });

  test("should maintain heap property after multiple operations", () => {
    heap.insert(10);
    heap.insert(5);
    heap.insert(15);
    heap.insert(1);

    expect(heap.extractMin()).toBe(1);

    heap.insert(2);
    expect(heap.peek()).toBe(2);

    heap.insert(20);
    expect(heap.size()).toBe(4);
  });

  test("should throw error when extracting from empty heap", () => {
    expect(() => heap.extractMin()).toThrow("Heap is empty");
  });

  test("should throw error when peeking empty heap", () => {
    expect(() => heap.peek()).toThrow("Heap is empty");
  });

  test("should clear heap", () => {
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);

    heap.clear();

    expect(heap.isEmpty()).toBe(true);
    expect(heap.size()).toBe(0);
  });

  test("should handle duplicate values", () => {
    heap.insert(5);
    heap.insert(5);
    heap.insert(5);

    expect(heap.size()).toBe(3);
    expect(heap.extractMin()).toBe(5);
    expect(heap.extractMin()).toBe(5);
    expect(heap.extractMin()).toBe(5);
  });
});
