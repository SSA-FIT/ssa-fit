import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

interface Props {
  backDropOpen: boolean;
}
const ExerciseBackdrop: React.FC<Props> = ({ backDropOpen }) => {
  useEffect(() => {
    if (!backDropOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [backDropOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ExerciseBackdrop;
