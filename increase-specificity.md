# 🎯 Increase specificity

You can abitratly increace specificity using `&`.\
The more you add, the more specific your selector will get.

For example, matchall selectors are very low specificity. Any other rule will overwrite them. Adding extra & ensures your custom style will get applied.

```diff
const useStyles = tss.create({
  row: {
    height: 50,
    cursor: "pointer",
-   "& > *": {
+   "&&& > *": {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    }
  }
});
```

You can use && everywhere:

```diff
const useStyles = tss.create({
  select: {
+   "&&": {
      width: 150,
      height: 32,
      padding: "6px 24px 6px 12px",
      boxSizing: "border-box",
      textAlign: "left",
      border: "1px solid #c7c7c7",
      borderRadius: 4,
      "&:focus": {
        borderRadius: 4,
        background: "#ffffff"
      }
+   }
  }
});
```
