/* eslint-disable @typescript-eslint/ban-types */

import type { FC, ComponentClass } from "react";
import Button from "@material-ui/core/Button";
import type { ButtonProps } from "@material-ui/core/Button";

export type ReactComponent<Props> =
    | ((props: Props) => ReturnType<FC>)
    | ComponentClass<Props>;

function myFunction<Props extends Record<string, unknown>>(
    Component: ReactComponent<Props>,
): Props {
    return null as any;
}

myFunction(Button);

/*
const Component: ReactComponent<{ className: string; }> = ({ className })=> {
    return <div />;
};


function myFunction(
    Component: ReactComponent<{ className: string; }>
): void{
    console.log("foo");
}

function MyComponent3(props: { foo?: string; className: string; }) {
    return <div/>;
}

myFunction(MyComponent3);
*/
