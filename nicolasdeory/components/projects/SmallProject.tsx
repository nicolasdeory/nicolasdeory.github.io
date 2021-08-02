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

type ProjectProps = {
  isOdd?: boolean;
  title: string;
  subtitle?: string;
  url?: string;
  imageSrc?: string;
  children: string;
  githubUrl?: string;
  gradientStart?: string;
  gradientEnd?: string;
};

export default function SmallProject({
  title,
  subtitle,
  url,
  children,
  gradientStart,
  gradientEnd,
  githubUrl,
}: ProjectProps) {
  
  const cardBg = useColorModeValue("light.card.bg", "dark.card.bg");
  const subtitleTextColor = useColorModeValue("light.text.light", "dark.text.light");

  return (
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

      <Text color={subtitleTextColor} mt="8px">
        {subtitle}
      </Text>
      <Text mt="20px" mb="10px">
        {children}
      </Text>
      <Link href={url}>Read more</Link>
    </Box>
  );
}
