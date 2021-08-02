import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Section from "./Section";

const ContactFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid address")
    .required("Email is required")
    .max(100)
    .trim(),
  name: Yup.string().required("Name is required").max(100).trim(),
  message: Yup.string().required("Message is required").max(1000).trim(),
});

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function ContactMe() {

  const toast = useToast();

  function submitForm(values, { setSubmitting }) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...values,
      }),
    })
      .then(() => {
        toast({
          title: "Message sent",
          description: "I'll get back to you shortly.",
          status: "success",
          duration: 9000,
          isClosable: true,
          variant: "solid",
        });
        setSubmitting(false);
      })
      .catch((error) => {
        toast({
          title: "Error sending message",
          description: "Sorry, something went wrong. Try again later?",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "solid",
        });
        setSubmitting(false);
      });
  }

  return (
    <Section title="Contact me" id="contact-me" sectionAbove="All Projects">
      <Formik
        initialValues={{ email: "", name: "", message: "" }}
        onSubmit={submitForm}
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
              <Button variant="dark" type="submit" size="lg" isLoading={isSubmitting}>
                Send message
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Section>
  );
}
