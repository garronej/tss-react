//Customization level: 0
import { Document } from "tss-react/nextJs";

export default Document;
/*
//Customization level: 1
import Document from "next/document";
import type { DocumentContext } from "next/document";
import { getInitialProps } from "tss-react/nextJs";

export default class AppDocument extends Document {

	static async getInitialProps(ctx: DocumentContext) {
		return getInitialProps(ctx);
	}

}
*/

//Customization level: 2

/*
import Document from "next/document";
import type { DocumentContext } from "next/document";
import { pageHtmlToStyleTags } from "tss-react/nextJs";

export default class AppDocument extends Document {

	static async getInitialProps(ctx: DocumentContext) {

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

}
*/
