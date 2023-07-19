import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { useTheme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../App";
import useStyles from "../../../../css/css";

function Breadheader({
  startDate,
  endDate,
  branch_name,
  selected_jo_type,
  selected_ba,
}) {
  const home_reducer = useSelector((state) => state.home_reducer);
  const dispatch = useDispatch();

  const theme = useTheme();
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
      <Typography color="textPrimary">Accomplishments</Typography>
      {endDate !== "" ? (
        <Typography color="textPrimary">
          Date Range:&nbsp;
          {moment(startDate).format("LL") +
            " - " +
            moment(endDate).format("LL")}{" "}
        </Typography>
      ) : undefined}
      {branch_name !== "" ? (
        <Typography color="textPrimary">Branch:&nbsp;{branch_name} </Typography>
      ) : undefined}
      {selected_jo_type.length !== 0 ? (
        <Typography color="textPrimary">
          Type:&nbsp;
          {selected_jo_type.map((val) => {
            return <span>{val};&nbsp;</span>;
          })}
        </Typography>
      ) : undefined}
      {selected_ba !== "" ? (
        <Typography color="textPrimary">
          Business Area:&nbsp;{selected_ba}{" "}
        </Typography>
      ) : undefined}
    </Breadcrumbs>
  );
}
export default Breadheader;
