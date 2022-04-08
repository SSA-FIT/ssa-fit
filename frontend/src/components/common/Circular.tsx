import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

interface Props {
  size: number;
}
const CircularIndeterminate: React.FC<Props> = ({ size }) => {
  const [parentSize, setParentSize] = React.useState(0);

  useEffect(() => {
    setParentSize(size);
  }, [size]);
  return (
    <Box sx={{ display: 'inline-block' }}>
      <CircularProgress size={parentSize} />
    </Box>
  );
};

export default CircularIndeterminate;
