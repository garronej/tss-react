# tss - the Modern API

## useStyles

```tsx
import { useStyles } from "tss-react" // or "tss-react/mui";

function MyComponent(){

    const { 
        css, //<- Like the css function of @emotion/css
        cx   //<- Like the cx function of @emotion/css, also known as clsx. It's smarter though, classes that comes last take priority.
    } = useStyles();

    return (
        <div className={cx(css({ backgroundColor: "black" }), "myClassName")}>
            <span className={css({ color: "red" })}>
                Hello World
            </span>
        </div>
    );

}
```

## tss.create(...)

`tss.create(...)` enables to separate the definition of styles from their usage.

```tsx
import { tss } from "tss-react";

function MyComponent(){

    const { cx, classes } = useStyles();

    return (
        <div className={cx(classes.root, "myClassName")}>
            <span className={classes.text}>
                Hello World
            </span>
        </div>
    );

}

const useStyles = tss.create({
    root: {
        backgroundColor: "black",
    },
    text: {
        color: "red",
    },
});
```

## tss.withParams()

`tss.withParams<O>()` enables to dynamically generate styles based on parameters.

```tsx
import { useState } from "react";
import { tss } from "tss-react";

function MyComponent(){

    const [clickCount, setClickCount] = useState(0);

    const { cx, classes } = useStyles({ 
        isClicked: clickCount > 0
    });

    return (
        <div 
            className={cx(classes.root, "myClassName")}
            onClick={() => setClickCount(clickCount + 1)}
        >
            <span className={classes.text}>
                {/* The text is red when the component has been clicked at least once */}
                Hello World
            </span>
        </div>
    );

}

const useStyles = tss
    .withParams<{ isClicked: boolean; }>()
    .create(({ isClicked }) => ({
        root: {
            backgroundColor: "black",
        },
        text: {
            color: isClicked ? "red" : "blue",
        }
    }));
```

## tss.withName(name)

Providing a name is useful when you open the debugger and want to quickly find the useStyles that generated a class name.

```tsx
import { tss } from "tss-react";

function MyComponent(){ ... }

const useStyles = tss
    .withName("MyComponent")
    // or .withName({ MyComponent }), if you pass an object, the first key is used as the name.
    .create(...);
```

## tss.withNestedSelectors<"a" | "b" | "c">()

Enables to writes styles that reference each other.

```tsx
import { tss } from "tss-react";

export function MyComponent() {

    const { classes, cx } = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.child}>
                The Background is green when the mouse is hover the parent.
            </div>
            <div className={cx(classes.child, classes.small)}>
                The Background is green when the mouse is hover the parent.
                I am smaller than the other child.
            </div>
        </div>
    );
}

const useStyles = tss
    .withNestedSelectors<"child" | "small">()
    .create(({ classes }) => ({
        root: {
            padding: 30,
            [`&:hover .${classes.child}`]: {
                backgroundColor: "green"
            }
        },
        small: {},
        child: {
            border: "1px solid black",
            height: 50,
            [`&.${classes.small}`]: {
                height: 30
            }
        }
    }));
```

{% embed url="https://user-images.githubusercontent.com/6702424/150658036-89ad047b-1282-4892-a0b6-e8d555d5cad5.mp4" %}

The render of the above code

> WARNING: In SSR setups you must provide a unique name when using nested selectors. `tss.withName("SomethingUnique").withNestedSelectors<...>().create(...)`

## createTss()

`createTss()` enables to create a `tss` instance with a custom context.\
The context will be passed as argument to the function you provide to `tss.create(...)`.\
Let's see an example with a dark mode context:

`src/tss.ts`:

```ts
import { createContext } from "react";
import { createTss } from "tss-react";

const contextIsDarkMode = createContext<boolean | undefined>(undefined);

export function useContextIsDarkMode(){
    const isDarkMode = useContext(contextIsDarkMode);
    if(isDarkMode === undefined){
        throw new Error("You must wrap your app with a <Provider> of contextIsDarkMode");
    }
    return isDarkMode;
}

export const DarkModeProvider = contextIsDarkMode.Provider;

export const { tss } = createTss({
    useContext: function useContext(){
        const isDarkMode = useContextIsDarkMode();
        return { isDarkMode };
    }
});
```

`src/MyComponent.tsx`:

```tsx
import { tss } from "./tss";

function MyComponent(){

    const { cx, classes, isDarkMode } = useStyles();

    return (
        <div className={cx(classes.root, "myClassName")}>
            <span className={classes.text}>
                Hello World
            </span>
        </div>
    );

}

const useStyles = tss.create(({ isDarkMode }) => ({
    root: {
        backgroundColor: isDarkMode ? "black" : "white",
    },
    text: {
        color: isDarkMode ? "white" : "black",
    },
}));
```
