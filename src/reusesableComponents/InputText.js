import { TextField } from "@material-ui/core";
import React from "react";
const renderEqualProps = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};
const InputText = (props) => {
  return (
    <div>
      <TextField />
    </div>
  );
};

export default React.memo(InputText, renderEqualProps);
