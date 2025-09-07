import { Heap } from "./heap.js";
import { describe, it, expect } from "vitest";

describe("Heap", () => {
  it("should create an empty heap", () => {
    const heap = new Heap();
    expect(heap.size).toBe(0);
    expect(heap.isEmpty()).toBe(true);
  });
});
