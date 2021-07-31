import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import HeaderBreadcrumbContext from "../context/HeaderBreadcrumbContext";
import LinkScroll from "../link/LinkScroll";

const MotionHStack = motion(HStack);

export default function Header() {
  const { headerBreadcrumb, setHeaderBreadcrumb } = useContext(
    HeaderBreadcrumbContext
  );

  const controls = useAnimation();

  const [headerBreadcrumbText, setHeaderBreadcrumbText] = useState(null);

  useEffect(() => {
    async function doAnim() {
      console.log(headerBreadcrumb);
      await controls.start({ opacity: 0, transition: { duration: 0.1 } });
      setHeaderBreadcrumbText(headerBreadcrumb);
      if (headerBreadcrumb) {
        await controls.start({ opacity: 1, transition: { duration: 0.1 } });
      }
    }
    doAnim();
  }, [headerBreadcrumb, controls]);

  return (
    <Box
      bg="bg"
      h="80px"
      position="sticky"
      top="0"
      w="100%"
      px="85px"
      py="20px"
      zIndex="999"
      boxShadow="0 0 2px #0004"
    >
      <Flex direction="row" justify="space-between" align="center">
        <HStack>
          <Heading size="md" fontWeight="semibold" cursor="pointer" onClick={() => scrollTo({top:0, behavior: "smooth"})}>
            Nicolás de Ory
          </Heading>
          <MotionHStack initial={{ opacity: 0 }} animate={controls}>
            <Text>•</Text>
            <Text fontWeight="semibold">{headerBreadcrumbText}</Text>
          </MotionHStack>
        </HStack>
        <HStack spacing="40px">
          <Link as={LinkScroll} fontWeight="semibold" variant="dark" to="about-me" >
            About me
          </Link>
          <Link as={LinkScroll} fontWeight="semibold" variant="dark" to="projects">
            Projects
          </Link>
          <Link as={LinkScroll} fontWeight="semibold" variant="dark" to="blog">
            Blog
          </Link>
          <HStack spacing="10px">
            <Link
              fontSize="xl"
              href="https://stackoverflow.com/users/4694364/nicol%c3%a1s-de-ory"
              isExternal
            >
              <FontAwesomeIcon icon={faStackOverflow} />
            </Link>
            <Link
              fontSize="xl"
              href="https://github.com/nicolasdeory"
              isExternal
            >
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </HStack>
          <Button>Contact me</Button>
        </HStack>
      </Flex>
    </Box>
  );
}
