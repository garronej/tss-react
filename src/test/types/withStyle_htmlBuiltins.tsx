import { createWithStyles } from "../../withStyles";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type {
    ClassAttributes,
    HTMLAttributes,
    DetailedHTMLFactory,
} from "react";

const theme = {
    "primaryColor": "blue",
} as const;

type Theme = typeof theme;

const { withStyles } = createWithStyles({
    "useTheme": () => theme,
});

type Props = ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;

{
    const DivStyled = withStyles("div", (theme, props) => {
        assert<Equals<typeof theme, Theme>>();
        assert<Equals<typeof props, Props>>();

        return {
            "root": {
                "backgroundColor": "red",
            },
        };
    });

    assert<
        Equals<
            typeof DivStyled,
            DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
        >
    >();
}

withStyles("div", {
    "root": {
        "position": "absolute",
    },
});

withStyles("div", {
    "root": {
        //@ts-expect-error
        "position": "absoluteXXX",
    },
});

//We wish it wouldn't pass
withStyles("div", {
    "root": {
        "position": "absolute",
    },
    "not_root": {},
});

withStyles("div", {
    "root": {
        //@ts-expect-error
        "color": 33,
    },
});

withStyles("div", {
    "root": {
        "position": "absolute",
    },
    "@media (min-width: 960px)": {
        "root": {
            "position": "absolute",
        },
    },
});

withStyles("div", {
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

withStyles("div", {
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

withStyles("div", {
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

withStyles("div", {
    "root": {
        "color": "red",
    },
    [`@media (min-width: ${960}px)` as const]: {
        "root": {
            "position": "absolute",
        },
    },
});

withStyles("div", {
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

withStyles("div", {
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

withStyles("div", () => ({
    "root": {
        "position": "absolute",
    },
}));

withStyles(
    "div",
    //@ts-expect-error
    () => ({
        "root": {
            "position": "absoluteXXX",
        },
    }),
);

withStyles(
    "div",
    //@ts-expect-error
    () => ({
        "root": {
            "color": 33,
        },
    }),
);

withStyles("div", () => ({
    "root": {
        "position": "absolute",
    },
    //Unfortunately passes 😞
    "not_root": {},
}));

withStyles("div", () => ({
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
    "div",
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
    "div",
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
    "div",
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

withStyles("div", () => ({
    "root": {
        "position": "absolute",
    },
    [`@media (min-width: ${960}px)` as const]: {
        "root": {
            "color": "red",
        },
    },
}));
