import { Button, HStack } from "@chakra-ui/react";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { useCallback } from "react";
import HeaderIconLink from "./HeaderIconLink";
import HeaderLink from "./HeaderLink";

export default function HeaderLinks({ onHeaderLinkClicked }: { onHeaderLinkClicked?: () => void }) {

  return (
    <>
      <HeaderLink to="about-me" onClick={onHeaderLinkClicked}>
        About me
      </HeaderLink>
      <HeaderLink to="projects" onClick={onHeaderLinkClicked}>
        Projects
      </HeaderLink>
      <HeaderLink to="blog" onClick={onHeaderLinkClicked}>
        Blog
      </HeaderLink>
      <HStack spacing="10px">
        <HeaderIconLink
          href="https://stackoverflow.com/users/4694364/nicol%c3%a1s-de-ory"
          icon={faStackOverflow}
        />
        <HeaderIconLink
          href="https://github.com/nicolasdeory"
          icon={faGithub}
        />
      </HStack>
      <Button>Contact me</Button>
    </>
  );
}
