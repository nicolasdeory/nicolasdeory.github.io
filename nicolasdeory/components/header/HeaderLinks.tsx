import { Button, HStack } from "@chakra-ui/react";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/dist/client/router";
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

  const router = useRouter();

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
        href={"/projects"}
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
          if (isMainPage)
            Scroll.scroller.scrollTo("contact-me", { smooth: true });
          else
            router.push("/contact-me");
          if (onHeaderLinkClicked) onHeaderLinkClicked();
        }}
      >
        Contact me
      </Button>
      <ColorModeSwitch />
    </>
  );
}
