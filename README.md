<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109334865-8f85bf00-7861-11eb-90ab-da36f9afe1b6.png">  
</p>
<p align="center">
    <i>✨ Like JSS but optimized for TypeScript. Powered by emotion ✨</i>
    <br>
    <br>
    <img src="https://github.com/garronej/tss-react/workflows/ci/badge.svg?branch=develop">
    <img src="https://img.shields.io/bundlephobia/minzip/tss-react">
    <img src="https://img.shields.io/npm/dw/tss-react">
    <img src="https://img.shields.io/npm/l/tss-react">
</p>

`'tss-react'` is intended to be a replacement for `'react-jss'` and for
[@material-ui v4 `makeStyle`](https://material-ui.com/styles/basics/#hook-api).
It's API is focused on providing maximum type safety and minimum verbosity.  
This module is a tinny extension for [`@emotion/react`](https://emotion.sh/docs/@emotion/react).

-   ✅ As fast as `emotion` (which is [much faster](https://github.com/mui-org/material-ui/issues/22342#issue-684407575)
    than mui's `makeStyles`)
-   ✅ As lightweight as `emotion/react`.
-   ✅ Server side rendering support (e.g: Next.js).
-   ✅ Seamless integration with [material-ui](https://material-ui.com) v5. Perfect for those who don't like [the switch from the Hook API to the Styled API](https://github.com/mui-org/material-ui/issues/24513#issuecomment-763921350) in v5.

```bash
$ yarn add tss-react
```

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/125219855-ec8c8980-e2c5-11eb-8011-983251248bd2.gif">
</p>

# Quick start

`./styleEngine.ts`

```typescript
import { createMakeStyles } from "tss-react";

function useTheme(){
    return {
        "limeGreen": "#32CD32";
    };
}

// material-ui users can pass in useTheme imported like: import { useTheme } from "@material-ui/core/styles";
export const { makeStyles, useStyleTools } = createMakeStyles({ useTheme });
```

`./MyComponent.tsx`

```tsx
import { makeStyles } from "./styleEngine";

const { useStyles } = makeStyles<{ color: "red" | "blue" }>()({
   (theme, { color })=> ({
       "root": {
           color,
           "&:hover": {
               "backgroundColor": theme.limeGreen
           }
        }
   })
});

function MyComponent(props: Props){

    const [ color, setColor ]= useState<"red" | "blue">("red");

    const { classes }=useStyles({ color });

    return (
        <span className={classes.root}>
            hello world
        </span>
    );

}
```

**Material-UI users only**, don't forget to enable [injectFirst](https://material-ui.com/styles/advanced/#injectfirst)

```tsx
import { render } from "react-dom";
import { StylesProvider } from "@material-ui/core/styles";

render(
    <StylesProvider injectFirst>
        <Root />,
    </StylesProvider>,
    document.getElementById("root"),
);
```

<p align="center">
    <i>Try it now:</i><br>
    <a href='https://stackblitz.com/edit/tss-react?file=Hello.tsx'>
        <img src="https://user-images.githubusercontent.com/6702424/109010505-214dca80-76b0-11eb-885e-2e5ef7ade821.png">
    </a>
</p>

# API documentation

```tsx
import { makeStyles, useStyleTools } from "./styleEngine";

const { useStyles } = makeStyles<{ color: "red" | "blue" }>()(
    //NOTE: This doesn't have to be a function, it can be just an object.
    (theme, { color }) => ({
        "fooBar": {
            "width": 100,
            "height": 100,
        },
    }),
);

export function MyComponent(props: { className?: string }) {
    //css and cx are the functions as defined in @emotion/css: https://emotion.sh
    //theme is the object returned by your useTheme()
    const { classes, css, cx, theme } = useStyles({ "color": "red" });

    //You can also access css, cx and theme with useStyleTools()
    //const { css, cx, theme }= useStyleTools();

    return (
        <div
            className={cx(
                classes.fooBar,
                css({ "backgroundColor": theme.limeGreen }),
                className,
            )}
        />
    );
}
```

```typescript

import { createMakeStyles } from "tss-react";

function useTheme(){
    return {
        "limeGreen": "#32CD32";
    };
}

export const { makeStyles, useStyleTools } = createMakeStyles({ useTheme });

```

# Why this instead of [the hook API](https://material-ui.com/styles/basics/#hook-api) of Material UI v4?

First of all because `makeStyle` is deprecated in `@material-ui` v5 but also
because it has some major flaws. Let's consider this example:

```tsx
import { makeStyles, createStyles } from "@material-ui/core/styles";

type Props = {
    color: "red" | "blue";
};

const useStyles = makeStyles(
  theme => createStyles<"root" | "label">, { color: "red" | "blue"; }>({
    "root": {
        "backgroundColor": theme.palette.primary.main
    },
    "label": ({ color })=>({
        color
    })
  })
);

function MyComponent(props: Props){

    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <span className={classes.label}>
                Hello World
            </span>
        </div>
    );

}
```

Two pain points:

-   Because TypeScript doesn't support [partial argument inference](https://github.com/microsoft/TypeScript/issues/26242),
    we have to explicitly enumerate the classes name as an union type `"root" | "label"`.
-   We shouldn't have to import [`createStyles`](https://material-ui.com/styles/api/#createstyles-styles-styles) to get correct typings.

Let's now compare with `tss-react`

```tsx
import { makeStyles } from "./styleEngine";

type Props = {
    color: "red" | "blue";
};

const { useStyles } = makeStyles<{ color: "red" | "blue" }>()(
    (theme, { color }) => ({
        "root": {
            "backgroundColor": theme.palette.primary.main,
        },
        "label": { color },
    }),
);

function MyComponent(props: Props) {
    const { classes } = useStyles(props);

    return (
        <div className={classes.root}>
            <span className={classes.label}>Hello World</span>
        </div>
    );
}
```

Benefits:

-   Less verbose, same type safety.
-   You don't need to remember how things are supposed to be named, just let intellisense guide you.

Besides, the hook api of `material-ui`, have other problems:

-   One major bug: [see issue](https://github.com/mui-org/material-ui/issues/24513#issue-790027173)
-   `JSS` has poor performances compared to `emotion` [source](https://github.com/mui-org/material-ui/issues/22342#issue-684407575)

# Why this instead of Styled component ?

See [this issue](https://github.com/mui-org/material-ui/issues/22342#issuecomment-764495033)

# Canonical usage example

Consider this example to understand how `css`, `cx` and `makeStyles` are supposed to be
used together:

`MyButton.tsx`

```tsx
import { makeStyles } from "./styleEngine";

export type Props = {
    text: string;
    onClick(): void;
    isDangerous: boolean;
    className?: string;
};

const { useStyles } = makeStyles<Pick<Props, "isDangerous">>()(
    (theme, { isDangerous }) => ({
        "root": {
            "backgroundColor": isDangerous ? "red" : "grey",
        },
    }),
);

export function MyButton(props: Props) {
    const { className, onClick, text } = props;

    const { classes, cx } = useStyles(props);

    return (
        <button
            //You want to apply the styles in this order
            //because the parent should be able ( with
            //the className prop) to overwrite the internal
            //styles ( classesNames.root )
            className={cx(classes.root, className)}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
```

`App.tsx`

```tsx
import { useStyleTools } from "./styleEngine";

function App() {
    const { css } = useStyleTools();

    return (
        <MyButton
            //The css function return a className, it let you
            //apply style directly on in the structure without
            //having to use createUseClassNames
            className={css({ "margin": 40 })}
            text="click me!"
            isDangerous={false}
            onClick={() => console.log("click!")}
        />
    );
}
```

# Development

```bash
yarn
yarn build
#For automatically recompiling when file change
#npx tsc -w

# To start the Single Page Application test app (create react app)
yarn start_spa

# To start the Server Side Rendering app (next.js)
yarn start_ssr
```

In SSR everything should work with [JavaScript disabled](https://developer.chrome.com/docs/devtools/javascript/disable/)

# Server Side Rendering (SSR)

For SSR to work a provider must be used:

`shared/styleEngine.ts`

```tsx
import { createMakeStyles } from "tss-react";
import { useTheme } from "@material-ui/core/styles";

export const {
    makeStyles,
    useStyleTools,
    TssProviderForSsr, //<- This is what's new
} = createMakesStyles({ theme });
```

`pages/index.tsx`

```tsx
import { createMakeStyle } from "tss-react";
import { TssProviderForSsr } from "../shared/styleEngine";

export default function Home() {
    return (
        <TssProviderForSsr>
            <App />
        </TssProviderForSsr>
    );
}
```

## Backend configuration with [Next.js](https://nextjs.org)

### If you don't have a `_document.tsx`

Just create a file `page/_document.tsx` as follow:

```tsx
import { Document } from "tss-react/nextJs";

export default Document;
```

### Or, if have have a `_document.tsx` but you haven't overloaded `getInitialProps`

```tsx
import Document from "next/document";
import type { DocumentContext } from "next/document";
import { getInitialProps } from "tss-react/nextJs";

export default class AppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        return getInitialProps(ctx);
    }

    //...Rest of your class...
}
```

### Or, if have have a `_document.tsx` and an overloaded `getInitialProps`

```tsx
import Document from "next/document";
import type { DocumentContext } from "next/document";
import { pageHtmlToStyleTags } from "tss-react/nextJs";

export default class AppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const page = await ctx.renderPage();

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            "styles": (
                <>
                    {initialProps.styles}
                    {pageHtmlToStyleTags({ "pageHtml": page.html })}
                </>
            ),
        };
    }

    //...Rest of your class...
}
```

## Backend configuration general case.

```tsx
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";

import { cache } from "tss-react/cache";
import { createMakeStyle } from "tss-react";

const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

function useTheme() {
    return {
        "limeGreen": "#32CD32",
    };
}

const { TssProviderForSsr, makeStyles, useStyleTools } = createMakeStyle({
    useTheme,
});

export { makeStyles, useStyleTools };

const element = (
    <TssProviderForSsr>
        <App />
    </TssProviderForSsr>
);

const { html, styles } = extractCriticalToChunks(renderToString(element));

res.status(200).header("Content-Type", "text/html").send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    ${constructStyleTagsFromChunks({ html, styles })}
</head>
<body>
    <div id="root">${html}</div>

    <script src="./bundle.js"></script>
</body>
</html>`);
```

# Road map to v1

-   [ ] [Support composition](https://github.com/garronej/tss-react/issues/2#issuecomment-875205410)
