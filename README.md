<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109334865-8f85bf00-7861-11eb-90ab-da36f9afe1b6.png">  
</p>
<p align="center">
    <i>✨ makeStyles is dead, long live makeStyles! ✨</i>
    <br>
    <br>
    <a href="https://github.com/garronej/tss-react/actions">
      <img src="https://github.com/garronej/tss-react/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://www.npmjs.com/package/tss-react">
      <img src="https://img.shields.io/npm/dw/tss-react">
    </a>
    <a href="https://github.com/garronej/tss-react/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/tss-react">
    </a>
</p>
<p align="center">
  <a href="https://www.tss-react.dev">Home</a>
   - 
  <a href="https://docs.tss-react.dev">Documentation</a>
</p>

`'tss-react'` is intended to be the replacement for
[@material-ui v4 `makeStyles`](https://material-ui.com/styles/basics/#hook-api) and [`'react-jss'`](https://cssinjs.org/react-jss/?v=v10.9.0).

-   ✅ Seamless integration with [mui](https://mui.com) and [material-ui v4](https://v4.mui.com/).
-   ✅ [`withStyles`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component) API support.
-   ✅ Server side rendering support (e.g: Next.js, Gatsby).
-   ✅ Offers a [type-safe equivalent of the JSS `$` syntax](https://docs.tss-react.dev/nested-selectors).
-   ✅ Custom `@emotion` cache support.
-   ✅ Build on top of [`@emotion/react`](https://emotion.sh/docs/@emotion/react), it has very little impact on the bundle size alongside mui (~5kB minziped).
-   ✅ [Maintained for the foreseeable future](https://github.com/mui-org/material-ui/issues/28463#issuecomment-923085976), issues are dealt with within good delays.
-   ✅ As fast as `emotion` ([see the difference](https://stackoverflow.com/questions/68383046/is-there-a-performance-difference-between-the-sx-prop-and-the-makestyles-functio)
    with mui's `makeStyles`)

```bash
$ yarn add tss-react @emotion/react
```

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/134704429-83b2760d-0b4d-42e8-9c9a-f287a3353c13.gif">
</p>

**JavaScript support**: [YES](https://github.com/garronej/tss-react/issues/28).

> If the API frustrate you in anyway feel free to [start a discussion ](https://github.com/garronej/tss-react/discussions) 💬  
> If you like TSS consider giving the project a ⭐️

<p align="center">
    <br/>
    <i>Playground:</i><br>
    <a href='https://stackblitz.com/edit/tss-react?file=Hello.tsx'>
        <img src="https://user-images.githubusercontent.com/6702424/109010505-214dca80-76b0-11eb-885e-2e5ef7ade821.png">
    </a>
</p>

<p align="center">
    <br/>
    <a href="https://docs.tss-react.dev/setup"><b>Get started 🚀</b></a>
</p>

# Development

```bash
yarn
yarn build
#For automatically recompiling when file change
#npx tsc -w

# To start the Single Page Application test app (create react app)
# This app is live here: https://www.tss-react.dev/test/
yarn start_spa

# To start the Server Side Rendering app (next.js)
yarn start_ssr

# To start the Server Side Rendering app that test the mui v4 integration.
yarn start_muiV4
```

In SSR everything should work with [JavaScript disabled](https://developer.chrome.com/docs/devtools/javascript/disable/)

# Changelog highlights

<details>
    <summary>Click to expand</summary>

## v3.3.1

-   I.E is **almost** supported out of the box (See note at the end of [this sections](#nested-selectors---syntax-))

## Breaking changes in v3

-   New API for [nested selectors](#nested-selectors--syntax-). We no longer use `createRef()`.
-   [`label` have been renamed `name`](#naming-the-stylesheets-useful-for-debugging) for helping the migration from [the old mui API](https://mui.com/styles/api/#makestyles-styles-options-hook).
</details>

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
