(()=>{var t={509:(t,e,i)=>{const n=i(254),a={ACTIVE:"active",NOT_ACTIVE:"not_active",COMPARED:"compared",CURRENT:"current"};function r(t,e,i){let n=t.height;t.height=e.height,e.height=n,$(`#${t.id}`).css("height",t.height),$(`#${t.id}`).css("margin-top",i-t.height),$(`#${e.id}`).css("height",e.height),$(`#${e.id}`).css("margin-top",i-e.height)}function s(t,e){document.getElementById(t.id).className=`bar ${e}`}Object.freeze(a),t.exports=async function(t,e){let i=t.boardBars;for(let e=0;e<i.length-1;e++){let o=!1;t.updateArrayAccesses();for(let h=0;h<i.length-1-e;h++){if(!t.run)return;t.updateArrayAccesses(),s(i[h],a.ACTIVE),s(i[h+1],a.COMPARED),await n(t.speed),t.updateComparisons(),i[h].height>i[h+1].height&&(o=!0,r(i[h],i[h+1],t.height)),s(i[h],a.NOT_ACTIVE),s(i[h+1],a.NOT_ACTIVE)}if(!o)break}e(t)}},82:(t,e,i)=>{const n=i(254),a={ACTIVE:"active",NOT_ACTIVE:"not_active",COMPARED:"compared",CURRENT:"current"};async function r(t,e,i){let h=i,c=2*i+1,d=2*i+2,g=t.boardBars;t.updateArrayAccesses(),t.updateComparisons(),c<e&&g[c].height>g[h].height&&(h=c),t.updateArrayAccesses(),t.updateComparisons(),d<e&&g[d].height>g[h].height&&(h=d),t.run&&(t.updateArrayAccesses(),h!=i&&(o(g[h],a.ACTIVE),o(g[i],a.COMPARED),s(g[i],g[h],t.height),await n(t.speed),o(g[h],a.NOT_ACTIVE),o(g[i],a.NOT_ACTIVE),await r(t,e,h)))}function s(t,e,i){let n=t.height;t.height=e.height,e.height=n,$(`#${t.id}`).css("height",t.height),$(`#${t.id}`).css("margin-top",i-t.height),$(`#${e.id}`).css("height",e.height),$(`#${e.id}`).css("margin-top",i-e.height)}function o(t,e){document.getElementById(t.id).className=`bar ${e}`}Object.freeze(a),t.exports=async function(t,e){let i=t.boardBars,h=i.length;for(let e=Math.floor(h/2)-1;e>=0;e--)await r(t,h,e);for(let e=h-1;e>0;e--)o(i[e],a.ACTIVE),o(i[0],a.COMPARED),t.updateArrayAccesses(),s(i[0],i[e],t.height),await n(t.speed),o(i[e],a.NOT_ACTIVE),o(i[0],a.NOT_ACTIVE),await r(t,e,0);t.run&&e(t)}},211:(t,e,i)=>{const n=i(254),a={ACTIVE:"active",NOT_ACTIVE:"not_active",COMPARED:"compared",CURRENT:"current"};function r(t,e,i){let n=t.height;t.height=e.height,e.height=n,$(`#${t.id}`).css("height",t.height),$(`#${t.id}`).css("margin-top",i-t.height),$(`#${e.id}`).css("height",e.height),$(`#${e.id}`).css("margin-top",i-e.height)}function s(t,e){document.getElementById(t.id).className=`bar ${e}`}Object.freeze(a),t.exports=async function(t,e){let i=t.boardBars;for(let e=1;e<i.length;e++){t.updateArrayAccesses();let o=i[e],h=e-1;if(!t.run)return;for(s(i[e],a.ACTIVE);h>=0&&i[h].height>o.height;)t.updateArrayAccesses(),t.updateComparisons(),s(i[h],a.CURRENT),r(i[h],o,t.height),o=i[h],await n(t.speed),s(i[h],a.NOT_ACTIVE),h-=1;s(o,a.NOT_ACTIVE)}e(t)}},3:(t,e,i)=>{const n=i(254),a={ACTIVE:"active",NOT_ACTIVE:"not_active",COMPARED:"compared",CURRENT:"current"};async function r(t,e,i,h){if(e>=i)return;let c=Math.floor(e+(i-e)/2);await r(t,e,c,h),await r(t,c+1,i,h),h.run&&await async function(t,e,i,r,h){let c=i-e+1,d=r-i,g=[],l=[];for(let i=0;i<c;i++)o(t[e+i],a.ACTIVE),h.updateArrayAccesses(),g.push(t[e+i].height),o(t[e+i],a.NOT_ACTIVE);for(let e=0;e<d;e++)o(t[i+1+e],a.ACTIVE),h.updateArrayAccesses(),l.push(t[i+1+e].height),o(t[i+1+e],a.NOT_ACTIVE);let m=0,u=0,p=e;for(;m<c&&u<d;)o(t[p],a.ACTIVE),o(t[m+e],a.COMPARED),o(t[i+1+u],a.COMPARED),await n(h.speed),h.updateComparisons(),h.updateArrayAccesses(),g[m]<=l[u]?(s(t[p],g[m],h.height),o(t[m+e],a.NOT_ACTIVE),o(t[i+1+u],a.NOT_ACTIVE),m++):(s(t[p],l[u],h.height),o(t[m+e],a.NOT_ACTIVE),o(t[i+1+u],a.NOT_ACTIVE),u++),o(t[p],a.NOT_ACTIVE),p++;for(;m<c;)h.updateArrayAccesses(),o(t[p],a.ACTIVE),s(t[p],g[m],h.height),await n(h.speed),o(t[p],a.NOT_ACTIVE),m++,p++;for(;u<d;)h.updateArrayAccesses(),o(t[p],a.ACTIVE),s(t[p],l[u],h.height),await n(h.speed),o(t[p],a.NOT_ACTIVE),u++,p++}(t,e,c,i,h)}function s(t,e,i){t.height=e,$(`#${t.id}`).css("height",t.height),$(`#${t.id}`).css("margin-top",i-t.height)}function o(t,e){document.getElementById(t.id).className=`bar ${e}`}Object.freeze(a),t.exports=async function(t,e){let i=t.boardBars;await r(i,0,i.length-1,t),t.run&&e(t)}},195:(t,e,i)=>{const n=i(254),a={ACTIVE:"active",NOT_ACTIVE:"not_active",COMPARED:"compared",CURRENT:"current"};async function r(t,e,i,h){if(e>=i)return;let c=await async function(t,e,i,r){let h=function(t,e){return Math.floor(Math.random()*(e-t+1))+t}(e,i);r.updateArrayAccesses(),s(t[h],t[i],r.height),o(t[i],a.ACTIVE);let c=t[i].height;for(let h=e;h<i;h++)r.updateArrayAccesses(),r.updateComparisons(),t[h].height<c&&(o(t[h],a.COMPARED),o(t[e],a.COMPARED),await n(r.speed),s(t[e],t[h],r.height),o(t[h],a.NOT_ACTIVE),o(t[e],a.NOT_ACTIVE),e++);return await n(r.speed),r.updateArrayAccesses(),s(t[e],t[i],r.height),o(t[i],a.NOT_ACTIVE),e++}(t,e,i,h);h.run&&(await r(t,e,c-1,h),await r(t,c+1,i,h))}function s(t,e,i){let n=t.height;t.height=e.height,e.height=n,$(`#${t.id}`).css("height",t.height),$(`#${t.id}`).css("margin-top",i-t.height),$(`#${e.id}`).css("height",e.height),$(`#${e.id}`).css("margin-top",i-e.height)}function o(t,e){document.getElementById(t.id).className=`bar ${e}`}Object.freeze(a),t.exports=async function(t,e){let i=t.boardBars;await r(i,0,i.length-1,t),t.run&&e(t)}},296:(t,e,i)=>{const n=i(254),a={ACTIVE:"active",NOT_ACTIVE:"not_active",COMPARED:"compared",CURRENT:"current"};function r(t,e,i){let n=t.height;t.height=e.height,e.height=n,$(`#${t.id}`).css("height",t.height),$(`#${t.id}`).css("margin-top",i-t.height),$(`#${e.id}`).css("height",e.height),$(`#${e.id}`).css("margin-top",i-e.height)}function s(t,e){document.getElementById(t.id).className=`bar ${e}`}Object.freeze(a),t.exports=async function(t,e){let i=t.boardBars;for(let e=0;e<i.length;e++){t.updateArrayAccesses();let o=i[e];if(!t.run)return;s(i[e],a.ACTIVE);for(let r=e+1;r<i.length;r++)t.updateArrayAccesses(),s(i[r],a.CURRENT),await n(t.speed),t.updateComparisons(),o.height>i[r].height?(o.id!=i[e].id&&s(o,a.NOT_ACTIVE),o=i[r],s(o,a.COMPARED)):s(i[r],a.NOT_ACTIVE);o.id!=i[e].id&&(t.updateArrayAccesses(),r(o,i[e],t.height),s(o,a.NOT_ACTIVE)),s(i[e],a.NOT_ACTIVE)}e(t)}},254:t=>{t.exports=function(t){let e="fast"===t?0:"average"===t?10:20;return new Promise((t=>setTimeout(t,e)))}},800:t=>{t.exports=function(t,e){this.id=t,this.height=e}}},e={};function i(n){var a=e[n];if(void 0!==a)return a.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,i),r.exports}(()=>{const t=i(800),e=i(296),n=i(509),a=i(211),r=i(3),s=i(195),o=i(82),h={smallest:25,small:75,normal:100,large:1e3,largest:1e4};function c(t){this.width=50,this.height=t,this.boardBars=[],this.bars={},this.speed="fast",this.totalBars=100,this.minHeight=5,this.algorithm="heap",this.run=!1,this.arraySize="normal",this.comparisons=0,this.arrayAccesses=0}function d(t){t.run=!1,document.getElementById("randomizeButton").removeAttribute("disabled",""),document.getElementById("algorithm").className="btn btn-dark btn-lg dropdown-toggle",document.getElementById("arraySize").className="btn btn-dark btn-lg dropdown-toggle",document.getElementById("startButton").innerHTML="Start"}function g(t){document.getElementById("startButton").setAttribute("disabled","");let e=[];for(let i=t.boardBars.length-1;i>=0;i--)e.push(t.boardBars[i].id);!function i(){if(0==e.length)return d(t),void document.getElementById("startButton").removeAttribute("disabled","");let n="fast"===t.speed?0:"average"===t.speed?10:20;setTimeout((function(){document.getElementById(e.pop()).className="bar sorted",i()}),n)}()}function l(t,e,i){let n=[t],a=(e-t)/i;for(;t<e;)t+=a,n.push(t);return function(t){let e=t.length;for(;e>0;){let i=Math.floor(Math.random()*e);e--;let n=t[e];t[e]=t[i],t[i]=n}}(n),n}Object.freeze(h),c.prototype.init=function(){this.changeBoard(),this.toggleButtons()},c.prototype.changeBoard=function(){this.boardBars=[],this.bars={},this.changeSize(),this.createBoard(),this.draw()},c.prototype.createBoard=function(){let e='<div class="bars">',i=l(this.minHeight,this.height,this.totalBars);for(let n=0;n<this.totalBars;n++){let a=`${n}`,r=new t(a,i[n]);this.boardBars.push(r),this.bars[`${a}`]=r,e+=`<div id="${a}" class="bar not_active"></div>`}e+="</div>",document.getElementById("array").innerHTML=e},c.prototype.draw=function(){for(let t=0;t<this.boardBars.length;t++){let e=this.boardBars[t];$(`#${e.id}`).css("width",this.width),$(`#${e.id}`).css("height",e.height),$(`#${e.id}`).css("margin-top",this.height-e.height)}},c.prototype.randomize=function(){let t=l(this.minHeight,this.height,this.totalBars);for(let e=0;e<this.totalBars;e++){let i=`${e}`;this.bars[`${i}`].height=t[e]}this.unactivate(),this.draw()},c.prototype.unactivate=function(){for(let t=0;t<this.totalBars;t++)document.getElementById(`${t}`).className="bar not_active"},c.prototype.toggleButtons=function(){document.getElementById("adjustFast").onclick=()=>{this.speed="fast",document.getElementById("adjustSpeed").innerHTML="Speed: Fast\n"},document.getElementById("adjustAverage").onclick=()=>{this.speed="average",document.getElementById("adjustSpeed").innerHTML="Speed: Average\n"},document.getElementById("adjustSlow").onclick=()=>{this.speed="slow",document.getElementById("adjustSpeed").innerHTML="Speed: Slow\n"},document.getElementById("randomizeButton").onclick=()=>{this.randomize()},document.getElementById("bubble").onclick=()=>{this.algorithm="bubble",document.getElementById("algorithm").innerHTML="Algorithm: Bubble Sort\n"},document.getElementById("heap").onclick=()=>{this.algorithm="heap",document.getElementById("algorithm").innerHTML="Algorithm: Heap Sort\n"},document.getElementById("insertion").onclick=()=>{this.algorithm="insertion",document.getElementById("algorithm").innerHTML="Algorithm: Insertion Sort\n"},document.getElementById("merge").onclick=()=>{this.algorithm="merge",document.getElementById("algorithm").innerHTML="Algorithm: Merge Sort\n"},document.getElementById("quick").onclick=()=>{this.algorithm="quick",document.getElementById("algorithm").innerHTML="Algorithm: Quick Sort\n"},document.getElementById("selection").onclick=()=>{this.algorithm="selection",document.getElementById("algorithm").innerHTML="Algorithm: Selection Sort\n"},document.getElementById("smallestArray").onclick=()=>{this.arraySize="smallest",document.getElementById("arraySize").innerHTML="Array Size: Smallest\n",this.changeBoard()},document.getElementById("smallArray").onclick=()=>{this.arraySize="small",document.getElementById("arraySize").innerHTML="Array Size: Small\n",this.changeBoard()},document.getElementById("normalArray").onclick=()=>{this.arraySize="normal",document.getElementById("arraySize").innerHTML="Array Size: Normal\n",this.changeBoard()},document.getElementById("largeArray").onclick=()=>{this.arraySize="large",document.getElementById("arraySize").innerHTML="Array Size: Large\n",this.changeBoard()},document.getElementById("largestArray").onclick=()=>{this.arraySize="largest",document.getElementById("arraySize").innerHTML="Array Size: Largest\n",this.changeBoard()},document.getElementById("startButton").onclick=()=>{this.run?d(this):(this.run=!0,this.comparisons=0,this.arrayAccesses=0,document.getElementById("randomizeButton").setAttribute("disabled",""),document.getElementById("algorithm").className="btn btn-dark btn-lg dropdown-toggle disabled",document.getElementById("arraySize").className="btn btn-dark btn-lg dropdown-toggle disabled",document.getElementById("startButton").innerHTML="Stop",this.unactivate(),this.runSorting())}},c.prototype.runSorting=function(){switch(this.algorithm){case"bubble":n(this,g);break;case"heap":o(this,g);break;case"insertion":a(this,g);break;case"merge":r(this,g);break;case"quick":s(this,g);break;case"selection":e(this,g)}},c.prototype.changeSize=function(){let t=(e=this.arraySize,h[e]);var e;let i=$("#array").width(),n=i/2;this.totalBars=Math.min(t,n)-1,this.width=i/this.totalBars-1},c.prototype.changeComparisons=function(){document.getElementById("comparisons").innerHTML=this.comparisons},c.prototype.updateComparisons=function(){this.comparisons+=1,this.changeComparisons()},c.prototype.changeArrayAccesses=function(){document.getElementById("arrayAccesses").innerHTML=this.arrayAccesses},c.prototype.updateArrayAccesses=function(){this.arrayAccesses+=1,this.changeArrayAccesses()},new c($("#array").height()).init()})()})();