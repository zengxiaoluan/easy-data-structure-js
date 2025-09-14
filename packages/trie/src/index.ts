class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return true;
  }

  /**
   * Find the lowest head string in the trie that matches the given word.
   * @param word to be searched word
   * @returns
   */
  findLowestHeadStr(word: string) {
    let node = this.root;
    let str = '';
    for (const char of word) {
      if (!node.children.has(char)) {
        return word;
      }

      str += char;
      node = node.children.get(char)!;

      if (node.isEndOfWord) return str;
    }
  }
}
