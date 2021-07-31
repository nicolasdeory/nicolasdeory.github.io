import { Box, BoxProps, Flex, Heading } from "@chakra-ui/react";

type SectionProps = {
  title: string;
  children?: JSX.Element | JSX.Element[];
};

export default function Section({ title, children, ...props }: SectionProps | BoxProps) {
  return (
    <Box {...props} w="100%">
      <Heading align="center" fontWeight="900" size="2xl">{title}</Heading>
      <Flex w="100%" align="center" direction="column" mt="100px">
        {children}
      </Flex>
    </Box>
  );
}
