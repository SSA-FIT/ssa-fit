import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
interface Props {
  labelType: string;
  date: string;
  setYear: (year: string) => void;
  setMonth: (month: string) => void;
  setWeek: (week: string) => void;
}

const DateSelect: React.FC<Props> = ({
  labelType,
  setYear,
  setMonth,
  setWeek,
  date,
}) => {
  const [value, setValue] = useState<string>('');
  const [dateList, setDateList] = useState<number[]>([]);
  const [name, setName] = useState<string>('');
  const year: number[] = [2022, 2023, 2024, 2025, 2026];
  const month: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const week: number[] = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (labelType === 'Year') {
      setDateList(year);
      setName('년');
      setValue(date);
    }
    if (labelType === 'Month') {
      setDateList(month);
      setName('월');
      setValue(date);
    }
    if (labelType === 'Week') {
      setDateList(week);
      setName('주');
      setValue(date);
    }
  }, [labelType]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    if (labelType === 'Year') {
      setYear(event.target.value);
    }
    if (labelType === 'Month') {
      setMonth(event.target.value);
    }
    if (labelType === 'Week') {
      setWeek(event.target.value);
    }
  };

  return (
    <>
      <BoxWrapper>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{name}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            label="Month"
            onChange={handleChange}
            defaultValue={'2022'}
          >
            {dateList.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </BoxWrapper>
    </>
  );
};

const BoxWrapper = styled(Box)`
  margin-right: 8px;
  min-width: 120px;
  @media (max-width: 575px) {
    margin-bottom: 10px;
  }
`;
export default DateSelect;
