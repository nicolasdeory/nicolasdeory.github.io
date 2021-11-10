import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import ConfirmationModal from "./ConfirmationModal";

export default function DemoConfirmationModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant="dark" mb="20px">Try me!</Button>
      <ConfirmationModal
        title="Confirmation Modal"
        isOpen={isOpen}
        onAccept={onClose}
        onClose={onClose}
        confirmButtonText="Confirm"
      >
        This can be reused everywhere!
      </ConfirmationModal>
    </>
  );
}
