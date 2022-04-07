import styled from '@emotion/styled/macro';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseModal from '../common/ExerciseModal';
import { onlyNumberReg } from '../../utils/RegExpressions';
import { ProfileRecoWithoutTokenRequest } from '../../types/recommendationTypes';

const NonUserProfile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [level, setLevel] = useState<string>(
    '하단의 자가 체력 진단을 눌러 측정해보세요.',
  );
  const [selfExerciseLevelButtonText, setSelfExerciseLevelButtonText] =
    useState<string>('자가 체력 진단');
  const [birth, setBirth] = useState<string>('');
  const [height, setHeight] = useState<string>('0');
  const [heightInteger, setHeightInteger] = useState<string>('0');
  const [heightDecimal, setHeightDecimal] = useState<string>('0');
  const [weight, setWeight] = useState<string>('0');
  const [weightInteger, setWeightInteger] = useState<string>('0');
  const [weightDecimal, setWeightDecimal] = useState<string>('0');
  const [gender, setGender] = useState<string>('');
  const [levelEmoji, setLevelEmoji] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState<ProfileRecoWithoutTokenRequest | null>(null);
  useEffect(() => {
    if (
      level !== '하단의 자가 체력 진단을 눌러 측정해보세요.' &&
      birth !== '' &&
      height !== '0' &&
      weight !== '0' &&
      gender !== '' &&
      onlyNumberReg.test(height) &&
      onlyNumberReg.test(weight) &&
      parseFloat(height) >= 50 &&
      parseFloat(height) <= 250 &&
      parseFloat(weight) >= 15 &&
      parseFloat(weight) <= 600
    ) {
      setData({ level, birth, gender, height, weight });
      setIsActive(true);
    }
  }, [
    level,
    birth,
    height,
    weight,
    gender,
    onlyNumberReg.test(height),
    onlyNumberReg.test(weight),
    parseFloat(height) >= 50,
    parseFloat(height) <= 250,
    parseFloat(weight) >= 15,
    parseFloat(weight) <= 600,
  ]);

  useEffect(() => {
    if (level === '씨앗') setLevelEmoji('🌱');
    if (level === '새싹') setLevelEmoji('🌿');
    if (level === '나무') setLevelEmoji('🌳');
    if (level === '열매') setLevelEmoji('🍎');

    if (level !== '하단의 자가 체력 진단을 눌러 측정해보세요.')
      setSelfExerciseLevelButtonText('자가 체력 재진단');
  }, [level]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleBirthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBirth(event.target.value);
  };

  const handleHeightIntegerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHeightInteger(event.target.value);
    setHeight(`${event.target.value}.${heightDecimal}`);
  };

  const handleHeightDecimalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHeightDecimal(event.target.value);
    setHeight(`${heightInteger}.${event.target.value}`);
  };

  const handleWeightIntegerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWeightInteger(event.target.value);
    setWeight(`${event.target.value}.${weightDecimal}`);
  };

  const handleWeightDecimalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWeightDecimal(event.target.value);
    setWeight(`${weightInteger}.${event.target.value}`);
  };

  const handleGenderInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setGender(event.target.value);
  };

  return (
    <>
      <ContainerWrapper>
        <Container>
          <Contents>
            <ContentName>신체정보 입력</ContentName>
            <RequiresWrapper css={fontsizesmall}>
              SSAFIT은 신체 정보 기반으로 운동 추천 서비스를 제공하고 있습니다.
              <br />
              입력한 신체 정보는 암호화되어 저장됩니다.
            </RequiresWrapper>
            <RequiresWrapper>
              [<RequireLabel>빨강동그라미</RequireLabel>는 필수 입력
              사항입니다.]
            </RequiresWrapper>
            <ProfileInfoWrapper>
              <ProfileInfo>
                <ProfileInfoField>
                  <ProfileInfoFieldNameWrapper>
                    <ProfileInfoFieldTitle>
                      사용자 정보 입력
                    </ProfileInfoFieldTitle>
                  </ProfileInfoFieldNameWrapper>
                  <ProfileInfoFieldValue>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel htmlFor="birth">
                        생년월일
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input
                          id="birth"
                          type="date"
                          onChange={handleBirthInputChange}
                        />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel htmlFor="height">
                        키(cm)<Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input
                          id="height"
                          type="text"
                          css={inputsize}
                          maxLength={3}
                          onChange={handleHeightIntegerChange}
                          className="height"
                          placeholder="175"
                        />
                        <Input
                          type="text"
                          css={dot}
                          defaultValue="."
                          readOnly
                          disabled
                        />
                        <Input
                          type="text"
                          maxLength={1}
                          onChange={handleHeightDecimalChange}
                          placeholder="0"
                        />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        몸무게(kg)
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input
                          type="text"
                          css={inputsize}
                          maxLength={3}
                          onChange={handleWeightIntegerChange}
                          placeholder="75"
                        />
                        <Input
                          type="text"
                          css={dot}
                          defaultValue="."
                          readOnly
                          disabled
                        />
                        <Input
                          type="text"
                          maxLength={1}
                          onChange={handleWeightDecimalChange}
                          placeholder="50"
                        />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        성별
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <GenderSelectWrapper>
                        <GenderSelect>
                          <GenderInput
                            type="radio"
                            value="남"
                            id="M"
                            name="gender"
                            onChange={handleGenderInputChange}
                          />
                          <Gender htmlFor="M">남자</Gender>
                        </GenderSelect>
                        <GenderSelect>
                          <GenderInput
                            type="radio"
                            value="여"
                            id="FM"
                            name="gender"
                            onChange={handleGenderInputChange}
                          />
                          <Gender htmlFor="FM">여자</Gender>
                        </GenderSelect>
                      </GenderSelectWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        운동레벨
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <ProfileInfoFieldItem>
                        {level}
                        {levelEmoji}
                      </ProfileInfoFieldItem>
                      <SelfExerciseLevelButtonWrapper>
                        <SelfExerciseLevelButton onClick={handleClickOpen}>
                          {selfExerciseLevelButtonText}
                        </SelfExerciseLevelButton>
                        <ExerciseModal
                          setLevel={setLevel}
                          open={open}
                          setOpen={setOpen}
                        />
                      </SelfExerciseLevelButtonWrapper>
                    </ProfileInfoFieldItemWrapper>
                  </ProfileInfoFieldValue>
                </ProfileInfoField>
              </ProfileInfo>
            </ProfileInfoWrapper>
            <ConfirmWrapper>
              <Cancel to="/">취소</Cancel>
              <ConfirmButton
                className={isActive ? '' : 'disabled'}
                to={
                  isActive
                    ? {
                        pathname: '/exercise',
                        state: data,
                      }
                    : '#'
                }
              >
                확인
              </ConfirmButton>
            </ConfirmWrapper>
          </Contents>
        </Container>
      </ContainerWrapper>
    </>
  );
};

