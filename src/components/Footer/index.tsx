import React from 'react';
import { css } from '@emotion/css';
import ContentBlock from '../ContentBlock';

const Footer: React.FC = () => {
  return (
    <ContentBlock title="">
      <p>
        이 페이지는{' '}
        <a href="https://skylightqp.kr">
          <b>skylightqp.kr</b>
        </a>{' '}
        으로도 들어올 수 있습니다.
      </p>
      <p>
        <a href="https://github.com/SkyLightQP/resume/" target="_target">
          <b>GitHub</b>
        </a>{' '}
        에서 코드를 확인할 수 있습니다.
      </p>
      <p
        className={css(`
        margin-top: 10px;
      `)}
      >
        Copyright 2022-{new Date().getFullYear()}. Daegyeom Ha. All rights reserved.
      </p>
    </ContentBlock>
  );
};

export default Footer;
