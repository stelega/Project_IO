import React from 'react';
import { Modal as MaterialModal } from '@material-ui/core';
import styled from 'styled-components';

const Box = styled.div`
  margin-top: 10vh;
  margin-left: 12vw;
  margin-right: 8vw;
  min-height: 500px;
  background-color: white;
`;

export interface ModalProps {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  body?: any;
}

const CustomModal = (props: ModalProps) => {
  return (
    <MaterialModal open={props.open} onClose={props.handleClose}>
      {<Box>{props.body}</Box>}
    </MaterialModal>
  );
};

export default CustomModal;
