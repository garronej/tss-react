import { createWithStyles } from "../../withStyles";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import MuiButton from "@mui/material/Button";
import type { ButtonProps, ButtonClassKey } from "@mui/material/Button";
import React from "react";

const theme = {
    "primaryColor": "blue"
} as const;

type Theme = typeof theme;

const { withStyles } = createWithStyles({
    "useTheme": () => theme
});

{
    {
        const MyComponentStyled = withStyles(
            MuiButton,
            (theme, props, classes) => {
                assert<Equals<typeof theme, Theme>>();
                assert<Equals<typeof props, ButtonProps>>();
                assert<
                    Equals<typeof classes, Record<ButtonClassKey, string>>
                >();

                return {
                    "colorInherit": {
                        "position": "absolute" as const
                    }
                };
            }
        );

        assert<Equals<typeof MuiButton, typeof MyComponentStyled>>();
    }

    {
        type Props = {
            className?: string;
            classes?: {
                foo: string;
                bar: string;
                baz: string;
            };
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
                assert<
                    Equals<
                        typeof classes,
                        Record<keyof NonNullable<Props["classes"]>, string>
                    >
                >();

                return {
                    "root": {
                        "backgroundColor": "red"
                    }
                };
            }
        );

        assert<
            Equals<
                typeof MyClassBasedComponent,
                typeof MyClassBasedComponentStyled
            >
        >();
    }

    withStyles(MuiButton, {});

    withStyles(MuiButton, {
        "colorInherit": {
            "position": "absolute"
        }
    });

    withStyles(MuiButton, {
        "colorInherit": {
            //@ts-expect-error
            "color": 33
        }
    });

    withStyles(MuiButton, {
        "colorInherit": {
            //@ts-expect-error
            "position": "absoluteXXX"
        }
    });

    withStyles(MuiButton, {
        "colorInherit": {
            "position": "absolute"
        },
        //@ts-expect-error
        "ddd": {}
    });

    withStyles(MuiButton, {
        "colorInherit": {
            "position": "absolute"
        },
        "@media (min-width: 960px)": {
            "colorInherit": {
                "position": "absolute"
            }
        }
    });

    withStyles(MuiButton, {
        "colorInherit": {
            "position": "absolute"
        },
        "@media (min-width: 960px)": {
            //@ts-expect-error
            "xxx": {}
        }
    });

    withStyles(MuiButton, {
        "colorInherit": {
            "position": "absolute"
        },
        "@media (min-width: 960px)": {
            "colorInherit": {
                //@ts-expect-error
                "position": "absoluteXXX"
            }
        }
    });

    withStyles(MuiButton, {
        "colorInherit": {
            "position": "absolute"
        },
        "@media (min-width: 960px)": {
            "colorInherit": {
                //@ts-expect-error
                "color": 33
            }
        }
    });

    withStyles(
        MuiButton,
        //@ts-expect-error: needs as const
        () => ({
            "colorInherit": {
                "position": "absolute"
            }
        })
    );

    withStyles(MuiButton, () => ({
        "colorInherit": {
            "position": "absolute" as const
        }
    }));

    withStyles(MuiButton, () => ({
        "colorInherit": {
            "position": "absolute"
        } as const
    }));

    withStyles(
        MuiButton,
        () =>
            ({
                "colorInherit": {
                    "position": "absolute"
                }
            } as const)
    );

    withStyles(
        MuiButton,
        //@ts-expect-error
        () => ({
            "colorInherit": {
                "color": 33
            }
        })
    );

    withStyles(MuiButton, () => ({
        "colorInherit": {
            "position": "absolute" as const
        },
        //Unfortunately passes
        "ddd": {}
    }));

    withStyles(
        MuiButton,
        //@ts-expect-error: need a const
        () => ({
            "colorInherit": {
                "position": "absolute" as const
            },
            "@media (min-width: 960px)": {
                "colorInherit": {
                    "position": "absolute"
                }
            }
        })
    );

    withStyles(
        MuiButton,
        //@ts-expect-error
        () => ({
            "colorInherit": {
                "position": "absolute" as const
            },
            "@media (min-width: 960px)": {
                "colorInherit": {
                    "color": 33
                }
            }
        })
    );

    withStyles(MuiButton, () => ({
        "colorInherit": {
            "position": "absolute" as const
        },
        "@media (min-width: 960px)": {
            "colorInherit": {
                "position": "absolute" as const
            }
        }
    }));

    withStyles(
        MuiButton,
        () =>
            ({
                "colorInherit": {
                    "position": "absolute"
                },
                "@media (min-width: 960px)": {
                    "colorInherit": {
                        "position": "absolute"
                    }
                }
            } as const)
    );

    withStyles(MuiButton, () => ({
        "colorInherit": {
            "position": "absolute" as const
        },
        [`@media (min-width: ${960}px)`]: {
            "colorInherit": {
                "position": "absolute" as const
            }
        }
    }));

    withStyles(
        MuiButton,
        //@ts-expect-error
        () => ({
            "colorInherit": {
                "position": "absolute" as const
            },
            [`@media (min-width: ${960}px)`]: {
                "colorInherit": {
                    "color": 33
                }
            }
        })
    );
}
