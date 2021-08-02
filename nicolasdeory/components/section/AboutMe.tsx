import { Grid, Image, Link, Text, VStack } from "@chakra-ui/react";
import Section from "./Section";

export default function AboutMe() {

  return (
    <Section title="About me" mt="20px" id="about-me" sectionAbove={null}>
      <Grid templateColumns={["1fr","1fr","1fr","auto 2fr"]} maxW="1000px" gap={{base: "40px", lg: "80px"}} fontSize="lg" >
        <Image src="profile_pic1.jpg" alt="A photo of Nicolás" h="400px" mx={{base: "auto", md: "0"}}/>
        <VStack align="start" textAlign="justify" h="100%" justify="center">
          <Text>
            My name is Nicolás de Ory Carmona. You’re welcome to call me Nico
            :-)
          </Text>
          <Text>
            I was born in <i>Seville, Spain</i>. I did my major in Software
            Engineering in the University of Seville.
          </Text>
          <Text>
            Throughout these years my main focus has been on experimenting and
            learning different technologies with the main goal of creating <b>production-ready</b>,
            maintainable code while always striving to <b>create value</b> for
            the client.
          </Text>
          <Text>
            I’m especially passionate about building products from the ground
            up, actively participating from the earliest stages of{" "}
            <b>product design</b>, and always aiming for <b>excellent UX</b> for
            the end user.
          </Text>
          <Text>
            Thanks for dropping by! If you have any questions, feel free to{" "}
            <Link>shoot me an email</Link>.
          </Text>
        </VStack>
      </Grid>
    </Section>
  );
}
