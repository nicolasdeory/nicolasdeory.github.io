import { Box } from "@chakra-ui/layout";
import Highlight from "react-highlight";

export default function BlogCode({ children, className }) {
  return (
    <Box mb="20px">
      <Highlight className={className}>{children}</Highlight>
    </Box>
  );
}
