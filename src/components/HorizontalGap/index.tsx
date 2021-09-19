import styled from '@emotion/styled';

const HorizontalGap = styled.span<{ gap: number }>`
  margin-right: ${({ gap }) => gap}px;
`;

export default HorizontalGap;
