import styled from '@emotion/styled';

const NavigationItem = styled.div<{ active?: boolean }>`
  cursor: pointer;

  padding: 10px;

  ${(props) => (props.active ? 'font-weight: bold;' : '')};

  &:hover {
    text-decoration: underline;
  }
`;

export default NavigationItem;
