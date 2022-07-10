# 🔍 API References

### Exposed APIs

```typescript
import {
    createMakeAndWithStyles, //<- Create an instance of makeStyles() and withStyles() for your theme.
    keyframes, //<- The function as defined in @emotion/react and @emotion/css
    GlobalStyles, //<- A component to define global styles.
    TssCacheProvider, //<- Provider to specify the emotion cache tss should use.
    useCssAndCx, //<- Access css and cx directly.
    //   (Usually you'll use useStyles returned by makeStyles or createMakeStyles for that purpose
    //    but if you have no theme in your project, it can come in handy.)
    useMergedClasses //<- Merge the internal classes an the one provided as props into a single classes object.
} from "tss-react";
```

{% content-ref url="makestyles-usestyles.md" %}
[makestyles-usestyles.md](makestyles-usestyles.md)
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

{% content-ref url="usemergedclasses.md" %}
[usemergedclasses.md](usemergedclasses.md)
{% endcontent-ref %}
