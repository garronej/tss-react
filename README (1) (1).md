---
description: How to integrate emotion cache with TSS
---

# 💽 Cache

By default, `tss-react` uses an emotion cache that you can access with&#x20;

```tsx
import { getTssDefaultEmotionCache } from "tss-react"
```

If you want `tss-react` to use a specific [emotion cache](https://emotion.sh/docs/@emotion/cache) you can provide it using

```typescript
import { TssCacheProvider } from "tss-react"
```

If you are using `tss-react` with mui, be aware that mui and TSS can't share the same cache.&#x20;

Also the caches used by mui should have be instantiated with `"prepend": true`.

```tsx
import createCache from "@emotion/cache";
import { TssCacheProvider } from "tss-react";
import { CacheProvider } from "@emotion/react";

const muiCache = createCache({
    "key": "my-custom-prefix-for-mui",
    "prepend": true
});

const tssCache = createCache({
    "key": "my-custom-prefix-for-tss"
});

<CacheProvider value={muiCache}>
    <TssCacheProvider value={tssCache}>
        {/* ... */}
    </TssCacheProvider>
</CacheProvider>;
```

{% hint style="info" %}
Using custom emotion caches impact how you [setup SSR](ssr/).
{% endhint %}
