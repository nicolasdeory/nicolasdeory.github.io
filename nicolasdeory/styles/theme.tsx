import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "300px",
  md: "700px",
  lg: "1200px",
  xl: "1400px",
  "2xl": null,
});

const Button = {
  baseStyle: {
    _focus: {boxShadow: "none"}
  },
  variants: {
    dark: {
      px: "25px",
      bg: "button.dark.bg",
      color: "white",
      _hover: {
        bg: "button.dark.hover"
      },
      _active: {
        bg: "button.dark.active"
      }
    },
  },
  defaultProps: {
    variant: "dark",
  },
};

const Link = {
  baseStyle: {
    _focus: { boxShadow: "none" },
    userSelect: "none"
  },
  variants: {
    dark: {
      color: "#222",
      fontWeight: "semibold",
      _hover: {
        color: "#666",
        textDecoration: "none"
      },
      _active: {
        color: "#63bb3e"
      }
    },
    darkunderline: {
      textDecoration: "underline",
      color: "#222",
      fontWeight: "semibold",
      _hover: {
        color: "#666"
      },
      _active: {
        color: "#63bb3e"
      }
    }
  },
  defaultProps: {
    variant: "darkunderline"
  }
}

const theme = extendTheme({
  colors: {
    text: {
      body: "#222",
      light: "#8C8C8C",
    },
    line: {
      light: "#D9E2D5",
    },
    button: {
      dark: {
        bg: "#222",
        hover: "#333",
        active: "#111",
      }
    },
    body: "#222",
    bg: "#FAFFF9",
  },
  components: { Button, Link },
  fonts: {
    heading: "Source Sans Pro",
    body: "Source Sans Pro",
  },
  breakpoints,
});

export default theme;
