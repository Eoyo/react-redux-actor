!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("React"));else if("function"==typeof define&&define.amd)define(["React"],t);else{var r="object"==typeof exports?t(require("React")):t(e.React);for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}([function(e,t,r){e.exports=r(11)()},function(t,r){t.exports=e},function(e,t,r){"use strict";e.exports=function(e,t,r,n,o,i,u,a){if(!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var s=[r,n,o,i,u,a],f=0;(c=new Error(t.replace(/%s/g,function(){return s[f++]}))).name="Invariant Violation"}throw c.framesToPop=1,c}}},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";r.r(t),r.d(t,"createStore",function(){return c}),r.d(t,"combineReducers",function(){return f}),r.d(t,"bindActionCreators",function(){return l}),r.d(t,"applyMiddleware",function(){return h}),r.d(t,"compose",function(){return d}),r.d(t,"__DO_NOT_USE__ActionTypes",function(){return o});var n=r(5),o={INIT:"@@redux/INIT"+Math.random().toString(36).substring(7).split("").join("."),REPLACE:"@@redux/REPLACE"+Math.random().toString(36).substring(7).split("").join(".")},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function a(e){if("object"!==(void 0===e?"undefined":i(e))||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function c(e,t,r){var u;if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(c)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var s=e,f=t,p=[],l=p,d=!1;function h(){l===p&&(l=p.slice())}function y(){if(d)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return f}function v(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(d)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");var t=!0;return h(),l.push(e),function(){if(t){if(d)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");t=!1,h();var r=l.indexOf(e);l.splice(r,1)}}}function b(e){if(!a(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,f=s(f,e)}finally{d=!1}for(var t=p=l,r=0;r<t.length;r++){(0,t[r])()}return e}return b({type:o.INIT}),(u={dispatch:b,subscribe:v,getState:y,replaceReducer:function(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");s=e,b({type:o.REPLACE})}})[n.a]=function(){var e,t=v;return(e={subscribe:function(e){if("object"!==(void 0===e?"undefined":i(e))||null===e)throw new TypeError("Expected the observer to be an object.");function r(){e.next&&e.next(y())}return r(),{unsubscribe:t(r)}}})[n.a]=function(){return this},e},u}function s(e,t){var r=t&&t.type;return"Given "+(r&&'action "'+String(r)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function f(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var i=t[n];0,"function"==typeof e[i]&&(r[i]=e[i])}var u=Object.keys(r);var a=void 0;try{!function(e){Object.keys(e).forEach(function(t){var r=e[t];if(void 0===r(void 0,{type:o.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+o.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}(r)}catch(e){a=e}return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];if(a)throw a;for(var n=!1,o={},i=0;i<u.length;i++){var c=u[i],f=r[c],p=e[c],l=f(p,t);if(void 0===l){var d=s(c,t);throw new Error(d)}o[c]=l,n=n||l!==p}return n?o:e}}function p(e,t){return function(){return t(e.apply(this,arguments))}}function l(e,t){if("function"==typeof e)return p(e,t);if("object"!==(void 0===e?"undefined":i(e))||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":void 0===e?"undefined":i(e))+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var r=Object.keys(e),n={},o=0;o<r.length;o++){var u=r[o],a=e[u];"function"==typeof a&&(n[u]=p(a,t))}return n}function d(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}function h(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){for(var r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];var i=e.apply(void 0,n),a=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},c={getState:i.getState,dispatch:function(){return a.apply(void 0,arguments)}},s=t.map(function(e){return e(c)});return a=d.apply(void 0,s)(i.dispatch),u({},i,{dispatch:a})}}}},function(e,t,r){"use strict";(function(e,n){var o,i=r(8);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var u=Object(i.a)(o);t.a=u}).call(this,r(3),r(13)(e))},function(e,t,r){"use strict";var n={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i=Object.defineProperty,u=Object.getOwnPropertyNames,a=Object.getOwnPropertySymbols,c=Object.getOwnPropertyDescriptor,s=Object.getPrototypeOf,f=s&&s(Object);e.exports=function e(t,r,p){if("string"!=typeof r){if(f){var l=s(r);l&&l!==f&&e(t,l,p)}var d=u(r);a&&(d=d.concat(a(r)));for(var h=0;h<d.length;++h){var y=d[h];if(!(n[y]||o[y]||p&&p[y])){var v=c(r,y);try{i(t,y,v)}catch(e){}}}return t}return t}},function(e,t,r){"use strict";(function(e){var r="object"==typeof e&&e&&e.Object===Object&&e;t.a=r}).call(this,r(3))},function(e,t,r){"use strict";function n(e){var t,r=e.Symbol;return"function"==typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}r.d(t,"a",function(){return n})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(10);t.Fusion=n.Fusion;var o=r(14);t.Actor=o.Actor},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(17),o=r(1).createElement;t.Fusion=function(e){return function(t){return function(r){return function(i){return o(n.Provider,{store:e},o(n.connect(t)(r),i))}}}}},function(e,t,r){"use strict";var n=r(12);function o(){}e.exports=function(){function e(e,t,r,o,i,u){if(u!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return r.checkPropTypes=o,r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(4),i=r(15),u=r(16);function a(e,t,r){var n=function(r,n,o){var u=function(e,t){switch(t.type){case"redux-actor-merge":return void 0===e.sign||t.mergeState.sign||(e.sign=[]),i.Merge(e,t.mergeState);case"redux-actor-update":return i.Various(e)(function(e){return e});default:return"*"===t.type[0]&&"object"==typeof t.yetRus?(void 0===e.sign||t.yetRus.sign||(e.sign=[]),i.Merge(e,t.yetRus)):null}}(r,n);if(u)return u;if("function"==typeof e[n.type]){var a=e[n.type](r,Object.assign({},t[n.type],n)),c=a;return"function"==typeof a[Symbol.iterator]&&(i.next(function(){i.Senior(a,function(e){return"function"==typeof e?e():Array.isArray(e)||"object"!=typeof e?void console.log("Actor reducer wrong state return @*["+n.type+"]",e):o.dispatch({type:"*["+n.type+"]",yetRus:e})})}),c=r),c===r?r:(void 0===r.sign||a.sign||(r.sign=[]),i.Merge(r,c))}return void 0!==r.sign&&(r.sign=[]),r};return"always"===r?function(t,r,o){return e.always(n(t,r,o),r.type)}:n}t.Actor=function(e){return function(t){return function(r){var c=r.always?"always":"normal",s=a(r,t,c),f=o.createStore(function(t,r){return void 0===t&&(t=e),s(t,r,f)},o.applyMiddleware(u.default)),p={getStore:function(){return f},merge:function(e){f.dispatch({type:"redux-actor-merge",mergeState:e})},update:function(){f.dispatch({type:"redux-actor-update"})},grab:function(e){return e?e(f.getState()):f.getState()},subscribe:function(e){return f.subscribe(function(){i.next(function(){var t=f.getState();e(t)})})},pipe:function(e,t){f.subscribe(function(){var r=t(f.getState());e.merge(r)})}};return Object.getOwnPropertyNames(t).forEach(function(e){p[e]=function(t){f.dispatch(n({type:e},t))}}),p}}},t.Act=function(){return function(e){return function(t){return{reducers:t,actions:e}}}}},function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};function o(e){return Array.isArray(e)?e.slice():"object"==typeof e?n({},e):e}Object.defineProperty(t,"__esModule",{value:!0}),t.Merge=function e(t,r){if(Array.isArray(r)&&Array.isArray(t))return r;if("object"==typeof r&&"object"==typeof t){for(var o in t=n({},t),r)t[o]=e(t[o],r[o]);return t}return r},t.Various=function(e){var t=o(e);return Object.getOwnPropertyNames(e).forEach(function(r){t[r]=o(e[r])}),function(e){return e(t),t}},t.next=function(e){return new Promise(function(e){e()}).then(function(){e()})},t.Senior=function e(t,r,n){var o,i=!0,u=n;do{var a=void 0;"object"==typeof(a="object"==typeof(o=t.next(u)).value&&"function"==typeof o.value.then?o.value:r?r(o.value):o.value)&&"function"==typeof a.then?(a.then(function(n){e(t,r,n)}),i=!1):u=a}while(i&&!o.done)},t.SeniorWords={stop:Symbol("stop")}},function(e,t,r){(function(e){!function(t){"use strict";function r(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,r){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function u(e,t){u.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function c(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function s(e){var t=void 0===e?"undefined":S(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function f(e,t,r,n,p,l,d){p=p||[],d=d||[];var h=p.slice(0);if(void 0!==l){if(n){if("function"==typeof n&&n(h,l))return;if("object"===(void 0===n?"undefined":S(n))){if(n.prefilter&&n.prefilter(h,l))return;if(n.normalize){var y=n.normalize(h,l,e,t);y&&(e=y[0],t=y[1])}}}h.push(l)}"regexp"===s(e)&&"regexp"===s(t)&&(e=e.toString(),t=t.toString());var v=void 0===e?"undefined":S(e),b=void 0===t?"undefined":S(t),g="undefined"!==v||d&&d[d.length-1].lhs&&d[d.length-1].lhs.hasOwnProperty(l),m="undefined"!==b||d&&d[d.length-1].rhs&&d[d.length-1].rhs.hasOwnProperty(l);if(!g&&m)r(new i(h,t));else if(!m&&g)r(new u(h,e));else if(s(e)!==s(t))r(new o(h,e,t));else if("date"===s(e)&&e-t!=0)r(new o(h,e,t));else if("object"===v&&null!==e&&null!==t)if(d.filter(function(t){return t.lhs===e}).length)e!==t&&r(new o(h,e,t));else{if(d.push({lhs:e,rhs:t}),Array.isArray(e)){var w;for(e.length,w=0;w<e.length;w++)w>=t.length?r(new a(h,w,new u(void 0,e[w]))):f(e[w],t[w],r,n,h,w,d);for(;w<t.length;)r(new a(h,w,new i(void 0,t[w++])))}else{var O=Object.keys(e),j=Object.keys(t);O.forEach(function(o,i){var u=j.indexOf(o);u>=0?(f(e[o],t[o],r,n,h,o,d),j=c(j,u)):f(e[o],void 0,r,n,h,o,d)}),j.forEach(function(e){f(void 0,t[e],r,n,h,e,d)})}d.length=d.length-1}else e!==t&&("number"===v&&isNaN(e)&&isNaN(t)||r(new o(h,e,t)))}function p(e,t,r,n){return n=n||[],f(e,t,function(e){e&&n.push(e)},r),n.length?n:void 0}function l(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)void 0===n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":!function e(t,r,n){if(n.path&&n.path.length){var o,i=t[r],u=n.path.length-1;for(o=0;o<u;o++)i=i[n.path[o]];switch(n.kind){case"A":e(i[n.path[o]],n.index,n.item);break;case"D":delete i[n.path[o]];break;case"E":case"N":i[n.path[o]]=n.rhs}}else switch(n.kind){case"A":e(t[r],n.index,n.item);break;case"D":t=c(t,r);break;case"E":case"N":t[r]=n.rhs}return t}(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function d(e,t,r,n){var o=p(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach(function(e){var t=e.kind,n=function(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,u=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",u];default:return[]}}(e);r.log.apply(r,["%c "+x[t].text,function(e){return"color: "+x[e].color+"; font-weight: bold"}(t)].concat(j(n)))}):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function h(e,t,r,n){switch(void 0===e?"undefined":S(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,j(r)):e[n];case"function":return e(t);default:return e}}function y(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?function(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}(t):o,u=t.collapsed,a=t.colors,c=t.level,s=t.diff,f=void 0===t.titleFormatter;e.forEach(function(o,p){var l=o.started,y=o.startedTime,v=o.action,b=o.prevState,g=o.error,m=o.took,O=o.nextState,S=e[p+1];S&&(O=S.prevState,m=S.started-l);var j=n(v),P="function"==typeof u?u(function(){return O},v,o):u,x=w(y),E=a.title?"color: "+a.title(j)+";":"",C=["color: gray; font-weight: lighter;"];C.push(E),t.timestamp&&C.push("color: gray; font-weight: lighter;"),t.duration&&C.push("color: gray; font-weight: lighter;");var T=i(j,x,m);try{P?a.title&&f?r.groupCollapsed.apply(r,["%c "+T].concat(C)):r.groupCollapsed(T):a.title&&f?r.group.apply(r,["%c "+T].concat(C)):r.group(T)}catch(e){r.log(T)}var A=h(c,j,[b],"prevState"),N=h(c,j,[j],"action"),_=h(c,j,[g,b],"error"),D=h(c,j,[O],"nextState");if(A)if(a.prevState){var k="color: "+a.prevState(b)+"; font-weight: bold";r[A]("%c prev state",k,b)}else r[A]("prev state",b);if(N)if(a.action){var M="color: "+a.action(j)+"; font-weight: bold";r[N]("%c action    ",M,j)}else r[N]("action    ",j);if(g&&_)if(a.error){var R="color: "+a.error(g,b)+"; font-weight: bold;";r[_]("%c error     ",R,g)}else r[_]("error     ",g);if(D)if(a.nextState){var I="color: "+a.nextState(O)+"; font-weight: bold";r[D]("%c next state",I,O)}else r[D]("next state",O);s&&d(b,O,r,P);try{r.groupEnd()}catch(e){r.log("—— log end ——")}})}function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},E,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,u=t.logErrors,a=t.diffPredicate;if(void 0===r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var c=[];return function(e){var r=e.getState;return function(e){return function(s){if("function"==typeof i&&!i(r,s))return e(s);var f={};c.push(f),f.started=O.now(),f.startedTime=new Date,f.prevState=n(r()),f.action=s;var p=void 0;if(u)try{p=e(s)}catch(e){f.error=o(e)}else p=e(s);f.took=O.now()-f.started,f.nextState=n(r());var l=t.diff&&"function"==typeof a?a(r,s):t.diff;if(y(c,Object.assign({},t,{diff:l})),c.length=0,f.error)throw f.error;return p}}}}var b,g,m=function(e,t){return function(e,t){return new Array(t+1).join(e)}("0",t-e.toString().length)+e},w=function(e){return m(e.getHours(),2)+":"+m(e.getMinutes(),2)+":"+m(e.getSeconds(),2)+"."+m(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},P=[];b="object"===(void 0===e?"undefined":S(e))&&e?e:"undefined"!=typeof window?window:{},(g=b.DeepDiff)&&P.push(function(){void 0!==g&&b.DeepDiff===p&&(b.DeepDiff=g,g=void 0)}),r(o,n),r(i,n),r(u,n),r(a,n),Object.defineProperties(p,{diff:{value:p,enumerable:!0},observableDiff:{value:f,enumerable:!0},applyDiff:{value:function(e,t,r){e&&t&&f(e,t,function(n){r&&!r(e,t,n)||l(e,t,n)})},enumerable:!0},applyChange:{value:l,enumerable:!0},revertChange:{value:function(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)void 0===i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":!function e(t,r,n){if(n.path&&n.path.length){var o,i=t[r],u=n.path.length-1;for(o=0;o<u;o++)i=i[n.path[o]];switch(n.kind){case"A":e(i[n.path[o]],n.index,n.item);break;case"D":case"E":i[n.path[o]]=n.lhs;break;case"N":delete i[n.path[o]]}}else switch(n.kind){case"A":e(t[r],n.index,n.item);break;case"D":case"E":t[r]=n.lhs;break;case"N":t=c(t,r)}return t}(i[r.path[n]],r.index,r.item);break;case"D":case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}},enumerable:!0},isConflict:{value:function(){return void 0!==g},enumerable:!0},noConflict:{value:function(){return P&&(P.forEach(function(e){e()}),P=null),p},enumerable:!0}});var x={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},E={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?v()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};t.defaults=E,t.createLogger=v,t.logger=C,t.default=C,Object.defineProperty(t,"__esModule",{value:!0})}(t)}).call(this,r(3))},function(e,t,r){"use strict";r.r(t);var n=r(1),o=r(0),i=r.n(o),u=i.a.shape({trySubscribe:i.a.func.isRequired,tryUnsubscribe:i.a.func.isRequired,notifyNestedSubs:i.a.func.isRequired,isSubscribed:i.a.func.isRequired}),a=i.a.shape({subscribe:i.a.func.isRequired,dispatch:i.a.func.isRequired,getState:i.a.func.isRequired});function c(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"store",r=arguments[1]||t+"Subscription",o=function(e){function o(r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o);var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,r,n));return i[t]=r.store,i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(o,e),o.prototype.getChildContext=function(){var e;return(e={})[t]=this[t],e[r]=null,e},o.prototype.render=function(){return n.Children.only(this.props.children)},o}(n.Component);return o.propTypes={store:a.isRequired,children:i.a.element.isRequired},o.childContextTypes=((e={})[t]=a.isRequired,e[r]=u,e),o}var s=c(),f=r(6),p=r.n(f),l=r(2),d=r.n(l);var h=null,y={notify:function(){}};var v=function(){function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.store=t,this.parentSub=r,this.onStateChange=n,this.unsubscribe=null,this.listeners=y}return e.prototype.addNestedSub=function(e){return this.trySubscribe(),this.listeners.subscribe(e)},e.prototype.notifyNestedSubs=function(){this.listeners.notify()},e.prototype.isSubscribed=function(){return Boolean(this.unsubscribe)},e.prototype.trySubscribe=function(){this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.onStateChange):this.store.subscribe(this.onStateChange),this.listeners=function(){var e=[],t=[];return{clear:function(){t=h,e=h},notify:function(){for(var r=e=t,n=0;n<r.length;n++)r[n]()},get:function(){return t},subscribe:function(r){var n=!0;return t===e&&(t=e.slice()),t.push(r),function(){n&&e!==h&&(n=!1,t===e&&(t=e.slice()),t.splice(t.indexOf(r),1))}}}}())},e.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.listeners.clear(),this.listeners=y)},e}(),b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};var g=0,m={};function w(){}function O(e){var t,r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=o.getDisplayName,c=void 0===i?function(e){return"ConnectAdvanced("+e+")"}:i,s=o.methodName,f=void 0===s?"connectAdvanced":s,l=o.renderCountProp,h=void 0===l?void 0:l,y=o.shouldHandleStateChanges,O=void 0===y||y,S=o.storeKey,j=void 0===S?"store":S,P=o.withRef,x=void 0!==P&&P,E=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(o,["getDisplayName","methodName","renderCountProp","shouldHandleStateChanges","storeKey","withRef"]),C=j+"Subscription",T=g++,A=((t={})[j]=a,t[C]=u,t),N=((r={})[C]=u,r);return function(t){d()("function"==typeof t,"You must pass a component to the function returned by "+f+". Instead received "+JSON.stringify(t));var r=t.displayName||t.name||"Component",o=c(r),i=b({},E,{getDisplayName:c,methodName:f,renderCountProp:h,shouldHandleStateChanges:O,storeKey:j,withRef:x,displayName:o,wrappedComponentName:r,WrappedComponent:t}),u=function(r){function u(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,r.call(this,e,t));return n.version=T,n.state={},n.renderCount=0,n.store=e[j]||t[j],n.propsMode=Boolean(e[j]),n.setWrappedInstance=n.setWrappedInstance.bind(n),d()(n.store,'Could not find "'+j+'" in either the context or props of "'+o+'". Either wrap the root component in a <Provider>, or explicitly pass "'+j+'" as a prop to "'+o+'".'),n.initSelector(),n.initSubscription(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(u,r),u.prototype.getChildContext=function(){var e,t=this.propsMode?null:this.subscription;return(e={})[C]=t||this.context[C],e},u.prototype.componentDidMount=function(){O&&(this.subscription.trySubscribe(),this.selector.run(this.props),this.selector.shouldComponentUpdate&&this.forceUpdate())},u.prototype.componentWillReceiveProps=function(e){this.selector.run(e)},u.prototype.shouldComponentUpdate=function(){return this.selector.shouldComponentUpdate},u.prototype.componentWillUnmount=function(){this.subscription&&this.subscription.tryUnsubscribe(),this.subscription=null,this.notifyNestedSubs=w,this.store=null,this.selector.run=w,this.selector.shouldComponentUpdate=!1},u.prototype.getWrappedInstance=function(){return d()(x,"To access the wrapped instance, you need to specify { withRef: true } in the options argument of the "+f+"() call."),this.wrappedInstance},u.prototype.setWrappedInstance=function(e){this.wrappedInstance=e},u.prototype.initSelector=function(){var t=e(this.store.dispatch,i);this.selector=function(e,t){var r={run:function(n){try{var o=e(t.getState(),n);(o!==r.props||r.error)&&(r.shouldComponentUpdate=!0,r.props=o,r.error=null)}catch(e){r.shouldComponentUpdate=!0,r.error=e}}};return r}(t,this.store),this.selector.run(this.props)},u.prototype.initSubscription=function(){if(O){var e=(this.propsMode?this.props:this.context)[C];this.subscription=new v(this.store,e,this.onStateChange.bind(this)),this.notifyNestedSubs=this.subscription.notifyNestedSubs.bind(this.subscription)}},u.prototype.onStateChange=function(){this.selector.run(this.props),this.selector.shouldComponentUpdate?(this.componentDidUpdate=this.notifyNestedSubsOnComponentDidUpdate,this.setState(m)):this.notifyNestedSubs()},u.prototype.notifyNestedSubsOnComponentDidUpdate=function(){this.componentDidUpdate=void 0,this.notifyNestedSubs()},u.prototype.isSubscribed=function(){return Boolean(this.subscription)&&this.subscription.isSubscribed()},u.prototype.addExtraProps=function(e){if(!(x||h||this.propsMode&&this.subscription))return e;var t=b({},e);return x&&(t.ref=this.setWrappedInstance),h&&(t[h]=this.renderCount++),this.propsMode&&this.subscription&&(t[C]=this.subscription),t},u.prototype.render=function(){var e=this.selector;if(e.shouldComponentUpdate=!1,e.error)throw e.error;return Object(n.createElement)(t,this.addExtraProps(e.props))},u}(n.Component);return u.WrappedComponent=t,u.displayName=o,u.childContextTypes=N,u.contextTypes=A,u.propTypes=A,p()(u,t)}}var S=Object.prototype.hasOwnProperty;function j(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}function P(e,t){if(j(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(var o=0;o<r.length;o++)if(!S.call(t,r[o])||!j(e[r[o]],t[r[o]]))return!1;return!0}var x=r(4),E=r(7),C="object"==typeof self&&self&&self.Object===Object&&self,T=(E.a||C||Function("return this")()).Symbol,A=Object.prototype;A.hasOwnProperty,A.toString,T&&T.toStringTag;Object.prototype.toString;T&&T.toStringTag;Object.getPrototypeOf,Object;var N=Function.prototype,_=Object.prototype,D=N.toString;_.hasOwnProperty,D.call(Object);function k(e){return function(t,r){var n=e(t,r);function o(){return n}return o.dependsOnOwnProps=!1,o}}function M(e){return null!==e.dependsOnOwnProps&&void 0!==e.dependsOnOwnProps?Boolean(e.dependsOnOwnProps):1!==e.length}function R(e,t){return function(t,r){r.displayName;var n=function(e,t){return n.dependsOnOwnProps?n.mapToProps(e,t):n.mapToProps(e)};return n.dependsOnOwnProps=!0,n.mapToProps=function(t,r){n.mapToProps=e,n.dependsOnOwnProps=M(e);var o=n(t,r);return"function"==typeof o&&(n.mapToProps=o,n.dependsOnOwnProps=M(o),o=n(t,r)),o},n}}var I=[function(e){return"function"==typeof e?R(e):void 0},function(e){return e?void 0:k(function(e){return{dispatch:e}})},function(e){return e&&"object"==typeof e?k(function(t){return Object(x.bindActionCreators)(e,t)}):void 0}];var q=[function(e){return"function"==typeof e?R(e):void 0},function(e){return e?void 0:k(function(){return{}})}],F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function U(e,t,r){return F({},r,e,t)}var L=[function(e){return"function"==typeof e?function(e){return function(t,r){r.displayName;var n=r.pure,o=r.areMergedPropsEqual,i=!1,u=void 0;return function(t,r,a){var c=e(t,r,a);return i?n&&o(c,u)||(u=c):(i=!0,u=c),u}}}(e):void 0},function(e){return e?void 0:function(){return U}}];function W(e,t,r,n){return function(o,i){return r(e(o,i),t(n,i),i)}}function H(e,t,r,n,o){var i=o.areStatesEqual,u=o.areOwnPropsEqual,a=o.areStatePropsEqual,c=!1,s=void 0,f=void 0,p=void 0,l=void 0,d=void 0;function h(o,c){var h=!u(c,f),y=!i(o,s);return s=o,f=c,h&&y?(p=e(s,f),t.dependsOnOwnProps&&(l=t(n,f)),d=r(p,l,f)):h?(e.dependsOnOwnProps&&(p=e(s,f)),t.dependsOnOwnProps&&(l=t(n,f)),d=r(p,l,f)):y?function(){var t=e(s,f),n=!a(t,p);return p=t,n&&(d=r(p,l,f)),d}():d}return function(o,i){return c?h(o,i):function(o,i){return p=e(s=o,f=i),l=t(n,f),d=r(p,l,f),c=!0,d}(o,i)}}function B(e,t){var r=t.initMapStateToProps,n=t.initMapDispatchToProps,o=t.initMergeProps,i=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(t,["initMapStateToProps","initMapDispatchToProps","initMergeProps"]),u=r(e,i),a=n(e,i),c=o(e,i);return(i.pure?H:W)(u,a,c,e,i)}var Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};function K(e,t,r){for(var n=t.length-1;n>=0;n--){var o=t[n](e);if(o)return o}return function(t,n){throw new Error("Invalid value of type "+typeof e+" for "+r+" argument when connecting component "+n.wrappedComponentName+".")}}function G(e,t){return e===t}var V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.connectHOC,r=void 0===t?O:t,n=e.mapStateToPropsFactories,o=void 0===n?q:n,i=e.mapDispatchToPropsFactories,u=void 0===i?I:i,a=e.mergePropsFactories,c=void 0===a?L:a,s=e.selectorFactory,f=void 0===s?B:s;return function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=i.pure,s=void 0===a||a,p=i.areStatesEqual,l=void 0===p?G:p,d=i.areOwnPropsEqual,h=void 0===d?P:d,y=i.areStatePropsEqual,v=void 0===y?P:y,b=i.areMergedPropsEqual,g=void 0===b?P:b,m=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(i,["pure","areStatesEqual","areOwnPropsEqual","areStatePropsEqual","areMergedPropsEqual"]),w=K(e,o,"mapStateToProps"),O=K(t,u,"mapDispatchToProps"),S=K(n,c,"mergeProps");return r(f,Y({methodName:"connect",getDisplayName:function(e){return"Connect("+e+")"},shouldHandleStateChanges:Boolean(e),initMapStateToProps:w,initMapDispatchToProps:O,initMergeProps:S,pure:s,areStatesEqual:l,areOwnPropsEqual:h,areStatePropsEqual:v,areMergedPropsEqual:g},m))}}();r.d(t,"Provider",function(){return s}),r.d(t,"createProvider",function(){return c}),r.d(t,"connectAdvanced",function(){return O}),r.d(t,"connect",function(){return V})}])});
//# sourceMappingURL=index.js.map