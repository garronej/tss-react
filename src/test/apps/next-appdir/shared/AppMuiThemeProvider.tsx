"use client";
import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";


const contextIsDark = createContext<{ isDark: boolean; setIsDark: (isDark: boolean) => void; } | undefined>(undefined);

export default function AppMuiThemeProvider(props: {
	children: React.ReactNode;
}) {

	const { children } = props;

	const [isDark, setIsDark] = useState(false);

	useEffect(
		() => {

			const rootColorSchemeStyleTagId = "root-color-scheme";

			document.getElementById(rootColorSchemeStyleTagId)?.remove();

			document.head.insertAdjacentHTML(
				"afterend",
				`<style id="${rootColorSchemeStyleTagId}">:root { color-scheme: ${isDark ? "dark" : "light"
				}; }</style>`
			);

		},
		[isDark]
	);

	const theme = useMemo(
		() => createTheme({
			"palette": {
				"mode": isDark ? "dark" : "light",
				"primary": {
					"main": "#32CD32" //Limegreen
				},
				"info": {
					"main": "#ffff00" //Yellow
				}
			},
			"typography": {
				"subtitle2": {
					"fontStyle": "italic"
				}
			},
			"components": {
				"TestingStyleOverrides": {
					"styleOverrides": {
						"lightBulb": ({ theme, ownerState: { isOn }, lightBulbBorderColor }: any) => ({
							"border": `1px solid ${lightBulbBorderColor}`,
							"backgroundColor": isOn ? theme.palette.info.main : "grey"
						})
					}

				}
			} as any
		}),
		[isDark]
	);

	const wrap = useMemo(
		() => ({ isDark, setIsDark }),
		[isDark]
	);

	return (
		<ThemeProvider theme={theme}>
			<contextIsDark.Provider value={wrap}>
				{children}
			</contextIsDark.Provider>
		</ThemeProvider>
	);

}

export function useIsDark() {
	const wrap = useContext(contextIsDark);

	if (wrap === undefined) {
		throw new Error("Not wrapped in provider");
	}

	return wrap;

}