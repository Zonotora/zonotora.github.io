(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[672],{3021:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/books",function(){return a(963)}])},8139:function(e,t,a){"use strict";var s=a(5893),r=a(7294),o=a(1664),n=a.n(o),l=a(2489),i=a(9417),c=a(5869);let d=(0,s.jsx)("svg",{style:{position:"relative",top:"2px"},xmlns:"http://www.w3.org/2000/svg",height:"1em",viewBox:"0 0 384 512",children:(0,s.jsx)("path",{d:"M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"})}),u=(0,s.jsx)("svg",{style:{position:"relative",top:"2px"},xmlns:"http://www.w3.org/2000/svg",height:"1em",viewBox:"0 0 384 512",children:(0,s.jsx)("path",{d:"M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"})});t.Z=e=>{let{active:t}=e,{darkmode:a,setDarkmode:o}=(0,r.useContext)(c.UserContext);return(0,s.jsx)("header",{children:(0,s.jsxs)("div",{className:"header",children:[["about","posts","publications","projects","books","docs"].map(e=>e===t?(0,s.jsx)(n(),{style:{textDecoration:"underline"},href:"/".concat(e),children:e}):(0,s.jsx)(n(),{href:"/".concat(e),children:e},e)),(0,s.jsxs)("div",{className:"header-icons",children:[(0,s.jsx)(n(),{href:"/feed.xml",children:(0,s.jsx)(l.G,{icon:i.Fwd})}),(0,s.jsx)("span",{onClick:()=>{o(!a)},children:a?u:d})]})]})})}},8986:function(e,t,a){"use strict";var s=a(5893),r=a(8139);t.Z=e=>{let{active:t,children:a}=e;return(0,s.jsxs)("div",{children:[(0,s.jsx)(r.Z,{active:t}),(0,s.jsx)("main",{children:a})]})}},963:function(e,t,a){"use strict";a.r(t),a.d(t,{Home:function(){return m},__N_SSG:function(){return j},default:function(){return v}});var s,r,o=a(5893),n=a(1664),l=a.n(n),i=e=>{let{book:t,summary:a,slug:s}=e,r=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{children:t.title}),(0,o.jsx)("div",{children:t.author}),(0,o.jsx)("div",{style:{fontSize:"10pt"},children:t.date}),""===t.type?(0,o.jsx)(o.Fragment,{}):(0,o.jsx)("span",{className:"book-preview-type tag",style:{fontSize:"10pt"},children:t.type})]}),n=(0,o.jsx)(l(),{href:"/books/".concat(s),className:"book-preview".concat(a?" summary":""),children:r}),i=(0,o.jsx)("div",{className:"book-preview".concat(a?" summary":""),children:r});return a?n:i},c=a(8986),d=a(2489),u=a(9417);(s=r||(r={}))[s.None=0]="None",s[s.AZ=1]="AZ",s[s.ZA=2]="ZA";let h=e=>e===r.None?r.AZ:e===r.AZ?r.ZA:(r.ZA,r.None);var g=a(7294),p=e=>{let{filter:t,setFilter:a,validPredicates:s,showStats:n,setShowStats:l}=e,[i,c]=(0,g.useState)([]),[p,y]=(0,g.useState)(""),x=(e,t)=>{a(a=>({...a,sort:{...a.sort,[e]:t}}))},j=(e,s)=>{if(!e)return;let r=t.predicate[e];r===s&&(s=""),a(t=>({...t,predicate:{...t.predicate,[e]:s}}))},m=e=>{switch(e){case r.AZ:return u.bDz;case r.ZA:return u.ifd;case r.None:return u.DhN}},v=e=>"icon".concat(e!==r.None?" active":""),k=e=>{let t="icon";return e===p&&(t+=i.length>0?" active":""),t},f=(e,a)=>{let s="icon";return a===t.predicate[e]&&(s+=" active"),s},N=(e,t)=>{if(p!==e){let a=Array.from(t);a.sort(),c(a.map(t=>[e,t])),y(e)}else c([]),y("")};return(0,o.jsxs)("div",{className:"book-header",children:[(0,o.jsxs)("div",{className:"book-header-main",children:[(0,o.jsxs)("span",{className:v(t.sort.year),onClick:()=>{let e=h(t.sort.year);x("year",e)},children:["year ",(0,o.jsx)(d.G,{icon:m(t.sort.year)})]}),(0,o.jsxs)("span",{className:v(t.sort.title),onClick:()=>{let e=h(t.sort.title);x("title",e)},children:["title ",(0,o.jsx)(d.G,{icon:m(t.sort.title)})]}),(0,o.jsxs)("span",{className:v(t.sort.author),onClick:()=>{let e=h(t.sort.author);x("author",e)},children:["author ",(0,o.jsx)(d.G,{icon:m(t.sort.author)})]}),"|",(0,o.jsxs)("span",{className:k("year"),onClick:()=>{N("year",s.year)},children:["year ",(0,o.jsx)(d.G,{icon:u.G_j})]}),(0,o.jsxs)("span",{className:k("tag"),onClick:()=>{N("tag",s.tags)},children:["tag ",(0,o.jsx)(d.G,{icon:u.G_j})]}),"|",(0,o.jsxs)("span",{className:"icon".concat(n?" active":""),onClick:()=>l(!n),children:["stats ",(0,o.jsx)(d.G,{icon:u.Wpq})]})]}),i?(0,o.jsx)("div",{className:"book-header-secondary",children:i.map(e=>{let[t,a]=e;return(0,o.jsx)("span",{className:f(t,a),onClick:()=>j(t,a),children:a},a)})}):(0,o.jsx)(o.Fragment,{})]})},y=JSON.parse('[{"author":"Johann Wolfgang von Goethe","country":"Germany","date":"2024-10-10","language":"English","pages":168,"tags":[],"title":"Faust","year":"1808","type":""},{"author":"Yukio Mishima","country":"Japan","date":"2024-08-11","language":"English","pages":389,"tags":[],"title":"Spring Snow","year":"1967","type":""},{"author":"Fyodor Dostoevsky","country":"Russia","date":"2024-07-07","language":"English","pages":22,"tags":[],"title":"The dream of a Ridiculous Man","year":"1877","type":"Short Story"},{"author":"Nick Bostrom","country":"Sweden","date":"2024-06-23","language":"English","pages":536,"tags":[],"title":"Deep Utopia","year":"2024","type":""},{"author":"Frank Herbert","country":"United States","date":"2024-03-14","language":"English","pages":412,"tags":[],"title":"Dune","year":"1965","type":""},{"author":"George Orwell","country":"England","date":"2024-03-02","language":"English","pages":328,"tags":["Bokklubben World Library"],"title":"1984","year":"1949","type":""},{"author":"Viktor Frankl","country":"Austria","date":"2024-01-03","language":"German","pages":200,"tags":[],"title":"Man\'s search for meaning","year":"1946","type":""},{"title":"Meditations","author":"Marcus Aurelius","country":"","date":"2023-07-19","language":"English","pages":254,"tags":[],"year":"180","type":""},{"title":"Ultralearning","author":"Scott H Young","country":"USA","date":"2023-07-15","language":"English","pages":305,"tags":[],"year":"2019","type":""},{"author":"Marcel Proust","country":"France","date":"2023-06-26","language":"Swedish","pages":418,"tags":["Bokklubben World Library"],"title":"Swann\'s Way","year":"1913","type":""},{"author":"Richard Thaler","country":"USA","date":"2023-01-07","language":"English","pages":455,"tags":[],"title":"Misbehaving: The Making of Behavioral Economics","year":"2015","type":""},{"author":"Leo Tolstoy","country":"Russia","date":"2023-01-01","language":"Russian","pages":77,"tags":["Bokklubben World Library"],"title":"The Death of Ivan Ilyich","year":"1886","type":""}]');let x=e=>e.toLowerCase().replaceAll(":"," ").replaceAll(/\s+/g,"-");var j=!0;let m=e=>{let{summaries:t}=e,[a,s]=(0,g.useState)({}),[n,l]=(0,g.useState)(y),[d,u]=(0,g.useState)({sort:{title:r.None,author:r.None,year:r.None},predicate:{year:void 0,tag:void 0}}),[h,j]=(0,g.useState)({year:new Set,tags:new Set}),[m,v]=(0,g.useState)(!1),[k,f]=(0,g.useState)({total:{books:0,pages:0},predicates:{}});(0,g.useEffect)(()=>{let e={};for(let a of t){let t=x(a.title);e[t]=a.slug}s(e);let a={year:new Set,tags:new Set},r={books:0,pages:0},o={total:structuredClone(r),predicates:{}},n=(e,t)=>{e in o.predicates||(o.predicates[e]=structuredClone(r)),o.predicates[e].books+=1,o.predicates[e].pages+=t.pages};for(let e of y){let t=e.date.slice(0,4);for(let s of(a.year.add(t),e.tags))a.tags.add(s),n(s,e);o.total.books+=1,o.total.pages+=e.pages,n(t,e)}j(a),f(o)},[]),(0,g.useEffect)(()=>{let e=y.filter(e=>{let t=!0;return d.predicate.year&&t&&(t=e.date.slice(0,4)===d.predicate.year),d.predicate.tag&&t&&(t=e.tags.includes(d.predicate.tag)),t}).sort((e,t)=>{let a=0;return d.sort.year!==r.None&&(a||(a=d.sort.year===r.AZ?e.date.localeCompare(t.date):t.date.localeCompare(e.date))),d.sort.title!==r.None&&(a||(a=d.sort.title===r.AZ?e.title.localeCompare(t.title):t.title.localeCompare(e.title))),d.sort.author!==r.None&&(a||(a=d.sort.author===r.AZ?e.author.localeCompare(t.author):t.author.localeCompare(e.author))),a});l(e)},[d]);let N=(0,o.jsx)("div",{className:"center",children:(0,o.jsxs)("table",{className:"statistics",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{}),(0,o.jsx)("td",{children:"Books"}),(0,o.jsx)("td",{children:"Pages"})]})}),(0,o.jsxs)("tbody",{children:[(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:"Total"}),(0,o.jsx)("td",{children:k.total.books}),(0,o.jsx)("td",{children:k.total.pages})]}),Object.entries(k.predicates).map(e=>{let[t,a]=e;return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:t}),(0,o.jsx)("td",{children:a.books}),(0,o.jsx)("td",{children:a.pages})]},t)})]})]})}),b=(0,o.jsxs)("div",{className:"books",children:[n.map(e=>(0,o.jsx)(i,{book:e,summary:x(e.title) in a,slug:a[x(e.title)]},e.title)),[1,2,3].map(e=>(0,o.jsx)("div",{className:"book-preview-dummy"},e))]});return(0,o.jsxs)(c.Z,{active:"books",children:[(0,o.jsx)(p,{filter:d,setFilter:u,validPredicates:h,showStats:m,setShowStats:v}),m?N:b]})};var v=m}},function(e){e.O(0,[976,956,774,888,179],function(){return e(e.s=3021)}),_N_E=e.O()}]);