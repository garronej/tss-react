import { createWithStyles } from "../../withStyles";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type {
    DetailedHTMLFactory,
    AnchorHTMLAttributes,
    ClassAttributes,
} from "react";
import React from "react";

const theme = {
    "primaryColor": "blue",
} as const;

type Theme = typeof theme;

const { withStyles } = createWithStyles({
    "useTheme": () => theme,
});

type Props = {
    className?: string;
};

function MyComponent(_props: Props) {
    return <div />;
}

{
    const MyComponentStyled = withStyles(
        MyComponent,
        (theme, props, classes) => {
            assert<Equals<typeof theme, Theme>>();
            assert<Equals<typeof props, Props>>();
            assert<Equals<typeof classes, Record<"root", string>>>();

            return {
                "root": {
                    "backgroundColor": "red",
                },
            };
        },
    );

    assert<Equals<typeof MyComponent, typeof MyComponentStyled>>();
}

{
    const MyAnchor = withStyles("a", (theme, props, classes) => {
        assert<Equals<typeof theme, Theme>>();
        assert<
            Equals<
                typeof props,
                ClassAttributes<HTMLAnchorElement> &
                    AnchorHTMLAttributes<HTMLAnchorElement>
            >
        >();
        assert<Equals<typeof classes, Record<"root", string>>>();

        return {
            "root": {
                "backgroundColor": "red",
            },
        };
    });

    assert<
        Equals<
            DetailedHTMLFactory<
                AnchorHTMLAttributes<HTMLAnchorElement>,
                HTMLAnchorElement
            >,
            typeof MyAnchor
        >
    >();
}

{
    type Props = {
        className?: string;
        message: string;
    };

    class MyClassBasedComponent extends React.Component<
        Props,
        { count: number }
    > {
        render() {
            return (
                <div>
                    {" "}
                    {this.props.message} {this.state.count}{" "}
                </div>
            );
        }
    }

    const MyClassBasedComponentStyled = withStyles(
        MyClassBasedComponent,
        (theme, props, classes) => {
            assert<Equals<typeof theme, Theme>>();
            assert<Equals<typeof props, Props>>();
            assert<Equals<typeof classes, Record<"root", string>>>();

            return {
                "root": {
                    "backgroundColor": "red",
                },
            };
        },
    );

    assert<
        Equals<typeof MyClassBasedComponent, typeof MyClassBasedComponentStyled>
    >();
}

withStyles(MyComponent, {
    "root": {
        "position": "absolute",
    },
});

withStyles(MyComponent, {
    "root": {
        //@ts-expect-error
        "position": "absoluteXXX",
    },
});

//We wish it wouldn't pass
withStyles(MyComponent, {
    "root": {
        "position": "absolute",
    },
    "not_root": {},
});

withStyles(MyComponent, {
    "root": {
        //@ts-expect-error
        "color": 33,
    },
});

withStyles(MyComponent, {
    "root": {
        "position": "absolute",
    },
    "@media (min-width: 960px)": {
        "root": {
            "position": "absolute",
        },
    },
});

withStyles(MyComponent, {
    "root": {
        "position": "absolute",
    },
    "@media (min-width: 960px)": {
        "root": {
            //@ts-expect-error
            "position": "absoluteXXXX",
        },
    },
});

withStyles(MyComponent, {
    "root": {
        "position": "absolute",
    },
    "@media (min-width: 960px)": {
        "root": {
            //@ts-expect-error
            "color": 33,
        },
    },
});

withStyles(MyComponent, {
    "root": {
        //@ts-expect-error: very strange that error appears here if
        //we dont use as const for the media query
        "color": "red",
    },
    [`@media (min-width: ${960}px)`]: {
        "root": {
            "color": "red",
        },
    },
});

withStyles(MyComponent, {
    "root": {
        "color": "red",
    },
    [`@media (min-width: ${960}px)` as const]: {
        "root": {
            "position": "absolute",
        },
    },
});

withStyles(MyComponent, {
    "root": {
        "color": "red",
    },
    [`@media (min-width: ${960}px)` as const]: {
        "root": {
            //@ts-expect-error
            "position": "absoluteXXX",
        },
    },
});

withStyles(MyComponent, {
    "root": {
        "position": "absolute",
    },
    [`@media (min-width: ${960}px)` as const]: {
        "root": {
            //@ts-expect-error
            "color": 33,
        },
    },
});

withStyles(MyComponent, () => ({
    "root": {
        "position": "absolute",
    },
}));

withStyles(
    MyComponent,
    //@ts-expect-error
    () => ({
        "root": {
            "position": "absoluteXXX",
        },
    }),
);

withStyles(
    MyComponent,
    //@ts-expect-error
    () => ({
        "root": {
            "color": 33,
        },
    }),
);

withStyles(MyComponent, () => ({
    "root": {
        "position": "absolute",
    },
    //Unfortunately passes 😞
    "not_root": {},
}));

withStyles(MyComponent, () => ({
    "root": {
        "position": "absolute",
    },
    "@media (min-width: 960px)": {
        "root": {
            "position": "absolute",
        },
    },
}));

withStyles(
    MyComponent,
    //@ts-expect-error
    () => ({
        "root": {
            "position": "absolute",
        },
        "@media (min-width: 960px)": {
            "root": {
                "position": "absoluteXXX",
            },
        },
    }),
);

withStyles(
    MyComponent,
    //@ts-expect-error
    () => ({
        "root": {
            "position": "absolute",
        },
        "@media (min-width: 960px)": {
            "root": {
                "color": 33,
            },
        },
    }),
);

withStyles(
    MyComponent,
    //@ts-expect-error: need const
    () => ({
        "root": {
            "position": "absolute",
        },
        [`@media (min-width: ${960}px)`]: {
            "root": {
                "color": "red",
            },
        },
    }),
);

withStyles(MyComponent, () => ({
    "root": {
        "position": "absolute",
    },
    [`@media (min-width: ${960}px)` as const]: {
        "root": {
            "color": "red",
        },
    },
}));
