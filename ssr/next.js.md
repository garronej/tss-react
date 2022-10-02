# Next.js

{% hint style="danger" %}
If you are using nested selectors, you may need to provide [uniq identifiers to your stylesheet](../nested-selectors.md#ssr).
{% endhint %}

{% hint style="success" %}
**MUI**: The following instructions are for the peoples using `tss-react` as a standalone solution. &#x20;

MUI users can refer to [the MUI documentation relative to SSR](https://mui.com/material-ui/guides/server-rendering/) and ignore this.&#x20;
{% endhint %}

{% hint style="info" %}
Next.js + React 18 -> SSR will only work with Next.js 12.1.7-canary.4 or newer.
{% endhint %}

Setup to make SSR work with [Next.js](https://nextjs.org).

```
yarn add @emotion/server
```

### Single emotion cache

This is the recommended approach.&#x20;

```tsx
//pages/_app.tsx

import Head from "next/head";
import App from "next/app";
import type { AppProps } from 'next/app'
import { createEmotionSsrAdvancedApproach } from "tss-react/next";

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ 
    "key": "css"
});

export { withEmotionCache };

export default withAppEmotionCache(App);
```

```tsx
//pages/_document.tsx

import Document from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

augmentDocumentWithEmotionCache(Document);

export default Document;
```

### MUI and TSS use different caches

If you want TSS and MUI to use different caches you can implement this approach: &#x20;

```tsx
//pages/_app.tsx

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

export { withEmotionCache };

export default withAppEmotionCache_mui(withAppEmotionCache_tss(App));
```

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
