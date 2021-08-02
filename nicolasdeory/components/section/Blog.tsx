import { Link, VStack } from "@chakra-ui/react";
import BlogPostLinkExtended from "../blog/BlogPostLinkExtended";
import Section from "./Section";

export default function Blog() {
  return (
    <Section title="Blog" id="blog" sectionAbove="All Projects">
      <VStack align="stretch" w="100%" spacing="50px" maxW="800px">
        <BlogPostLinkExtended
          title="Simple IPC using Named Pipes in .NET Core"
          date={new Date()}
          url="/2021/07/simple-ipc-named-pipes"
        >
          A practical guide to implementing inter-process communication in .NET
          Core using named pipes.
        </BlogPostLinkExtended>
        <BlogPostLinkExtended
          title="Simple IPC using Named Pipes in .NET Core"
          date={new Date()}
          url="/2021/07/simple-ipc-named-pipes"
        >
          A practical guide to implementing inter-process communication in .NET
          Core using named pipes.
        </BlogPostLinkExtended>
        <BlogPostLinkExtended
          title="Simple IPC using Named Pipes in .NET Core"
          date={new Date()}
          url="/2021/07/simple-ipc-named-pipes"
        >
          A practical guide to implementing inter-process communication in .NET
          Core using named pipes.
        </BlogPostLinkExtended>
        <Link variant="dark" href="/all-posts" fontSize="xl">See all posts</Link>
      </VStack>
    </Section>
  );
}
