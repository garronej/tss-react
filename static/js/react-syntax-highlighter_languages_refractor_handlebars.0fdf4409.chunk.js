(this["webpackJsonptss-react_landingpage"]=this["webpackJsonptss-react_landingpage"]||[]).push([[51,81],{658:function(e,n,a){"use strict";function t(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,t,s,r){if(a.language===t){var i=a.tokenStack=[];a.code=a.code.replace(s,(function(e){if("function"===typeof r&&!r(e))return e;for(var s,o=i.length;-1!==a.code.indexOf(s=n(t,o));)++o;return i[o]=e,s})),a.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(a,t){if(a.language===t&&a.tokenStack){a.grammar=e.languages[t];var s=0,r=Object.keys(a.tokenStack);!function i(o){for(var l=0;l<o.length&&!(s>=r.length);l++){var u=o[l];if("string"===typeof u||u.content&&"string"===typeof u.content){var c=r[s],p=a.tokenStack[c],g="string"===typeof u?u:u.content,d=n(t,c),f=g.indexOf(d);if(f>-1){++s;var k=g.substring(0,f),b=new e.Token(t,e.tokenize(p,a.grammar),"language-"+t,p),h=g.substring(f+d.length),m=[];k&&m.push.apply(m,i([k])),m.push(b),h&&m.push.apply(m,i([h])),"string"===typeof u?o.splice.apply(o,[l,1].concat(m)):u.content=m}}else u.content&&i(u.content)}return o}(a.tokens)}}}})}(e)}e.exports=t,t.displayName="markupTemplating",t.aliases=[]},749:function(e,n,a){"use strict";var t=a(658);function s(e){e.register(t),function(e){e.languages.handlebars={comment:/\{\{![\s\S]*?\}\}/,delimiter:{pattern:/^\{\{\{?|\}\}\}?$/i,alias:"punctuation"},string:/(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,boolean:/\b(?:true|false)\b/,block:{pattern:/^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,lookbehind:!0,alias:"keyword"},brackets:{pattern:/\[[^\]]+\]/,inside:{punctuation:/\[|\]/,variable:/[\s\S]+/}},punctuation:/[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,variable:/[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/},e.hooks.add("before-tokenize",(function(n){e.languages["markup-templating"].buildPlaceholders(n,"handlebars",/\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"handlebars")}))}(e)}e.exports=s,s.displayName="handlebars",s.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_handlebars.0fdf4409.chunk.js.map