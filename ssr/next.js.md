# Next.js

{% hint style="success" %}
Users of MUI: The MUI team now provides [a dedicated package for easing up the integration with Next: @mui/material-nextjs](https://mui.com/material-ui/integrations/nextjs/). You can use it instead of the TSS tooling documented below.  \
In any case you should use one (@mui/material-nextjs)  or the other (tss-react/next) but not both! &#x20;
{% endhint %}

### Single emotion cache (recommended approach)

This is the recommended approach.

{% tabs %}
{% tab title="App Router" %}
{% code title="app/layout.tsx" %}
```tsx
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <html>
            {/* It's important to keep a head tag, even if it's empty */}
	    <head></head> 
	    <body>
	        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
		    {children}
		</NextAppDirEmotionCacheProvider>
	    </body>
	</html>
    );
}
```
{% endcode %}

{% embed url="https://github.com/garronej/mui-next-appdir-demo" %}
Demo setup
{% endembed %}

As it stands, Emotion is currently not compatible with ServerComponents, which, as a result, also makes MUI incompatible. Consequently, any component where you use TSS must be labelled with [`the "use client" directive`](https://nextjs.org/docs/getting-started/react-essentials#the-use-client-directive).&#x20;

It's important to note, however, that server-side rendering is indeed functional. The difference lies in the fact that the components will be rendered on both the backend and frontend, as opposed to being rendered solely on the backend.

You can keep track of Emotion's developing support for ServerComponents at [this link](https://github.com/emotion-js/emotion/issues/2928). In the interim, if you wish to utilize ServerComponents at present, [you can implement the following approach](https://github.com/mui/material-ui/issues/34905#issuecomment-1330939826).
{% endtab %}

{% tab title="Pages Router" %}
> Require Next.js 12.1.7 or newer.

```bash
yarn add @emotion/server
```

{% code title="pages/_app.tsx" %}
```tsx
import App from "next/app";
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ key: "css" });

export { augmentDocumentWithEmotionCache };

//You can also pass your custom App if you have one. 
export default withAppEmotionCache(App);
```
{% endcode %}

{% code title="pages/_document.tsx" %}
```typescript
import Document from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

//You can also pass your custom document if you have one. 
augmentDocumentWithEmotionCache(Document);

export default Document;
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Make MUI and TSS use different caches

If you want TSS and MUI to use different caches you can implement this approach. This is mainly usefull if you are migrating from MUI v4 using TSS and [some styles don't display like they used to](../troubleshoot-migration-to-muiv5-with-tss.md).

{% tabs %}
{% tab title="App Router" %}
{% code title="app/layout.tsx" %}
```tsx
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { TssCacheProvider } from "tss-react";

export default function RootLayout({ children }: { children: JSX.Element }) {
    return (
        <html>
            <head></head>
	    <body>
                <NextAppDirEmotionCacheProvider options={{ "key": "mui" }}>
	            <NextAppDirEmotionCacheProvider 
	                options={{ "key": "tss" }} 
	                CacheProvider={TssCacheProvider}
	            >
			<AppMuiThemeProvider>
			    {children}
			</AppMuiThemeProvider>
		    </NextAppDirEmotionCacheProvider>
		</NextAppDirEmotionCacheProvider>
	    </body>
	</html>
    );
}
```
{% endcode %}
{% endtab %}

{% tab title="Page Router" %}
```bash
yarn add @emotion/server
```

{% code title="pages/_app.tsx" %}
```tsx
import Head from "next/head";
import App from "next/app";
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";
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
{% endcode %}

{% code title="pages/_document.tsx" %}
```tsx
import Document from "next/document";
import { 
   augmentDocumentWithEmotionCache_mui,  
   augmentDocumentWithEmotionCache_tss
} from "./_app";

augmentDocumentWithEmotionCache_mui(Document);
augmentDocumentWithEmotionCache_tss(Document);

export default Document;
```
{% endcode %}
{% endtab %}
{% endtabs %}
