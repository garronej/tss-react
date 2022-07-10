---
description: How to integrate emotion cache with TSS
---

# 💽 Cache

There is two ways to make tss-react use a specific emotion cache instead of the default one. &#x20;

### Using the provider

tss-react pickups the contextual cache.  &#x20;

```tsx
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  "key": "custom"
});

render(
    <CacheProvider value={cache}>
        {/* ... */}
    </CacheProvider>
);
```

### Specify the cache at inception

```typescript
import createCache from "@emotion/cache";
```

### &#x20;
