import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useHistoryList from '../../hooks/useHistoryList';
import useToken from '../../hooks/useToken';
import HistoryService from '../../services/HistoryService';
import { ExerciseHistoryList, exerciseRecord } from '../../types/historyTypes';
import DateSelect from './DateSelect';
import DayHistoryCard from './DayHistoryCard';

const ExerciseHistory: React.FC = () => {
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [week, setWeek] = useState<string>('');
  const [exerciseHistoryList, setExerciseHistoryList] = useState<
    exerciseRecord[]
  >([]);

  const token = useToken();

  useEffect(() => {
    async function fetchEntireExerciseList() {
      if (token !== null && year !== '' && month !== '' && week !== '') {
        const HistoryListData = await HistoryService.getExerciseHistory(
          {
            month,
            week,
            year,
          },
          token,
        );

        setExerciseHistoryList(HistoryListData.exerciseHistory);
      }
    }

    fetchEntireExerciseList();
  }, [year, month, week]);

  return (
    <>
      <ContainerWrapper>
        <Container>
          <Contents>
            <HistoryWrapper>
              <HistoryDateWrapper>
                <HistoryDate>
                  <HistoryDay>
                    {year !== '' && month !== '' && week !== ''
                      ? `${year}년
                    ${month}월 ${week}주차`
                      : `운동 이력 조회`}
                  </HistoryDay>
                  <SelectWrapper>
                    <DateSelect
                      labelType="Year"
                      setYear={setYear}
                      setMonth={setMonth}
                      setWeek={setWeek}
                    />
                    <DateSelect
                      labelType="Month"
                      setYear={setYear}
                      setMonth={setMonth}
                      setWeek={setWeek}
                    />
                    <DateSelect
                      labelType="Week"
                      setYear={setYear}
                      setMonth={setMonth}
                      setWeek={setWeek}
                    />
                  </SelectWrapper>
                </HistoryDate>
                {exerciseHistoryList.length === 0 ? (
                  <DescriptionWrapper>
                    <Description>
                      조회하고 싶은 운동 주간을 골라보세요.
                    </Description>
                  </DescriptionWrapper>
                ) : (
                  exerciseHistoryList.map((exerciseHistoryDay) => (
                    <DayHistoryCard
                      key={exerciseHistoryDay.date}
                      exerciseHistoryDay={exerciseHistoryDay}
                    />
                  ))
                )}
              </HistoryDateWrapper>
            </HistoryWrapper>
          </Contents>
        </Container>
      </ContainerWrapper>
    </>
  );
};

const ContainerWrapper = styled.div``;

const Container = styled.div`
  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const Contents = styled.div`
  margin: 0 auto;
  padding: 4rem 2rem 13rem;

  @media (min-width: 1060px) {
    max-width: 128rem;
    padding: 6rem 0 10rem;
  }
`;

const HistoryWrapper = styled.div``;

const HistoryDateWrapper = styled.div`
  position: sticky;
  left: 0px;
  width: 100%;
  z-index: 5;
  overflow: hidden;
  transition: all 0.3s ease 0s;
  background-color: rgb(255, 255, 255);
  height: auto;

  @media (min-width: 1060px) {
    display: block;
  }
`;

const HistoryDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 4px 14px;

  @media (min-width: 1060px) {
    padding: 14px 0px;
  }
`;

const HistoryDay = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

const SelectWrapper = styled.div`
  display: flex;
`;

const DescriptionWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 500px;
  background-color: #fafafa;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const Description = styled.h5`
  color: #6367ffcc;
  text-align: center;
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: initial;
`;

export default ExerciseHistory;