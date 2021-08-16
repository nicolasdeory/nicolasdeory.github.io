import { Box } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import ContactMe from "../components/section/ContactMe";

export default function ContactMePage() {
  return (
    <Layout>
      <Box mt="50px" w="100%">
        <ContactMe />
      </Box>
    </Layout>
  );
}
