---
description: How to express you dependencies requirements
---

# 📦 Publish a module uses tss-react



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
