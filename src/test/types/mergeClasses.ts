import { createMakeAndWithStyles } from "../..";
import { mergeClasses } from "../../mergeClasses";

const { makeStyles } = createMakeAndWithStyles({
    "useTheme": () => ({}),
});

const useStyles = makeStyles()({
    "foo": {},
    "bar": {},
});

const { classes } = useStyles();

const classesFromProps = {
    "foo": "xxx",
    "bar": "yyy",
    "somethingElse": "zzz",
};

mergeClasses(classes, classesFromProps, null as any);

mergeClasses(classes, {}, null as any);

//@ts-expect-error
mergeClasses(classes, { "foo": 33 }, null as any);

//@ts-expect-error
mergeClasses(classes, { "foo": "xxx", "somethingElse": "zzz" }, null as any);

mergeClasses(classes, undefined, null as any);
