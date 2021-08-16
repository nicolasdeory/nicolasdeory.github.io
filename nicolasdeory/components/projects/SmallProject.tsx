import {
  Box,
  chakra,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import RevealInView from "../animation/RevealInView";
import Project from "./Project";

type ProjectProps = {
  isOdd?: boolean;
  title: string;
  url?: string;
  imageSrc?: string;
  children: JSX.Element[];
  githubUrl?: string;
  gradientStart?: string;
  gradientEnd?: string;
};

export default function SmallProject({
  title,
  url,
  children,
  gradientStart,
  gradientEnd,
  githubUrl,
}: ProjectProps) {
  const cardBg = useColorModeValue("light.card.bg", "dark.card.bg");
  const subtitleTextColor = useColorModeValue(
    "light.text.light",
    "dark.text.light"
  );

  const projectDescription = children.find(
    (x) => x.type === Project.Description
  );
  const projectTags = children.find((x) => x.type === Project.Tags);
  let projectTagChildren = projectTags?.props.children ?? [];
  let projectTagList: JSX.Element[] = Array.isArray(projectTagChildren)
    ? projectTagChildren
    : [projectTagChildren];

  projectTagList = projectTagList.map((x, i) => {
    if (i == 0)
      return React.cloneElement(x, { key: i, mb: "5px" });
    else
      return React.cloneElement(x, {
        key: i,
        ml: "5px",
        mb: "5px"
      });
  });

  return (
    <RevealInView>
      <Box
        boxShadow="0 0 30px #0003"
        bg={cardBg}
        h="fit-content"
        maxW="500px"
        position="relative"
        px="40px"
        py="40px"
      >
        <Box
          w="100%"
          h="5px"
          top="0"
          left="0"
          position="absolute"
          bgGradient={`linear(to-r, ${gradientStart}, ${gradientEnd})`}
        ></Box>
        <Flex justify="space-between">
          <Heading fontSize="2xl" fontWeight="semibold">
            {title}
          </Heading>
          {githubUrl && (
            <Link fontSize="xl" href={githubUrl} isExternal>
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          )}
        </Flex>

        <Flex mt="10px" justify="flex-start" flexDirection="row" wrap="wrap">
          {projectTagList}
        </Flex>
        <Text mt="20px" mb="10px">
          {projectDescription?.props.children}
        </Text>
        <Link href={url}>Read more</Link>
      </Box>
    </RevealInView>
  );
}
