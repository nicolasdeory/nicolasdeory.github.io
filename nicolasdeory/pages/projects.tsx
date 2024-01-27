import { GetStaticProps } from "next";
import BlogPostList from "../components/blog/BlogPostList";
import { BlogPostInfoProps } from "../components/hero/BlogPostLink";
import Layout from "../components/layout/Layout";
import OddChildrenAlignment from "../components/projects/OddChildrenAlignment";
import Project from "../components/projects/Project";
import { getAllPostInfo } from "../helpers/bloghelper";
import { Heading, Tag, useBreakpointValue, VStack } from "@chakra-ui/react";
import Section from "../components/section/Section";
import SmallProject from "../components/projects/SmallProject";
import ProjectGrid from "../components/projects/ProjectGrid";

export default function ProjectsPage() {
  return (
    <Layout title="Projects">
      {/* <Section title="All projects" id="projects" sectionAbove="..."> */}
      <Heading mt="50px" mb="50px">
        All projects
      </Heading>
      <VStack w="100%" maxW="1000px" spacing="100px">
        <OddChildrenAlignment>
          <Project
            title="El Rosco"
            imageSrc="/projects/rosco/roscohero.png"
            readMoreUrl="/project/rosco"
          >
            <Project.Description>
              A mobile app consisting in a word-guessing game, powered by speech
              recognition, available in Spanish for iOS and Android devices.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">iOS & Android App</Tag>
              <Tag>React Native</Tag>
              <Tag>RN Skia</Tag>
              <Tag>Firebase</Tag>
            </Project.Tags>
          </Project>
          <Project
            title="Aprende Andaluz"
            imageSrc="/projects/aprende-andaluz/andaluzhero.png"
            readMoreUrl="/project/aprende-andaluz"
          >
            <Project.Description>
              An informational mobile app about the andalusian dialect, that
              features a translator that transcribes spanish text to the
              andalusian pronunciation, as well as an AI Text-to-Speech engine
              with the andalusian accent.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Swift</Tag>
              <Tag>SwiftUI</Tag>
              <Tag>Java</Tag>
            </Project.Tags>
          </Project>
          <Project
            title="Residence Management"
            imageSrc="/projects/residencemanagement.png"
            readMoreUrl="/project/residence-management"
          >
            <Project.Description>
              A custom residence management solution that simplifies bookings,
              incident tracking, suppliers and employee management through a
              mobile-first user interface.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Web app</Tag>
              <Tag>React & Next.js</Tag>
              <Tag>Chakra UI</Tag>
              <Tag>Typescript</Tag>
              <Tag>Node.js</Tag>
            </Project.Tags>
          </Project>
          <Project
            title="Sevilla Metro"
            imageSrc="/projects/sevilla-metro/thumbnail.png"
            readMoreUrl="/project/sevilla-metro"
            url="https://sevillametro.netlify.app/"
            // Repo is still private
          >
            <Project.Description>
              A webapp that demonstrates how much shorter journeys in Seville
              would be, when using metro lines that are still under
              construction.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Web app</Tag>
              <Tag>React & Next.js</Tag>
              <Tag>Typescript</Tag>
              <Tag>Tailwind CSS</Tag>
              <Tag>Google Maps</Tag>
            </Project.Tags>
          </Project>
          <Project
            title="Project Firelight"
            imageSrc="/projects/firelight1.png"
            readMoreUrl="/project/firelight"
            githubUrl="https://github.com/nicolasdeory/firelight"
          >
            <Project.Description>
              RGB lighting software for Razer Chroma and other peripherals for
              games such as League of Legends, Rocket League or Fortnite.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Desktop app</Tag>
              <Tag>.NET Core C#</Tag>
              <Tag>Chromely</Tag>
            </Project.Tags>
          </Project>
        </OddChildrenAlignment>
        <ProjectGrid>
          <SmallProject
            title="PianoLED"
            url="/project/piano-led"
            githubUrl="https://github.com/nicolasdeory/pianoLED"
            gradientStart="#0575E6"
            gradientEnd="#021B79"
          >
            <Project.Description>
              An LED strip that lights up to notes played on a keyboard, with
              different lighting modes.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Hardware</Tag>
              <Tag>Arduino C++</Tag>
              <Tag>PCB Design</Tag>
              <Tag>3D Printing</Tag>
            </Project.Tags>
          </SmallProject>
          {/* <SmallProject
          title="Aprende Andaluz"
          url="/project/aprende-andaluz"
          gradientStart="#CAF2D1"
          gradientEnd="#AECFBC"
        >
          <Project.Description>
          An informational mobile app about the andalusian dialect, that
          features a translator that transcribes spanish text to the andalusian pronunciation,
          as well as an AI Text-to-Speech engine with the andalusian accent.
          </Project.Description>
          <Project.Tags>
            <Tag variant="dark">Swift</Tag>
            <Tag>SwiftUI</Tag>
            <Tag>Java</Tag>
          </Project.Tags>
        </SmallProject> */}
          <SmallProject
            title="Moovid"
            url="/project/moovid"
            githubUrl="https://github.com/nicolasdeory/moovid"
            gradientStart="#f12711"
            gradientEnd="#f5af19"
          >
            <Project.Description>
              A mashup webapp integrating Google Photos, Spotify and Cognitive
              Services to create customized photo collage videos.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Web app</Tag>
              <Tag>Javascript</Tag>
              <Tag>Java</Tag>
              <Tag>Spring Boot</Tag>
            </Project.Tags>
          </SmallProject>
          <SmallProject
            title="Teamworks"
            url="/project/teamworks"
            githubUrl="https://github.com/nicolasdeory/teamworks"
            gradientStart="#56ab2f"
            gradientEnd="#a8e063"
          >
            <Project.Description>
              A functional proof-of-concept app focused on team management,
              fine-grained permissions, and streamlined messaging.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Web app</Tag>
              <Tag>React</Tag>
              <Tag>Java</Tag>
              <Tag>Spring Boot</Tag>
            </Project.Tags>
          </SmallProject>
          <SmallProject
            title="Border Fish"
            url="/project/border-fish"
            gradientStart="#925FFF"
            gradientEnd="#9546D3"
          >
            <Project.Description>
              A <i>Papers, Please</i>-inspired game, awarded <i>Best Game</i> in
              JamToday Sevilla 2019.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Mobile game</Tag>
              <Tag>Unity</Tag>
              <Tag>C#</Tag>
            </Project.Tags>
          </SmallProject>
          <SmallProject
            title="Food Scheduler"
            url="/project/food-scheduler"
            githubUrl="https://github.com/nicolasdeory/FoodScheduler"
            gradientStart="#654ea3"
            gradientEnd="#eaafc8"
          >
            <Project.Description>
              A webapp that simplifies tracking ingredients and planning of
              meals.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Web app</Tag>
              <Tag>PHP</Tag>
              <Tag>Oracle PL/SQL</Tag>
            </Project.Tags>
          </SmallProject>
        </ProjectGrid>
      </VStack>
      {/* </Section> */}
    </Layout>
  );
}
