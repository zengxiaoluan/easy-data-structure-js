import{e as editor$1}from"./monaco-DOVAlb3a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();let s$1=class{heapList;heapSize=0;comparator;constructor(e){this.heapList=[0],this.comparator=e}_leftChildIndex(e){return e*2}_rightChildIndex(e){return e*2+1}_parentIndex(e){return Math.floor(e/2)}get size(){return this.heapSize}isEmpty(){return this.size===0}getHeapList(){return structuredClone(this.heapList)}insert(e){this.heapList.push(e),this.heapSize+=1,this._moveUp(this.heapSize)}_moveUp(e){for(;this._parentIndex(e)>0;){const t=this._parentIndex(e);if(this.comparator(this.heapList[e],this.heapList[t])>0){const i=this.heapList[e];this.heapList[e]=this.heapList[t],this.heapList[t]=i,e=t}else break}}findMax(){return this.heapList[1]}remove(){const e=this.findMax();return this.heapList[1]=this.heapList[this.heapSize],this.heapList.pop(),this.heapSize-=1,this._moveDown(1),e}_moveDown(e){for(;this._leftChildIndex(e)<=this.heapSize;){const t=this._findMaxChild(e);if(this.comparator(this.heapList[t],this.heapList[e])>0){const i=this.heapList[t];this.heapList[t]=this.heapList[e],this.heapList[e]=i,e=t}else break}}withConstantCount(e,t){this.heapSize<e?this.insert(t):this.comparator(t,this.findMax())>0&&(this.remove(),this.insert(t))}_findMaxChild(e){const t=this._leftChildIndex(e),i=this._rightChildIndex(e);return i>this.heapSize?t:this.comparator(this.heapList[i],this.heapList[t])>0?i:t}build(e){const t=e.length;this.heapSize=t,this.heapList=[0,...e];let i=this._parentIndex(t);for(;i>0;)this._moveDown(i),i-=1}};class n{children=new Map;isEndOfWord=!1}class s{root=new n;insert(e){let t=this.root;for(const i of e)t.children.has(i)||t.children.set(i,new n),t=t.children.get(i);t.isEndOfWord=!0}search(e){let t=this.root;for(const i of e){if(!t.children.has(i))return!1;t=t.children.get(i)}return t.isEndOfWord}startsWith(e){let t=this.root;for(const i of e){if(!t.children.has(i))return!1;t=t.children.get(i)}return!0}}self.MonacoEnvironment={getWorkerUrl:function(a,e){return console.log("moduleId, label",a,e),e==="typescript"||e==="javascript"?"./monaco-editor/esm/vs/language/typescript/ts.worker.js":"./monaco-editor/esm/vs/editor/editor.worker.js"}};const output=document.getElementById("output"),runBtn=document.getElementById("runBtn");function log(a){const e=document.createElement("p");e.textContent=a,output.appendChild(e)}function clearOutput(){output.innerHTML=""}const defaultCode=`// Heap example
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
console.log('Starts with "app": ' + trie.startsWith('app'));`,editor=editor$1.create(document.getElementById("codeEditor"),{value:defaultCode,language:"typescript",theme:"vs-dark",minimap:{enabled:!1},fontSize:14,automaticLayout:!0});runBtn.addEventListener("click",()=>{clearOutput();try{const code=editor.getValue(),wrappedCode=`
      (function() {
        ${code}
      })()
    `;let originalLog=console.log;console.log=log,eval(wrappedCode),console.log=originalLog}catch(a){log("Error: "+a.message)}});window.Heap=s$1;window.Trie=s;
