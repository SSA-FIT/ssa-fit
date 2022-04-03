import styled from '@emotion/styled';
import useHistoryList from '../../hooks/useHistoryList';
import HistoryService from '../../services/HistoryService';
import { ExerciseHistoryList, exerciseRecord } from '../../types/historyTypes';
import DateSelect from './DateSelect';
import DayHistoryCard from './DayHistoryCard';

const ExerciseHistory: React.FC = () => {
  const exerciseHistoryList: exerciseRecord[] = useHistoryList(
    '2022',
    '4',
    '1',
  );
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
                    <DateSelect labelType="Year" />
                    <DateSelect labelType="Month" />
                    <DateSelect labelType="Week" />
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
