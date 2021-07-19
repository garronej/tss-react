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
    <img src="https://user-images.githubusercontent.com/6702424/126055269-7d70465a-bd13-4365-a3f9-b3694e23c1c8.gif">
</p>

-   [Quick start](#quick-start)
-   [API documentation](#api-documentation)
    -   [Exposed APIs](#exposed-apis)
    -   [`makeStyles()`](#makestyles)
    -   [`useStyles()`](#usestyles)
    -   [`<GlobalStyles />`](#globalstyles-)
    -   [`keyframe`](#keyframe)
-   [Composition](#composition)
    -   [Internal composition](#internal-composition)
    -   [Export rules](#export-rules)
-   [Server Side Rendering (SSR)](#server-side-rendering-ssr)
    -   [With Next.js](#with-nextjs)
        -   [If you don't have a `_document.tsx`](#if-you-dont-have-a-_documenttsx)
        -   [**Or**, if you have have a `_document.tsx` but you haven't overloaded `getInitialProps`](#or-if-you-have-have-a-_documenttsx-but-you-havent-overloaded-getinitialprops)
        -   [**Or**, if you have have a `_document.tsx` and an overloaded `getInitialProps`](#or-if-you-have-have-a-_documenttsx-and-an-overloaded-getinitialprops)
    -   [With any other framework](#with-any-other-framework)
-   [Development](#development)
-   [FAQ](#faq)
    -   [Why this instead of the hook API of Material UI v4?](#why-this-instead-of-the-hook-api-of-material-ui-v4)
    -   [Why this instead of Styled component ?](#why-this-instead-of-styled-component-)

# Quick start

`./makeStyles.ts`

```typescript
import { createMakeStyless } from "tss-react";

function useTheme(){
    return {
        "primaryColor": "#32CD32";
    };
}

// material-ui users can pass in useTheme imported like: import { useTheme } from "@material-ui/core/styles";
export const { makeStyles } = createMakeStyles({ useTheme });
```

`./MyComponent.tsx`

```tsx
import { makeStyles } from "./makeStyles";

const useStyles= makeStyles<{ color: "red" | "blue" }>()({
   (theme, { color })=> ({
       "root": {
           color,
           "&:hover": {
               "backgroundColor": theme.primaryColor
           }
        }
   })
});

function MyComponent(props: Props){

    const { className } = props;

    const [ color, setColor ]= useState<"red" | "blue">("red");

    const { classes, cx }=useStyles({ color });

    return (
        <span className={cx(classes.root, className)}>
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

## Exposed APIs

```typescript
import {
    createMakeStyles, //<- Create an instance of makeStyle() for your theme.
    css, //<- The function as defined in @emotion/css https://emotion.sh
    cx, //<- The function as defined in @emotion/css
    keyframe, //<- The function as defined in @emotion/react and @emotion/css
    GlobalStyles, //<- A component to define global styles.
} from "tss-react";
```

## `makeStyles()`

Your component style may depend on the props
and state of the components:

```typescript
const useStyles= makeStyles<{ color: string; }>()({
    (_theme, { color })=> ({
        "root": {
            "backgroundColor": color
        }
    })
});

//...

const { classes } = useStyles({ "color": "grey" });
```

...Or it may not:

```typescript
const useStyles = makeStyles()({
    //If you don't need neither the theme nor any state or
    //props to describe your component style you can pass-in
    //an object instead of a callback.
    "root": {
        "backgroundColor": "pink",
    },
});

//...

const { classes } = useStyles();
```

## `useStyles()`

Beside the `classes`, `useStyles` also returns `cx`, `css` and your `theme`.

```typescript
const { classes, cx, css, theme } = useStyles(/*...*/);
```

`cx` and `css` cans be imported directly from `tss-react` but it's convenient to
be able to access them here.

## `<GlobalStyles />`

Sometimes you might want to insert global css.
You can use the `<GlobalStyles />` component to do this.

It's `styles` (with an s) prop should be of same type as the `css()` function
argument.

```tsx
import { GlobalStyles } from "tss-react";

function MyComponent() {
    return (
        <>
            <GlobalStyles
                styles={{
                    "body": {
                        "backgroundColor": "pink",
                    },
                    ".foo": {
                        "color": "cyan",
                    },
                }}
            />
            <h1 className="foo">This text will be cyan</h1>
        </>
    );
}
```

## `keyframe`

```typescript
// Reexport from @emotion/react
import { keyframe } from "tss-react";
import { makeStyles } from "./makeStyles";

export const useStyles = makeStyles()({
    "svg": {
        "& g": {
            "opacity": 0,
            "animation": `${keyframes`
            60%, 100% {
                opacity: 0;
            }
            0% {
                opacity: 0;
            }
            40% {
                opacity: 1;
            }
            `} 3.5s infinite ease-in-out`,
        },
    },
});
```

# Composition

`tss-react` unlike `jss-react` doesn't support the `$` syntax,
but you'll see. It isn't needed.

## Internal composition

When you want to reuse style within the same component.

```typescript
import { makeStyles } from "./makeStyles";
import type { CSSObject } from "tss-react";

const useStyles = makeStyles<{ n: number; color: string }>()(
    (theme, { n, color }) => {
        const root: CSSObject = {
            "color": theme.primaryColor,
            "border": `${n}px solid black`,
        };

        return {
            root,
            "foo": {
                ...root,
                //Style specific to foo
                color,
            },
        };
    },
);
```

## Export rules

`MyComponent.tsx`

```typescript
import { makeStyles } from "./makeStyles";
//You can always define the Theme type as: "export type Theme = ReturnType<typeof useTheme>;"
import type { Theme } from "./makeStyles";
import type { CSSObject } from "tss-react";

//Can be used in another component
export const getRootStyle = (
    theme: Theme,
    params: { n: number },
): CSSObject => ({
    "color": theme.primaryColor,
    "border": `${params.n}px solid black`,
});

const useStyles = makeStyles<
    Parameters<typeof getRootStyle>[1] & { color: string }
>()((theme, { n, color }) => ({
    "root": getRootStyle(theme, { n }),
    //Other style...
}));
```

# Server Side Rendering (SSR)

There are some minimal configuration required to make `tss-react`
work with SSR.

## With [Next.js](https://nextjs.org)

### If you don't have a `_document.tsx`

Just create a file `page/_document.tsx` as follow:

```tsx
import { Document } from "tss-react/nextJs";

export default Document;
```

### **Or**, if you have have a `_document.tsx` but you haven't overloaded `getInitialProps`

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

### **Or**, if you have have a `_document.tsx` and an overloaded `getInitialProps`

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

## With any other framework

```tsx
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";

import { cache } from "tss-react/cache";
import { createMakeStyles } from "tss-react";

const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

function useTheme() {
    return {
        "primaryColor": "#32CD32",
    };
}

const { TssProviderForSsr, makeStyles, useStyleTools } = createMakeStyles({
    useTheme,
});

export { makeStyles, useStyleTools };

const element = <App />;

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

# FAQ

<details>
  <summary>Click to expand</summary>

## Why this instead of [the hook API](https://material-ui.com/styles/basics/#hook-api) of Material UI v4?

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
import { makeStyles } from "./makeStyles";

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

## Why this instead of Styled component ?

See [this issue](https://github.com/mui-org/material-ui/issues/22342#issuecomment-764495033)

</details>
