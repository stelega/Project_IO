import React, {useState} from 'react';
import { Redirect as ReactRedirect } from 'react-router-dom';
import {
  AppBar,
  createMuiTheme,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styled from 'styled-components';
import UserContext from '../services/Seassion';
import Redirect from './Redirect';

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        flexGrow: 1,
      },
      colorDefault: {
        backgroundColor: '#212121',
        color: 'white',
      },
    },
  },
});
const Box = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;
const Text = styled(Typography)`
  margin-right: 1vw;
  margin-top: auto;
  margin-bottom: auto;
`;
const Account = styled(Icon)`
  margin-right: 1vw;
  margin-top: auto;
  margin-bottom: auto;
`;

const TopBar = () => {
  const name: string = UserContext.getName();
  const surname: string = UserContext.getSurname();
  const isAdmin: Boolean | undefined = UserContext.isAdmin();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [logOut, setLogOut] = useState(false);
  const [changeMenu, setChangeMenu] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    UserContext.logOut();
    setLogOut(true);
  };

  const getMenuRedirectUrl = () => {
    const location : string = window.location.pathname;
    if (location === '/admin') {
      return '/employee';
    } else if (location === '/employee') {
      return '/admin';
    } else {
      return location;
    }
  }

  const handleChangeMenu = () => {
    setChangeMenu(true);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Box>
              <Account color='inherit'>
                <AccountCircle />
              </Account>
              <Text variant='h6'>{name}</Text>
              <Text variant='h6'>{surname}</Text>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'>
                <KeyboardArrowDownIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleLogOut}>Wyloguj</MenuItem>
                { isAdmin &&
                  <MenuItem onClick={handleChangeMenu}>Zmień menu</MenuItem>
                }
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {logOut && <Redirect to='Login' />}
      {changeMenu && <ReactRedirect to={getMenuRedirectUrl()} />}
    </>
  );
};

export default TopBar;
