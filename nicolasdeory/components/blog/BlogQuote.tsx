import { Box } from "@chakra-ui/layout";
import { HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";

export default function BlogQuote({ children }: { children: JSX.Element }) {
  const lineBg = useColorModeValue("light.line.light", "dark.line.light");
  const textColorLight = useColorModeValue(
    "light.text.light",
    "dark.text.light"
  );

  // Remove margin introduced by BlogP
  const newChild = React.cloneElement(children, {mb: 0});

  return (
    <HStack
      as="ol"
      mb="20px"
      align="stretch"
      fontStyle="italic"
      spacing="20px"
      color={textColorLight}
    >
      <Box minW="4px" bg={lineBg}></Box>
      <Box>{newChild}</Box>
    </HStack>
  );
}
