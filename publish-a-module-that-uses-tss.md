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

You do not need to provide special instructions related to SSR&#x20;

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

