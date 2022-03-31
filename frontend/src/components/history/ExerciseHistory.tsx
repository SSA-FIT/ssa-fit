import styled from '@emotion/styled';
import { ExerciseHistoryList } from '../../types/historyTypes';
import DateSelect from './DateSelect';
import DayHistoryCard from './DayHistoryCard';

const ExerciseHistory: React.FC = () => {
  const exerciseHistoryList: ExerciseHistoryList = {
    exerciseHistory: [
      {
        date: '22.03.30',
        exercise: [
          {
            exerciseId: 1,
            name: '등/어깨운동',
            countPerSet: '3.5',
            setCount: 3,
            durationTime: '01:33:44',
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: true,
          },
          {
            exerciseId: 3,
            name: '스쿼트',
            countPerSet: '5',
            setCount: 3,
            durationTime: null,
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: true,
          },
          {
            exerciseId: 5,
            name: '조깅',
            countPerSet: '5',
            setCount: 3,
            durationTime: null,
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: true,
          },
          {
            exerciseId: 7,
            name: '줄넘기',
            countPerSet: '50',
            setCount: 3,
            durationTime: '3:00:00',
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: true,
          },
          {
            exerciseId: 10,
            name: '한 발로 뛰기',
            countPerSet: '15',
            setCount: 3,
            durationTime: null,
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: false,
          },
          {
            exerciseId: 23,
            name: '고양이 자세',
            countPerSet: '5',
            setCount: 3,
            durationTime: '00:10:00',
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: false,
          },
        ],
      },
      {
        date: '22.03.31',
        exercise: [
          {
            exerciseId: 1,
            name: '등/어깨운동',
            countPerSet: '3.5',
            setCount: 3,
            durationTime: '01:33:44',
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: false,
          },
          {
            exerciseId: 3,
            name: '스쿼트',
            countPerSet: '5',
            setCount: 3,
            durationTime: null,
            imageURL:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg',
            bookmark: false,
          },
        ],
      },
    ],
  };
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
                {exerciseHistoryList.exerciseHistory.map(
                  (exerciseHistoryDay) => (
                    <DayHistoryCard
                      key={exerciseHistoryDay.date}
                      exerciseHistoryDay={exerciseHistoryDay}
                    />
                  ),
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
export default ExerciseHistory;
