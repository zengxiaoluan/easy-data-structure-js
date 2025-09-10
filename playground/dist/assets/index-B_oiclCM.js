import{e as editor$1}from"./monaco-vHxsSbNT.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class s{heapList;heapSize=0;comparator;constructor(e){this.heapList=[0],this.comparator=e}_leftChildIndex(e){return e*2}_rightChildIndex(e){return e*2+1}_parentIndex(e){return Math.floor(e/2)}get size(){return this.heapSize}isEmpty(){return this.size===0}getHeapList(){return structuredClone(this.heapList)}insert(e){this.heapList.push(e),this.heapSize+=1,this._moveUp(this.heapSize)}_moveUp(e){for(;this._parentIndex(e)>0;){const t=this._parentIndex(e);if(this.comparator(this.heapList[e],this.heapList[t])>0){const r=this.heapList[e];this.heapList[e]=this.heapList[t],this.heapList[t]=r,e=t}else break}}findMax(){return this.heapList[1]}remove(){const e=this.findMax();return this.heapList[1]=this.heapList[this.heapSize],this.heapList.pop(),this.heapSize-=1,this._moveDown(1),e}_moveDown(e){for(;this._leftChildIndex(e)<=this.heapSize;){const t=this._findMaxChild(e);if(this.comparator(this.heapList[t],this.heapList[e])>0){const r=this.heapList[t];this.heapList[t]=this.heapList[e],this.heapList[e]=r,e=t}else break}}withConstantCount(e,t){this.heapSize<e?this.insert(t):this.comparator(t,this.findMax())>0&&(this.remove(),this.insert(t))}_findMaxChild(e){const t=this._leftChildIndex(e),r=this._rightChildIndex(e);return r>this.heapSize?t:this.comparator(this.heapList[r],this.heapList[t])>0?r:t}build(e){const t=e.length;this.heapSize=t,this.heapList=[0,...e];let r=this._parentIndex(t);for(;r>0;)this._moveDown(r),r-=1}}self.MonacoEnvironment={getWorkerUrl:function(n,e){return console.log("moduleId, label",n,e),e==="typescript"||e==="javascript"?"./monaco-editor/esm/vs/language/typescript/ts.worker.js":"./monaco-editor/esm/vs/editor/editor.worker.js"}};const output=document.getElementById("output"),runBtn=document.getElementById("runBtn");function log(n){const e=document.createElement("p");e.textContent=n,output.appendChild(e)}function clearOutput(){output.innerHTML=""}const defaultCode=`// Heap example
const heap = new Heap<number>((a, b) => a - b);

heap.insert(10);
heap.insert(5);
heap.insert(20);

log('Heap size: ' + heap.size);
log('Min element: ' + heap.findMax());

while (heap.size > 0) {
  log('Removed: ' + heap.remove());
}`,editor=editor$1.create(document.getElementById("codeEditor"),{value:defaultCode,language:"typescript",theme:"vs-dark",minimap:{enabled:!1},fontSize:14,automaticLayout:!0});runBtn.addEventListener("click",()=>{clearOutput();try{const code=editor.getValue(),wrappedCode=`
      (function() {
        ${code}
      })()
    `;eval(wrappedCode)}catch(n){log("Error: "+n.message)}});window.Heap=s;window.log=log;
