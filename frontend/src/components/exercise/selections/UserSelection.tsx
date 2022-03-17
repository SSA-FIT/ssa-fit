import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';

const UserSelection: React.FC = () => {
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
      title: '수영',
      poster_path: '/images/common/sample7.jpg',
    },
  ];
  return (
    <Base>
      <Title>오늘의 운동</Title>
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
  margin-bottom: 21px;
  position: relative;
  bottom: 0;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

export default UserSelection;
