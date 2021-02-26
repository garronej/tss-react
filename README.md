<p align="center">
    <img src="
    https://user-images.githubusercontent.com/6702424/109330891-79293480-785c-11eb-9fc7-2567f460bf72.png
    ">  
</p>
<p align="center">
    <i>✨ Like JSS but for TypeScript. Powered by emotion ✨</i>
    <br>
    <br>
    <img src="https://github.com/garronej/tss-react/workflows/ci/badge.svg?branch=develop">
    <img src="https://img.shields.io/bundlephobia/minzip/tss-react">
    <img src="https://img.shields.io/npm/dw/tss-react">
    <img src="https://img.shields.io/npm/l/tss-react">
</p>


`'tss-react'` is intended to be a replacement for `'react-jss'`.  
It's API is focused on providing maximum type safety and minimum verbosity.  
This module is nothing but a tinny extension for [`@emotion/css`](https://emotion.sh/docs/@emotion/css).

- ✅  As fast as `emotion`
- ✅  As lightweight as `emotion/css`.
- ✅  Well integrated with [material-ui](https://material-ui.com). Perfect for those who don't like [the switch to Styled API](https://github.com/mui-org/material-ui/issues/24513#issuecomment-763921350) in v5.


```bash
$ yarn add tss-react
#OR
$ npm install --save tss-react
```

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109001373-28231000-76a5-11eb-8547-c2108a6411c9.gif">
</p>
<p align="center">
    <i>Try it now:</i><br>
    <a href='https://stackblitz.com/edit/tss-react?file=Hello.tsx'>
        <img src="https://user-images.githubusercontent.com/6702424/109010505-214dca80-76b0-11eb-885e-2e5ef7ade821.png">
    </a>
</p>

# Usage

`./MyComponent.tsx`
```typescript
import { createUseClassNames } from "./useClassNames";

const { useClassNames } = createUseClassNames<Props & { color: "red" | "blue" }>()({
   (theme, { color })=> ({
       "root": { 
           color,
           "&:hover": {
               "backgroundColor": "lightGrey"
           }
        }
   })
});

function MyComponent(props: Props){

    const [ color, setColor ]= useState<"red" | "blue">("red");

    const { classNames }=useClassNames({...props, color });

    return <span className={classNames.root}>hello world</span>;

}
```

`./useClassNames.ts`
```typescript
import { createUseClassNamesFactory } from "tss-react";

const theme = {
    "primaryColor": "blue";
};

function useTheme(){
    return theme;
}

// material-ui users can pass in useTheme imported like: import { useTheme } from "@material-ui/core/styles"
export const { createUseClassNames } = createUseClassNamesFactory({ useTheme });
```

# Why this instead of JSS? 

Consider this example use of JSS:

```tsx
//JSS in bundled in @material-ui
import { makeStyles, createStyles } from "@material-ui/core/styles";

type Props = {
    color: "red" | "blue";
};

const useStyles = makeStyles(
  theme => createStyles<"root" | "label">, Props>({
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

Many pain points:
- Because TypeScript doesn't support [partial argument inference](https://github.com/microsoft/TypeScript/issues/26242),
  we have to explicitly enumerate the classes name as an union type `"root" | "label"`.
- We shouldn't have to import `createStyles` to get correct typings.
- Inconsistent naming conventions `makeStyles -> useStyles -> classes`

Let's now compare with `tss-react`

```tsx
import { createUseClassNames } from "./useClassNames";

type Props = {
    color: "red" | "blue";
};

const { useClassNames } = createUseClassNames<Props>()(
  (theme, { color })=> ({
    "root": {
        "backgroundColor": theme.palette.primary.main
    },
    "label": { color }
  })
);

function MyComponent(props: Props){

    const { classNames } = useClassNames(props);

    return (
        <div className={classNames.root}>
            <span className={classNames.label}>
                Hello World
            </span>
        </div>
    );

}
```

Benefits: 
- Less verbose, same type safety.
- Consistent naming convention `createUseClassNames -> useClassNames -> classNames`.
- You don't need to remember how things are supposed to be named, just let intellisense guide you.

Besides, `JSS`, at least the version bundled into `material-ui`, have other problems:  
- One major bug: [see issue](https://github.com/mui-org/material-ui/issues/24513#issue-790027173)
- `JSS` has poor performances compared to `emotion` [source](https://github.com/mui-org/material-ui/issues/22342#issue-684407575)

# Why this instead of Styled component ?

See [this issue](https://github.com/mui-org/material-ui/issues/22342#issuecomment-764495033)

# Avoid bundling in another copy of `@emotion/css`

Internally this module makes use of the `css` function from `@emotion/css`. 
If you already have `@emotion/css` as dependency and want to make sure not 
to bundle `@emotion/css` twice you can provide your own copy of `css()`:

`./useClassNames.ts`
```typescript
import { createUseClassNamesFactory } from "tss-react/createUseClassNamesFactory";
import { css } from "@emotion/css";

...

export const { createUseClassNames } = createUseClassNamesFactory({ useTheme, css });
```

# API Reference

- `createUseClassNamesFactory()`
- Reexport everything all [`@emotion/css`](https://emotion.sh/docs/@emotion/css)
