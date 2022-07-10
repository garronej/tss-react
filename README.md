---
description: Start using TSS, with or without MUI
---

# 🔧 Setup

{% hint style="info" %}
`tss-react` has over 170 000 monthly NPM download and fewer than 222 ⭐️ on GitHub.

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

{% hint style="info" %}
If your project is using TypeScript < v4.4 you'll need to use `tss-react/compat`, checkout the **Standalone** tab.
{% endhint %}

As a MUI user (if you are using TypeScript >= v4.4), you can simply:

```tsx
import { makeStyles } from "tss-react/mui";
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
