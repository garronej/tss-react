import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createMakeStyles } from "../../makeStyles";

type Theme = {
    _theme_brand: unknown;
};

const { makeStyles } = createMakeStyles({
    "useTheme": () => null as unknown as Theme,
});

const useStyles = makeStyles<void, "xxx">()((theme, props, classes) => {
    assert<Equals<typeof classes, Record<"xxx", string>>>();
    assert<Equals<typeof props, void>>();
    assert<Equals<typeof theme, Theme>>();

    return {
        "root": {
            "backgroundColor": "red",
            [`& .${classes.xxx}`]: {
                "color": "white",
            },
        },
        "xxx": {},
    };
});

const { classes } = useStyles();

assert<Equals<typeof classes, Record<"root" | "xxx", string>>>();

{
    const useStyles = makeStyles()((_theme, _props, classes) => {
        assert<Equals<typeof classes, Record<never, string>>>();

        return {
            "root": {
                "backgroundColor": "red",
            },
        };
    });

    const { classes } = useStyles();

    assert<Equals<typeof classes, Record<"root", string>>>();
}

makeStyles<void, "xxx">()(
    //@ts-expect-error: "xxx" should be added to the record of CSSObject
    (theme, props, refs) => ({
        "root": {
            "backgroundColor": "red",
        },
    }),
);

{
    const { makeStyles } = createMakeStyles({
        "useTheme": () => null as unknown as Theme,
    });

    const useStyles = makeStyles<void, "xxx">()({
        "root": {
            "backgroundColor": "red",
        },
        "xxx": {},
    });

    const { classes } = useStyles();

    assert<Equals<typeof classes, Record<"root" | "xxx", string>>>();
}
