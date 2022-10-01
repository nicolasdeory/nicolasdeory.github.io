import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import BlogPostDisplay from "../../components/blog/BlogPostDisplay";
import BlogSubtitle from "../../components/blog/BlogSubtitle";
import Layout from "../../components/layout/Layout";

interface BlogEntryProps {
  title: string;
  description: string;
  date: string;
}

interface ProjectProps extends BlogEntryProps {
  mdx: MDXRemoteSerializeResult;
  githubUrl?: string;
}

export default function Post({
  mdx,
  title,
  description,
  date,
  githubUrl,
}: ProjectProps) {
  // TODO THE META DATE CREATED ISN'T SPECIFIED CORRECTLY
  return (
    <Layout metaDescription={description} metaCreated={new Date(date)}>
      <Flex w="100%" direction="column" align="center" mb="50px">
        <Box
          px={{ base: "0px", md: "85px" }}
          pb="100px"
          pt={{ base: "120px", md: "80px" }}
          maxW={{ base: "100%", md: "800px" }}
          fontSize={{ base: "md", md: "lg" }}
        >
          <HStack spacing="20px">
            <Heading>{title}</Heading>
            {githubUrl && (
              <Link fontSize="xl" href={githubUrl} isExternal>
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            )}
          </HStack>
          <BlogSubtitle subtitle={description} />
          <BlogPostDisplay {...mdx} />
        </Box>
      </Flex>
    </Layout>
  );
}

const postsDirectory = path.join(process.cwd(), "_projects");

export const getStaticProps: GetStaticProps = async (props) => {
  const filePath = path.join(postsDirectory, `${props.params.project}.mdx`);
  const source = fs.readFileSync(filePath);
  const { data, content } = matter(source.toString());
  const processedData = {
    title: data.title,
    description: data.description,
    githubUrl: data.githubUrl ?? null,
    url: data.url ?? null,
    date: data.date ?? new Date().toISOString().split("T")[0],
  };
  return {
    props: {
      ...processedData,
      mdx: await serialize(content, { scope: processedData }),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(postsDirectory);
  return {
    paths: files.map((file) => {
      return {
        params: {
          project: [file.replace(/\.mdx$/, "")],
        },
      };
    }),
    fallback: false,
  };
};
