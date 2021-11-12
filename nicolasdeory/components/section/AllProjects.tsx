import { Tag } from "@chakra-ui/react";
import Project from "../projects/Project";
import ProjectGrid from "../projects/ProjectGrid";
import SmallProject from "../projects/SmallProject";
import Section from "./Section";

export default function AllProjects() {
  return (
    <Section
      title="All projects"
      id="all-projects"
      sectionAbove="Featured projects"
    >
      <ProjectGrid>
        <SmallProject
          title="PianoLED"
          url="/project/pianoled"
          githubUrl="https://github.com/nicolasdeory/pianoLED"
          gradientStart="#0575E6"
          gradientEnd="#021B79"
        >
          <Project.Description>
            An LED strip that lights up to notes played on a keyboard, with different lighting modes.
          </Project.Description>
          <Project.Tags>
            <Tag variant="dark">Hardware</Tag>
            <Tag>Arduino C++</Tag>
            <Tag>PCB Design</Tag>
            <Tag>3D Printing</Tag>
          </Project.Tags>
        </SmallProject>
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
          title="Food Scheduler"
          url="/project/food-scheduler"
          githubUrl="https://github.com/nicolasdeory/FoodScheduler"
          gradientStart="#654ea3"
          gradientEnd="#eaafc8"
        >
          <Project.Description>
            A webapp that simplifies tracking ingredients and planning of meals.
          </Project.Description>
          <Project.Tags>
            <Tag variant="dark">Web app</Tag>
            <Tag>PHP</Tag>
            <Tag>Oracle PL/SQL</Tag>
          </Project.Tags>
        </SmallProject>
      </ProjectGrid>
    </Section>
  );
}
