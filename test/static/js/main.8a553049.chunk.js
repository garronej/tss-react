(this.webpackJsonpspa=this.webpackJsonpspa||[]).push([[0],{521:function(e,t,r){"use strict";r.r(t);r(285),r(303);var n=r(0),o=r.n(n),c=r(19),a=Object.fromEntries?Object.fromEntries:function(e){if(!e||!e[Symbol.iterator])throw new Error("Object.fromEntries() requires a single iterable argument");var t={};return Object.keys(e).forEach((function(r){var n=Object(c.a)(e[r],2),o=n[0],a=n[1];t[o]=a})),t};function s(e){return Object.keys(e)}function i(e,t){if(!e)throw new Error(t)}function l(e,t){return t}var u=function e(t){for(var r=t.length,n=0,o="";n<r;n++){var c=t[n];if(null!=c){var a=void 0;switch(typeof c){case"boolean":break;case"object":if(Array.isArray(c))a=e(c);else for(var s in i(!l(0,!1)),a="",c)c[s]&&s&&(a&&(a+=" "),a+=s);break;default:a=c}a&&(o&&(o+=" "),o+=a)}}return o},d=r(267),b=r(33),h=r(29);function f(e){return e instanceof Object&&!("styles"in e)&&!("length"in e)&&!("__emotion_styles"in e)}var v=function(){function e(e,t,r){var n=[],o=Object(b.a)(e,n,r);return n.length<2?r:o+t(n)}return{createCssAndCx:function(t){var r=t.cache,n=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object(d.a)(t,r.registered);Object(b.b)(r,o,!1);var c="".concat(r.key,"-").concat(o.name),a=t[0];return f(a)&&j.saveClassNameCSSObjectMapping(r,c,a),c};return{css:n,cx:function(){for(var t=arguments.length,o=new Array(t),c=0;c<t;c++)o[c]=arguments[c];var a=u(o),s=j.fixClassName(r,a,n);return e(r.registered,n,s)}}}}}(),p=v.createCssAndCx;function m(e){var t=e.useCache;return{useCssAndCx:function(){var e=t(),r=function(e,t){var r,o=Object(n.useRef)();return(!o.current||t.length!==(null===(r=o.current.prevDeps)||void 0===r?void 0:r.length)||o.current.prevDeps.map((function(e,r){return e===t[r]})).indexOf(!1)>=0)&&(o.current={v:e(),prevDeps:Object(h.a)(t)}),o.current.v}((function(){return p({cache:e})}),[e]);return{css:r.css,cx:r.cx}}}}var j=function(){var e=new WeakMap;return{saveClassNameCSSObjectMapping:function(t,r,n){var o=e.get(t);void 0===o&&(o=new Map,e.set(t,o)),o.set(r,n)},fixClassName:function(t,r,n){var o=e.get(t);return u(function(e){var t=!1;return e.map((function(e){var r,n=Object(c.a)(e,2),o=n[0],a=n[1];if(void 0===a)return o;if(t)r={"&&":a};else for(var s in r=o,a)if(s.startsWith("@media")){t=!0;break}return r}))}(r.split(" ").map((function(e){return[e,null===o||void 0===o?void 0:o.get(e)]}))).map((function(e){return"string"===typeof e?e:n(e)})))}}}();function g(e){if(!(e instanceof Object)||"function"===typeof e)return e;var t=[];for(var r in e){var n=e[r],o=typeof n;if("string"!==o&&("number"!==o||isNaN(n))&&"boolean"!==o&&void 0!==n&&null!==n)return e;t.push("".concat(r,":").concat(o,"_").concat(n))}return"xSqLiJdLMd9s"+t.join("|")}function O(e,t,r){if(!(t instanceof Object))return e;var n={};return s(e).forEach((function(o){return n[o]=r(e[o],t[o])})),s(t).forEach((function(r){if(!(r in e)){var o=t[r];"string"===typeof o&&(n[r]=o)}})),n}var x=r(37),y=0;function k(e){var t=e.useTheme,r=e.cache,o=S({cacheProvidedAtInception:r}).useCache,c=m({useCache:o}).useCssAndCx;return{makeStyles:function(e){var r=null!==e&&void 0!==e?e:{},u=r.name,d=r.uniqId,b=void 0===d?"".concat(y++):d,h="object"!==typeof u?u:Object.keys(u)[0];return function(e){var r="function"===typeof e?e:function(){return e};return function(e,u){var d=t(),f=c(),v=f.css,p=f.cx,m=o(),j=Object(n.useMemo)((function(){var t={},n="undefined"!==typeof Proxy&&new Proxy({},{get:function(e,r){return"symbol"===typeof r&&i(!1),t[r]="".concat(m.key,"-").concat(b).concat(void 0!==h?"-".concat(h):"","-").concat(r,"-ref")}}),o=r(d,e,n||{}),c=a(s(o).map((function(e){var r=o[e];return r.label||(r.label="".concat(void 0!==h?"".concat(h,"-"):"").concat(e)),[e,"".concat(v(r)).concat(l(0,e in t)?" ".concat(t[e]):"")]})));return s(t).forEach((function(e){e in c||(c[e]=t[e])})),c}),[m,v,p,d,g(e)]),x=null===u||void 0===u?void 0:u.props.classes,y=function(e){var t,r,o=e.classes,c=e.theme,a=e.muiStyleOverridesParams,s=e.css,i=e.cx,l=e.name;if("makeStyle no name"!==l){if(void 0!==a&&void 0===l)throw new Error("To use muiStyleOverridesParams, you must specify a name using .withName('MyComponent')")}else l=void 0;var u=void 0;try{u=void 0===l?void 0:(null===(r=null===(t=c.components)||void 0===t?void 0:t[l])||void 0===r?void 0:r.styleOverrides)||void 0}catch(b){}var d=Object(n.useMemo)((function(){if(void 0!==u){var e={};for(var t in u){var r=u[t];r instanceof Object&&(e[t]=s("function"===typeof r?r(Object.assign({theme:c,ownerState:null===a||void 0===a?void 0:a.ownerState},null===a||void 0===a?void 0:a.props)):r))}return e}}),[u,g(null===a||void 0===a?void 0:a.props),g(null===a||void 0===a?void 0:a.ownerState),s]);return{classes:o=Object(n.useMemo)((function(){return O(o,d,i)}),[o,d,i])}}({classes:j=Object(n.useMemo)((function(){return O(j,x,p)}),[j,g(x),p]),css:v,cx:p,name:null!==h&&void 0!==h?h:"makeStyle no name",idOfUseStyles:b,muiStyleOverridesParams:u,theme:d});return void 0!==y.classes&&(j=y.classes),void 0!==y.css&&(v=y.css),void 0!==y.cx&&(p=y.cx),{classes:j,theme:d,css:v,cx:p}}}},useStyles:function(){var e=t(),r=c();return{theme:e,css:r.css,cx:r.cx}}}}var w=Object(n.createContext)(void 0);var C={createUseCache:function(e){var t=e.cacheProvidedAtInception;return{useCache:function(){var e,r=Object(x.d)(),o=Object(n.useContext)(w),c=null!==(e=null!==t&&void 0!==t?t:o)&&void 0!==e?e:r;if(null===c)throw new Error(["In order to get SSR working with tss-react you need to explicitly provide an Emotion cache.","MUI users be aware: This is not an error strictly related to tss-react, with or without tss-react,","MUI needs an Emotion cache to be provided for SSR to work.","Here is the MUI documentation related to SSR setup: https://mui.com/material-ui/guides/server-rendering/","TSS provides helper that makes the process of setting up SSR easier: https://docs.tss-react.dev/ssr"].join("\n"));return c}}}},S=C.createUseCache,N=r(8);function T(e){return e.charAt(0).toUpperCase()+e.slice(1)}var _=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r};var E=new WeakMap,B="getClasses should only be used in conjunction with withStyles";function M(e){var t=e.classes;if(void 0===t)throw new Error(B);var r=E.get(t);if(void 0===r)throw new Error(B);return r}function P(e){var t={},r={};return Object.keys(e).forEach((function(n){return(n.startsWith("@media")?r:t)[n]=e[n]})),Object.keys(r).forEach((function(e){var n=r[e];Object.keys(n).forEach((function(r){var o;return t[r]=Object.assign(Object.assign({},null!==(o=t[r])&&void 0!==o?o:{}),Object(N.a)({},e,n[r]))}))})),t}var R=function(){var e="object"===typeof document&&"function"===typeof(null===document||void 0===document?void 0:document.getElementById),t="undefined"!==typeof jest,r="undefined"!==typeof mocha,n="undefined"!==typeof __vitest_worker__;return!e&&!t&&!r&&!n}(),A=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r};var I=0,U=[];function q(e){var t=e.useContext,r=e.useCache,o=e.useCssAndCx,c=e.usePlugin,u=e.name,d=e.doesUseNestedSelectors;return{withParams:function(){return q(Object.assign({},e))},withName:function(t){return q(Object.assign(Object.assign({},e),{name:"object"!==typeof t?t:Object.keys(t)[0]}))},withNestedSelectors:function(){return q(Object.assign(Object.assign({},e),{doesUseNestedSelectors:!0}))},create:function(e){var b="x".concat(I++);if(void 0!==u)for(;;){var f=U.find((function(e){return e.name===u}));if(void 0===f)break;U.splice(U.indexOf(f),1)}var v="function"===typeof e?e:function(){return e};return function(e){var f,p,m,j=null!==e&&void 0!==e?e:{},x=j.classesOverrides,y=A(j,["classesOverrides"]),k=t(),w=o(),C=w.css,S=w.cx,N=r(),T=Object(n.useMemo)((function(){var t={},r=v(Object.assign(Object.assign(Object.assign({},e),k),d?{classes:"undefined"===typeof Proxy?{}:new Proxy({},{get:function(e,r){if("symbol"===typeof r&&i(!1),R&&void 0===u)throw new Error(["tss-react: In SSR setups, in order to use nested selectors, you must also give a unique name to the useStyle function.",'Solution: Use tss.withName("ComponentName").withNestedSelectors<...>()... to set a name.'].join("\n"));if(void 0!==u){var n=U.find((function(e){return e.name===u}));void 0===n&&(n={name:u,nestedSelectorRuleNames:new Set},U.push(n)),n.nestedSelectorRuleNames.add(r)}if(void 0!==u){var o=void 0!==U.find((function(e){return e.name===u&&e.nestedSelectorRuleNames.has(r)}));if(o)throw new Error(['tss-react: There are in your codebase two different useStyles named "'.concat(u,'" that'),"both use use the nested selector ".concat(r,".\n"),"This may lead to CSS class name collisions, causing nested selectors to target elements outside of the intended scope.\n","Solution: Ensure each useStyles using nested selectors has a unique name.\n",'Use: tss.withName("UniqueName").withNestedSelectors<...>()...'].join(" "))}return t[r]="".concat(N.key,"-").concat(void 0!==u?u:b,"-").concat(r,"-ref")}})}:{})),n=a(s(r).map((function(e){var n=r[e];return n.label||(n.label="".concat(void 0!==u?"".concat(u,"-"):"").concat(e)),[e,"".concat(C(n)).concat(l(0,e in t)?" ".concat(t[e]):"")]})));return s(t).forEach((function(e){e in n||(n[e]=t[e])})),n}),[N,C,S,g(e)].concat(Object(h.a)(Object.values(k))));T=Object(n.useMemo)((function(){return O(T,x,S)}),[T,g(x),S]);var _=c(Object.assign(Object.assign({classes:T,css:C,cx:S,idOfUseStyles:b,name:u},k),y));return Object.assign({classes:null!==(f=_.classes)&&void 0!==f?f:T,css:null!==(p=_.css)&&void 0!==p?p:C,cx:null!==(m=_.cx)&&void 0!==m?m:S},k)}}}}var W=r(44);function D(e){var t=e.styles;return o.a.createElement(W.a,{styles:W.b(t)})}var F,J=function(e){I=0,U.splice(0,U.length);var t=e.useContext,r=e.usePlugin,n=e.cache,o=S({cacheProvidedAtInception:n}).useCache;return{tss:q({useContext:t,useCache:o,useCssAndCx:m({useCache:o}).useCssAndCx,usePlugin:null!==r&&void 0!==r?r:function(e){return{classes:e.classes,cx:e.cx,css:e.css}},name:void 0,doesUseNestedSelectors:!1})}}({useContext:function(){return{}}}),L=(J.tss.create({}),r(544)),Y=(F={useTheme:L.a},Object.assign(Object.assign({},k(F)),function(e){var t=k({useTheme:e.useTheme,cache:e.cache}).makeStyles;function r(e,r,c){var a="string"===typeof e?function(){var t=e,r=function(e){var r=e.children,o=_(e,["children"]);return Object(n.createElement)(t,o,r)};return Object.defineProperty(r,"name",{value:T(t)}),r}():e,s=function(){var e=(null!==c&&void 0!==c?c:{}).name;if(void 0!==e)return"object"!==typeof e?e:Object.keys(e)[0];var t=void 0,r=a.displayName;if("string"===typeof r&&""!==r&&(t=r),void 0===t){var n=a.name;"string"===typeof n&&""!==n&&(t=n)}return void 0!==t?t=(t=(t=t.replace(/\$/g,"usd")).replace(/\(/g,"_").replace(/\)/g,"_")).replace(/[^a-zA-Z0-9-_]/g,"_"):void 0}(),i=t(Object.assign(Object.assign({},c),{name:s}))("function"===typeof r?function(e,t,n){return P(r(e,t,n))}:P(r));function l(e){for(var t in e)if("root"!==t)return!0;return!1}var u=Object(n.forwardRef)((function(t,r){var n=t.className,c=(t.classes,_(t,["className","classes"])),s=i(t,{props:t}),u=s.classes,d=(0,s.cx)(u.root,n);return E.set(u,Object.assign(Object.assign({},u),{root:d})),o.a.createElement(a,Object.assign({ref:r,className:l(u)?n:d},"string"===typeof e?{}:{classes:u},c))}));return void 0!==s&&(u.displayName="".concat(T(s),"WithStyles"),Object.defineProperty(u,"name",{value:u.displayName})),u}return r.getClasses=M,{withStyles:r}}(F))),z=Y.makeStyles,H=Y.useStyles,Z=Y.withStyles,$=r(270),G=r(271),K=r(279),Q=r(277),V=r(149),X=r(24),ee=r(557),te=r(555),re=r(558),ne=r(554),oe=r(560),ce=r(273),ae=r.n(ce),se=r(1),ie=Object(X.a)("h1")({color:"yellow"});function le(e){var t=e.className,r=ue(),n=r.classes,o=r.css,c=r.cx;return Object(se.jsxs)(se.Fragment,{children:[Object(se.jsx)(D,{styles:{body:{backgroundColor:"pink"},".foo":{color:"cyan"}}}),Object(se.jsxs)("div",{className:n.root,children:[Object(se.jsx)("h1",{children:"Black"}),Object(se.jsx)("h1",{children:"Should be lime green"}),Object(se.jsx)("h1",{className:c(o({border:"1px solid black"}),t),children:"Black, should have border and shadow"}),Object(se.jsx)("h1",{className:"foo",children:"Should be cyan"}),Object(se.jsx)(ie,{children:"Should be yellow"}),Object(se.jsx)(ie,{className:n.ovStyled,children:"Should be dark red"}),Object(se.jsx)(ee.a,{variant:"contained",color:"primary",children:" Background should be lime green "}),Object(se.jsx)(ee.a,{variant:"contained",color:"primary",className:n.ovInternal,children:"Background should be dark blue"}),Object(se.jsx)("div",{className:n.parent,children:Object(se.jsx)("div",{className:n.child,children:"Background should turn red when mouse is hover the parent."})}),Object(se.jsxs)(te.a,{className:n.breadcrumbs_className,color:"primary",children:[Object(se.jsx)("span",{children:"background should be lightblue"}),Object(se.jsx)("span",{children:"and the separator (/) should be red except when hover, then it is blue"})]}),Object(se.jsx)("div",{style:{height:10}}),Object(se.jsxs)(te.a,{classes:{root:n.breadcrumbs2_root,separator:n.breadcrumbs2_separator},color:"primary",children:[Object(se.jsx)("span",{children:"background should be lightblue"}),Object(se.jsx)("span",{children:"and the separator (/) should be red except when hover, then it is blue"})]}),Object(se.jsxs)(fe,{children:[Object(se.jsx)("span",{children:"The separator"}),Object(se.jsx)("span",{children:"should be lightgreen"})]}),Object(se.jsx)(ee.a,{variant:"contained",color:"primary",className:n.button2_className,children:Object(se.jsx)("span",{children:"The background should be red"})}),Object(se.jsx)(ee.a,{variant:"contained",color:"primary",classes:{root:n.button2_root},children:Object(se.jsx)("span",{children:"The background should be red"})}),Object(se.jsx)("div",{className:c(n.testCx_bgYellow,n.testCx_bgCyan),children:"Background should be cyan"}),Object(se.jsx)("div",{className:c(n.testCx_bgCyan,n.testCx_bgYellow),children:"Background should be yellow"}),Object(se.jsxs)("div",{className:n.childRefTest_wrapper,children:[Object(se.jsx)("div",{className:c(n.childRefTest_textColorPink,n.childRefTest_wrapper1),children:"Background should turn cyan when mouse hover the parent. Also the text should NOT be pink"}),Object(se.jsx)("div",{className:c(n.childRefTest_wrapper2),children:"Background should NOT turn cyan when mouse hover the parent."})]}),Object(se.jsx)("div",{className:n.mq,children:"The background color should turn from lightgreen to cyan when the window inner with goes is below 960px"}),Object(se.jsx)(de,{className:o({color:"red"}),colorSmall:"cyan"}),Object(se.jsx)(be,{children:"The text should turn from red to blue when the window inner width goes below 960px And I should have a class like tss-xxxxxx-MyStyledButton-text"}),Object(se.jsx)("br",{}),Object(se.jsx)(he,{href:"http://exampe.com",children:"Background should be red"}),Object(se.jsx)(he,{href:"https://exampe.com",children:"Background should be limegreen"}),Object(se.jsx)("div",{className:c(o({"@media screen and (min-width: 1px)":{backgroundColor:"red"},height:50}),o({backgroundColor:"lightgreen"})),children:"background should be lightgreen"}),Object(se.jsx)(ve,{}),Object(se.jsx)(pe,{}),Object(se.jsx)(me,{}),Object(se.jsx)(je,{}),Object(se.jsx)(ge,{className:o({backgroundColor:"white"}),classes:{root:o({backgroundColor:"red",border:"1px solid black"})},lightBulbBorderColor:"black"}),Object(se.jsx)(Oe,{icon:Object(se.jsx)(ae.a,{}),label:"Background should be greenish"}),Object(se.jsx)(xe,{isBig:!0})]})]})}var ue=z({name:{App:le}})((function(e,t,r){var n={border:"1px solid black",margin:30,height:100,color:"black"};return{root:{"& > h1:nth-child(2)":{color:e.palette.primary.main}},ovStyled:{color:"darkred"},ovInternal:{backgroundColor:"darkblue"},parent:Object(N.a)({border:"1px solid black",padding:30},"&:hover .".concat(r.child),{background:"red"}),child:{background:"blue",border:"1px solid black"},breadcrumbs_className:{backgroundColor:"lightblue","& .MuiBreadcrumbs-separator":{color:"red"},"&:hover .MuiBreadcrumbs-separator":{color:"blue"}},breadcrumbs2_root:Object(N.a)({backgroundColor:"lightblue"},"&:hover .".concat(r.breadcrumbs2_separator),{color:"blue"}),breadcrumbs2_separator:{color:"red"},button2_className:{backgroundColor:"red"},button2_root:{backgroundColor:"red"},testCx_bgYellow:{backgroundColor:"yellow"},testCx_bgCyan:{backgroundColor:"cyan"},childRefTest_wrapper:Object(N.a)({border:"1px solid black"},"&:hover .".concat(r.childRefTest_wrapper1),{backgroundColor:"cyan"}),childRefTest_wrapper1:Object(V.a)({},n),childRefTest_wrapper2:n,childRefTest_textColorPink:{color:"pink"},mq:{height:100,backgroundColor:"lightgreen","@media (max-width: 960px)":{backgroundColor:"cyan"}}}}));var de=Z((function(e){var t=Z.getClasses(e);return Object(se.jsx)("div",{className:t.root,children:"The background color should turn from limegreen to cyan when the window inner with goes below 960px. Font should be red"})}),(function(e,t){return{root:{backgroundColor:e.palette.primary.main,height:100,marginTop:20},"@media (max-width: 960px)":{root:{backgroundColor:t.colorSmall}}}})),be=Z(ee.a,{text:{color:"red",textTransform:"unset"},"@media (max-width: 960px)":{text:{color:"blue"}}},{name:"MyStyledButton"}),he=Z("a",(function(e,t){var r=t.href;return{root:{border:"1px solid black",backgroundColor:null!==r&&void 0!==r&&r.startsWith("https")?e.palette.primary.main:"red"}}})),fe=Z(te.a,(function(e,t,r){return{ol:Object(N.a)({},"& .".concat(r.separator),{color:e.palette.primary.main})}})),ve=function(){var e=Object(n.memo)((function(){var e=t({color:"primary"}),r=e.classes,n=e.cx;return Object(se.jsxs)("div",{className:r.root,children:[Object(se.jsx)("div",{className:r.child,children:"The Background take the primary theme color when the mouse is hover the parent."}),Object(se.jsx)("div",{className:n(r.child,r.small),children:"The Background take the primary theme color when the mouse is hover the parent. I am smaller than the other child."})]})})),t=z({name:{SecondNestedSelectorExample:e}})((function(e,t,r){var n=t.color;return{root:Object(N.a)({padding:30},"&:hover .".concat(r.child),{backgroundColor:e.palette[n].main}),small:{},child:Object(N.a)({border:"1px solid black",height:50},"&.".concat(r.small),{height:30})}}));return{SecondNestedSelectorExample:e}}().SecondNestedSelectorExample,pe=function(){var e=z()({foo:{border:"3px dotted black",backgroundColor:"red"},bar:{color:"pink"}}),t=function(t){var r=e(void 0,{props:t}).classes;return Object(se.jsx)("div",{className:r.foo,children:Object(se.jsx)("span",{className:r.bar,children:"The background should be green, the box should have a dotted border and the text should be pink"})})};return{MyTestComponentForMergedClasses:function(){var r=e().css;return Object(se.jsx)(t,{classes:{foo:r({backgroundColor:"green"})}})}}}().MyTestComponentForMergedClasses,me=function(){var e=z()((function(e){return{root:Object(V.a)(Object(V.a)({},e.typography.subtitle2),{},{color:"red"})}}));return{TestCastingMuiTypographyStyleToCSSObject:function(){var t=e().classes;return Object(se.jsxs)(se.Fragment,{children:[Object(se.jsx)(re.a,{variant:"subtitle2",children:"This text should be italic"}),Object(se.jsx)("span",{className:t.root,children:"This text should be italic and red"})]})}}}().TestCastingMuiTypographyStyleToCSSObject,je=function(){var e=Z(ne.a,(function(e){return{input:{backgroundColor:e.palette.grey[50]}}}));return{TestPr54:Z(e,(function(){return{input:{backgroundColor:"red"}}}))}}().TestPr54,ge=function(){function e(e){var r=e.className,o=Object(n.useReducer)((function(e){return!e}),!1),a=Object(c.a)(o,2),s=a[0],i=a[1],l=t(void 0,{props:e,ownerState:{isOn:s}}),u=l.classes,d=l.cx;return Object(se.jsxs)("div",{className:d(u.root,r),children:[Object(se.jsx)("div",{className:u.lightBulb}),Object(se.jsx)("button",{onClick:i,children:"Turn ".concat(s?"off":"on")}),Object(se.jsx)("p",{children:"Div should have a border, background should be white"}),Object(se.jsx)("p",{children:"Light bulb should have black border, it should be yellow when turned on."})]})}var t=z({name:{TestingStyleOverrides:e}})((function(e){return{root:{border:"1px solid black",width:500,height:200,position:"relative",color:"black"},lightBulb:{position:"absolute",width:50,height:50,top:120,left:200,borderRadius:"50%"}}}));return{TestingStyleOverrides:e}}().TestingStyleOverrides,Oe=Z(oe.a,{root:{backgroundColor:"red"},labelIcon:{backgroundColor:"green"}}),xe=function(){var e=function(e){Object(K.a)(r,e);var t=Object(Q.a)(r);function r(){return Object($.a)(this,r),t.apply(this,arguments)}return Object(G.a)(r,[{key:"render",value:function(){var e=Z.getClasses(this.props);return Object(se.jsx)("div",{className:e.root,children:Object(se.jsx)("span",{className:e.span,children:"Background color should be green on big screen, red on small screen, there is a black border on the text"})})}}]),r}(o.a.Component);return Z(e,(function(e,t){return{root:{backgroundColor:e.palette.primary.main,height:t.isBig?200:void 0},span:{border:"1px solid black"},"@media (max-width: 960px)":{root:{backgroundColor:"red"}}}}))}(),ye=r(559),ke=r(276),we=r(552),Ce=r(275),Se=r(278),Ne=Object(Se.a)({key:"mui",prepend:!0}),Te=Object(ke.a)({palette:{primary:{main:"#32CD32"},info:{main:"#ffff00"}},typography:{subtitle2:{fontStyle:"italic"}},components:{TestingStyleOverrides:{styleOverrides:{lightBulb:function(e){var t=e.theme,r=e.ownerState.isOn,n=e.lightBulbBorderColor;return{border:"1px solid ".concat(n),backgroundColor:r?t.palette.info.main:"grey"}}}}}});function _e(){var e=H().css;return Object(se.jsx)(le,{className:e({boxShadow:"10px 5px 5px teal"})})}Object(Ce.createRoot)(document.getElementById("root")).render(Object(se.jsx)(n.StrictMode,{children:Object(se.jsx)(x.a,{value:Ne,children:Object(se.jsxs)(ye.a,{theme:Te,children:[Object(se.jsx)(we.a,{}),Object(se.jsx)(_e,{})]})})}))}},[[521,1,2]]]);
//# sourceMappingURL=main.8a553049.chunk.js.map