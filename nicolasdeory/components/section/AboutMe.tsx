import { Grid, Image, Link, Text, VStack } from "@chakra-ui/react";
import LazyImage from "../image/LazyImage";
import LinkScroll from "../link/LinkScroll";
import Section from "./Section";

export default function AboutMe() {
  return (
    <Section title="About me" mt="20px" id="about-me" sectionAbove={null}>
      <Grid
        templateColumns={["1fr", "1fr", "1fr", "auto 2fr"]}
        maxW="1000px"
        gap={{ base: "40px", lg: "80px" }}
        fontSize="lg"
      >
        <LazyImage
          src="pfp2.jpg"
          alt="A photo of Nicolás"
          placeholderWidth="260px"
          h="400px"
          mx={{ base: "auto", md: "0" }}
        />
        <VStack align="start" textAlign="justify" h="100%" justify="center">
          <Text>
            My name is Nicolás de Ory Carmona. You’re welcome to call me Nico
            :-)
          </Text>
          <Text>
            I was born in <i>Seville, Spain</i>. I did my major in Software
            Engineering in the <i>University of Seville</i>, and a semester in
            the <i>Institut Supérieur d’Electronique de Paris</i>.
          </Text>
          <Text>
            Throughout these years my main focus has been on experimenting and
            learning different technologies with the main goal of creating{" "}
            <b>robust, reliable and maintainable code</b>, while always striving
            to <b>create value</b> for the client.
          </Text>
          <Text>
            I’m especially passionate about building products from the ground
            up, actively participating from the earliest stages of{" "}
            <b>product design</b>, and always aiming for <b>excellent UX</b> for
            the end user.
          </Text>
          <Text>
            Thanks for dropping by! If you have any questions, feel free to{" "}
            <LinkScroll to="contact-me" variant="darkunderline">
              shoot me an email
            </LinkScroll>
            .
          </Text>
        </VStack>
      </Grid>
    </Section>
  );
}
