---
description: Configure SSR in in frameworks other than Next.js like for example Express.js
---

# Other backends

{% hint style="success" %}
**MUI**: Theses instructions are for the peoples using `tss-react` as a standalone solution. &#x20;

MUI users can refer to [the MUI documentation relative to SSR](https://mui.com/material-ui/guides/server-rendering/) and ignore this.&#x20;
{% endhint %}

{% hint style="warning" %}
If you are using nested selectors, you may need to provide [uniq identifiers to the styleshees that uses nested selectors](../nested-selectors.md#ssr).
{% endhint %}

```
yarn add @emotion/server
```

### Single emotion cache

This is the recommended approach.&#x20;

```tsx
import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import type { EmotionCache } from "@emotion/cache";
import { App, createAppCache } from "<see_below>/App";

function functionInChargeOfRenderingTheHtml(res) {

    const { 
        constructStyleTagsFromChunks, 
        extractCriticalToChunks 
    } = createEmotionServer(createAppCache());

    const html = renderToString(<App />);
    
    const styleTagsAsStr = constructStyleTagsFromChunks(extractCriticalToChunks(html));
    
    //Some framworks, like Gatsby or Next.js, only enables you to
    //provide your <style> tags as React.ReactNode[].
    //const styleTagsAsReactNode = [
    //    ...emotionServers
    //        .map(({ extractCriticalToChunks }) =>
    //            extractCriticalToChunks(html)
    //            .styles.filter(({ css }) => css !== "")
    //            .map(style => (
    //    	        <style
    //    	            data-emotion={`${style.key} ${style.ids.join(" ")}`}
    //    		    key={style.key}
    //    		    dangerouslySetInnerHTML={{ "__html": style.css }}
    //    	        />
    //    	    ))
    //    ).reduce((prev, curr) => [...prev, ...curr], [])
    //];

    res.status(200).header("Content-Type", "text/html").send([
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '    <meta charset="UTF-8">'
        '    <title>My site</title>',
        styleTagsAsStr,
        '</head>',
        '<body>',
            <div id="root">${html}</div>,
        '    <script src="./bundle.js"></script>',
        '</body>',
        '</html>'
    ].join("\n"));
    
}
```

`App.tsx`

```tsx
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

let appCache: EmotionCache | undefined = undefined;

export const createAppCache = () =>
    appCache = createCache({ 
        "key": "css"
    });
    

export function App(){
    return (
        <CacheProvider value={appCache ?? createAppCache()}>
            {/* ... */}
        </CacheProvider>
    );
}
```

### MUI and TSS use different caches

Alternatively, if you want TSS and MUI to use different caches you can implement this approach: &#x20;

```tsx
import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import type { EmotionCache } from "@emotion/cache";
import { App, createMuiCache, createTssCache } from "<see_below>/App";

function functionInChargeOfRenderingTheHtml(res) {

    const emotionServers = [
         createMuiCache(),
         createTssCache()
    ].map(createEmotionServer);

    const html = renderToString(<App />);
    
    const styleTagsAsStr = emotionServers
        .map(({ extractCriticalToChunks, constructStyleTagsFromChunks }) =>
            constructStyleTagsFromChunks(extractCriticalToChunks(html)),
        )
        .join("");
    
    //Some framworks, like Gatsby or Next.js, only enables you to
    //provide your <style> tags as React.ReactNode[].
    //const styleTagsAsReactNode = [
    //    ...emotionServers
    //        .map(({ extractCriticalToChunks }) =>
    //            extractCriticalToChunks(html)
    //            .styles.filter(({ css }) => css !== "")
    //            .map(style => (
    //    	        <style
    //    	            data-emotion={`${style.key} ${style.ids.join(" ")}`}
    //    		    key={style.key}
    //    		    dangerouslySetInnerHTML={{ "__html": style.css }}
    //    	        />
    //    	    ))
    //    ).reduce((prev, curr) => [...prev, ...curr], [])
    //];

    res.status(200).header("Content-Type", "text/html").send([
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '    <meta charset="UTF-8">'
        '    <title>My site</title>',
        styleTagsAsStr,
        '</head>',
        '<body>',
            <div id="root">${html}</div>,
        '    <script src="./bundle.js"></script>',
        '</body>',
        '</html>'
    ].join("\n"));
    
}
```

`App.tsx`

```tsx
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { TssCacheProvider } from "tss-react";

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
    muiCache = createCache({ 
        "key": "mui", 
        "prepend": true 
    });
    
let tssCache: EmotionCache | undefined = undefined;

export const createTssCache = () =>
    muiCache = createCache({ 
        "key": "tss"
    });

export function App(){
    return (
        <CacheProvider value={muiCache ?? createMuiCache()}>
            <TssCacheProvider value={tssCache ?? createTssCache()}>
                {/* ... */}
            </TssCacheProvider>
        </CacheProvider>
    );
}
```
