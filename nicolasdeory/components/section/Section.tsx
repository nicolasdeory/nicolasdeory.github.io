import {
  Box,
  BoxProps,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Element } from "react-scroll";
import { Waypoint } from "react-waypoint";
import HeaderBreadcrumbContext from "../context/HeaderBreadcrumbContext";

type SectionProps = {
  title: string;
  id: string;
  sectionAbove?: string;
  children?: JSX.Element | JSX.Element[];
};

export default function Section({
  title,
  children,
  id,
  sectionAbove,
  ...props
}: SectionProps & BoxProps) {
  const headingSize = useBreakpointValue({ base: "lg", md: "xl", lg: "2xl" });

  const { setHeaderBreadcrumb } = useContext(HeaderBreadcrumbContext);

  return (
    <Box {...props} w="100%">
      <Element name={id} />
      <Heading align="center" fontWeight="900" size={headingSize}>
        {title}
      </Heading>
      <Waypoint
        onEnter={() => {
          setHeaderBreadcrumb(title);
        }}
        onLeave={(v) => {
          if (v.currentPosition === Waypoint.below) setHeaderBreadcrumb(sectionAbove);
        }}
      />
      <Flex
        w="100%"
        align="center"
        direction="column"
        mt={{ base: "40px", lg: "100px" }}
      >
        {children}
      </Flex>
    </Box>
  );
}
