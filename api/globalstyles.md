# \<GlobalStyles />

Sometimes you might want to insert global css. You can use the `<GlobalStyles />` component to do this.&#x20;

It's `styles` (with an s) prop should be of same type as the [`css()`](makestyles.md#usestyles) function argument or you can use string interpolation (see below). &#x20;

```tsx
import { GlobalStyles } from "tss-react";
import { useStyles } from "tss-react/mui";

function MyComponent() {

    const { theme } = useStyles();

    return (
        <>
            <GlobalStyles
                styles={{
                    "body": {
                        "backgroundColor": theme.palette.background.default,
                    },
                    ".foo": {
                        "color": "cyan"
                    },
                }}
            />
            <h1 className="foo">This text will be cyan</h1>
        </>
    );
}
```

Use string interpolation, for example to import font face: &#x20;

```tsx
<GlobalStyles
  styles={`
    @import url(${typography.fontFace.import});
  `}
/>
```

{% hint style="info" %}
Is there a reason to use this instead of  `import GlobalStyles from "@mui/material/GlobalStyles";?`  \
[`No`](https://github.com/garronej/tss-react/issues/41#issuecomment-1040136212)&#x20;
{% endhint %}
