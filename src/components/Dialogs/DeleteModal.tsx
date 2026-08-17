'use client';

import React, { PropsWithChildren } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';

interface DeleteModalProps {
  readonly title: string;
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly onDeleteClick: () => void;
}

const DeleteModal: React.FC<PropsWithChildren<DeleteModalProps>> = ({
  title,
  modalController,
  onDeleteClick,
  children
}) => {
  const { isOpen, onClose } = modalController;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} fontWeight="normal">
            취소
          </Button>
          <Button colorScheme="red" ml={3} fontWeight="normal" onClick={onDeleteClick}>
            삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
