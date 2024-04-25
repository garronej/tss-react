# 💫 Nested selectors (ex $ syntax)

`tss-react` unlike `jss-react` doesn't support the `$` syntax but is a better alternative.

## With the Modern API and makeStyles API

In **JSS** you can do:

```jsx
//WARNING: This is legacy JSS code!
{
  "parent": {
      "padding": 30,
      "&:hover $child": {
          "backgroundColor": "red"
      },
  },
  "child": {
      "backgroundColor": "blue"
  }
}
//...
<div className={classes.parent}>
    <div className={classes.child}>
        Background turns red when the mouse is hovering over the parent
    </div>
</div>
```

![](https://user-images.githubusercontent.com/6702424/129976981-0637235a-570e-427e-9e77-72d100df0c36.gif)

This is how you would achieve the same result with `tss-react`

{% tabs %}
{% tab title="Modern API" %}
```tsx
export function MyComponent() {
    const { classes } = useStyles();

    return (
        <div className={classes.parent}>
            <div className={classes.child}>
                Background turns red when the mouse is hovering over the parent.
            </div>
        </div>
    );
}

const useStyles = tss
    .withName("MyComponent") // It's important to set a name in SSR setups
    .withNestedSelectors<"child">()
    .create(({ classes }) => ({
        "parent": {
            "padding": 30,
            [`&:hover .${classes.child}`]: {
                "backgroundColor": "red"
            }
        },
        "child": {
            "backgroundColor": "blue"
        },
    }));
```

Another example:

```tsx
export function MyComponent() {
    const { classes, cx } = useStyles({ "color": "primary" });

    return (
        <div className={classes.root}>
            <div className={classes.child}>
                The Background takes the primary theme color when the mouse is
                hovering over the parent.
            </div>
            <div className={cx(classes.child, classes.small)}>
                The Background takes the primary theme color when the mouse is
                hovering over the parent. I am smaller than the other child.
            </div>
        </div>
    );
}

const useStyles = tss
    .withName("MyComponent") 
    .withNestedSelectors<"child" | "small">()
    .withParams<{ color: "primary" | "secondary" }>()
    .create(({ theme, color, classes })=> ({
        root: {
            padding: 30,
            [`&:hover .${classes.child}`]: {
                backgroundColor: theme.palette[color].main
            }
        },
        small: {},
        child: {
            border: "1px solid black",
            height: 50,
            [`&.${classes.small}`]: {
                height: 30
            }
        }
    }));
```
{% endtab %}

{% tab title="makeStyles" %}
```tsx
export function App() {
    const { classes } = useStyles();

    return (
        <div className={classes.parent}>
            <div className={classes.child}>
                Background turns red when the mouse is hovering over the parent.
            </div>
        </div>
    );
}

const useStyles = makeStyles<void, "child">({
  uniqId: "QnWmDL" // In SSR setups, you must give an unique id to all
                   // your useStyles that uses nested selectors.
                   // See below for mor infos.  
})(
    (_theme, _params, classes) => ({
        "parent": {
            "padding": 30,
            [`&:hover .${classes.child}`]: {
                "backgroundColor": "red"
            }
        },
        "child": {
            "backgroundColor": "blue"
        },
    })
);
```

Another example:

```tsx
export function App() {
    const { classes, cx } = useStyles({ "color": "primary" });

    return (
        <div className={classes.root}>
            <div className={classes.child}>
                The Background takes the primary theme color when the mouse is
                hovering over the parent.
            </div>
            <div className={cx(classes.child, classes.small)}>
                The Background takes the primary theme color when the mouse is
                hovering over the parent. I am smaller than the other child.
            </div>
        </div>
    );
}

const useStyles = makeStyles<
    { color: "primary" | "secondary" },
    "child" | "small"
>({
  uniqId: "GnWmDK"
})((theme, { color }, classes) => ({
    "root": {
        "padding": 30,
        [`&:hover .${classes.child}`]: {
            "backgroundColor": theme.palette[color].main
        }
    },
    "small": {},
    "child": {
        "border": "1px solid black",
        "height": 50,
        [`&.${classes.small}`]: {
            "height": 30
        }
    }
}));
```
{% endtab %}
{% endtabs %}

{% embed url="https://user-images.githubusercontent.com/6702424/150658036-89ad047b-1282-4892-a0b6-e8d555d5cad5.mp4" %}
The render of the above code
{% endembed %}

> WARNING: Nested selectors requires [ES6 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Proxy) support which [IE doesn't support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Proxy#browser\_compatibility).\
> It can't be polyfilled ([this](https://github.com/GoogleChrome/proxy-polyfill) will not work) but don't worry, if `Proxy` is not available on a particular browser, no error will be thrown and TSS will still do its work.\
> Only nested selectors won't work.

## `withStyles`

{% embed url="https://user-images.githubusercontent.com/6702424/143791304-7705816a-4d25-4df7-9d45-470c5c9ec1bf.mp4" %}

## SSR

**NOTE: This does not apply to the Modern API**

In SSR setups, on stylesheets using nested selectors, you could end up with warnings like:

{% hint style="danger" %}
`Warning: Prop className did not match. Server: "tss-XXX-root-ref" Client: "tss-YYY-root-ref"`.
{% endhint %}

![Example of error you may run against with Next.js](.gitbook/assets/image.png)

You can fix this error by providing a unique id when calling `makeStyles` or `withStyles` (It will set XXX and YYY).

{% hint style="info" %}
Short unique identifiers can be generated with [this website](https://shortunique.id/).
{% endhint %}

```diff
 const useStyles = makeStyles<
     { color: "primary" | "secondary" },
     "child" | "small"
 >({
     name: "MyComponent"
+    uniqId: "QnWmDL"
 })((theme, { color }, classes) => ({
     "root": {
         "padding": 30,
         [`&:hover .${classes.child}`]: {
             "backgroundColor": theme.palette[color].main
         }
     },
     "small": {},
     "child": {
         "border": "1px solid black",
         "height": 50,
         [`&.${classes.small}`]: {
             "height": 30
         }
     }
 }));
 
  const MyBreadcrumbs = withStyles(
     Breadcrumbs,
     (theme, _props, classes) => ({
         "ol": {
             [`& .${classes.separator}`]: {
                 "color": theme.palette.primary.main
             }
         }
     }), 
     {
          name: "MyBreadcrumbs",
+         uniqId: "vZHt3n" 
     }
 );
```

withStyles:

<pre class="language-diff"><code class="lang-diff"> const MyDiv = withStyles("div", {
   "root": {
     /* ... */
   }
<strong> }, { 
</strong><strong>   name: "MyDiv",
</strong><strong>+  uniqId: "xDTt4n"
</strong><strong> });
</strong></code></pre>
