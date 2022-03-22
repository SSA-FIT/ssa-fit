import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import useEntireSelectionList from '../../../hooks/useRecoList';

const EntireSelection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const entireSelections = useEntireSelectionList();
  return (
    <Base>
      <Title>전체 운동 목록</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {/* {entireSelections.map((entireSelection) => (
            <Card
              key={entireSelection.id}
              name={entireSelection.name}
              imageURL={entireSelection.imageURL}
            />
          ))} */}
        </Slider>
      )}
    </Base>
  );
};
const Base = styled.div`
  margin-bottom: 42px;
  position: relative;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

export default EntireSelection;
