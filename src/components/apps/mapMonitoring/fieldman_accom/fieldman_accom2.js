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
    background: "rgba(0,0,0,0.6)",
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
  get_accom_to_be_audited
}) {
  const { height } = window.innerHeight;
  const { width } = window.innerWidth;
  const classes = useStyles();
  const theme = useTheme();
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
    new_selectedPic:selectedPic
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
      console.log(res);
      setState({ ...state, field_findings: res.field_findings });
    });
  }, []);
  const handleRadioChangeFunction = (e) => {
    setState({ ...state, validation_status: e.target.value });
  };
  const onChangeRemarks = (e) => {
    setState({ ...state, validation_remarks: e.target.value });
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
    };
    let val2 = state.validation_remarks;
    getData("tracking/onChangeValidationRemarks", data, discon).then((res) => {
      console.log(res);
      if (res.response === true) {
        singleDetails.map((val, index) => {
          val.validator_remark_type = val2;
        });
        setState({ ...state, edit: false });
      }
      dispatch_data("loading_map", false);
    });
  };
  return (
    <div style={{width:'100%',height:'100%'}}>
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
          <div
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
          </div>

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
      <div className={classes.dashboards}  style={{width:'50wv'}}>
          <div style={{}}
          >
              {/* #Dashboard Start */}
              <div  > 
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                  <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                    {count_fieldman + "/" + fieldman.reduce((count,val)=>{
                    if(parseInt(val.user_delete_id) === 0){
                      count++
                    }
                    return count;
                  },0)}
                  </Typography>
                </div>
                <Typography style={{ marginTop: -12, fontSize: 18 }}>
                  Fieldman
                </Typography>
              </Grid>

              <Grid></Grid>
            </Grid>

              </div>
                {/* #Dashboard End */}

              
          </div>

      </div>
    
    </div>
  );
}

export default FieldmanAccom;
