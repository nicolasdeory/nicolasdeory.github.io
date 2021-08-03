import { Heading, HStack, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { useCallback, useContext, useEffect, useState } from "react";
import HeaderBreadcrumbContext from "../context/HeaderBreadcrumbContext";

const MotionHStack = motion(HStack);

export default function MainName({ isMainPage }: { isMainPage?: boolean }) {
  const controls = useAnimation();

  const { headerBreadcrumb, setHeaderBreadcrumb } = useContext(
    HeaderBreadcrumbContext
  );
  const [headerBreadcrumbText, setHeaderBreadcrumbText] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function doAnim() {
      await controls.start({ opacity: 0, transition: { duration: 0.1 } });
      setHeaderBreadcrumbText(headerBreadcrumb);
      if (headerBreadcrumb) {
        await controls.start({ opacity: 1, transition: { duration: 0.1 } });
      }
    }
    doAnim();
  }, [headerBreadcrumb, controls]);

  const onMainNameClicked = useCallback(() => {
    if (isMainPage) {
      scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }, [isMainPage, router]);

  return (
    <HStack>
      <Heading
        size="md"
        fontWeight="semibold"
        cursor="pointer"
        onClick={onMainNameClicked}
      >
        Nicolás de Ory
      </Heading>
      <MotionHStack
        display={{ base: "none", md: "inherit" }}
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <Text>•</Text>
        <Text fontWeight="semibold">{headerBreadcrumbText}</Text>
      </MotionHStack>
    </HStack>
  );
}
