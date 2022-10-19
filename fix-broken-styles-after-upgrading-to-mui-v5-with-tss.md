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
import type { AppProps } from 'next/app'
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

Explainations: tss-react ans MUI are supposed to be able to share the same emotion cache since tss-react v4. It's almost always the case but in [some edge cases](https://github.com/garronej/tss-react/issues/115) involeving MUI's internal styles media queries the styles dosen't apply in the same order than before. &#x20;

By explicitely telling MUI to use one cache and TSS to use another and by making sure the MUI styles comes before in the `<head />` (`prepend: true`) you ensure that TSS generated styles always overwrite the default styles. &#x20;
