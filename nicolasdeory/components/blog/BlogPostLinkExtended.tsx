import { Box, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react";
import RevealInView from "../animation/RevealInView";
import { BlogPostLinkProps } from "../hero/BlogPostLink";

export default function BlogPostLinkExtended({
  title,
  url,
  date,
  description,
  noAnim
}: BlogPostLinkProps) {
  const lineBg = useColorModeValue("light.line.light", "dark.line.light");
  const textLight = useColorModeValue("light.text.light", "dark.text.light");

  const dateString = date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <RevealInView disabled={noAnim}>
      <HStack align="stretch" spacing="20px">
        <Box minW="4px" bg={lineBg}></Box>
        <Box fontSize={{ base: "md", lg: "lg" }}>
          <Link fontSize={{ base: "lg", lg: "2xl" }} variant="dark" href={url}>
            {title}
          </Link>
          <Text color={textLight}>{dateString}</Text>
          <Text align="justify">
            {description}
          </Text>
        </Box>
      </HStack>
    </RevealInView>
  );
}
