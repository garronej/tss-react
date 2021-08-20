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

-   ✅ As fast as `emotion` ([see the difference](https://stackoverflow.com/questions/68383046/is-there-a-performance-difference-between-the-sx-prop-and-the-makestyles-functio)
    with mui's `makeStyles`)
-   ✅ As lightweight as [`@emotion/react`](https://emotion.sh/docs/@emotion/react).
-   ✅ Server side rendering support (e.g: Next.js).
-   ✅ Seamless integration with [material-ui](https://material-ui.com) v5 and v4.  
    Perfect for those who don't like [the switch from the Hook API to the Styled API](https://github.com/mui-org/material-ui/issues/24513#issuecomment-763921350) in v5.
-   ✅ `@emotion` cache support.
-   ✅ Offers a [type-safe equivalent of the JSS `$` syntax](#composition).

```bash
$ yarn add tss-react @emotion/react
```

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/126204447-6f14ef75-63c2-4480-beb6-18d6fb94b50b.gif">
</p>

-   [Quick start](#quick-start)
-   [API documentation](#api-documentation)
    -   [Exposed APIs](#exposed-apis)
    -   [`makeStyles()`](#makestyles)
    -   [`useStyles()`](#usestyles)
    -   [`<GlobalStyles />`](#globalstyles-)
    -   [`keyframe`](#keyframe)
-   [Cache](#cache)
-   [Composition](#composition)
-   [Selecting children by class name](#selecting-children-by-class-name)
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
import { createMakeStyles } from "tss-react";

function useTheme() {
    return {
        "primaryColor": "#32CD32",
    };
}

// material-ui users can pass in useTheme imported like: import { useTheme } from "@material-ui/core/styles";
export const { makeStyles } = createMakeStyles({ useTheme });
```

`./MyComponent.tsx`

```tsx
import { makeStyles } from "./makeStyles";

const useStyles = makeStyles<{ color: "red" | "blue" }>()(
    (theme, { color }) => ({
        "root": {
            color,
            "&:hover": {
                "backgroundColor": theme.primaryColor,
            },
        },
    }),
);

export function MyComponent(props: Props) {
    const { className } = props;

    const [color, setColor] = useState<"red" | "blue">("red");

    const { classes, cx } = useStyles({ color });

    return <span className={cx(classes.root, className)}>hello world</span>;
}
```

**Material-UI users only**: Setup injection priority.

<details>
  <summary>Click to expand instructions for material-ui v4.</summary></br>

```tsx
import { render } from "react-dom";
import { StylesProvider } from "@material-ui/core/styles";

render(
    <StylesProvider injectFirst>
        <Root />
    </StylesProvider>,
    document.getElementById("root"),
);
```

If you need SSR You can find [here](https://github.com/garronej/tss-react/tree/main/src/test/muiV4ssr)
a Next.js setup to use as reference.

</details>  
</br>

<details>
  <summary>Click to expand instructions for material-ui v5</summary></br>

**Don't** use `<StyledEngineProvider injectFirst/>` but do this instead:

```tsx
import { render } from "react-dom";
import { CacheProvider } from "@emotion/react";
import { getCache } from "tss-react/cache";

render(
    <CacheProvider value={getCache()}>
        <Root />
    </CacheProvider>,
    document.getElementById("root"),
);
```

Feel free to use [any emotion cache you want](https://emotion.sh/docs/cache-provider).
You don't have to use the default one provided in `tss-react/cache`.

WARNING: **Keep `@emotion/styled` as a dependency of your project**. Even if you never use it explicitly,
it's a peer dependency of `@material-ui/core` v5.

WARNING for [Storybook](https://storybook.js.org): As of writing this lines storybook still uses by default emotion 10.  
Material-ui and TSS runs emotion 11 so there is [some changes](https://github.com/garronej/onyxia-ui/blob/324de62248074582b227e584c53fb2e123f5325f/.storybook/main.js#L31-L32)
to be made to your `.storybook/main.js` to make it uses emotion 11.

</details>  
</br>

**NOTE:**  
If you don't want to end up writing things like:

```typescript
import { makeStyles } from "../../../../../../makeStyles";
```

You can put [`"baseUrl": "src"`](https://github.com/InseeFrLab/onyxia-web/blob/ae02b05cd7b17d74fb6a8cbc4c7b1c6f569dfa41/tsconfig.json#L3) in
your `tsconfig.json` and import things [relative to your `src/` directory](https://github.com/garronej/tss-react/blob/314aaab87198e7fd3523e34300288495f3242800/src/test/spa/src/index.tsx#L2-L3).

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
    keyframe, //<- The function as defined in @emotion/react and @emotion/css
    GlobalStyles, //<- A component to define global styles.
} from "tss-react";
```

## `makeStyles()`

Your component style may depend on the props
and state of the components:

```typescript
const useStyles = makeStyles<{ color: string }>()((_theme, { color }) => ({
    "root": {
        "backgroundColor": color,
    },
}));

//...

const { classes } = useStyles({ "color": "grey" });
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
`css` is the function as defined in [@emotion/css](https://emotion.sh)
`cx` is the function as defined in [@emotion/css](https://emotion.sh/docs/@emotion/css#cx)

```typescript
const { classes, cx, css, theme } = useStyles(/*...*/);
```

In some components you may need `cx`, `css` or `theme` without defining
custom `classes`.  
For that purpose you can use the `useStyles` hook returned
by `createMakeStyles`.

`makeStyles.ts`

```typescript
import { createMakeStyles } from "tss-react";

function useTheme() {
    return {
        "primaryColor": "#32CD32",
    };
}

export const {
    makeStyles,
    useStyles, //<- This useStyles is like the useStyles you get when you
    //   call makeStyles but it doesn't return a classes object.
} = createMakeStyles({ useTheme });
```

`./MyComponent.tsx`

```tsx
//Here we ca import useStyles directly instead of generating it from makeStyles.
import { useStyles } from "./makeStyles";

export function MyComponent(props: Props) {
    const { className } = props;

    const { cx, css, theme } = useStyles();

    return (
        <span className={cx(css({ "color": theme.primaryColor }), className)}>
            hello world
        </span>
    );
}
```

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

# Cache

If you are using [custom emotion cache](https://emotion.sh/docs/@emotion/cache) `tss-react` will transparently
pick up the cache you have provided using [`<CacheProvider />` from `@emotion/react`](https://emotion.sh/docs/cache-provider).

```tsx
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
/* OR:
import createCache from "tss-react/@emotion/cache";
*/

const myCache = createCache({
    "key": "my-prefix-key",
    //...
});

render(<CacheProvider value={myCache}>{/* ... */}</CacheProvider>);
```

You can also opt for telling `tss-react` to use a specific cache and ignore
the cache provided by the `<CacheProvider />`.

```typescript
import { createMakeStyles } from "tss-react";
import createCache from "@emotion/cache";

const { makeStyles } = createMakeStyles({
    useTheme,
    "cache": createCache({ "key": "my-prefix-key" }),
});
```

If there is no cache provided by `<CacheProvider />` nor any cache specified
when calling `createMakeStyles()` then the cache used is `import { getCache } from "tss-react/cache"`.

# Composition

`tss-react` unlike `jss-react` doesn't support the `$` syntax but there's type safe alternatives that
achieve the same results.

# Selecting children by class name

In **JSS** you can do:

```tsx
{
  "parent": {
      "padding": 30,
      "&:hover $child": {
          "backgroundColor": "red"
      },
  },
  "child": {
      "backgroundColor": "blue"
  }
}
//...
<div className={classes.parent}>
    <div className={classes.children}>
        Background turns red when the mouse is hover the parent
    </div>
</div>
```

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/129976981-0637235a-570e-427e-9e77-72d100df0c36.gif">
</p>

This is how you would achieve the same result with `tss-react`

```tsx
const useStyles = makeStyles()((_theme, _params, css) => {
    const child = {
        "background": "blue",
    } as const; //<- In many case 'as const' must be used so that it can be inferred as CSSObject

    return {
        "parent": {
            "padding": 30,
            [`&:hover .${css(child)}`]: {
                "background": "red",
            },
        },
        child,
    };
});

export function App() {
    const { classes } = useStyles();

    return (
        <div className={classes.parent}>
            <div className={classes.child}>
                Background turns red when mouse is hover the parent.
            </div>
        </div>
    );
}
```

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
// You can always define the Theme type as: "export type Theme = ReturnType<typeof useTheme>;"
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
    // Other styles...
}));
```

# Server Side Rendering (SSR)

There are some minimal configuration required to make `tss-react`
work with SSR.

The following instructions are assuming you are using `tss-react` standalone
or alongside `@material-ui` v5. You can find [here](https://github.com/garronej/tss-react/tree/main/src/test/muiV4ssr)
a Next.js setup with `@material-ui` v4.

## With [Next.js](https://nextjs.org)

### If you don't have a `_document.tsx`

Just create a file `page/_document.tsx` as follow:

```tsx
import { createDocument } from "tss-react/nextJs";

const { Document } = createDocument();

/*
If you use custom cache you should provide it here:

const { Document } = createDocument({ "caches": [ cache1, cache2, ... ] });
*/

export default Document;
```

### **Or**, if you have have a `_document.tsx` but you haven't overloaded `getInitialProps`

```tsx
import Document from "next/document";
import type { DocumentContext } from "next/document";
import { createGetInitialProps } from "tss-react/nextJs";

const { getInitialProps } = createGetInitialProps();

/*
If you use custom cache you should provide it here:

const { getInitialProps } = createGetInitialProps({ "caches": [ cache1, cache2, ... ] });
*/

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
import { createPageHtmlToStyleTags } from "tss-react/nextJs";

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags();
/*
If you use custom cache you should provide it here:

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags({ "caches": [ cache1, cache2, ... ] });
*/

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

```bash
yarn add @emotion/server
```

```tsx
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";

import { getCache } from "tss-react/cache";
import { createMakeStyles } from "tss-react";

const emotionServers = [
    getCache(), //If you use custom cache(s) provide it/them here instead of the default.
].map(createEmotionServer);

const element = <App />;

const html = renderToString(element);

res.status(200).header("Content-Type", "text/html").send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    ${emotionServers
        .map(({ extractCriticalToChunks, constructStyleTagsFromChunks }) =>
            constructStyleTagsFromChunks(extractCriticalToChunks(html)),
        )
        .join("")}
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

# To start the Server Side Rendering app that test the mui v4 integration.
yarn start_muiV4
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

const useStyles = makeStyles(theme =>
    createStyles<"root" | "label", { color: "red" | "blue" }>({
        "root": {
            "backgroundColor": theme.palette.primary.main,
        },
        "label": ({ color }) => ({
            color,
        }),
    }),
);

function MyComponent(props: Props) {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <span className={classes.label}>Hello World</span>
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
