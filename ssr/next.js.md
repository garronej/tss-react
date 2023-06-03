# Next.js

{% hint style="warning" %}
If you are using nested selectors, you may need to provide [uniq identifiers to the styleshees that uses nested selectors](../nested-selectors.md#ssr).
{% endhint %}

{% hint style="info" %}
Require Next.js 12.1.7 or newer.
{% endhint %}

{% hint style="success" %}
MUI users: If you use this tooling you won't have to worry about setting up SSR for MUI. If SSR works for TSS, it works for MUI as well. If you prefer you can setup SSR by following [the MUI documentation,](https://mui.com/material-ui/guides/server-rendering/) it works but I advise against it though as the TSS tooling abstract away a lot of complex logic you don't need to worry about.
{% endhint %}

```
yarn add @emotion/server
```

### Single emotion cache (recommended approach)

This is the recommended approach.

{% tabs %}
{% tab title="App Router" %}
{% hint style="info" %}
This documentation is for [Next projects using the App router](https://nextjs.org/docs/app/building-your-application/routing).&#x20;

You are in this case if you have a `app/` directory at the root of your project.
{% endhint %}

{% code title="app/layout.tsx" %}
```tsx
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
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
{% endtab %}

{% tab title="Pages Router" %}
{% hint style="info" %}
This documentation is for [Next projects using the Page Router](https://nextjs.org/docs/pages/building-your-application/routing) (aka the legacy next setup). &#x20;

You are in this case if you have a `pages/` directory at the root of your project.
{% endhint %}

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

export default function RootLayout({ children }: { children: JSX.Element }) {
    return (
        <html>
            <head></head>
	    <body>
                <NextAppDirEmotionCacheProvider 
                    options={{ "key": "mui" }}
                >
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
