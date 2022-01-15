import { createMakeAndWithStyles } from "../..";
import { mergeClasses } from "../../mergeClasses";
import type { Equals } from "tsafe";
import { assert } from "tsafe";

const { makeStyles } = createMakeAndWithStyles({
    "useTheme": () => ({}),
});

const useStyles = makeStyles()({
    "foo": {},
    "bar": {},
});

const { classes } = useStyles();

const classesFromProps:
    | {
          foo?: string;
          bar?: string;
          onlyOnProp?: string;
      }
    | undefined = null as any;

{
    const mergedClasses = mergeClasses(classes, classesFromProps, null as any);

    assert<
        Equals<
            typeof mergedClasses,
            {
                foo: string;
                bar: string;
                onlyOnProp?: string;
            }
        >
    >();
}

{
    const mergedClasses = mergeClasses(classes, {}, null as any);

    assert<
        Equals<
            typeof mergedClasses,
            {
                foo: string;
                bar: string;
            }
        >
    >();
}

//@ts-expect-error
mergeClasses(classes, { "foo": 33 }, null as any);

{
    const mergedClasses = mergeClasses(
        classes,
        { "foo": "xxx", "somethingElse": "zzz" },
        null as any,
    );

    assert<
        Equals<
            typeof mergedClasses,
            {
                foo: string;
                bar: string;
                somethingElse?: string;
            }
        >
    >();
}
{
    const mergedClasses = mergeClasses(classes, undefined, null as any);

    assert<
        Equals<
            typeof mergedClasses,
            {
                foo: string;
                bar: string;
            }
        >
    >();
}
