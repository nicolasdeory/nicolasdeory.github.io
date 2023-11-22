import { Box, HStack, SimpleGrid, useBreakpointValue, VStack } from "@chakra-ui/react";

type ProjectGridProps = {
  children: JSX.Element[];
};

export default function ProjectCarousel({ children }: ProjectGridProps) {
  const boxWidth = useBreakpointValue({ base: "300px", md: "400px", lg: "600px" });
  const boxSpacing = useBreakpointValue({ base: "20px", md: "20px", lg: "50px" });
  return (
    <Box w="100vw" overflowX="clip">
      <Box
        css={{
          transition: "1s ease-out",
          ":hover": {
            transform: "translateX(-2%)",
          },
        }}
      >
        <HStack
          w="fit-content"
          spacing={boxSpacing}
          css={{
            animationName: "marquee",
            animationDuration: "45s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            "@keyframes marquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
            ":hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {children.map((x, i) => (
            <Box key={i} w={boxWidth}>
              {x}
            </Box>
          ))}
          {children.map((x, i) => (
            <Box key={i} w={boxWidth}>
              {x}
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
