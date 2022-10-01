import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import HeaderBreadcrumbContext from "../context/HeaderBreadcrumbContext";
import Header from "../header/Header";
import Footer from "../section/Footer";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  title?: string;
  metaDescription?: string;
  metaCreated?: Date;
  isMainPage?: boolean;
};

export default function Layout({
  children,
  title,
  metaDescription,
  metaCreated,
  isMainPage,
}: LayoutProps) {
  const bgColor = useColorModeValue("light.bg", "dark.bg");
  const textBodyColor = useColorModeValue("light.text.body", "dark.text.body");

  const [headerBreadcrumb, setHeaderBreadcrumb] = useState(null);
  const value = { headerBreadcrumb, setHeaderBreadcrumb };

  return (
    <>
      {
        <Head>
          <title>
            {title && `${title} |`} Nicolás de Ory | Fullstack & Mobile
            Development, UI/UX Design
          </title>
          {metaDescription && (
            <meta name="description" content={metaDescription} />
          )}
          {metaCreated && (
            <meta
              name="date.created"
              content={metaCreated.toISOString().split("T")[0]}
            />
          )}
        </Head>
      }
      <Flex
        bg={bgColor}
        w="100%"
        color={textBodyColor}
        id="top"
        minH="100vh"
        direction="column"
      >
        <HeaderBreadcrumbContext.Provider value={value}>
          <Header isMainPage={isMainPage} />
          <Flex
            px={{ base: "40px", md: "85px" }}
            pb="100px"
            pt={{ base: "80px", md: "0" }}
            direction="column"
            align="center"
          >
            {children}
          </Flex>
          <Footer />
        </HeaderBreadcrumbContext.Provider>
      </Flex>
    </>
  );
}
