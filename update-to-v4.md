# ⬆ Migration v3 -> v4

## Upgrade MUI

If you are using MUI you must upgrade `@mui/material` to `v5.10.7` or newer.&#x20;

## Breaking changes

### SSR setup

{% hint style="success" %}
MUI users can now setup SSR as per described in the [MUI documentation](https://mui.com/material-ui/guides/server-rendering/). Nothing specific to `tss-react` is required.
{% endhint %}

```diff
// src/pages/_app.tsx

-import type { EmotionCache } from "@emotion/cache";
-import createCache from "@emotion/cache";
-import { CacheProvider } from '@emotion/react';
+import { createEmotionSsrAdvancedApproach } from "tss-react/nextJs";

-let muiCache: EmotionCache | undefined = undefined;
-export const createMuiCache = () => muiCache = createCache({ "key": "mui", "prepend": true });

+const { EmotionCacheProvider, withEmotionCache } = createEmotionSsrAdvancedApproach({ "key": "css" });
+export { withEmotionCache };

 function App({ Component, pageProps }: AppProps) {

   ...

-			<CacheProvider value={muiCache ?? createMuiCache()}>
+			<EmotionCacheProvider>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</MuiThemeProvider>
-			</CacheProvider>
+			</EmotionCacheProvider>

 );

```

```diff
// src/pages/_document.tsx

import BaseDocument from "next/document";
-import { withEmotionCache } from "tss-react/nextJs";
-import { createMuiCache } from "./_app";
+import { withEmotionCache } from "./_app";

-export default withEmotionCache({
-    "Document": BaseDocument,
-    "getCaches": () => [createMuiCache()]
-});
+export default withEmotionCache(BaseDocument);
```

### `<TssCacheProvider />` removed

```diff
 import createCache from "@emotion/cache";
 import { CacheProvider } from "@emotion/react";
-import { TssCacheProvider } from "tss-react";
+import { createMakeAndWithStyles } from "tss-react";
+import { useTheme } from "@mui/material/styles";

 const muiCache = createCache({
     "key": "my-custom-prefix-for-mui",
     "prepend": true
 });

 const tssCache = createCache({
     "key": "my-custom-prefix-for-tss"
 });

+export const { makeStyles, withStyles } = createMakeAndWithStyles({
+    useTheme,
+    "cache": tssCache
+});

 <CacheProvider value={muiCache}>
-   <TssCacheProvider value={tssCache}>
        {/* ... */}
-   </TssCacheProvider>
 </CacheProvider>;
```

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
