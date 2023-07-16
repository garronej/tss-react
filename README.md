---
description: Start using TSS, with or without MUI
---

# 🔧 Setup

{% tabs %}
{% tab title="With MUI" %}
```bash
yarn add @mui/material @emotion/styled @emotion/react #Required for MUI
yarn add tss-react
```

{% hint style="info" %}
If you are migrating from `@material-ui/core` (v4) to `@mui/material` (v5) checkout the migration guide from MUI's documentation website [here](https://mui.com/material-ui/migration/migrating-from-jss/#2-use-tss-react).

Things don’t display as they use to before migrating? Don't worry, [I got you covered](troubleshoot-migration-to-muiv5-with-tss.md)!
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
        root: {
            // The color of the text is either blue or red depending of 
            // the state fo the component.
            color,
            // When the curser is over the button the text is the primary color
            "&:hover": {
                color: theme.palette.primary.main
            },
            // On small screens the button have a red border
 	    [theme.breakpoints.down("md")]: {
	        border: "1px solid red"
	    }
        }
    })
);
```
{% endtab %}

{% tab title="Standalone" %}
```bash
yarn add tss-react @emotion/react
```

{% code title="src/tss.ts" %}
```typescript
import { createMakeAndWithStyles } from "tss-react"; //"tss-react/compat" if your project is using Typescript < 4.4

function useTheme() {
    return {
        primaryColor: "#32CD32", // This is LimeGreen in hex
    };
}

export const { 
  makeStyles,
  withStyles,
  useStyles
} = createMakeAndWithStyles({ useTheme });
```
{% endcode %}

{% code title="src/MyComponents.tsx" %}
```tsx
import { makeStyles } from "../tss";

export function MyComponent(props: Props) {
    const { className } = props;

    const [color, setColor] = useState<"red" | "blue">("red");

    const { classes, cx } = useStyles({ color });

    //Thanks to cx, className will take priority over classes.root 🤩
    return <span className={cx(classes.root, className)}>hello world</span>;
}

const useStyles = makeStyles<{ color: "red" | "blue" }>()(
    (theme, { color }) => ({
        root: {
            // The color of the text is either blue or red depending of 
            // the state fo the component.
            color,
            // When the curser is over the button the text is the primary color
            "&:hover": {
                backgroundColor: theme.primaryColor
            },
            // On small screens the button have a red border
            "@media (max-width:48em)": {
                border: "1px solid red"
            }
        }
    })
);
```
{% endcode %}

{% hint style="success" %}
If you don't want to end up writing things like:

```typescript
import { makeStyles } from "../../../../../../tss";
```

You can put [`"baseUrl": "src"`](https://github.com/InseeFrLab/onyxia-web/blob/ae02b05cd7b17d74fb6a8cbc4c7b1c6f569dfa41/tsconfig.json#L3) in your tsconfig.json and import things [relative to your `src/` directory](https://github.com/garronej/tss-react/blob/314aaab87198e7fd3523e34300288495f3242800/src/test/spa/src/index.tsx#L2-L3).

In the above example it would be:

```typescript
import { makeStyles } from "tss";

```
{% endhint %}
{% endtab %}
{% endtabs %}

If you are in a Next.js setup there is an extra step to get SSR working: &#x20;

{% content-ref url="ssr/next.js.md" %}
[next.js.md](ssr/next.js.md)
{% endcontent-ref %}
