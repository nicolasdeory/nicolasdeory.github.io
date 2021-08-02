
import { ColorModeScript } from "@chakra-ui/system"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "../styles/theme"
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}