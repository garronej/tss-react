

import Document from "next/document";
import type { DocumentContext } from "next/document";

import createEmotionServer from "@emotion/server/create-instance";
import htmlReactParserParse from "html-react-parser";
import { cache } from "./cache";

const { 
	extractCriticalToChunks, 
	constructStyleTagsFromChunks 
} = createEmotionServer(cache);

export function pageHtmlToStyleTags(
	params: {
		pageHtml: string;
	}
) {

	const { pageHtml } = params;

	const { html, styles } = extractCriticalToChunks(pageHtml);

	return htmlReactParserParse(
		constructStyleTagsFromChunks({
			html,
			styles
		})
	);

}

export async function getInitialProps(ctx: DocumentContext) {

	const page = await ctx.renderPage();

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		"styles":
			<>
				{initialProps.styles}
				{pageHtmlToStyleTags({ "pageHtml": page.html })}
			</>
	};

}

export class AppDocument extends Document {

	static async getInitialProps(ctx: DocumentContext) {
		return getInitialProps(ctx);

	}

}