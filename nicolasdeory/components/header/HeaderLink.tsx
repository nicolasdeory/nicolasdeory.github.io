import { Link } from "@chakra-ui/react";
import LinkScroll from "../link/LinkScroll";

type HeaderLinkProps = {
  children: string;
  to: string;
  onClick?: () => void;
};

export default function HeaderLink({ children, to, onClick }: HeaderLinkProps) {
  return (
    <Link as={LinkScroll} fontWeight="semibold" variant="dark" to={to} onClick={onClick}>
      {children}
    </Link>
  );
}
