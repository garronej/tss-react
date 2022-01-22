---
description: How to configure Server Side Sendering
---

# SSR



There are some minimal configuration required to make `tss-react` work with SSR.

The following instructions are assuming you are using `tss-react` standalone or alongside `@material-ui` v5. You can find [here](https://github.com/garronej/tss-react/tree/main/src/test/apps/muiV4ssr) a Next.js setup with `@material-ui` v4.

### With [Next.js](https://nextjs.org)

```bash
```

### With any other framework

```bash
yarn add @emotion/server
```

```tsx
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import { getTssDefaultEmotionCache } from "tss-react";

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
    (muiCache = createCache({ "key": "mui", "prepend": true }));

function functionInChargeOfRenderingTheHtml(res) {
    const emotionServers = [
        /**
         * Every emotion cache used in the app should be provided.
         * Caches for MUI should use "prepend": true.
         * */
        getTssDefaultEmotionCache({ "doReset": true }),
        createMuiCache(),
    ].map(createEmotionServer);

    const html = renderToString(
        <CacheProvider value={muiCache ?? createMuiCache()}>
            <App />
        </CacheProvider>,
    );

    res.status(200).header("Content-Type", "text/html").send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My site</title>
        ${emotionServers
            .map(({ extractCriticalToChunks, constructStyleTagsFromChunks }) =>
                constructStyleTagsFromChunks(extractCriticalToChunks(html)),
            )
            .join("")}
    </head>
    <body>
        <div id="root">${html}</div>
        <script src="./bundle.js"></script>
    </body>
    </html>`);
}
```
