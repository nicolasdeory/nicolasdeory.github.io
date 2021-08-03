import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react"
import LinkScroll from "../link/LinkScroll";

export default function Footer() {

  const footerBgColor = useColorModeValue("light.footer.bg","dark.footer.bg");

  return (
    <Flex bg={footerBgColor} justify="center" py="20px" minH="200px" align="center" flexGrow={1}>
      <LinkScroll to="top" color="dark.text.body">Back to top</LinkScroll>
    </Flex>
    );

}