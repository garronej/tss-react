import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { StrictMode } from "react";
//NOTE: If makeStyles was located in src/app we would write: import { makeStyles } from "app/makeStyles";
import { useStyles } from "makeStyles";
import { App } from "./App";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createRoot } from "react-dom/client";
import createCache from "@emotion/cache";

const muiCache = createCache({
    "key": "mui",
    "prepend": true
});

const theme = createTheme({
    "palette": {
        "primary": {
            "main": "#32CD32" //Limegreen
        },
        "info": {
            "main": "#ffff00" //Yellow
        }
    },
    "typography": {
        "subtitle2": {
            "fontStyle": "italic"
        }
    },
    "components": {
        //@ts-ignore
        "TestingStyleOverrides": {
            "styleOverrides": {
                "lightBulb": ({ theme, ownerState: { isOn }, lightBulbBorderColor }: any) => ({
                    "border": `1px solid ${lightBulbBorderColor}`,
                    "backgroundColor": isOn ? theme.palette.info.main : "grey"
                })
            }

        }
    }
});

function Root() {

    const { css } = useStyles();

    return <App className={css({ "boxShadow": "10px 5px 5px teal" })} />;

}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CacheProvider value={muiCache}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Root />
            </MuiThemeProvider>
        </CacheProvider>
    </StrictMode>
);