const ContainerWrapper = styled.div`
`;

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
    padding: 6rem 6rem 10rem;
  }
`;

const ContentName = styled.h1`
  margin-bottom: 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 2rem;

  @media (min-width: 1060px) {
    font-weight: 400;
    font-size: 3.2rem;
  }
`;

const RequiresWrapper = styled.div`
  box-sizing: border-box;
  margin: 0.8rem 0;
  color: #555;
  font-weight: 400;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const RequireLabel = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }

  @media (min-width: 1060px) {
    top: 0.95rem;
  }
`;

const ProfileInfoWrapper = styled.div`
  margin-top: 2rem;

  @media (min-width: 1060px) {
    margin: 4rem 0 6rem;
  }
`;

const ProfileInfo = styled.div`
  margin: 0;
  border: 1px solid #d9dbe1;
  padding: 2.5rem 2rem;

  @media (min-width: 1060px) {
    padding: 4rem;
  }
`;

const ProfileInfoField = styled.div`
  margin-bottom: 0;
  margin-top: 0;

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ProfileInfoFieldNameWrapper = styled.div`
  margin-bottom: 2rem;
  padding-right: 2rem;

  @media (min-width: 1060px) {
    flex: 4;
    margin-bottom: 0;
  }
`;

const ProfileInfoFieldTitle = styled.h3`
  display: inline-block;
  margin-bottom: 0;
  margin-top: 0;
  color: #000;
  font-weight: 700;
  font-size: 1.5rem;

  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const ProfileInfoFieldValue = styled.div`
  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    flex: 8;
  }
`;

const ProfileInfoFieldItemWrapper = styled.div`
  margin-top: 4rem;

  @media (min-width: 1060px) {
    width: 100%;
  }
