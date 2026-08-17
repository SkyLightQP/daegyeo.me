'use client';

import { FC, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/react';
import Breakpoint from '../../../styles/Breakpoint';
import ImageDetailModal from '../../Dialogs/ImageDetailModal';

interface ImageViewProps {
  readonly images: { url: string; alt: string }[];
}

const ImageGroup = styled.div`
  display: flex;
  flex-direction: row;

  & > img {
    margin-right: 16px;
  }

  & > img:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    overflow-x: auto;
  }
`;

const StyledImage = styled(Image)`
  width: auto;
  height: 80px;
  border-radius: 6px;
  cursor: pointer;
`;

export const ImageView: FC<ImageViewProps> = ({ images }) => {
  const modal = useDisclosure();
  const [modalContext, setModalContext] = useState({
    url: '',
    alt: ''
  });

  const onImageClick = (url: string, alt: string) => {
    setModalContext({ url, alt });
    modal.onOpen();
  };

  return (
    <>
      <ImageGroup>
        {images.map(({ url, alt }) => (
          <StyledImage key={url} src={url} alt={alt} width="147" height="80" onClick={() => onImageClick(url, alt)} />
        ))}
      </ImageGroup>
      <ImageDetailModal modalController={modal} image={modalContext} />
    </>
  );
};
