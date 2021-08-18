import { render } from "react-dom";
//NOTE: If makeStyles was located in src/app we would write: import { makeStyles } from "app/makeStyles";
import { useStyles } from "makeStyles";
import { App } from "./App";
import { CacheProvider } from "@emotion/react";
import { getCache } from "tss-react/cache";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    "palette": {
        "primary": {
            "main": "#32CD32"
        }
    }
});


function Root() {

    const { css } = useStyles();

    return <App className={css({ "boxShadow": "10px 5px 5px teal" })} />;

}

render(
    <CacheProvider value={getCache()}>
        <MuiThemeProvider theme={theme}>
            <Root />
        </MuiThemeProvider>
    </CacheProvider>,
    document.getElementById("root")
);