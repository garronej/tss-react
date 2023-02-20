/* eslint-disable react/display-name */
import { useEffect } from "react";
import { createUseSsrGlobalState } from "powerhooks/useSsrGlobalState";
import { updateSearchBarUrl, retrieveParamFromUrl } from "powerhooks/tools/urlSearchParams";
import Head from "next/head";

export const { useIsDarkModeEnabled, withIsDarkModeEnabled } = createUseSsrGlobalState({
	"name": "isDarkModeEnabled",
	"getValueSeverSide": appContext => {

		const { theme } = appContext.router.query;

		if (typeof theme !== "string") {
			return undefined;
		}

		switch (theme) {
			case "dark": return { "value": true };
			case "light": return { "value": false };
		}

		return undefined;

	},
	"getInitialValueServerSide": () => ({
		"doFallbackToGetInitialValueClientSide": true,
		"initialValue": false
	}),
	"getInitialValueClientSide": () =>
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches,
	"Head": ({ isDarkModeEnabled }) => {

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {

			const result = retrieveParamFromUrl({
				"url": window.location.href,
				"name": "theme"
			});

			if (!result.wasPresent) {
				return;
			}

			updateSearchBarUrl(result.newUrl);

		}, []);


		return (
			<Head>
				<style>{`
				:root {
					color-scheme: ${isDarkModeEnabled ? "dark" : "light"}
				}
			`}</style>
			</Head>
		);
	}
});
