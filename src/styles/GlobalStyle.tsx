'use client';

import React from 'react';
import { Global, css } from '@emotion/react';
import Colors from './Colors';

const GlobalStyle: React.FC = () => {
  return (
    <Global
      styles={css`
        @import url('https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          font-family: 'SUIT Variable', sans-serif;
          font-weight: 500;
          background-color: ${Colors.SECONDARY};
          color: ${Colors.BLACK};
        }

        a {
          text-decoration: none;
          color: inherit;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        ::selection {
          background-color: ${Colors.GRAY_DARKEN};
          color: ${Colors.SECONDARY};
        }

        ::-moz-selection {
          background-color: ${Colors.GRAY_DARKEN};
          color: ${Colors.SECONDARY};
        }
      `}
    />
  );
};

export default GlobalStyle;
