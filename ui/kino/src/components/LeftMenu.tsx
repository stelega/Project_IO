import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  MenuList,
  MenuItem as mItem,
} from '@material-ui/core';
import styled from 'styled-components';

const Menu = styled.div`
  width: 10vw;
  height: 100vh;
  border-right: solid black 1px;
`;
const MenuItem = styled(mItem)`
  font-weight: bold;
`;
const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        display: 'block',
        textAlign: 'center',
        '&$selected': {
          backgroundColor: '#E5F9F4',
          color: '#00C896',
        },
      },
    },
  },
});

export interface LeftMenuProps {
  options: string[];
  state: string;
  handleChange(option: string): void;
}

const LeftMenu = (props: LeftMenuProps) => {
  const { options, state, handleChange } = props;
  return (
    <>
      <ThemeProvider theme={theme}>
        <Menu>
          <MenuList>
            {options.map((option: string) => (
              <MenuItem
                key={option}
                selected={option === state}
                onClick={() => handleChange(option)}
                value={option}>
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </ThemeProvider>
    </>
  );
};

export default LeftMenu;
