import { Box, Heading, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";

export default function HeroDescription() {
  return (
    <HStack alignItems="stretch" spacing={{base: "30px", md: "60px"}}>
      <Box minW={{base: "4px", md:"8px"}} bg="line.light" />
      <Box>
        <Image
          src="https://avatars.githubusercontent.com/u/1417708?v=4"
          borderRadius="full"
          boxSize={{base: "100px", md: "150px"}}
          alt="Profile picture of Nicolás de Ory"
          mb="20px"
        />
        <VStack spacing="20px" align="start" fontSize={{base: "md", md: "xl"}}>
          <Heading fontStyle="italic" fontSize={{base: "20pt", md: "30pt"}} fontWeight="normal">
            Hi, I&apos;m{" "}
            <Text as="span" fontWeight="semibold">
              Nicolás
            </Text>{" "}
            :-)
          </Heading>
          <Text>
            I&apos;m a Software Engineer from Spain.
            <br />I am passionate about building products from the ground up.
          </Text>
          <Text>
            My contributions in projects are focused around{" "}
            <Text as="span" fontWeight="semibold">
              Fullstack & Mobile Development
            </Text>{" "}
            and{" "}
            <Text as="span" fontWeight="semibold">
              UI/UX design
            </Text>
            .
          </Text>
          <Text>
            Feel free to poke around and{" "}
            <Link>shoot me a message</Link> if you have any
            questions.
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
}
