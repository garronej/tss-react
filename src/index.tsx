import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlFooter } from "gitlanding/GlFooter";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlLogo } from "gitlanding/utils/GlLogo";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { ThemeProvider, useStyles } from "./theme";
import { GlArticle } from "gitlanding/GlArticle";
import { GlButton } from "gitlanding/utils/GlButton";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { TssPlayfulLogo } from "./TssPlayfulLogo";
import { useWindowInnerSize } from "powerhooks/useWindowInnerSize";
import { breakpointsValues } from "onyxia-ui";
import logoPngUrl from "./assets/logo.png";
import tssDemoMp4Url from "./assets/tss-demo-hevc-safari.mp4";
import tssDemoWebmUrl from "./assets/tss-demo-vp9-chrome.webm";
import tssDemoBlueishMp4Url from "./assets/tss-demo-hevc-safari-blueish.mp4";
import tssDemoBlueishWebmUrl from "./assets/tss-demo-vp9-chrome-blueish.webm";

const repoUrl = "https://github.com/garronej/tss-react";

function App() {

  const { css, theme } = useStyles();

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
            classes={{
              "aside": css({
                "maxWidth": "min(calc(100vw - 2 * 10px), 1030px)",
              }),
            }}
            illustration={{
              "type": "video",
              "hasShadow": false,
              "controls": false,
              "loop": false,
              //"delayBeforeAutoPlay": 3000,
              "sources":
                [
                  {
                    "src":  theme.isDarkModeEnabled ? tssDemoBlueishMp4Url : tssDemoMp4Url,
                    "type": 'video/mp4; codecs="hvc1"',
                  },
                  {
                    "src": theme.isDarkModeEnabled ? tssDemoBlueishWebmUrl : tssDemoWebmUrl,
                    "type": "video/webm",
                  },
                ]
            }}
            hasAnimation={true}
          />
          <GlButton 
            href="https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui%2FTssLogo.tsx"
            doOpenNewTabIfHref={true}
            className={
              css({
                "display": "inline-block",
                "margin": "0 auto",

              })
            }
          >
            Try this in StackBlitz 🚀
          </GlButton>

          <GlSectionDivider />

          <GlCheckList
            className={css({ "marginTop": 0 })}
            heading="Why TSS?"
            subHeading="...instead of the [2261 others](https://www.npmjs.com/search?q=css-in-js) styling solutions?"
            hasAnimation={true}
            elements={[
              {
                "title": "Works great with [`MUI`](https://mui.com)",
                "IconOverride": createEmojiIcon("🤝"),
                "description": `MUI features [a step-by-step guide, along with a codemod tool](https://mui.com/guides/migration-v4/#2-use-tss-react), for transitioning from MUI version 4 to version 5 using TSS.  
                You don't have to use MUI to use TSS, TSS is a standalone solution, but the two libraries are a great match.`,  
              },
              {
                "title": "Next.js App Router support",
                "IconOverride": createEmojiIcon("🔧"),
                "description": `Setting up TSS (and MUI) to work with Next.js's SSR is a breeze. 
                You just need to wrap your app withing our [\`<NextAppDirEmotionCacheProvider/>\`](https://docs.tss-react.dev/ssr/next.js).  
                MUI is using [our provider](https://github.com/mui/material-ui/blob/4036eb60b45c260e9f49904f1b54f8c947a944d2/examples/material-next-app-router-ts/src/components/ThemeRegistry/EmotionCache.tsx#L20-L21).  
                `
              },
              {
                "title": "Actively maintained and widely adopted",
                "IconOverride": createEmojiIcon("👥"),
                "description": `TSS [is used by thousands of dev teams](https://npmtrends.com/@remix-run/react-vs-solid-js-vs-tss-react). Issues are resolved swiftly, and the library will remain actively maintained for the foreseeable future.`
              },
              {
                "title": "Eliminate CSS priority conflicts",
                "IconOverride": createEmojiIcon("😌"),
                "description": `With TSS you can determine the precedence of multiple classes applied to a component and [arbitrarily increase specificity of some rules](https://docs.tss-react.dev/increase-specificity)`
              },
              {
                "title": "No new syntax",
                "IconOverride": createEmojiIcon("🙅‍♂️"),
                "description": `TSS does not introduce new syntax. It's just plain CSS, albeit expressed under the form of a JavaScript object. 
                Pseudo-class selectors like \`:hover\` and media queries are expressed as you would expect, [as properties of the style object](https://docs.tss-react.dev/).`
              },
              {
                "title": "Your JSX remains readable",
                "IconOverride": createEmojiIcon("🤩"),
                "description": `Unlike other styling solution that tend to clutter the JSX, TSS enables [isolating the styles from the component structure](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo.tsx).  
                On the other hand, sometime it's just easier to inline the styles directly within your components, [TSS enables this as well](https://stackblitz.com/edit/vercel-next-js-bmc6dm?file=ui/TssLogo_intertwined.tsx).`
              },
              {
                "title": "Powered by [Emotion](https://emotion.sh/)",
                "IconOverride": createEmojiIcon("🚀"),
                "description": `Built on top of [@emotion/react](https://emotion.sh/docs/@emotion/react) TSS integrates seamlessly with the ecosystem of UI libraries that use emotion under the hood.
                It's the case of [MUI](https://mui.com/), [Theme UI](https://theme-ui.com/), [Chakra-UI](https://chakra-ui.com/) and many.  
                If you already have [@emotion/react](https://emotion.sh/docs/@emotion/react) in your project adding TSS has virtually no impact on your bundle size (~5kB minziped) and your project configuration.  
                `
              },
              {
                "title": "Dynamic Style Generation (for better and for worse)",
                "IconOverride": createEmojiIcon("💫"),
                "description": `TSS enables to generate styles based on the props and internal states of components.  
                This unfortunately prevents us from supporting [Server Component (RSC)](https://nextjs.org/docs/getting-started/react-essentials#server-components) in Next.js.  
                We remain hopeful for future support of RSC, contingent on [the provision of a suitable solution by Vercel and React](https://github.com/vercel/next.js/blob/dc6c22c99117bb48beedc4eed402a57b21f03963/docs/02-app/01-building-your-application/04-styling/03-css-in-js.mdx#L10-L12).  
                If you need RSC support today, you can consider *zero runtime* solutions like [Panda-CSS](https://panda-css.com/) or [Vanilla Extract](https://vanilla-extract.style/), 
                but the expression of complex styles is significantly harder in this paradigm.
                `
              },
              {
                "title": "Component library author friendly",
                "IconOverride": createEmojiIcon("📦"),
                "description": `If you are the author of a component library, that extends MUI or an other toolkit that leverages emotion
                you can use TSS internally without making it a peer dependency of your module.
                Example: [mui-datatables](https://github.com/gregnb/mui-datatables) is using TSS internally.  
                Read more about this [here](https://docs.tss-react.dev/publish-a-module-that-uses-tss).`
              }

            ]}
          />
        </>
      }
      footer={
        <GlFooter
          bottomDivContent="[GitHub](https://github.com/garronej/tss-react) - [Documentation](https://github.com/garronej/tss-react) - [Edit this website](https://github.com/garronej/tss-react/blob/landingpage/src/index.tsx)"
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
