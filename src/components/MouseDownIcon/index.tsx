import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Keyframe = keyframes`
  from {
    opacity: 1;
    top: 10px;
  }
  to {
    opacity: 0;
    top: 30px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 20px;
  height: 40px;

  border: 1px solid white;
  border-radius: 60px;

  &:before {
    content: '';

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: white;

    animation: ${Keyframe} 1.5s ease infinite;
  }
`;

const MouseDownIcon: React.FC = () => {
  return <Wrapper />;
};

export default MouseDownIcon;
