<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109334865-8f85bf00-7861-11eb-90ab-da36f9afe1b6.png">  
</p>
<p align="center">
    <i>✨ Like JSS but with better typing. Powered by emotion ✨</i>
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

- ✅  As fast as `emotion` (which is [mutch fater](https://github.com/mui-org/material-ui/issues/22342#issue-684407575) than JSS)
- ✅  As lightweight as `emotion/css`.
- ✅  Seamless integration with [material-ui](https://material-ui.com). Perfect for those who don't like [the switch to Styled API](https://github.com/mui-org/material-ui/issues/24513#issuecomment-763921350) in v5.


```bash
$ yarn add tss-react
#OR
$ npm install --save tss-react
```

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/109001373-28231000-76a5-11eb-8547-c2108a6411c9.gif">
</p>

# Quick start

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

    return (
        <span className={classNames.root}>
            hello world
        </span>
    );

}
```

`./useClassNames.ts`
```typescript
import { createUseClassNamesFactory } from "tss-react";

function useTheme(){
    return {
        "primaryColor": "blue";
    };
}

// material-ui users can pass in useTheme imported like: import { useTheme } from "@material-ui/core/styles"
export const { createUseClassNames } = createUseClassNamesFactory({ useTheme });
```

**Material-UI users only**, don't forget to enable [injectFirst](https://material-ui.com/styles/advanced/#injectfirst)

```tsx
import reactDom from "react-dom";
import { StylesProvider } from "@material-ui/core/styles";

reactDom.render(
    <StylesProvider injectFirst>
        <Root/>,
    </StylesProvider>,
    document.getElementById("root")
);

```

<p align="center">
    <i>Try it now:</i><br>
    <a href='https://stackblitz.com/edit/tss-react?file=Hello.tsx'>
        <img src="https://user-images.githubusercontent.com/6702424/109010505-214dca80-76b0-11eb-885e-2e5ef7ade821.png">
    </a>
</p>

# Why this instead of [`react-jss`](https://cssinjs.org/react-jss/?v=v10.5.1) or [the hook API](https://material-ui.com/styles/basics/#hook-api) of Material UI v4's styling solution? 

Let's see what's wrong with `react-jss`:

```tsx
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
- We shouldn't have to import [`createStyles`](https://material-ui.com/styles/api/#createstyles-styles-styles) to get correct typings.
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

# How to avoid bundling in another copy of `@emotion/css`

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

# API References

- `createUseClassNamesFactory()`
- Direct re-export of [`@emotion/css`](https://emotion.sh/docs/@emotion/css)

The three function that you should end up using the most are `css` any `cx`, reexported from `@emotion/css`, and 
`createUseClassNamesFactory`, the only function that this module actually implement. 

Consider this example to understand how `css`, `cx` and `useClassNames` are supposed to be
used together:

`MyButton.tsx`
```tsx
import { createUseClassNames } from "./useClassNames";
import { cx, css } from "tss-react";

export type Props ={
    text: string;
    onClick(): void;
    isDangerous: boolean;
    className?: string;
};

const { useClassesNames } = createUseClassNames<Props>()(
    (theme, { color })=>({
        "root": {
            "backgroundColor": isDangerous ? "red" : "grey"
        }
    })
);

export function MyButton(props: Props){

    const { className, onClick, text } = props;

    const { classesNames } = useClassesNames(props);

    return (
        <button 
            //You want to apply the styles in this order 
            //because the parent should be able ( with 
            //the className prop) to overwrite the internal 
            //styles ( classesNames.root )
            className={cx(classesNames.root, className)}
            onClick={onClick}
        >
            {text}
        </button>
    );

}
```

`App.tsx`
```tsx
import { css } from "tss-react";

function App(){

    return (
        <MyButton
            //The css function return a className, it let you
            //apply style directly on in the structure without
            //having to use createUseClassNames
            className={css({ "margin": 40 })}

            text="click me!"
            isDangerous={false}
            onClick={()=> console.log("click!")}
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

# Roadmap to v1

- [ ] Server side rendering compat ( e.g. Next.js project)
- [ ] Relying on `@emotion/react` istead of `@emotion/css` for better `@material-ui` v5 integration.
- [ ] [Support composition](https://github.com/garronej/tss-react/issues/2#issuecomment-875205410)
