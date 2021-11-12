import { Box } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";

export default function BlogOl({ children }) {
  return (
    <VStack as="ol" pl="30px" mb="20px" align="start"  fontSize="md">
      {children}
    </VStack>
  );
}
