import AppMuiThemeProvider from "../shared/AppMuiThemeProvider";
import { NextAppDirEmotionCacheProvider } from "tss-react/next";
//import { TssCacheProvider } from "tss-react";

export default function RootLayout({ children }: { children: JSX.Element }) {
	return (
		<html>
			<head>
			</head>
			<body>
				<NextAppDirEmotionCacheProvider options={{ "key": "css" }}>
					{/*<NextAppDirEmotionCacheProvider options={{ "key": "tss" }} CacheProvider={TssCacheProvider}>*/}
					<AppMuiThemeProvider>
						{children}
					</AppMuiThemeProvider>
					{/*</NextAppDirEmotionCacheProvider>*/}
				</NextAppDirEmotionCacheProvider>
			</body>
		</html>
	);
}
