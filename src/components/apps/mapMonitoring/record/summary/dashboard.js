import React from "react";
import clsx from "clsx";
import "../../../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import UserImage from "../../../../../assets/map image/user_image.png";
import moment from "moment";
import {
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
// import PieGrap from "./charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../../../api/api";
import GroupIcon from "@material-ui/icons/Group";
import ReactExport from "react-data-export";
import CloseIcon from "@material-ui/icons/Close";
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FilterListIcon from "@material-ui/icons/FilterList";
import BarLineGraph from "./graph/bar_line";
import FilterData from "./filter_data";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },

  hoverDialog: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  large: {
    width: 100,
    height: 100,
  },
  whiteText: {
    color: "#fff",
  },
  allTable: {
    color: "#dcdcdc",
    fontSize: 12,
    borderColor: "rgb(255 255 255 / 15%)",
  },
  tableHead: {
    color: "#fff",
    fontSize: 13,
    borderColor: "rgb(255 255 255 / 15%)",
  },
  dashboards: {
    background: "rgba(0,0,0,0.6)",
  },
  filterBox: {
    background: "rgba(0,0,0,0.7)",
  },
});

function Dashboard({count_assign_day, summary,count_accom,onClickCard }) {
  const [state, setState] = React.useState({});
  const classes = useStyles();

  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  let assign_percentage = summary.reduce((count, val) => {
    return (count += val.assigned);
  }, 0);
  let total_percentage = summary.reduce((count, val) => {
    return (count += val.total_jo);
  }, 0);
  let unassign_percentage = summary.reduce((count, val) => {
    return (count += val.unassigned);
  }, 0);
  let accom_percentage = summary.reduce((count, val) => {
    return (count += val.accomplishment);
  }, 0);
  let remaining_percentage = summary.reduce((count, val) => {
    return (count += val.remaining);
  }, 0);
  let fieldman = summary.reduce((count, val) => {
    return (count += val.fieldman);
  }, 0);
  
  const closeModal = () => {
    setState({ ...state, filter: false });
  };
  return (
    <>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        className={classes.dashboards}
        style={{
          width: 186,
          marginTop: 8,
          height: 90,
          marginRight: 5,
          padding: 10,
        //   cursor: "pointer",
        }}
        // onClick={(e) => onClickCard(e, "Total")}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            style={{ color: "#74b9ff", fontWeight: "bold", fontSize: 18 }}
          >
            Total Days
          </Typography>
         
        </div>
        <div
          style={{
            width: "100%",
            marginTop: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{ color: "#74b9ff", fontSize: 33, fontWeight: "bold" }}
          >
            {formatNumber(count_assign_day)}
          </Typography>
        </div>
      
      </div>
      <div
        className={classes.dashboards}
        style={{
          width: 186,
          marginTop: 8,
          height: 90,
          marginRight: 5,
          padding: 10,
        //   cursor: "pointer",
        }}
        // onClick={(e) => onClickCard(e, "Assign")}
      >
        <Typography
          style={{ color: "#D980FA", fontWeight: "bold", fontSize: 18 }}
        >
          Assigned
        </Typography>
        <div
          style={{
            width: "100%",
            marginTop: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{ color: "#D980FA", fontSize: 22, fontWeight: "bold" }}
          >
            {formatNumber(
              summary.reduce((count, val) => {
                return (count += val.assigned);
              }, 0)
            )}
          </Typography>
          <Typography style={{ color: "#fff", fontSize: 18 }}>
            {isNaN(unassign_percentage / total_percentage)
              ? 0
              : parseFloat(
                  (assign_percentage / total_percentage) * 100
                ).toFixed(2)}
            %
          </Typography>
        </div>
      </div>
      {/* <div
        className={classes.dashboards}
        style={{
          width: 186,
          marginTop: 8,
          height: 90,
          marginRight: 5,
          padding: 10,
        //   cursor: "pointer",
        }}
        // onClick={(e) => onClickCard(e, "Unassign")}
      >
        <div>
          <Typography
            style={{ color: "#2980b9", fontWeight: "bold", fontSize: 18 }}
          >
            Unassigned
          </Typography>
          <div
            style={{
              width: "100%",
              marginTop: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{ color: "#2980b9", fontSize: 22, fontWeight: "bold" }}
            >
              {formatNumber(
                summary.reduce((count, val) => {
                  return (count += val.unassigned);
                }, 0)
              )}
            </Typography>
            <Typography style={{ color: "#fff", fontSize: 18 }}>
              {isNaN(unassign_percentage / total_percentage)
                ? 0
                : parseFloat(
                    (unassign_percentage / total_percentage) * 100
                  ).toFixed(2)}
              %
            </Typography>
          </div>
        </div>
      </div> */}
      <div
        className={classes.dashboards}
        style={{
          width: 186,
          marginTop: 8,
          height: 90,
          marginRight: 5,
          padding: 10,
        //   cursor: "pointer",
        }}
        // onClick={(e) => onClickCard(e, "Accomplish")}
      >
        <Typography
          style={{ color: "#2ecc71", fontWeight: "bold", fontSize: 18 }}
        >
          Accomplsihed
        </Typography>
        <div
          style={{
            width: "100%",
            marginTop: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{ color: "#2ecc71", fontSize: 22, fontWeight: "bold" }}
          >
            {formatNumber(
              summary.reduce((count, val) => {
                return (count += val.accomplishment);
              }, 0)
            )}
          </Typography>
          <Typography style={{ color: "#fff", fontSize: 18 }}>
            {isNaN(accom_percentage / total_percentage)
              ? 0
              : parseFloat((accom_percentage / total_percentage) * 100).toFixed(
                  2
                )}
            %
          </Typography>
        </div>
      </div>
      <div
        className={classes.dashboards}
        style={{
          width: 186,
          marginTop: 8,
          height: 90,
          marginRight: 5,
          padding: 10,
        //   cursor: "pointer",
        }}
        // onClick={(e) => onClickCard(e, "Delay")}
      >
        <Typography
          style={{ color: "#f1c40f", fontWeight: "bold", fontSize: 18 }}
        >
          Delay
        </Typography>
        <div
          style={{
            width: "100%",
            marginTop: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{ color: "#f1c40f", fontSize: 22, fontWeight: "bold" }}
          >
            {formatNumber(
              summary.reduce((count, val) => {
                return (count += val.remaining);
              }, 0)
            )}
          </Typography>
          <Typography style={{ color: "#fff", fontSize: 18 }}>
            {isNaN(remaining_percentage / total_percentage)
              ? 0
              : parseFloat(
                  (remaining_percentage / total_percentage) * 100
                ).toFixed(2)}
            %
          </Typography>
        </div>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "row" }}>
    <div
        className={classes.dashboards}
        style={{
          width: 166,
          marginTop: 8,
          height: 60,
          marginRight: 5,
          padding: 10,
        //   cursor: "pointer",
        }}
        // onClick={(e) => onClickCard(e, "Average Assign")}
      >
        <Typography
          style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}
        >
          Average Assign Per Day
        </Typography>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop:15,
          }}
        >
          <Typography
            style={{ color: "#fff", fontSize: 19, fontWeight: "bold" }}
          >
           {isNaN(assign_percentage / fieldman)
            ? 0
            : formatNumber(parseInt(assign_percentage / fieldman))}
          </Typography>
          
        </div>
      </div>
      <div
        className={classes.dashboards}
        style={{
          width: 166,
          marginTop: 8,
          height: 60,
          marginRight: 5,
          padding: 10,
        //   cursor: "pointer",
        }}
        // onClick={(e) => onClickCard(e, "Accomplish")}
      >
        <Typography
          style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}
        >
          Average Accom Per Day
        </Typography>
        <div
          style={{
            marginTop:15,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{ color: "#fff", fontSize: 19, fontWeight: "bold" }}
          >
           {isNaN(accom_percentage / count_accom)
            ? 0
            : formatNumber(parseInt(accom_percentage / count_accom))}
          </Typography>
          
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
