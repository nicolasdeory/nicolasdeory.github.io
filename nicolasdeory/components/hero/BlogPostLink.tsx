import { Box, Link, Text } from "@chakra-ui/react";

export interface BlogPostInfoProps {
  title?: string;
  description?: string;
  url?: string;
  date?: Date;
}

export interface BlogPostLinkProps extends BlogPostInfoProps {
  noAnim?: boolean;
}

export default function BlogPostLink({
  title,
  date,
  url,
}: BlogPostLinkProps) {

  const dateString = date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Box>
      <Link size="sm" fontWeight="semibold" href={url} variant="dark">
        {title}
      </Link>
      <Text fontSize="md" color="text.light">
        {dateString}
      </Text>
    </Box>
  );
}
