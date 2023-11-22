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
import {
  faSadCry,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import RevealInView from "../animation/RevealInView";

type ProjectProps = {
  isOdd?: boolean;
  title: string;
  url?: string;
  readMoreUrl?: string;
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

const CarouselItem = ({
  isOdd,
  title,
  readMoreUrl,
  url,
  imageSrc,
  children,
  githubUrl,
}: ProjectProps) => {
  const subtitleTextColor = useColorModeValue(
    "light.text.light",
    "dark.text.light"
  );

  const hoverColor = useColorModeValue("dark.text.body", "dark.text.body");
  const marqueeOverlay = useColorModeValue(
    "light.marqueeOverlay",
    "dark.marqueeOverlay"
  );

  const projectDescription = children.find((x) => x.type === Description);
  const projectTags = children.find((x) => x.type === Tags);
  let projectTagChildren = projectTags?.props.children ?? [];
  let projectTagList: JSX.Element[] = Array.isArray(projectTagChildren)
    ? projectTagChildren
    : [projectTagChildren];

  projectTagList = projectTagList.map((x, i) => {
    if (i == 0) return React.cloneElement(x, { key: i, mb: "5px", variant:"alwaysdark" });
    else
      return React.cloneElement(x, {
        key: i,
        ml: isOdd ? "0" : "5px",
        mr: isOdd ? "5px" : "0",
        mb: "5px",
      });
  });

  return (
    // <RevealInView style={{ width: "100%" }}>
    <Flex
      direction="column"
      alignSelf={"flex-start"}
      align={"flex-start"}
      position="relative"
    >
      <Box
        w="100%"
        /*h="400px"*/ boxShadow="0 0 30px #0003"
        css={{ position: "relative" }}
      >
        <Image
          variant="shadow"
          // maxW="100%"
          // maxH="100%"
          // objectFit="cover"
          quality={100}
          src={imageSrc}
          alt={`Project thumbnail for ${title}`}
        />
        <Box
          color={hoverColor}
          backgroundColor={marqueeOverlay}
          backdropFilter="blur(10px)"
          p="30px"
          css={{
            opacity: 0,
            ":hover": {
              opacity: 1,
            },
            transition: "opacity 0.5s, background-color 0.5s",
            zIndex: 2,
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
          }}
        >
          <Flex justify="flex-start" flexDirection={"row"} align="center">
            {url ? (
              <Link
                href={url}
                isExternal
                display="flex"
                alignItems="flex-end"
                textDecoration="none"
                variant="alwaysdark"
              >
                <Heading fontSize="2xl" fontWeight="semibold">
                  {title}
                </Heading>
                <Box ml="10px">
                  <FontAwesomeIcon icon={faSquareArrowUpRight} />
                </Box>
              </Link>
            ) : (
              <Heading fontSize="2xl" fontWeight="semibold">
                {title}
              </Heading>
            )}
            {githubUrl && (
              <Link
                fontSize="xl"
                href={githubUrl}
                isExternal
                display={{ base: "inherit", md: "none" }}
                ml={"10px"}
                mr={"0"}
                variant="alwaysdark"
              >
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            )}
          </Flex>
          <Flex
            mt="10px"
            justify="flex-start"
            flexDirection={"row"}
            wrap="wrap"
          >
            {projectTagList}
          </Flex>
          <Text mt="10px" mb="10px">
            {projectDescription?.props.children}
          </Text>
          <Link href={readMoreUrl} variant="alwaysdark">
            Read more
          </Link>
        </Box>
      </Box>
      {/* {githubUrl && (
          <Link
            fontSize="xl"
            href={githubUrl}
            isExternal
            position="absolute"
            top="4px"
            left={"-40px"}
            right={"auto"}
            display={{ base: "none", md: "inherit" }}
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        )} */}
    </Flex>
    // </RevealInView>
  );
};

CarouselItem.Description = Description;
CarouselItem.Tags = Tags;

export default CarouselItem;
