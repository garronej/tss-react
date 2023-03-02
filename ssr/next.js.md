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

This is the recommended approach.&#x20;

{% tabs %}
{% tab title="pages dir" %}
{% hint style="info" %}
These are the instruction for [Next.js current stable mode](https://nextjs.org/docs). This is the mode you get when you [`yarn create next-app`](https://nextjs.org/docs/api-reference/create-next-app#interactive).&#x20;

Now, if you are feeling adventurous and want to experiment with Next 13 beta features such as server components head over to [the next tab](next.js.md#app-dir).
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

### Case 1: You have no custom `Document`

{% code title="pages/_document.tsx" %}
```typescript
import DefaultDocument from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

augmentDocumentWithEmotionCache({ DefaultDocument });

export default Document;
```
{% endcode %}

### Case 2: You have a custom `Document`

{% code title="pages/_document.tsx" %}
```tsx
import DefaultDocument from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

augmentDocumentWithEmotionCache({ DefaultDocument, Document });
```
{% endcode %}
{% endtab %}

{% tab title="app dir" %}
{% hint style="info" %}
This is the documentation for [Next 13 app directory mode (beta)](https://beta.nextjs.org/docs). If you're looking for the path of least resistance follow the [instructions of the previous tab instead](next.js.md#pages-dir).
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
{% endtabs %}

### Make MUI and TSS use different caches

If you want TSS and MUI to use different caches you can implement this approach. This is mainly usefull if you are migrating from MUI v4 using TSS and [some styles dosen't display like they used to](../troubleshoot-migration-to-muiv5-with-tss.md).&#x20;

{% tabs %}
{% tab title="pages dir" %}
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

{% tab title="app dir" %}
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
{% endtabs %}
