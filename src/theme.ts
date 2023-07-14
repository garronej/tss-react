import { createThemeProvider, defaultGetTypographyDesc } from "onyxia-ui";

export const { ThemeProvider, useTheme, useStyles } = createThemeProvider({
	"getTypographyDesc": params => ({
		...defaultGetTypographyDesc(params),
		"fontFamily": '"Work Sans", sans-serif'
	})
}); 