import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  createMuiTheme,
  ThemeProvider,
  Icon,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styled from 'styled-components';

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
export interface topBarProps {
  name: string;
  surname: string;
}

const TopBar = (props: topBarProps) => {
  const { name, surname } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <MenuItem onClick={handleClose}>Wyloguj</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default TopBar;
