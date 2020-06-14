import React, { useState } from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import { Seat } from '../../../../models/Hall';

const Container = styled.div``;
interface IconProps {
  seat: Seat;
  handleClicked: (seat: Seat) => void;
  handleRemoved: (seat: Seat) => void;
}

const MyIcon = (props: IconProps) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    if (clicked) {
      props.handleRemoved(props.seat);
    } else {
      props.handleClicked(props.seat);
    }
    setClicked(!clicked);
  };
  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        {!props.seat.free ? (
          <IndeterminateCheckBoxIcon color='secondary' />
        ) : clicked ? (
          <CheckBoxIcon color='secondary' onClick={handleClick} />
        ) : (
          <CheckBoxOutlineBlankIcon color='primary' onClick={handleClick} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default MyIcon;
