import styled from '@emotion/styled';
import Colors from '../../styles/Colors';
import Breakpoint from '../../styles/Breakpoint';

/* Legacy */
export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

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

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    font-size: 18px;
  }
`;

export const LargeHintedText = styled.span`
  font-size: 16px;
  color: ${Colors.GRAY_DARKEN};
`;

export const ContentListItem = styled.li`
  width: 630px;
  font-size: 16px;
  word-break: break-all;
  padding-left: 12px;
  text-indent: -12px;
  list-style-type: none;

  &::before {
    content: '- ';
  }

  @media screen and (max-width: 700px) {
    width: 300px;
  }
`;
