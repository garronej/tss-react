# 🆘 Troubleshoot migration to MUIv5 with TSS

You upgraded to MUIv5 using tss-react but the somme styles doesn't apply the same way it uses to? &#x20;

You can try this:

```tsx
import { render } from "react-dom";
import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";

const muiCache = createCache({
    "key": "mui",
    "prepend": true
});

const tssCache = createCache({
    "key": "tss"
});

//NOTE: Don't use <StyledEngineProvider injectFirst/>
render(
    <CacheProvider value={muiCache}>
        <TssCacheProvider value={tssCache}> 
            <ThemeProvider theme={myTheme}>
                <Root />
            </ThemeProvider>
        <TssCacheProvider />
    </CacheProvider>,
    document.getElementById("root")
);
```

Explainations: tss-react ans MUI are supposed to be able to share the same emotion cache since tss-react v4. It's almost always the case but in [some edge cases](https://github.com/garronej/tss-react/issues/115) involeving MUI's internal styles media queries the styles dosen't apply in the same order than before. &#x20;

By explicitely telling MUI to use one cache and TSS to use another and by making sure the MUI styles comes before in the `<head />` (`prepend: true`) you ensure that TSS generated styles always overwrite the default styles. &#x20;

{% hint style="danger" %}
If you are in an SSR setup (Next.js for example) the fact that you are using two explicitly provided emotion caches makes it a bit more complex to set things up using [the MUI documentation about SSR](https://mui.com/material-ui/guides/server-rendering/) but it's still achievable.
{% endhint %}
