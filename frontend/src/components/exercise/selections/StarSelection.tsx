import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import { Recommendation } from '../../../types/recommendationTypes';

const StarSelection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ExerciseSelections: Recommendation[] = [
    {
      id: 0,
      name: '등/어깨 뒤쪽 스트레칭',
      imageURL: '/images/common/sample1.jpg',
      description: '',
    },
    {
      id: 1,
      name: '조깅',
      imageURL: '/images/common/sample2.jpg',
      description: '',
    },
    {
      id: 2,
      name: '자전거',
      imageURL: '/images/common/sample3.jpg',
      description: '',
    },
    {
      id: 3,
      name: '줄넘기',
      imageURL: '/images/common/sample4.jpg',
      description: '',
    },
    {
      id: 4,
      name: '서서 균형잡기',
      imageURL: '/images/common/sample5.jpg',
      description: '',
    },
    {
      id: 5,
      name: '목 스트레칭',
      imageURL: '/images/common/sample6.jpg',
      description: '',
    },
    {
      id: 6,
      name: '수영',
      imageURL: '/images/common/sample7.jpg',
      description: '',
    },
    {
      id: 7,
      name: '빠르게걷기',
      imageURL: '/images/common/sample8.jpg',
      description: '',
    },
  ];
  return (
    <Base>
      <Title>OOO님이 좋아했던 운동 추천</Title>
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

export default StarSelection;
