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

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
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

    res.status(200).header("Content-Type", "text/html").send([
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '    <meta charset="UTF-8">'
        '    <title>My site</title>',
        emotionServers
            .map(({ extractCriticalToChunks, constructStyleTagsFromChunks }) =>
                constructStyleTagsFromChunks(extractCriticalToChunks(html)),
            )
            .join(""),
        '</head>',
        '<body>',
        '    <div id="root">${html}</div>',
        '    <script src="./bundle.js"></script>',
        '</body>',
        '</html>'
    ].join("\n"));
    
}
```
