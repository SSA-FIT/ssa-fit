import React from 'react';
import ReactSlick, { Settings } from 'react-slick';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

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
        <MdArrowBackIos />
      </ArrowButton>
    ),
    nextArrow: (
      <ArrowButton pos="right">
        <MdArrowForwardIos />
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
// const Slider: React.FC<Props> = ({
//   // settings = DEFAULT_SETTINGS,
//   children,
//   length,
// }) => <ReactSlick {...settings}>{children}</ReactSlick>;

const ArrowButton = styled.button<{ pos?: 'left' | 'right' }>`
  padding: 16px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  z-index: 1;
  top: 50%;
  background-color: #fff;
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

const DEFAULT_SETTINGS: Settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
  swipe: true,
  draggable: true,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 4,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
      <MdArrowBackIos />
    </ArrowButton>
  ),
  nextArrow: (
    <ArrowButton pos="right">
      <MdArrowForwardIos />
    </ArrowButton>
  ),
};

export default Slider;
