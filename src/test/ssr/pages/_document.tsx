

/*
import { AppDocument } from "tss-react/dist/nextJs";

export default AppDocument;
*/

import Document from "next/document";
import type { DocumentContext } from "next/document";
import { getInitialProps } from "tss-react/dist/nextJs";

export default class AppDocument extends Document {

	static async getInitialProps(ctx: DocumentContext) {
		return getInitialProps(ctx);
	}

}

/*
import Document from "next/document";
import type { DocumentContext } from "next/document";

import createEmotionServer from "@emotion/server/create-instance";
import htmlReactParserParse from "html-react-parser";
import { cache } from "../shared/cache";

const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

export default class AppDocument extends Document {

	static async getInitialProps(ctx: DocumentContext) {

		const page = await ctx.renderPage();

		let { html, styles } = extractCriticalToChunks(page.html);

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			"styles":
				<>
					{initialProps.styles}
					{htmlReactParserParse(constructStyleTagsFromChunks({ html, styles }))}
				</>
		};
	}

}
*/

/* @emotion/css
import Document from "next/document";
import type { DocumentContext } from "next/document";

import createEmotionServer from "@emotion/server/create-instance";
import { cache } from "@emotion/css";

const { extractCritical } = createEmotionServer(cache);

export default class AppDocument extends Document {

	static async getInitialProps(ctx: DocumentContext) {

		const { html } = await ctx.renderPage();

		const { ids, css } = extractCritical(html);

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			"styles":
				<>
					{initialProps.styles}
					<style
						data-emotion={`css ${ids.join(" ")}`}
						dangerouslySetInnerHTML={{ "__html": css }}
					/>
				</>
		};
	}

}
*/
