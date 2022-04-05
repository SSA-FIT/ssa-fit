/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const commonStyles = css`
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }

  &.slick-slide {
    height: 370px;
    object-fit: contain;
  }

  &.slick-slide img {
    height: 370px;
    object-fit: contain;
  }
`;

export default commonStyles;
