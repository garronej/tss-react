

export type Props = {
	testDescription: string;
	classNameThatSetsBackgroundColorToLimeGreen: string;
};

export function BaseComponent(props: Props) {

	const { testDescription, classNameThatSetsBackgroundColorToLimeGreen } = props;

	return (
		<div style={{
			"border": "1px solid black",
			"borderRadius": 10,
			"backgroundColor": "lightgrey",
			"margin": 15,
			"width": "50%",
		}}>
			<h1>{testDescription}</h1>
			<div
				className={classNameThatSetsBackgroundColorToLimeGreen}
				style={{
					"height": 100,
					"width": 100,
					"margin": 15,
				}}
			>
				<p>This background should be green</p>
			</div>
		</div>
	);

}