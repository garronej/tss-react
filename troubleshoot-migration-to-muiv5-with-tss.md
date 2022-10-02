# 🆘 Troubleshoot migration to MUIv5 with TSS

You upgraded to MUIv5 using tss-react but the somme styles doesn't apply the same way it uses to? &#x20;

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
        <TssCacheProvider />
    </CacheProvider>
);
```
{% endtab %}

{% tab title="Next.js" %}

{% endtab %}
{% endtabs %}

Explainations: tss-react ans MUI are supposed to be able to share the same emotion cache since tss-react v4. It's almost always the case but in [some edge cases](https://github.com/garronej/tss-react/issues/115) involeving MUI's internal styles media queries the styles dosen't apply in the same order than before. &#x20;

By explicitely telling MUI to use one cache and TSS to use another and by making sure the MUI styles comes before in the `<head />` (`prepend: true`) you ensure that TSS generated styles always overwrite the default styles. &#x20;