`;

const ProfileInfoFieldItem = styled.p`
  display: block;
  width: 100%;
  height: auto;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #d9dbe1;
  font-size: 1.6rem;
  color: #000;
  line-height: 1.5;

  @media (min-width: 1060px) {
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const ProfileInfoFieldItemLabel = styled.label`
  display: block;
  margin-bottom: 0.2rem;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;

  @media (min-width: 1060px) {
    margin-bottom: 0.9rem;
  }
`;

const Requirement = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;

  ${ProfileInfoFieldItemWrapper}:hover & {
    padding: 0 1rem;
    border-bottom-color: transparent;
    border-radius: 0.2rem;
    outline: 0;
    box-shadow: 0 0 0 1px #00cdac;
    color: #000;
    transition: padding 0.2s, border 0.2s, background 0.2s, color 0.2s,
      box-shadow 0.2s;
  }

  &:hover {
    padding: 0 1rem;
    border-bottom-color: transparent;
    border-radius: 0.2rem;
    outline: 0;
    box-shadow: 0 0 0 1px #00cdac;
    color: #000;
    transition: padding 0.2s, border 0.2s, background 0.2s, color 0.2s,
      box-shadow 0.2s;
  }
`;

const Input = styled.input`
  appearance: none;
  box-sizing: border-box;
  display: block;
  opacity: 1;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #02aab0;
  border-radius: 0;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;

  &:disabled {
    background-color: #fff;
  }

  ${InputWrapper}:hover & {
    border: none;
  }

  ${ProfileInfoFieldItemWrapper}:hover & {
    border: none;
  }

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const GenderSelectWrapper = styled.ul`
  list-style: none;
  margin: 2.2rem 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const GenderSelect = styled.li`
  position: relative;

  @media (min-width: 1060px) {
    border-radius: 50%;
    width: 33.33333333%;
    padding-right: 1rem;
  }
`;

const GenderInput = styled.input`
  position: absolute;
  left: 0;
  width: 2rem;
  height: 2rem;
  border: 1px;
`;

const Gender = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 2.6rem;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
  text-indent: 0;

  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const SelfExerciseLevelButtonWrapper = styled.div`
  margin-top: 1.2rem;
  text-align: right;
`;

const SelfExerciseLevelButton = styled.button`
  display: inline-block;
  min-width: 6.8rem;
  margin: 0;
  padding: 0.6rem 1.2rem 0.7rem;
  border-radius: 0.2rem;
  background-color: #fff;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: 1px solid #02aab0;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  &:hover {
    outline: 0;
    border-radius: 0.2rem;
    box-shadow: 0 0 0 0.2rem #fff, 0 0 0 0.3rem #00cdac;
  }

  @media (min-width: 1060px) {
    min-width: 8.4rem;
    padding: 0.7rem 0.8rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const ConfirmWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  justify-items: flex-start;
  margin: 4rem 0;
  margin-bottom: 0;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 1060px) {
    justify-content: center;
    margin: 6rem 0;
  }
`;

const Cancel = styled(Link)`
  flex: 6;
  margin-right: 0.4rem;
  background-color: #fff;
  color: #02aab0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #02aab0;
  border-radius: 0.2rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;

  &:hover {
    outline: 0;
    border-radius: 0.2rem;
    box-shadow: 0 0 0 0.2rem #fff, 0 0 0 0.3rem #00cdac;
  }

  @media (min-width: 1060px) {
    flex: none;
    width: auto;
    min-width: 24rem;
    padding: 1.5rem 2rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const ConfirmButton = styled(Link)`
  flex: 6;
  margin-right: 0.4rem;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  display: block;
  width: 100%;
  margin: 0;
  padding: 1.5rem 2rem 1.6rem;
  border: 1px solid #02aab0;
  border-radius: 0.2rem;
  background-color: #02aab0;
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;

  &:hover {
    outline: 0;
    border-radius: 0.2rem;
    box-shadow: 0 0 0 0.2rem #fff, 0 0 0 0.3rem #00cdac;
  }

  &.disabled {
    background-color: #5b646e;
    cursor: not-allowed;
  }
  @media (min-width: 1060px) {
    flex: none;
    display: inline-block;
    width: auto;
    min-width: 24rem;
    padding: 1.5rem 2rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const Error = styled.p`
  color: #de001b;
  margin: 0.8rem 0;
  font-size: 1.4rem;
  line-height: 1.58;

  &:last-child {
    margin-bottom: 0;
  }
`;
const fontsizesmall = css`
  font-size: 15px;

  @media (min-width: 1060px) {
    font-size: 20px;
  }
`;

const inputsize = css`
  width: 7%;
`;

const dot = css`
  width: 2%;
`;
export default NonUserProfile;
