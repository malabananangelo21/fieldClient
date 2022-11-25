/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function AutoComplete(props) {
  const { ...param } = props;
  return (
    <Autocomplete
      id="combo-box-demo"
      options={param.userList}
      onChange={param.onSelectFieldman}
      getOptionLabel={(option) => option.COMPLETENAME}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" size="small" />
      )}
    />
  );
}
export default React.memo(AutoComplete);

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
