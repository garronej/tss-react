import type * as React from "react";

// If not available (React 19+), fallback to this:
export type ReactHTML = {
    [K in keyof JSX.IntrinsicElements]: (
        props: JSX.IntrinsicElements[K]
    ) => React.ReactElement;
};
