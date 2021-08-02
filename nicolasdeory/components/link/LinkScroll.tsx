import { As, Link, LinkProps } from "@chakra-ui/react";
import { Link as LinkScrolling } from "react-scroll";

type LinkScrollProps = {
  to: string;
  children: string;
  onClick?: () => void;
};

export default function LinkScroll({ to, children, onClick, ...props }: LinkScrollProps & LinkProps) {
  return (
    <Link
      onClick={onClick}
      as={LinkScrolling}
      to={to}
      smooth={true}
      offset={-150}
      variant="dark"
      fontWeight="semibold"
      {...props}
    >
      {children}
    </Link>
  );
}
