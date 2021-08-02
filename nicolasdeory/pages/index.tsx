import {
  Box,
  Flex,
  HStack,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion, useAnimation, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { Waypoint } from "react-waypoint";
import HeaderBreadcrumbContext from "../components/context/HeaderBreadcrumbContext";
import Header from "../components/header/Header";
import BlogContainer from "../components/hero/BlogContainer";
import BlogPostLink from "../components/hero/BlogPostLink";
import HeroDescription from "../components/hero/HeroDescription";
import AboutMe from "../components/section/AboutMe";
import AllProjects from "../components/section/AllProjects";
import FeaturedProjects from "../components/section/FeaturedProjects";
import Blog from "../components/section/Blog";
import ContactMe from "../components/section/ContactMe";
import Head from "next/head";

const chevronVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  initial: { opacity: 1 },
  loop: {
    y: -5,
    opacity: 1,
    transition: { repeat: Infinity, duration: 1, repeatType: "reverse" },
  },
};

const MotionBox = motion(Box);

export default function Home() {
  const [inView, setInView] = useState(false);
  const [headerBreadcrumb, setHeaderBreadcrumb] = useState(null);
  const value = { headerBreadcrumb, setHeaderBreadcrumb };

  const controls = useAnimation();

  useEffect(() => {
    async function doAnim() {
      if (!inView) {
        await controls.start({ opacity: 1, y: 0 });
        await controls.start("loop");
      } else {
        await controls.start("hidden");
      }
    }
    doAnim();
  }, [inView, controls]);

  const textBodyColor = useColorModeValue("light.text.body", "dark.text.body");
  const bgColor = useColorModeValue("light.bg", "dark.bg");
  const chevronFilter = useColorModeValue("", "invert(100%)");

  return (
    <>
      <Head>
        <title>Nicolás de Ory | Fullstack & Mobile Development, UI/UX Design</title>
        <meta
          name="description"
          content="I'm a Software Engineer from Spain. I am passionate about building products from the ground up. Shoot me a message if you have any questions."
        />
      </Head>
      <Box bg={bgColor} w="100%" minH="100vh" color={textBodyColor}>
        <HeaderBreadcrumbContext.Provider value={value}>
          <Header />
          <Box
            px={{ base: "40px", md: "85px" }}
            pb="100px"
            pt={{ base: "80px", md: "0" }}
          >
            <Box position="relative">
              <Flex h="calc(100vh - 80px)" justify="center" direction="column">
                <HStack justify="space-between" spacing="60px" mb="150px">
                  <HeroDescription />
                  <BlogContainer>
                    <BlogPostLink date={new Date("2021-07-21")} url="aa">
                      Simple IPC using Named Pipes in .NET Core
                    </BlogPostLink>
                    <BlogPostLink date={new Date("2021-07-21")} url="aa">
                      Simple IPC using Named Pipes in .NET Core
                    </BlogPostLink>
                    <BlogPostLink date={new Date("2021-07-21")} url="aa">
                      Simple IPC using Named Pipes in .NET Core
                    </BlogPostLink>
                  </BlogContainer>
                </HStack>
              </Flex>
              <MotionBox
                variants={chevronVariants}
                animate={controls}
                position="absolute"
                bottom={{ base: "100px", md: "50px" }}
                left="50%"
                transform="translateX(-50%)"
                filter={chevronFilter}
              >
                <Image src="down-chevron.svg" alt="Down chevron" w="20px" />
              </MotionBox>
            </Box>
            <InView onChange={(inView) => setInView(inView)}>
              <AboutMe />
            </InView>
            <VStack mt="200px" spacing="200px">
              <FeaturedProjects />
              <AllProjects />
              <Blog />
              <ContactMe />
            </VStack>
          </Box>
        </HeaderBreadcrumbContext.Provider>
      </Box>
    </>
  );
}
