class Node23<T> {
  keys: T[] = [];
  children: Node23<T>[] = [];
  parent: Node23<T> | null = null;

  isLeaf(): boolean {
    return this.children.length === 0;
  }

  isFull(): boolean {
    return this.keys.length === 2;
  }
}

export class Tree23<T> {
  private root: Node23<T> | null = null;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.compare = compareFn || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  }

  insert(key: T): void {
    if (!this.root) {
      this.root = new Node23<T>();
      this.root.keys.push(key);
      return;
    }

    const leaf = this.findLeaf(key);
    this.insertIntoNode(leaf, key);
  }

  search(key: T): boolean {
    if (!this.root) return false;
    return this.searchInNode(this.root, key);
  }

  private findLeaf(key: T): Node23<T> {
    let current = this.root!;
    
    while (!current.isLeaf()) {
      let i = 0;
      while (i < current.keys.length && this.compare(key, current.keys[i]) > 0) {
        i++;
      }
      current = current.children[i];
    }
    
    return current;
  }

  private searchInNode(node: Node23<T>, key: T): boolean {
    for (let i = 0; i < node.keys.length; i++) {
      const cmp = this.compare(key, node.keys[i]);
      if (cmp === 0) return true;
      if (cmp < 0) {
        return node.isLeaf() ? false : this.searchInNode(node.children[i], key);
      }
    }
    
    return node.isLeaf() ? false : this.searchInNode(node.children[node.keys.length], key);
  }

  private insertIntoNode(node: Node23<T>, key: T): void {
    if (!node.isFull()) {
      this.insertKey(node, key);
    } else {
      this.splitNode(node, key);
    }
  }

  private insertKey(node: Node23<T>, key: T): void {
    let i = 0;
    while (i < node.keys.length && this.compare(key, node.keys[i]) > 0) {
      i++;
    }
    node.keys.splice(i, 0, key);
  }

  private splitNode(node: Node23<T>, key: T): void {
    const keys = [...node.keys, key].sort(this.compare);
    const middleKey = keys[1];
    
    const newNode = new Node23<T>();
    newNode.keys = [keys[2]];
    node.keys = [keys[0]];
    
    if (!node.isLeaf()) {
      const children = [...node.children];
      node.children = children.slice(0, 2);
      newNode.children = children.slice(2);
      newNode.children.forEach(child => child.parent = newNode);
    }
    
    if (!node.parent) {
      const newRoot = new Node23<T>();
      newRoot.keys = [middleKey];
      newRoot.children = [node, newNode];
      node.parent = newRoot;
      newNode.parent = newRoot;
      this.root = newRoot;
    } else {
      newNode.parent = node.parent;
      const parentIndex = node.parent.children.indexOf(node);
      node.parent.children.splice(parentIndex + 1, 0, newNode);
      this.insertIntoNode(node.parent, middleKey);
    }
  }
}