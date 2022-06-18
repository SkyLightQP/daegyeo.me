import styled from '@emotion/styled';

const VerticalGap = styled.span<{ gap: number }>`
  margin-bottom: ${({ gap }) => gap}px;
`;

export default VerticalGap;
