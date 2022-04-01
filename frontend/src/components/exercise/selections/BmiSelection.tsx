import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';

const Base = styled.div`
  margin-bottom: 42px;
  position: relative;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

const BmiSelection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  interface ExerciseSelection {
    id: number;
    linkUrl: string;
    title: string;
    poster_path: string;
  }

  const ExerciseSelections: ExerciseSelection[] = [
    {
      id: 0,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 1,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 2,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 3,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 4,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 5,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 6,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 7,
      linkUrl: 'www.naver.com',
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
  ];
  return (
    <Base>
      <Title>BMI 기반 운동 추천</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {ExerciseSelections.map((ExerciseSelection) => (
            <Card
              key={ExerciseSelection.id}
              linkUrl={ExerciseSelection.linkUrl}
              title={ExerciseSelection.title}
              posterPath={ExerciseSelection.poster_path}
            />
          ))}
        </Slider>
      )}
    </Base>
  );
};

export default BmiSelection;
