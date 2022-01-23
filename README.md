---
description: ✨ makeStyles is dead, long live makeStyles! ✨
---

# Why TSS

[![](https://github.com/garronej/tss-react/workflows/ci/badge.svg?branch=main) ](https://github.com/garronej/tss-react/actions)[![](https://img.shields.io/npm/dw/tss-react) ](https://www.npmjs.com/package/tss-react)[![](https://img.shields.io/npm/l/tss-react)](https://github.com/garronej/tss-react/blob/main/LICENSE)

`'tss-react'` is intended to be the replacement for [@material-ui v4 `makeStyles`](https://material-ui.com/styles/basics/#hook-api) and [`'react-jss'`](https://cssinjs.org/react-jss/?v=v10.9.0).

* ✅ Seamless integration with [MUI](https://mui.com) and [material-ui v4](https://v4.mui.com).
* ✅ [`withStyles`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component) API support.
* ✅ Server side rendering support (e.g: Next.js).
* ✅ Offers a type-safe equivalent of the JSS `$` syntax.
* ✅ Custom `@emotion` cache support.
* ✅ Build on top of [`@emotion/react`](https://emotion.sh/docs/@emotion/react), it has very little impact on the bundle size alongside MUI (\~5kB minziped).
* ✅ [Maintained for the foreseeable future](https://github.com/mui-org/material-ui/issues/28463#issuecomment-923085976), issues are dealt with within good delays.
* ✅ As fast as `emotion` ([see the difference](https://stackoverflow.com/questions/68383046/is-there-a-performance-difference-between-the-sx-prop-and-the-makestyles-functio) with MUI's `makeStyles`)

{% embed url="https://stackblitz.com/edit/tss-react?file=Hello.tsx" %}
