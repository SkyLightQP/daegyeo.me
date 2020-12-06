import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyle: React.FC = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'IBMPlexSansKR';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Light.woff')
            format('woff');
          font-weight: 300;
        }

        @font-face {
          font-family: 'IBMPlexSansKR';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff')
            format('woff');
          font-weight: normal;
        }

        @font-face {
          font-family: 'IBMPlexSansKR';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Bold.woff')
            format('woff');
          font-weight: bold;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;

          font-family: 'IBMPlexSansKR', sans-serif;
        }

        body {
          background-color: #f0f4f5;
        }

        ::selection {
          background-color: #1c1c1c;
          color: #f0f4f5;
        }

        ::-moz-selection {
          background-color: #1c1c1c;
          color: #f0f4f5;
        }
      `}
    />
  );
};

export default GlobalStyle;
