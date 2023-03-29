# withStyles

It's like [the material-ui v4 higher-order component API](https://mui.com/styles/basics/#higher-order-component-api) but type safe by design.

![](https://user-images.githubusercontent.com/6702424/136705025-dadfff08-7d9a-49f7-8696-533ca38ec38f.gif)

{% hint style="info" %}
&#x20;[Using `as const`](https://github.com/garronej/tss-react/blob/0b8d83d0d49b1198af438409cc2e2b9dc023e6f0/src/test/types/withStyles\_classes.tsx#L112-L142) can often helps when you get red squiggly lines.
{% endhint %}

### With functional component

{% code title="MyComponent.tsx" %}
```tsx
import { withStyles } from "tss-react/mui";

type Props = {
    className?: string;cod
    classes?: Partial<Record<"root" | "label", string>>;
    colorSmall: string;
};

function MyComponent(props: Props) {

    const classes = withStyles.getClasses(props);

    return (
      {/* props.classeName and props.classes.root are merged, props.className get higher specificity */}
      <div className={classes.root}>
        <span className={classes.text}>The background color should be different when the screen is small.</span>
      </div>
    );
}

const MyComponentStyled = withStyles(
    MyComponent, 
    (theme, props) => ({
        root: {
            backgroundColor: theme.palette.primary.main,
            height: 100
        },
        text: {
            border: "1px solid red"
        },
        "@media (max-width: 960px)": {
            root: {
                backgroundColor: props.colorSmall
            }
        }
    })
);

export default MyComponentStyled;
```
{% endcode %}

```tsx
import MyComponent from "./MyComponent";

render(
    <MyComponent 
       className="foo bar"
       classes={{ text: "baz baz" }} 
       colorSmall="cyan" 
    />
);
```

### With class components

The main reason you would use `withStyles` over `makeStyles` is to support class based components.

{% code title="MyComponent.tsx" %}
```tsx
import * as React from "react";
import { withStyles } from "tss-react/mui";

export type Props ={
  className?: string;
  classes?: Partial<Record<"root" | "span", string>>;
  isBig: boolean;
};

class MyComponent extends React.Component<Props> {
  render() {
  
    const classes = withStyles.getClasses(this.props);

    return (
      {/* props.classeName and props.classes.root are merged, props.className get higher specificity */}
      <div className={classes.root}>
        <span className={classes.span}>The background color should be different when the screen is small.</span>
      </div>
    );
  }
}

const MyComponentStyled = withStyles(
  MyComponent, 
  (theme, props) => ({
      root: {
          backgroundColor: theme.palette.primary.main,
          height: props.isBig ? 100 : 50
      },
      span: {
        border: "1px solid red"
      },
      "@media (max-width: 960px)": {
          root: {
              backgroundColorf=: "red"
          }
      }
  })
);

export default MyComponentStyled;
```
{% endcode %}

```tsx
import MyComponent from "./MyComponent";

render(
    <MyComponent 
       className="foo bar" 
       classes={{ text: "baz baz" }} 
       colorSmall="cyan" 
    />
);
```

### With no classes props

Your component can also only have a `className` prop (and no `classes`).

{% code title="MyComponent.tsx" %}
```typescript
import * as React from "react";
import { withStyles } from "tss-react/mui";

export type Props ={
  className?: string;
  isBig: boolean;
};

class MyComponent extends React.Component<Props> {
  render() {
  
    const classes = withStyles.getClasses(this.props);

    return (
      
      <div className={classes.root}>
        The background color should be different when the screen is small.
      </div>
    );
  }
}

const MyComponentStyled = withStyles(
  MyComponent, 
  (theme, props) => ({
      "root": {
          "backgroundColor": theme.palette.primary.main,
          "height": props.isBig ? 100 : 50
      },
      "@media (max-width: 960px)": {
          "root": {
              "backgroundColor": "red"
          }
      }
  })
);

export default MyComponentStyled;
```
{% endcode %}

```tsx
import MyComponent from "./MyComponent";

render(
    <MyComponent 
       className="foo bar"
       colorSmall="cyan" 
    />
);
```

### With a MUI component

You can also pass a mui component like for example `<Button />` and you'll be able to overwrite [every rule name of the component](https://mui.com/api/button/#css) (it uses the `classes` prop).

<pre class="language-tsx"><code class="lang-tsx">import Button from "@mui/material/Button";
import { withStyles } from "tss-react/mui";

const MyStyledButton = withStyles(Button, {
    root: {
        backgroundColor: "grey"
    }
    text: {
        color: "red"
    },
<strong>    "@media (max-width: 960px)": {
</strong>        text: {
            color: "blue"
        }
    }
});
</code></pre>

What's very powerfull about the withStyles API it it's capable to infer the type of the nested overwritable classes, example: &#x20;

<figure><img src="../.gitbook/assets/nestedSelectors_small.46ae0227.gif" alt=""><figcaption></figcaption></figure>

```tsx
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { withStyles } from "tss-react/mui";

const MyBreadcrumbs = withStyles(
    Breadcrumbs,
    (theme, props, classes) => {
        ol: {
            [`& .${classes.separator}`]: {
                color: theme.palette.primary.main
            }
        }
    }
);
```

### With an base HTML component

```tsx
import { withStyles } from "tss-react/mui";

const MyAnchorStyled = withStyles("a", (theme, { href }) => ({
    root: {
        border: "1px solid black",
        backgroundColor: href?.startsWith("https")
            ? theme.palette.primary.main
            : "red"
    }
}));
```

You can experiment with those examples [here](https://github.com/garronej/tss-react/blob/0b8d83d0d49b1198af438409cc2e2b9dc023e6f0/src/test/apps/spa/src/App.tsx#L240-L291) live [here](https://www.tss-react.dev/test/), you can also run it locally with [`yarn start_spa`](https://github.com/garronej/tss-react#development).

### Naming the stylesheets (useful for debugging and [theme style overrides](../mui-global-styleoverrides.md))

To ease debugging you can specify a name that will appear in every class names. It is like the [`option.name` in material-ui v4's `makeStyles`](https://mui.com/styles/api/#makestyles-styles-options-hook).

It's also required to for [theme style overrides](../mui-global-styleoverrides.md).

```typescript
import { withStyles } from "tss-react/mui";

const MyDiv = withStyles("div", {
  root: {
    /* ... */
  }
}, { name: "MyDiv" });

//The class apllied to the div will be like: "css-xxxxxx-MyDiv-root"
```

### Use in place of styled &#x20;

If you want to use withStyles instead of styled for the extra type safety it provides: &#x20;

Before:&#x20;

```tsx
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';

const StyledPopper = styled(Popper)({
  border: '1px solid red',
  '& .Mui-autoComplete-listBox': {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0
    }
  },
  "@media (max-width: 960px)": {
    color: "blue"
  }
});
```

After (just wrap everything into `root`): &#x20;

```typescript
import { withStyles } from 'tss-react/mui';
import Popper from '@mui/material/Popper';

const StyledPopper = withStyles(Popper, {
  root: {
    border: '1px solid red',
    '& .Mui-autoComplete-listBox': {
      boxSizing: 'border-box',
      '& ul': {
        padding: 0,
        margin: 0
      }
    },
    "@media (max-width: 960px)": {
      color: "blue"
    }
  }
});
```
