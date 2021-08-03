import { Box, Heading, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import BlogPostLink, { BlogPostInfoProps } from "./BlogPostLink";


type BlogContainerProps = {
    posts?: BlogPostInfoProps[]
}

export default function BlogContainer({ posts }: BlogContainerProps) {
  
  const cardBg = useColorModeValue("light.card.bg", "dark.card.bg");
  
  const postChildren = posts.map(p => {
    return <BlogPostLink key={p.url} {...p} />
  });

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
        {postChildren}
      </VStack>
      <Link
        color="text.light"
        textDecoration="underline"
        href="/blog"
      >
        See all posts
      </Link>
    </Box>
  );
}
