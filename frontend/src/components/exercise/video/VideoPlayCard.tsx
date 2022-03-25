import styled from '@emotion/styled';
import { YoutubeVideo } from '../../../types/recommendationTypes';

interface Props {
  userVideoSelectList: YoutubeVideo[];
}
const VideoPlayCard: React.FC<Props> = ({ userVideoSelectList }) => {
  return (
    <>
      <Wrapper>
        <ExerciseNameWrapper>
          <ExerciseName>운동 이름(1/6)</ExerciseName>
        </ExerciseNameWrapper>
        <VideoWrapper>
          <PrevButton>아</PrevButton>
          <PlayerWrapper>아</PlayerWrapper>
          <NextButton>아</NextButton>
        </VideoWrapper>
        <InputAndButtonWrapper>
          <InputWrapper>
            <Input />
            <Input />
            <Input />
          </InputWrapper>
          <StopButtonWrapper>
            <StopButton />
          </StopButtonWrapper>
        </InputAndButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ExerciseNameWrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const ExerciseName = styled.h1`
  font-size: 22px;
  font-weight: 700;
`;

const VideoWrapper = styled.div`
  height: 470px;
  background-color: blue;
  display: flex;
  width: 100%;
  margin-bottom: 24px;
`;

const PrevButton = styled.div`
  background-color: red;
  width: 15%;
`;

const PlayerWrapper = styled.div`
  background-color: yellow;
  width: 70%;
`;

const NextButton = styled.div`
  background-color: red;
  width: 15%;
`;

const InputAndButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: purple;
  width: 70%;
`;

const StopButtonWrapper = styled.div`
  background-color: blue;
  width: 15%;
`;
const StopButton = styled.button``;
const Input = styled.input``;

export default VideoPlayCard;
