import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { UserSelectListProp } from '../../types/recommendationTypes';
import Checkbox from '@mui/material/Checkbox';
interface Props extends UserSelectListProp {
  id: number;
  name: string;
  imageURL: string;
  score: number | null;
  selection: boolean | null;
}

const Card: React.FC<Props> = ({
  id,
  name,
  imageURL,
  score,
  userRecoSelectList,
  setUserRecoSelectList,
  selection,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const findExerciseId = userRecoSelectList.findIndex(
    (userRecoSelectItem) => userRecoSelectItem.id === id,
  );

  useEffect(() => {
    if (findExerciseId !== -1) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checked, findExerciseId]);

  const addUserExercise = (id: number, name: string, imageURL: string) => {
    const findExerciseId = userRecoSelectList.findIndex(
      (userRecoSelectItem) => userRecoSelectItem.id === id,
    );

    if (findExerciseId === -1) {
      setUserRecoSelectList([
        ...userRecoSelectList,
        {
          id,
          name,
          imageURL,
        },
      ]);
    }
  };

  const deleteUserExercise = (exerciseDeleteId: number): void => {
    const findExerciseId = userRecoSelectList.findIndex(
      (userRecoSelectItem) => userRecoSelectItem.id === exerciseDeleteId,
    );

    if (findExerciseId !== -1) {
      const tempUserSelectList = [...userRecoSelectList];
      tempUserSelectList.splice(findExerciseId, 1);
      setUserRecoSelectList(tempUserSelectList);
    }
  };

  const checkBoxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setChecked(true);
      addUserExercise(id, name, imageURL);
    } else {
      setChecked(false);
      deleteUserExercise(id);
    }
  };

  return (
    <Container>
      <Wrapper
        className={
          checked === true && selection === false ? 'checked' : undefined
        }
      >
        <Checkbox
          id={name}
          onChange={checkBoxChangeHandler}
          checked={checked}
        />
        <label htmlFor={name}>
          <Base className={selection ? 'selection' : undefined}>
            <Image
              key={id}
              src={imageURL}
              alt={`${name} 의 이미지`}
              className={selection ? 'selection' : undefined}
            />
          </Base>
          <DescriptionWrapper>
            <Description>
              <Title>{name}</Title>
              {score !== null && <Score>예상 만족도 점수 : {score} 점</Score>}
            </Description>
          </DescriptionWrapper>
        </label>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
  margin: 10px;
  //min-height: 200px;
  max-width: 400px;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;

//배경
const Wrapper = styled.div`
  background-color: #fafafacc;

  @media (max-height: 667px) {
    height: 180px;
  }

  &.checked {
    filter: opacity(0.5);
  }
`;

//이미지
const Base = styled.div`
  height: 300px;

  @media (max-height: 667px) {
    height: 100px;
  }

  &.selection {
    height: 105px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;

  &.selection {
    object-fit: contain;
    box-shadow: none;
  }

  box-shadow: 0px 10px 10px 1px #d3d3d3;
`;

const DescriptionWrapper = styled.div`
  padding: 20px;

  @media (max-height: 667px) {
    padding: 0px;
  }
`;

const Description = styled.div`
  color: #000;
`;

const Title = styled.h4`
  color: #292a32;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  margin-bottom: 3px;
  white-space: nowrap;
  max-width: 200px;
`;

const Score = styled.p``;

export default Card;
