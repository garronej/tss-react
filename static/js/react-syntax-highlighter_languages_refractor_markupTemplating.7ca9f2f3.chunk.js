"use strict";(self.webpackChunktss_react_landingpage=self.webpackChunktss_react_landingpage||[]).push([[3047],{40595:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,o){if(t.language===a){var c=t.tokenStack=[];t.code=t.code.replace(r,(function(e){if("function"===typeof o&&!o(e))return e;for(var r,i=c.length;-1!==t.code.indexOf(r=n(a,i));)++i;return c[i]=e,r})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,o=Object.keys(t.tokenStack);!function c(i){for(var s=0;s<i.length&&!(r>=o.length);s++){var u=i[s];if("string"===typeof u||u.content&&"string"===typeof u.content){var g=o[r],l=t.tokenStack[g],p="string"===typeof u?u:u.content,f=n(a,g),k=p.indexOf(f);if(k>-1){++r;var d=p.substring(0,k),h=new e.Token(a,e.tokenize(l,t.grammar),"language-"+a,l),m=p.substring(k+f.length),y=[];d&&y.push.apply(y,c([d])),y.push(h),m&&y.push.apply(y,c([m])),"string"===typeof u?i.splice.apply(i,[s,1].concat(y)):u.content=y}}else u.content&&c(u.content)}return i}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.7ca9f2f3.chunk.js.map