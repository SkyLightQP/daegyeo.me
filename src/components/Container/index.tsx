'use client';

import styled from '@emotion/styled';

export const Container = styled.div`
  margin: 8rem 172px;

  :lang(ko) {
    word-break: keep-all;
  }

  & > div {
    margin-bottom: 64px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 700px) {
    margin: 6rem 36px;
  }
`;
