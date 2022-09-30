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
// This is assuming you are using MUI, the useTheme function can be any hook that returns an object.
import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "tss-react";

const cache = createCache({
  "key": "custom"
});

export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme,
    cache
});
```

### &#x20;
