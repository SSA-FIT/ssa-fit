import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { UserSelectListProp } from '../../types/recommendationTypes';

interface Props extends UserSelectListProp {
  id: number;
  name: string;
  imageURL: string;
  description: string;
}

const Card: React.FC<Props> = ({
  id,
  name,
  imageURL,
  userSelectList,
  description,
  setUserSelectList,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const findExerciseId = userSelectList.findIndex(
    (userSelectItem) => userSelectItem.id === id,
  );

  useEffect(() => {
    if (findExerciseId !== -1) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checked, findExerciseId]);

  const addUserExercise = (id: number, name: string, imageURL: string) => {
    const findExerciseId = userSelectList.findIndex(
      (userSelectItem) => userSelectItem.id === id,
    );

    if (findExerciseId === -1) {
      setUserSelectList([
        ...userSelectList,
        {
          id,
          name,
          imageURL,
          description,
        },
      ]);
    }
  };

  const deleteUserExercise = (exerciseDeleteId: number): void => {
    const findExerciseId = userSelectList.findIndex(
      (userSelectItem) => userSelectItem.id === exerciseDeleteId,
    );

    if (findExerciseId !== -1) {
      const tempUserSelectList = [...userSelectList];
      tempUserSelectList.splice(findExerciseId, 1);
      setUserSelectList(tempUserSelectList);
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
    <StyledLink>
      <Base>
        <Wrapper>
          <ImageWrapper>
            <CheckBox
              type="checkbox"
              onChange={checkBoxChangeHandler}
              checked={checked}
            />
            <Image key={id} src={imageURL} alt={`${name} 의 포스터`} />
          </ImageWrapper>
        </Wrapper>
        <Info>
          <Title>{name}</Title>
        </Info>
      </Base>
    </StyledLink>
  );
};
const StyledLink = styled.div`
  text-decoration: none;
  display: block;
  margin-inline: 10px;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const Info = styled.div`
  margin-top: 14px;
  text-align: left;
  width: 100%;
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
const CheckBox = styled.input`
  position: absolute;
  bottom: 0px;
  top: 0px;
  zoom: 1.5;
  /* top: 6px;
  left: 6px;
  width: 14px;
  height: 14px;
  line-height: 27px; */
`;

const Wrapper = styled.form`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 145.37037037037038%;
`;

export default Card;
