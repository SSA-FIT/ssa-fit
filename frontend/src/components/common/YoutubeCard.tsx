import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { YoutubeVideo } from '../../types/recommendationTypes';
import Checkbox from '@mui/material/Checkbox/Checkbox';

interface Props {
  searchName: string;
  videoId: string;
  title: string;
  thumbnails: string;
  userVideoSelectList: YoutubeVideo[];
  setUserVideoSelectList: (userVideoSelectList: YoutubeVideo[]) => void;
  id: number;
  selection: boolean | null;
}

const YoutubeCard: React.FC<Props> = ({
  searchName,
  videoId,
  title,
  thumbnails,
  userVideoSelectList,
  setUserVideoSelectList,
  id,
  selection,
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
    <Container>
      <Wrapper
        className={
          checked === true && selection === false ? 'checked' : undefined
        }
      >
        <Checkbox
          id={videoId}
          onChange={checkBoxChangeHandler}
          checked={checked}
        />
        <label htmlFor={videoId}>
          <Base className={selection ? 'selection' : undefined}>
            <Image
              key={id}
              src={thumbnails}
              alt={`${searchName} 의 이미지`}
              className={selection ? 'selection' : undefined}
            />
          </Base>
          <DescriptionWrapper>
            <Description>
              <Title>{title}</Title>
            </Description>
          </DescriptionWrapper>
        </label>
      </Wrapper>
    </Container>

    // <StyledLink>
    //   <Base>
    //     <Wrapper>
    //       <ImageWrapper>
    //         <CheckBox
    //           type="checkbox"
    //           onChange={checkBoxChangeHandler}
    //           checked={checked}
    //           id={videoId}
    //         />
    //         <ImageLabel htmlFor={videoId}>
    //           <Image
    //             key={videoId}
    //             src={thumbnails}
    //             alt={`${searchName} 의 섬네일`}
    //           />
    //         </ImageLabel>
    //       </ImageWrapper>
    //     </Wrapper>
    //     <Info>
    //       <Title>{title}</Title>
    //     </Info>
    //   </Base>
    // </StyledLink>
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
  object-fit: contain;
  border-radius: 5px;
  border: 1px solid #02aab0;
  &.selection {
    object-fit: contain;
    box-shadow: none;
    border: 0;
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
// const StyledLink = styled.div`
//   text-decoration: none;
//   display: block;
//   margin-inline: 10px;
// `;

// const Base = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
// `;

// const ImageWrapper = styled.div`
//   width: 100%;
//   height: 300px;
// `;

// const ImageLabel = styled.label``;

// const Image = styled.img`
//   width: 100%;
//   // height: 100%;
//   // object-fit: cover;
//   border-radius: 4px;
// `;

// const Info = styled.div`
//   margin-top: 14px;
//   text-align: left;
//   width: 100%;
// `;

// const Title = styled.h4`
//   color: #292a32;
//   font-size: 16px;
//   font-weight: 500;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   line-height: 22px;
//   margin-bottom: 3px;
//   white-space: nowrap;
//   max-width: 200px;
// `;
// const CheckBox = styled.input`
//   position: absolute;
//   bottom: 0px;
//   top: 0px;
//   zoom: 1.5;
//   /* top: 6px;
//   left: 6px;
//   width: 14px;
//   height: 14px;
//   line-height: 27px; */
// `;

// const Wrapper = styled.form`
//   position: relative;
//   width: 100%;
//   height: 0;
//   padding-bottom: 145.37037037037038%;
// `;

export default YoutubeCard;
