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

  // useEffect(() => {
  //   if (year !== '' && month !== '' && week !== '') {
  //     // const exerciseHistoryList: exerciseRecord[] = useHistoryList(
  //     //   year,
  //     //   month,
  //     //   week,
  //     // );

  //     async function fetchEntireExerciseList() {
  //       if (token !== null) {
  //         const HistoryListData = await HistoryService.getExerciseHistory(
  //           {
  //             month,
  //             week,
  //             year,
  //           },
  //           token,
  //         );

  //         setExerciseHistoryList(HistoryListData.exerciseHistory);
  //         // setBookMarkList(HistoryListData.exerciseHistory);
  //       }
  //     }
  //     fetchEntireExerciseList();
  // }, [year, month, week]);

  return (
    <>
      <ContainerWrapper>
        <Container>
          <Contents>
            <HistoryWrapper>
              <HistoryDateWrapper>
                <HistoryDate>
                  <HistoryDay>3월 1주차</HistoryDay>
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
                {exerciseHistoryList.map((exerciseHistoryDay) => (
                  <DayHistoryCard
                    key={exerciseHistoryDay.date}
                    exerciseHistoryDay={exerciseHistoryDay}
                  />
                ))}
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
export default ExerciseHistory;
