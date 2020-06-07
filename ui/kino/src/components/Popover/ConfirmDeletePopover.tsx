import React from 'react';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
`;
const LineContainer = styled.div`
  text-align: center;
`;

interface ConfirmDeletePopoverProps {
  onCancel: () => void;
  onConfirm: (event: React.MouseEvent<HTMLElement>) => void;
}
const ConfirmDeletePopover = (props: ConfirmDeletePopoverProps) => {
  return (
    <Container>
      <LineContainer>Czy na pewno chcesz usunąć?</LineContainer>
      <LineContainer>
        <IconButton onClick={props.onCancel}>
          <CancelIcon />
        </IconButton>
        <IconButton onClick={props.onConfirm}>
          <CheckCircleIcon />
        </IconButton>
      </LineContainer>
    </Container>
  );
};

export default ConfirmDeletePopover;
