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

          <GlSectionDivider />

          <GlCheckList
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
                "title": "Actively maintained and widely adopted",
                "IconOverride": createEmojiIcon("👥"),
                "description": `TSS [is used by thousands of dev teams](https://npmtrends.com/@remix-run/react-vs-solid-js-vs-tss-react). Issues are resolved swiftly, and the library will remain actively maintained for the foreseeable future.`
              },
              {
                "title": "Dynamic Style Generation (for better and for worse)",
                "IconOverride": createEmojiIcon("💫"),
                "description": `TSS enables to generate styles based on the props and internal states of components.  
                This unfortunately prevents us from supporting [Server Component (RSC)](https://nextjs.org/docs/getting-started/react-essentials#server-components) in Next.js.  
                We remain hopeful for future support of RSC, contingent on [the provision of a suitable solution by Vercel and React](https://github.com/vercel/next.js/blob/dc6c22c99117bb48beedc4eed402a57b21f03963/docs/02-app/01-building-your-application/04-styling/03-css-in-js.mdx#L10-L12).  
                If you need RSC support today, you can consider *zero runtime* solutions like Panda-CSS or Vanilla Extract, 
                but the expression of complex styles is significantly harder in this paradigm.
                `
              },
              {
                "title": "Your JSX remains readable",
                "IconOverride": createEmojiIcon("🤩"),
                "description": `Unlike other styling solution that tend to clutter the JSX, TSS enables [isolating the styles from the component structure](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo.tsx).  
                That been said, sometime it's just easier to inline the styles directly within your components, [TSS enables this as well](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo_intertwined.tsx).`
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
    return <div style={{ position: "relative", "top": 2, 
      fontSize: "1.5rem", "lineHeight": 1, "textAlign": "center"
   }}>{emoji}</div>;
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
