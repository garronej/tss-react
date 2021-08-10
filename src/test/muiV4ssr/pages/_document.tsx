import Document from "next/document";
import type { DocumentContext } from "next/document";
import { createPageHtmlToStyleTags } from "tss-react/nextJs";
import { ServerStyleSheets } from '@material-ui/core/styles';

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags();
/*
If you use custom cache you should provide it here:

const { pageHtmlToStyleTags } = createPageHtmlToStyleTags({ "caches": [ cache1, cache2, ... ] });
*/

export default class AppDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {

		const sheets = new ServerStyleSheets();

		const originalRenderPage = ctx.renderPage.bind(ctx);

		ctx.renderPage = () =>
			originalRenderPage({
				"enhanceApp": App => props => sheets.collect(<App {...props} />),
			});

		const page = await ctx.renderPage();

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			"styles": (
				<>
					{initialProps.styles}
					{sheets.getStyleElement()}
					{pageHtmlToStyleTags({ "pageHtml": page.html })}
				</>
			),
		};
	}

	//...Rest of your class...
}