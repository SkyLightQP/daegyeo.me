import styled from '@emotion/styled';

export const ProjectTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

export const ProjectBody = styled.p`
  font-size: 18px;

  @media screen and (max-width: 420px) {
    font-size: 16px;
  }
`;

export const ProjectDate = styled.span`
  font-size: 16px;

  @media screen and (max-width: 420px) {
    font-size: 14px;
  }
`;
