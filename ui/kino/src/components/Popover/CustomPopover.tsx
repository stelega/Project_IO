import { Popover, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 30px;
`;

interface CustomPopoverProps {
  handleClose: () => void;
  body: string | Element | JSX.Element;
  id: string;
  anchorEl: Element | null;
}

const CustomPopover = (props: CustomPopoverProps) => {
  return (
    <Popover
      id={props.id}
      open={!!props.anchorEl}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <Typography>
        <Container>{props.body}</Container>
      </Typography>
    </Popover>
  );
};

export default CustomPopover;
