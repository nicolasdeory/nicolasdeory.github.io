import {
  Box,
  Code,
  Flex,
  Heading,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import BlogDate from "../components/blog/BlogDate";
import BlogH1 from "../components/blog/BlogH1";
import BlogH2 from "../components/blog/BlogH2";
import BlogP from "../components/blog/BlogP";
import Header from "../components/header/Header";
import SyntaxHighlighter from "react-syntax-highlighter";
import BlogCode from "../components/blog/BlogCode";
import BlogInlineCode from "../components/blog/BlogInlineCode";
import BlogUl from "../components/blog/BlogUl";
import BlogOl from "../components/blog/BlogOl";
import BlogQuote from "../components/blog/BlogQuote";
import BlogA from "../components/blog/BlogA";
import Footer from "../components/section/Footer";
import { DiscussionEmbed } from "disqus-react";
import { padStart } from "lodash";
import BlogImg from "../components/blog/BlogImg";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";

interface BlogEntryProps {
  title: string;
  description: string;
  date: string;
}

interface PostProps extends BlogEntryProps {
  mdx: MDXRemoteSerializeResult;
  path: string;
  articleId: string;
}

export default function Post({
  mdx,
  articleId,
  path,
  title,
  description,
  date,
}: PostProps) {
  const textBodyColor = useColorModeValue("light.text.body", "dark.text.body");
  const bgColor = useColorModeValue("light.bg", "dark.bg");

  // Hack to make light/dark theme transitions work on disqus
  const [disqusThemeKey, setDisqusThemeKey] = useState(textBodyColor);
  useEffect(() => {
    setTimeout(() => {
      setDisqusThemeKey(textBodyColor);
    }, 200);
  }, [textBodyColor]);

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
          <Heading>{title}</Heading>
          <BlogDate date={date} />
          <MDXRemote
            {...mdx}
            components={{
              h1: BlogH1,
              h2: BlogH2,
              p: BlogP,
              a: BlogA,
              code: BlogCode,
              ul: BlogUl,
              ol: BlogOl,
              img: BlogImg,
              blockquote: BlogQuote,
              inlineCode: BlogInlineCode,
              BlogDate,
            }}
          />
          <Box
            w="100%"
            maxW={{ base: "100%", md: "800px" }}
          >
            <DiscussionEmbed
              key={disqusThemeKey}
              shortname="nicolasdeory"
              config={{
                url: "https://nicolasdeory.com/" + path,
                identifier: articleId,
                title,
                language: "en_US",
              }}
            />
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
}

const postsDirectory = path.join(process.cwd(), "_posts");

export const getStaticProps: GetStaticProps = async (props) => {
  const filePath = path.join(postsDirectory, `${props.params.post[2]}.mdx`);
  const source = fs.readFileSync(filePath);
  const { data, content } = matter(source.toString());
  const processedData = {
    title: data.title,
    description: data.description,
    path:
      props.params.post[0] +
      "/" +
      props.params.post[1] +
      "/" +
      props.params.post[2],
    date: data.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };
  return {
    props: {
      ...processedData,
      articleId: props.params.post[2],
      mdx: await serialize(content, { scope: processedData }),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(postsDirectory);
  return {
    paths: files.map((file) => {
      const source = fs.readFileSync(path.join(postsDirectory, file));
      const { data } = matter(source.toString());
      const date = data.date;
      return {
        params: {
          post: [
            date.getFullYear().toString(),
            padStart(date.getMonth() + 1, 2, "0"),
            file.replace(/\.mdx$/, ""),
          ],
        },
      };
    }),
    fallback: false,
  };
};
