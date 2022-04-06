import * as React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutSagaStart } from '../../redux/modules/auth';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const logoutButtonClick = () => {
    dispatch(logoutSagaStart());
    setAnchorEl(null);
  };

  return (
    <MenuWrapper>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AddCircleRoundedIcon color="secondary" />
        {/* <img
          src="\images\common\menu.png"
          alt="menu"
          style={{
            width: '40px',
            height: '40px',
          }}
        /> */}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          component={Link}
          to="/"
          onClick={logoutButtonClick}
          style={{
            fontFamily: 'Spoqa Han Sans Neo',
          }}
        >
          로그아웃
        </MenuItem>
        <MenuItem
          component={Link}
          to="/users/profile"
          onClick={handleClose}
          style={{
            fontFamily: 'Spoqa Han Sans Neo',
          }}
        >
          내 정보 수정
        </MenuItem>
        <MenuItem
          component={Link}
          to="/exercise/history"
          onClick={handleClose}
          style={{
            fontFamily: 'Spoqa Han Sans Neo',
          }}
        >
          운동 기록 확인
        </MenuItem>
        <MenuItem
          component={Link}
          to="/exercise/bookmark"
          onClick={handleClose}
          style={{
            fontFamily: 'Spoqa Han Sans Neo',
          }}
        >
          즐겨찾기
        </MenuItem>
      </Menu>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  display: block;
`;
