(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6489:function(e,t){"use strict";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */t.Q=function(e,t){if("string"!=typeof e)throw TypeError("argument str must be a string");for(var r={},o=(t||{}).decode||i,n=0;n<e.length;){var s=e.indexOf("=",n);if(-1===s)break;var a=e.indexOf(";",n);if(-1===a)a=e.length;else if(a<s){n=e.lastIndexOf(";",s-1)+1;continue}var c=e.slice(n,s).trim();if(void 0===r[c]){var d=e.slice(s+1,a).trim();34===d.charCodeAt(0)&&(d=d.slice(1,-1)),r[c]=function(e,t){try{return t(e)}catch(t){return e}}(d,o)}n=a+1}return r},t.q=function(e,t,i){var s=i||{},a=s.encode||n;if("function"!=typeof a)throw TypeError("option encode is invalid");if(!o.test(e))throw TypeError("argument name is invalid");var c=a(t);if(c&&!o.test(c))throw TypeError("argument val is invalid");var d=e+"="+c;if(null!=s.maxAge){var u=s.maxAge-0;if(isNaN(u)||!isFinite(u))throw TypeError("option maxAge is invalid");d+="; Max-Age="+Math.floor(u)}if(s.domain){if(!o.test(s.domain))throw TypeError("option domain is invalid");d+="; Domain="+s.domain}if(s.path){if(!o.test(s.path))throw TypeError("option path is invalid");d+="; Path="+s.path}if(s.expires){var l=s.expires;if("[object Date]"!==r.call(l)&&!(l instanceof Date)||isNaN(l.valueOf()))throw TypeError("option expires is invalid");d+="; Expires="+l.toUTCString()}if(s.httpOnly&&(d+="; HttpOnly"),s.secure&&(d+="; Secure"),s.priority)switch("string"==typeof s.priority?s.priority.toLowerCase():s.priority){case"low":d+="; Priority=Low";break;case"medium":d+="; Priority=Medium";break;case"high":d+="; Priority=High";break;default:throw TypeError("option priority is invalid")}if(s.sameSite)switch("string"==typeof s.sameSite?s.sameSite.toLowerCase():s.sameSite){case!0:case"strict":d+="; SameSite=Strict";break;case"lax":d+="; SameSite=Lax";break;case"none":d+="; SameSite=None";break;default:throw TypeError("option sameSite is invalid")}return d};var r=Object.prototype.toString,o=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function i(e){return -1!==e.indexOf("%")?decodeURIComponent(e):e}function n(e){return encodeURIComponent(e)}},6840:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(5869)}])},5869:function(e,t,r){"use strict";r.r(t),r.d(t,{UserContext:function(){return u},default:function(){return l}});var o=r(5893);r(3814),r(7649);var i=r(7294),n=JSON.parse('{"light":{"color":"#4d535c","background":{"color":"#fff7ed","hover":"#bcbcbc"},"border":{"color":"#0d1117","hover":"#ababab"}},"dark":{"color":"#d7d7d7","background":{"color":"#0d1117","hover":"#0d1117"},"border":{"color":"#4d535c","hover":"antiquewhite"}}}'),s=r(6489);function a(e,t={}){var r;let o=e&&"j"===e[0]&&":"===e[1]?e.substr(2):e;if(void 0===(r=t.doNotParse)&&(r=!o||"{"!==o[0]&&"["!==o[0]&&'"'!==o[0]),!r)try{return JSON.parse(o)}catch(e){}return e}var c=class{constructor(e,t){this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies="string"==typeof e?s.Q(e,t):"object"==typeof e&&null!==e?e:{},new Promise(()=>{this.HAS_DOCUMENT_COOKIE="object"==typeof document&&"string"==typeof document.cookie}).catch(()=>{})}_updateBrowserValues(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=s.Q(document.cookie,e))}_emitChange(e){for(let t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)}get(e,t={},r){return this._updateBrowserValues(r),a(this.cookies[e],t)}getAll(e={},t){this._updateBrowserValues(t);let r={};for(let t in this.cookies)r[t]=a(this.cookies[t],e);return r}set(e,t,r){"object"==typeof t&&(t=JSON.stringify(t)),this.cookies=Object.assign(Object.assign({},this.cookies),{[e]:t}),this.HAS_DOCUMENT_COOKIE&&(document.cookie=s.q(e,t,r)),this._emitChange({name:e,value:t,options:r})}remove(e,t){let r=t=Object.assign(Object.assign({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=Object.assign({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=s.q(e,"",r)),this._emitChange({name:e,value:void 0,options:t})}addChangeListener(e){this.changeListeners.push(e)}removeChangeListener(e){let t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)}};let d={darkmode:!0,setDarkmode:e=>{}},u=i.createContext(d);var l=function(e){let{Component:t,pageProps:r}=e,[s,a]=(0,i.useState)(d.darkmode),[l,h]=(0,i.useState)(new c),f=e=>{let t,r,o,i,s;let a=e?"dark":"light";t=n[a].background.color,r=n[a].background.hover,s=n[a].color,o=n[a].border.color,i=n[a].border.hover,document.documentElement.style.setProperty("--background-color",t),document.documentElement.style.setProperty("--background-hover-color",r),document.documentElement.style.setProperty("--color",s),document.documentElement.style.setProperty("--border-color",o),document.documentElement.style.setProperty("--border-hover-color",i)},m=e=>{l.set("darkmode",e,{sameSite:"strict"}),f(e),a(e)};return(0,i.useEffect)(()=>{let e=l.get("darkmode");if(e)m("true"===e);else{let e=window.matchMedia("(prefers-color-scheme: dark)").matches;console.log(e),l.set("darkmode",e,{sameSite:"strict"})}},[]),(0,o.jsx)(u.Provider,{value:{darkmode:s,setDarkmode:m},children:(0,o.jsx)(t,{...r})})}},3814:function(){},7649:function(){}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(6840),t(6885)}),_N_E=e.O()}]);