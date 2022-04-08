import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ProfileRecoWithoutTokenRequest,
  recoRecord,
} from '../../types/recommendationTypes';
import styled from '@emotion/styled';

interface Props {
  nonUserDialogOpen: boolean;
  exerciseRecordList: recoRecord[];
}

interface NonUser {
  height: string;
  weight: string;
  level: string;
  gender: string;
  birth: string;
  exerciseRecordList: recoRecord[];
}

const NonUserDialog: React.FC<Props> = ({
  nonUserDialogOpen,
  exerciseRecordList,
}) => {
  const location = useLocation();
  const state = location.state as ProfileRecoWithoutTokenRequest;
  const [data, setData] = useState<NonUser | null>(null);

  // useEffect(() => {
  //   if (nonUserDialogOpen) {
  //     setData({
  //       birth: state.birth,
  //       gender: state.gender,
  //       height: state.height,
  //       level: state.level,
  //       weight: state.weight,
  //       exerciseRecordList,
  //     });
  //   }
  // }, [nonUserDialogOpen]);

  useEffect(() => {
    if (exerciseRecordList.length !== 0 && state !== undefined) {
      setData({
        birth: state.birth,
        gender: state.gender,
        height: state.height,
        level: state.level,
        weight: state.weight,
        exerciseRecordList,
      });
    }
  }, [exerciseRecordList]);

  useEffect(() => {
    if (nonUserDialogOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [nonUserDialogOpen]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogCustom
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#02aab0' }}>
          싸핏과 함께한 운동 시간 어떠셨나요?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            더 섬세한 추천이 반영된 운동을 하고 싶다면 회원으로 싸핏을
            만나보세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ color: '#02aab0' }}>
          <Link to="/">홈으로</Link>
          <Link
            to={{
              pathname: '/users/sign-up',
              state: data,
            }}
          >
            회원가입
          </Link>
        </DialogActions>
      </DialogCustom>
    </div>
  );
};

const DialogCustom = styled(Dialog)`
  background-color: #00cdaccc;
`;

export default NonUserDialog;
