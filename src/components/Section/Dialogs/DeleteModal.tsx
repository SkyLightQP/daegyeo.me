import React from 'react';
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
import { SubmitHandler } from 'react-hook-form';

interface SectionDeleteModalProps {
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly onDeleteClick: () => void;
}

const SectionDeleteModal: React.FC<SectionDeleteModalProps> = ({ modalController, onDeleteClick }) => {
  const { isOpen, onClose } = modalController;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>섹션 삭제하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          섹션 내 컨텐츠가 없을 때만 삭제가 가능합니다.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            취소
          </Button>
          <Button colorScheme='red' ml={3} onClick={onDeleteClick}>
            삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SectionDeleteModal;
