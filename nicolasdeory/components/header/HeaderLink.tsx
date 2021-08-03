import { Link } from "@chakra-ui/react";
import LinkScroll from "../link/LinkScroll";

type HeaderLinkProps = {
  children: string;
  to: string;
  onClick?: () => void;
  href?: string;
};

// if href is defined, it will redirect. if to is defined, it will scroll to the link.
export default function HeaderLink({
  children,
  to,
  onClick,
  href,
}: HeaderLinkProps) {
  return (
    <Link
      as={href ? null : LinkScroll}
      fontWeight="semibold"
      variant="dark"
      to={to}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
