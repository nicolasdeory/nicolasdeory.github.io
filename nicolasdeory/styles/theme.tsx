import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import tinycolor from "tinycolor2";

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
    outline: {
      _hover: {
        bg: "button.outline.hover"
      },
      _active: {
        bg: "button.outline.active",
        color: "white"
      }
    }
  },
  defaultProps: {
    variant: "dark",
  },
};

const Link = {
  baseStyle: {
    _focus: { boxShadow: "none" },
  },
  variants: {
    dark: {
      color: "text.body",
      fontWeight: "semibold",
      _hover: {
        color: "link.hover",
        textDecoration: "none"
      },
      _active: {
        color: "link.active"
      }
    },
    darkunderline: {
      textDecoration: "underline",
      color: "link.text",
      fontWeight: "semibold",
      _hover: {
        color: "link.hover"
      },
      _active: {
        color: "link.active"
      }
    }
  },
  defaultProps: {
    variant: "darkunderline"
  }
}

const bgColor = "#FAFFF9";

const theme = extendTheme({
  colors: {
    text: {
      body: "#222",
      light: "#8C8C8C",
    },
    link: {
      text: "#222",
      hover: "#666",
      active: "#5bcc2b"
    },
    line: {
      light: "#D9E2D5",
    },
    button: {
      dark: {
        bg: "#222",
        hover: "#333",
        active: "#111",
      },
      outline: {
        hover: "#0001",
        active: "#222"
      }
    },
    body: "#222",
    bg: bgColor,
    header: {
      menu: tinycolor(bgColor).darken(3).desaturate(70).toString(),
    }
  },
  components: { Button, CloseButton: Button, Link },
  fonts: {
    heading: "Source Sans Pro",
    body: "Source Sans Pro",
  },
  breakpoints,
});

export default theme;
