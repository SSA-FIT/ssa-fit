import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';

const BmiSelection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  interface ExerciseSelection {
    id: number;
    title: string;
    poster_path: string;
  }

  const ExerciseSelections: ExerciseSelection[] = [
    {
      id: 0,
      title: '등/어깨 뒤쪽 스트레칭',
      poster_path: '/images/common/sample1.jpg',
    },
    {
      id: 1,
      title: '조깅',
      poster_path: '/images/common/sample2.jpg',
    },
    {
      id: 2,
      title: '자전거',
      poster_path: '/images/common/sample3.jpg',
    },
    {
      id: 3,
      title: '줄넘기',
      poster_path: '/images/common/sample4.jpg',
    },
    {
      id: 4,
      title: '서서 균형잡기',
      poster_path: '/images/common/sample5.jpg',
    },
    {
      id: 5,
      title: '목 스트레칭',
      poster_path: '/images/common/sample6.jpg',
    },
    {
      id: 6,
      title: '수영',
      poster_path: '/images/common/sample7.jpg',
    },
    {
      id: 7,
      title: '빠르게걷기',
      poster_path: '/images/common/sample8.jpg',
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
              title={ExerciseSelection.title}
              posterPath={ExerciseSelection.poster_path}
            />
          ))}
        </Slider>
      )}
    </Base>
  );
};
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

export default BmiSelection;
