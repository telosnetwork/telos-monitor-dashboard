import{a,n as f}from"./index.44bcdd70.js";import{g as w,e as u}from"./QBtn.6a874501.js";function T(){let t;return a(()=>{t=void 0}),{registerTick(e){t=e,f(()=>{t===e&&(t(),t=void 0)})},removeTick(){t=void 0}}}function x(){let t;return a(()=>{clearTimeout(t)}),{registerTimeout(e,o){clearTimeout(t),t=setTimeout(e,o)},removeTimeout(){clearTimeout(t)}}}let p=!1;{const t=document.createElement("div"),e=document.createElement("div");t.setAttribute("dir","rtl"),t.style.width="1px",t.style.height="1px",t.style.overflow="auto",e.style.width="1000px",e.style.height="1px",document.body.appendChild(t),t.appendChild(e),t.scrollLeft=-1e3,p=t.scrollLeft>=0,t.remove()}const h=[null,document,document.body,document.scrollingElement,document.documentElement];function b(t,e){let o=w(e);if(o===void 0){if(t==null)return window;o=t.closest(".scroll,.scroll-y,.overflow-auto")}return h.includes(o)?window:o}function g(t){return t===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:t.scrollTop}function E(t){return t===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:t.scrollLeft}function m(t,e,o=0){const i=arguments[3]===void 0?performance.now():arguments[3],r=g(t);if(o<=0){r!==e&&s(t,e);return}requestAnimationFrame(c=>{const l=c-i,d=r+(e-r)/Math.max(l,o)*l;s(t,d),d!==e&&m(t,e,o-l,c)})}function s(t,e){if(t===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,e);return}t.scrollTop=e}function S(t,e,o){if(o){m(t,e,o);return}s(t,e)}let n;function L(){if(n!==void 0)return n;const t=document.createElement("p"),e=document.createElement("div");u(t,{width:"100%",height:"200px"}),u(e,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);const o=t.offsetWidth;e.style.overflow="scroll";let i=t.offsetWidth;return o===i&&(i=e.clientWidth),e.remove(),n=o-i,n}function C(t,e=!0){return!t||t.nodeType!==Node.ELEMENT_NODE?!1:e?t.scrollHeight>t.clientHeight&&(t.classList.contains("scroll")||t.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(t)["overflow-y"])):t.scrollWidth>t.clientWidth&&(t.classList.contains("scroll")||t.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(t)["overflow-x"]))}export{x as a,g as b,E as c,L as d,b as g,C as h,p as r,S as s,T as u};
