import { Tag, VStack } from "@chakra-ui/react";
import OddChildrenAlignment from "../projects/OddChildrenAlignment";
import Project from "../projects/Project";
import Section from "./Section";

export default function FeaturedProjects() {
  return (
    <Section title="Featured projects" id="projects" sectionAbove="About me">
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
      </VStack>
    </Section>
  );
}
