'use client';

import React from 'react';
import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import styled from '@emotion/styled';
import Colors from '../../styles/Colors';

interface ImageDetailModalProps {
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly image: { url: string; alt: string };
}

const StyledModalContent = styled(ModalContent)`
  position: relative;
  background-color: transparent;
  box-shadow: none;

  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 6px;
  width: auto;
  max-height: 85vh;
`;

const ImageLabel = styled.p`
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
  color: ${Colors.SECONDARY};
`;

const ImageDetailModal: React.FC<ImageDetailModalProps> = ({ modalController, image }) => {
  const { isOpen, onClose } = modalController;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <StyledModalContent>
        <ModalBody>
          <StyledImage
            src={image.url}
            alt={image.alt}
            width={1024}
            height={768}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP0rAcAARcAyjleRTkAAAAASUVORK5CYII="
          />
          <ImageLabel>{image.alt}</ImageLabel>
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default ImageDetailModal;
