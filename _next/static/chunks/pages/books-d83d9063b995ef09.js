(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[672],{3021:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/books",function(){return c(9094)}])},1952:function(a,b,c){"use strict";var d=c(5893),e=c(1664),f=c.n(e),g=function(a){var b=a.active,c=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};return(0,d.jsx)("header",{children:(0,d.jsx)("div",{className:"header",children:["posts","books","mindpalace","sketches","instrumentum"].map(function(a){return a===b?(0,d.jsx)("span",{style:{textDecoration:"underline"},children:(0,d.jsx)(f(),{href:"/".concat(a),children:c(a)})},a):(0,d.jsx)(f(),{href:"/".concat(a),children:c(a)},a)})})})};b.Z=g},9094:function(a,b,c){"use strict";c.r(b),c.d(b,{Home:function(){return w},"__N_SSG":function(){return v},default:function(){return x}});var d,e,f=c(5893),g=c(1664),h=c.n(g),i=function(a){var b=a.book,c=a.summary,d=a.slug,e=(0,f.jsxs)("div",{className:"book-preview".concat(c?" summary":""),children:[(0,f.jsx)("div",{children:b.title}),(0,f.jsx)("div",{children:b.author}),(0,f.jsx)("div",{children:b.yearRead})]}),g=(0,f.jsx)(h(),{href:"/books/".concat(d),children:e});return c?g:e},j=i,k=c(1952),l=c(4924),m=c(6042),n=c(9396),o=c(9603),p=c(9417);(e=d||(d={}))[e.None=0]="None",e[e.AZ=1]="AZ",e[e.ZA=2]="ZA";var q=function(a){return a===d.None?d.AZ:a===d.AZ?d.ZA:a===d.ZA?d.None:(!1,d.None)},r=function(a){var b=a.filter,c=a.setFilter,e=function(a,b){c(function(c){return(0,n.Z)((0,m.Z)({},c),(0,l.Z)({},a,b))})},g=function(a){switch(a){case d.AZ:return p.bDz;case d.ZA:return p.ifd;case d.None:return p.DhN}},h=function(a){return"icon".concat(a!==d.None?" active":"")},i=function(){var a=q(b.title);e("title",a)},j=function(){var a=q(b.author);e("author",a)},k=function(){var a=q(b.yearSort);e("yearSort",a)};return(0,f.jsxs)("div",{className:"book-header",children:[(0,f.jsxs)("span",{className:h(b.yearSort),onClick:k,children:["year ",(0,f.jsx)(o.G,{icon:g(b.yearSort)})]}),(0,f.jsxs)("span",{className:h(b.title),onClick:i,children:["title ",(0,f.jsx)(o.G,{icon:g(b.title)})]}),(0,f.jsxs)("span",{className:h(b.author),onClick:j,children:["author ",(0,f.jsx)(o.G,{icon:g(b.author)})]})]})},s=r,t=JSON.parse('[{"author":"Leo Tolstoy","country":"Russia","language":"Russian","pages":77,"title":"The Death of Ivan Ilyich","year":"1886","yearRead":"2023"}]'),u=c(7294),v=!0,w=function(a){var b=a.summaries,c=(0,u.useState)({}),e=c[0],g=c[1],h=(0,u.useState)(t),i=h[0],l=h[1],m=(0,u.useState)({title:d.None,author:d.None,yearSort:d.None,yearFilter:void 0}),n=m[0],o=m[1];return(0,u.useEffect)(function(){var a={},c=!0,d=!1,e=void 0;try{for(var f,h=b[Symbol.iterator]();!(c=(f=h.next()).done);c=!0){var i=f.value;a[i.title.toLowerCase().replaceAll(" ","-")]=i.slug}}catch(j){d=!0,e=j}finally{try{c||null==h.return||h.return()}finally{if(d)throw e}}g(a)},[]),(0,u.useEffect)(function(){var a=function(a){var b=!0;return n.yearFilter&&b&&(b=a.yearRead===n.yearFilter),b},b=function(a,b){var c=0;return n.yearSort!==d.None&&(c||(c=n.yearSort===d.AZ?a.yearRead.localeCompare(b.yearRead):b.yearRead.localeCompare(a.yearRead))),n.title!==d.None&&(c||(c=n.title===d.AZ?a.title.localeCompare(b.title):b.title.localeCompare(a.title))),n.author!==d.None&&(c||(c=n.author===d.AZ?a.author.localeCompare(b.author):b.author.localeCompare(a.author))),c},c=t.filter(a).sort(b);l(c)},[n]),(0,f.jsxs)("div",{className:"main",children:[(0,f.jsx)(k.Z,{active:"books"}),(0,f.jsx)(s,{filter:n,setFilter:o}),(0,f.jsxs)("div",{className:"books",children:[i.map(function(a){return(0,f.jsx)(j,{book:a,summary:a.title.toLowerCase().replaceAll(" ","-") in e,slug:e[a.title.toLowerCase().replaceAll(" ","-")]},a.title)}),[1,2,3].map(function(a){return(0,f.jsx)("div",{className:"book-preview-dummy"},a)})]})]})},x=w}},function(a){a.O(0,[976,664,907,774,888,179],function(){var b;return a(a.s=3021)}),_N_E=a.O()}])