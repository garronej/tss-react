# 🔍 API References

### Exposed APIs

```typescript
import {
    tss, //<- (only in 4.9.0-rc.4) The modern API 
    createTss, //<- (only in 4.9.0-rc.0) Create an instance of tss where your context, usualy a dynamic theme
              // is made available.  
    createMakeAndWithStyles, //<- Create an instance of makeStyles() and withStyles() for your theme.
                             // Favor using the Moden API for a better Devloper experience.
    keyframes, //<- The function as defined in @emotion/react and @emotion/css
    GlobalStyles, //<- A component to define global styles. 
} from "tss-react";
```

{% content-ref url="makestyles.md" %}
[makestyles.md](makestyles.md)
{% endcontent-ref %}

{% content-ref url="withstyles.md" %}
[withstyles.md](withstyles.md)
{% endcontent-ref %}

{% content-ref url="globalstyles.md" %}
[globalstyles.md](globalstyles.md)
{% endcontent-ref %}

{% content-ref url="keyframes.md" %}
[keyframes.md](keyframes.md)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
