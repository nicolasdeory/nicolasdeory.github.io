import { Box, Heading, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import BlogPostLink from "./BlogPostLink";


type BlogContainerProps = {
    children?: JSX.Element | JSX.Element[];
}

export default function BlogContainer({ children }: BlogContainerProps) {
  
  const cardBg = useColorModeValue("light.card.bg", "dark.card.bg");
  
  return (
    <Box
      bg={cardBg}
      w="700px"
      h="100%"
      px="30px"
      py="30px"
      position="relative"
      boxShadow="0 0 30px #0002"
      borderRadius="5px"
      display={{ base: "none", lg: "block" }}
    >
      <Heading size="md" mb="30px">
        Latest blog posts
      </Heading>
      <VStack spacing="20px" align="start" mb="40px">
        {children}
      </VStack>
      <Link
        color="text.light"
        textDecoration="underline"
      >
        See all posts
      </Link>
    </Box>
  );
}
