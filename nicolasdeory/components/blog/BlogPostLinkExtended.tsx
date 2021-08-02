import { Box, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { BlogPostLinkProps } from "../hero/BlogPostLink";

export default function BlogPostLinkExtended({title, children, url, date}: BlogPostLinkProps) {
  const lineBg = useColorModeValue("light.line.light", "dark.line.light");
  const textLight = useColorModeValue("light.text.light", "dark.text.light");

  const dateString = date.toLocaleString('en-US', {day: "numeric", month: 'short', year: 'numeric'});

  return (
    <HStack align="stretch" spacing="20px">
      <Box minW="4px" bg={lineBg}></Box>
      <Box fontSize={{ base: "md", lg: "lg" }}>
        <Link fontSize={{ base: "lg", lg: "2xl" }} variant="dark" href={url}>
          Simple IPC using Named Pipes in .NET Core
        </Link>
        <Text color={textLight}>{dateString}</Text>
        <Text align="justify">
          A practical guide to implementing inter-process communication in .NET
          Core using named pipes.
        </Text>
      </Box>
    </HStack>
  );
}
