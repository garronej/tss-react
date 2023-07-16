import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlFooter } from "gitlanding/GlFooter";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlLogo } from "gitlanding/utils/GlLogo";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { ThemeProvider, useStyles } from "./theme";
import { GlArticle } from "gitlanding/GlArticle";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { TssPlayfulLogo } from "./TssPlayfulLogo";
import { useWindowInnerSize } from "powerhooks/useWindowInnerSize";
import { breakpointsValues } from "onyxia-ui";
import logoPngUrl from "./assets/logo.png";
import tssDemoMp4Url from "./assets/tss-demo-hevc-safari.mp4";
import tssDemoWebmUrl from "./assets/tss-demo-vp9-chrome.webm";
import trendingPngUrl from "./assets/tss-trending.png";

const repoUrl = "https://github.com/garronej/tss-react";

function App() {

  const { css } = useStyles();

  const { windowInnerWidth } = useWindowInnerSize();

  return (
    <GlTemplate
      header={
        <GlHeader
          title={<GlLogo className={css({ "visibility": "hidden" })} logoUrl={logoPngUrl} width={100} />}
          titleSmallScreen={<GlLogo className={css({ "visibility": "hidden" })} logoUrl={logoPngUrl} width={60} />}
          links={[
            {
              "label": "GitHub",
              "href": "#",
              "onClick": () => window.open(repoUrl, "_blank")
            },
            {
              "label": "Documentation",
              "href": "#",
              "onClick": () => window.open("https://docs.tss-react.dev", "_blank")
            },
            {
              "label": "Playground",
              "href": "#",
              "onClick": () => window.open("https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui%2FTssLogo.tsx", "_blank")
            }
          ]}
          enableDarkModeSwitch={true}
          githubButtonSize="large"
        />
      }
      headerOptions={{
        "position": "sticky",
        "isRetracted": "smart",
      }}
      body={
        <>
          <GlHero
            classes={{
              "textWrapper": css({
                "maxWidth": 1030
              }),
              "illustrationWrapper": css({ 
                "maxWidth": 460,
                ...(()=>{

                  if( windowInnerWidth < breakpointsValues.md ){
                    return {
                      "marginLeft": "auto",
                      "marginRight": "auto",
                    }
                  }

                  return undefined;

                })()

              }),
              "illustration": css({ "borderRadius": 10 })
            }}
            title={(()=>{

                  if( windowInnerWidth < breakpointsValues.md ){
                    return "CSS-in-TypeScript React solution";
                  }

                  return "A CSS-in-TypeScript solution";

            })()}
            subTitle="Effortlessly express sophisticated, dynamic styles in your React components ✨"
            illustration={{
              "type": "custom component",
              "Component": TssPlayfulLogo,
            }}
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
            classes={{
              "video": css({
                "borderRadius": 10
              })
            }}
            illustration={{
              "type": "video",
              "hasShadow": false,
              "sources":
                [
                  {
                    "src": tssDemoMp4Url,
                    "type": 'video/mp4; codecs="hvc1"',
                  },
                  {
                    "src": tssDemoWebmUrl,
                    "type": "video/webm",
                  },
                ]
            }}
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
            illustration={{
              "type": "image",
              "hasShadow": true,
              "src": trendingPngUrl
            }}
            hasAnimation={true}
            illustrationPosition="right"
          />

          <GlSectionDivider />


          <GlCheckList
            heading="Everything you are expecting and more"
            hasAnimation={true}
            Icon={() => null}
            elements={[
              {
                "title": "Works great with [`MUI`](https://mui.com)",
                "IconOverride": createEmojiIcon("🤝"),
                "description": `MUI provides [a step-by-step guide, along with a codemod tool](https://mui.com/guides/migration-v4/#2-use-tss-react), for transitioning from MUI version 4 to version 5 using TSS.  
                You don't have to use MUI to use TSS, TSS is a standalone solution, but the two libraries are a great match.`,  
              },
              {
                "title": "Next.js App Router support",
                "IconOverride": createEmojiIcon("🔧"),
                "description": `Setting 
                  up TSS (and MUI) to work with Next.js's SSR is a breeze. You just need to wrap your app withing our [\`<NextAppDirEmotionCacheProvider/>\`](https://docs.tss-react.dev/ssr/next.js).  
                  MUI is using [our provider](https://github.com/mui/material-ui/blob/4036eb60b45c260e9f49904f1b54f8c947a944d2/examples/material-next-app-router-ts/src/components/ThemeRegistry/EmotionCache.tsx#L20-L21).  
                `
              },
              {
                "title": "**S**erver **S**ide **R**endering support (SSR)",
                "description": `Quick and easy [integration with Next.js 13](https://docs.tss-react.dev/ssr/next.js) (pagesDir and appDir).
            detailed instructions for integrating [with any other backend framework](https://docs.tss-react.dev/ssr/other-backend).`
              },
              {
                "title": "Equivalent for the `$` syntax",
                "description": `JSS's [Pseudo and Nested Selectors](https://cssinjs.org/jss-plugin-nested/?v=v10.9.0) are featured in a type-safe way. [Check the doc](https://docs.tss-react.dev/nested-selectors).`
              },
              {
                "title": "Build on top of `@emotion/react`",
                "description": `It has very little impact on the bundle size alongside mui (~5kB minziped, [\`@emotion/react\`](https://emotion.sh/docs/@emotion/react) is already included in mui). 
            You can control the Emotion cache \`tss-react\` will use.`
              },
              {
                "title": "Not another peer dependency",
                "description": `Library authors: \`tss-react\` won't be yet another entry in your \`peerDependencies\`. [See documentation](https://docs.tss-react.dev/publish-a-module-that-uses-tss).`
              },
            ]}
          />
        </>
      }

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
    />
  );
}

function createEmojiIcon(emoji: string) {


  function IconOverride() {
    return <div style={{ position: "relative", top: 2 }}>{emoji}</div>;
  }

  return IconOverride;

}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider >
      <App />
    </ThemeProvider>
  </StrictMode>
);
