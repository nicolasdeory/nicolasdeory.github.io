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
import { useRef } from "react";

type ProjectProps = {
  isOdd?: boolean;
  title: string;
  subtitle?: string;
  url?: string;
  imageSrc?: string;
  children: string;
  githubUrl?: string;
};

export default function Project({
  isOdd,
  title,
  subtitle,
  url,
  imageSrc,
  children,
  githubUrl,
}: ProjectProps) {
  const subtitleTextColor = useColorModeValue(
    "light.text.light",
    "dark.text.light"
  );

  return (
    <Flex
      direction="column"
      alignSelf={isOdd ? "flex-end" : "flex-start"}
      align={isOdd ? "flex-end" : "flex-start"}
      w="80%"
      position="relative"
    >
      <Box align={isOdd ? "right" : "left"} maxW="600px">
        <Flex justify="flex-start" flexDirection={isOdd ? "row-reverse" : "row"} align="center">
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
        <Text color={subtitleTextColor} mt="8px">
          {subtitle}
        </Text>
        <Text mt="20px" mb="10px">
          {children}
        </Text>
        <Link href={url}>Read more</Link>
      </Box>
      <Box position="relative" w="100%" mt="40px">
        <Image
          variant="shadow"
          boxShadow="0 0 30px #0003"
          maxWidth="100%"
          maxH="500px"
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
  );
}
