import { createThemeProvider, defaultGetTypographyDesc } from "onyxia-ui";

export const { ThemeProvider, useTheme } = createThemeProvider({
	"getTypographyDesc": params => ({
		...defaultGetTypographyDesc(params),
		"fontFamily": '"Work Sans", sans-serif'
	})
}); 