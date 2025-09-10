import { Heap } from '@easy-data-structure-js/heap';
import { Trie } from '@easy-data-structure-js/trie';

import * as monaco from 'monaco-editor';

(self as any).MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    console.log('moduleId, label', moduleId, label);

    if (label === 'typescript' || label === 'javascript') {
      return './monaco-editor/esm/vs/language/typescript/ts.worker.js';
    }
    return './monaco-editor/esm/vs/editor/editor.worker.js';
  },
};

const output = document.getElementById('output')!;
const runBtn = document.getElementById('runBtn')!;

function log(message: string) {
  const p = document.createElement('p');
  p.textContent = message;
  output.appendChild(p);
}

function clearOutput() {
  output.innerHTML = '';
}

const defaultCode = `// Heap example
const heap = new Heap((a, b) => a - b);

heap.insert(10);
heap.insert(5);
heap.insert(20);

console.log('Heap size: ' + heap.size);
console.log('Min element: ' + heap.findMax());

while (heap.size > 0) {
  console.log('Removed: ' + heap.remove());
}

// Trie example
const trie = new Trie();

trie.insert('apple');
trie.insert('app');
trie.insert('application');

console.log('Search "app": ' + trie.search('app'));
console.log('Search "apple": ' + trie.search('apple'));
console.log('Starts with "app": ' + trie.startsWith('app'));`;

const editor = monaco.editor.create(document.getElementById('codeEditor')!, {
  value: defaultCode,
  language: 'typescript',
  theme: 'vs-dark',
  minimap: { enabled: false },
  fontSize: 14,
  automaticLayout: true,
});

runBtn.addEventListener('click', () => {
  clearOutput();

  try {
    const code = editor.getValue();

    const wrappedCode = `
      (function() {
        ${code}
      })()
    `;

    let originalLog = console.log;
    console.log = log;

    eval(wrappedCode);

    console.log = originalLog;
  } catch (error: any) {
    log('Error: ' + error.message);
  }
});

// Make data structures available globally for the editor
(window as any).Heap = Heap;
(window as any).Trie = Trie;
