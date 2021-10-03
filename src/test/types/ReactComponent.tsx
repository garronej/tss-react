
/* eslint-disable @typescript-eslint/ban-types */

import { Component } from "react";
import type { ReactComponent } from "../../tools/ReactComponent";
import { memo } from "react";
import Button from "@material-ui/core/Button";
import type { ButtonProps } from "@material-ui/core/Button";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

//declare function myFunction<Props>>(Component: ReactComponent<Props>): Props;

type ExtractProps<Component extends ReactComponent<any>> = Component extends ReactComponent<infer Props> ? Props : never;

{
	type MyComponentProps = { foo: string; bar?: string; }

	function MyComponent(_props: MyComponentProps) {
		return <div />;
	}

	assert<Equals<ExtractProps<typeof MyComponent>, MyComponentProps>>();

}

{

	type MyComponentProps = { foo: string; bar?: string; };

	const MyComponent = memo((_props: MyComponentProps) => {
		return <div />;
	});

	assert<Equals<ExtractProps<typeof MyComponent>, MyComponentProps>>();

}

{


	type MyComponentProps = {
		foo: string;
		bar?: string;
	};

	class MyComponent extends Component<MyComponentProps, any> {
	}

	assert<Equals<ExtractProps<typeof MyComponent>, MyComponentProps>>();

}

{

	type Props = ButtonProps;

	const Component = Button;

	assert<Equals<ExtractProps<typeof Component>, Props>>();

}


