import { Link, VStack } from "@chakra-ui/react";
import BlogPostLinkExtended from "../blog/BlogPostLinkExtended";
import BlogPostList from "../blog/BlogPostList";
import Section from "./Section";

export default function Blog({posts}) {
  return (
    <Section title="Blog" id="blog" sectionAbove="Featured projects">
      <VStack
        align={{ base: "center", md: "stretch" }}
        w="100%"
        spacing="50px"
        maxW="800px"
      >
        <BlogPostList posts={posts} />
        <Link variant="dark" href="/blog" fontSize="xl" w="fit-content">
          See all posts
        </Link>
      </VStack>
    </Section>
  );
}
