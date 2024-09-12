import React, { FC } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Breakpoint from '../../../styles/Breakpoint';

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
  border-radius: 10px;
`;

export const ImageView: FC<ImageViewProps> = ({ images }) => {
  return (
    <ImageGroup>
      {images.map(({ url, alt }) => (
        <StyledImage key={url} src={url} alt={alt} width="147" height="80" />
      ))}
    </ImageGroup>
  );
};
