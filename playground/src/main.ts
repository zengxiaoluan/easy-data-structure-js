import { Heap } from '@easy-data-structure-js/heap';
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
const heap = new Heap<number>((a, b) => a - b);

heap.insert(10);
heap.insert(5);
heap.insert(20);

log('Heap size: ' + heap.size);
log('Min element: ' + heap.findMax());

while (heap.size > 0) {
  log('Removed: ' + heap.remove());
}`;

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
    eval(wrappedCode);
  } catch (error: any) {
    log('Error: ' + error.message);
  }
});

// Make Heap available globally for the editor
(window as any).Heap = Heap;
(window as any).log = log;
