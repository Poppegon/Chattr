import{P as n,Q as c,R as p,h as a,S as d}from"./CBFC-D3W.js";const g=Symbol("is custom element"),N=Symbol("is html");function M(s,r,o,i){var t=S(s);a&&(t[r]=s.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&s.nodeName==="LINK")||t[r]!==(t[r]=o)&&(r==="loading"&&(s[n]=o),o==null?s.removeAttribute(r):typeof o!="string"&&h(s).includes(r)?s[r]=o:s.setAttribute(r,o))}function S(s){return s.__attributes??(s.__attributes={[g]:s.nodeName.includes("-"),[N]:s.namespaceURI===c})}var f=new Map;function h(s){var r=f.get(s.nodeName);if(r)return r;f.set(s.nodeName,r=[]);for(var o,i=s,t=Element.prototype;t!==i;){o=d(i);for(var _ in o)o[_].set&&r.push(_);i=p(i)}return r}export{M as s};
