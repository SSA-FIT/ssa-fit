import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { YoutubeVideo } from '../../types/recommendationTypes';

interface Props {
  searchName: string;
  videoId: string;
  title: string;
  thumbnails: string;
  userVideoSelectList: YoutubeVideo[];
  setUserVideoSelectList: (userVideoSelectList: YoutubeVideo[]) => void;
  id: number;
}

const YoutubeCard: React.FC<Props> = ({
  searchName,
  videoId,
  title,
  thumbnails,
  userVideoSelectList,
  setUserVideoSelectList,
  id,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const findVideoId = userVideoSelectList.findIndex(
    (userVideoSelectItem) => userVideoSelectItem.videoId === videoId,
  );

  useEffect(() => {
    if (findVideoId !== -1) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checked, findVideoId]);

  const addUserExercise = () => {
    const findVideoId = userVideoSelectList.findIndex(
      (userVideoSelectItem) => userVideoSelectItem.videoId === videoId,
    );

    if (findVideoId === -1) {
      setUserVideoSelectList([
        ...userVideoSelectList,
        {
          id,
          title,
          thumbnails,
          videoId,
          searchName,
        },
      ]);
    }
  };

  const deleteUserExercise = (): void => {
    const findVideoId = userVideoSelectList.findIndex(
      (userVideoSelectItem) => userVideoSelectItem.videoId === videoId,
    );

    if (findVideoId !== -1) {
      const tempUserVideoSelectList = [...userVideoSelectList];
      tempUserVideoSelectList.splice(findVideoId, 1);
      setUserVideoSelectList(tempUserVideoSelectList);
    }
  };

  const checkBoxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setChecked(true);
      addUserExercise();
    } else {
      setChecked(false);
      deleteUserExercise();
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
              id={videoId}
            />
            <ImageLabel htmlFor={videoId}>
              <Image
                key={videoId}
                src={thumbnails}
                alt={`${searchName} 의 섬네일`}
              />
            </ImageLabel>
          </ImageWrapper>
        </Wrapper>
        <Info>
          <Title>{title}</Title>
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

const ImageLabel = styled.label``;

const Image = styled.img`
  width: 100%;
  // height: 100%;
  // object-fit: cover;
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

export default YoutubeCard;
