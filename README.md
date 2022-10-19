---
description: Start using TSS, with or without MUI
---

# 🔧 Setup

{% hint style="info" %}
Consider [giving the project a ⭐️](https://github.com/garronej/tss-react). It means a lot to me ❤️
{% endhint %}

{% tabs %}
{% tab title="With MUI" %}
```bash
yarn add tss-react @emotion/react @mui/material @emotion/styled
```

{% hint style="info" %}
If you are migrating from `@material-ui/core` (v4) to `@mui/material` (v5) checkout the migration guide from MUI's documentation website [here](https://mui.com/material-ui/migration/migrating-from-jss/#2-use-tss-react).

Things don’t display as they use to before migrating? Don't worry, [I got you covered](fix-broken-styles-after-upgrading-to-mui-v5-with-tss.md)!
{% endhint %}

```tsx
import { makeStyles, withStyles } from "tss-react/mui"; // "tss-react/mui-compat" if your project is using Typescript < 4.4
import Button from "@mui/material/Button";

type Props = {
    className?: string;
};

export function MyButton(props: Props) {
    const { className } = props;

    const [isClicked, setIsClicked] = useState(false);

    const { classes, cx } = useStyles({ "color": isClicked ? "blue": "red" });

    //Thanks to cx, className will take priority over classes.root 🤩
    //With TSS you must stop using clsx and use cx instead.
    //More info here: https://github.com/mui/material-ui/pull/31802#issuecomment-1093478971
    return (
        <Button 
            className={cx(classes.root, className)}
            onClick={()=> setIsClicked(true)}
        >
            hello world
        </Button>
    );
}

const useStyles = makeStyles<{ color: "red" | "blue" }>()(
    (theme, { color }) => ({
        "root": {
            color,
            "&:hover": {
                "color": theme.palette.primary.main
            }
        }
    })
);
```

{% hint style="warning" %}
**Keep `@emotion/styled` as a dependency of your project**.

Even if you never use it explicitly, it's a peer dependency of `@mui/material`.
{% endhint %}
{% endtab %}

{% tab title="Standalone" %}
```
yarn add tss-react @emotion/react
```

```typescript
// src/theme.ts

import { createMakeStyles } from "tss-react"; //"tss-react/compat" if your project is using Typescript < 4.4

function useTheme() {
    return {
        "primaryColor": "#32CD32",
    };
}

export const { 
  makeStyles,
  withStyles,
  useStyles
} = createMakeAndWithStyles({ useTheme });
```



```tsx
// src/components/MyComponents.tsx

import { makeStyles } from "../theme";

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

{% hint style="success" %}
If you don't want to end up writing things like:

```typescript
import { makeStyles } from "../../../../../../theme";
```

You can put [`"baseUrl": "src"`](https://github.com/InseeFrLab/onyxia-web/blob/ae02b05cd7b17d74fb6a8cbc4c7b1c6f569dfa41/tsconfig.json#L3) in your tsconfig.json and import things [relative to your `src/` directory](https://github.com/garronej/tss-react/blob/314aaab87198e7fd3523e34300288495f3242800/src/test/spa/src/index.tsx#L2-L3).

In the above example it would be:

```typescript
import { makeStyles } from "theme";
```
{% endhint %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
You can detect unused classes with [this ESLint plugin](detecting-unused-classes.md).
{% endhint %}
