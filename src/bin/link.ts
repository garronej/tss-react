
import * as child_process from "child_process";
import { join as pathJoin } from "path";

const projectRootPath = pathJoin(__dirname, "..", "..");

const emotionSubModules = [
	"babel-plugin",
	"cache",
	"css",
	"hash",
	"memoize",
	"react",
	"serialize",
	"sheet",
	"unitless",
	"utils",
	"weak-memoize"
];
const emotionsModulesList = emotionSubModules
	.map(emotionSubModule => `@emotion/${emotionSubModule}`);

child_process.execSync(
	`rm -rf tss-react ${emotionsModulesList.map(s=> `\\${s}`).join(" ")}`,
	{ "cwd": pathJoin(process.env["HOME"]!, ".config","yarn","link")  }
);

emotionSubModules.forEach(
	emotionSubModule =>
		child_process.execSync(
			`yarn link`,
			{
				"cwd": pathJoin(
					projectRootPath,
					"node_modules",
					"@emotion",
					emotionSubModule
				)
			}
		)
);

child_process.execSync(
	`yarn link`,
	{ "cwd": projectRootPath }
);

["spa", "ssr"].forEach(appType =>
	child_process.execSync(
		`yarn link tss-react ${emotionsModulesList.join(" ")}`,
		{ "cwd": pathJoin(projectRootPath, "src", "test", appType) }
	)
);