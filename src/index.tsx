import { render } from "react-dom";
import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlArticle } from "gitlanding/GlArticle";
import { GlIllustration } from "gitlanding/GlIllustration";
import { GlFooter } from "gitlanding/GlFooter";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { GlCards } from "gitlanding/GlCards";
import { GlLogoCard } from "gitlanding/GlCards/GlLogoCard";
import { GlProjectCard } from "gitlanding/GlCards/GlProjectCard";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlSlider } from "gitlanding/GlSlider";
import { GlReviewSlide } from "gitlanding/GlReviewSlide";
import { GlLogo } from "gitlanding/utils/GlLogo";
import logoPngUrl from "./assets/logo.png";
import demoGifUrl from "./assets/demo.gif";
import { ThemeProvider } from "./theme";
import { css } from "tss-react/@emotion/css";


const repoUrl = "https://github.com/garronej/tss-react";

function App() {

  return (
    <GlTemplate
      ThemeProvider={ThemeProvider}
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
          ]}
          enableDarkModeSwitch={true}
          githubRepoUrl={repoUrl}
          githubButtonSize="large"
          showGithubStarCount={true}
        />
      }
      headerOptions={{
        "position": "fixed",
        "isRetracted": "smart",
      }}
      footer={
        <GlFooter
          bottomDivContent="[License MIT](https://github.com/garronej/tss-react/blob/main/LICENSE)"
          email="joseph.garrone@data.gouv.fr"
        />
      }
    >
      <GlHero
        classes={{
          "textWrapper": css({ 
            "maxWidth": 1030
          }),
          "imageWrapper": css({ "maxWidth": 460 })
        }}
        title="makeStyles is dead 😧 long live makeStyles! 🎉"
        subTitle="The great hook based CSS-in-JS API now with state of the art TypeScript support 🚀"
        imageSrc={demoGifUrl}
        linkToSectionBelowId="firstSection"
        hasImageShadow={true}
      />

      <GlCheckList
        heading="Check List Heading"
        hasAnimation={true}
        elements={[
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
        ]}
      />

    </GlTemplate>
  );
}

render(<App />, document.getElementById("root"));