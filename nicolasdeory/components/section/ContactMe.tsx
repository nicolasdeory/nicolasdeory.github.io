import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  propNames,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import BlogPostLinkExtended from "../blog/BlogPostLinkExtended";
import Section from "./Section";
import * as Yup from "yup";

const ContactFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid address")
    .required("Email is required")
    .max(100)
    .trim(),
  name: Yup.string().required("Name is required").max(100).trim(),
  message: Yup.string().required("Message is required").max(1000).trim(),
});

export default function ContactMe() {
  const lightTextColor = useColorModeValue(
    "light.text.light",
    "dark.text.light"
  );

  return (
    <Section title="Contact me" id="blog" sectionAbove="All Projects">
      <Formik
        initialValues={{ email: "", name: "", message: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={ContactFormSchema}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <VStack align="stretch" spacing="20px" maxW="800px" w="100%">
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email" id="label-email">
                      E-mail address
                    </FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="your@email.com"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name" id="label-name">
                      Name
                    </FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Your name"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="message">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.message && form.touched.message}
                  >
                    <FormLabel htmlFor="message" id="label-message">
                      Message
                    </FormLabel>
                    <Textarea
                      {...field}
                      id="message"
                      placeholder="Any questions?"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button type="submit" size="lg" isLoading={isSubmitting}>
                Send message
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Section>
  );
}
