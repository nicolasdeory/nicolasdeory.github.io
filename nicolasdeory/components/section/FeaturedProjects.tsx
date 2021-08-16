import { Tag, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import HeaderBreadcrumbContext from "../context/HeaderBreadcrumbContext";
import OddChildrenAlignment from "../projects/OddChildrenAlignment";
import Project from "../projects/Project";
import Section from "./Section";

export default function FeaturedProjects() {
  return (
    <Section title="Featured projects" id="projects" sectionAbove="About me">
      <VStack w="100%" maxW="1000px" spacing="100px">
        <OddChildrenAlignment>
          <Project
            title="Gestiona Residencias"
            imageSrc="/projects/galgani1.png"
            githubUrl="https://github.com/nicolasdeory/firelight"
            url="/project/galgani"
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
            title="Project Firelight"
            imageSrc="/projects/firelight1.png"
            url="/project/firelight"
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
          <Project
            title="Firelight RGB"
            imageSrc="/projects/firelightapp1.png"
            url="/project/firelight-app"
          >
            <Project.Description>
              An app designed to control Firelight LED strips, providing
              powerful, customized lighting effects through a user-friendly
              interface.
            </Project.Description>
            <Project.Tags>
              <Tag variant="dark">Mobile app</Tag>
              <Tag>React Native</Tag>
              <Tag>NativeBase</Tag>
            </Project.Tags>
          </Project>
        </OddChildrenAlignment>
      </VStack>
    </Section>
  );
}
