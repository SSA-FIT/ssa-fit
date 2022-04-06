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
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#02aab0',
            },
          }}
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
    font-size: 2rem;
    line-height: 1.5;
  }
`;

const TabCustom = styled(Tab)`
  color: #02aab0;
  font-weight: 400;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  @media (min-width: 1060px) {
    font-size: 2rem;
    line-height: 1.5;
  }

  &.Mui-selected {
    color: #02aab0;
    font-weight: 700;
  }
`;
export default SelectionTabs;
