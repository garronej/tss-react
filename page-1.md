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

{% content-ref url="api-references/makestyles-usestyles.md" %}
[makestyles-usestyles.md](api-references/makestyles-usestyles.md)
{% endcontent-ref %}

{% content-ref url="api-references/withstyles.md" %}
[withstyles.md](api-references/withstyles.md)
{% endcontent-ref %}

{% content-ref url="api-references/globalstyles.md" %}
[globalstyles.md](api-references/globalstyles.md)
{% endcontent-ref %}

{% content-ref url="api-references/keyframes.md" %}
[keyframes.md](api-references/keyframes.md)
{% endcontent-ref %}

{% content-ref url="api-references/usemergedclasses.md" %}
[usemergedclasses.md](api-references/usemergedclasses.md)
{% endcontent-ref %}
