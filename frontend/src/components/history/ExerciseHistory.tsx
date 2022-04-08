import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useToken from '../../hooks/useToken';
import HistoryService from '../../services/HistoryService';
import { exerciseRecord } from '../../types/historyTypes';
import DateSelect from './DateSelect';
import DayHistoryCard from './DayHistoryCard';

function getWeekOfMonth(date: Date) {
  const startWeekDayIndex = 1; // 1 MonthDay 0 Sundays
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = firstDate.getDay();

  let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
  if (startWeekDayIndex === 1) {
    if (date.getDay() === 0 && date.getDate() > 1) {
      weekNumber -= 1;
    }

    if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
      weekNumber += 1;
    }
  }
  return weekNumber;
}

const ExerciseHistory: React.FC = () => {
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [week, setWeek] = useState<string>('');
  const [exerciseHistoryList, setExerciseHistoryList] = useState<
    exerciseRecord[]
  >([]);

  const token = useToken();

  useEffect(() => {
    setYear(`${new Date().getFullYear()}`);
    setMonth(`${new Date().getMonth() + 1}`);
    setWeek(`${getWeekOfMonth(new Date())}`);
    // if (labelType === 'Year') {
    //   setValue(date);
    // }
    // if (labelType === 'Month') {
    //   setValue(date);
    // }
    // if (labelType === 'Week') {
    //   setValue(date);
    // }
  }, []);

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
            <SignUpName>운동 이력 조회</SignUpName>
            <HistoryWrapper>
              <HistoryDateWrapper>
                <HistoryDate>
                  <HistoryDay>
                    {`${year}년
                    ${month}월 ${week}주차`}
                  </HistoryDay>
                  <SelectWrapper>
                    <DateSelect
                      date={year}
                      labelType="Year"
                      setYear={setYear}
                      setMonth={setMonth}
                      setWeek={setWeek}
                    />
                    <DateSelect
                      date={month}
                      labelType="Month"
                      setYear={setYear}
                      setMonth={setMonth}
                      setWeek={setWeek}
                    />
                    <DateSelect
                      date={week}
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
  box-sizing: border-box;
  padding: 0 2rem;

  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const Contents = styled.div`
  margin: 0 auto;
  padding: 4rem 2rem 13rem;
  box-sizing: border-box;

  @media (min-width: 1060px) {
    max-width: 128rem;
    padding: 6rem 6rem 10rem;
  }

  @media (max-width: 667px) {
    padding-right: 0px;
    padding-bottom: 2rem;
    padding-left: 0px;
  }
`;

const SignUpName = styled.h1`
  margin-bottom: 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 2rem;

  @media (min-width: 1060px) {
    font-weight: 400;
    font-size: 3.2rem;
  }
`;

const HistoryWrapper = styled.div`
  margin-top: 64px;
`;

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

  @media (max-width: 575px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const HistoryDay = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #000;

  @media (max-width: 575px) {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;

  @media (max-width: 575px) {
    width: 100%;
    justify-content: space-evenly;
    margin-top: 15px;
  }

  @media (max-width: 575px) {
    flex-direction: column;
  }
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
  color: #02aab0;
  text-align: center;
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: initial;
`;

export default ExerciseHistory;
