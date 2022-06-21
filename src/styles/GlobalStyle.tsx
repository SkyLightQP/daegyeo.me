import React from 'react';
import { Global, css } from '@emotion/react';
import Colors from './Colors';

const GlobalStyle: React.FC = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'IBMPlexSansKR';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Light.woff') format('woff');
          font-weight: 300;
        }

        @font-face {
          font-family: 'IBMPlexSansKR';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
          font-weight: normal;
        }

        @font-face {
          font-family: 'IBMPlexSansKR';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Bold.woff') format('woff');
          font-weight: bold;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;

          font-family: 'IBMPlexSansKR', sans-serif;
        }

        body {
          background-color: ${Colors.BACKGROUND};
          overflow-x: hidden;
        }

        a {
          text-decoration: none;
          color: inherit;

          &:hover {
            text-decoration: underline;
          }
        }

        ::selection {
          background-color: ${Colors.BACKGROUND_DARK};
          color: ${Colors.BACKGROUND};
        }

        ::-moz-selection {
          background-color: ${Colors.BACKGROUND_DARK};
          color: ${Colors.BACKGROUND};
        }
      `}
    />
  );
};

export default GlobalStyle;
