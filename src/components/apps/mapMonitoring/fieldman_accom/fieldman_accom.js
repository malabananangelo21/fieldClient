import React from "react";
import clsx from "clsx";
import "../../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import UserImage from "../../../../assets/map image/user_image.png";
import moment from "moment";
import {
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Button,
  Typography,
  CardContent,
  TextareaAutosize
} from "@material-ui/core";
import PieGrap from "../charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../../api/api";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Scrollbars } from "react-custom-scrollbars";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import GroupIcon from "@material-ui/icons/Group";
import RefreshIcon from "@material-ui/icons/Refresh";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tooltip from "@material-ui/core/Tooltip";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HistoryIcon from "@material-ui/icons/History";
import Line from "../../mapMonitoring/charts/line";
import Summary_monitoring from "../summary_monitoring";
import MinimizeIcon from "@material-ui/icons/Minimize";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Carousel from "react-material-ui-carousel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Draggable from "react-draggable";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PDF from ".././pdf";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import ReactExport from "react-data-export";
import GetAppIcon from "@material-ui/icons/GetApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import $ from "jquery";
import ValidationValidator from "./validate_validator";
import CheckIcon from "@material-ui/icons/Check";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Map from "../../map/map";
const ExcelFile = ReactExport.ExcelFile;

const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const HtmlTooltip2 = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
    background: "rgba(0,0,0,0.7)",
  },
  filterBox: {
    background: "rgba(0,0,0,0.7)",
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
  },
  select: {
    "&:before": {
      borderColor: "#fff",
    },
    "&:after": {
      borderColor: "#fff",
    },
  },
  icon: {
    fill: "#fff",
  },
});

