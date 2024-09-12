import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import styled from '@emotion/styled';
import Colors from '../../styles/Colors';

interface ImageDetailModalProps {
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly image: { url: string; alt: string };
}

const ImageLabel = styled.p`
  font-size: 14px;
  text-align: center;
  padding: 8px 0;
  color: ${Colors.GRAY_DARKEN};
`;

const ImageDetailModal: React.FC<ImageDetailModalProps> = ({ modalController, image }) => {
  const { isOpen, onClose } = modalController;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Image src={image.url} alt={image.alt} width={1024} height={768} />
          <ImageLabel>{image.alt}</ImageLabel>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageDetailModal;
