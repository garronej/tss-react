---
description: >-
  Enable users of the components to overrides the internal styles by accepting a
  class props.
---

# 🦱 Your own classes prop

_Added in v3.6.0_

Every MUI components accepts a `classes` props that enables you override the internal styles ([see MUI's doc](https://mui.com/guides/api/#css-classes)). &#x20;

With TSS you can easily do the same for your components, it's done by merging the internal `classes` and the one that might have been provided as `props`.

{% hint style="info" %}
This is the new way for [Overriding styles - `classes` prop](https://v4.mui.com/styles/advanced/%23overriding-styles-classes-prop). &#x20;
{% endhint %}

```tsx

type Props = {
    //classes?: { foo?: string; bar?: string; };
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

function MyTestComponentForMergedClassesInternal(props: Props) {
    const { classes } = useStyles({ "color": "pink" }, { props });
    //NOTE: Only the classes will be read from props, 
    //you could write { props: { classes: props.classes } } instead of { props }
    //and it would work the same. 

    return (
        <div className={classes.foo}>
            <span className={classes.bar}>
                The background should be green, the box should have a dotted
                border and the text should be pink
            </span>
        </div>
    );
}

const useStyles = makeStyles<{ color: string; }>()({
    "foo": {
        "border": "3px dotted black",
        "backgroundColor": "red"
    }
    "bar": {
        color
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
