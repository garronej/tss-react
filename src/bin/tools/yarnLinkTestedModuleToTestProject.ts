
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as child_process from "child_process";
import { join as pathJoin } from "path";
import * as fs from "fs";
import { arrPartition } from "evt/tools/reducers/partition";

export function yarnLinkTestedModuleToTestProject(
	params: {
		testedModuleProjectDirPath: string;
		testProjectsDirPath: string[];
	}
) {

	const {
		testedModuleProjectDirPath,
		testProjectsDirPath,
	} = params;


	const testedModuleName =
		JSON.parse(
			fs.readFileSync(
				pathJoin(testedModuleProjectDirPath, "package.json")
			).toString("utf8")
		)["name"];

	const moduleNames = (() => {

		const [namespaceModuleNames, standaloneModuleNames] = arrPartition(
			fs.readdirSync(pathJoin(testedModuleProjectDirPath, "node_modules"))
				.filter(entry => !entry.startsWith(".")),
			moduleName => moduleName.startsWith("@")
		);

		return [
			...namespaceModuleNames
				.map(namespaceModuleName =>
					fs.readdirSync(pathJoin(testedModuleProjectDirPath, "node_modules", namespaceModuleName))
						.map(submoduleName => `${namespaceModuleName}/${submoduleName}`)
				)
				.reduce((prev, curr) => [...prev, ...curr], []),
			...standaloneModuleNames
		];

	})();

	const env = {
		...process.env,
		"HOME": pathJoin(testedModuleProjectDirPath, ".yarn_home")
	};

	child_process.execSync(`mkdir -p ${env["HOME"]}`);

	const total = moduleNames.length;

	let current = 0;

	moduleNames.forEach(moduleName => {

		current++;

		console.log(`${current}/${total} ${moduleName}`);

		const [srcPath, targetPath] = [
			[testedModuleProjectDirPath, "node_modules"],
			[env["HOME"], ".config", "yarn", "link"]
		].map(pathStart => pathJoin(...[
			...pathStart,
			...(
				moduleName.startsWith("@") ?
					moduleName.split("/") :
					[moduleName]
			)
		]));

		if (fs.existsSync(targetPath)) {
			return;
		}

		child_process.execSync(
			"yarn link",
			{ "cwd": srcPath, env }
		);

	});

	console.log("Following warning can be safely ignored:");

	child_process.execSync(
		`yarn link`,
		{ "cwd": testedModuleProjectDirPath, env }
	);

	testProjectsDirPath.forEach(testProjectDirPath => {

		console.log(`Installing ${testProjectDirPath}`);

		child_process.execSync(
			"yarn install",
			{ "cwd": testProjectDirPath, env }
		);

		child_process.execSync(
			`yarn link ${testedModuleName} ${moduleNames.join(" ")}`,
			{ "cwd": testProjectDirPath, env }
		);

	});

}
