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
    "tss-react": "^4.0.0"
},
"peerDependencies": {
    "react": "^16.8.0 || ^17.0.2 || 18.0.0" ,
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

{% hint style="info" %}
The version of `@mui/material` must be newer or equal to `5.9.3`
{% endhint %}

Regarding SSR setup you can forward your user to the dedicated [MUI documentation](https://mui.com/material-ui/guides/server-rendering/).
{% endtab %}

{% tab title="Your module don't use MUI" %}
`package.json`

```json
"name": "YOUR_MODULE",
"dependencies": {
    "tss-react": "^4.0.0"
},
"peerDependencies": {
    "react": "^16.8.0 || ^17.0.2 || ^18.0.0",
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

Regarding SSR setup you can forward your user to [the dedicated documentation](ssr/).
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Wherever you make use of [nested selectors](nested-selectors.md) you must [provide a `uniqId`](nested-selectors.md#ssr) to make sure your components will works in every SSR setup.
{% endhint %}

{% hint style="warning" %}
You should avoid using `<TssCacheProvider />` or you should make `tss-react` as peerDependency of your module which you probably want to avoid. &#x20;
{% endhint %}
