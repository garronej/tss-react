# 🔍 API References

### Exposed APIs

```typescript
import {
    createTss, //<- (From 4.9) The Modern API, you provide your context like a dynamic theme for example.
    tss, //<- The Modern API, to use when you don't have a dynamic theme object that you want to make available when you write your styles. 
    keyframes, //<- The function as defined in @emotion/react and @emotion/css
    GlobalStyles, //<- A component to define global styles. 
} from "tss-react";

import {
    tss // <- (From 4.9) The Modern API, that use the global MUI theme as context. It's also configured to enable global theme overrides on your custom components.  
    makeStyles, //<- A function similar to @material-ui/core/styles configured to use the global MUI theme.
    withStyles, //<- A function similar to @material-ui/core/styles configured to use the global MUI theme.
} from "tss-react/mui";
```



{% content-ref url="tss-usestyles.md" %}
[tss-usestyles.md](tss-usestyles.md)
{% endcontent-ref %}

{% content-ref url="globalstyles.md" %}
[globalstyles.md](globalstyles.md)
{% endcontent-ref %}

{% content-ref url="keyframes.md" %}
[keyframes.md](keyframes.md)
{% endcontent-ref %}

{% content-ref url="makestyles.md" %}
[makestyles.md](makestyles.md)
{% endcontent-ref %}

{% content-ref url="withstyles.md" %}
[withstyles.md](withstyles.md)
{% endcontent-ref %}
