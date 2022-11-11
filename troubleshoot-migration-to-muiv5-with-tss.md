# 🆘 Fix broken styles after upgrading to MUI v5 with TSS

You upgraded to MUIv5 using tss-react but the somme styles doesn't apply the same way they uses to? &#x20;

Setting up emotion like that will probably fix your issues: &#x20;

{% tabs %}
{% tab title="Create React App, Vite, and other SPA frameworks" %}
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createCache from "@emotion/cache";
import App from "./App";

const muiCache = createCache({
    "key": "mui",
    "prepend": true
});

const tssCache = createCache({
    "key": "tss"
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    //NOTE: Don't use <StyledEngineProvider injectFirst/>
    <CacheProvider value={muiCache}>
        <TssCacheProvider value={tssCache}> 
            <App />
        </TssCacheProvider>
    </CacheProvider>
);
```
{% endtab %}

{% tab title="Next.js" %}
#### pages/\_app.tsx

```tsx
import Head from "next/head";
import App from "next/app";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import { TssCacheProvider } from "tss-react";

const {
    augmentDocumentWithEmotionCache: augmentDocumentWithEmotionCache_mui,
    withAppEmotionCache: withAppEmotionCache_mui
} = createEmotionSsrAdvancedApproach({ "key": "mui", "prepend": true });

export { augmentDocumentWithEmotionCache_mui };

const {
    augmentDocumentWithEmotionCache: augmentDocumentWithEmotionCache_tss,
    withAppEmotionCache: withAppEmotionCache_tss
} = createEmotionSsrAdvancedApproach({ "key": "tss" }, TssCacheProvider);

export { augmentDocumentWithEmotionCache_tss };

export default withAppEmotionCache_mui(withAppEmotionCache_tss(App));
```

#### pages/\_document.tsx

```tsx
//pages/_document.tsx

import Document from "next/document";
import { 
   augmentDocumentWithEmotionCache_mui,  
   augmentDocumentWithEmotionCache_tss
} from "./_app";

augmentDocumentWithEmotionCache_mui(Document);
augmentDocumentWithEmotionCache_tss(Document);

export default Document;
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If your issues are fixed by doing this, please [open an issue about it](https://github.com/garronej/tss-react/issues/new) so I can address the root cause of the problem by issuing a PR on the MUI repo. &#x20;
{% endhint %}

### Why and how does it work?

In theory, when TSS and MUI uses the same emotion cache, the styles that you provide via className or classes should always take priority over MUI's default styles.

It's almost always the case but in [some edge cases](https://github.com/garronej/tss-react/issues/115) involving media queries on the MUI side, it isn't.

You always have the option to artificially increase the specificity with [&&](https://user-images.githubusercontent.com/6702424/196739133-838beb4f-7365-446a-8dc6-d3b5b686df31.png) or using `!important` but if you are just upgrading to MUI v5 you probably don't want to spend hours troubleshooting issues one by one.

By explicitly telling MUI to use one cache and TSS to use another and by making sure the MUI styles are injected before in the `<head />` (`prepend: true`) you ensure that TSS-generated styles always overwrite MUI's default styles.
