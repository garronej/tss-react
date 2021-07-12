/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { join as pathJoin } from "path";
import { yarnLinkTestedModuleToTestProject } from "./tools/yarnLinkTestedModuleToTestProject";

const testedModuleProjectDirPath = pathJoin(__dirname, "..", "..");

yarnLinkTestedModuleToTestProject({
    testedModuleProjectDirPath,
    "testProjectsDirPath": ["spa", "ssr"].map(type =>
        pathJoin(testedModuleProjectDirPath, "src", "test", type),
    ),
});
