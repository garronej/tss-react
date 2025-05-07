<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109334865-8f85bf00-7861-11eb-90ab-da36f9afe1b6.png">  
</p>
<p align="center">
    <i>✨ Dynamic CSS-in-TS solution, based on Emotion ✨</i>
    <br>
    <br>
    <a href="https://github.com/garronej/tss-react/actions">
      <img src="https://github.com/garronej/tss-react/actions/workflows/ci.yaml/badge.svg">
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

You can think of `tss-react` as `@emotion/jss`.  
It's, in essence, a type-safe equivalent of [the JSS API](https://cssinjs.org/?v=v10.10.0#react-jss-example) but powered by Emotion,
just like `@emotion/styled` is the [styled-components API](https://styled-components.com/) but powered by Emotion.

-   🚀 Seamless integration with [MUI](https://mui.com).
-   🌐 Works in [Next.js App and Page Router](https://docs.tss-react.dev/ssr/next.js).
-   🙅‍♂️ No custom styling syntax to learn, no shorthand, just plain CSS.
-   💫 Dynamic Style Generation: TSS enables to generate styles based on the props and internal states of components.  
    This unfortunately prevents us from supporting [Server Component (RSC)](https://nextjs.org/docs/getting-started/react-essentials#server-components) in Next.js.  
    We remain hopeful for future support of RSC, contingent on [the provision of a suitable solution by Vercel and React](https://github.com/vercel/next.js/blob/dc6c22c99117bb48beedc4eed402a57b21f03963/docs/02-app/01-building-your-application/04-styling/03-css-in-js.mdx#L10-L12).  
    If you need RSC support today, you can consider _zero runtime_ solutions like Panda-CSS or Vanilla Extract,
    but the expression of complex styles is significantly harder in this paradigm.
-   📚 Your JSX remains readable. Unlike other styling solution that tend to clutter the JSX, TSS enables [isolating the styles from the component structure](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo.tsx).  
    That been said, sometime it's just easier to inline the styles directly within your components, [TSS enables this as well](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo_intertwined.tsx).
-   🛡️ Eliminate CSS priority conflicts! With TSS you can determine the precedence of multiple classes applied to a component and [arbitrarily increase specificity of some rules](https://docs.tss-react.dev/increase-specificity).
-   🧩 Offers a [type-safe equivalent of the JSS `$` syntax](https://docs.tss-react.dev/nested-selectors).
-   ⚙️ Freely customize the underlying `@emotion` cache.
-   ✨ Improved [`withStyles`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component) API featured, to help you migrate away from @material-ui v4.
-   🛠️ Build on top of [`@emotion/react`](https://emotion.sh/docs/@emotion/react), it has very little impact on the bundle size alongside mui (~5kB minziped).
-   ⬆️ `'tss-react'` can be used as an advantageous replacement for [@material-ui v4 `makeStyles`](https://material-ui.com/styles/basics/#hook-api) and [`'react-jss'`](https://cssinjs.org/react-jss/?v=v10.9.0).
-   🎯 [Maintained for the foreseeable future](https://github.com/mui-org/material-ui/issues/28463#issuecomment-923085976), issues are dealt with within good delays.
-   📦 Library authors: [`tss-react` won’t be yet another entry in your `peerDependencies`](https://docs.tss-react.dev/publish-a-module-that-uses-tss).

[demo.webm](https://github.com/garronej/tss-react/assets/6702424/feedb0fc-dd80-46b3-b22f-90d5dd2b36e4)

> While this module is written in TypeScript, using TypeScript in your application is optional
> (but recommended as it comes with outstanding benefits to both you and your codebase).

<p align="center">
    <br/>
    <a href="https://docs.tss-react.dev/setup"><b>Get started 🚀</b></a>
</p>

The more ⭐️ the project gets, the more time I spend improving and maintaining it. Thank you for your support 😊

Needless to mention, this library is heavily inspired by [JSS](https://cssinjs.org/react-jss), the OG CSS-in-JS solution.

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

## Security contact information

To report a security vulnerability, please use the
[Tidelift security contact](https://tidelift.com/security).
Tidelift will coordinate the fix and disclosure.
