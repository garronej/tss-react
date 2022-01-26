# \<GlobalStyles />

Sometimes you might want to insert global css. You can use the `<GlobalStyles />` component to do this.

It's `styles` (with an s) prop should be of same type as the [`css()`](makestyles-usestyles.md#usestyles) function argument.

```tsx
import { GlobalStyles } from "tss-react";

function MyComponent() {
    return (
        <>
            <GlobalStyles
                styles={{
                    "body": {
                        "backgroundColor": "pink",
                    },
                    ".foo": {
                        "color": "cyan",
                    },
                }}
            />
            <h1 className="foo">This text will be cyan</h1>
        </>
    );
}
```
