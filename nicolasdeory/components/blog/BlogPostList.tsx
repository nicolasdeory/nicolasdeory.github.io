import { VStack } from "@chakra-ui/react";
import { BlogPostLinkProps } from "../hero/BlogPostLink";
import BlogPostLinkExtended from "./BlogPostLinkExtended";

type BlogPostListProps = {
  noAnim?: boolean;
  posts: BlogPostLinkProps[];
};

export default function BlogPostList({ noAnim, posts }: BlogPostListProps) {
  const links = posts.map((post) => {
    return <BlogPostLinkExtended {...post} noAnim={noAnim} key={post.url} />;
  });

  return (
    <>
      {links}
      {/* <BlogPostLinkExtended
        title="Simple IPC using Named Pipes in .NET Core"
        date={new Date()}
        url="/2021/07/simple-ipc-named-pipes"
        noAnim={noAnim}
      >
        A practical guide to implementing inter-process communication in .NET
        Core using named pipes.
      </BlogPostLinkExtended>
      <BlogPostLinkExtended
        title="Simple IPC using Named Pipes in .NET Core"
        date={new Date()}
        url="/2021/07/simple-ipc-named-pipes"
        noAnim={noAnim}
      >
        A practical guide to implementing inter-process communication in .NET
        Core using named pipes.
      </BlogPostLinkExtended>
      <BlogPostLinkExtended
        title="Simple IPC using Named Pipes in .NET Core"
        date={new Date()}
        url="/2021/07/simple-ipc-named-pipes"
        noAnim={noAnim}
      >
        A practical guide to implementing inter-process communication in .NET
        Core using named pipes.
      </BlogPostLinkExtended> */}
    </>
  );
}
