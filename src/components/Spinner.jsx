import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";

function CustomSpinner() {
  return (
    <Modal isOpen={true} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="transparent"
        boxShadow="none"
        border="none"
        borderRadius="none"
      >
        <ModalBody textAlign="center">
          <Spinner />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CustomSpinner;
