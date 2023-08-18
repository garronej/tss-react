---
description: How to integrate emotion cache with TSS
---

# 💽 Emotion Cache

There is three ways to make tss-react use a specific emotion cache instead of the default one. &#x20;

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

### Use a specific provider

If you want to provide a contextuel cache only to `tss-react` you can use the `<TssCacheProvider />`. &#x20;

{% hint style="success" %}
This is usefull if you want to [enforce that TSS and MUI uses different caches](troubleshoot-migration-to-muiv5-with-tss.md).
{% endhint %}

<pre class="language-tsx"><code class="lang-tsx"><strong>import { TssCacheProvider } from "tss-react";
</strong>import createCache from "@emotion/cache";

const cache = createCache({
  "key": "tss"
});

render(
    &#x3C;TssCacheProvider value={cache}>
        {/* ... */}
    &#x3C;/TssCacheProvider>
);
</code></pre>

&#x20;To be clear, the difference between `import { CacheProvider } from "@emotion/react";` and `import { TssCacheProvider } from "tss-react";` is that the cahe provided by `<TssCacheProvider />` will only be picked up by `tss-react` when the cache provided by `<CacheProvider />` will be picked up by TSS, MUI and any direct usage of `@emotion/react`. &#x20;

{% hint style="warning" %}
If you are [a library author that publish a module that uses `tss-react` internally](publish-a-module-that-uses-tss.md). You should avoid using `<TssCacheProvider />` if you want to avoid having `tss-react` as peerDependency of your module.&#x20;
{% endhint %}

### Specify the cache at inception

{% tabs %}
{% tab title="Modern API" %}
```typescript
import createCache from "@emotion/cache";
import { createTss } from "tss-react";

const cache = createCache({
  "key": "tss"
});

export const { tss } = createTss({
    useTheme,
    cache
});
```
{% endtab %}

{% tab title="makeStyles" %}
```typescript
import createCache from "@emotion/cache";
// This is assuming you are using MUI, the useTheme function can be any hook that returns an object.
import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "tss-react";

const cache = createCache({
  "key": "tss"
});

export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme,
    cache
});
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
This approach isn't the best option for SSR.
{% endhint %}
