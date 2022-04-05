import React from 'react';
import ReactSlick, { Settings } from 'react-slick';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

interface Props {
  settings?: Settings;
  length: number;
}

const Slider: React.FC<Props> = ({ children, length }) => {
  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: length < 5 ? length : 6,
    slidesToScroll: length < 5 ? length : 3,
    swipe: true,
    draggable: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: length < 5 ? length : 5,
          slidesToScroll: length < 4 ? length : 4,

          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: length < 4 ? length : 4,
          slidesToScroll: length < 3 ? length : 3,

          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: length < 3 ? length : 3,
          slidesToScroll: length < 3 ? length : 3,

          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: length < 2 ? length : 2,
          slidesToScroll: length < 2 ? length : 2,

          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: (
      <ArrowButton pos="left">
        <ArrowBackIosRoundedIcon />
      </ArrowButton>
    ),
    nextArrow: (
      <ArrowButton pos="right">
        <ArrowForwardIosRoundedIcon />
      </ArrowButton>
    ),
  };

  return (
    <>
      <ReactSlick className="ssafit" {...settings}>
        {children}
      </ReactSlick>
    </>
  );
};

const ArrowButton = styled.button<{ pos?: 'left' | 'right' }>`
  padding: 16px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  z-index: 1;
  top: 50%;
  //background-color: #6367ffaa;
  ${({ pos }) =>
    pos === 'left'
      ? css`
          left: 0;
          transform: translate(-50%, -50%);
        `
      : css`
          right: 0;
          transform: translate(50%, -50%);
        `};
  &:before {
    content: initial;
  }
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    color: #222;
  }
`;

export default Slider;
