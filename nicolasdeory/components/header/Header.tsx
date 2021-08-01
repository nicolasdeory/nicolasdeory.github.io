import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Portal,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import {
  faGit,
  faGithub,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimation, Variants } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import HeaderBreadcrumbContext from "../context/HeaderBreadcrumbContext";
import LinkScroll from "../link/LinkScroll";
import HeaderIconLink from "./HeaderIconLink";
import HeaderLink from "./HeaderLink";
import HeaderLinks from "./HeaderLinks";
import MainName from "./MainName";

const MotionBox = motion(Box);

const headerMenuVariants: Variants = {
  open: {
    opacity: 1,
    y: -1,
    zIndex: 0,
    transition: {duration: 0.1}
  },
  closed: {
    opacity: 0,
    y: -10,
    zIndex: -999,
    transition: {duration: 0.1, zIndex: {delay:0.1}},
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useBoolean(false);

  return (
    <>
      <Box
        bg="bg"
        h="80px"
        position={{base: "fixed", md: "sticky"}}
        top="0"
        w="100%"
        px={{base: "40px", md: "85px"}}
        py="20px"
        zIndex="999"
        boxShadow="0 0 2px #0004"
      >
        <Flex direction="row" justify="space-between" align="center" h="100%">
          <MainName />
          <HStack spacing="40px" display={{ base: "none", lg: "flex" }}>
            <HeaderLinks />
          </HStack>
          <IconButton
            onClick={() => setMenuOpen.toggle()}
            variant="outline"
            aria-label="Menu button"
            icon={<FontAwesomeIcon icon={faBars} />}
            display={{ base: "inherit", lg: "none" }}
          />
        </Flex>
      </Box>
      <Portal>
        <MotionBox
          variants={headerMenuVariants}
          display={{ base: "inherit", lg: "none" }}
          bg="header.menu"
          w="100%"
          pt="20px"
          position="fixed"
          top="80px"
          boxShadow="0 0 2px #0004"
          initial="closed"
          animate={menuOpen ? "open" : "closed"}
        >
          <VStack>
            <HeaderLinks onHeaderLinkClicked={() => setMenuOpen.off()} />
          </VStack>
          <CloseButton
            aria-label="Close menu"
            variant="none"
            h="40px"
            w="100%"
            mt="20px"
            borderRadius="0"
            onClick={() => setMenuOpen.toggle()}
          />
        </MotionBox>
      </Portal>
    </>
  );
}
