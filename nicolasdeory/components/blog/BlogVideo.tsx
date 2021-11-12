import { AspectRatio } from "@chakra-ui/layout";

export default function BlogVideo({ id, ratio }) {
  return (
    <AspectRatio w="100%" ratio={ratio??16/9} mb="20px">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allowFullScreen
      />
    </AspectRatio>
  );
}
