import {
  Box,
  chakra,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

type ProjectProps = {
  isOdd?: boolean;
  title: string;
  subtitle?: string;
  url?: string;
  imageSrc?: string;
  children: string;
};

export default function Project({
  isOdd,
  title,
  subtitle,
  url,
  imageSrc,
  children,
}: ProjectProps) {
  return (
    <Flex
      direction="column"
      alignSelf={isOdd ? "flex-end" : "flex-start"}
      align={isOdd ? "flex-end" : "flex-start"}
      w="80%"
    >
      <Box align={isOdd ? "right" : "left"} maxW="600px">
        <Heading fontSize="2xl" fontWeight="semibold">
          {title}
        </Heading>
        <Text color="text.light" mt="8px">
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
    </Flex>
  );
}
