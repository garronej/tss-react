(this.webpackJsonpspa=this.webpackJsonpspa||[]).push([[0],{154:function(e,t,r){"use strict";var n=r(234);Object.defineProperty(t,"__esModule",{value:!0}),t.useCssAndCx=t.createCssAndCx=void 0;var o=r(456),a=r(51),s=r(42),c=r(457),i=r(155),l=r(463),u="ref";t.createCssAndCx=function(){function e(e,t,r){var n=[],o=(0,s.getRegisteredStyles)(e,n,r);return n.length<2?r:o+t(n)}return{createCssAndCx:function(t){var r=t.cache,c=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];var c=void 0;if(1===t.length){var i=t,b=n(i,1),h=b[0];if(h instanceof Object&&u in h){var f=h.ref;if("string"===typeof f||void 0===f){c=f;var v=Object.assign({},h);delete v.ref,t=[v]}}}var m=(0,a.serializeStyles)(t,r.registered);(0,s.insertStyles)(r,m,!1);var p="".concat(r.key,"-").concat(m.name).concat(void 0===c?"":" ".concat(c)),j=t[0];return(0,l.matchCSSObject)(j)&&d.saveClassNameCSSObjectMapping(r,p,j),p};return{css:c,cx:function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];var s=(0,o.classnames)(n),i=d.fixClassName(r,s,c);return e(r.registered,c,i)}}}}}().createCssAndCx,t.useCssAndCx=function(){var e=(0,i.useTssEmotionCache)(),r=(0,c.useGuaranteedMemo)((function(){return(0,t.createCssAndCx)({cache:e})}),[e]);return{css:r.css,cx:r.cx}};var d=function(){var e=new WeakMap;return{saveClassNameCSSObjectMapping:function(t,r,n){var o=e.get(t);void 0===o&&(o=new Map,e.set(t,o)),o.set(r,n)},fixClassName:function(t,r,a){var s=e.get(t);return(0,o.classnames)(function(e){var t=!1;return e.map((function(e){var r,o=n(e,2),a=o[0],s=o[1];if(void 0===s)return a;if(t)r={"&&":s};else for(var c in r=a,s)if(c.startsWith("@media")){t=!0;break}return r}))}(r.split(" ").map((function(e){return[e,null===s||void 0===s?void 0:s.get(e)]}))).map((function(e){return"string"===typeof e?e:a(e)})))}}}()},155:function(e,t,r){"use strict";var n,o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TssCacheProvider=t.useTssEmotionCache=t.getDoExistsTssDefaultEmotionCacheMemoizedValue=t.getTssDefaultEmotionCache=void 0;var a=r(2),s=r(1),c=o(r(78));n=function(){var e=void 0;return{getTssDefaultEmotionCache:function(t){var r=(null!==t&&void 0!==t?t:{}).doReset;return void 0!==r&&r&&(e=void 0),void 0===e&&(e=(0,c.default)({key:"tss"})),e},getDoExistsTssDefaultEmotionCacheMemoizedValue:function(){return void 0!==e}}}(),t.getTssDefaultEmotionCache=n.getTssDefaultEmotionCache,t.getDoExistsTssDefaultEmotionCacheMemoizedValue=n.getDoExistsTssDefaultEmotionCacheMemoizedValue;var i=(0,s.createContext)(void 0);t.useTssEmotionCache=function(){var e=(0,s.useContext)(i);return null!==e&&void 0!==e?e:(0,t.getTssDefaultEmotionCache)()},t.TssCacheProvider=function(e){var t=e.children,r=e.value;return(0,a.jsx)(i.Provider,Object.assign({value:r},{children:t}),void 0)}},237:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.assert=void 0,t.assert=function(e,t){if(!e)throw new Error(t)}},238:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.typeGuard=void 0,t.typeGuard=function(e,t){return t}},239:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.objectKeys=void 0,t.objectKeys=function(e){return Object.keys(e)}},240:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createMakeStyles=void 0;var n=r(1),o=r(465),a=r(239),s=r(154),c=r(466),i=r(238),l=r(155),u=r(237),d=function(){var e=0;return function(){return e++}}();t.createMakeStyles=function(e){var t=e.useTheme;return{makeStyles:function(e){var r=(null!==e&&void 0!==e?e:{}).name,b="object"!==typeof r?r:Object.keys(r)[0];return function(e){var r="function"===typeof e?e:function(){return e},h=d();return function(e){var d=t(),f=(0,s.useCssAndCx)(),v=f.css,m=f.cx,p=(0,l.useTssEmotionCache)();return(0,n.useMemo)((function(){var t={},n="undefined"!==typeof Proxy&&new Proxy({},{get:function(e,r){return"symbol"===typeof r&&(0,u.assert)(!1),t[r]="".concat(p.key,"-").concat(h).concat(void 0!==b?"-".concat(b):"","-").concat(r,"-ref")}}),s=r(d,e,n||{}),c=(0,o.objectFromEntries)((0,a.objectKeys)(s).map((function(e){var r=s[e];return r.label||(r.label="".concat(void 0!==b?"".concat(b,"-"):"").concat(e)),[e,"".concat(v(r)).concat((0,i.typeGuard)(e,e in t)?" ".concat(t[e]):"")]})));return(0,a.objectKeys)(t).forEach((function(e){e in c||(c[e]=t[e])})),{classes:c,theme:d,css:v,cx:m}}),[p,v,m,d,(0,c.getDependencyArrayRef)(e)])}}},useStyles:function(){var e=t(),r=(0,s.useCssAndCx)();return{theme:e,css:r.css,cx:r.cx}}}}},456:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.classnames=void 0;var n=r(237),o=r(238);t.classnames=function(e){for(var r=e.length,a=0,s="";a<r;a++){var c=e[a];if(null!=c){var i=void 0;switch(typeof c){case"boolean":break;case"object":if(Array.isArray(c))i=(0,t.classnames)(c);else for(var l in(0,n.assert)(!(0,o.typeGuard)(c,!1)),i="",c)c[l]&&l&&(i&&(i+=" "),i+=l);break;default:i=c}i&&(s&&(s+=" "),s+=i)}}return s}},457:function(e,t,r){"use strict";var n=r(458);Object.defineProperty(t,"__esModule",{value:!0}),t.useGuaranteedMemo=void 0;var o=r(1);t.useGuaranteedMemo=function(e,t){var r=(0,o.useRef)();return(!r.current||t.length!==r.current.prevDeps.length||r.current.prevDeps.map((function(e,r){return e===t[r]})).indexOf(!1)>=0)&&(r.current={v:e(),prevDeps:n(t)}),r.current.v}},463:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.matchCSSObject=void 0,t.matchCSSObject=function(e){return e instanceof Object&&!("styles"in e)&&!("length"in e)&&!("__emotion_styles"in e)}},464:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useMergedClasses=t.mergeClasses=void 0;var n=r(239),o=r(154),a=r(1);function s(e,t,r){if(void 0===t)return e;var o={};return(0,n.objectKeys)(e).forEach((function(n){return o[n]=r(e[n],t[n])})),o}t.mergeClasses=s,t.useMergedClasses=function(e,t){var r=(0,o.useCssAndCx)().cx;return(0,a.useMemo)((function(){return s(e,t,r)}),[e,t,r])}},465:function(e,t,r){"use strict";var n=r(234);Object.defineProperty(t,"__esModule",{value:!0}),t.objectFromEntries=void 0,t.objectFromEntries=Object.fromEntries?Object.fromEntries:function(e){if(!e||!e[Symbol.iterator])throw new Error("Object.fromEntries() requires a single iterable argument");var t={};return Object.keys(e).forEach((function(r){var o=n(e[r],2),a=o[0],s=o[1];t[a]=s})),t}},466:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDependencyArrayRef=void 0,t.getDependencyArrayRef=function(e){if(!(e instanceof Object)||"function"===typeof e)return e;var t=[];for(var r in e){var n=e[r],o=typeof n;if("string"!==o&&("number"!==o||isNaN(n))&&"boolean"!==o&&void 0!==n&&null!==n)return e;t.push("".concat(r,":").concat(o,"_").concat(n))}return"xSqLiJdLMd9s"+t.join("|")}},467:function(e,t,r){"use strict";var n=r(468),o=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r};Object.defineProperty(t,"__esModule",{value:!0}),t.createWithStyles=void 0;var a=r(2),s=r(1),c=r(240),i=r(469);function l(e){var t={},r={};return Object.keys(e).forEach((function(n){return(n.startsWith("@media")?r:t)[n]=e[n]})),Object.keys(r).forEach((function(e){var o=r[e];Object.keys(o).forEach((function(r){var a;return t[r]=Object.assign(Object.assign({},null!==(a=t[r])&&void 0!==a?a:{}),n({},e,o[r]))}))})),t}t.createWithStyles=function(e){var t=e.useTheme,r=(0,c.createMakeStyles)({useTheme:t}).makeStyles;return{withStyles:function(e,t,n){var c="string"===typeof e?function(){var t=e,r=function(e){var r=e.children,n=o(e,["children"]);return(0,s.createElement)(t,n,r)};return Object.defineProperty(r,"name",{value:(0,i.capitalize)(t)}),r}():e,u=function(){var e=c.name;return"string"===typeof e?e:void 0}(),d=r(void 0!==(null===n||void 0===n?void 0:n.name)?n:{name:u})("function"===typeof t?function(e,r,n){return l(t(e,r,n))}:l(t)),b=(0,s.forwardRef)((function(t,r){var n=d(t),s=n.classes,i=n.cx,l=t.className,u=o(t,["className"]);return(0,a.jsx)(c,Object.assign({ref:r,className:i(s.root,l)},"string"===typeof e?{}:{classes:s},u),void 0)}));return void 0!==u&&Object.defineProperty(b,"name",{value:"".concat(u,"WithStyles")}),b}}}},469:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.capitalize=void 0,t.capitalize=function(e){return e.charAt(0).toUpperCase()+e.slice(1)}},472:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.GlobalStyles=void 0;var s=r(2),c=a(r(50));t.GlobalStyles=function(e){var t=e.styles;return(0,s.jsx)(c.Global,{styles:c.css(t)},void 0)}},477:function(e,t,r){"use strict";r.r(t);r(253),r(265);var n=r(242),o=r(97),a=r(493),s=Object(o.createMakeAndWithStyles)({useTheme:a.a}),c=s.makeStyles,i=s.useStyles,l=s.withStyles,u=r(246),d=r(10),b=r(1),h=r(20),f=r(504),v=r(500),m=r(2),p=Object(h.a)("h1")({color:"yellow"});function j(e){var t=e.className,r=y(),n=r.classes,a=r.css,s=r.cx;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(o.GlobalStyles,{styles:{body:{backgroundColor:"pink"},".foo":{color:"cyan"}}}),Object(m.jsxs)("div",{className:n.root,children:[Object(m.jsx)("h1",{children:"Black"}),Object(m.jsx)("h1",{children:"Should be lime green"}),Object(m.jsx)("h1",{className:s(a({border:"1px solid black"}),t),children:"Black, should have border and shadow"}),Object(m.jsx)("h1",{className:"foo",children:"Should be cyan"}),Object(m.jsx)(p,{children:"Should be yellow"}),Object(m.jsx)(p,{className:n.ovStyled,children:"Should be dark red"}),Object(m.jsx)(f.a,{variant:"contained",color:"primary",children:" Background should be lime green "}),Object(m.jsx)(f.a,{variant:"contained",color:"primary",className:n.ovInternal,children:"Background should be dark blue"}),Object(m.jsx)("div",{className:n.parent,children:Object(m.jsx)("div",{className:n.child,children:"Background should turn red when mouse is hover the parent."})}),Object(m.jsxs)(v.a,{className:n.breadcrumbs_className,color:"primary",children:[Object(m.jsx)("span",{children:"background should be lightblue"}),Object(m.jsx)("span",{children:"and the separator (/) should be red except when hover, then it is blue"})]}),Object(m.jsx)("div",{style:{height:10}}),Object(m.jsxs)(v.a,{classes:{root:n.breadcrumbs2_root,separator:n.breadcrumbs2_separator},color:"primary",children:[Object(m.jsx)("span",{children:"background should be lightblue"}),Object(m.jsx)("span",{children:"and the separator (/) should be red except when hover, then it is blue"})]}),Object(m.jsxs)(C,{children:[Object(m.jsx)("span",{children:"The separator"}),Object(m.jsx)("span",{children:"should be lightgreen"})]}),Object(m.jsx)(f.a,{variant:"contained",color:"primary",className:n.button2_className,children:Object(m.jsx)("span",{children:"The background should be red"})}),Object(m.jsx)(f.a,{variant:"contained",color:"primary",classes:{root:n.button2_root},children:Object(m.jsx)("span",{children:"The background should be red"})}),Object(m.jsx)("div",{className:s(n.testCx_bgYellow,n.testCx_bgCyan),children:"Background should be cyan"}),Object(m.jsx)("div",{className:s(n.testCx_bgCyan,n.testCx_bgYellow),children:"Background should be yellow"}),Object(m.jsxs)("div",{className:n.childRefTest_wrapper,children:[Object(m.jsx)("div",{className:s(n.childRefTest_textColorPink,n.childRefTest_wrapper1),children:"Background should turn cyan when mouse hover the parent. Also the text should NOT be pink"}),Object(m.jsx)("div",{className:s(n.childRefTest_wrapper2),children:"Background should NOT turn cyan when mouse hover the parent."})]}),Object(m.jsx)("div",{className:n.mq,children:"The background color should turn from lightgreen to cyan when the window inner with goes is below 960px"}),Object(m.jsx)(g,{className:a({color:"red"}),colorSmall:"cyan"}),Object(m.jsx)(x,{children:"The text should turn from red to blue when the window inner width goes below 960px And I should have a class like tss-xxxxxx-MyStyledButton-text"}),Object(m.jsx)("br",{}),Object(m.jsx)(O,{href:"http://exampe.com",children:"Background should be red"}),Object(m.jsx)(O,{href:"https://exampe.com",children:"Background should be limegreen"}),Object(m.jsx)("div",{className:s(a({"@media screen and (min-width: 1px)":{backgroundColor:"red"},height:50}),a({backgroundColor:"lightgreen"})),children:"background should be lightgreen"}),Object(m.jsx)(k,{}),Object(m.jsx)(_,{})]})]})}var y=c({name:{App:j}})((function(e,t,r){var n={border:"1px solid black",margin:30,height:100,color:"black"};return{root:{"& > h1:nth-child(2)":{color:e.palette.primary.main}},ovStyled:{color:"darkred"},ovInternal:{backgroundColor:"darkblue"},parent:Object(d.a)({border:"1px solid black",padding:30},"&:hover .".concat(r.child),{background:"red"}),child:{background:"blue",border:"1px solid black"},breadcrumbs_className:{backgroundColor:"lightblue","& .MuiBreadcrumbs-separator":{color:"red"},"&:hover .MuiBreadcrumbs-separator":{color:"blue"}},breadcrumbs2_root:Object(d.a)({backgroundColor:"lightblue"},"&:hover .".concat(r.breadcrumbs2_separator),{color:"blue"}),breadcrumbs2_separator:{color:"red"},button2_className:{backgroundColor:"red"},button2_root:{backgroundColor:"red"},testCx_bgYellow:{backgroundColor:"yellow"},testCx_bgCyan:{backgroundColor:"cyan"},childRefTest_wrapper:Object(d.a)({border:"1px solid black"},"&:hover .".concat(r.childRefTest_wrapper1),{backgroundColor:"cyan"}),childRefTest_wrapper1:Object(u.a)({},n),childRefTest_wrapper2:n,childRefTest_textColorPink:{color:"pink"},mq:{height:100,backgroundColor:"lightgreen","@media (max-width: 960px)":{backgroundColor:"cyan"}}}}));var g=l((function(e){return Object(m.jsx)("div",{className:e.className,children:"The background color should turn from limegreen to cyan when the window inner with goes below 960px. Font should be red"})}),(function(e,t){return{root:{backgroundColor:e.palette.primary.main,height:100,marginTop:20},"@media (max-width: 960px)":{root:{backgroundColor:t.colorSmall}}}})),x=l(f.a,{text:{color:"red",textTransform:"unset"},"@media (max-width: 960px)":{text:{color:"blue"}}},{name:"MyStyledButton"}),O=l("a",(function(e,t){var r=t.href;return{root:{border:"1px solid black",backgroundColor:(null===r||void 0===r?void 0:r.startsWith("https"))?e.palette.primary.main:"red"}}})),C=l(v.a,(function(e,t,r){return{ol:Object(d.a)({},"& .".concat(r.separator),{color:e.palette.primary.main})}})),k=function(){var e=Object(b.memo)((function(){var e=t({color:"primary"}),r=e.classes,n=e.cx;return Object(m.jsxs)("div",{className:r.root,children:[Object(m.jsx)("div",{className:r.child,children:"The Background take the primary theme color when the mouse is hover the parent."}),Object(m.jsx)("div",{className:n(r.child,r.small),children:"The Background take the primary theme color when the mouse is hover the parent. I am smaller than the other child."})]})})),t=c({name:{SecondNestedSelectorExample:e}})((function(e,t,r){var n=t.color;return{root:Object(d.a)({padding:30},"&:hover .".concat(r.child),{backgroundColor:e.palette[n].main}),small:{},child:Object(d.a)({border:"1px solid black",height:50},"&.".concat(r.small),{height:30})}}));return{SecondNestedSelectorExample:e}}().SecondNestedSelectorExample,_=function(){var e=c()({foo:{border:"3px dotted black",backgroundColor:"red"},bar:{color:"pink"}}),t=function(t){var r=e().classes;return r=Object(o.useMergedClasses)(r,t.classes),Object(m.jsx)("div",{className:r.foo,children:Object(m.jsx)("span",{className:r.bar,children:"The background should be green, the box should have a dotted border and the text should be pink"})})};return{MyTestComponentForMergedClasses:function(){var r=e().css;return Object(m.jsx)(t,{classes:{foo:r({backgroundColor:"green"})}})}}}().MyTestComponentForMergedClasses,S=r(28),w=r(502),M=r(247),T=r(503),N=r(78),P=Object(N.default)({key:"mui",prepend:!0}),E=Object(M.a)({palette:{primary:{main:"#32CD32"}}});function A(){var e=i().css;return Object(m.jsx)(j,{className:e({boxShadow:"10px 5px 5px teal"})})}Object(n.render)(Object(m.jsx)(S.a,{value:P,children:Object(m.jsxs)(w.a,{theme:E,children:[Object(m.jsx)(T.a,{}),Object(m.jsx)(A,{})]})}),document.getElementById("root"))},97:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createMakeAndWithStyles=t.TssCacheProvider=t.getTssDefaultEmotionCache=t.GlobalStyles=t.keyframes=t.createWithStyles=t.createMakeStyles=t.useMergedClasses=t.useCssAndCx=void 0;var n=r(154);Object.defineProperty(t,"useCssAndCx",{enumerable:!0,get:function(){return n.useCssAndCx}});var o=r(464);Object.defineProperty(t,"useMergedClasses",{enumerable:!0,get:function(){return o.useMergedClasses}});var a=r(240);Object.defineProperty(t,"createMakeStyles",{enumerable:!0,get:function(){return a.createMakeStyles}});var s=r(467);Object.defineProperty(t,"createWithStyles",{enumerable:!0,get:function(){return s.createWithStyles}});var c=r(50);Object.defineProperty(t,"keyframes",{enumerable:!0,get:function(){return c.keyframes}});var i=r(472);Object.defineProperty(t,"GlobalStyles",{enumerable:!0,get:function(){return i.GlobalStyles}});var l=r(155);Object.defineProperty(t,"getTssDefaultEmotionCache",{enumerable:!0,get:function(){return l.getTssDefaultEmotionCache}}),Object.defineProperty(t,"TssCacheProvider",{enumerable:!0,get:function(){return l.TssCacheProvider}}),t.createMakeAndWithStyles=function(e){return Object.assign(Object.assign({},(0,a.createMakeStyles)(e)),(0,s.createWithStyles)(e))}}},[[477,1,2]]]);
//# sourceMappingURL=main.12846a47.chunk.js.map