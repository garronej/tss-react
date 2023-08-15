---
description: Start using TSS, with or without MUI
---

# 🔧 Setup

{% tabs %}
{% tab title="With MUI - makeStyles API" %}
```bash
yarn add @mui/material @emotion/styled @emotion/react #Required for MUI
yarn add tss-react
```

{% hint style="info" %}
The makeStyles API isn't and will never be deprecated, however from now on I encourage the use of the "modern API" that provide a much beter developer experience. &#x20;

If you are migrating from `@material-ui/core` (v4) to `@mui/material` (v5) checkout the migration guide from MUI's documentation website [here](https://mui.com/material-ui/migration/migrating-from-jss/#2-use-tss-react).

Things don’t display as they use to before migrating? Don't worry, [I got you covered](troubleshoot-migration-to-muiv5-with-tss.md)!
{% endhint %}

{% code title="src/MyButton.tsx" %}
```tsx
import { makeStyles, withStyles } from "tss-react/mui"; // "tss-react/mui-compat" if your project is using Typescript < 4.4
import Button from "@mui/material/Button";
import { useState } from "react";

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
            // When the curser is over the button has a black border
            "&:hover": {
                border: '4px solid black'
            },
            // On screens bigger than MD the button will have a big cyan border
 	    [theme.breakpoints.up("md")]: {
	        border: '10px solid cyan'
	    }
        }
    })
);
```
{% endcode %}

{% embed url="https://stackblitz.com/edit/vitejs-vite-sz4euf?file=src%2FMyButton.tsx" %}
{% endtab %}

{% tab title="With MUI - Modern API" %}
```bash
yarn add @mui/material @emotion/styled @emotion/react #Required for MUI
yarn add tss-react@4.9.0-rc.0
```

{% code title="src/MyButton.tsx" %}
```tsx
import { tss } from "tss-react/mui";
import Button from "@mui/material/Button";
import { useState } from "react";

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

const useStyles = tss
    .withParams<{ color: "red" | "blue"; }>()
    .createUseStyles(({ theme, color })=> ({
        root: {
            // The color of the text is either blue or red depending of 
            // the state fo the component.
            color,
            // When the curser is over the button has a black border
            "&:hover": {
                border: '4px solid black'
            },
            // On screens bigger than MD the button will have a big cyan border
 	    [theme.breakpoints.up("md")]: {
	        border: '10px solid cyan'
	    }
        }
    }));
```
{% endcode %}

{% embed url="https://stackblitz.com/edit/vitejs-vite-ka1gdq?file=src%2FMyButton.tsx" %}
{% endtab %}

{% tab title="Standalone" %}
```bash
yarn add tss-react@4.9.0-rc.0 @emotion/react
```

{% code title="src/tss.ts" %}
```typescript
import { createTss } from "tss-react";

function useContext() {
    const theme = {
        primaryColor: "#32CD32", // This is LimeGreen in hex
    };
    
    return { theme };
}

export const { tss } = createTss({ useContext });

export const useStyles = tss.createUseStyles({});
```
{% endcode %}

{% code title="src/MyComponents.tsx" %}
```tsx
import { useState } from 'react';
import { tss } from './tss';
// NOTE: If you don't have a theme you can import { tss } from "tss-react";

export type Props = {
  className?: string;
};

export function MyComponent(props: Props) {
  const { className } = props;

  const [color, setColor] = useState<'red' | 'blue'>('red');

  const { classes, cx } = useStyles({ color });

  //Thanks to cx, className will take priority over classes.root 🤩
  return (
    <span
      className={cx(classes.root, className)}
      onClick={() => setColor('blue')}
    >
      hello world
    </span>
  );
}

const useStyles = tss
  .withParams<{ color: 'red' | 'blue'; }>()
  .createUseStyles(({ theme, color }) => ({
    root: {
      cursor: 'pointer',
      // The color of the text is red or blue depending on the state of the component
      color,
      // When mouse is hover, green border
      '&:hover': {
        border: `4px solid ${theme.primaryColor}`,
      },
      // On big screen, a big black border
      '@media (min-width:48em)': {
        border: '10px solid black',
      }
    }
  }));
```
{% endcode %}

{% embed url="https://stackblitz.com/edit/vitejs-vite-usphnb?file=src%2FMyComponent.tsx" %}

{% hint style="success" %}
If you don't want to end up writing things like:

```typescript
import { makeStyles } from "../../../../../../tss";
```

You can put [`"baseUrl": "src"`](https://github.com/InseeFrLab/onyxia-web/blob/ae02b05cd7b17d74fb6a8cbc4c7b1c6f569dfa41/tsconfig.json#L3) in your tsconfig.json and import things [relative to your `src/` directory](https://github.com/garronej/tss-react/blob/314aaab87198e7fd3523e34300288495f3242800/src/test/spa/src/index.tsx#L2-L3).

In the above example it would be:

```typescript
import { makeStyles } from "tss";
If you are in a Next.js setup there is an extra step to get SSR working:  
```
{% endhint %}
{% endtab %}
{% endtabs %}

{% content-ref url="ssr/next.js.md" %}
[next.js.md](ssr/next.js.md)
{% endcontent-ref %}
