import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { exerciseRecord } from '../../types/historyTypes';
import ExerciseItemCard from './ExerciseItemCard';
interface Props {
  exerciseHistoryDay: exerciseRecord;
}
const DayHistoryCard: React.FC<Props> = ({ exerciseHistoryDay }) => {
  const restImage: string[] = [
    `\\img\\orange.gif`,
    `\\img\\broccoli.gif`,
    `\\img\\coffee.gif`,
    `\\img\\mushroom.gif`,
    `\\img\\potato.gif`,
    `\\img\\avocado.gif`,
    `\\img\\taco.gif`,
    `\\img\\donut.gif`,
    `\\img\\pothos.gif`,
  ];
  return (
    <>
      <DayWrapper>
        <DescroptionWrapper>
          <Day>{exerciseHistoryDay.date}</Day>
          <Sum>{exerciseHistoryDay.exercise.length}개 |</Sum>
        </DescroptionWrapper>
        {exerciseHistoryDay.exercise.length !== 0 ? (
          <ExerciseWrapper>
            {exerciseHistoryDay.exercise.map((exerciseItem) => (
              <ExerciseItemCard
                key={exerciseItem.exerciseId}
                exerciseItem={exerciseItem}
              />
            ))}
          </ExerciseWrapper>
        ) : (
          <RestDayWrapper>
            <RestImage src={restImage[Math.floor(Math.random() * 9)]} />
          </RestDayWrapper>
        )}
      </DayWrapper>
    </>
  );
};

const DayWrapper = styled.div`
  background-color: #fafafa;
  padding: 20px 24px;
  border-radius: 6px;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  @media (min-width: 1060px) {
    padding: 30px 20px;
  }
`;

const DescroptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Day = styled.p`
  line-height: 1.375;
  font-size: 14px;
  font-weight: 600;
  color: #303033;
  margin: 0px;
`;

const Sum = styled.p`
  margin: 0px;
  color: #868a93;
  font-size: 14px;
  font-weight: 500;
`;

const ExerciseWrapper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 1060px) {
    grid-template-columns: repeat(5, minmax(0px, 1fr));
  }
`;

const RestDayWrapper = styled.div`
  background: #fff;
  text-align: center;
`;

const RestImage = styled.img`
  height: 200px;
`;
export default DayHistoryCard;
