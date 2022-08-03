import styled from '@emotion/styled';

const VerticalGap = styled.div<{ gap: number }>`
  margin-bottom: ${({ gap }) => gap}px;
`;

export default VerticalGap;
