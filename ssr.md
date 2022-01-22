---
description: How to configure Server Side Sendering
---

# SSR



There are some minimal configuration required to make `tss-react` work with SSR.

The following instructions are assuming you are using `tss-react` standalone or alongside `@material-ui` v5. You can find [here](https://github.com/garronej/tss-react/tree/main/src/test/apps/muiV4ssr) a Next.js setup with `@material-ui` v4.

### With [Next.js](https://nextjs.org)

```bash
yarn add @emotion/server
```

`pages/_document.tsx`

```tsx
import BaseDocument from "next/document";
import { withEmotionCache } from "tss-react/nextJs";
import { createMuiCache } from "./index";

export default withEmotionCache({
    /** If you have a custom document pass it instead */,
    "Document": BaseDocument,
    /**
     * Every emotion cache used in the app should be provided.
     * Caches for MUI should use "prepend": true.
     * */
    "getCaches": ()=> [ createMuiCache() ]
});
```

`page/index.tsx`

```tsx
import type { EmotionCache } from "@emotion/cache";
import createCache from "@emotion/cache";

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
    (muiCache = createCache({
        "key": "mui",
        "prepend": true,
    }));

export default function Index() {
    return (
        <CacheProvider value={muiCache ?? createMuiCache()}>
            {/* Your app  */}
        </CacheProvider>
    );
}
```

You can find a working example [here](https://github.com/garronej/tss-react/tree/main/src/test/apps/ssr).

NOTE: This setup is merely a suggestion. Feel free, for example, to move the `<CacheProvider />` into `pages/_app.tsx`. What's important to remember however is that new instances of the caches should be created for each render.

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
