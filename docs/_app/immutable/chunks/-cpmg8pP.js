import{d as p,h as r,j as g,a7 as h,a8 as S,H as D,l as H,e as k,m as I,q as v,u as b,v as m,a9 as q,n as F}from"./CBFC-D3W.js";function O(A,E,[t,s]=[0,0]){r&&t===0&&g();var a=A,f=null,e=null,i=q,N=t>0?h:0,n=!1;const R=(c,l=!0)=>{n=!0,o(l,c)},o=(c,l)=>{if(i===(i=c))return;let T=!1;if(r&&s!==-1){if(t===0){const u=a.data;u===S?s=0:u===D?s=1/0:(s=parseInt(u.substring(1)),s!==s&&(s=i?1/0:-1))}const _=s>t;!!i===_&&(a=H(),k(a),I(!1),T=!0,s=-1)}i?(f?v(f):l&&(f=b(()=>l(a))),e&&m(e,()=>{e=null})):(e?v(e):l&&(e=b(()=>l(a,[t+1,s]))),f&&m(f,()=>{f=null})),T&&I(!0)};p(()=>{n=!1,E(R),n||o(null,null)},N),r&&(a=F)}export{O as i};
