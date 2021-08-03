import { Button, HStack } from "@chakra-ui/react";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { useCallback } from "react";
import * as Scroll from "react-scroll";
import ColorModeSwitch from "./ColorModeSwitch";
import HeaderIconLink from "./HeaderIconLink";
import HeaderLink from "./HeaderLink";

export default function HeaderLinks({
  onHeaderLinkClicked,
  isMainPage,
}: {
  onHeaderLinkClicked?: () => void;
  isMainPage?: boolean;
}) {
  return (
    <>
      <HeaderLink
        to="about-me"
        onClick={onHeaderLinkClicked}
        href={isMainPage ? null : "/"}
      >
        About me
      </HeaderLink>
      <HeaderLink
        to="projects"
        onClick={onHeaderLinkClicked}
        href={isMainPage ? null : "/"}
      >
        Projects
      </HeaderLink>
      <HeaderLink
        to="blog"
        onClick={onHeaderLinkClicked}
        href={isMainPage ? null : "/blog"}
      >
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
      <Button
        variant="dark"
        onClick={() => {
          Scroll.scroller.scrollTo("contact-me", { smooth: true });
          if (onHeaderLinkClicked) onHeaderLinkClicked();
        }}
      >
        Contact me
      </Button>
      <ColorModeSwitch />
    </>
  );
}
