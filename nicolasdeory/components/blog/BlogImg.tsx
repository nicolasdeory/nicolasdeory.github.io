import { Image } from "@chakra-ui/react";

export default function BlogImg({ src, alt }) {
  return (
    <Image
      margin="0 auto"
      maxHeight="60vh"
      src={src}
      alt={alt}
      mb="20px"
      _hover={{ transform: "scale(1.5)", boxShadow: "0 0 12px #0004" }}
      transition="0.2s"
    />
  );
}
