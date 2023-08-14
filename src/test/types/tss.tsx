import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createTss } from "../../tss";
import { Reflect } from "tsafe/Reflect";
import type { Cx, Css } from "../../types";
import { tss as tssMui } from "../../mui";

type Context = {
    contextProp1: {
        _brand_context_prop1: unknown;
    };
    contextProp2: {
        _brand_context_prop2: unknown;
    };
};

const { tss } = createTss({
    "useContext": () => Reflect<Context>()
});

{
    assert<
        Equals<
            keyof typeof tss,
            | "createUseStyles"
            | "withParams"
            | "withName"
            | "withNestedSelectors"
        >
    >();

    const tss_1 = tss.withName("MyComponent");

    assert<
        Equals<
            keyof typeof tss_1,
            "createUseStyles" | "withParams" | "withNestedSelectors"
        >
    >();

    const tss_2 = tss_1.withParams<{ prop1: string }>();

    assert<
        Equals<keyof typeof tss_2, "createUseStyles" | "withNestedSelectors">
    >();

    const tss_3 = tss_2.withNestedSelectors<"foo" | "bar">();

    assert<Equals<keyof typeof tss_3, "createUseStyles">>();
}

{
    const useStyles = tss
        .withNestedSelectors<"xxx">()
        .createUseStyles(({ contextProp1, contextProp2, classes, ...rest }) => {
            assert<Equals<typeof contextProp1, Context["contextProp1"]>>();
            assert<Equals<typeof contextProp2, Context["contextProp2"]>>();
            assert<Equals<typeof classes, Record<"xxx", string>>>();
            assert<Equals<typeof rest, {}>>();

            return {
                "root": {
                    "backgroundColor": "red",
                    [`& .${classes.xxx}`]: {
                        "color": "white"
                    }
                },
                "xxx": {}
            };
        });

    const { classes, css, cx } = useStyles();

    assert<Equals<typeof classes, Record<"root" | "xxx", string>>>();
    assert<Equals<typeof css, Css>>();
    assert<Equals<typeof cx, Cx>>();

    useStyles({
        "classesFromProps": {
            "root": "xxx-yy"
        }
    });
}

{
    const useStyles = tss
        .withNestedSelectors<"xxx">()
        .withParams<{ prop1: { _brand_prop1: unknown } }>()
        .createUseStyles(
            ({ contextProp1, contextProp2, classes, prop1, ...rest }) => {
                assert<Equals<typeof contextProp1, Context["contextProp1"]>>();
                assert<Equals<typeof contextProp2, Context["contextProp2"]>>();
                assert<Equals<typeof prop1, { _brand_prop1: unknown }>>();
                assert<Equals<typeof classes, Record<"xxx", string>>>();
                assert<Equals<typeof rest, {}>>();

                return {
                    "root": {
                        "backgroundColor": "red",
                        [`& .${classes.xxx}`]: {
                            "color": "white"
                        }
                    },
                    "xxx": {}
                };
            }
        );

    // @ts-expect-error: Missing prop1
    useStyles();

    // @ts-expect-error: Missing prop1
    useStyles({});

    const { classes, css, cx } = useStyles({
        "prop1": {
            "_brand_prop1": true
        }
    });

    assert<Equals<typeof classes, Record<"root" | "xxx", string>>>();
    assert<Equals<typeof css, Css>>();
    assert<Equals<typeof cx, Cx>>();
}

{
    const useStyles = tssMui.createUseStyles({});

    useStyles({
        "classesFromProps": {},
        "muiStyleOverridesParams": {
            "ownerState": { "isOn": true },
            "props": {
                "lightBulbBorderColor": "yellow"
            }
        }
    });

    const { css, cx, theme, ...rest } = useStyles();

    assert<Equals<typeof rest, {}>>();
}

tss.createUseStyles(({ contextProp1, contextProp2, ...rest }) => {
    assert<Equals<typeof rest, {}>>();

    return {};
});
