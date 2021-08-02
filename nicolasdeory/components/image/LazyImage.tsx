import { Box, BoxProps, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type LazyImageProps = {
  src: string;
  placeholderWidth?: string;
  placeholderHeight?: string;
  alt: string;
  onError?: () => void;
};

export default function LazyImage({
  src,
  placeholderWidth,
  placeholderHeight,
  alt,
  ...props
}: LazyImageProps & BoxProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => setError(false), [src]);

  return (
    <Skeleton
      isLoaded={loaded || error}
      w={loaded ? "inherit" : placeholderWidth}
      h={loaded ? "inherit" : placeholderHeight}
      {...props}
    >
      <Box>
        <Image
          src={src}
          onError={() => setError(true)}
          onLoad={() => {
            console.log("loaded!");
            setLoaded(true);
          }}
          alt={alt}
          {...props}
        />
        <Flex
          w="150px"
          h="200px"
          align="center"
          justify="center"
          bg="light.600"
          px="20px"
          display={error ? "flex" : "none"}
        >
          <Text align="center">Error cargando la imagen</Text>
        </Flex>
      </Box>
    </Skeleton>
  );
}
