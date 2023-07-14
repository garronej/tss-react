<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109334865-8f85bf00-7861-11eb-90ab-da36f9afe1b6.png">  
</p>
<p align="center">
    <i>✨ Dynamic CSS-in-TS styles engine, based on Emotion ✨</i>
    <br>
    <br>
    <a href="https://github.com/garronej/tss-react/actions">
      <img src="https://github.com/garronej/tss-react/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://www.npmjs.com/package/tss-react">
      <img src="https://img.shields.io/npm/dm/tss-react">
    </a>
    <a href="https://github.com/garronej/tss-react/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/tss-react">
    </a>
</p>
<p align="center">
  <a href="https://www.tss-react.dev">Home</a>
   - 
  <a href="https://docs.tss-react.dev">Documentation</a>
  -
  <a href="https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui%2FTssLogo.tsx">Playground</a>
</p>

-   ✅ Seamless integration with [MUI](https://mui.com).
-   ✅ Works in [Next.js App and Page Router](https://docs.tss-react.dev/ssr/next.js).
-   ✅ Dynamic Style Generation: With TSS, you can instantly generate styles based on the properties and internal states of components. Although [this currently limits RSC support](https://docs.tss-react.dev/ssr/next.js), the capabilities it offers are remarkable. In comparison, "no runtime" solutions such as [PandaCSS](https://panda-css.com/) or [Vanilla Extract](https://vanilla-extract.style/) may not meet the same flexibility. For an illustration of tasks simplified by TSS but complicated with "no runtime" solutions, refer to [this example](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui%2FTssLogo.tsx).
-   ✅ [`withStyles`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component) API support.
-   ✅ Offers a [type-safe equivalent of the JSS `$` syntax](https://docs.tss-react.dev/nested-selectors).
-   ✅ Custom `@emotion` cache support.
-   ✅ Build on top of [`@emotion/react`](https://emotion.sh/docs/@emotion/react), it has very little impact on the bundle size alongside mui (~5kB minziped).
-   ✅ [Maintained for the foreseeable future](https://github.com/mui-org/material-ui/issues/28463#issuecomment-923085976), issues are dealt with within good delays.
-   ✅ As fast as `emotion` ([see the difference](https://stackoverflow.com/questions/68383046/is-there-a-performance-difference-between-the-sx-prop-and-the-makestyles-functio)
    with mui's `makeStyles`)
-   ✅ Library authors: [`tss-react` won’t be yet another entry in your `peerDependencies`](https://docs.tss-react.dev/publish-a-module-that-uses-tss).

`'tss-react'` can be used as a replacement for
[@material-ui v4 `makeStyles`](https://material-ui.com/styles/basics/#hook-api) and [`'react-jss'`](https://cssinjs.org/react-jss/?v=v10.9.0).

The more ⭐️ the project gets, the more time I spend improving and maintaining it. Thank you for your support 😊

> While this module is written in TypeScript, using TypeScript in your application is optional
> (but recommended as it comes with outstanding benefits to both you and your codebase).

https://user-images.githubusercontent.com/6702424/166390575-0530e16b-4aff-4914-a8fa-20b02da829cc.mov

[![Playground](https://github.com/garronej/tss-react/assets/6702424/3a39d96b-b3d2-4068-a152-88b5957434ac)](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui%2FTssLogo.tsx)

<p align="center">
    <br/>
    <a href="https://docs.tss-react.dev/setup"><b>Get started 🚀</b></a>
</p>

# Changelog highlights

<details>
    <summary>Click to expand</summary>

## v4.7.0

-   Reduce bundle size when using Next.js Pages dir setup, fixes [#147](https://github.com/garronej/tss-react/issues/147)
    The \_app bundle sent to the client is down from ~160Kb to ~11Kb

## v4.5.0

-   Provide support for [Next 13 appDir](https://docs.tss-react.dev/ssr/next.js#app-dir).

## v4.3.0

-   Provide [an alternative setup](https://docs.tss-react.dev/troubleshoot-migration-to-muiv5-with-tss) for peoples
    experiencing styles inconsistencies after upgrading to MUI v5 using TSS.
-   [Better Next.js integration API](https://docs.tss-react.dev/ssr/next.js).

## v4.2.0

-   Re introduce [`<TssCacheProvider />`](https://docs.tss-react.dev/cache#use-a-specific-provider)

## v4.1.0

-   Publish an ESM distribution. Many thanks to [@jiby-aurum](https://github.com/jiby-aurum) for [he's help](https://github.com/garronej/tss-react/pull/105).
    This fixes many bug when working in [Vite](https://vitejs.dev/).

## v4.0.0

-   No need to provide an emotion cache explicitly, MUI and TSS can share the same emotion cache.  
    No special instruction to make TSS work with SSR.

## v3.7.1

-   Retrocompatibility with React 16. [Ref](https://github.com/garronej/tss-react/issues/95)

## v3.3.1

-   I.E is **almost** supported out of the box (See note at the end of [this sections](#nested-selectors---syntax-))

## Breaking changes in v3

-   New API for [nested selectors](#nested-selectors--syntax-). We no longer use `createRef()`.
-   [`label` have been renamed `name`](#naming-the-stylesheets-useful-for-debugging) for helping the migration from [the old mui API](https://mui.com/styles/api/#makestyles-styles-options-hook).
</details>

# Development

Running the demo apps:

```bash
git clone https://github.com/garronej/tss-react
cd tss-react
yarn
yarn build
npx tsc -w & npx tsc --module es2015 --outDir dist/esm -w
# Open another Terminal
yarn start_spa  # For testing in in a Create React App setup
yarn start_ssr # For testing in a Next.js setup
yarn start_appdir #  Next.js 13 setup in App directory mode
```

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
            "backgroundColor": theme.palette.primary.main
        },
        "label": ({ color }) => ({
            color
        })
    })
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
            "backgroundColor": theme.palette.primary.main
        },
        "label": { color }
    })
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
