
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as child_process from "child_process";
import { join as pathJoin } from "path";
import * as fs from "fs";
import { arrPartition } from "evt/tools/reducers/partition";
import { removeDuplicates } from "evt/tools/reducers/removeDuplicates";


export function yarnLinkTestedModuleToTestProject(
	params: {
		testedModuleProjectDirPath: string;
		testProjectsDirPath: string[];
		dependenciesToIgnore?: string[];
	}
) {

	const { 
		testedModuleProjectDirPath, 
		testProjectsDirPath, 
		dependenciesToIgnore=[] 
	} = params;




	const { moduleNames, packageName } = (() => {

		const parsedPackageJson =
			JSON.parse(
				fs.readFileSync(
					pathJoin(testedModuleProjectDirPath, "package.json")
				).toString("utf8")
			);

		const moduleNames = (() => {

			const [moduleNamesStartingWithAt, otherModuleNames] = arrPartition(
				["devDependencies", "dependencies"]
					.map(property => Object.keys(parsedPackageJson[property] ?? {}))
					.reduce((prev, curr) => [...prev, ...curr], [])
					.filter(moduleName => ![dependenciesToIgnore, "typescript", "lint-staged"].includes(moduleName)),
				moduleName => moduleName.startsWith("@")
			);

			return [
				...moduleNamesStartingWithAt
					.map(moduleName => moduleName.split("/")[0])
					.reduce(...removeDuplicates<string>())
					.map(atModuleName =>
						fs.readdirSync(pathJoin(testedModuleProjectDirPath, "node_modules", atModuleName))
							.map(submoduleName => `${atModuleName}/${submoduleName}`)
					)
					.reduce((prev, curr) => [...prev, ...curr], []),
				...otherModuleNames
			];

		})();

		const packageName = parsedPackageJson["name"];

		return { moduleNames, packageName };

	})();

	child_process.execSync(
		`rm -rf ${packageName} ${moduleNames.join(" ")}`,
		{ "cwd": pathJoin(process.env["HOME"]!, ".config", "yarn", "link") }
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
					])
				}
			)
	);

	child_process.execSync(
		`yarn link`,
		{ "cwd": testedModuleProjectDirPath }
	);

	testProjectsDirPath.forEach(testProjectDirPath => {

		child_process.execSync(
			"yarn", 
			{ "cwd": testProjectDirPath }
		);

		child_process.execSync(
			`yarn link ${packageName} ${moduleNames.join(" ")}`,
			{ "cwd": testProjectDirPath }
		);

	});

}
