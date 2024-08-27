import styled from '@emotion/styled';

const NavigationItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;

  cursor: pointer;

  padding: 10px;

  ${(props) => (props.active ? 'font-weight: bold;' : '')};

  & > svg {
    margin-right: 2px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default NavigationItem;
