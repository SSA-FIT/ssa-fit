import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { exerciseRecord } from '../../types/historyTypes';
import ExerciseItemCard from './ExerciseItemCard';

interface Props {
  exerciseHistoryDay: exerciseRecord;
}
const DayHistoryCard: React.FC<Props> = ({ exerciseHistoryDay }) => {
  const [timeSum, setTimeSum] = useState<string>('00:00:00');

  useEffect(() => {
    exerciseHistoryDay.exercise.forEach((exerciseHistory) => {
      if (exerciseHistory.durationTime !== null) {
        setTimeSum(
          `${
            parseInt(exerciseHistory.durationTime?.split(':')[0], 10) +
            parseInt(timeSum.split(':')[0], 10)
          }:${
            parseInt(exerciseHistory.durationTime?.split(':')[1], 10) +
            parseInt(timeSum.split(':')[1], 10)
          }:${
            parseInt(exerciseHistory.durationTime?.split(':')[2], 10) +
            parseInt(timeSum.split(':')[2], 10)
          }`,
        );
      }
    });
  }, []);
  return (
    <>
      <DayWrapper>
        <DescroptionWrapper>
          <Day>{exerciseHistoryDay.date}</Day>
          <Sum>
            {exerciseHistoryDay.exercise.length}개 | {timeSum}
          </Sum>
        </DescroptionWrapper>
        <ExerciseWrapper>
          {exerciseHistoryDay.exercise.map((exerciseItem) => (
            <ExerciseItemCard
              key={exerciseItem.exerciseId}
              exerciseItem={exerciseItem}
            />
          ))}
        </ExerciseWrapper>
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

export default DayHistoryCard;
