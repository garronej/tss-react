# useMergedClasses

{% hint style="warning" %}
This API is not deprecated but the new recommended way is to do: &#x20;

```diff
-let { classes } = useStyles();
-classes = useMergedClasses(classes, props.classes);
+const { classes } = usesStyles(undefined, { props });
```

This would also work (mentioned just so you understand how it works): &#x20;

```typescript
const { classes } = usesStyles(
    undefined, 
    { "props": { "classes": props.classes } }
);
```
{% endhint %}

Merge the internal classes and the one that might have been provided as props into a single classes object.

{% hint style="info" %}
This is the new way for [Overriding styles - `classes` prop](https://v4.mui.com/styles/advanced/%23overriding-styles-classes-prop).  \
See [this issue](https://github.com/garronej/tss-react/issues/49).
{% endhint %}

```tsx
import { useMergedClasses } from "tss-react";

type Props = {
    //classes?: { foo?: string; bar?: string; };
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

function MyTestComponentForMergedClassesInternal(props: Props) {
    let { classes } = useStyles();
    classes = useMergedClasses(classes, props.classes);
    


    return (
        <div className={classes.foo}>
            <span className={classes.bar}>
                The background should be green, the box should have a dotted
                border and the text should be pink
            </span>
        </div>
    );
}

const useStyles = makeStyles()({
    "foo": {
        "border": "3px dotted black",
        "backgroundColor": "red"
    }
    "bar": {
        "color": "pink"
    }
});

//...

render(
    <MyTestComponentForMergedClassesInternal
        classes={{ "foo": css({ "backgroundColor": "green" }) }}
    />
);
```

[Result](https://user-images.githubusercontent.com/6702424/148137845-9e27e75c-2f3b-489f-a9b2-73e84ea0bafa.png)

{% hint style="warning" %}
NOTE: You may end up with eslint warnings [like this one](https://user-images.githubusercontent.com/6702424/148657837-eae48942-fb86-4516-abe4-5dc10f44f0be.png) if you deconstruct more that one item.\
Don't hesitate to disable `eslint(prefer-const)`: [Like this](https://github.com/thieryw/gitlanding/blob/b2b0c71d95cfd353979c86dfcfa1646ef1665043/.eslintrc.js#L17) in a regular project, or [like this](https://github.com/InseeFrLab/onyxia-web/blob/a264ec6a6a7110cb1a17b2e22cc0605901db6793/package.json#L133) in a CRA.
{% endhint %}
