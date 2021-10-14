<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109334865-8f85bf00-7861-11eb-90ab-da36f9afe1b6.png">  
</p>
<p align="center">
    <i>✨ makeStyles is dead, long live makeStyles! ✨</i>
    <br>
    <br>
    <img src="https://github.com/garronej/tss-react/workflows/ci/badge.svg?branch=develop">
    <img src="https://img.shields.io/bundlephobia/minzip/tss-react">
    <img src="https://img.shields.io/npm/dw/tss-react">
    <img src="https://img.shields.io/npm/l/tss-react">
</p>

`'tss-react'` is intended to be the replacement for `'react-jss'` and for
[@material-ui v4 `makeStyles`](https://material-ui.com/styles/basics/#hook-api).

-   ✅ Seamless integration with [mui](https://mui.com) v5 and v4.
-   ✅ Build on top of [`@emotion/react`](https://emotion.sh/docs/@emotion/react), it has virtually no impact on the bundle size alongside mui.
-   ✅ [Maintained for the foreseeable future](https://github.com/mui-org/material-ui/issues/28463#issuecomment-923085976), issues are dealt with within good delays.
-   ✅ Offers a [type-safe equivalent of the JSS `$` syntax](#composition-and-nested-selectors--syntax-).
-   ✅ Server side rendering support (e.g: Next.js).
-   ✅ As fast as `emotion` ([see the difference](https://stackoverflow.com/questions/68383046/is-there-a-performance-difference-between-the-sx-prop-and-the-makestyles-functio)
    with mui's `makeStyles`)
-   ✅ `@emotion` cache support.

```bash
$ yarn add tss-react @emotion/react
```

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/134704429-83b2760d-0b4d-42e8-9c9a-f287a3353c13.gif">
</p>

-   [Quick start](#quick-start)
    -   [Minimal setup](#minimal-setup)
    -   [Mui integration](#mui-integration)
    -   [Avoiding `import { makeStyles } from "../../../makeStyles"`](#avoiding-import--makestyles--from-makestyles)
    -   [Playground](#playground)
-   [API documentation](#api-documentation)
    -   [Exposed APIs](#exposed-apis)
    -   [`makeStyles()`](#makestyles)
    -   [`useStyles()`](#usestyles)
    -   [`withStyles()`](#withstyles)
    -   [`<GlobalStyles />`](#globalstyles-)
    -   [`keyframes`](#keyframes)
-   [Cache](#cache)
-   [Composition and nested selectors ( `$` syntax )](#composition-and-nested-selectors--syntax-)
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
    -   [Compile error `TS1023`](#compile-error-ts1023)

# Quick start

## Minimal setup

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

## Mui integration

**Don't** use `<StyledEngineProvider injectFirst/>` but do this instead:

```tsx
import { render } from "react-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";

export const muiCache = createCache({
    "key": "mui",
    "prepend": true,
});

render(
    <CacheProvider value={muiCache}>
        <ThemeProvider theme={myTheme}>
            <Root />
        </ThemeProvider>
    </CacheProvider>,
    document.getElementById("root"),
);
```

`./makeStyles.ts`

```typescript
import { useTheme } from "@mui/material/styles";
//WARNING: tss-react require TypeScript v4.4 or newer. If you can't update use:
//import { createMakeAndWithStyles } from "tss-react/compat";
import { createMakeAndWithStyles } from "tss-react";

export const { makeStyles, withStyles } = createMakeAndWithStyles({
    useTheme,
    /*
    OR, if you have extended the default mui theme adding your own custom properties: 
    Let's assume the myTheme object that you provide to the <ThemeProvider /> is of 
    type MyTheme then you'll write:
    */
    //"useTheme": useTheme as (()=> MyTheme)
});
```

WARNING: **Keep `@emotion/styled` as a dependency of your project**. Even if you never use it explicitly,
it's a peer dependency of `@mui/material`.

WARNING for [Storybook](https://storybook.js.org): As of writing this lines storybook still uses by default emotion 10.  
Material-ui and TSS runs emotion 11 so there is [some changes](https://github.com/garronej/onyxia-ui/blob/324de62248074582b227e584c53fb2e123f5325f/.storybook/main.js#L31-L32)
to be made to your `.storybook/main.js` to make it uses emotion 11.

## Avoiding `import { makeStyles } from "../../../makeStyles"`

If you don't want to end up writing things like:

```typescript
import { makeStyles } from "../../../../../../makeStyles";
```

You can put [`"baseUrl": "src"`](https://github.com/InseeFrLab/onyxia-web/blob/ae02b05cd7b17d74fb6a8cbc4c7b1c6f569dfa41/tsconfig.json#L3) in
your `tsconfig.json` and import things [relative to your `src/` directory](https://github.com/garronej/tss-react/blob/314aaab87198e7fd3523e34300288495f3242800/src/test/spa/src/index.tsx#L2-L3).

## Playground

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
    createMakeAndWithStyles, //<- Create an instance of makeStyles() and withStyles() for your theme.
    keyframes, //<- The function as defined in @emotion/react and @emotion/css
    GlobalStyles, //<- A component to define global styles.
    TssCacheProvider, //<- Provider to specify the emotion cache tss should use.
    useCssAndCx, //<- Access css and cx directly.
    //   (Usually you'll use useStyles returned by makeStyles or createMakeStyles for that purpose
    //    but if you have no theme in your project, it can come in handy.)
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
import { createMakeAndWithStyles } from "tss-react";

function useTheme() {
    return {
        "primaryColor": "#32CD32",
    };
}

export const {
    makeStyles,
    useStyles, //<- This useStyles is like the useStyles you get when you
    //   call makeStyles but it doesn't return a classes object.
} = createMakeAndWithStyles({ useTheme });
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

## `withStyles()`

It's like [the material-ui v4 higher-order component API](https://mui.com/styles/basics/#higher-order-component-api)
but type safe by design.

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/136705025-dadfff08-7d9a-49f7-8696-533ca38ec38f.gif">
</p>

**IMPORTANT NOTICE**: [Don't be afraid to use `as const`](https://github.com/garronej/tss-react/blob/0b8d83d0d49b1198af438409cc2e2b9dc023e6f0/src/test/types/withStyles_classes.tsx#L112-L142)
when you get red squiggly lines.

You can pass as first argument any component that accept a `className` props:

```tsx
function MyComponent(props: { className?: string; colorSmall: string }) {
    return (
        <div className={props.className}>
            The background color should be different when the screen is small.
        </div>
    );
}

const MyComponentStyled = withStyles(MyComponent, (theme, props) => ({
    "root": {
        "backgroundColor": theme.palette.primary.main,
        "height": 100,
    },
    "@media (max-width: 960px)": {
        "root": {
            "backgroundColor": props.colorSmall,
        },
    },
}));
```

You can also pass a mui component like for example `<Button />` and you'll be able
to overwrite [every rule name of the component](https://mui.com/api/button/#css) (it uses the
`classes` prop).

```tsx
import Button from "@mui/material/Button";

const MyStyledButton = withStyles(Button, {
    "root": {
        "backgroundColor": "grey",
    },
    "text": {
        "color": "red",
    },
    "@media (max-width: 960px)": {
        "text": {
            "color": "blue",
        },
    },
});
```

It's also possible to start from builtin HTML component:

```tsx
const MyAnchorStyled = withStyles("a", (theme, { href }) => ({
    "root": {
        "border": "1px solid black",
        "backgroundColor": href?.startsWith("https")
            ? theme.palette.primary.main
            : "red",
    },
}));
```

You can experiment with those examples [here](https://github.com/garronej/tss-react/blob/0b8d83d0d49b1198af438409cc2e2b9dc023e6f0/src/test/apps/spa/src/App.tsx#L240-L291)
live [here](https://garronej.github.io/tss-react/), you can also run it locally with [`yarn start_spa`](https://github.com/garronej/tss-react#development).

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

## `keyframes`

```typescript
// Reexport from @emotion/react
import { keyframes } from "tss-react";
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

By default, `tss-react` uses an emotion cache that you can access with
`import { getTssDefaultEmotionCache } from "tss-react"`.  
Now if you want `tss-react` to use a specific emotion cache you can provide it using
`import { TssCacheProvider } from "tss-react"`.

If you are using `tss-react` with mui v5, be aware that mui and tss can't share
the same cache. On top of that the cache used by mui should have `"prepend": true` and
the cache used by tss should have `"prepend": false`.

# Composition and nested selectors ( `$` syntax )

`tss-react` unlike `jss-react` doesn't support the `$` syntax but there's type safe alternatives that
achieve the same results.

## Selecting children by class name

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
const useStyles = makeStyles()((_theme, _params, createRef) => {
    const child = {
        "ref": createRef(),
        "background": "blue",
    } as const; //<- In many case 'as const' must be used so that it can be inferred as CSSObject

    return {
        "parent": {
            "padding": 30,
            [`&:hover .${child.ref}`]: {
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
or alongside `@material-ui` v5. You can find [here](https://github.com/garronej/tss-react/tree/main/src/test/apps/muiV4ssr)
a Next.js setup with `@material-ui` v4.

## With [Next.js](https://nextjs.org)

### If you don't have a `_document.tsx`

Just create a file `page/_document.tsx` as follow:

```tsx
import { createDocument } from "tss-react/nextJs";

const { Document } = createDocument();

/*
With mui v5 (or if you are using custom caches):

import { muiCache } from "...";

const { Document } = createDocument({ "caches": [ muiCache ] });

If you are providing custom caches to tss-react using <TssCacheProvider value={tssCache} >
you should pass it as well.

const { Document } = createDocument({ "caches": [ muiCache, tssCache ] });

Generally speaking all the emotion caches used in your app should be provided.
Just remember to first provide the caches used by mui then the caches used by tss. Example:

const { Document } = createDocument({ "caches": [ muiCache1, muiCache2, tssCache1, tssCache2 ] });
*/

export default Document;
```

You can find a working example [here](https://github.com/garronej/tss-react/tree/main/src/test/apps/ssr).

### **Or**, if you have have a `_document.tsx` but you haven't overloaded `getInitialProps`

<details>
  <summary>Click to expand</summary></br>

```tsx
import Document from "next/document";
import type { DocumentContext } from "next/document";
import { createGetInitialProps } from "tss-react/nextJs";

const { getInitialProps } = createGetInitialProps();

/*
With mui v5 (or if you are using custom caches):

import { muiCache } from "...";

const { getInitialProps } = createGetInitialProps({ "caches": [ muiCache ] });

If you are providing custom caches to tss-react using <TssCacheProvider value={tssCache} >
you should pass it as well.

const { getInitialProps } = createGetInitialProps({ "caches": [ muiCache, tssCache ] });

Generally speaking all the emotion caches used in your app should be provided.
Just remember to first provide the caches used by mui then the caches used by tss. Example:

const { getInitialProps } = createGetInitialProps({ "caches": [ muiCache1, muiCache2, tssCache1, tssCache2 ] });
*/

export default class AppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        return getInitialProps(ctx);
    }

    //...Rest of your class...
}
```

</details>

### **Or**, if you have have a `_document.tsx` and an overloaded `getInitialProps`

<details>
  <summary>Click to expand</summary></br>

```tsx
import Document from "next/document";
import type { DocumentContext } from "next/document";
import { createPageHtmlToStyleTags } from "tss-react/nextJs";

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags();
/*
With mui v5 (or if you are using custom caches):

import { muiCache } from "...";

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags({ "caches": [ muiCache ] });

If you are providing custom caches to tss-react using <TssCacheProvider value={tssCache} >
you should pass it as well.

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags({ "caches": [ muiCache, tssCache ] });

Generally speaking all the emotion caches used in your app should be provided.
Just remember to first provide the caches used by mui then the caches used by tss. Example:

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags({ "caches": [ muiCache1, muiCache2, tssCache1, tssCache2 ] });
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

</details>

## With any other framework

```bash
yarn add @emotion/server
```

```tsx
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";

import { getTssDefaultEmotionCache } from "tss-react/cache";
import { createMakeStyles } from "tss-react";

const emotionServers = [
    getTssDefaultEmotionCache(), //If you use custom cache(s) provide it/them here instead of the default, see example below.
].map(createEmotionServer);

/*
With mui v5 (or if you are using custom caches):

import { muiCache } from "...";

const emotionServers = [
    muiCache,
    getTssDefaultEmotionCache()
].map(createEmotionServer);

If you are providing custom caches to tss-react using <TssCacheProvider value={tssCache} >
you should pass it as well.

const emotionServers = [
    muiCache,
    tssCache
].map(createEmotionServer);

Generally speaking all the emotion caches used in your app should be provided.
Just remember to first provide the caches used by mui then the caches used by tss. Example:

const emotionServers = [
    muiCache1,
    muiCache2,
    tssCache1,
    tssCache2
].map(createEmotionServer);
*/

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
# This app is live here: https://garronej.github.io/tss-react/
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

## Compile error `TS1023`

If you get this error:

```log
node_modules/tss-react/index.d.ts:18:10 - error TS1023: An index signature parameter type must be either 'string' or 'number'.

18         [mediaQuery: `@media${string}`]: { [RuleName_1 in keyof ClassNameByRuleName]?: import("./types").CSSObject | undefined; };
            ~~~~~~~~~~
```

it means that you need to update TypeScript to a version >= 4.4.  
If you can't use `import { } from "tss-react/compat";` instead of `import { } from "tss-react"`.  
Only `withStyles()` will have slightly inferior type inference.

</details>
