import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlFooter } from "gitlanding/GlFooter";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlLogo } from "gitlanding/utils/GlLogo";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { ThemeProvider } from "./theme";
import { GlArticle } from "gitlanding/GlArticle";
import { GlIllustration } from "gitlanding/GlIllustration";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import logoPngUrl from "./assets/logo.png";
import demoGifUrl from "./assets/demo.gif";
import nestedSelectorsMp4Url from "./assets/nestedSelectors_small.mp4";
import nestedSelectorsWebmUrl from "./assets/nestedSelectors_small-vp9-chrome.webm";
import trendingPngUrl from "./assets/tss-trending.png";

import { css } from "gitlanding";

const repoUrl = "https://github.com/garronej/tss-react";

function App() {
  return (
    <ThemeProvider>
      <GlTemplate
        header={
          <GlHeader
            title={<GlLogo logoUrl={logoPngUrl} width={100} />}
            titleSmallScreen={<GlLogo logoUrl={logoPngUrl} width={60} />}
            links={[
              {
                "label": "GitHub",
                "href": repoUrl
              },
              {
                "label": "Documentation",
                "href": "https://docs.tss-react.dev",
              },
              {
                "label": "Playground",
                "href": "https://stackblitz.com/edit/tss-react-wv2set?file=Hello.tsx,index.tsx,tss.ts"
              }
            ]}
            enableDarkModeSwitch={true}
            githubRepoUrl={repoUrl}
            githubButtonSize="large"
            showGithubStarCount={true}
          />
        }
        headerOptions={{
          "position": "sticky",
          "isRetracted": "smart",
        }}
        footer={
          <GlFooter
            bottomDivContent="[GitHub](https://github.com/garronej/tss-react) - [Documentation](https://github.com/garronej/tss-react)"
            links={[
              {
                "href": "https://www.npmjs.com/package/tss-react",
                "label": <img src="https://img.shields.io/npm/dw/tss-react" alt="" />
              },
              {
                "href": "https://github.com/garronej/tss-react/blob/main/LICENSE",
                "label": <img src="https://img.shields.io/npm/l/tss-react" alt="" />
              }
            ]}
          />
        }
      >
        <GlHero
          classes={{
            "textWrapper": css({
              "maxWidth": 1030
            }),
            "imageWrapper": css({ "maxWidth": 460 }),
            "image": css({ "borderRadius": 10 })
          }}
          title="The most reacty CSS in TS solution"
          subTitle="Just like JSS but type safe and powered by emotion 🚀"
          illustration={{
            "type": "image",
            "imageSrc": demoGifUrl
          }}
          hasIllustrationShadow={true}
          hasLinkToSectionBellow={true}
        />


        <GlArticle
          id="firstSection"
          title="🔩 State of the art TypeScript support"
          body={`Save yourself back and fourth between your code and the 
        documentation and refactor with confidence.  
        **Even used in vanilla JavaScript** project, you will benefit from the type inference.
        `}
          buttonLabel="Get started 🚀"
          buttonLink={{
            "href": "https://docs.tss-react.dev",
          }}
          illustration={
            <GlIllustration
              hasShadow={false}
              type="video"
              height={400}
              className={css({ "& video": { "borderRadius": 10 } })}
              sources={[
                {
                  "src": nestedSelectorsMp4Url,
                  "type": 'video/mp4; codecs="hvc1"',
                },
                {
                  "src": nestedSelectorsWebmUrl,
                  "type": "video/webm",
                },
              ]}
            />
          }
          hasAnimation={true}
          illustrationPosition="left"

        />

        <GlArticle
          id="firstSection"
          title="Stonks 📈"
          body={`People are using it.  
          ...mostly as a tool to migrate from [@material-ui v4 makeStyles](https://mui.com/system/styles/basics/#hook-api)
          but not only.  
          TSS react is a very competitive standalone styling solution that provide a great Developer Experience, flexibility and maintainability.`}
          buttonLabel="Compare download trend 👀"
          buttonLink={{
            "href": "https://npmtrends.com/@remix-run/react-vs-solid-js-vs-tss-react",
          }}
          illustration={
            <GlIllustration
              hasShadow={true}
              type="image"
              className={css({ "maxWidth": 300 })}
              url={trendingPngUrl}
            />
          }
          hasAnimation={true}
          illustrationPosition="right"

        />

        <GlSectionDivider />


        <GlCheckList
          heading="Everything you are expecting and more"
          hasAnimation={true}
          elements={[
            {
              "title": "Seamless integration with [`mui`](https://mui.com)",
              "description": `[\`tss-react\`](https://github.com/tss-react) is a recommended by the core MUI team as a good option for updating from 
            material-ui v4 to mui v5. Find the migration guide [here](https://mui.com/guides/migration-v4/#2-use-tss-react).
            Even [MUI theme styleOverrides](https://docs.tss-react.dev/mui-theme-styleoverrides) is supported!
            `
            },
            {
              "title": "[`withStyles`](https://docs.tss-react.dev/api-references/withstyles) API support",
              "description": `Contains everything you need for advantageously getting rid of 
            [\`@material-ui/core/styles\`](https://v4.mui.com/styles/basics/#material-ui-styles). It will feel like an upgrade.`
            },
            {
              "title": "**S**erver **S**ide **R**endering support (SSR)",
              "description": `Quick and easy [integration with Next.js 13](https://docs.tss-react.dev/ssr/next.js) (pagesDir and appDir).
            detailed instructions for integrating [with any other backend framework](https://docs.tss-react.dev/ssr/other-backend).`
            },
            {
              "title": "Equivalent for `$` syntax",
              "description": `JSS's [Pseudo and Nested Selectors](https://cssinjs.org/jss-plugin-nested/?v=v10.9.0) are featured in a type-safe way. [Check the doc](https://docs.tss-react.dev/nested-selectors).`
            },
            {
              "title": "Build on top of `@emotion/react`",
              "description": `It has very little impact on the bundle size alongside mui (~5kB minziped, [\`@emotion/react\`](https://emotion.sh/docs/@emotion/react) is already included int mui). 
            You can control the Emotion cache \`tss-react\` will use.`
            },
            {
              "title": "Not another peer dependency",
              "description": `Library authors: \`tss-react\` won't be yet another entry in your \`peerDependencies\`. [See documentation](https://docs.tss-react.dev/publish-a-module-that-uses-tss).`
            },
          ]}
        />

      </GlTemplate>
    </ThemeProvider>
  );
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
          <ThemeProvider >
              <App />
          </ThemeProvider>
  </StrictMode>
);
