---
description: Start using TSS, with or without MUI
---

# 🔧 Setup

{% hint style="info" %}
`tss-react` has over 170 000 monthly NPM download and fewer than 220 ⭐️ on GitHub.

If you use TSS in production, please consider [giving the project a star](https://github.com/garronej/tss-react).
{% endhint %}

{% tabs %}
{% tab title="With MUI" %}
```bash
yarn add tss-react @emotion/react @mui/material @emotion/styled
```

{% hint style="info" %}
If you are migrating from `@material-ui/core` (v4) to `@mui/material` (v5) checkout the migration guide from MUI's documentation website [here](https://mui.com/guides/migration-v4/#2-use-tss-react).
{% endhint %}

```tsx
import { render } from "react-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";

export const muiCache = createCache({
    "key": "mui",
    "prepend": true
});

//NOTE: Don't use <StyledEngineProvider injectFirst/>
render(
    <CacheProvider value={muiCache}>
        <ThemeProvider theme={myTheme}>
            <Root />
        </ThemeProvider>
    </CacheProvider>,
    document.getElementById("root")
);
```

As a MUI user (if you are using TypeScript >= v4.4), you can simply:

```typescript
import { makeStyles, withStyles } from "tss-react/mui";
```

The theme object that will be passed to your callbacks functions will be the one you get with `import { useTheme } from "@mui/material/styles"`.

If you want to take controls over what the `theme` object should be, you can re-export `makeStyles` and `withStyles` from a file called, for example, `makesStyles.ts`:

```typescript
import { useTheme } from "@mui/material/styles";
//WARNING: tss-react require TypeScript v4.4 or newer. If you can't update use:
//import { createMakeAndWithStyles } from "tss-react/compat";
import { createMakeAndWithStyles } from "tss-react";

export const { makeStyles, withStyles } = createMakeAndWithStyles({
    useTheme
    // OR, if you have extended the default mui theme adding your own custom properties: 
    // Let's assume the myTheme object that you provide to the <ThemeProvider /> is of 
    // type MyTheme then you'll write:
    //"useTheme": useTheme as (()=> MyTheme)
});
```

`./MyComponent.tsx`

```tsx
import { makeStyles } from "tss-react/mui";
//OR:
//import { makeStyles } from "./makeStyles";

export function MyComponent(props: Props) {
    const { className } = props;

    const [color, setColor] = useState<"red" | "blue">("red");

    const { classes, cx } = useStyles({ color });

    //Thanks to cx, className will take priority over classes.root 🤩
    //With TSS you must stop using clsx and use cx instead.
    //More info here: https://github.com/mui/material-ui/pull/31802#issuecomment-1093478971
    return <span className={cx(classes.root, className)}>hello world</span>;
}

const useStyles = makeStyles<{ color: "red" | "blue" }>()(
    (theme, { color }) => ({
        "root": {
            color,
            "&:hover": {
                "backgroundColor": theme.primaryColor
            }
        }
    })
);
```

{% hint style="warning" %}
**Keep `@emotion/styled` as a dependency of your project**.

Even if you never use it explicitly, it's a peer dependency of `@mui/material`.
{% endhint %}

{% hint style="warning" %}
[Storybook](https://storybook.js.org): As of writing this lines storybook still uses by default emotion 10.\
Material-ui and TSS runs emotion 11 so there is [some changes](https://github.com/garronej/onyxia-ui/blob/324de62248074582b227e584c53fb2e123f5325f/.storybook/main.js#L31-L32) to be made to your `.storybook/main.js` to make it uses emotion 11.
{% endhint %}
{% endtab %}

{% tab title="Standalone" %}
```
yarn add tss-react @emotion/react
```

`./makeStyles.ts`

```typescript
import { createMakeStyles } from "tss-react";

function useTheme() {
    return {
        "primaryColor": "#32CD32",
    };
}

export const { makeStyles } = createMakeStyles({ useTheme });
```

`./MyComponent.tsx`

```tsx
import { makeStyles } from "./makeStyles";

export function MyComponent(props: Props) {
    const { className } = props;

    const [color, setColor] = useState<"red" | "blue">("red");

    const { classes, cx } = useStyles({ color });

    //Thanks to cx, className will take priority over classes.root 🤩
    return <span className={cx(classes.root, className)}>hello world</span>;
}

const useStyles = makeStyles<{ color: "red" | "blue" }>()(
    (theme, { color }) => ({
        "root": {
            color,
            "&:hover": {
                "backgroundColor": theme.primaryColor
            }
        }
    })
);
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
You can detect unused classes with [this ESLint plugin](detecting-unused-classes.md).
{% endhint %}

{% hint style="success" %}
If you don't want to end up writing things like:

```typescript
import { makeStyles } from "../../../../../../makeStyles";
```

You can put [`"baseUrl": "src"`](https://github.com/InseeFrLab/onyxia-web/blob/ae02b05cd7b17d74fb6a8cbc4c7b1c6f569dfa41/tsconfig.json#L3) in your `tsconfig.json` and import things [relative to your `src/` directory](https://github.com/garronej/tss-react/blob/314aaab87198e7fd3523e34300288495f3242800/src/test/spa/src/index.tsx#L2-L3).
{% endhint %}
