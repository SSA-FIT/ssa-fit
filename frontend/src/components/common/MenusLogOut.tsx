import * as React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutSagaStart } from '../../redux/modules/auth';

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
        <img src="\images\common\menu.png" alt="menu" />
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
        <MenuItem component={Link} to="/" onClick={logoutButtonClick}>
          로그아웃
        </MenuItem>
        <MenuItem component={Link} to="/users/profile" onClick={handleClose}>
          내 정보 수정
        </MenuItem>
        <MenuItem component={Link} to="/exercise/history" onClick={handleClose}>
          운동 기록 확인
        </MenuItem>
        <MenuItem
          component={Link}
          to="/exercise/bookmark"
          onClick={handleClose}
        >
          즐겨찾기
        </MenuItem>
      </Menu>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  display: block;
  margin: 5rem 3rem;
`;