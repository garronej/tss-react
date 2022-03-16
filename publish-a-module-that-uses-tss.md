---
description: How to express you dependencies requirements
---

# 📦 Publish a module that uses TSS



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
    "key": "Mui",
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

{% hint style="info" %}
I am trying to move things forward with MUI so that it is no longer required to explicitly provide an emotion cache. See [this issue](https://github.com/mui/material-ui/issues/28045).
{% endhint %}
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
{% endtab %}
{% endtabs %}

