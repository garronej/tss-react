# withStyles

It's like [the material-ui v4 higher-order component API](https://mui.com/styles/basics/#higher-order-component-api) but type safe by design.

![](https://user-images.githubusercontent.com/6702424/136705025-dadfff08-7d9a-49f7-8696-533ca38ec38f.gif)

**IMPORTANT NOTICE**: [Don't be afraid to use `as const`](https://github.com/garronej/tss-react/blob/0b8d83d0d49b1198af438409cc2e2b9dc023e6f0/src/test/types/withStyles\_classes.tsx#L112-L142) when you get red squiggly lines.

You can pass as first argument any component that accept a `className` props:

```tsx
function MyComponent(props: { className?: string; colorSmall: string }) {
    return (
        <div className={props.className}>
            The background color should be different when the screen is small.
        </div>
    );
}

const MyComponentStyled = withStyles(
    MyComponent, 
    (theme, props) => ({
        "root": {
            "backgroundColor": theme.palette.primary.main,
            "height": 100
        },
        "@media (max-width: 960px)": {
            "root": {
                "backgroundColor": props.colorSmall
            }
        }
    })
);
```

You can also pass a mui component like for example `<Button />` and you'll be able to overwrite [every rule name of the component](https://mui.com/api/button/#css) (it uses the `classes` prop).

```tsx
import Button from "@mui/material/Button";

const MyStyledButton = withStyles(Button, {
    "root": {
        "backgroundColor": "grey"
    }
    "text": {
        "color": "red"
    },
    "@media (max-width: 960px)": {
        "text": {
            "color": "blue"
        }
    }
});
```

It's also possible to start from a builtin HTML component:

```tsx
const MyAnchorStyled = withStyles("a", (theme, { href }) => ({
    "root": {
        "border": "1px solid black",
        "backgroundColor": href?.startsWith("https")
            ? theme.palette.primary.main
            : "red"
    }
}));
```

You can experiment with those examples [here](https://github.com/garronej/tss-react/blob/0b8d83d0d49b1198af438409cc2e2b9dc023e6f0/src/test/apps/spa/src/App.tsx#L240-L291) live [here](https://www.tss-react.dev/test/), you can also run it locally with [`yarn start_spa`](https://github.com/garronej/tss-react#development).
