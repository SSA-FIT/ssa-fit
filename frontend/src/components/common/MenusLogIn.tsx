import * as React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
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

  return (
    <MenuWrapper>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          paddingRight: '80px',
        }}
      >
        <AddCircleRoundedIcon color="secondary" />
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
          to="/users/login"
          onClick={handleClose}
          style={{
            fontFamily: 'Spoqa Han Sans Neo',
          }}
        >
          로그인
        </MenuItem>
        <MenuItem
          component={Link}
          to="/users/sign-up"
          onClick={handleClose}
          style={{
            fontFamily: 'Spoqa Han Sans Neo',
          }}
        >
          회원가입
        </MenuItem>
      </Menu>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  display: block;
  position: absolute;
`;
