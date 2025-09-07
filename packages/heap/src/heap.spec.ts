import { Heap } from "./heap.js";
import { describe, it, expect } from "vitest";

describe("Heap", () => {
  it("should create an empty heap", () => {
    const heap = new Heap<[string, number]>((a, b) => a[1] - b[1]);
    expect(heap.size).toBe(0);
    expect(heap.isEmpty()).toBe(true);
  });
});
