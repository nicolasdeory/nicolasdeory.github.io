import { Box, BoxProps, Flex, Heading } from "@chakra-ui/react";
import { Element } from "react-scroll";

type SectionProps = {
  title: string;
  id: string;
  children?: JSX.Element | JSX.Element[];
};

export default function Section({
  title,
  children,
  id,
  ...props
}: SectionProps | BoxProps) {
  return (
    <Box {...props} w="100%">
      <Element name={id} />
      <Heading align="center" fontWeight="900" size="2xl">
        {title}
      </Heading>
      <Flex w="100%" align="center" direction="column" mt="100px">
        {children}
      </Flex>
    </Box>
  );
}
