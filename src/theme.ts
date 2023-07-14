import { createThemeProvider, defaultGetTypographyDesc, defaultPalette } from "onyxia-ui";

export const palette: typeof defaultPalette = {
	...defaultPalette,
    "focus": {
        "main": "#007ACC",
        "light": "#33A2D9",
        "light2": "#85C5E5",
    },
    "dark": {
        "main": "#1F2933",
        "light": "#323F4B",
        "greyVariant1": "#3E4C59",
        "greyVariant2": "#52606D",
        "greyVariant3": "#7B8794",
        "greyVariant4": "#A1AEB7",
    },
    "light": {
        "main": "#F8F9FA",
        "light": "#FFFFFF",
        "greyVariant1": "#E4E7EB",
        "greyVariant2": "#CBD2D9",
        "greyVariant3": "#9AA5B1",
        "greyVariant4": "#6E7A88",
    }
};

export const { ThemeProvider, useTheme, useStyles } = createThemeProvider({
	palette,
	"getTypographyDesc": params => ({
		...defaultGetTypographyDesc(params),
		"fontFamily": '"Work Sans", sans-serif'
	}),
	"defaultIsDarkModeEnabled": true
}); 
