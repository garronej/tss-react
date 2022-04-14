---
description: How to express you dependencies requirements
---

# 📦 Publish a module that uses TSS

{% hint style="success" %}
Soon, it won't be mandatory to explicitly provide an emotion cache for TSS to play well with MUI. &#x20;

Then, it wont be necessary to give specific SSR instructions. &#x20;

[Follow the advancement](https://github.com/mui/material-ui/issues/28045#issuecomment-1072978306).
{% endhint %}

{% tabs %}
{% tab title="Your module uses MUI" %}
`package.json`

```json
"name": "YOUR_MODULE",
"dependencies": {
    "tss-react": "^3.5.2"
},
"peerDependencies": {
    "react": "^16.8.0 || ^17.0.2",
    "@mui/material": "^5.0.1",
    "@emotion/react": "^11.4.1",
},
"devDependencies": {
    "@mui/material": "^5.0.1",
    "@emotion/react": "^11.4.1",
    "@emotion/styled": "^11.8.1"
}

```

Your users install your module like that:&#x20;

```bash
yarn add YOUR_MODULE @mui/material @emotion/react @emotion/styled
```

You also need to tell your user to explicitly provide an emotion cache to MUI: &#x20;

```typescript
import { render } from "react-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export const muiCache = createCache({
    "key": "mui",
    "prepend": true
});

//NOTE: Don't use <StyledEngineProvider injectFirst/>
render(
    <CacheProvider value={muiCache}>
        {/* ...your app...*/}
    </CacheProvider>,
    document.getElementById("root")
);
```

Your users also need to follow [TSS's instructions to enable SSR](ssr/) (at least for now...).
{% endtab %}

{% tab title="Your module don't use MUI" %}
`package.json`

```json
"name": "YOUR_MODULE",
"dependencies": {
    "tss-react": "^3.5.2"
},
"peerDependencies": {
    "react": "^16.8.0 || ^17.0.2",
    "@emotion/react": "^11.4.1",
},
"devDependencies": {
    "@emotion/react": "^11.4.1"
}

```

Your users install your module like that:&#x20;

```bash
yarn add YOUR_MODULE @emotion/react
```

Your users also need to follow [TSS's instructions to enable SSR](ssr/).
{% endtab %}
{% endtabs %}

