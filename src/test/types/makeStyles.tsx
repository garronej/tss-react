import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createMakeStyles } from "../../makeStyles";

type Theme = {
    _theme_brand: unknown;
};

const { makeStyles } = createMakeStyles({
    "useTheme": () => null as unknown as Theme,
});

const useStyles = makeStyles({ "refs": ["xxx"] })((theme, props, refMap) => {
    assert<Equals<typeof refMap, Record<"xxx", string>>>();
    assert<Equals<typeof props, void>>();
    assert<Equals<typeof theme, Theme>>();

    return {
        "root": {
            "backgroundColor": "red",
            [`& .${refMap.xxx}`]: {
                "color": "white",
            },
        },
        "xxx": {},
    };
});

const { classes } = useStyles();

assert<Equals<typeof classes, Record<"root" | "xxx", string>>>();

{
    const useStyles = makeStyles()((_theme, _props, refMap) => {
        assert<Equals<typeof refMap, Record<never, string>>>();

        return {
            "root": {
                "backgroundColor": "red",
            },
        };
    });

    const { classes } = useStyles();

    assert<Equals<typeof classes, Record<"root", string>>>();
}

makeStyles({ "refs": ["xxx"] })(
    //@ts-expect-error: "xxx" should be added to the record of CSSObject
    (theme, props, refs) => ({
        "root": {
            "backgroundColor": "red",
        },
    }),
);
