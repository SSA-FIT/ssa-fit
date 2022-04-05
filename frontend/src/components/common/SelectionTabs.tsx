import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

interface Props {
  setTabNumber: (tabNumber: number) => void;
}

const SelectionTabs: React.FC<Props> = ({ setTabNumber }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setTabNumber(newValue);
  };

  return (
    <BoxWrapper>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
        >
          <TabCustom label="신체 정보 기반 운동 추천" />
          <TabCustom label="SSAFIT의 운동 추천" />
          <TabCustom label="즐겨찾기" />
          <TabCustom label="모든 운동" />
        </Tabs>
      </Box>
    </BoxWrapper>
  );
};

const BoxWrapper = styled.div`
  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 2.4rem;
    line-height: 1.5;
  }
`;

const TabCustom = styled(Tab)`
  color: #6367ffcc;
  font-weight: 500;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  @media (min-width: 1060px) {
    font-size: 2.4rem;
    line-height: 1.5;
  }
`;
export default SelectionTabs;
