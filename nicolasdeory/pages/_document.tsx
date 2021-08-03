
import { ColorModeScript } from "@chakra-ui/system"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import Footer from "../components/section/Footer"
import theme from "../styles/theme"
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}