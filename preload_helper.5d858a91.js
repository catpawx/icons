!function(){"use strict";var t="/icons/".replace(/([^/])$/,"$1/"),e=location.pathname,n=e.startsWith(t)&&decodeURI("/".concat(e.slice(t.length)));if(n){var a=document,c=a.head,r=a.createElement.bind(a),i=function(t,e,n){var a,c=e.r[t]||(null===(a=Object.entries(e.r).find((function(e){var n=e[0];return new RegExp("^".concat(n.replace(/\/:[^/]+/g,"/[^/]+").replace("/*","/.+"),"$")).test(t)})))||void 0===a?void 0:a[1]);return null==c?void 0:c.map((function(t){var a=e.f[t][1],c=e.f[t][0];return{type:c.split(".").pop(),url:"".concat(n.publicPath).concat(c),attrs:[["data-".concat(e.b),"".concat(e.p,":").concat(a)]]}}))}(n,{"p":"@catpawx/icons","b":"webpack","f":[["nm__dumi__dist__client__pages__Demo__index.578aa5c0.chunk.css",9],["nm__dumi__dist__client__pages__Demo__index.430f40d8.async.js",9],["docs__plugins__icons-bin.md.decf0876.chunk.css",34],["docs__plugins__icons-bin.md.a03e92ff.async.js",34],["nm__dumi__dist__client__pages__404.6ae4a904.chunk.css",65],["nm__dumi__dist__client__pages__404.8b0a55a8.async.js",65],["docs__component__icons-react-native.md.decf0876.chunk.css",119],["docs__component__icons-react-native.md.491440ab.async.js",119],["docs__component__icons-react.md.decf0876.chunk.css",250],["docs__component__icons-react.md.912ad203.async.js",250],["docs__component__icons-taro.md.decf0876.chunk.css",334],["docs__component__icons-taro.md.51208cc9.async.js",334],["docs__guide__quickstart.md.decf0876.chunk.css",502],["docs__guide__quickstart.md.e0dadd0b.async.js",502],["nm__dumi__theme-default__layouts__DocLayout__index.a04956f6.async.js",519],["647.33e4e038.chunk.css",647],["647.fecdd822.async.js",647],["819.f676b163.async.js",819],["dumi__tmp-production__dumi__theme__ContextWrapper.47b161bb.async.js",923],["docs__index.md.decf0876.chunk.css",935],["docs__index.md.0b297e1b.async.js",935]],"r":{"/*":[4,5,14,15,16,18],"/":[17,19,20,14,15,16,18],"/~demos/:id":[0,1,18],"/component/icons-react-native":[6,7,17,14,15,16,18],"/component/icons-react":[8,9,17,14,15,16,18],"/component/icons-taro":[10,11,17,14,15,16,18],"/plugins/icons-bin":[2,3,17,14,15,16,18],"/guide/quickstart":[12,13,17,14,15,16,18]}},{publicPath:"/icons/"});null==i||i.forEach((function(t){var e,n=t.type,a=t.url;if("js"===n)(e=r("script")).src=a,e.async=!0;else{if("css"!==n)return;(e=r("link")).href=a,e.rel="preload",e.as="style"}t.attrs.forEach((function(t){e.setAttribute(t[0],t[1]||"")})),c.appendChild(e)}))}}();