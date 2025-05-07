import { transformCodebase } from "./tools/transformCodebase";
import { join as pathJoin } from "path";

function shimJsxElement(params: { distDirPath: string }) {
    const { distDirPath } = params;

    transformCodebase({
        srcDirPath: distDirPath,
        destDirPath: distDirPath,
        transformSourceCode: ({ fileRelativePath, sourceCode }) => {
            if (!fileRelativePath.endsWith(".d.ts")) {
                return { modifiedSourceCode: sourceCode };
            }

            let modifiedSourceCode = sourceCode.toString("utf8");

            modifiedSourceCode = modifiedSourceCode.replace(
                /JSX\.Element/g,
                'import("react").ReactElement<any, any>'
            );

            return {
                modifiedSourceCode: Buffer.from(modifiedSourceCode, "utf8")
            };
        }
    });
}

shimJsxElement({
    distDirPath: pathJoin(process.cwd(), "dist")
});
