import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
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
import FeaturedProjects from "../components/section/FeaturedProjects";

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

  return (
    <Box bg="bg" w="100%" minH="100vh" color="text.body">
      <HeaderBreadcrumbContext.Provider value={value}>
        <Header />
        <Box px="85px" pb="100px">
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
              bottom="50px"
              left="50%"
              transform="translateX(-50%)"
            >
              <Image src="down-chevron.svg" alt="Down chevron" w="20px" />
            </MotionBox>
          </Box>
          <InView onChange={(inView) => setInView(inView)}>
            <AboutMe />
          </InView>
          <VStack mt="200px" spacing="200px">
            <FeaturedProjects />
          </VStack>
        </Box>
      </HeaderBreadcrumbContext.Provider>
    </Box>
  );
}
