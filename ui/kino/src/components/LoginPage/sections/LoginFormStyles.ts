import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core';

export const Container = styled.div`
  margin-left: 10vw;
  margin-top: 20vh;
`;
export const Title = styled.div`
  color: black;
  font-size: 300%;
  font-weight: bold;
`;
export const Input = styled.div`
  display: block;
  margin-top: 2vh;
  width: 50%;
`;
export const Select = styled.div`
  display: flex;
  margin-top: 4vh;
  width: 50%;
`;
export const MarginRight = styled.div`
  margin-right: 2vw;
`;
export const ButtonMargin = styled.div`
  margin-top: 4vh;
`;
export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#00C896',
      contrastText: '#FFFFFF',
    },
  },
});
export const ErrorContent = styled.div`
  color: red;
  width: 30vw;
  height: 10vh;
  text-align: center;
  padding-top: 7vh;
  font-weight: bold;
`;
