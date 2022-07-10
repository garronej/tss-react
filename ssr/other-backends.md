---
description: Configure SSR in in frameworks other than Next.js like for example Express.js
---

# Other backends

```
yarn add @emotion/server
```

```tsx
import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import { getTssDefaultEmotionCache } from "tss-react";
import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";
import { App, createMuiCache } from "<see_below>/App";

function functionInChargeOfRenderingTheHtml(res) {

    const emotionServers = [
         // Every emotion cache used in the app should be provided.
         // Caches for MUI should use "prepend": true.
         // MUI cache should come first.
         createMuiCache(),
         getTssDefaultEmotionCache({ "doReset": true })
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

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
    muiCache = createCache({ 
        "key": "mui", 
        "prepend": true 
    });

export function App(){
    return (
        <CacheProvider value={muiCache ?? createMuiCache()}>
            {/* ... */}
        </CacheProvider>
    );
}
```

{% hint style="warning" %}
If you are using nested selectors, you may need to provide [uniq identifiers to your stylesheet](../nested-selectors.md#ssr).
{% endhint %}
