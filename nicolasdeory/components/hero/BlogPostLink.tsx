import { Box, Link, Text } from "@chakra-ui/react";

type BlogPostLinkProps = {
    children: string,
    date: Date,
    url: string
}

export default function BlogPostLink({ children, date, url }: BlogPostLinkProps) {
  
  const dateString = date.toLocaleString('en-US', {day: "numeric", month: 'short', year: 'numeric'});
  
    return (
    <Box>
      <Link size="sm" fontWeight="semibold" href={url} variant="dark">
        {children}
      </Link>
      <Text fontSize="md" color="text.light">
        {dateString}
      </Text>
    </Box>
  );
}
