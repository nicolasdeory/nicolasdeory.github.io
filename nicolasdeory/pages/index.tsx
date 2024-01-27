import
  {
    Box,
    Flex,
    HStack, useColorModeValue,
    VStack
  } from "@chakra-ui/react";
import { motion, useAnimation, Variants } from "framer-motion";
import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import BlogContainer from "../components/hero/BlogContainer";
import BlogPostLink, { BlogPostInfoProps } from "../components/hero/BlogPostLink";
import HeroDescription from "../components/hero/HeroDescription";
import LazyImage from "../components/image/LazyImage";
import Layout from "../components/layout/Layout";
import AboutMe from "../components/section/AboutMe";
import AllProjects from "../components/section/AllProjects";
import Blog from "../components/section/Blog";
import ContactMe from "../components/section/ContactMe";
import FeaturedProjects from "../components/section/FeaturedProjects";
import { getAllPostInfo } from "../helpers/bloghelper";

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

export default function Home({posts}) {
  const [inView, setInView] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    async function doAnim() {
      if (inView) {
        await controls.start({ opacity: 1, y: 0 });
        await controls.start("loop");
      } else {
        await controls.start("hidden");
      }
    }
    doAnim();
  }, [inView, controls]);

  const chevronFilter = useColorModeValue("", "invert(100%)");

  return (
    <Layout metaDescription="I'm a Software Engineer from Spain. I am passionate about building products from the ground up. Shoot me a message if you have any questions." isMainPage>
      <Box position="relative">
        <Flex h="calc(100vh - 80px)" justify="center" direction="column">
          <HStack justify="space-between" spacing="60px" mb="150px">
            <HeroDescription />
            <BlogContainer posts={posts} />
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
          <LazyImage
            src="down-chevron.svg"
            alt="Down chevron"
            w="20px"
            h="20px"
          />
        </MotionBox>
      </Box>
      <InView onChange={(inView) => setInView(inView)}>
        <AboutMe />
      </InView>
      <VStack mt="200px" spacing="200px">
        <FeaturedProjects />
        {/* <AllProjects /> */}
        <Blog posts={posts} />
        <ContactMe />
      </VStack>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts: BlogPostInfoProps[] = getAllPostInfo(3);
  return { props: { posts } };
};