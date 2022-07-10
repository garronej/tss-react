# 🍭 MUI Theme styleOverrides

TSS Support [MUI Global style overrides from `createTheme`](https://mui.com/customization/theme-components/%23global-style-overrides)  out of the box.  Previously in material-ui v4 it was: [global theme overrides](https://v4.mui.com/customization/components/#global-theme-override).

By default, however, only the `theme` object is passed to the callbacks, if you want to pass the correct `props`, and a specific `ownerState` have a look at the following example: &#x20;

`MyComponent.tsx`

```typescript
export type Props = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    lightBulbBorderColor: string;
}

function MyComponent(props: Props) {

    const { className } = props;

    const [isOn, toggleIsOn] = useReducer(isOn => !isOn, false);

    const { classes, cx } = useStyles(undefined, { props, "ownerState": { isOn } });

    return (
        <div className={cx(classes.root, className)} >
            <div className={classes.lightBulb}></div>
            <button onClick={toggleIsOn}>{`Turn ${isOn?"off":"on"}`}</button>
            <p>Div should have a border, background should be white</p>
            <p>Light bulb should have black border, it should be yellow when turned on.</p>
        </div>
    );

}

//NOTE: you can also write { "name": "MyComponent" }
const useStyles = makeStyles({ "name": { MyComponent } })(theme => ({
    "root": {
        "border": "1px solid black",
        "width": 500,
        "height": 200,
        "position": "relative",
        "color": "black"
    },
    "lightBulb": {
        "position": "absolute",
        "width": 50,
        "height": 50,
        "top": 120,
        "left": 500/2 - 50,
        "borderRadius": "50%"
    }
}));
```

{% hint style="info" %}
You can also write `makeStyles({ "name": "MyComponent" })`, see [specific doc](page-1/makestyles-usestyles.md#naming-the-stylesheets-useful-for-debugging-and-theme-styleoverrides).
{% endhint %}

Declaration of the theme: &#x20;

```typescript
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    "components": {
        //@ts-ignore: It's up to you to define the types for your library
        "MyComponent": {
            "styleOverrides": {
                "lightBulb": ({ theme, ownerState: { isOn }, lightBulbBorderColor })=>({
                    "border": `1px solid ${lightBulbBorderColor}`,
		    "backgroundColor": isOn ? theme.palette.info.main : "grey"
                })
            }		
        }
    }
});

render(
    <MuiThemeProvider theme={theme}>
    {/*...*/}
    </MuiThemeProvider>
);
```

Usage of the component: &#x20;

```tsx

import { useStyles } from "tss-react/mui";

function App(){
    const { css } = useStyles();
    return (
        <TestingStyleOverrides 
            className={css({ "backgroundColor": "white" })}
            classes={{
                "root": css({
                    "backgroundColor": "red",
                    "border": "1px solid black"
                })
            }}
            lightBulbBorderColor="black"
        />
    );
}
```

Result: &#x20;

![](https://user-images.githubusercontent.com/6702424/159143760-85f2c42d-602d-4aad-a3f0-9338ff6e8c76.gif)

You can see the code [here](https://github.com/garronej/tss-react/tree/main/src/test/apps/spa) and it's live [here](https://www.tss-react.dev/test/) (near the bottom of the page). &#x20;
