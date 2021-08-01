import ProjectGrid from "../projects/ProjectGrid";
import SmallProject from "../projects/SmallProject";
import Section from "./Section";

export default function AllProjects() {
  return (
    <Section
      title="All Projects"
      id="all-projects"
      sectionAbove="Featured Projects"
    >
      <ProjectGrid>
        <SmallProject
          title="Moovid"
          subtitle="WEB APP – Javascript, Emscripten, Java, Spring Boot"
          url="/project/moovid"
          githubUrl="https://github.com/nicolasdeory/moovid"
          gradientStart="#f12711"
          gradientEnd="#f5af19"
        >
          A mashup webapp integrating Google Photos, Spotify and Cognitive
          Services to create customized photo collage videos.
        </SmallProject>
        <SmallProject
          title="Teamworks"
          subtitle="WEB APP – React, Java, Spring Boot"
          url="/project/teamworks"
          githubUrl="https://github.com/nicolasdeory/teamworks"
          gradientStart="#56ab2f"
          gradientEnd="#a8e063"
        >
          A functional proof-of-concept app focused on team management,
          fine-grained permissions, and streamlined messaging.
        </SmallProject>
        <SmallProject
          title="Firelight RGB"
          subtitle="MOBILE APP – React Native, NativeBase"
          url="/project/firelight-app"
        >
          An app designed to control Firelight LED strips, providing powerful,
          customized lighting effects through a user-friendly interface.
        </SmallProject>
      </ProjectGrid>
    </Section>
  );
}