function FieldmanAccom({
  setOpen,
  setFieldman_list,
  setShowGraph,
  open,
  handleClose,
  onSubmit,
  handleDateChangeStart,
  onChangeCompany,
  branches,
  home_reducer,
  onChangeBranch,
  initialBoard,
  setBulkData,
  timerRef,
  setpause,
  dash_fielman,
  date_start,
  count_fieldman,
  fieldman,
  late,
  present,
  dash_click,
  onField,
  no_area,
  absent,
  date_start_val,
  total_jo,
  unassign,
  assign,
  jo_accom_list,
  pie_graph,
  delivery_type,
  fieldman_list,
  user_jobposition,
  onChangePosition,
  position,
  summary_page,
  branch_name,
  fieldman_map,
  summary_accom_function,
  onTrackAccomplishments,
  getRecord,
  generateMemo,
  line_data2,
  showGraph,
  summary_accom,
  excel_invalid_data,
  fieldman_delivery_type,
  minimize,
  minimized_func,
  line_data,
  singleFieldmanDash,
  pickIndex,
  closeButton,
  user_pic,
  completeName,
  trackAccom2,
  accom_diff,
  trackAccom,
  assign2,
  count_val,
  count_attendance,
  time,
  last_coordinates,
  onNext,
  pinCircle,
  bulk_route,
  bulkData,
  attendance_array,
  onClosepic,
  new_pickIndex,
  singleDetails,
  pdfPrint,
  onCLickImage,
  discon,
  onPrevious,
  handleRadioChange,
  invalid,
  closeValidation,
  validation_type,
  setmapOption,
  mapOption,
  onClickMarker2,
  onToggleOpen,
  OpenPic,
  onCLosePicture,
  rotateLeft,
  rotateRight,
  degree,
  selectedPic,
  backHistory,
  singele_history,
  date_history,
  openPDF,
  openPDF_func,
  images_base_64,
  logo,
  buttons,
  fastForward,
  pause,
  pausefunction,
  play,
  stop,
  speeds,
  onChangeJobOrder,
  jo_type,
  jo_type_val,
  inactive,
  get_accom_to_be_audited,
  leftPageSelect,
  accomlistdurationpermeter,
  onClick_list_Duration,
  onClickListDetails,
  validation_priviledge,
  userId,
  no_schedule,
  array_dashboard_data,
  account_no_records,
  with_schedule
}) {
  const { height } = window.innerHeight;

  const { width } = window.innerWidth;

  const classes = useStyles();

  const theme = useTheme();

  const box = document.querySelector("#tableScroll");

  const tableRef = React.useRef();

  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const map_reducer = useSelector((state) => state.map_reducer);

  const dispatch = useDispatch();

  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };

  const matches = useMediaQuery("(max-width:420px)");

  const [state, setState] = React.useState({
    field_findings: [],
    validation_status: "",
    validation_remarks: "",
    edit: false,
    new_selectedPic: selectedPic,
    new_trackAccom: [],
    match_new_trackAccom: [],
    duration: 5,
    openValidationValidator: false,
    jo_to_validate: [],
    randomJOToValidate: [],
    index_randomJOToValidate: [],
    category_remarks: [],
    validation_remarks_category: "",
    validator_comment: ""
  });

  React.useEffect(() => {
    let data = {
      user_id: localStorage.getItem("u"),
      type: "Delivery",
      status: "",
      branch_id: branches.Selected_branch,
      company_id: branches.Selectedcompany,
    };

    getData("tracking/getfield_findings", data).then((res) => {
      let stringArray = JSON.stringify(trackAccom);
      let new_track = JSON.parse(stringArray).reverse();

      getDurationInterval(new_track, res.field_findings, 5);
      // getJORandom()
    });
  }, []);

  const handleRadioChangeFunction = (e) => {
    setState({ ...state, validation_status: e.target.value });
  };

  const onChangeRemarks = (e) => {
    let category = []
    state.field_findings.forEach((val) => {
      if (val.findings == e.target.value) {
        if (val.category !== null && val.category !== "") {
          category = JSON.parse(val.category)
        }
      }
    })
    setState({ ...state, validation_remarks: e.target.value, category_remarks: category });
  };
  const onChangeRemarksCategory = (e) => {
    console.log(e.target.value)
    setState({ ...state, validation_remarks_category: e.target.value });
  };


  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };

  const onSubmitRemarks = (e) => {
    e.preventDefault();
    dispatch_data("loading_map", true);
    let accom_id = "";
    singleDetails.map((val, index) => {
      accom_id = val.accom_id;
    });
    let data = {
      value: state.validation_remarks,
      user_id: localStorage.getItem("u"),
      accom_id: accom_id,
      validation_remarks_category: state.validation_remarks_category,
      validator_comment: state.validator_comment
    };
    let validation_remarks = state.validation_remarks;
    let validation_remarks_category = state.validation_remarks_category;
    let validator_comment = state.validator_comment;

    getData("tracking/onChangeValidationRemarks", data, discon).then((res) => {
      if (res.response === true) {
        console.log(state.validation_remarks_category)
        singleDetails.map((val, index) => {
          val.validator_remark_type = validation_remarks;
          val.validator_remark_type_category = validation_remarks_category;
          val.validator_comment = validator_comment
        });
        setState({ ...state, edit: false,validator_comment:"",validation_remarks_category:"",validation_remarks:"" });
      }
      dispatch_data("loading_map", false);
    });
  };

  const onChangeDuration = (e) => {
    setState({ ...state, duration: e.target.value });
    getDurationInterval(
      state.new_trackAccom,
      state.field_findings,
      e.target.value
    );
  };

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function getDistanceBetweenPoints(lat1, lng1, lat2, lng2) {
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat1)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;
    return distance;
  }

  const onClickMatch = () => {
    let match_data = [];
    state.new_trackAccom.forEach((row, index) => {
      if (row.bg_color == "#e74c3c") {
        match_data.push(row);
      }
    });
    setState({ ...state, match_new_trackAccom: match_data });
  };

  const getDurationInterval = (data, field_findings, duration) => {
    let new_trackAccom_data = [];
    data.forEach((row, index) => {
      let new_trackAccom_array = row;
      new_trackAccom_array["bg_color"] = undefined;
      new_trackAccom_array["color"] = undefined;
      new_trackAccom_array["distance"] = 0;
      new_trackAccom_array["data"] = [];
      new_trackAccom_array["pathCoordinates"] = [];
      new_trackAccom_array["current_previous_data"] = [];
      new_trackAccom_array["duration_from_previous"] = 0;
      new_trackAccom_array["midPoint"] = [];

      let previousTime = row.date_accom;
      let previousData_array = [];
      if (index < data.length - 1) {
        let previousData = data[index + 1];
        previousTime = previousData["date_accom"];
        previousData_array = previousData;
      }
      let oneDay = 24 * 60 * 60 * 1000;
      let date1 = new Date(previousTime);
      let date2 = new Date(row.date_accom);
      let diffTime = Math.abs(
        ((date2.getTime() - date1.getTime()) / oneDay) * 24 * 60
      );

      let backgroundColor = undefined;
      let color = undefined;
      let current_previous_data = [];
      // #Current
      let latlong = String(row.fetched_coordinates);
      if (row.fetched_coordinates === undefined) {
        latlong = String(row.location_latlng);
      }
      let splitlatlng = latlong.split(",");
      var lat = parseFloat(splitlatlng[0]);
      var lng = parseFloat(splitlatlng[1]);
      // #Previous
      let latlong2 = String(previousData_array.fetched_coordinates);
      if (previousData_array.fetched_coordinates === undefined) {
        latlong = String(previousData_array.location_latlng);
      }
      let splitlatlng2 = latlong2.split(",");
      var lat2 = parseFloat(splitlatlng2[0]);
      var lng2 = parseFloat(splitlatlng2[1]);
      let pathCoordinates = [];
      let distance = 0;
      let selectedIndexList = sessionStorage.getItem("selectedIndexList");
      new_trackAccom_array["duration_from_previous"] = diffTime;
      if (index < data.length - 1) {
        distance = getDistanceBetweenPoints(lat, lng, lat2, lng2);
        new_trackAccom_array["distance"] = distance;
      }
      if (diffTime > duration) {
        let pathCoordinates2 = { lat: lat, lng: lng };
        let pathCoordinates3 = { lat: lat2, lng: lng2 };
        let midpointX = (lat + lat2) / 2;
        let midpointY = (lng + lng2) / 2;
        let meter = 10;
        if (distance > 40) {
          meter = 6;
        }
        let coef = meter * 0.0000089;
        let new_lat = midpointX + coef;
        let new_long = midpointY + coef / Math.cos(midpointX * 0.018);
        // if(distance < 40 ){
        //   new_long = midpointY
        // }

        let midPoint = {
          lat: new_lat,
          lng: new_long,
          distance: parseInt(distance),
          time: parseInt(diffTime),
          fetched_coordinates: String(midpointX) + "," + String(midpointY),
        };

        backgroundColor = "#e74c3c";
        color = "#fff";
        current_previous_data.push(row);
        current_previous_data.push(previousData_array);
        pathCoordinates.push(pathCoordinates2);
        pathCoordinates.push(pathCoordinates3);
        new_trackAccom_array["bg_color"] = "#e74c3c";
        new_trackAccom_array["color"] = "#fff";
        new_trackAccom_array["current_previous_data"] = current_previous_data;
        new_trackAccom_array["pathCoordinates"] = pathCoordinates;
        new_trackAccom_array["midPoint"] = midPoint;
      }

      new_trackAccom_data.push(new_trackAccom_array);
    });
    let percent = parseInt(trackAccom2.length * (parseInt(map_reducer.count_validation_logs) / 100));
    if (trackAccom2.length <= 50) {
      percent = trackAccom2.length;
    }
    if (percent < 50) {
      if (trackAccom2.length > 50) {
        percent = 50;
      }
    }
    let result = [];
    let randomArray = [];
    let user_id = "";
    let date = "";
    let branch_id = "";
    let accom_jo_type = "";
    let interval = parseInt(trackAccom2.length / percent);
    let interval_array = [];

    for (let index = 0; index < percent; index++) {
      const index_val = interval * index;
      interval_array.push(index_val);
    }
    setState({
      ...state,
      field_findings: field_findings,
      new_trackAccom: new_trackAccom_data,
      match_new_trackAccom: new_trackAccom_data,
      duration: duration,
      index_randomJOToValidate: interval_array,
    });
  };
  const countValidationPercentage = () => {
    let total = trackAccom2.reduce((count, val, index) => {
      let match_random = state.index_randomJOToValidate.filter(
        (val) => val == index
      );
      let match_val = false;
      if (match_random.length > 0) {
        match_val = true;
      }
      if (
        (val.validator_remarks === "Invalid" ||
          val.validator_remarks === "INVALID" ||
          val.validator_remarks === "Valid" ||
          val.validator_remarks === "VALID") &&
        match_val
      ) {
        count++;
      }
      return count;
    }, 0);

    let countVal = trackAccom2.length * (map_reducer.count_validation_logs / 100);
    if (trackAccom2.length <= 50) {
      countVal = trackAccom2.length;
    }
    if (countVal < 50) {
      if (trackAccom2.length > 50) {
        countVal = 50;
      }
    }
    let remaining = parseInt(countVal) - total;
    if (remaining < 0) {
      remaining = 0;
    }
    return remaining;
  };
  const onClickPercentage = () => {
    // for (var i = 0; result.length < (Math.round(percent)); i++){
    //     var index = Math.floor(Math.random() * trackAccom2.length);
    //     if (!randomArray.includes(index)) {
    //         result.push(trackAccom2[index].accom_id);
    //         date = moment(trackAccom2[index].date_accom).format('YYYY-MM-DD')
    //         branch_id = trackAccom2[index].branch_id
    //         accom_jo_type = trackAccom2[index].accom_jo_type
    //     }
    //     randomArray.push(index)
    // }
    // let details = {
    //   validator_id:localStorage.getItem('u'),
    //   user_id:userId,
    //   date_jo:date,
    //   jo_details: JSON.stringify(result),
    //   branch_id:branch_id,
    //   jo_type : accom_jo_type
    // }
    // insertJo(details)
  };
  async function insertJo(details) {
    try {
      let res = await getData("aam/insertJoRandom", details);
      setState({ ...state, randomJOToValidate: res.details });
      dispatch_data("loading_map", false);
    } catch (error) {
      dispatch_data("loading_map", false);
    }
  }
  async function getJORandom() {
    try {
      let branch_id = "";
      let jo_type = "";
      if (trackAccom2.length > 0) {
        branch_id = trackAccom2[0].branch_id;
        jo_type = trackAccom2[0].accom_jo_type;
      }
      let details = {
        user_id: userId,
        date_jo: date_start_val,
        branch_id: branch_id,
        jo_type: jo_type,
      };
      let res = await getData("aam/getJoRandom", details);
      setState({ ...state, randomJOToValidate: res.res });
    } catch (error) {
      alert("Request failed.");
    }
  }
  const exportdata = () => {
    let data = [];
    trackAccom2.map((val, index) => {
      if (
        val.validator_remarks === validation_type ||
        val.validator_remarks === String(validation_type).toUpperCase()
      ) {
        val["validator_name"] = val.user_lname + " " + val.user_fname;
        data.push(val);
      }
    });
    return data;
  };

  return (
    <div>
      {singele_history === "History" ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            display={"none"}
            variant="contained"
            color="#7f8c8d"
            className={classes.button}
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              backHistory();
            }}
          >
            {" "}
            Back
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Button
              variant="contained"
              color="#7f8c8d"
              className={classes.button}
              startIcon={<FilterListIcon />}
              style={{ marginRight: 10 }}
              onClick={() => {
                setOpen(true);
                setFieldman_list(false);
                setShowGraph(false);
              }}
            >
              Filter
            </Button>
          </div>

          <div>
            <form onSubmit={onSubmit}>
              <Button
                style={{
                  marginRight: 10,
                }}
                type="submit"
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
            </form>
          </div>
          {/* <div
            style={{
              marginRight: 10,
            }}
          >
            <select
              style={{ width: 200, height: 37 }}
              value={position}
              onChange={(e) => {
                onChangePosition(e.target.value);
              }}
            >
              <option disabled selected>
                Filter Position
              </option>
              <option value={"SHOW ALL"}>SHOW ALL</option>
              {user_jobposition.map((val, index) => {
                return (
                  <option key={index} value={val.position}>
                    {val.position}
                  </option>
                );
              })}
            </select>
          </div> */}

          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{ backgroundColor: "rgba(0,0,0,0.6)", position: "fixed" }}
            >
              <Typography
                style={{ color: "#fff", fontWeight: "bold", margin: 6 }}
              >
                {branch_name}
              </Typography>
            </div>
          </div>
        </div>
      )}
      {/* Fieldman Start */}
      {singele_history === "History" ? (
        <div
          className={classes.dashboards}
          style={{
            cursor: "pointer",
            height: 150,
            width: 300,
            top: 115,
            position: "fixed",
            zIndex: 2,
            visibility: initialBoard.visibility,
          }}
        >
          <div style={{ margin: 15 }}>
            <Typography style={{ color: "#fff", fontSize: 17 }}>
              {branch_name}
            </Typography>
            <Typography style={{ color: "#fff", fontSize: 16 }}>
              {moment(date_history).format("LL")}
            </Typography>
          </div>
        </div>
      ) : (
        <div
          className={classes.dashboards}
          style={{
            cursor: "pointer",
            height: 150,
            width: 300,
            top: 115,
            position: "fixed",
            zIndex: 2,
            visibility: initialBoard.visibility,
          }}
        >
          <div
            style={{ padding: 15 }}
            onClick={() => {
              dash_fielman();
              setShowGraph(false);
            }}
          >
            <Grid container className={classes.whiteText} spacing={2}>
              <Grid item xs={12}>
                <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
                  {jo_type_val}
                </Typography>
                <Typography style={{ fontSize: 18 }}>
                  {moment(date_start).format("LL")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <div style={{ display: "flex", flexDirection: "row",marginTop:-11}}>
                <GroupIcon style={{ fontSize: 36, color: "#f39c12" }} />
                <Typography style={{ marginLeft: 2, fontSize: 23 }}>
                  {/* {count_fieldman +
                    "/" +
                    fieldman.reduce((count, val) => {
                      if (parseInt(val.user_delete_id) === 0) {
                        count++;
                      }
                      return count;
                    }, 0)} */}
                     { String(parseInt(fieldman.reduce((count, val) => {
                      if (parseInt(val.user_delete_id) === 0 && val.count > 0) {
                        count++;
                      }
                      return count;
                    }, 0))) +
                    " / " +
                    String(parseInt(with_schedule.length))
                    }
                </Typography>
              </div>
                <div>
                  <Typography onClick={(e) => {
                    let data = fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.employee_status !== 'Trainee' && val.employee_status !== 'Apprentice' && val.jo_sched !== 'Rescue'))
                    dash_click(e, data);
                  }} style={{ marginTop: -10, fontSize: 13.4 }}>
                    Regular : {fieldman.reduce((count, val) => {
                      if (parseInt(val.user_delete_id) === 0 && val.employee_status !== 'Trainee' && val.employee_status !== 'Apprentice') {
                        count++;
                      }
                      return count;
                    }, 0) - parseInt(array_dashboard_data.reduce((count, val) => {
                      if (val.type === 'Rescue') {
                        count = val.data.length;
                      }
                      return count;
                    }, 0))}
                  </Typography>
                  <Typography onClick={(e) => {
                    let data = fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.employee_status === 'Trainee' && val.jo_sched !== 'Rescue'))
                    dash_click(e, data);
                  }} style={{ marginTop: -6, fontSize: 13.4 }}>
                    Trainee : {fieldman.reduce((count, val) => {
                      if (parseInt(val.user_delete_id) === 0 && val.employee_status == 'Trainee') {
                        count++;
                      }
                      return count;
                    }, 0)}
                  </Typography>
                  <Typography onClick={(e) => {
                    let data = fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.employee_status === 'Apprentice' && val.jo_sched !== 'Rescue'))
                    dash_click(e, data);
                  }} style={{ marginTop: -6, fontSize: 13.4 }}>
                    Apprentice : {fieldman.reduce((count, val) => {
                      if (parseInt(val.user_delete_id) === 0 && val.employee_status == 'Apprentice') {
                        count++;
                      }
                      return count;
                    }, 0)}
                  </Typography>
                </div>
              </Grid>

              <Grid></Grid>
            </Grid>
            <div
              style={{
                padding: 15,
                position: "absolute",
                left: 140,
                top: -10,
              }}
            >
              <Grid container className={classes.whiteText} spacing={0}>
                {array_dashboard_data.map((array_dashboard_data_val) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      onClick={(e) => {
                        dash_click(e, array_dashboard_data_val.data);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: array_dashboard_data_val.color,
                          }}
                        >
                          {array_dashboard_data_val.type} :{" "}
                          {array_dashboard_data_val.data.length}
                        </Typography>
                      </div>
                      {/* <Typography style={{ fontSize: 14,fontWeight:'bold' }}>25</Typography> */}
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </div>
      )}
      {/* Fieldman End */}

      {/* Total JO Start */}
      {!pause ? (
        <div
          className={classes.dashboards}
          style={{
            cursor: "pointer",
            height: 150,
            width: 244,
            top: 116,
            left: 324,
            //   margin: 18,
            position: "fixed",
            zIndex: 2,
            visibility: initialBoard.visibility,
          }}
        >
          <div style={{ padding: 15 }}>
            <Grid container className={classes.whiteText} spacing={2}>
              <Grid item xs={12}>
                <Typography style={{ fontSize: 18 }}>Delivery Type</Typography>
              </Grid>
              <Grid item xs={12} style={{ maxHeight: 100, overflow: "auto" }}>
                {fieldman_delivery_type.map((val, index) => {
                  let width_type = "60%";
                  let width_asteris = "10%";

                  delivery_type.map((val_type) => {
                    if (val_type.type === "RE-OUT DN" && val_type.count === 0) {
                      width_type = "40%";
                      width_asteris = "25%";
                    }
                    if (
                      val_type.type === "RE-OUT SOA" &&
                      val_type.count === 0
                    ) {
                      width_type = "40%";
                      width_asteris = "25%";
                    }
                  });
                  if (val.count !== 0)
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "70%",
                          marginLeft: 30,
                        }}
                      >
                        <Typography
                          style={{
                            color: "#fff",
                            width: width_type,
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {val.type}{" "}
                        </Typography>
                        <Typography
                          style={{
                            color: "#fff",
                            width: width_asteris,
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          :
                        </Typography>
                        <Typography
                          style={{
                            color: "#fff",
                            width: "30%",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {val.count}
                        </Typography>
                      </div>
                    );
                })}
              </Grid>
            </Grid>
          </div>
        </div>
      ) : undefined}
      {/* Total JO END */}
      {!pause ? (
        <div>
          <div
            className={minimize ? undefined : classes.dashboards}
            style={{
              cursor: "pointer",
              height: minimize ? 50 : 360,
              width: minimize ? 50 : 550,
              top: 271,
              // margin: 18,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ padding: 15 }}>
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  right: 2,
                  top: 1,
                }}
              >
                {minimize ? (
                  <EqualizerIcon
                    onClick={() => {
                      minimized_func(false);
                    }}
                    style={{
                      color: "#f1c40f",
                      fontSize: 35,
                      background: "rgba(0,0,0,0.6)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 527,
                      height: 30,
                      background: "rgba(0,0,0,0.8)",
                      display: "flex",
                      alignItems: "center",
                      paddingRight: 10,
                      paddingLeft: 10,
                    }}
                  >
                    <div
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15 / 2,
                        backgroundColor: "#e74c3c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 5,
                      }}
                    >
                      <CloseIcon
                        style={{ color: "#000", fontSize: 13 }}
                        onClick={() => minimized_func(true)}
                      />
                    </div>
                    <div
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15 / 2,
                        backgroundColor: "#353b48",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 5,
                      }}
                    ></div>
                    <div
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15 / 2,
                        backgroundColor: "#353b48",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    ></div>
                  </div>
                  // <MinimizeIcon
                  //   onClick={() => {
                  //     minimized_func(true);
                  //   }}
                  //   style={{ color: "#fff" }}
                  // />
                )}
              </div>
              {minimize ? undefined : (
                <>
                  <div style={{ marginTop: 15 }}>
                    <Line
                      line_data={line_data}
                      width={500}
                      height={300}
                      type={""}
                      total_jo={total_jo}
                    />
                  </div>
                  <Typography
                    style={{
                      fontSize: 18,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Job Order Per Hour
                  </Typography>
                </>
              )}
            </div>
          </div>
        </div>
      ) : undefined}

      {/* {state.validation_type != "" ? (
                <Draggable>
                  <div
                    className={classes.dashboards}
                    style={{
                      cursor: "pointer",
                      height: 350,
                      width: 300,
                      top: 275,
                      left: 75,
                      position: "fixed",
                      zIndex: 2,
                      visibility: initialBoard.visibility,
                    }}
                  >
                    <div style={{ padding: 15 }}>
                      <div
                        style={{
                          position: "absolute",
                          zIndex: 2,
                          right: 2,
                          top: -10,
                        }}
                      >
                        <IconButton aria-label="delete">
                          <CloseIcon
                            onClick={(e) =>
                              setState({
                                ...state,
                                validation_type: "",
                              })
                            }
                            style={{ color: "#fff" }}
                          />
                        </IconButton>
                      </div>
                      <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                        {state.validation_type}
                      </Typography>
                      <Scrollbars style={{ height: 300 }}>
                        {state.trackAccom2.map((val, index) => {
                          if (val.validator_remarks === state.validation_type)
                            return (
                              <div
                                onClick={() => {
                                  var latlong = "";
                                  var splitlatlng = "";
                                  var lat = "";
                                  var lng = "";
                                  var complete_name = "";
                                  splitlatlng = val.fetched_coordinates.split(
                                    ","
                                  );
                                  lat = splitlatlng[0];
                                  lng = splitlatlng[1];
                                  setmapOption({
                                    ...mapOption,
                                    lat: parseFloat(lat),
                                    lng: parseFloat(lng),
                                    zoom: 20,
                                  });
                                  onClickMarker2(
                                    val,
                                    index,
                                    lat,
                                    lng,
                                    val.fetched_coordinates,
                                    "single"
                                  );
                                  onToggleOpen(index);
                                }}
                                key={index}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                  backgroundColor: "rgba(0,0,0,0.6)",
                                  padding: 10,
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20 / 2,
                                    backgroundColor:
                                      state.validation_type === "Invalid"
                                        ? "#e74c3c"
                                        : "#27ae60",
                                    marginRight: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                  }}
                                ></div>
                                <Typography style={{ color: "#fff" }}>
                                  {val.meter_number} | {val.accom_findings}
                                </Typography>
                              </div>
                            );
                        })}
                      </Scrollbars>
                    </div>
                  </div>
                </Draggable>
              ) : undefined} */}

      {singleFieldmanDash === true && pickIndex == "" ? (
        <div>
          <div
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 200,
              width: 400,
              top: 66,
              right: 5,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ padding: 15 }}>
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  right: 2,
                  top: -10,
                }}
              >
                <IconButton
                  onClick={() => {
                    closeButton();
                  }}
                  aria-label="delete"
                >
                  <CloseIcon style={{ color: "#fff" }} />
                </IconButton>
              </div>
              <Grid container className={classes.whiteText} spacing={2}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ marginLeft: 10, marginRight: 10 }}>
                    {user_pic === "" ? (
                      <img
                        style={{
                          maxWidth: 80,
                          maxHeight: 80,
                          borderRadius: 80 / 2,
                        }}
                        src={require("../../../../assets/map image/user.png")}
                        className=" animated bounce"
                      />
                    ) : (
                      <img
                        src={
                          "https://images.workflow.gzonetechph.com/pockethr/profilepic/" +
                          user_pic
                        }
                        onError={(e) => {
                          e.target.src = UserImage;
                        }}
                        style={{
                          maxWidth: 80,
                          maxHeight: 80,
                          borderRadius: 80 / 2,
                        }}
                        className=" animated bounce"
                      />
                    )}
                  </div>
                  <div>
                    {/* <Typography style={{ position: 'fixed', fontSize: 19 }}>{'Angelo Malabanan'}</Typography> */}
                    <Typography style={{ fontSize: 20 }}>
                      {String(completeName).toUpperCase()}
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography style={{ fontSize: 16, position: "fixed" }}>
                        {trackAccom2.length != 0
                          ? moment(trackAccom2[0].date_accom).format("LT") +
                          " - " +
                          moment(
                            trackAccom2[trackAccom2.length - 1].date_accom
                          ).format("LT")
                          : undefined}
                      </Typography>

                      <Typography
                        style={{
                          fontSize: 20,
                          right: 15,
                          position: "fixed",
                        }}
                      >
                        {accom_diff}
                      </Typography>
                    </div>
                  </div>
                </div>
                <Grid
                  onClick={() => {
                    onNext(0);
                  }}
                  item
                  xs={12}
                  style={{ marginTop: -40 }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: 370,
                        height: 10,
                        background: "#fff",
                        borderRadius: 5,
                        position: "absolute",
                        top: 80,
                      }}
                    ></div>
                    {trackAccom.length !== 0 ? (
                      <div
                        style={{
                          width:
                            assign2 < trackAccom.length
                              ? 370
                              : (370 * trackAccom.length) / assign2,
                          height: 10,
                          background: "#3498db",
                          borderRadius: 5,
                          position: "absolute",
                          top: 80,
                        }}
                      ></div>
                    ) : (
                      <div
                        style={{
                          width:
                            assign2 < count_val
                              ? 370
                              : (370 * count_val) / assign2,
                          height: 10,
                          background: "#3498db",
                          borderRadius: 5,
                          position: "absolute",
                          top: 80,
                        }}
                      ></div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        right: 150,
                        top: 25,
                        display: "flex",
                        alignItems: "row",
                      }}
                    >
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background: count_attendance > 0 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background: assign2 > 0 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background: count_attendance > 1 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background: count_attendance > 2 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background: count_attendance > 3 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 90,
                        width: "26%",
                        left: "37%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>
                        {trackAccom.length !== 0
                          ? trackAccom.length
                          : count_val}
                        /{assign2}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ marginRight: 5 }}>
                      <ExcelFile
                        filename={
                          "Accomplishments" +
                          "-" +
                          branch_name +
                          " " +
                          moment(new Date(date_start)).format("YYYY-MM-DD")
                        }
                        element={<GetAppIcon style={{ color: "#fff" }} />}
                      >
                        <ExcelSheet data={trackAccom} name="Accomplishments">
                          <ExcelColumn label="Emp ID" value="user_id" />
                          <ExcelColumn
                            label="Name"
                            value="accom_fieldman_name"
                          />
                          <ExcelColumn
                            label="Date and Time"
                            value="date_accom"
                          />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                    <div
                      onClick={() => {
                        const scrollPosition =
                          sessionStorage.getItem("scrollPosition");
                        accomlistdurationpermeter();
                        setTimeout(() => {
                          var elmnt = document.getElementById("tableScroll");
                          elmnt.scrollTop = scrollPosition;
                        }, 100);
                      }}
                    >
                      <ListAltIcon />
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{ marginTop: 40, position: "relative" }}
                >
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.3)",
                      position: "absolute",
                      bottom: 1,
                    }}
                  >
                    {time === "" ? (
                      <Typography style={{ fontSize: 30 }}>
                        {"-- : --"}
                      </Typography>
                    ) : (
                      <Typography style={{ fontSize: 30 }}>{time}</Typography>
                    )}
                  </div>

                  <div
                    style={{
                      position: "fixed",
                      zIndex: 2,
                      right: 10,
                      top: 215,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        pinCircle(last_coordinates);
                      }}
                      aria-label="delete"
                    >
                      <PersonPinCircleIcon
                        style={{
                          color: "#fff",
                          fontSize: 35,
                          color: "#2980b9",
                        }}
                      />
                    </IconButton>
                    {bulkData.length > 10 ? (
                      <div
                        style={{
                          cursor: "pointer",
                          position: "fixed",
                          top: 228,
                          right: 60,
                        }}
                        onClick={() => {
                          bulk_route();
                        }}
                      >
                        <div>
                          <PersonPinCircleIcon
                            style={{ color: "#e74c3c", fontSize: 35 }}
                          />
                        </div>
                        <div
                          style={{
                            position: "fixed",
                            zIndex: 2,
                            right: 60,
                            top: 240,
                            fontWeight: "bold",
                          }}
                        >
                          <Typography style={{ color: "#fff", fontSize: 16 }}>
                            {bulkData.length}
                          </Typography>
                        </div>
                      </div>
                    ) : undefined}
                  </div>
                  {/* <div style={{ position: 'fixed', zIndex: 2, right: 40, top: 200 }}>
                                                <IconButton onClick={() => {
                                                    setState({...state,show_pin:'red'})

                                                }} aria-label="delete">
                                                    <PersonPinCircleIcon
                                                        style={{ color: '#fff', fontSize: 35, color: '#e74c3c' }} />
                                                </IconButton>
                                            </div> */}
                </Grid>
                {/* <Grid item xs={12} md={12} style={{position:'relative'}}>
                            
                         </Grid> */}
              </Grid>
            </div>
          </div>
          <div>
            <div
              className={classes.dashboards}
              style={{
                cursor: "pointer",
                height: 194,
                width: 192,
                top: 272,
                right: 213,
                position: "fixed",
                zIndex: 2,
                visibility: initialBoard.visibility,
              }}
            >
              <div style={{ padding: 15 }}>
                <Typography style={{ color: "#fff" }}>Attendance</Typography>
                <div style={{ width: 120, marginLeft: 5 }}>
                  {attendance_array.map((val, index) => {
                    let type = "";
                    if (val.att_type === "Time-in") {
                      type = "In";
                    }
                    if (val.att_type === "Time-out") {
                      type = "Out";
                    }
                    if (index < 6)
                      return (
                        <Grid
                          key={index}
                          container
                          className={classes.whiteText}
                          spacing={1}
                        >
                          <Grid item xs={4} md={3}>
                            <Typography style={{ fontSize: 15 }}>
                              {type}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} md={2}>
                            <center>
                              <Typography style={{ fontSize: 15 }}>
                                :
                              </Typography>
                            </center>
                          </Grid>
                          <Grid item xs={7} md={7}>
                            <Typography style={{ fontSize: 15 }}>
                              {moment(val.date_added).format("hh:mm A")}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              className={classes.dashboards}
              style={{
                cursor: "pointer",
                height: 140,
                width: 200,
                top: 272,
                right: 5,
                position: "fixed",
                zIndex: 2,
                visibility: initialBoard.visibility,
              }}
            >
              <div style={{ padding: 15 }}>
                <Typography style={{ color: "#fff" }}>
                  Duration from 1st Meter :
                </Typography>
                <div style={{ width: 120, marginLeft: 5 }}>
                  {attendance_array.map((val, index) => {
                    let hours = 0;
                    if (
                      val.att_type === "Time-out" &&
                      index > 0 &&
                      index < 3 &&
                      trackAccom2.length > 0
                    ) {
                      var oneDay = 24 * 60 * 60 * 1000;
                      var date1 = new Date(trackAccom2[0].date_accom);
                      var date2 = new Date(val.date_added);
                      var diffDays = Math.abs(
                        ((date1.getTime() - date2.getTime()) / oneDay) * 24
                      );
                      hours = parseFloat(diffDays).toFixed(2) + " " + "hr.";
                      if (diffDays < 1) {
                        hours = parseInt(diffDays * 60) + " " + "min.";
                      }
                    }
                    if (val.att_type === "Time-out" && index > 0 && index < 3)
                      return (
                        <Grid
                          key={index}
                          container
                          className={classes.whiteText}
                          spacing={1}
                        >
                          <Grid item xs={12} md={12}>
                            <Typography
                              style={{ fontSize: 20, fontWeight: "bold" }}
                            >
                              {hours}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : undefined}

      {pickIndex != "" ? (
        <Draggable>
          {/* <div style={{backgroundColor:'#57606f',width:'100%',height:20}}>
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,Required to Validate
                  right: 1,
                  top: -6,
                }}
              >
                <IconButton aria-label="delete">
                  <CloseIcon
                    onClick={(e) => onClosepic()}
                    style={{ color: "#fff" }}
                  />
                </IconButton>
              </div>
                </div> */}
          <div
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 508,
              width: 785,
              top: 115,
              right: 5,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div
              style={{
                width: 764,
                height: 30,
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                paddingRight: 10,
                paddingLeft: 10,
              }}
            >
              <div
                style={{
                  height: 15,
                  width: 15,
                  borderRadius: 15 / 2,
                  backgroundColor: "#e74c3c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 5,
                }}
              >
                <CloseIcon
                  style={{ color: "#000", fontSize: 13 }}
                  onClick={(e) => onClosepic()}
                />
              </div>
              <div
                style={{
                  height: 15,
                  width: 15,
                  borderRadius: 15 / 2,
                  backgroundColor: "#353b48",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 5,
                }}
              ></div>
              <div
                style={{
                  height: 15,
                  width: 15,
                  borderRadius: 15 / 2,
                  backgroundColor: "#353b48",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></div>
            </div>
            <div style={{ padding: 15, marginTop: 5 }}>
              <Grid container className={classes.whiteText} spacing={1}>
                <Grid item xs={4} md={4}>
                  {new_pickIndex > 0 ? (
                    <div
                      onClick={() => onPrevious(new_pickIndex - 1)}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowLeftIcon style={{ color: "#fff", fontSize: 40 }} />
                      <Typography>Previous</Typography>
                    </div>
                  ) : undefined}
                </Grid>
                <Grid item xs={4} md={4}>
                  <div
                    onClick={() => onPrevious(new_pickIndex - 1)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      color: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>{new_pickIndex + 1}</Typography>
                    <Typography>&nbsp;/&nbsp;</Typography>
                    <Typography>{trackAccom2.length}</Typography>
                  </div>{" "}
                </Grid>
                <Grid item xs={4} md={4}>
                  {new_pickIndex < trackAccom2.length - 1 ? (
                    <div
                      onClick={() => {
                        onNext(new_pickIndex + 1);
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Next</Typography>
                      <ArrowRightIcon style={{ color: "#fff", fontSize: 40 }} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>

              <Grid container className={classes.whiteText} spacing={2}>
                {singleDetails.map((val, index) => {
                  let match_random = state.index_randomJOToValidate.filter(
                    (val) => val == new_pickIndex
                  );
                  let actual = get_accom_to_be_audited.filter(
                    (val_actual) => val_actual.meter_number === val.meter_number
                  );

                  let name = "No Name";
                  let location = "No Address";
                  if (val.customer_lname != "" && val.customer_fname != "") {
                    name = val.customer_lname + " " + val.customer_fname;
                  }
                  if (val.customer_location != "") {
                    name = val.customer_location;
                  }
                  let images = [];
                  if (val.accom_images !== "" && val.accom_images !== null) {
                    images = JSON.parse(val.accom_images);
                  }
                  let borderColor = undefined;
                  let borderWidth = undefined;
                  let borderStyle = undefined;
                  if (match_random.length > 0) {
                    borderColor = "#e67e22";
                    borderWidth = 4;
                    borderStyle = "solid";
                  }
                  return (
                    <>
                      <Grid item xs={5} md={5}>
                        <Card
                          variant="outlined"
                          style={{
                            padding: 10,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            borderColor: borderColor,
                            borderWidth: borderWidth,
                            borderStyle: borderStyle,
                          }}
                        >
                          <Carousel autoPlay={false}>
                            {val.image_path !== "" &&
                              val.image_path !== null ? (
                              images.map((images, index) => {
                                return (
                                  <img
                                    onClick={() => {
                                      onCLickImage(index);
                                    }}
                                    src={
                                      discon
                                        ? "http://audit.api.pacificweb.com.ph/assets/img/meter/" +
                                        images.path
                                        : "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                                        images.path
                                    }
                                    alt="test"
                                    style={{
                                      width: "100%",
                                      height: "220px",
                                    }}
                                  />
                                );
                              })
                            ) : (
                              <img
                                src={require("../../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "250px" }}
                              />
                            )}
                          </Carousel>
                        </Card>
                        <Grid
                          container
                          className={classes.whiteText}
                          spacing={2}
                        >
                          <Grid item xs={5} md={5}>
                            <div style={{ marginTop: 10 }}>
                              <Button
                                style={{
                                  fontSize: "0.8125rem",
                                  backgroundColor: "rgba(6,86,147)",
                                  color: "white",
                                }}
                                onClick={() => {
                                  pdfPrint();
                                }}
                              >
                                Download&nbsp;PDF
                              </Button>
                            </div>

                            {/* <div
                    onClick={() => {
                      pdfPrint();
                    }}
                  >
                    <Typography>Download PDF</Typography>
                  </div> */}
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                       
                        
                        </div> */}
                      <Grid item xs={7} md={7}>
                        <div
                          className={classes.whiteText}
                          style={{
                            width: "100%",
                            // padding: 15,
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              padding: 10,
                              backgroundColor: "rgba(0,0,0,0.6)",
                              borderColor: borderColor,
                              borderWidth: borderWidth,
                              borderStyle: borderStyle,
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: 17,
                                color: "#fff",
                                fontWeight: "bold",
                              }}
                            >
                              Validation
                            </Typography>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: 20,
                              }}
                            >
                              <div style={{ width: "18%" }}>
                                <Typography>Status</Typography>
                              </div>
                              <div style={{ width: "1%" }}>
                                <Typography>:</Typography>
                              </div>
                              <div style={{ width: "60%", marginLeft: 8 }}>
                                <Typography style={{ fontWeight: "bold" }}>
                                  {val.validator_remarks}
                                </Typography>
                              </div>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: 20,
                              }}
                            >
                              <div style={{ width: "18%" }}>
                                <Typography>Findings</Typography>
                              </div>
                              <div style={{ width: "1%" }}>
                                <Typography>:</Typography>
                              </div>
                              <div style={{ width: "60%", marginLeft: 8 }}>
                                <Typography style={{ fontWeight: "bold" }}>
                                  {val.validator_remark_type}
                                </Typography>
                              </div>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: 20,
                              }}
                            >
                              <div style={{ width: "18%" }}>
                                <Typography>Remarks</Typography>
                              </div>
                              <div style={{ width: "1%" }}>
                                <Typography>:</Typography>
                              </div>
                              <div style={{ width: "60%", marginLeft: 8 }}>
                                <Typography style={{ fontWeight: "bold" }}>
                                  {val.validator_remark_type_category}
                                </Typography>
                              </div>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: 20,
                              }}
                            >
                              <div style={{ width: "18%" }}>
                                <Typography>Comment</Typography>
                              </div>
                              <div style={{ width: "1%" }}>
                                <Typography>:</Typography>
                              </div>
                              <div style={{ width: "60%", marginLeft: 8 }}>
                                <Typography style={{ fontWeight: "bold" }}>
                                  {val.validator_comment}
                                </Typography>
                              </div>
                            </div>
                            {val.user_lname !== null ? (
                              <>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: 20,
                                  }}
                                >
                                  <div style={{ width: "18%" }}>
                                    <Typography>Validator</Typography>
                                  </div>
                                  <div style={{ width: "1%" }}>
                                    <Typography>:</Typography>
                                  </div>
                                  <div style={{ width: "60%", marginLeft: 8 }}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                      {val.user_lname + " " + val.user_fname}
                                    </Typography>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: 20,
                                  }}
                                >
                                  <div style={{ width: "18%" }}>
                                    <Typography>Date</Typography>
                                  </div>
                                  <div style={{ width: "1%" }}>
                                    <Typography>:</Typography>
                                  </div>
                                  <div style={{ width: "60%", marginLeft: 8 }}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                      {val.date_validated}
                                    </Typography>
                                  </div>
                                </div>
                              </>
                            ) : undefined}
                          </div>
                        </div>
                        <Scrollbars style={{ maxHeight: 200, marginTop: 10 }}>
                          <div
                            className={classes.whiteText}
                            style={{
                              // borderWidth: 2,
                              // borderColor: "#fff",
                              // borderStyle: "solid",
                              width: "100%",
                              // padding: 15,
                              position: "relative",
                            }}
                          ></div>
                          <div
                            style={{
                              padding: 10,
                              backgroundColor: "rgba(0,0,0,0.6)",
                              borderColor: borderColor,
                              borderWidth: borderWidth,
                              borderStyle: borderStyle,
                            }}
                          >
                            {map_reducer.selected_details.map((val) => {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: 8 / 2,
                                      backgroundColor: "#fff",
                                      marginRight: 8,
                                    }}
                                  />
                                  <Typography style={{ color: "#fff" }}>
                                    {val.name} : {val.value}
                                  </Typography>
                                </div>
                              );
                            })}
                            {account_no_records.map((val) => {
                              if (
                                moment(new Date(date_start)).format(
                                  "YYYY-MM"
                                ) ==
                                moment(new Date(val.date_accomplished)).format(
                                  "YYYY-MM"
                                )
                              )
                                return (
                                  <div style={{ marginTop: 20 }}>
                                    <Typography
                                      style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Fieldman Accomplishment
                                    </Typography>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: 8 / 2,
                                          backgroundColor: "#fff",
                                          marginRight: 8,
                                        }}
                                      />
                                      <Typography style={{ color: "#fff" }}>
                                        Findings : {val.field_findings_value}
                                      </Typography>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: 8 / 2,
                                          backgroundColor: "#fff",
                                          marginRight: 8,
                                        }}
                                      />
                                      <Typography style={{ color: "#fff" }}>
                                        Reading : {val.present_reading}
                                      </Typography>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: 8 / 2,
                                          backgroundColor: "#fff",
                                          marginRight: 8,
                                        }}
                                      />
                                      <Typography style={{ color: "#fff" }}>
                                        Date : {val.date_accomplished}
                                      </Typography>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: 8 / 2,
                                          backgroundColor: "#fff",
                                          marginRight: 8,
                                        }}
                                      />
                                      <Typography style={{ color: "#fff" }}>
                                        Meter No. : {val.meter_no}
                                      </Typography>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: 8 / 2,
                                          backgroundColor: "#fff",
                                          marginRight: 8,
                                        }}
                                      />
                                      <Typography style={{ color: "#fff" }}>
                                        Account No. : {val.account_number}
                                      </Typography>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: 8 / 2,
                                          backgroundColor: "#fff",
                                          marginRight: 8,
                                        }}
                                      />
                                      <Typography style={{ color: "#fff" }}>
                                        Fieldman :{" "}
                                        {val.user_lname + " " + val.user_fname}
                                      </Typography>
                                    </div>
                                  </div>
                                );
                            })}
                          </div>
                        </Scrollbars>
                      </Grid>
                      {/* </Grid> */}
                    </>
                  );
                })}
              </Grid>
            </div>
          </div>
        </Draggable>
      ) : undefined}
      {singleFieldmanDash === true ? (
        <>
          <div
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 50,
              width: 190,
              right: 220,
              top: 10,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div
              style={{
                padding: 15,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                onClick={() => invalid("Valid")}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <Typography
                  style={{
                    fontSize: 13,
                    color: "#2ecc71",
                    position: "absolute",
                    top: -14,
                    left: 4,
                    fontWeight: "bold",
                  }}
                >
                  Valid
                </Typography>
                <div>
                  <Typography
                    style={{
                      fontSize: 18,
                      color: "#2ecc71",
                      fontWeight: "bold",
                    }}
                  >
                    {trackAccom2.reduce((count, val) => {
                      if (
                        val.validator_remarks === "Valid" ||
                        val.validator_remarks === "VALID"
                      ) {
                        count++;
                      }
                      return count;
                    }, 0)}
                  </Typography>
                </div>
              </div>
              <div>
                <Typography
                  style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}
                >
                  |
                </Typography>
              </div>
              <div
                onClick={() => invalid("Invalid")}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <Typography
                  style={{
                    fontSize: 13,
                    color: "#e74c3c",
                    position: "absolute",
                    top: -14,
                    left: 4,
                    fontWeight: "bold",
                  }}
                >
                  Invalid
                </Typography>
                <div>
                  <Typography
                    style={{
                      fontSize: 18,
                      color: "#e74c3c",
                      fontWeight: "bold",
                    }}
                  >
                    {trackAccom2.reduce((count, val) => {
                      if (
                        val.validator_remarks === "Invalid" ||
                        val.validator_remarks === "INVALID"
                      ) {
                        count++;
                      }
                      return count;
                    }, 0)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classes.dashboards}
            onClick={() => invalid("Random JO")}
            style={{
              cursor: "pointer",
              height: 50,
              width: 55,
              right: 160,
              top: 10,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              { }
              <Typography
                style={{
                  fontSize: 23,
                  color: "#e67e22",
                  fontWeight: "bold",
                }}
              >
                {countValidationPercentage()}
              </Typography>
              {/* <PowerSettingsNewIcon style={{color:'#e67e22',display:state.randomJOToValidate.length>0?'none':undefined}} onClick={()=>{
                  onClickPercentage()
                }}/> */}
            </div>
          </div>
        </>
      ) : undefined}
      {validation_type == "Valid" || validation_type == "Invalid" ? (
        <Draggable>
          <div
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 380,
              width: 300,
              top: 275,
              left: 75,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ padding: 15 }}>
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  right: 2,
                  top: -10,
                }}
              >
                <IconButton aria-label="delete">
                  <CloseIcon
                    onClick={() => closeValidation()}
                    style={{ color: "#fff" }}
                  />
                </IconButton>
              </div>
              <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                {validation_type}
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                  Wrong Validation :{" "}
                  {trackAccom2.reduce((count, val_data) => {
                    if (validation_type === "Valid") {
                      if (
                        val_data.validation_validator_status === "Invalid" &&
                        val_data.validator_remarks == "VALID"
                      ) {
                        count++;
                      }
                      return count;
                    } else if (validation_type === "Invalid") {
                      if (
                        val_data.validation_validator_status === "Invalid" &&
                        val_data.validator_remarks == "INVALID"
                      ) {
                        count++;
                      }
                      return count;
                    }
                  }, 0)}
                </Typography>
                <ExcelFile
                  filename={
                    "Accomplishments" +
                    "-" +
                    branch_name +
                    " " +
                    moment(new Date(date_start)).format("YYYY-MM-DD")
                  }
                  element={<CloudDownloadIcon style={{ color: "#fff" }} />}
                >
                  <ExcelSheet data={exportdata()} name="Accomplishments">
                    <ExcelColumn label="Jo ID" value="id" />
                    <ExcelColumn
                      label="Reference Number"
                      value="meter_number"
                    />
                    <ExcelColumn
                      label="Fieldman Name"
                      value="accom_fieldman_name"
                    />
                    <ExcelColumn
                      label="Fieldman findings"
                      value="accom_findings"
                    />
                    <ExcelColumn label="Date" value="date_accom" />
                    <ExcelColumn
                      label="Validator Name"
                      value="validator_name"
                    />
                    <ExcelColumn
                      label="Validator Remarks"
                      value="validator_remarks"
                    />
                    <ExcelColumn
                      label="Date Validated"
                      value="date_validated"
                    />
                    <ExcelColumn
                      label="Audit Validation Remarks"
                      value="validation_validator_status"
                    />
                  </ExcelSheet>
                </ExcelFile>
              </div>
              <Scrollbars style={{ height: 300 }}>
                {trackAccom2.map((val, index) => {
                  if (
                    val.validator_remarks === validation_type ||
                    val.validator_remarks ===
                    String(validation_type).toUpperCase()
                  )
                    return (
                      <div
                        onClick={() => {
                          var latlong = "";
                          var splitlatlng = "";
                          var lat = "";
                          var lng = "";
                          var complete_name = "";
                          splitlatlng = val.fetched_coordinates.split(",");
                          lat = splitlatlng[0];
                          lng = splitlatlng[1];
                          setmapOption({
                            ...mapOption,
                            lat: parseFloat(lat),
                            lng: parseFloat(lng),
                            zoom: 20,
                          });
                          onClickMarker2(
                            val,
                            index,
                            lat,
                            lng,
                            val.fetched_coordinates,
                            "single"
                          );
                          onToggleOpen(index);
                        }}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          backgroundColor: "rgba(0,0,0,0.6)",
                          padding: 10,
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              validation_priviledge != null &&
                              validation_priviledge != ""
                            ) {
                              setState({
                                ...state,
                                jo_to_validate: val,
                                openValidationValidator: true,
                              });
                            }
                          }}
                          style={{
                            display: "flex",
                            width: 20,
                            height: 20,
                            borderRadius: 20 / 2,
                            backgroundColor:
                              validation_type === "Invalid"
                                ? val.validation_validator_status === "Valid"
                                  ? "#27ae60"
                                  : "#e74c3c"
                                : val.validation_validator_status === "Invalid"
                                  ? "#e74c3c"
                                  : "#27ae60",
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            padding: 5,
                          }}
                        >
                          {val.validation_validator_status === "Valid" ? (
                            <CheckIcon style={{ fontSize: 30 }} />
                          ) : val.validation_validator_status === "Invalid" ? (
                            <ClearIcon style={{ fontSize: 30 }} />
                          ) : undefined}
                        </div>
                        <Typography style={{ color: "#fff" }}>
                          {val.meter_number} | {val.accom_findings}
                        </Typography>
                      </div>
                    );
                })}
              </Scrollbars>
            </div>
          </div>
        </Draggable>
      ) : undefined}
      {validation_type == "Random JO" ? (
        <Draggable>
          <div
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 380,
              width: 300,
              top: 275,
              left: 75,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ padding: 15 }}>
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  right: 2,
                  top: -10,
                }}
              >
                <IconButton aria-label="delete">
                  <CloseIcon
                    onClick={() => closeValidation()}
                    style={{ color: "#fff" }}
                  />
                </IconButton>
              </div>
              <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                {validation_type}
              </Typography>

              <Scrollbars style={{ height: 300 }}>
                {trackAccom2.map((val, index) => {
                  let match_random = state.index_randomJOToValidate.filter(
                    (val) => val == index
                  );

                  let match = false;
                  if (match_random.length > 0) {
                    if (
                      val.validator_remarks !== "VALID" &&
                      val.validator_remarks !== "INVALID"
                    ) {
                      match = true;
                    }
                  }
                  if (match)
                    return (
                      <div
                        onClick={() => {
                          var latlong = "";
                          var splitlatlng = "";
                          var lat = "";
                          var lng = "";
                          var complete_name = "";
                          splitlatlng = val.fetched_coordinates.split(",");
                          lat = splitlatlng[0];
                          lng = splitlatlng[1];
                          setmapOption({
                            ...mapOption,
                            lat: parseFloat(lat),
                            lng: parseFloat(lng),
                            zoom: 20,
                          });
                          onClickMarker2(
                            val,
                            index,
                            lat,
                            lng,
                            val.fetched_coordinates,
                            "single"
                          );
                          onToggleOpen(index);
                        }}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          backgroundColor: "rgba(0,0,0,0.6)",
                          padding: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: 20,
                            height: 20,
                            borderRadius: 20 / 2,
                            backgroundColor: "#e67e22",
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            padding: 5,
                          }}
                        >
                          {val.validation_validator_status === "Valid" ? (
                            <CheckIcon style={{ fontSize: 30 }} />
                          ) : val.validation_validator_status === "Invalid" ? (
                            <ClearIcon style={{ fontSize: 30 }} />
                          ) : undefined}
                        </div>
                        <Typography style={{ color: "#fff" }}>
                          {val.meter_number} | {val.accom_findings}
                        </Typography>
                      </div>
                    );
                })}
              </Scrollbars>
            </div>
          </div>
        </Draggable>
      ) : undefined}
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          Generate Accomplishments
        </DialogTitle>
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => setOpen(false)}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date"
                    format="MM-dd-yyyy"
                    name="date_start"
                    value={date_start_val}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeStart}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  size="small"
                  className={classes.formControl}
                  style={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Company
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeCompany}
                    label="Company"
                    name="company"
                    value={branches.Selectedcompany}
                  >
                    {home_reducer.company_name.map((val) => {
                      return (
                        <MenuItem value={val.company_id}>
                          {val.company_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  size="small"
                  className={classes.formControl}
                  style={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Branch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeBranch}
                    label="branch"
                    name="branch_id"
                    value={branches.Selected_branch}
                  >
                    {home_reducer.SelectedBranches.map((val, index) => {
                      return (
                        <MenuItem value={val.branch_id}>
                          {val.branch_company}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  size="small"
                  className={classes.formControl}
                  style={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Job Order
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeJobOrder}
                    label="branch"
                    name="branch_id"
                    value={map_reducer.selected_jo}
                  >
                    {map_reducer.jo_type.map((val, index) => {
                      return <MenuItem value={val}>{val}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "rgba(6,86,147)",
                  color: "white",
                  margin: 15,
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={summary_accom}
        onClose={() => {
          summary_accom_function(false);
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Monitoring</DialogTitle>
        <Summary_monitoring
          branch_id={branches.Selected_branch}
          date_start={date_start}
          branch_name={branch_name}
          excel_invalid_data={excel_invalid_data}
          close={() => {
            summary_accom_function(false);
          }}
        />
      </Dialog>
      {/* <Dialog
        style={{ backgroundColor: "#2d3436", width: "700" }}
        fullWidth
        open={OpenPic}
        onClose={() => onCLosePicture()}
        aria-labelledby="responsive-dialog-title"
      >
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div
                className="tools"
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                }}
              >
                <button
                  style={{
                    backgroundColor: "rgb(6, 86, 147)",
                    fontWeight: "bold",
                    color: "#fff",
                    borderStyle: "none",
                    fontSize: 20,
                    marginRight: 7,
                    width: 30,
                    borderRadius: 3,
                    outline: "none",
                    zIndex: 999999999999999999,
                  }}
                  onClick={zoomIn}
                >
                  <AddIcon style={{ color: "#fff", fontSize: 15 }} />
                </button>
                <br />
                <button
                  style={{
                    backgroundColor: "rgb(6, 86, 147)",
                    fontWeight: "bold",
                    color: "#fff",
                    borderStyle: "none",
                    fontSize: 20,
                    marginRight: 7,
                    width: 30,
                    borderRadius: 3,
                    outline: "none",
                    zIndex: 999999999999999999,
                  }}
                  onClick={zoomOut}
                >
                  <RemoveIcon style={{ color: "#fff", fontSize: 15 }} />
                </button>
                <br />
                <button
                  style={{
                    backgroundColor: "rgb(6, 86, 147)",
                    fontWeight: "bold",
                    color: "#fff",
                    borderStyle: "none",
                    fontSize: 20,
                    marginRight: 7,
                    width: 30,
                    borderRadius: 3,
                    outline: "none",
                    zIndex: 999999999999999999,
                  }}
                  onClick={resetTransform}
                >
                  <ClearIcon style={{ color: "#fff", fontSize: 15 }} />
                </button>
                <button
                  style={{
                    backgroundColor: "rgb(6, 86, 147)",
                    fontWeight: "bold",
                    color: "#fff",
                    borderStyle: "none",
                    fontSize: 20,
                    marginRight: 7,
                    width: 30,
                    borderRadius: 3,
                    outline: "none",
                    zIndex: 999999999999999999,
                  }}
                  onClick={() => {
                    rotateLeft();
                  }}
                >
                  <RotateLeftIcon style={{ color: "#fff", fontSize: 15 }} />
                </button>
                <button
                  style={{
                    backgroundColor: "rgb(6, 86, 147)",
                    fontWeight: "bold",
                    color: "#fff",
                    borderStyle: "none",
                    fontSize: 20,
                    marginRight: 7,
                    width: 30,
                    borderRadius: 3,
                    zIndex: 999999999999999999,
                  }}
                  onClick={() => {
                    rotateRight();
                  }}
                >
                  <RotateRightIcon style={{ color: "#fff", fontSize: 15 }} />
                </button>
              </div>
              <div
                style={{ position: "absolute", zIndex: 2, right: 1, top: -6 }}
              >
                <IconButton aria-label="delete">
                  <CloseIcon
                    onClick={() => onCLosePicture()}
                    style={{ color: "#fff" }}
                  />
                </IconButton>
              </div>
              <TransformComponent>
                <img
                  src={
                    discon
                      ? "http://audit.api.pacificweb.com.ph/assets/img/meter/" +
                        selectedPic
                      : "http://api.pacificweb.com.ph/assets/img/meter/" +
                        selectedPic
                  }
                  alt="test"
                  style={{
                    width: "600px",
                    height: "500px",
                    transform: "rotate(" + String(degree) + "deg)",
                  }}
                />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </Dialog> */}
      <Dialog
        fullWidth
        maxWidth="xl"
        open={OpenPic}
        onClose={() => onCLosePicture()}
      >
        <DialogContent>
          <div
            style={{
              width: "100%",
              // backgroundColor: "red",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={0} style={{ padding: 10 }}>
              <Grid item xs={12} md={7} style={{}}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={12} style={{}}>
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        right: 1,
                        top: -6,
                      }}
                    >
                      <IconButton aria-label="delete">
                        <CloseIcon
                          onClick={() => {
                            onCLosePicture();
                            setState({ ...state, edit: false });
                          }}
                          style={{ color: "#bdc3c7" }}
                        />
                      </IconButton>
                    </div>

                    {singleDetails.map((val, index) => {
                      let images = [];
                      if (
                        val.accom_images !== "" &&
                        val.accom_images !== null
                      ) {
                        images = JSON.parse(val.accom_images);
                      }
                      return (
                        <Carousel autoPlay={false}>
                          {val.image_path !== "" && val.image_path !== null ? (
                            images.map((images, index) => {
                              return (
                                <TransformWrapper
                                  defaultScale={1}
                                  defaultPositionX={200}
                                  defaultPositionY={100}
                                >
                                  {({
                                    zoomIn,
                                    zoomOut,
                                    resetTransform,
                                    ...rest
                                  }) => (
                                    <React.Fragment>
                                      <div
                                        className="tools"
                                        style={{
                                          position: "absolute",
                                          display: "flex",
                                          flexDirection: "row",

                                          marginTop: 10,
                                          marginLeft: 10,
                                          marginBottom: 10,
                                        }}
                                      >
                                        <IconButton
                                          style={{
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            fontWeight: "bold",
                                            color: "#fff",
                                            borderStyle: "none",
                                            fontSize: 20,
                                            marginRight: 7,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 40 / 2,
                                            // borderRadius: 3,
                                            outline: "none",
                                            zIndex: 999999999999999999,
                                          }}
                                          onClick={zoomIn}
                                        >
                                          <AddIcon
                                            style={{
                                              color: "#fff",
                                              fontSize: 15,
                                            }}
                                          />
                                        </IconButton>
                                        <br />
                                        <IconButton
                                          style={{
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            fontWeight: "bold",
                                            color: "#fff",
                                            borderStyle: "none",
                                            fontSize: 20,
                                            marginRight: 7,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 40 / 2,
                                            // borderRadius: 3,
                                            outline: "none",
                                            zIndex: 999999999999999999,
                                          }}
                                          onClick={zoomOut}
                                        >
                                          <RemoveIcon
                                            style={{
                                              color: "#fff",
                                              fontSize: 22,
                                            }}
                                          />
                                        </IconButton>
                                        <br />
                                        <IconButton
                                          style={{
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            fontWeight: "bold",
                                            color: "#fff",
                                            borderStyle: "none",
                                            fontSize: 20,
                                            marginRight: 7,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 40 / 2,
                                            // borderRadius: 3,
                                            outline: "none",
                                            zIndex: 999999999999999999,
                                          }}
                                          onClick={resetTransform}
                                        >
                                          <ClearIcon
                                            style={{
                                              color: "#fff",
                                              fontSize: 22,
                                            }}
                                          />
                                        </IconButton>
                                        <IconButton
                                          style={{
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            fontWeight: "bold",
                                            color: "#fff",
                                            borderStyle: "none",
                                            fontSize: 20,
                                            marginRight: 7,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 40 / 2,
                                            // borderRadius: 3,
                                            outline: "none",
                                            zIndex: 999999999999999999,
                                          }}
                                          onClick={() => {
                                            rotateLeft();
                                          }}
                                        >
                                          <RotateLeftIcon
                                            style={{
                                              color: "#fff",
                                              fontSize: 22,
                                            }}
                                          />
                                        </IconButton>
                                        <IconButton
                                          style={{
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            fontWeight: "bold",
                                            color: "#fff",
                                            borderStyle: "none",
                                            fontSize: 20,
                                            marginRight: 7,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 40 / 2,
                                            zIndex: 999999999999999999,
                                          }}
                                          onClick={() => {
                                            rotateRight();
                                          }}
                                        >
                                          <RotateRightIcon
                                            style={{
                                              color: "#fff",
                                              fontSize: 22,
                                            }}
                                          />
                                        </IconButton>
                                      </div>
                                      <TransformComponent
                                        style={{ zIndex: 999 }}
                                      >
                                        <img
                                          onClick={() => {
                                            onCLickImage(images);
                                          }}
                                          onLoad ={
                                            resetTransform
                                          }
                                          src={
                                            discon
                                              ? "http://audit.api.pacificweb.com.ph/assets/img/meter/" +
                                              images.path
                                              : "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                                              images.path
                                          }
                                          alt="test"
                                          style={{
                                            width: window.innerWidth * 0.585,
                                            height: window.innerHeight * 0.77,
                                            transform:
                                              "rotate(" +
                                              String(degree) +
                                              "deg)",
                                          }}
                                        />
                                      </TransformComponent>
                                    </React.Fragment>
                                  )}
                                </TransformWrapper>
                              );
                            })
                          ) : (
                            <img
                              src={require("../../../../assets/map image/no_image.png")}
                              alt="test"
                              style={{
                                width: window.innerWidth * 0.585,
                                height: window.innerHeight * 0.77,
                                transform: "rotate(" + String(degree) + "deg)",
                              }}
                            />
                          )}
                        </Carousel>
                      );
                    })}
                  </Grid>
                  {/* <Grid item xs={12} md={12} style={{}}>
              <Map/>
              </Grid> */}
                </Grid>

                {/* // )} */}
              </Grid>
              <Grid item xs={12} md={5}>
                <Card
                  style={{ backgroundColor: "#fff", height: "100%" }}
                  variant={"outlined"}
                >
                  <CardContent>
                    <Grid container spacing={0} >
                      <Grid item xs={4} md={4}>
                        {new_pickIndex > 0 ? (
                          <div
                            onClick={() => onPrevious(new_pickIndex - 1)}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              color: "#065693",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: 'pointer'
                            }}
                          >
                            <ArrowLeftIcon
                              style={{ color: "#065693", fontSize: 40 }}
                            />
                            <Typography>Previous</Typography>
                          </div>
                        ) : undefined}
                      </Grid>

                      <Grid item xs={4} md={4}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            color: "#065693",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography>{new_pickIndex + 1}</Typography>
                          <Typography>&nbsp;/&nbsp;</Typography>
                          <Typography>{trackAccom2.length}</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        {new_pickIndex < trackAccom2.length - 1 ? (
                          <div
                            onClick={() => {
                              onNext(new_pickIndex + 1);
                            }}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              color: "#065693",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: 'pointer'
                            }}
                          >
                            <Typography>Next</Typography>
                            <ArrowRightIcon
                              style={{ color: "#065693", fontSize: 40 }}
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </Grid>
                    </Grid>

                    <Typography
                      style={{
                        fontSize: 18,
                        color: "#065693",
                        fontWeight: "bold",
                      }}
                    >
                      Accomplishment
                    </Typography>
                    <div
                      style={{
                        borderTopWidth: 1,
                        borderStyle: "solid",
                        borderTopColor: "#bdc3c7",
                        borderBottomWidth: 0,
                        borderBottomRight: 0,
                        borderBottomLeft: 0,
                      }}
                    ></div>

                    <div style={{ padding: 10 }}>

                      <Grid container spacing={2}>
                        {singleDetails.map((val, index) => {
                          let match_random = state.index_randomJOToValidate.filter(
                            (val) => val == new_pickIndex
                          );
                          let actual = get_accom_to_be_audited.filter(
                            (val_actual) =>
                              val_actual.meter_number === val.meter_number
                          );
                          let name = "No Name";
                          let location = "No Address";
                          if (
                            val.customer_lname != "" &&
                            val.customer_fname != ""
                          ) {
                            name =
                              val.customer_lname + " " + val.customer_fname;
                          }
                          if (val.customer_location != "") {
                            name = val.customer_location;
                          }
                          let images = [];
                          if (
                            val.accom_images !== "" &&
                            val.accom_images !== null
                          ) {
                            images = JSON.parse(val.accom_images);
                          }
                          let borderColor = undefined;
                          let borderWidth = undefined;
                          let borderStyle = undefined;
                          let display = 'none'
                          if (match_random.length > 0) {
                            borderColor = "#e67e22";
                            borderWidth = 4;
                            borderStyle = "solid";
                            display = undefined
                          }
                          return (
                            <>
                              <Grid item xs={12}>
                                <Typography style={{ display: display, color: '#e67e22', fontWeight: 'bold' }}>Required to Validate</Typography>
                                {/* <Card variant="outlined" style={{ padding: 10 }}>
                          <Carousel autoPlay={false}>
                            {val.image_path !== "" &&
                            val.image_path !== null ? (
                              images.map((images) => {
                                return (
                                  <img
                                    onClick={() => {
                                      onCLickImage(images);
                                    }}
                                    src={
                                      discon
                                        ? "http://audit.api.pacificweb.com.ph/assets/img/meter/" +
                                          images.path
                                        : "http://api.pacificweb.com.ph/assets/img/meter/" +
                                          images.path
                                    }
                                    alt="test"
                                    style={{
                                      width: "100%",
                                      height: "250px",
                                    }}
                                  />
                                );
                              })
                            ) : (
                              <img
                                src={require("../../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "250px" }}
                              />
                            )}
                          </Carousel>
                        </Card> */}
                              </Grid>

                              {val.validator_remarks != "" &&
                                val.validator_remarks != null ? (
                                !state.edit ? (
                                  <div
                                    style={{
                                      borderWidth: 2,
                                      borderColor: "#bdc3c7",
                                      borderStyle: "solid",
                                      width: "100%",
                                      padding: 15,
                                      marginTop: 10,
                                      position: "relative",
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: 17,
                                        color: "#065693",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Validation
                                    </Typography>
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 20,
                                      }}
                                    >
                                      <div style={{ width: "15%" }}>
                                        <Typography>Status</Typography>
                                      </div>
                                      <div style={{ width: "1%" }}>
                                        <Typography>:</Typography>
                                      </div>
                                      <div
                                        style={{ width: "60%", marginLeft: 8 }}
                                      >
                                        <Typography
                                          style={{ fontWeight: "bold" }}
                                        >
                                          {val.validator_remarks}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 20,
                                      }}
                                    >
                                      <div style={{ width: "15%" }}>
                                        <Typography>Findings</Typography>
                                      </div>
                                      <div style={{ width: "1%" }}>
                                        <Typography>:</Typography>
                                      </div>
                                      <div
                                        style={{ width: "60%", marginLeft: 8 }}
                                      >
                                        <Typography
                                          style={{ fontWeight: "bold" }}
                                        >
                                          {val.validator_remark_type}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 20,
                                      }}
                                    >
                                      <div style={{ width: "15%" }}>
                                        <Typography>Remarks</Typography>
                                      </div>
                                      <div style={{ width: "1%" }}>
                                        <Typography>:</Typography>
                                      </div>
                                      <div
                                        style={{ width: "60%", marginLeft: 8 }}
                                      >
                                        <Typography
                                          style={{ fontWeight: "bold" }}
                                        >
                                          {val.validator_remark_type_category}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 20,
                                      }}
                                    >
                                      <div style={{ width: "15%" }}>
                                        <Typography>Comment</Typography>
                                      </div>
                                      <div style={{ width: "1%" }}>
                                        <Typography>:</Typography>
                                      </div>
                                      <div
                                        style={{ width: "60%", marginLeft: 8 }}
                                      >
                                        <Typography
                                          style={{ fontWeight: "bold" }}
                                        >
                                          {val.validator_comment}
                                        </Typography>
                                      </div>
                                    </div>
                                    {val.user_lname !== null ? (
                                      <>
                                        <div
                                          style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            marginLeft: 20,
                                          }}
                                        >
                                          <div style={{ width: "15%" }}>
                                            <Typography>Validator</Typography>
                                          </div>
                                          <div style={{ width: "1%" }}>
                                            <Typography>:</Typography>
                                          </div>
                                          <div
                                            style={{
                                              width: "60%",
                                              marginLeft: 8,
                                            }}
                                          >
                                            <Typography
                                              style={{ fontWeight: "bold" }}
                                            >
                                              {val.user_lname +
                                                " " +
                                                val.user_fname}
                                            </Typography>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            marginLeft: 20,
                                          }}
                                        >
                                          <div style={{ width: "15%" }}>
                                            <Typography>Date</Typography>
                                          </div>
                                          <div style={{ width: "1%" }}>
                                            <Typography>:</Typography>
                                          </div>
                                          <div
                                            style={{
                                              width: "60%",
                                              marginLeft: 8,
                                            }}
                                          >
                                            <Typography
                                              style={{ fontWeight: "bold" }}
                                            >
                                              {val.date_validated}
                                            </Typography>
                                          </div>
                                        </div>
                                      </>
                                    ) : undefined}
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: 1,
                                        right: 1,
                                      }}
                                    >
                                      <Button
                                        onClick={() => {
                                          setState({ ...state, edit: true });
                                        }}
                                        variant="contained"
                                        style={{
                                          backgroundColor: "rgba(6,86,147)",
                                          color: "white",
                                          margin: 15,
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <div
                                        style={{
                                          paddingRight: 10,
                                          paddingLeft: 10,
                                        }}
                                      >
                                        <RadioGroup
                                          value={val.validator_remarks}
                                          onChange={(e) => {
                                            handleRadioChange(e, userId);
                                            singleDetails.map((val, index) => {
                                              val.validator_remark_type = "";
                                            });
                                            setState({
                                              ...state,
                                              validation_remarks: "",
                                            });
                                          }}
                                        >
                                          <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                              <FormControlLabel
                                                value="VALID"
                                                control={<Radio />}
                                                label="Valid"
                                              />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                              <FormControlLabel
                                                value="INVALID"
                                                control={<Radio />}
                                                label="Invalid"
                                              />
                                            </Grid>
                                          </Grid>
                                        </RadioGroup>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        borderWidth: 2,
                                        borderColor: "#bdc3c7",
                                        borderStyle: "solid",
                                        width: "100%",
                                        padding: 15,
                                      }}
                                    >
                                      <form onSubmit={onSubmitRemarks}>
                                        {val.validator_remarks === "VALID" ? (
                                          <Typography
                                            style={{
                                              fontSize: 10,
                                              color: "#bdc3c7",
                                            }}
                                          >
                                            Note : Adding Remarks is optional{" "}
                                          </Typography>
                                        ) : (
                                          <Typography
                                            style={{
                                              fontSize: 10,
                                              color: "#bdc3c7",
                                            }}
                                          >
                                            Note : Adding Remarks is required{" "}
                                          </Typography>
                                        )}
                                        <FormControl
                                          size="small"
                                          className={classes.formControl}
                                          style={{ width: "100%" }}
                                        >
                                          <InputLabel id="demo-simple-select-outlined-label">
                                            Findings
                                          </InputLabel>
                                          <Select
                                            required
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            onChange={onChangeRemarks}
                                            label="Company"
                                            name="company"
                                            value={state.validation_remarks}
                                          >
                                            {state.field_findings.map(
                                              (val_findings) => {
                                                if (
                                                  val_findings.status ===
                                                  val.validator_remarks
                                                )
                                                  return (
                                                    <MenuItem
                                                      value={
                                                        val_findings.findings
                                                      }
                                                    >
                                                      {val_findings.findings}
                                                    </MenuItem>
                                                  );
                                              }
                                            )}
                                          </Select>
                                        </FormControl>
                                        {state.category_remarks.length > 0 ?
                                          <FormControl
                                            size="small"
                                            className={classes.formControl}
                                            style={{ width: "100%", marginTop: 10 }}
                                          >
                                            <InputLabel id="demo-simple-select-outlined-label">
                                              Remarks
                                            </InputLabel>
                                            <Select
                                              required
                                              labelId="demo-simple-select-outlined-label"
                                              id="demo-simple-select-outlined"
                                              onChange={onChangeRemarksCategory}
                                              label="Company"
                                              name="company"
                                              value={state.validation_remarks_category}
                                            >
                                              {state.category_remarks.map(
                                                (val_findings) => {

                                                  return (
                                                    <MenuItem
                                                      value={
                                                        val_findings
                                                      }
                                                    >
                                                      {val_findings}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                            </Select>
                                          </FormControl>


                                          : undefined

                                        }
                                        <div>

                                          <TextareaAutosize onChange={(e) => {
                                            setState(prev => ({ ...prev, validator_comment: e.target.value }))
                                          }} aria-label="minimum height" minRows={4} placeholder="Enter your comment" style={{ width: '100%', marginTop: 10, height: 40 }} />
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                          }}
                                        >
                                          <Button
                                            onClick={() => {
                                              setState({
                                                ...state,
                                                edit: false,
                                              });
                                            }}
                                            variant="contained"
                                            type="button"
                                            style={{
                                              backgroundColor: "#636e72",
                                              color: "white",
                                              marginTop: 15,
                                              marginBottom: 15,
                                            }}
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            type="submit"
                                            variant="contained"
                                            style={{
                                              backgroundColor: "rgba(6,86,147)",
                                              color: "white",
                                              margin: 15,
                                            }}
                                          >
                                            Submit
                                          </Button>
                                        </div>
                                      </form>
                                    </div>
                                  </>
                                )
                              ) : (
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <div
                                    style={{
                                      paddingRight: 10,
                                      paddingLeft: 10,
                                    }}
                                  >
                                    <RadioGroup
                                      value={val.validator_remarks}
                                      onChange={(e) => {
                                        handleRadioChange(e, userId);
                                        singleDetails.map((val, index) => {
                                          val.validator_remark_type = "";
                                        });
                                        setState({
                                          ...state,
                                          edit: true,
                                        });
                                      }}
                                    >
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                          <FormControlLabel
                                            value="VALID"
                                            control={<Radio />}
                                            label="Valid"
                                          />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <FormControlLabel
                                            value="INVALID"
                                            control={<Radio />}
                                            label="Invalid"
                                          />
                                        </Grid>
                                      </Grid>
                                    </RadioGroup>
                                  </div>
                                </div>
                              )}
                              <div
                                style={{
                                  borderWidth: 2,
                                  borderColor: "#bdc3c7",
                                  borderStyle: "solid",
                                  width: "100%",
                                  padding: 15,
                                  marginTop: 10,
                                }}
                              >
                                <Scrollbars
                                  style={{ height: 270, marginLeft: 10 }}
                                >
                                  <div style={{ padding: 5 }}>
                                    <Typography
                                      style={{
                                        fontSize: 17,
                                        color: "#065693",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Details
                                    </Typography>
                                    {map_reducer.selected_details.map((val) => {
                                      return (
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: 8,
                                              height: 8,
                                              borderRadius: 8 / 2,
                                              backgroundColor: "#000",
                                              marginRight: 8,
                                            }}
                                          />
                                          <Typography>
                                            {val.name} : {val.value}
                                          </Typography>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div style={{ padding: 5 }}>
                                    {account_no_records.map((val) => {
                                      if (
                                        moment(new Date(date_start)).format(
                                          "YYYY-MM"
                                        ) ==
                                        moment(
                                          new Date(val.date_accomplished)
                                        ).format("YYYY-MM")
                                      )
                                        return (
                                          <div style={{ marginTop: 20 }}>
                                            <Typography
                                              style={{
                                                color: "#065693",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              Fieldman Accomplishment
                                            </Typography>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: 8 / 2,
                                                  backgroundColor: "#000",
                                                  marginRight: 8,
                                                }}
                                              />
                                              <Typography
                                                style={{ color: "#000" }}
                                              >
                                                Findings :{" "}
                                                {val.field_findings_value}
                                              </Typography>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: 8 / 2,
                                                  backgroundColor: "#000",
                                                  marginRight: 8,
                                                }}
                                              />
                                              <Typography
                                                style={{ color: "#000" }}
                                              >
                                                Reading : {val.present_reading}
                                              </Typography>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: 8 / 2,
                                                  backgroundColor: "#000",
                                                  marginRight: 8,
                                                }}
                                              />
                                              <Typography
                                                style={{ color: "#000" }}
                                              >
                                                Date : {val.date_accomplished}
                                              </Typography>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: 8 / 2,
                                                  backgroundColor: "#000",
                                                  marginRight: 8,
                                                }}
                                              />
                                              <Typography
                                                style={{ color: "#000" }}
                                              >
                                                Meter No. : {val.meter_no}
                                              </Typography>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: 8 / 2,
                                                  backgroundColor: "#000",
                                                  marginRight: 8,
                                                }}
                                              />
                                              <Typography
                                                style={{ color: "#000" }}
                                              >
                                                Account No. :{" "}
                                                {val.account_number}
                                              </Typography>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: 8 / 2,
                                                  backgroundColor: "#000",
                                                  marginRight: 8,
                                                }}
                                              />
                                              <Typography
                                                style={{ color: "#000" }}
                                              >
                                                Fieldman :{" "}
                                                {val.user_lname +
                                                  " " +
                                                  val.user_fname}
                                              </Typography>
                                            </div>
                                          </div>
                                        );
                                    })}
                                  </div>
                                </Scrollbars>
                              </div>
                              {/* </Grid> */}
                            </>
                          );
                        })}
                      </Grid>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openPDF}
        onClose={() => {
          openPDF_func();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Preview</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={() => openPDF_func()}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <PDF
            singleDetails={singleDetails}
            images_base_64={images_base_64}
            logo={logo}
            branch_name={branch_name}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={leftPageSelect}
        onClose={() => {
          accomlistdurationpermeter();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Accomplishments</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={() => accomlistdurationpermeter()}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* <div style={{display:'flex',alignItems:'center',borderWidth:1,borderColor:'#95a5a6',borderStyle:'solid',width:'40%',borderRadius:5,padding:5}}>
          <input style={{border:'none',outline:'none',width:'100%'}} placeholder='Search'/>
          <SearchIcon/>

          </div > */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#95a5a6",
                borderStyle: "solid",
                width: "30%",
                borderRadius: 5,
                padding: 8,
              }}
            >
              <select
                style={{ border: "none", outline: "none", width: "100%" }}
                value={state.duration}
                onChange={onChangeDuration}
              >
                <option value={5}>5 Minutes and Above</option>
                <option value={10}>10 Minutes and Above</option>
                <option value={15}>15 Minutes and Above</option>
                <option value={30}>30 Minutes and Above</option>
                <option value={45}>45 Minutes and Above</option>
                <option value={60}>1 Hour and Above</option>
                <option value={120}>2 Hours and Above</option>
              </select>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<RotateLeftIcon />}
                style={{ marginRight: 5, backgroundColor: "rgb(6, 86, 147)" }}
                onClick={() => {
                  getDurationInterval(
                    state.new_trackAccom,
                    state.field_findings,
                    state.duration
                  );
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "rgb(6, 86, 147)" }}
                className={classes.button}
                onClick={() => {
                  onClickMatch();
                }}
              >
                Match :{" "}
                {state.new_trackAccom.reduce((count, row, index) => {
                  if (row.bg_color == "#e74c3c") {
                    count++;
                  }
                  return count;
                }, 0)}
              </Button>
            </div>
          </div>
          <TableContainer
            onScroll={() => {
              var elmnt = document.getElementById("tableScroll");
              sessionStorage.setItem("scrollPosition", elmnt.scrollTop);
            }}
            id={"tableScroll"}
            component={Paper}
            style={{ height: 400, marginTop: 15 }}
          >
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  ></TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Reference
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Field Findings
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Battery
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Time from Previous
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Distance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.match_new_trackAccom.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{
                        cursor: "pointer",
                        backgroundColor: row.bg_color,
                      }}
                      onClick={() => {
                        if (row.current_previous_data.length > 0) {
                          onClick_list_Duration(
                            row.current_previous_data,
                            row.pathCoordinates,
                            row.midPoint
                          );
                        } else {
                          // onClickListDetails(row,state.new_trackAccom.length - (index+1))
                          onNext(
                            state.match_new_trackAccom.length - (index + 1)
                          );
                        }
                      }}
                    >
                      <TableCell style={{ color: row.color }}>
                        {state.match_new_trackAccom.length - index}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {row.meter_number}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {row.accom_findings}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {moment(row.date_accom).format("hh:mm A")}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {row.accom_battery_life}
                      </TableCell>
                      <TableCell
                        style={{ color: row.color, fontWeight: "bold" }}
                      >
                        {parseInt(row.duration_from_previous)} min/s
                      </TableCell>
                      <TableCell
                        style={{ color: row.color, fontWeight: "bold" }}
                      >
                        {parseFloat(row.distance).toFixed(2)} meters
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.openValidationValidator}
        onClose={() => {
          setState({ ...state, openValidationValidator: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Validation</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={() =>
                setState({ ...state, openValidationValidator: false })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <ValidationValidator
            jo={state.jo_to_validate}
            close={(jo) => {
              setState({ ...state, openValidationValidator: false });

              trackAccom2.forEach((val) => {
                if (jo.accom_id === val.accom_id) {
                  val.validation_validator = jo.validation_validator;
                  val.validation_validator_status =
                    jo.validation_validator_status;
                  val.validation_validator_date = jo.validation_validator_date;
                }
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FieldmanAccom;
