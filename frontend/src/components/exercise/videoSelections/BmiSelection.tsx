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

const VideoSelection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  interface ExerciseSelection {
    id: number;
    title: string;
    poster_path: string;
  }

  const ExerciseSelections: ExerciseSelection[] = [
    {
      id: 0,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 1,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 2,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 3,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 4,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 5,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 6,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
    {
      id: 7,
      title: '상지 루틴 운동',
      poster_path: '/images/common/ssafit_logo.png',
    },
  ];
  return (
    <Base>
      <Title>상지 루틴 영상 목록</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {/* {ExerciseSelections.map((ExerciseSelection) => (
            <Card
              key={ExerciseSelection.id}
              name={ExerciseSelection.name}
              imageURL={ExerciseSelection.imageURL}
            />
          ))} */}
        </Slider>
      )}
    </Base>
  );
};

export default VideoSelection;
