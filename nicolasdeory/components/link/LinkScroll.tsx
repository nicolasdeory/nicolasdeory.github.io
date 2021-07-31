import { Link } from "@chakra-ui/react";
import { Link as LinkScrolling } from "react-scroll";

type LinkScrollProps = {
  to: string;
  children: string;
};

export default function LinkScroll({ to, children }: LinkScrollProps) {
  return (
    <LinkScrolling to={to} smooth={true} offset={-150}>
      <Link variant="dark" fontWeight="semibold">
        {children}
      </Link>
    </LinkScrolling>
  );
}
