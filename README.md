<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109334865-8f85bf00-7861-11eb-90ab-da36f9afe1b6.png">  
</p>
<p align="center">
    <i>✨ Dynamic CSS-in-TS solution, based on Emotion ✨</i>
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

-   🚀 Seamless integration with [MUI](https://mui.com).
-   🌐 Works in [Next.js App and Page Router](https://docs.tss-react.dev/ssr/next.js).
-   🙅‍♂️ No custom styling syntax to learn, no shorthand, just plain CSS.
-   💫 Dynamic Style Generation: With TSS, you can instantly generate styles based on the props and internal states of components. Although [this currently limits Server component support](https://docs.tss-react.dev/ssr/next.js), the capabilities it offers are remarkable. In comparison, "no runtime" solutions such as [PandaCSS](https://panda-css.com/) or [Vanilla Extract](https://vanilla-extract.style/) might offer improved performance and compatibility, yet they cannot match TSS when it comes to flexibility and effortless expression of sophisticated, dynamic style rules.
-   📚 Maintain clean, readable code by [isolating styles from your component structure](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo.tsx), or, for simpler designs, leverage the flexibility to [inline styles directly within your components](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo_intertwined.tsx).
-   🛡️ Eliminate CSS priority conflicts! With TSS you can determine the precedence of multiple classes applied to a component and [arbitrarily increase specificity of some rules](https://docs.tss-react.dev/increase-specificity).
-   🧩 Offers a [type-safe equivalent of the JSS `$` syntax](https://docs.tss-react.dev/nested-selectors).
-   ⚙️ Freely customize the underlying `@emotion` cache.
-   ✨ Improved [`withStyles`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component) API featured, to help you migrate away from @material-ui v4.
-   🛠️ Build on top of [`@emotion/react`](https://emotion.sh/docs/@emotion/react), it has very little impact on the bundle size alongside mui (~5kB minziped).
-   ⬆️ `'tss-react'` can be used as an advantageous replacement for [@material-ui v4 `makeStyles`](https://material-ui.com/styles/basics/#hook-api) and [`'react-jss'`](https://cssinjs.org/react-jss/?v=v10.9.0).
-   🎯 [Maintained for the foreseeable future](https://github.com/mui-org/material-ui/issues/28463#issuecomment-923085976), issues are dealt with within good delays.
-   📦 Library authors: [`tss-react` won’t be yet another entry in your `peerDependencies`](https://docs.tss-react.dev/publish-a-module-that-uses-tss).

[demo.webm](https://github.com/garronej/tss-react/assets/6702424/4d99be99-dff8-4efe-b131-b70682c96cf3)

> While this module is written in TypeScript, using TypeScript in your application is optional
> (but recommended as it comes with outstanding benefits to both you and your codebase).

<p align="center">
    <br/>
    <a href="https://docs.tss-react.dev/setup"><b>Get started 🚀</b></a>
</p>

The more ⭐️ the project gets, the more time I spend improving and maintaining it. Thank you for your support 😊

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
