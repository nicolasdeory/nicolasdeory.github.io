import {
  Box,
  chakra,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import RevealInView from "../animation/RevealInView";

type ProjectProps = {
  isOdd?: boolean;
  title: string;
  url?: string;
  imageSrc?: string;
  children: JSX.Element[];
  githubUrl?: string;
};

const Description = ({ children }) => {
  return <>{children}</>;
};

const Tags = ({ children }) => {
  return <>{children}</>;
};

const Project = ({
  isOdd,
  title,
  url,
  imageSrc,
  children,
  githubUrl,
}: ProjectProps) => {
  const subtitleTextColor = useColorModeValue(
    "light.text.light",
    "dark.text.light"
  );

  const projectDescription = children.find((x) => x.type === Description);
  const projectTags = children.find((x) => x.type === Tags);
  let projectTagChildren = projectTags?.props.children ?? [];
  let projectTagList: JSX.Element[] = Array.isArray(projectTagChildren)
    ? projectTagChildren
    : [projectTagChildren];
  if (isOdd) {
    projectTagList = [...projectTagList].reverse();
  }

  projectTagList = projectTagList.map((x, i) => {
    if (i == 0)
      return React.cloneElement(x, { key: i, mb: "5px" });
    else
      return React.cloneElement(x, {
        key: i,
        ml: isOdd ? "0" : "5px",
        mr: isOdd ? "5px" : "0",
        mb: "5px"
      });
  });

  return (
    <RevealInView style={{ width: "100%" }}>
      <Flex
        direction="column"
        alignSelf={isOdd ? "flex-end" : "flex-start"}
        align={isOdd ? "flex-end" : "flex-start"}
        position="relative"
      >
        <Box align={isOdd ? "right" : "left"} maxW="600px">
          <Flex
            justify="flex-start"
            flexDirection={isOdd ? "row-reverse" : "row"}
            align="center"
          >
            <Heading fontSize="2xl" fontWeight="semibold">
              {title}
            </Heading>
            {githubUrl && (
              <Link
                fontSize="xl"
                href={githubUrl}
                isExternal
                display={{ base: "inherit", md: "none" }}
                ml={isOdd ? "0" : "10px"}
                mr={isOdd ? "10px" : "0"}
              >
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            )}
          </Flex>
          <Flex
            mt="10px"
            justify="flex-start"
            flexDirection={isOdd ? "row-reverse" : "row"}
            wrap="wrap"
          >
            {projectTagList}
          </Flex>
          <Text mt="10px" mb="10px">
            {projectDescription?.props.children}
          </Text>
          <Link href={url}>Read more</Link>
        </Box>
        <Box position="relative" w="100%" mt="40px">
          <Image
            variant="shadow"
            boxShadow="0 0 30px #0003"
            maxWidth="100%"
            maxH="400px"
            float={isOdd ? "right" : "left"}
            quality={100}
            src={imageSrc}
            alt={`Project thumbnail for ${title}`}
          />
        </Box>
        {githubUrl && (
          <Link
            fontSize="xl"
            href={githubUrl}
            isExternal
            position="absolute"
            top="4px"
            left={isOdd ? "auto" : "-40px"}
            right={isOdd ? "-40px" : "auto"}
            display={{ base: "none", md: "inherit" }}
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        )}
      </Flex>
    </RevealInView>
  );
};

Project.Description = Description;
Project.Tags = Tags;

export default Project;
