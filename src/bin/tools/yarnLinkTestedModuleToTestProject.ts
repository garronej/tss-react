
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
				.filter(entry => entry !== ".bin"),
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
		"HOME": testedModuleProjectDirPath
	};

	child_process.execSync(
		`rm -rf ${testedModuleName} ${moduleNames.join(" ")}`,
		{ "cwd": pathJoin(env["HOME"]!, ".config", "yarn", "link") }
	);

	moduleNames.forEach(
		moduleName =>
			child_process.execSync(
				"yarn link",
				{
					"cwd": pathJoin(...[
						testedModuleProjectDirPath,
						"node_modules",
						...(
							moduleName.startsWith("@") ?
								moduleName.split("/") :
								[moduleName]
						)
					]),
					env
				}
			)
	);

	child_process.execSync(
		`yarn link`,
		{ "cwd": testedModuleProjectDirPath, env }
	);

	testProjectsDirPath.forEach(testProjectDirPath => {

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
