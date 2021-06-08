parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FO+Z":[function(require,module,exports) {
"use strict";function t(t){return new Date(1e3*t).toLocaleDateString()}function e(t){return new Date(1e3*t).getMonth()}function r(t){return new Date(1e3*t).getFullYear()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getDateFromUnixTimestamp=t,exports.getMonthOfDate=e,exports.getYearOfDate=r,exports.sortDataByNewest=n,exports.dataToHTML=a,exports.getStartDate=s,exports.isFunction=exports.currentDate=void 0;const o=Math.floor(Date.now()/1e3);function n(t){return t.sort((t,e)=>t.date<e.date?1:-1)}function a(t){const e=(new DOMParser).parseFromString(t,"text/html").body.childNodes,r=document.createElement("div");return Array.from(e).forEach(t=>r.appendChild(t)),r}function s(){let t=new Date,e=new Date(t),r=t.getDay(),o=t.getDate()+1;return e.setDate(o-r-6),Math.floor(e/1e3)}exports.currentDate=o;const u=t=>"function"==typeof t;exports.isFunction=u;
},{}],"5uBH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createFunctionElement=u,exports.useState=s,exports.useEffect=c,exports.useContext=exports.current=void 0;var e=require("../utils");function t(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,n)}return o}function o(e){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?t(Object(r),!0).forEach(function(t){n(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}const r={shouldReRender:!0,wipComponent:null,hookIndex:null};function u(e,t,n){return r.wipComponent=e,r.hookIndex=0,r.wipComponent.hooks=r.wipComponent.hooks||[],e(o(o({},t),{},{children:n}),n)}function s(t){const{wipComponent:o,hookIndex:n}=r,u=o.hooks[n],s={state:u?u.state:t,queue:[]};(u?u.queue:[]).forEach(t=>{s.state=(0,e.isFunction)(t)?t(s.state):t});return o.hooks[n]=s,r.hookIndex++,[s.state,e=>{r.shouldReRender=!0,s.queue.push(e)}]}function c(e,t){const{wipComponent:o,hookIndex:n}=r,u=o.hooks[n],s=u?u.deps:void 0,c=i(s,t);r.hookIndex++,c&&(u&&u.unmount&&window.removeEventListener("beforeunload",u.unmount),o.hooks[n]={unmount:e(),deps:t},window.addEventListener("beforeunload",o.hooks[n].unmount))}exports.current=r;const i=(e,t)=>!e||!t||e.length!==t.length||e.some((e,o)=>e!==t[o]),p=e=>e.value;exports.useContext=p;
},{"../utils":"FO+Z"}],"PA9s":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createFragment=exports.createElement=void 0;var e=require("./hooks");const t=(t,o,...n)=>{if("function"==typeof t)return(0,e.createFunctionElement)(t,o,n);const s=""===t?new DocumentFragment:document.createElement(t);return Object.entries(o||{}).forEach(([e,t])=>{if(e.startsWith("on")&&e.toLowerCase()in window)s.addEventListener(e.toLowerCase().substr(2),t);else try{if(!(s instanceof DocumentFragment))if(["disabled","checked"].includes(e)&&!t)s.removeAttribute(e);else if("classname"===e.toLowerCase()){const e="string"==typeof t?t.split(" ").filter(Boolean):t;s.classList.add(...e)}else s.setAttribute(e,t)}catch(r){console.error("createElement caught",r,"on",s)}}),n.forEach(e=>r(s,e)),s};exports.createElement=t;const r=(e,t)=>{Array.isArray(t)?t.forEach(t=>r(e,t)):null!=t&&e.appendChild(t.nodeType?t:document.createTextNode(t.toString()))},o=(e,...r)=>t("",e,...r);exports.createFragment=o;
},{"./hooks":"5uBH"}],"si2U":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createContext=r;var e=require("../framework"),n=require("../utils");function r(r){const t={value:r,Provider:null,Consumer:null};let u=!1;return t.Provider=function({value:n=r,children:u}){return Object.is(t.value,n)||(e.current.shouldReRender=!0,t.value=n),u},t.Consumer=function({children:e}){const[r]=e;return(0,n.isFunction)(r)?r(t.value):(!u&&console.warn("Requires a function as a child.","\n","The function receives the current context value and returns a node.","\n","Or use useContext(Context) inside your component."),u=!0,e)},t}
},{"../framework":"SDFd","../utils":"FO+Z"}],"6joL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNewsForGameUrl=p,exports.loadNewsData=t,exports.herokuURL=exports.gamesInfo=void 0;const e={apps:[{appid:730,name:"CS:GO"},{appid:570,name:"Dota 2"},{appid:1091500,name:"Cyberpunk 2077"},{appid:945360,name:"Among Us"},{appid:271590,name:"Grand Theft Auto V"},{appid:252490,name:"Rust"},{appid:550,name:"Left 4 Dead 2"},{appid:221100,name:"Day Z"},{appid:1313860,name:"EA SPORTS FIFA 21"},{appid:1222670,name:"The Sims 4"},{appid:1085660,name:"Destiny 2"},{appid:578080,name:"PUBG"},{appid:8930,name:"Sid Meier's Civilization V"},{appid:377160,name:"Fallout 4"},{appid:1172470,name:"Apex Legends"},{appid:252950,name:"Rocket League"},{appid:292030,name:"The Witcher 3: Wild Hunt"},{appid:220,name:"Half-Life 2"},{appid:346110,name:"ARK: Survival Evolved"},{appid:440,name:"Team Fortress 2"}]};exports.gamesInfo=e;const a="https://not-so-corsy.herokuapp.com/getdata";function p(e){return`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${e}&count=20`}function t(e){const t=p(e);return fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t})}).then(e=>e.json()).then(e=>({data:e}))}exports.herokuURL=a;
},{}],"Mh6o":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useDataNews=s,exports.useApp=a;var e=require("../framework"),t=require("../data/SteamAPI");function s(){const[s,r]=(0,e.useState)(!1),[u,n]=(0,e.useState)(null),[c,o]=(0,e.useState)({}),[d,i]=(0,e.useState)("");(0,e.useEffect)(e=>{if(d){if(c[d])return;(0,t.loadNewsData)(d).then(({error:e,data:t})=>{e?n(e):t&&(c[d]=t)}).catch(n).finally(()=>r(!1))}},[d]);const{selectedGamesIDs:l}=a(d,i);return{currentGameId:d,setCurrentGameId:i,isLoading:s,error:u,cached:{data:c,IDs:l},dataStorage:c,selectedGamesIDs:l}}function a(t,s){const[a,r]=(0,e.useState)([]);return(0,e.useEffect)(()=>{t&&(a.includes(t.toString())?r(a.filter(e=>e!==t.toString())):r([...a,t]),s(""))},[t]),{selectedGamesIDs:a,setSelectedGamesIDs:r}}
},{"../framework":"SDFd","../data/SteamAPI":"6joL"}],"iWoG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.render=n,exports.default=void 0;var e=require("./element"),r=require("./hooks");let t;function n(n,o){t=requestAnimationFrame(function u(){r.current.shouldReRender&&(r.current.shouldReRender=!1,o.replaceChildren((0,e.createElement)(n,null))),cancelAnimationFrame(t),t=requestAnimationFrame(u)})}var o=n;exports.default=o;
},{"./element":"PA9s","./hooks":"5uBH"}],"SDFd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./element");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&(r in exports&&exports[r]===e[r]||Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}}))});var r=require("./context");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&(e in exports&&exports[e]===r[e]||Object.defineProperty(exports,e,{enumerable:!0,get:function(){return r[e]}}))});var t=require("./hooks");Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&(e in exports&&exports[e]===t[e]||Object.defineProperty(exports,e,{enumerable:!0,get:function(){return t[e]}}))});var o=require("./customHooks");Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&(e in exports&&exports[e]===o[e]||Object.defineProperty(exports,e,{enumerable:!0,get:function(){return o[e]}}))});var n=require("./render");Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&(e in exports&&exports[e]===n[e]||Object.defineProperty(exports,e,{enumerable:!0,get:function(){return n[e]}}))});
},{"./element":"PA9s","./context":"si2U","./hooks":"5uBH","./customHooks":"Mh6o","./render":"iWoG"}],"MAR8":[function(require,module,exports) {
module.exports={checkbox:"_checkbox_50534",label_text:"_label_text_50534"};
},{"./icons\\console.png":[["console.b7cc1f2d.png","ZVlZ"],"ZVlZ"],"./icons\\console_active.png":[["console_active.e74de606.png","EjER"],"EjER"]}],"zput":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=require("../../framework/element"),t=l(require("./Checkbox.css"));function l(e){return e&&e.__esModule?e:{default:e}}function n({id:l=null,label:n="",onChange:a=null,condition:r=!1}){return(0,e.createElement)("div",{class:t.default.checkbox},(0,e.createElement)("input",{type:"checkbox",id:l,value:l,checked:r,onChange:a}),(0,e.createElement)("label",{For:l}),(0,e.createElement)("div",{"data-id":"link",class:t.default.label_text},n))}
},{"../../framework/element":"PA9s","./Checkbox.css":"MAR8"}],"e4G/":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useDataContext=exports.DataContext=exports.useAppContext=exports.AppContext=void 0;var t=require("./framework");const e=(0,t.createContext)({});exports.AppContext=e;const o=()=>(0,t.useContext)(e);exports.useAppContext=o;const s=(0,t.createContext)({});exports.DataContext=s;const x=()=>(0,t.useContext)(s);exports.useDataContext=x;
},{"./framework":"SDFd"}],"rtiJ":[function(require,module,exports) {
module.exports={side_wrapper:"_side_wrapper_4fea7",side_title:"_side_title_4fea7",side_menu:"_side_menu_4fea7"};
},{}],"EUu2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=require("../../framework"),t=require("../../data/SteamAPI"),a=l(require("../Checkbox/Checkbox")),r=require("../../context"),s=l(require("./Games.css"));function l(e){return e&&e.__esModule?e:{default:e}}function n({setCurrentGameId:l}){const n=(0,r.useAppContext)();return(0,e.createElement)("div",{class:s.default.side_wrapper},(0,e.createElement)("form",{id:"games",onChange:e=>{l(e.target.id)}},(0,e.createElement)("fieldset",{class:"allowed_games"},(0,e.createElement)("div",{class:s.default.side_title},"Select games to track news"),(0,e.createElement)("div",{class:s.default.side_menu},t.gamesInfo.apps.map(({appid:t,name:r})=>(0,e.createElement)(e.createFragment,null,(0,e.createElement)(a.default,{id:t,label:r,condition:Array.from(n).includes(t.toString())})))))))}
},{"../../framework":"SDFd","../../data/SteamAPI":"6joL","../Checkbox/Checkbox":"zput","../../context":"e4G/","./Games.css":"rtiJ"}],"qfhk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=t(require("./Games"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./Games":"EUu2"}],"pxVT":[function(require,module,exports) {
module.exports={timestamp:"_timestamp_a1899"};
},{}],"nw83":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var e=require("../../framework"),t=a(require("./Timestamp.css"));function a(e){return e&&e.__esModule?e:{default:e}}function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}const r=[{id:"all",value:"alltime",name:"All news"},{id:"today",value:"today",name:"Today's news"},{id:"week",value:"week",name:"News for last 7 days"},{id:"month",value:"month",name:"This month news"}];function l({currentTimestamp:a,setCurrentTimestamp:l}){return(0,e.createElement)(e.createFragment,null,(0,e.createElement)("div",{class:t.default.timestamp},(0,e.createElement)("select",{id:"selectTimestamp",onChange:e=>l(e.target.value)},r.map(({id:t,value:r,name:l})=>(0,e.createElement)("option",n({value:r,id:t,name:"timestamp-option"},r===a?{selected:""}:{}),l)))))}
},{"../../framework":"SDFd","./Timestamp.css":"pxVT"}],"F3bT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=t(require("./Timestamp"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./Timestamp":"nw83"}],"IBRs":[function(require,module,exports) {
module.exports={search_bar:"_search_bar_45c5e",search_btn:"_search_btn_45c5e"};
},{}],"lMuF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var e=require("../../framework"),r=t(require("./SearchBar.css"));function t(e){return e&&e.__esModule?e:{default:e}}function a({currentKeyword:t,setCurrentKeyword:a}){return(0,e.createElement)("div",{class:r.default.search_bar},(0,e.createElement)("input",{type:"text",id:"search-input",placeholder:"Search by keyword",value:t,onChange:e=>a(e.target.value)}),(0,e.createElement)("button",{type:"button",class:r.default.search_btn,onClick:r=>(0,e.render)()}))}
},{"../../framework":"SDFd","./SearchBar.css":"IBRs"}],"MDL9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=r(require("./SearchBar.js"));function r(e){return e&&e.__esModule?e:{default:e}}
},{"./SearchBar.js":"lMuF"}],"XFev":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.prepareDataToRender=a;var e=require("../utils");function t(t,a,r){return{today:()=>t.filter(t=>(0,e.getDateFromUnixTimestamp)(t.date)==(0,e.getDateFromUnixTimestamp)(a)),week:()=>t.filter(t=>t.date>(0,e.getStartDate)()),month:()=>t.filter(t=>(0,e.getYearOfDate)(t.date)==(0,e.getYearOfDate)(a)&&(0,e.getMonthOfDate)(t.date)==(0,e.getMonthOfDate)(a)),alltime:()=>t}[r]()}function a(a,r,i,n,l){let o=[],s=[];return a.map(e=>{void 0!==r[e]&&(o=[...o,...r[e].appnews.newsitems])}),s=t(o,e.currentDate,i),""!==n&&(s=o.filter(e=>e.title.includes(n))),l&&(s=o.filter(e=>e.feedlabel==l)),(0,e.sortDataByNewest)(s)}
},{"../utils":"FO+Z"}],"UpyE":[function(require,module,exports) {
module.exports={item_main_content:"_item_main_content_b13dc",item_content:"_item_content_b13dc",news_item:"_news_item_b13dc",item_title:"_item_title_b13dc",item_date:"_item_date_b13dc",item_tag:"_item_tag_b13dc",item_more:"_item_more_b13dc",item_more_text:"_item_more_text_b13dc"};
},{}],"H196":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=require("../../framework"),t=require("../../utils"),a=n(require("../Checkbox/Checkbox")),l=n(require("./NewsFeedItem.css"));function n(e){return e&&e.__esModule?e:{default:e}}function r({itemData:n,currentTag:r,onChange:c}){const{date:i,title:s,contents:m,feedlabel:d}=n;return(0,e.createElement)(e.createFragment,null,(0,e.createElement)("div",{class:l.default.news_item},(0,e.createElement)("div",{class:l.default.item_tag},d),(0,e.createElement)("h3",{class:l.default.item_title},s),(0,e.createElement)("div",{class:l.default.item_main_content},(0,e.createElement)("div",{class:l.default.item_date},(0,t.getDateFromUnixTimestamp)(i)),(0,e.createElement)("div",{class:l.default.item_content},(0,t.dataToHTML)(m)),(0,e.createElement)("div",{class:l.default.item_more},(0,e.createElement)("span",{class:l.default.item_more_text}," Read all news with tag :"),(0,e.createElement)(e.createFragment,null,(0,e.createElement)(a.default,{id:d,label:d,condition:r==d,onChange:e=>c(e.target.value)}))))))}
},{"../../framework":"SDFd","../../utils":"FO+Z","../Checkbox/Checkbox":"zput","./NewsFeedItem.css":"UpyE"}],"KzUB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=t(require("./NewsFeedItem"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./NewsFeedItem":"H196"}],"AVzt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=require("../../framework"),t=require("../../data/newsData"),r=n(require("../NewsFeedItem")),a=require("../../context");function n(e){return e&&e.__esModule?e:{default:e}}function u({currentTimestamp:n,currentKeyword:u,changeTag:o,currentTag:c}){const l=(0,a.useAppContext)(),s=(0,a.useDataContext)();let m=[];return 0==(m=(0,t.prepareDataToRender)(Array.from(l),s,n,u,c)).length?(0,e.createElement)("div",null,"There are no results that match your request"):(0,e.createElement)(e.createFragment,null,m.map(t=>(0,e.createElement)(r.default,{itemData:t,currentTag:c,onChange:o})))}
},{"../../framework":"SDFd","../../data/newsData":"XFev","../NewsFeedItem":"KzUB","../../context":"e4G/"}],"a+A+":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=t(require("./NewsFeed"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./NewsFeed":"AVzt"}],"Iqdt":[function(require,module,exports) {
module.exports={loading:"_loading_eca1b",error:"_error_eca1b",header:"_header_eca1b",main_container:"_main_container_eca1b",main_header:"_main_header_eca1b",tag_container:"_tag_container_eca1b",tag_title:"_tag_title_eca1b",header_text:"_header_text_eca1b",news_feed:"_news_feed_eca1b"};
},{}],"VV7u":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=require("../../framework"),t=n(require("../Timestamp")),a=n(require("../Search")),r=n(require("../NewsFeed")),l=n(require("./NewsResults.css")),s=n(require("."));function n(e){return e&&e.__esModule?e:{default:e}}function u({isLoading:s,error:n}){const[u,c]=(0,e.useState)("alltime"),[d,i]=(0,e.useState)(""),[m,o]=(0,e.useState)(null);return n?(0,e.createElement)("div",{class:l.default.error},"error"):s?(0,e.createElement)("div",{class:l.default.loading},"Loading...Please, wait. It may takes more than 20 seconds for a first load"):(0,e.createElement)(e.createFragment,null,(0,e.createElement)("div",{class:l.default.header},(0,e.createElement)(a.default,{currentKeyword:d,setCurrentKeyword:i}),(0,e.createElement)(t.default,{currentTimestamp:u,setCurrentTimestamp:c})),(0,e.createElement)("div",{class:l.default.main_container},(0,e.createElement)("div",{class:l.default.main_header},(0,e.createElement)("h1",{class:l.default.header_text},"Games News Feed"),(0,e.createElement)("div",{class:l.default.tag_container},(0,e.createElement)("span",{class:l.default.tag_title},"News by tag :")," ",m||(0,e.createElement)("span",null,"*"))),(0,e.createElement)("div",{class:l.default.news_feed},(0,e.createElement)(r.default,{currentTimestamp:u,currentKeyword:d,currentTag:m,changeTag:e=>{o(null!==m?null:e)}}))))}
},{"../../framework":"SDFd","../Timestamp":"F3bT","../Search":"MDL9","../NewsFeed":"a+A+","./NewsResults.css":"Iqdt",".":"fp8c"}],"fp8c":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=t(require("./NewsResults"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./NewsResults":"VV7u"}],"wGNU":[function(require,module,exports) {
module.exports={container:"_container_f286c",sidebar:"_sidebar_f286c",logo_expand:"_logo_expand_f286c",wrapper:"_wrapper_f286c",greeting:"_greeting_f286c"};
},{}],"52DK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;var e=require("../../framework");function t(){return(0,e.createElement)("footer",null,(0,e.createElement)("p",null,"Made by ",(0,e.createElement)("a",{href:"https://github.com/BlueLamantine"},"BlueLamantine "),"/",(0,e.createElement)("span",null,(0,e.createElement)("a",{href:"https://kottans.org/"}," Kottans")," JS course")),(0,e.createElement)("p",null,"© 2021 GamesNewsFeed App"),(0,e.createElement)("p",null,"*incorrect data in some cases may provide with"," ",(0,e.createElement)("a",{href:"https://https://developer.valvesoftware.com/wiki/Steam_Web_API#GetNewsForApp_.28v0001.29"},"STEAM API")," "))}
},{"../../framework":"SDFd"}],"SoJR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o;var e=require("../../framework"),t=n(require("../Games")),r=n(require("../News")),a=n(require("./App.css")),s=require("../../context"),l=n(require("./AppFooter.js"));function n(e){return e&&e.__esModule?e:{default:e}}function o(){const{setCurrentGameId:n,selectedGamesIDs:o,error:c,isLoading:u,dataStorage:d}=(0,e.useDataNews)();return(0,e.createElement)(e.createFragment,null,(0,e.createElement)("div",{class:a.default.container},(0,e.createElement)(s.AppContext.Provider,{value:o},(0,e.createElement)("div",{class:a.default.sidebar},(0,e.createElement)("a",{class:a.default.logo_expand,href:"https://store.steampowered.com/news/"},(0,e.createElement)("img",{src:"https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"})),(0,e.createElement)(t.default,{setCurrentGameId:n})),(0,e.createElement)("div",{class:a.default.wrapper},0==o.length?(0,e.createElement)("p",{class:a.default.greeting},"Welcome to your personal game news aggregator!"):(0,e.createElement)(s.DataContext.Provider,{value:d},(0,e.createElement)(r.default,{isLoading:u,error:c}))))),(0,e.createElement)(l.default,null))}
},{"../../framework":"SDFd","../Games":"qfhk","../News":"fp8c","./App.css":"wGNU","../../context":"e4G/","./AppFooter.js":"52DK"}],"L+lk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=t(require("./App"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./App":"SoJR"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./framework"),r=t(require("./components/App"));function t(e){return e&&e.__esModule?e:{default:e}}(0,e.render)(r.default,document.getElementById("app-root"));
},{"./framework":"SDFd","./components/App":"L+lk"}]},{},["Focm"], null)
//# sourceMappingURL=src.bad62613.js.map