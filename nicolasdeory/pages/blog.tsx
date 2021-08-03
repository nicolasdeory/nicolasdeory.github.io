import { Heading, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import BlogPostList from "../components/blog/BlogPostList";
import
  {
    BlogPostInfoProps
  } from "../components/hero/BlogPostLink";
import Layout from "../components/layout/Layout";
import { getAllPostInfo } from "../helpers/bloghelper";

export default function BlogPage({ posts }) {
  return (
    <Layout title="Blog">
      <Heading mt="50px">All posts</Heading>
      <VStack
        align={{ base: "center", md: "stretch" }}
        w="100%"
        spacing="50px"
        maxW="800px"
        mt="30px"
      >
        <BlogPostList noAnim posts={posts} />
      </VStack>
    </Layout>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const posts: BlogPostInfoProps[] = getAllPostInfo();
  return { props: { posts } };
};
