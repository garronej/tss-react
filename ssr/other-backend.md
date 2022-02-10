---
description: Configure SSR in in frameworks other than Next.js like for example Express.js
---

# Other backend

```
yarn add @emotion/server
```

```tsx
import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import { getTssDefaultEmotionCache } from "tss-react";
import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

let muiCache: EmotionCache | undefined = undefined;

const createMuiCache = () =>
    muiCache = createCache({ 
        "key": "mui", 
        "prepend": true 
    });

function functionInChargeOfRenderingTheHtml(res) {

    const emotionServers = [
         // Every emotion cache used in the app should be provided.
         // Caches for MUI should use "prepend": true.
        getTssDefaultEmotionCache({ "doReset": true }),
        createMuiCache()
    ].map(createEmotionServer);

    const html = renderToString(
        <CacheProvider value={muiCache ?? createMuiCache()}>
            <App />
        </CacheProvider>
    );
    
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
