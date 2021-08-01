import { Link } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderIconLinkProps = {
  href: string;
  icon: IconDefinition;
};

export default function HeaderIconLink({ href, icon }: HeaderIconLinkProps) {
  return (
    <Link fontSize="xl" href={href} isExternal>
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
}
