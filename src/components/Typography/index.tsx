import styled from '@emotion/styled';
import Colors from '../../styles/Colors';
import Breakpoint from '../../styles/Breakpoint';

/* Legacy */
export const HugeTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

/* Redesign */
export const SectionTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${Colors.PRIMARY};

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    font-size: 22px;
  }
`;

export const LargeContentText = styled.p`
  font-size: 20px;
  font-weight: 600;

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    font-size: 18px;
  }
`;

export const LargeHintedText = styled.span`
  font-size: 16px;
  color: ${Colors.GRAY_DARKEN};
`;
