parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hy1s":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={checkedGamesIDs:[],currentGameId:"",isDataLoading:!1,error:null,newsByGames:{},currentTimestamp:"alltime",tag:null,filteredNews:null,keyword:""};var t=e;exports.default=t;
},{}],"PA9s":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createFragment=exports.createElement=void 0;const n=(e,r,...n)=>{if("function"==typeof e)return e(t(t({},r),{},{children:n}),n);const c=""===e?new DocumentFragment:document.createElement(e);return Object.entries(r||{}).forEach(([e,t])=>{if(e.startsWith("on")&&e.toLowerCase()in window)c.addEventListener(e.toLowerCase().substr(2),t);else try{if(!(c instanceof DocumentFragment))if(["disabled","checked"].includes(e)&&!t)c.removeAttribute(e);else if("classname"===e.toLowerCase()){const e="string"==typeof t?t.split(" ").filter(Boolean):t;c.classList.add(...e)}else c.setAttribute(e,t)}catch(r){console.error("createElement caught",r,"on",c)}}),n.forEach(e=>o(c,e)),c};exports.createElement=n;const o=(e,t)=>{Array.isArray(t)?t.forEach(t=>o(e,t)):null!=t&&e.appendChild(t.nodeType?t:document.createTextNode(t.toString()))},c=(e,...t)=>n("",e,...t);exports.createFragment=c;
},{}],"iWoG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./element");let l,t;function r(r=null,n=null){r&&(l=r),n&&(t=n),t.innerHTML="",t.appendChild((0,e.createElement)(l,null))}var n=r;exports.default=n;
},{"./element":"PA9s"}],"6joL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNewsForGameUrl=o,exports.herokuURL=exports.gamesInfo=void 0;const e={apps:[{appid:730,name:"Counter-Strike: Global Offensive"},{appid:1091500,name:"Cyberpunk 2077"},{appid:570,name:"Dota 2"},{appid:578080,name:"PUBG"},{appid:440,name:"TF2"}]};exports.gamesInfo=e;const p="https://not-so-corsy.herokuapp.com/getdata";function o(e){return`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${e}&count=20`}exports.herokuURL=p;
},{}],"FO+Z":[function(require,module,exports) {
"use strict";function e(e){return new Date(1e3*e).toLocaleDateString()}function t(e){return new Date(1e3*e).getMonth()}function r(e){return new Date(1e3*e).getFullYear()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getDateFromUnixTimestamp=e,exports.getMonthOfDate=t,exports.getYearOfDate=r,exports.sortDataByNewest=n,exports.dataToHTML=a,exports.getStartDate=s,exports.currentDate=void 0;const o=Math.floor(Date.now()/1e3);function n(e){return e.sort((e,t)=>e.date<t.date?1:-1)}function a(e){const t=(new DOMParser).parseFromString(e,"text/html").body.childNodes,r=document.createElement("div");return Array.from(t).forEach(e=>r.appendChild(e)),r}function s(){let e=new Date,t=new Date(e),r=e.getDay(),o=e.getDate()+1;return t.setDate(o-r-6),Math.floor(t/1e3)}exports.currentDate=o;
},{}],"XFev":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o,exports.performRetrieve=d,exports.filterDataByTimestamp=i;var e=require("./SteamAPI"),t=a(require("../framework/render")),r=require("../utils");function a(e){return e&&e.__esModule?e:{default:e}}function o(){return Boolean(window.dataStore.newsByGames[window.dataStore.currentGameId])}function n(){const t=(0,e.getNewsForGameUrl)(window.dataStore.currentGameId);return o()?Promise.resolve({}):fetch(e.herokuURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t})}).then(e=>e.json()).then(e=>({data:e}))}function d(){window.dataStore.error=null,window.dataStore.isDataLoading=!0,(0,t.default)(),n().then(({error:e,data:t})=>{window.dataStore.isDataLoading=!1,e?window.dataStore.error=e:t&&(window.dataStore.newsByGames[window.dataStore.currentGameId]=t)}).catch(()=>{window.dataStore.error="Some error occurred."}).finally(t.default)}function i(e,t,a){return{today:()=>e.filter(e=>(0,r.getDateFromUnixTimestamp)(e.date)==(0,r.getDateFromUnixTimestamp)(t)),week:()=>e.filter(e=>e.date>(0,r.getStartDate)()),month:()=>e.filter(e=>(0,r.getYearOfDate)(e.date)==(0,r.getYearOfDate)(t)&&(0,r.getMonthOfDate)(e.date)==(0,r.getMonthOfDate)(t)),alltime:()=>e}[a]()}
},{"./SteamAPI":"6joL","../framework/render":"iWoG","../utils":"FO+Z"}],"AXqE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=d;var e=t(require("../framework/render"));function t(e){return e&&e.__esModule?e:{default:e}}function d({target:t}){const d=t.id;window.dataStore.checkedGamesIDs.includes(d)?window.dataStore.checkedGamesIDs=window.dataStore.checkedGamesIDs.filter(e=>e!==d):(window.dataStore.checkedGamesIDs=[...window.dataStore.checkedGamesIDs,d],window.dataStore.currentGameId=d),(0,e.default)()}
},{"../framework/render":"iWoG"}],"zput":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=require("../../framework/element");function n({id:n=null,label:t="",onChange:l=null,condition:r=!1}){return(0,e.createElement)("label",{For:n},(0,e.createElement)("input",{type:"checkbox",id:n,value:n,checked:r,onChange:l}),(0,e.createElement)("span",null,t))}
},{"../../framework/element":"PA9s"}],"rtiJ":[function(require,module,exports) {
module.exports={};
},{}],"EUu2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=d;var e=require("../../framework/element"),a=require("../../data/newsData"),t=require("../../data/SteamAPI"),r=s(require("../../data/gamesData")),n=s(require("../Checkbox/Checkbox")),l=s(require("./Games.css"));function s(e){return e&&e.__esModule?e:{default:e}}function d(){return(0,e.createElement)("form",{id:"games",onChange:e=>{(0,r.default)(e),(0,a.performRetrieve)()}},(0,e.createElement)("fieldset",{class:"allowed_games"},(0,e.createElement)("legend",null,"Select games to track news"),t.gamesInfo.apps.map(({appid:a,name:t})=>(0,e.createElement)(e.createFragment,null,(0,e.createElement)(n.default,{id:a,label:t,condition:window.dataStore.checkedGamesIDs.includes(a.toString())})))))}
},{"../../framework/element":"PA9s","../../data/newsData":"XFev","../../data/SteamAPI":"6joL","../../data/gamesData":"AXqE","../Checkbox/Checkbox":"zput","./Games.css":"rtiJ"}],"nw83":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Timestamp=n;var e=require("../../framework/element");function t(){return(t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}const a=[{id:"all",value:"alltime",name:"All news"},{id:"today",value:"today",name:"Today"},{id:"week",value:"week",name:"For last 7 days"},{id:"month",value:"month",name:"This month"}];function n({currentTimestamp:n,setCurrentTimestampCB:r}){return(0,e.createElement)(e.createFragment,null,(0,e.createElement)("div",null,(0,e.createElement)("p",null,"Timestamps"),(0,e.createElement)("select",{id:"selectTimestamp",onChange:e=>r(e.target.value)},a.map(({id:a,value:r,name:l})=>(0,e.createElement)("option",t({value:r,id:a,name:"timestamp-option"},r===n?{selected:""}:{}),l)))))}
},{"../../framework/element":"PA9s"}],"fg6C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var e=require("../../framework/element"),t=r(require("../../framework/render"));function r(e){return e&&e.__esModule?e:{default:e}}const n=function(e){window.dataStore.keyword=e,(0,t.default)()};function a(){return(0,e.createElement)("div",null,(0,e.createElement)("p",null,"Input KEYWORD and press enter"),(0,e.createElement)("input",{type:"text",id:"search-input",placeholder:"search",value:window.dataStore.keyword,onChange:e=>n(e.target.value)}),(0,e.createElement)("button",{type:"button",onClick:e=>(0,t.default)()},"Search"))}
},{"../../framework/element":"PA9s","../../framework/render":"iWoG"}],"H196":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=require("../../framework/element"),t=require("../../utils"),l=a(require("../Checkbox/Checkbox"));function a(e){return e&&e.__esModule?e:{default:e}}function n({itemData:a,setTagCB:n}){const{date:r,title:u,contents:i,feedlabel:c}=a;return(0,e.createElement)(e.createFragment,null,(0,e.createElement)("h3",{class:"title"},u),(0,e.createElement)("div",null,c),(0,e.createElement)("div",null,(0,t.getDateFromUnixTimestamp)(r)),(0,e.createElement)("p",null,(0,t.dataToHTML)(i)),(0,e.createElement)("div",null," ","All news with tag",(0,e.createElement)(e.createFragment,null,(0,e.createElement)(l.default,{id:c,label:c,condition:window.dataStore.tag==c,onChange:e=>n(e.target.value)}))))}
},{"../../framework/element":"PA9s","../../utils":"FO+Z","../Checkbox/Checkbox":"zput"}],"AVzt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var e=require("../../framework/element"),t=require("../../data/newsData"),a=require("../../utils"),r=l(require("../NewsFeedItem/NewsFeedItem")),d=l(require("../../framework/render"));function l(e){return e&&e.__esModule?e:{default:e}}const n=function(e){null!==window.dataStore.tag?window.dataStore.tag=null:window.dataStore.tag=e,(0,d.default)()};function i(){const{checkedGamesIDs:d,newsByGames:l,tag:i,currentTimestamp:w,keyword:o}=window.dataStore;let s=[];return d.map(e=>{s=[...s,...l[e].appnews.newsitems]}),window.dataStore.filteredNews=(0,t.filterDataByTimestamp)(s,a.currentDate,w),""!==o&&(window.dataStore.filteredNews=s.filter(e=>e.title.includes(o))),null!=i&&(window.dataStore.filteredNews=s.filter(e=>e.feedlabel==i)),window.dataStore.filteredNews=(0,a.sortDataByNewest)(window.dataStore.filteredNews),(0,e.createElement)(e.createFragment,null,(0,e.createElement)("p",null,"News feed:"),(0,e.createElement)("div",null,"tag:",window.dataStore.tag||"all tags"),(0,e.createElement)("div",null,window.dataStore.filteredNews.map(t=>(0,e.createElement)(r.default,{itemData:t,setTagCB:n}))))}
},{"../../framework/element":"PA9s","../../data/newsData":"XFev","../../utils":"FO+Z","../NewsFeedItem/NewsFeedItem":"H196","../../framework/render":"iWoG"}],"VV7u":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s;var e=require("../../framework/element"),t=u(require("../../framework/render")),r=require("../Timestamp/Timestamp"),a=u(require("../Search/SearchByKeyword")),n=u(require("../NewsFeed/NewsFeed")),l=u(require("../../data/newsData"));function u(e){return e&&e.__esModule?e:{default:e}}const o=function(e){window.dataStore.currentTimestamp=e,(0,t.default)()};function s(){const{checkedGamesIDs:t,isDataLoading:u,error:s,currentTimestamp:m}=window.dataStore;let i="";return 0==t.length?i="Welcome to your personal game news aggregator!":(u&&(i="Loading...Please, wait. It may takes more than 20 seconds for a first load"),null!==s&&(i=s)),(0,l.default)()&&0!==t.length&&(i=(0,e.createElement)(e.createFragment,null,(0,e.createElement)(r.Timestamp,{currentTimestamp:m,setCurrentTimestampCB:o}),(0,e.createElement)(a.default,null),(0,e.createElement)(n.default,null))),(0,e.createElement)("div",null,i)}
},{"../../framework/element":"PA9s","../../framework/render":"iWoG","../Timestamp/Timestamp":"nw83","../Search/SearchByKeyword":"fg6C","../NewsFeed/NewsFeed":"AVzt","../../data/newsData":"XFev"}],"wGNU":[function(require,module,exports) {
module.exports={main_header:"_main_header_f286c"};
},{"./img\\hero_img.JPG":[["hero_img.680a75a0.JPG","yyK+"],"yyK+"]}],"SoJR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e=require("../../framework/element"),r=l(require("../Games/Games")),t=l(require("../News/NewsResults")),a=l(require("./App.css"));function l(e){return e&&e.__esModule?e:{default:e}}function u(){return(0,e.createElement)(e.createFragment,null,(0,e.createElement)("header",{className:a.default.main_header}),(0,e.createElement)(r.default,null),(0,e.createElement)(t.default,null))}
},{"../../framework/element":"PA9s","../Games/Games":"EUu2","../News/NewsResults":"VV7u","./App.css":"wGNU"}],"L+lk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=t(require("./App"));function t(e){return e&&e.__esModule?e:{default:e}}
},{"./App":"SoJR"}],"Focm":[function(require,module,exports) {
"use strict";var e=a(require("./data/dataStore")),t=a(require("./framework/render")),r=a(require("./components/App"));function a(e){return e&&e.__esModule?e:{default:e}}window.dataStore=e.default,(0,t.default)(r.default,document.getElementById("app-root"));
},{"./data/dataStore":"hy1s","./framework/render":"iWoG","./components/App":"L+lk"}]},{},["Focm"], null)
//# sourceMappingURL=src.8b7bd5e5.js.map