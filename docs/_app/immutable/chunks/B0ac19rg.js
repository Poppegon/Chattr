import{i as f,av as p,aw as h,ax as E,y as _,h as d,n as o,j as T,b as i,e as y}from"./CBFC-D3W.js";function g(n){var t=document.createElement("template");return t.innerHTML=n,t.content}function r(n,t){var e=_;e.nodes_start===null&&(e.nodes_start=n,e.nodes_end=t)}function M(n,t){var e=(t&h)!==0,c=(t&E)!==0,a,m=!n.startsWith("<!>");return()=>{if(d)return r(o,null),o;a===void 0&&(a=g(m?n:"<!>"+n),e||(a=f(a)));var s=c||p?document.importNode(a,!0):a.cloneNode(!0);if(e){var l=f(s),v=s.lastChild;r(l,v)}else r(s,s);return s}}function N(n=""){if(!d){var t=i(n+"");return r(t,t),t}var e=o;return e.nodeType!==3&&(e.before(e=i()),y(e)),r(e,e),e}function b(){if(d)return r(o,null),o;var n=document.createDocumentFragment(),t=document.createComment(""),e=i();return n.append(t,e),r(t,e),n}function L(n,t){if(d){_.nodes_end=o,T();return}n!==null&&n.before(t)}const w="5";var u;typeof window<"u"&&((u=window.__svelte??(window.__svelte={})).v??(u.v=new Set)).add(w);export{L as a,r as b,b as c,N as d,M as t};
