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
import { LinkScroll, animateScroll as scroll } from "react-scroll";

export default function Header() {
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
          <Heading size="md" fontWeight="semibold">
            Nicolás de Ory
          </Heading>
          <Text>
          •
          </Text>
          <Text fontWeight="semibold">
          Featured Projects
          </Text>
        </HStack>
        <HStack spacing="40px">
          <Link as={LinkScroll} fontWeight="semibold" variant="dark">
            About me
          </Link>
          <Link as={LinkScroll} fontWeight="semibold" variant="dark">
            Projects
          </Link>
          <Link as={LinkScroll} fontWeight="semibold" variant="dark">
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
