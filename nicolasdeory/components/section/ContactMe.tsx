import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Scroll from "react-scroll";
import * as Yup from "yup";
import Section from "./Section";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const ContactFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid address")
    .required("Email is required")
    .max(100)
    .trim(),
  name: Yup.string().required("Name is required").max(100).trim(),
  message: Yup.string().required("Message is required").max(1000).trim(),
  recaptcha: Yup.string().required("Please verify you are not a robot"),
});

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function ContactMe() {
  const toast = useToast();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  function submitForm(
    values,
    { setSubmitting, resetForm }: FormikProps<typeof ContactFormSchema>
  ) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...values,
        "g-recaptcha-response": values.recaptcha,
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
        resetForm();
        recaptchaRef.current.reset();
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
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
    <Section title="Contact me" id="contact-me" sectionAbove="All projects">
      <Formik
        initialValues={{ email: "", name: "", message: "", recaptcha: "" }}
        onSubmit={submitForm}
        validationSchema={ContactFormSchema}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            name="contact"
            data-netlify
            data-netlify-honeypot="message-more"
            data-netlify-recaptcha="true"
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
              <Field name="recaptcha">
                {({ field, form }) => (
                  <>
                    <ReCAPTCHA
                      id="recaptcha"
                      ref={recaptchaRef}
                      onChange={(response) => {
                        setFieldValue("recaptcha", response);
                      }}
                      sitekey="6LdakhYkAAAAAMqOaSGazpX6IZ4fLMRjhaxfa9Mz"
                    />
                    {form.errors.recaptcha && (
                      <Text color="red.600" fontSize="sm">
                        {form.errors.recaptcha}
                      </Text>
                    )}
                  </>
                )}
              </Field>
              <Button
                variant="dark"
                type="submit"
                size="lg"
                isLoading={isSubmitting}
              >
                Send message
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Section>
  );
}
