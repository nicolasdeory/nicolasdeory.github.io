import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useRef } from "react";

export type ConfirmationModalProps = Omit<GenericConfirmationModalProps, "title" | "children">

export interface GenericConfirmationModalProps {
  /**
   * Whether the modal is open or not
   */
  isOpen: boolean;
  /**
   * Callback when the modal is closed
   */
  onClose: () => void;
  /**
   * Callback when the modal is accepted
   */
  onAccept: () => void;
  /**
   * Whether the modal should show a loading indicator
   */
  isLoading?: boolean;
  /**
   * Title of the modal
   */
  title: string;
  /**
   * Text of the main "confirm" button
   */
  confirmButtonText?: string;
  children: React.ReactNode; 
}

export default function ConfirmationModal({
  title,
  confirmButtonText,
  children,
  isOpen,
  onClose,
  onAccept,
  isLoading,
}: GenericConfirmationModalProps) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{children}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} size="sm">
              Cancelar
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={onAccept}
              ml="5px"
              isLoading={isLoading}
            >
              {confirmButtonText??"Eliminar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
