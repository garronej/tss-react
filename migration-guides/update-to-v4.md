# v3 -> v4

## Upgrade MUI

If you are using MUI you must upgrade `@mui/material` to `v5.10.7` or newer.&#x20;

## Breaking changes

### SSR setup

{% hint style="success" %}
MUI users can now setup SSR as per described in the [MUI documentation](https://mui.com/material-ui/guides/server-rendering/). Nothing specific to `tss-react` is required.
{% endhint %}

<pre class="language-diff" data-title="src/pages/_app.tsx"><code class="lang-diff">-import type { EmotionCache } from "@emotion/cache";
-import createCache from "@emotion/cache";
-import { CacheProvider } from '@emotion/react';
<strong>+import App from "next/app";
</strong>+import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";

-let muiCache: EmotionCache | undefined = undefined;
-export const createMuiCache = () => muiCache = createCache({ "key": "mui", "prepend": true });

+const {
+    augmentDocumentWithEmotionCache,
+    withAppEmotionCache
+} = createEmotionSsrAdvancedApproach({ key: "css" });

+export { augmentDocumentWithEmotionCache };

 function App({ Component, pageProps }: AppProps) {

   ...

-			&#x3C;CacheProvider value={muiCache ?? createMuiCache()}>
				&#x3C;MuiThemeProvider theme={theme}>
					&#x3C;CssBaseline />
					&#x3C;Component {...pageProps} />
				&#x3C;/MuiThemeProvider>
-			&#x3C;/CacheProvider>
 );
 
+export default withAppEmotionCache(App);

</code></pre>

<pre class="language-diff"><code class="lang-diff">// src/pages/_document.tsx

-import BaseDocument from "next/document";
-import { withEmotionCache } from "tss-react/nextJs";
-import { createMuiCache } from "./_app";

-export default withEmotionCache({
-    "Document": BaseDocument,
-    "getCaches": () => [createMuiCache()]
-});

<strong>+import DefaultDocument from "next/document";
</strong>+import { augmentDocumentWithEmotionCache } from "./_app";

+augmentDocumentWithEmotionCache({ 
+  DefaultDocument,
+//  Document: MyDocument // If you have a custom document, provide it here.
+});

+export default Document;

</code></pre>

### `useCssAndCx` removed

```diff
-import { useCssAndCx } from "tss-react";
+import { useStyles } from "tss-react/mui";

-const { css, cx }= useCssAndCx();
+const { css, cx } = useStyles();
```

### `useMergedClasses` removed

```diff
-import { useMergedClasses } from "tss-react";

-let { classes } = useStyles({ "color": "blue" });
-classes = useMergedClasses(classes, props.classes);
+const { classes } = usesStyles({ "color": "blue" }, { props });

-let { classes } = useStyles();
-classes = useMergedClasses(classes, props.classes);
+const { classes } = usesStyles(undefined, { props });
```

## Removing noise

Explicitly providing an emotion cache is still supported but no longer required.&#x20;

```diff
 import { createRoot } from "react-dom/client";
-import { CacheProvider } from "@emotion/react";
-import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";

-export const muiCache = createCache({
-    "key": "mui",
-    "prepend": true
-});

 const container = document.getElementById('app');
 const root = createRoot(container!); 
 root.render(
-    <CacheProvider value={muiCache}>
        <ThemeProvider theme={myTheme}>
            <App />
        </ThemeProvider>
-    </CacheProvider>
);
```

## Having issues? &#x20;

{% content-ref url="../troubleshoot-migration-to-muiv5-with-tss.md" %}
[troubleshoot-migration-to-muiv5-with-tss.md](../troubleshoot-migration-to-muiv5-with-tss.md)
{% endcontent-ref %}
