import { IconButton, Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ColorModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()

  if (colorMode == "light") {
    return (
      <IconButton
        aria-label="Switch to Dark Mode"
        icon={<MoonIcon />}
        variant="outline"
        onClick={toggleColorMode}
      />
    );
  } else {
    return (
      <IconButton
        aria-label="Switch to Light Mode"
        variant="outline"
        icon={<SunIcon />}
        onClick={toggleColorMode}
      />
    );
  }
}
