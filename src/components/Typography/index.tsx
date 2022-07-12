import styled from '@emotion/styled';

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const HugeTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

export const Body = styled.p`
  font-size: 18px;

  @media screen and (max-width: 420px) {
    font-size: 16px;
  }
`;

export const Subtitle = styled.span`
  font-size: 16px;

  @media screen and (max-width: 420px) {
    font-size: 14px;
  }
`;
