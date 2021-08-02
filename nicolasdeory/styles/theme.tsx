import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
import tinycolor from "tinycolor2";

const colMode = (props) => mode("light", "dark")(props);

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const breakpoints = createBreakpoints({
  sm: "300px",
  md: "700px",
  lg: "1200px",
  xl: "1400px",
  "2xl": null,
});

const Button = {
  baseStyle: {
    _focus: { boxShadow: "none" },
  },
  variants: {
    dark: (props) => ({
      px: "25px",
      bg: colMode(props) + ".button.dark.bg",
      color: colMode(props) + ".button.dark.color",
      _hover: {
        bg: colMode(props) + ".button.dark.hover",
        _disabled: {
          bg: colMode(props) + ".button.dark.bg",
        },
      },
      _active: {
        bg: colMode(props) + ".button.dark.active",
      },
    }),
    outline: (props) => ({
      _hover: {
        bg: colMode(props) + ".button.outline.hover",
      },
      _active: {
        bg: colMode(props) + ".button.outline.active",
        color: colMode(props) + ".button.outline.color",
      },
    }),
  },
  defaultProps: {
    variant: "outline",
  },
};

const Link = {
  baseStyle: {
    _focus: { boxShadow: "none" },
  },
  variants: {
    dark: (props) => ({
      color: colMode(props) + ".text.body",
      fontWeight: "semibold",
      _hover: {
        color: colMode(props) + ".link.hover",
        textDecoration: "none",
      },
      _active: {
        color: colMode(props) + ".link.active",
      },
    }),
    darkunderline: (props) => ({
      textDecoration: "underline",
      color: colMode(props) + ".link.text",
      fontWeight: "semibold",
      _hover: {
        color: colMode(props) + ".link.hover",
      },
      _active: {
        color: colMode(props) + ".link.active",
      },
    }),
  },
  defaultProps: {
    variant: "darkunderline",
  },
};

const Alert = {
  parts: ['container'],
  variants: {
    success: {
      container: {
        color: "white"
      },
    },
  },
};

const bgColorLight = "#FAFFF9";
const bgColorDark = "#2B2D42";

const darkAccent = "#FCA311";

const theme = extendTheme({
  colors: {
    light: {
      text: {
        body: "#222",
        bold: "#222",
        light: "#8C8C8C",
      },
      link: {
        text: "#222",
        hover: "#666",
        active: "#5bcc2b",
      },
      line: {
        light: "#D9E2D5",
      },
      card: {
        bg: "#fff",
      },
      button: {
        dark: {
          color: "white",
          bg: "#222",
          hover: "#333",
          active: "#111",
        },
        outline: {
          hover: "#0001",
          active: "#222",
          color: "white",
        },
      },
      body: "#222",
      bg: bgColorLight,
      header: {
        menu: tinycolor(bgColorLight).darken(3).desaturate(70).toString(),
      },
    },
    dark: {
      text: {
        body: "#fff",
        bold: darkAccent,
        light: tinycolor(bgColorDark).lighten(50).toString(),
      },
      link: {
        text: "#fff",
        hover: tinycolor(bgColorDark).lighten(40).toString(),
        active: tinycolor(bgColorDark).lighten(40).toString(),
      },
      line: {
        light: tinycolor(bgColorDark).lighten(10).toString(),
      },
      card: {
        bg: tinycolor(bgColorDark).lighten(10).toString(),
      },
      button: {
        dark: {
          color: "#222",
          bg: tinycolor(darkAccent).toString(),
          hover: tinycolor(darkAccent).lighten(20).toString(),
          active: tinycolor(darkAccent).darken(5).saturate(20).toString(),
        },
        outline: {
          hover: "#0001",
          active: "#fff",
          color: "#222",
        },
      },
      body: "#222",
      bg: bgColorDark,
      header: {
        menu: tinycolor(bgColorDark).lighten(3).toString(),
      },
    },
  },
  components: { Button, CloseButton: Button, Link, Alert },
  fonts: {
    heading: "Source Sans Pro",
    body: "Source Sans Pro",
  },
  styles: {
    global: (props) => ({
      div: {
        transition: "background, background-color 0.2s",
      },
      b: {
        color: colMode(props) + ".text.bold",
      },
      i: {
        color: colMode(props) + ".text.bold",
      },
    }),
  },
  breakpoints,
  config,
});

export default theme;
