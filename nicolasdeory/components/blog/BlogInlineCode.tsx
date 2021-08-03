import { Box } from "@chakra-ui/layout";
import { Text, useColorModeValue } from "@chakra-ui/react";
import Highlight from "react-highlight";

export default function BlogInlineCode({ children }) {
  const codeColor = useColorModeValue("light.code.span", "dark.code.span");

  return (
    <Text as="span" fontFamily="monospace" bg={codeColor} px="5px" borderRadius="5px">
      {children}
    </Text>
  );
}
