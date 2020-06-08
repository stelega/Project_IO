import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import styled from "styled-components";

const SearchStyle = styled(TextField)`
margin-right: 2vw;
`;


interface SearchFieldProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = (props: SearchFieldProps) => {
  const {handleSearch} = props

  return (
    <>
      <SearchStyle
        placeholder={"Szukaj"}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchField;