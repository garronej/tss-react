---
description: How to integrate emotion cache with TSS
---

# Cache

By default, `tss-react` uses an emotion cache that you can access with `import { getTssDefaultEmotionCache } from "tss-react"`.\
If you want `tss-react` to use a specific emotion cache you can provide it using `import { TssCacheProvider } from "tss-react"`.

If you are using `tss-react` with mui v5, be aware that mui and tss can't share the same cache. The caches used by mui should have be instancies with `"prepend": true`.

```tsx
import createCache from "@emotion/cache";
import { TssCacheProvider } from "tss-react";
import { CacheProvider } from "@emotion/react";

const muiCache = createMuiCache({
    "key": "my-custom-prefix-for-mui",
    "prepend": true,
});

const tssCache = createMuiCache({
    "key": "my-custom-prefix-for-tss",
});

<CacheProvider value={muiCache}>
    <TssCacheProvider value={tssCache}>{/* ... */}</TssCacheProvider>
</CacheProvider>;
```
