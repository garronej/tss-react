/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as child_process from "child_process";
import { join as pathJoin } from "path";
import * as fs from "fs";
import { arrPartition } from "evt/tools/reducers/partition";

export function yarnLinkTestedModuleToTestProject(params: {
    testedModuleProjectDirPath: string;
    testProjectsDirPath: string[];
}) {
    const { testedModuleProjectDirPath, testProjectsDirPath } = params;

    const parsedPackageJson = JSON.parse(
        fs.readFileSync(pathJoin(testedModuleProjectDirPath, "package.json")).toString("utf8"),
    );

    const testedModuleName = parsedPackageJson["name"];

    const moduleNames = (() => {
        const [namespaceModuleNames, standaloneModuleNames] = arrPartition(
            fs
                .readdirSync(pathJoin(testedModuleProjectDirPath, "node_modules"))
                .filter(entry => !entry.startsWith(".")),
            moduleName => moduleName.startsWith("@"),
        );

        return [
            ...namespaceModuleNames
                .map(namespaceModuleName =>
                    fs
                        .readdirSync(
                            pathJoin(testedModuleProjectDirPath, "node_modules", namespaceModuleName),
                        )
                        .map(submoduleName => `${namespaceModuleName}/${submoduleName}`),
                )
                .reduce((prev, curr) => [...prev, ...curr], []),
            ...standaloneModuleNames,
        ];
    })();

    const env = {
        ...process.env,
        "HOME": pathJoin(testedModuleProjectDirPath, ".yarn_home"),
    };

    child_process.execSync(`mkdir -p ${env["HOME"]}`);

    const total = moduleNames.length;

    let current = 0;

    moduleNames.forEach(moduleName => {
        current++;

        console.log(`${current}/${total} ${moduleName}`);

        const [srcPath, targetPath] = [
            [testedModuleProjectDirPath, "node_modules"],
            [env["HOME"], ".config", "yarn", "link"],
        ].map(pathStart =>
            pathJoin(
                ...[
                    ...pathStart,
                    ...(moduleName.startsWith("@") ? moduleName.split("/") : [moduleName]),
                ],
            ),
        );

        if (fs.existsSync(targetPath)) {
            return;
        }

        child_process.execSync("yarn link", { "cwd": srcPath, env });
    });

    fs.writeFileSync(
        pathJoin(testedModuleProjectDirPath, "dist", "package.json"),
        Buffer.from(
            JSON.stringify(
                {
                    ...parsedPackageJson,
                    "main": parsedPackageJson["main"].replace(/^dist\//, ""),
                    "types": parsedPackageJson["types"].replace(/^dist\//, ""),
                },
                null,
                2,
            ),
            "utf8",
        ),
    );

    testProjectsDirPath.forEach(testProjectDirPath => {
        console.log(`Installing ${testProjectDirPath} dependencies`);

        child_process.execSync("yarn install", { "cwd": testProjectDirPath, env });

        console.log("Linking dependencies");

        child_process.execSync(`yarn link ${moduleNames.join(" ")}`, { "cwd": testProjectDirPath, env });

        {
            const path = pathJoin(testProjectDirPath, "node_modules", testedModuleName);

            child_process.execSync(`rm -rf ${path}`);

            child_process.execSync(
                [`ln -s`, pathJoin(testedModuleProjectDirPath, "dist"), path].join(" "),
            );
        }
    });

    console.log("DONE");
}
