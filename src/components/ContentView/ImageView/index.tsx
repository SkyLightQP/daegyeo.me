import React, { FC } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Breakpoint from '../../../styles/Breakpoint';

interface ImageViewProps {
  readonly urls: string[];
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

export const ImageView: FC<ImageViewProps> = ({ urls }) => {
  return (
    <ImageGroup>
      {urls.map((src) => (
        <StyledImage key={src} src={src} alt="프로젝트 썸네일" width="147" height="80" />
      ))}
    </ImageGroup>
  );
};
