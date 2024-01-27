import {
  Box,
  HStack,
  SimpleGrid,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

type ProjectGridProps = {
  children: JSX.Element[];
  reversed?: boolean;
};

export default function ProjectCarousel({
  children,
  reversed,
}: ProjectGridProps) {
  const boxWidth = useBreakpointValue({
    base: "300px",
    md: "400px",
    lg: "450px",
  });
  const boxSpacing = useBreakpointValue({
    base: "20px",
    md: "20px",
    lg: "50px",
  });
  return (
    <Box w="100vw" overflowX="clip">
      <Box
        css={{
          transition: "1s ease-out",
          ":hover": {
            transform: reversed ? "translateX(2%)" : "translateX(-2%)",
          },
        }}
      >
        <HStack
          w="fit-content"
          spacing={boxSpacing}
          css={{
            animationName: `marquee${reversed ? "r" : ""}`,
            animationDuration: "45s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            [`@keyframes marquee${reversed ? "r" : ""}`]: {
              "0%": {
                transform: reversed ? "translateX(-50%)" : "translateX(0)",
              },
              "100%": {
                transform: reversed ? "translateX(0)" : "translateX(-50%)",
              },
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
