import
  {
    VStack
  } from "@chakra-ui/react";
import { useContext } from "react";
import HeaderBreadcrumbContext from "../context/HeaderBreadcrumbContext";
import OddChildrenAlignment from "../projects/OddChildrenAlignment";
import Project from "../projects/Project";
import Section from "./Section";

export default function FeaturedProjects() {
  const { headerBreadcrumb, setHeaderBreadcrumb } = useContext(
    HeaderBreadcrumbContext
  );
  return (
    <Section title="Featured projects" id="projects" sectionAbove="About me">
      <VStack w="100%" maxW="1000px" spacing="100px">
        <OddChildrenAlignment>
          <Project
            title="Gestiona Residencias"
            subtitle="WEB APP – React & Next.js, Chakra UI, Typescript, Node.js"
            imageSrc="/projects/galgani1.png"
            githubUrl="https://github.com/nicolasdeory/firelight"
            url="/project/galgani"
          >
            A custom residence management solution that simplifies bookings,
            incident tracking, suppliers and employee management through a
            mobile-first user interface.
          </Project>
          <Project
            title="Project Firelight"
            subtitle="DESKTOP APP – .NET Core C#, Chromely"
            imageSrc="/projects/firelight1.png"
            url="/project/firelight"
            githubUrl="https://github.com/nicolasdeory/firelight"
          >
            RGB lighting software for Razer Chroma and other peripherals for
            games such as League of Legends, Rocket League or Fortnite.
          </Project>
          <Project
            title="Firelight RGB"
            subtitle="MOBILE APP – React Native, NativeBase"
            imageSrc="/projects/firelightapp1.png"
            url="/project/firelight-app"
          >
            An app designed to control Firelight LED strips, providing powerful,
            customized lighting effects through a user-friendly interface.
          </Project>
        </OddChildrenAlignment>
      </VStack>
    </Section>
  );
}
