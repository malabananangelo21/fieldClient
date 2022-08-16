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
import Input from "@material-ui/core/Input";
import {
  Divider,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ReactExport from "react-data-export";
import GetAppIcon from "@material-ui/icons/GetApp";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
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
});

function Dashboard({
  setOpen,
  setFieldman_list,
  setShowGraph,
  open,
  handleClose,
  onSubmit,
  Refresh,
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
  job_order_type,
  jo_type,
  jo_type_val,
  onChangeJobOrder,
  inactive,
  excelFile,
  running,
  no_schedule,
  array_dashboard_data,
  with_schedule
}) {
  const classes = useStyles();
  const map_reducer = useSelector((state) => state.map_reducer);
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  const [state, setState] = React.useState({
    modal_employee: false,
    excelData: [],
  });
  const handleListItemClick = (event, index, val) => {
    let jo_type = [];
    let match = false;
    if (val == "ALL") {
      if (state.check_all == false) {
        map_reducer.accom_jo_type.map((va_data) => {
          jo_type.push(va_data);
        });
      } else {
        jo_type = [];
      }
      setState({ ...state, check_all: !state.check_all });
    } else {
      map_reducer.selected_jo.map((va_data) => {
        if (va_data != val) {
          jo_type.push(va_data);
        } else {
          match = true;
        }
      });
      if (!match) {
        jo_type.push(val);
      }
    }
    map_reducer.selected_jo = jo_type;
    setState({ ...state });
  };
  // React.useEffect(()=>{
  //   let excelFile = []
  //   fieldman_map.map((row, key) => {
  //     let trackAccom2_new = row.jo_accom_list
  //     let batch = row.batch

  //     let first = '';
  //     let last = ''
  //     let date = ''

  //     if(trackAccom2_new.length > 0){
  //       first = moment(trackAccom2_new[0].date_accom).format("hh:mm A")
  //       last = moment(trackAccom2_new[trackAccom2_new.length - 1].date_accom).format("hh:mm A")

  //     }
  //     let data = {
  //       user_id:row.user_id,
  //       name:row.completename,
  //       date:date_start,
  //       first:first,
  //       last:last,
  //     }
  //     if(trackAccom2_new.length > 0){
  //     excelFile.push(data)

  //     }
  //   })
  //   // setState({...state,excelData:excelFile})
  // })
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const matches = useMediaQuery("(max-width:420px)");
  const totalValidation = () =>{
    let countValidation = 0;
    let percent = 0;
    fieldman_map.map((row, key) => {
      let new_percent = 0;
      if (row.jo_accom_list.length !== 0) {
        let trackAccom2 = row.jo_accom_list;
        countValidation += trackAccom2.reduce((count,val)=>{
          if(val.validator_remarks === 'INVALID' || val.validator_remarks === 'VALID' ){
            count++
          }
          return count
        },0)
        new_percent = parseInt((trackAccom2.length) * (map_reducer.count_validation_logs/100));
        if(trackAccom2.length <= 50){
          new_percent = trackAccom2.length
        }
        if(new_percent < 50){
          if(trackAccom2.length > 50){
            new_percent = 50
          }
        }
        percent += new_percent
    }
  })
  return countValidation+' of '+percent
  }
  return (
    <div>
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
          <form onSubmit={Refresh}>
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
          onClick={() => {
            setFieldman_list(false);
            setShowGraph(true);
          }}
          style={{
            marginRight: 10,
          }}
        >
          <EqualizerIcon
            style={{
              color: "#f1c40f",
              fontSize: 35,
              background: "rgba(0,0,0,0.6)",
            }}
          />
        </div>
        <div
          onClick={() => {
            summary_page();
          }}
          style={{
            marginRight: 10,
          }}
        >
          <DateRangeIcon
            style={{
              color: "#f1c40f",
              fontSize: 35,
              background: "rgba(0,0,0,0.6)",
            }}
          />
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

      {/* Fieldman Start */}
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
          <Grid container className={classes.whiteText} spacing={1}>
            <Grid item xs={12}>
              <div style={{ height: 40, overflowY: "auto", width: 180 }}>
                {jo_type_val.map((val) => {
                  return (
                    <Typography style={{ fontSize: 15, fontWeight: "bold" }}>
                      {val}
                    </Typography>
                  );
                })}
              </div>

              {/* <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
                     {jo_type_val}
                      </Typography> */}
              {/* {jo_type_val} */}

              <Typography style={{ fontSize: 16 }}>
                {moment(date_start).format("LL")}
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
              <Typography style={{ fontSize: 16 }}>
              
                {moment(date_start).format("LL")}
              </Typography>
            </Grid> */}
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
              <Typography onClick={(e)=>{
                let data = fieldman.filter((val,index)=>(parseInt(val.user_delete_id) === 0 && val.employee_status !== 'Trainee' &&  val.employee_status !== 'Apprentice' && val.jo_sched !== 'Rescue'))
                 dash_click(e, data);
              }} style={{ marginTop: -10, fontSize: 13.4 }}>
                Regular : {fieldman.reduce((count, val) => {
                      if (parseInt(val.user_delete_id) === 0 && val.employee_status !== 'Trainee' &&  val.employee_status !== 'Apprentice') {
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
              <Typography onClick={(e)=>{
                let data = fieldman.filter((val,index)=>(parseInt(val.user_delete_id) === 0 && val.employee_status === 'Trainee' && val.jo_sched !== 'Rescue'))
                 dash_click(e, data);
              }} style={{ marginTop: -6, fontSize: 13.4 }}>
                Trainee : {fieldman.reduce((count, val) => {
                      if (parseInt(val.user_delete_id) === 0 && val.employee_status == 'Trainee') {
                        count++;
                      }
                      return count;
                    }, 0)}
              </Typography>
              <Typography onClick={(e)=>{
                let data = fieldman.filter((val,index)=>(parseInt(val.user_delete_id) === 0 && val.employee_status === 'Apprentice' && val.jo_sched !== 'Rescue'))
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
              {array_dashboard_data.map((array_dashboard_data_val)=>{
                return   <Grid
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
                    {array_dashboard_data_val.type} : {array_dashboard_data_val.data.length}
                  </Typography>
                </div>
                {/* <Typography style={{ fontSize: 14,fontWeight:'bold' }}>25</Typography> */}
              </Grid>
              })

              }
            
            </Grid>
          </div>
        </div>
      </div>
      {/* Fieldman End  */}
      {/* Total JO Start */}
      <div
        className={classes.dashboards}
        style={{
          cursor: "pointer",
          height: 150,
          width: 193,
          top: 98,
          left: 306,
          margin: 18,
          position: "fixed",
          zIndex: 2,
          visibility: initialBoard.visibility,
        }}
      >
        <div style={{ padding: 15 }}>
          <Grid container className={classes.whiteText} spacing={1}>
            <Grid item xs={12}>
              <Typography style={{ fontSize: 18 }}>Total JO</Typography>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -10,
                }}
              >
                <Typography style={{ fontSize: 35, color: "#3498db" }}>
                  {formatNumber(total_jo)}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography style={{ fontSize: 18, color: "#fff" }}>
                  Run. Assign :{" "}
                  {running}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography style={{ fontSize: 18, color: "#fff" }}>
                  Ave. Assign :{" "}
                  {isNaN(assign / count_fieldman)
                    ? 0
                    : parseInt(assign / count_fieldman)}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      {/* Total JO END */}
      {/* Dasboard Start */}
      <div
        className={classes.dashboards}
        style={{
          cursor: "pointer",
          height: 140,
          width: 500,
          top: 271,
          //   margin: 18,
          position: "fixed",
          zIndex: 2,
          visibility: initialBoard.visibility,
        }}
      >
        <div style={{ padding: 15, marginTop: 5 }}>
          <Grid container className={classes.whiteText} spacing={2}>
            <Grid item xs={3} md={3}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#778beb",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 32, color: "#fff" }}>
                  {formatNumber(assign)}
                </Typography>
                <Typography style={{ fontSize: 20, color: "#fff" }}>
                  {isNaN(assign / total_jo)
                    ? 0
                    : parseFloat((assign / total_jo) * 100).toFixed(2)}
                  %
                </Typography>
                <Typography style={{ fontSize: 15 }}>Assigned</Typography>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#f3a683",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 32, color: "#fff" }}>
                  {formatNumber(unassign)}
                </Typography>
                <Typography style={{ fontSize: 20, color: "#fff" }}>
                  {isNaN(unassign / total_jo)
                    ? 0
                    : parseFloat((unassign / total_jo) * 100).toFixed(2)}
                  %
                </Typography>
                <Typography style={{ fontSize: 15 }}>Unassigned</Typography>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#2ecc71",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 32, color: "#fff" }}>
                  {formatNumber(jo_accom_list)}
                </Typography>
                <Typography style={{ fontSize: 20, color: "#fff" }}>
                  {isNaN(jo_accom_list / total_jo)
                    ? 0
                    : parseFloat((jo_accom_list / total_jo) * 100).toFixed(2)}
                  %
                </Typography>
                <Typography style={{ fontSize: 15 }}>Accomplished</Typography>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#786fa6",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 32, color: "#fff" }}>
                  {assign - jo_accom_list < 0
                    ? 0
                    : formatNumber(assign - jo_accom_list)}
                </Typography>
                <Typography style={{ fontSize: 20, color: "#fff" }}>
                  {isNaN(assign / total_jo)
                    ? 0
                    : assign - jo_accom_list < 0
                    ? 0
                    : parseFloat(
                        ((assign - jo_accom_list) / total_jo) * 100
                      ).toFixed(2)}
                  %
                </Typography>
                <Typography style={{ fontSize: 15 }}>Remaining</Typography>
              </div>
            </Grid>

            {/* <Grid item xs={12} >
                                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <Typography style={{ fontSize: 50, }}>{state.total_jo}</Typography>
                                </div>
                            </Grid> */}
          </Grid>
        </div>
      </div>
      {/* Dashboard End */}
      {/* Graph Start */}
      <div>
        <div
          onClick={() => {
            setFieldman_list(!fieldman_list);
            clearTimeout(timerRef.current);
            setpause(false);
          }}
          className={classes.dashboards}
          style={{
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
            height: 252,
            width: 500,
            top: 416,
            position: "fixed",
            zIndex: 2,
            visibility: initialBoard.visibility,
          }}
        >
          <div style={{ padding: 15, width: "60%" }}>
            <Typography
              style={{
                fontSize: 18,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Job Order
            </Typography>
            {/* <Grid container className={classes.whiteText} spacing={2}> */}
            <div
              style={{
                width: 393,
                position: "absolute",
                right: 130,
                top: 25,
              }}
            >
              <PieGrap pieGraph={pie_graph} />
            </div>
            {/* </Grid> */}
          </div>
          <div style={{ width: "40%", padding: 15 }}>
            {}
            {delivery_type.map((val, index) => {
              let width_type = "45%";
              let width_asteris = "20%";
              delivery_type.map((val_type) => {
                if (val_type.type === "RE-OUT DN" && val_type.count === 0) {
                  width_type = "60%";
                  width_asteris = "10%";
                }
                if (val_type.type === "RE-OUT SOA" && val_type.count === 0) {
                  width_type = "60%";
                  width_asteris = "10%";
                }
              });
              if (val.count !== 0)
                return (
                  <div
                    key={index}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography
                      style={{
                        color: "#fff",
                        width: width_type,
                        fontSize: 13.5,
                        fontWeight: "bold",
                      }}
                    >
                      {val.type}{" "}
                    </Typography>
                    <Typography
                      style={{
                        color: "#fff",
                        width: width_asteris,
                        fontSize: 13.5,
                        fontWeight: "bold",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      style={{
                        color: "#fff",
                        width: "30%",
                        fontSize: 13.5,
                        fontWeight: "bold",
                      }}
                    >
                      {formatNumber(val.count)}
                    </Typography>
                  </div>
                );
            })}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Typography
                style={{
                  color: "#fff",
                  width: "45%",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Total{" "}
              </Typography>
              <Typography
                style={{
                  color: "#fff",
                  width: "20%",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                :
              </Typography>
              <Typography
                style={{
                  color: "#fff",
                  width: "30%",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {formatNumber(
                  delivery_type.reduce((count, val) => {
                    count += parseFloat(val.count);
                    return count;
                  }, 0)
                )}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* Graph End */}
      {/* Fieldman List Start */}
      {fieldman_list ? (
        <div>
          <div
            className={classes.dashboards}
            style={{
              height: 552,
              width: 580,
              left: matches ? 0 : 505,
              margin: 18,
              top: matches ? 648 : 98,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 15 }}>
                    Choose Fieldman
                  </Typography>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      style={{
                        fontSize: "0.8125rem",
                        backgroundColor: "rgba(6,86,147)",
                        color: "white",
                        marginLeft: 10,
                      }}
                      onClick={() => summary_accom_function(true)}
                    >
                      Summary
                    </Button>

                    <ExcelFile
                      filename={
                        "Accomplishments" +
                        "-" +
                        branch_name +
                        " " +
                        moment(new Date(date_start)).format("YYYY-MM-DD")
                      }
                      element={
                        <Button
                        size="small"
                          style={{
                            fontSize: "0.8125rem",
                            backgroundColor: "rgba(6,86,147)",
                            color: "white",
                            marginLeft: 10,
                          }}
                          endIcon={<GetAppIcon style={{ color: "#fff" }} />}
                        >
                          Download
                        </Button>
                      }
                    >
                      <ExcelSheet data={excelFile} name="Accomplishments">
                        <ExcelColumn label="Emp ID" value="user_id" />
                        <ExcelColumn label="Name" value="name" />
                        <ExcelColumn label="Date and Time" value="date" />
                        <ExcelColumn label="First Accom" value="first" />
                        <ExcelColumn label="Last Accom" value="last" />
                      </ExcelSheet>
                    </ExcelFile>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      zIndex: 2,
                      right: 5,
                      top: 4,
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setFieldman_list(!fieldman_list);
                      }}
                      aria-label="delete"
                    >
                      <CloseIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                  <Typography style={{fontSize:18,fontWeight:'bold'}}>
                    Validation : {
                      totalValidation()
                    }
                  </Typography>
                </Grid>
                <Scrollbars style={{ height: 432, paddingTop: 10 }}>
                  {fieldman_map.map((row, key) => {
                    let timeout = "";
                    let hours = 0;
                    let first_meter = "-- : -- --";
                    let last_meter = "-- : -- --";
                    let first_battery = 0;
                    let end_battery = 0;
                    let countValidation = 0;
                    let percent = 0;
                    let countInvalid = 0;
                    let number = []
                    if (row.jo_accom_list.length !== 0) {
                      let trackAccom2 = row.jo_accom_list;
                    console.log(row.jo_accom_list)


                     trackAccom2.forEach((val,index)=>{
                        if(String(val.validator_remarks).toUpperCase() === "INVALID" || String(val.validator_remarks).toUpperCase() === "VALID" ){
                          countValidation++
                          number.push(index)
                        } 
                        if(val.validator_remarks === 'INVALID' ){
                          countInvalid++
                        }
                      },0)
                    console.log(number)

                      percent = parseInt((trackAccom2.length) * (map_reducer.count_validation_logs/100));
                      if(trackAccom2.length <= 50){
                        percent = trackAccom2.length
                      }
                      if(percent < 50){
                        if(trackAccom2.length > 50){
                          percent = 50
                        }
                      }
                      let timeout = row.jo_accom_list[0];
                      first_meter = moment(trackAccom2[0].date_accom).format(
                        "hh:mm A"
                      );
                      last_meter = moment(
                        trackAccom2[trackAccom2.length - 1].date_accom
                      ).format("hh:mm A");
                      let new_battery_end = trackAccom2[trackAccom2.length - 1].battery
                      end_battery = String(new_battery_end).replace('%','');
                      let new_battery_first = trackAccom2[0].battery
                      first_battery = String(new_battery_first).replace('%','');
                      row.attendance.map((val, index) => {
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
                      });
                    }
                    let assign = 0;
                    let bulk = 0;
                    let bulk2 = -10;
                    let prev_coordinates = "";
                    let bulk_val = false;
                    let bulk_data = [];
                    let bulk_data_new = [];
                    let jo_rescue = [];
                    let new_batch_count = [];
                    let jo_accom_list_count = row.jo_accom_list.length;
                    row.batch.forEach((val, index_batch) => {
                      if (val.jo_rescue !== "") {
                        jo_rescue = JSON.parse(val.jo_rescue);
                      }
                      assign += parseInt(val.jo_count);
                      let assign_jo_count = parseInt(val.jo_count);
                      if (jo_accom_list_count < 0) {
                        jo_accom_list_count = 0;
                      }
                      let new_jo_accom_list_count = jo_accom_list_count
                      if(jo_accom_list_count > assign_jo_count && (index_batch < (row.batch.length-1))){
                        new_jo_accom_list_count = assign_jo_count
                      }
                      new_batch_count.push({
                        assigned: assign_jo_count,
                        accom: new_jo_accom_list_count,
                      });
                      jo_accom_list_count -= assign_jo_count;
                      // if (val.jo_rescue !== "") {
                      //   jo_rescue = JSON.parse(val.jo_rescue);
                      // }
                      // assign += parseInt(val.jo_count);
                      // let assign_jo_count = parseInt(val.jo_count);
                      // let jo_per_batch = 0;
                      
                      // if (index_batch + 1 === row.batch.length) {
                      //   jo_per_batch = jo_accom_list_count;
                      //   new_batch_count.push({
                      //     assigned: assign_jo_count,
                      //     accom: jo_per_batch,
                      //   });
                      // } else {
                      //   if (jo_accom_list_count >= assign_jo_count) {
                      //     jo_accom_list_count -= assign_jo_count;
                      //     new_batch_count.push({
                      //       assigned: assign_jo_count,
                      //       accom: assign_jo_count,
                      //     });
                      //   } else {
                      //     new_batch_count.push({
                      //       assigned: assign_jo_count,
                      //       accom: jo_accom_list_count,
                      //     });
                      //   }
                      // }
                    });
                    var latlong = "";
                    var splitlatlng = "";
                    var lat = "";
                    var lng = "";
                    var complete_name = "";
                    let upload_count = 0;
                    row.jo_accom_list.map((val) => {
                      if (
                        val.accom_images !== "" &&
                        val.accom_images !== null
                      ) {
                        upload_count++;
                      }
                      if (val.fetched_coordinates === prev_coordinates) {
                        bulk++;
                        bulk_data.push(val);

                        // console.log(val)
                        // if (bulk > 4) {
                        // bulk_data.push(val)

                        // }
                        // if(bulk > 4){
                        // bulk_data_new.push(val);
                        // }
                      } else {
                        if (bulk > 4) {
                          bulk2 += bulk;
                          bulk_data.map((bulkdata1, index1) => {
                            // if (index1 === 0) {
                            bulkdata1["bulk"] = bulk;
                            bulkdata1["bulk_data"] = bulk_data;
                            bulk_data_new.push(bulkdata1);
                            // }
                            latlong = String(bulkdata1.fetched_coordinates);
                            splitlatlng = latlong.split(",");
                            lat = splitlatlng[0];
                            lng = splitlatlng[1];
                          });
                          bulk_val = true;
                        }
                        bulk = 0;
                        bulk_data = [];
                      }
                      prev_coordinates = val.fetched_coordinates;
                    });

                    if (bulk > 0) {
                      bulk2 += bulk;
                      bulk_data.map((bulkdata1, index1) => {
                        // if (index1 === 0) {
                        bulkdata1["bulk"] = bulk;
                        bulkdata1["bulk_data"] = bulk_data;
                        bulk_data_new.push(bulkdata1);
                        // }
                      });
                    }
                    if (bulk2 < 0) {
                      bulk2 = 0;
                    }

                    let width = 0;

                    if (isNaN(row.jo_accom_list.length / assign)) {
                    } else {
                      width = row.jo_accom_list.length / assign;
                    }
                    if (bulk2 > 0) {
                      bulk2 += 10;
                    }
                    let late_val = false;
                    if (row.attendance.length !== 0) {
                      if (
                        moment(row.attendance[0].date_added).format("LT") >
                        moment("2021-01-01 " + row.day_sched.attn_in).format(
                          "LT"
                        )
                      ) {
                        late_val = true;
                      }
                    }
                    let textColor = "#fff";
                    let statusUser = "";
                    if (parseInt(row.user_delete_id) === 1) {
                      textColor = "#e74c3c";
                      statusUser = " - Inactive";
                    }

                    return (
                      <>
                        <div
                          style={{
                            width: "100%",
                            padding: 10,
                            cursor: "pointer",
                          }}
                          type="button"
                          onClick={() => {
                            onTrackAccomplishments(
                              row.user_pic,
                              row.user_id,
                              date_start,
                              row.completename,
                              assign,
                              row.attendance.length,
                              row.attendance,
                              row,
                              bulk_data_new,
                              ""
                            );
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ width: "10%" }}>
                              <div style={{ position: "relative" }}>
                                <img
                                  alt="picture"
                                  onError={(e) => {
                                    e.target.src = UserImage;
                                  }}
                                  src={
                                    row.user_pic === ""
                                      ? UserImage
                                      : "http://images.workflow.gzonetechph.com/pockethr/profilepic/" +
                                        row.user_pic
                                  }
                                  style={{
                                    position: "absolute",
                                    filter:
                                      assign > 0
                                        ? undefined
                                        : "grayscale(100%)",
                                    width: 60,
                                    height: 60,
                                    margin: "auto",
                                    borderRadius: 60 / 2,
                                  }}
                                />
                                {jo_rescue.map((val2, index) => {
                                  return (
                                    <img
                                      onError={(e) => {
                                        e.target.src = UserImage;
                                      }}
                                      alt="picture"
                                      src={
                                        val2.pic === ""
                                          ? UserImage
                                          : "http://images.workflow.gzonetechph.com/pockethr/profilepic/" +
                                            val2.pic
                                      }
                                      style={{
                                        position: "absolute",
                                        top: 6,
                                        left: 12,
                                        filter:
                                          assign > 0
                                            ? undefined
                                            : "grayscale(100%)",
                                        width: 60,
                                        height: 60,
                                        margin: "auto",
                                        borderRadius: 60 / 2,
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                            <div style={{ width: "60%", padding: 10 }}>
                              <div>
                                <Typography style={{ color: textColor }}>
                                  {row.completename !== null
                                    ? String(row.completename).toUpperCase() +
                                      statusUser
                                    : undefined}
                                </Typography>
                                <Typography style={{color:'#f6b93b'}}>{(row.user_jobposition !== "" ?String(row.user_jobposition).toUpperCase():undefined)+' - '+row.employee_status}</Typography>
                                {jo_rescue !== ""
                                  ? jo_rescue.map((val2, index) => {
                                      return (
                                        <Typography
                                          style={{ color: "#f39c12" }}
                                        >
                                          {val2.name}
                                        </Typography>
                                      );
                                    })
                                  : undefined}
                              </div>
                              <div style={{ marginTop: 15 }}>
                                {new_batch_count.map((batch_data) => {
                                  let bar = 0
                                  let assigned = 0

                                  if(batch_data.assigned === 0){
                                    bar = 0
                                  }else{
                                    bar = ((300 * batch_data.accom) / batch_data.assigned)
                                  }
                                  return (
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 5,
                                      }}
                                    >
                                      <div
                                        style={{
                                          position: "relative",
                                          width: 300,
                                          height: 15,
                                          marginBottom: 5,
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: 300,
                                            height: 15,
                                            background: "#fff",
                                            borderRadius: 5,
                                            position: "absolute",
                                          }}
                                        ></div>
                                        <div
                                          style={{
                                            width:
                                              bar > 300
                                                ? 300
                                                : bar,
                                            height: 15,
                                            background: "#3498db",
                                            borderRadius: 5,
                                            position: "absolute",
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div style={{}}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div>
                                  {upload_count > 0 &&
                                  (row.jo_accom_list.length < assign ||
                                    bulk2 > 0) ? (
                                    <div
                                      style={{
                                        zIndex: 999,
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        generateMemo(row.user_id);
                                      }}
                                    >
                                      <Tooltip title="Memo" placement="top">
                                        <PictureAsPdfIcon
                                          style={{
                                            fontSize: 26,
                                            marginRight: 5,
                                          }}
                                        />
                                      </Tooltip>
                                    </div>
                                  ) : undefined}
                                </div>

                                <HtmlTooltip2
                                  color={"#2f3640"}
                                  title={
                                    <React.Fragment>
                                      <Typography
                                        variant="p"
                                        style={{ fontSize: 15 }}
                                        color="inherit"
                                      >
                                        Contact No. : {row.user_mobile}
                                      </Typography>
                                      <div
                                        style={{
                                          borderStyle: "solid",
                                          borderWidth: 2,
                                          borderColor: "#dfe6e9",
                                          padding: 6,
                                        }}
                                      >
                                        <Typography
                                          variant="p"
                                          style={{
                                            marginTop: 12,
                                            fontSize: 15,
                                          }}
                                          color="inherit"
                                        >
                                          Attendance
                                        </Typography>
                                        <div style={{ padding: 10 }}>
                                          {row.attendance.map((val, index) => {
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
                                                  spacing={1}
                                                >
                                                  <Grid item xs={4} md={3}>
                                                    <Typography
                                                      variant="p"
                                                      style={{
                                                        fontSize: 15,
                                                      }}
                                                    >
                                                      {type}
                                                    </Typography>
                                                  </Grid>
                                                  <Grid item xs={2} md={2}>
                                                    <center>
                                                      <Typography
                                                        variant="p"
                                                        style={{
                                                          fontSize: 15,
                                                        }}
                                                      >
                                                        :
                                                      </Typography>
                                                    </center>
                                                  </Grid>
                                                  <Grid item xs={7} md={7}>
                                                    <Typography
                                                      variant="p"
                                                      style={{
                                                        fontSize: 15,
                                                      }}
                                                    >
                                                      {moment(
                                                        val.date_added
                                                      ).format("hh:mm A")}
                                                    </Typography>
                                                  </Grid>
                                                </Grid>
                                              );
                                          })}
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  }
                                >
                                  <AssignmentIndIcon
                                    style={{ fontSize: 26, marginRight: 5 }}
                                  />
                                </HtmlTooltip2>
                                <div
                                  style={{
                                    zIndex: 999,
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    getRecord(row.user_id, row);
                                  }}
                                >
                                  <Tooltip title="History" placement="top">
                                    <HistoryIcon
                                      style={{ fontSize: 26, marginRight: 5 }}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "row",
                                }}
                              >
                                <div
                                  style={{
                                    width: 15,
                                    height: 15,
                                    background:
                                      row.attendance.length > 0
                                        ? "#2ecc71"
                                        : "#fff",
                                    borderRadius: 15 / 2,
                                    marginRight: 10,
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: 15,
                                    height: 15,
                                    background: assign > 0 ? "#2ecc71" : "#fff",
                                    borderRadius: 15 / 2,
                                    marginRight: 10,
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: 15,
                                    height: 15,
                                    background:
                                      row.attendance.length > 1
                                        ? "#2ecc71"
                                        : "#fff",
                                    borderRadius: 15 / 2,
                                    marginRight: 10,
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: 15,
                                    height: 15,
                                    background:
                                      row.attendance.length > 2
                                        ? "#2ecc71"
                                        : "#fff",
                                    borderRadius: 15 / 2,
                                    marginRight: 10,
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: 15,
                                    height: 15,
                                    background:
                                      row.attendance.length > 3
                                        ? "#2ecc71"
                                        : "#fff",
                                    borderRadius: 15 / 2,
                                  }}
                                ></div>
                              </div>
                              <div style={{ marginTop: 5 }}>
                                {new_batch_count.map((batch_data) => {
                                  return (
                                    <Typography>
                                      ({batch_data.accom} of{" "}
                                      {batch_data.assigned})
                                    </Typography>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                            {assign > 0 ? (
                              <>
                                <Grid item xs={12}>
                                  <Grid
                                    container
                                    className={classes.whiteText}
                                    spacing={2}
                                  >
                                    <Grid item md={4}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        {row.attendance.length !== 0 ? (
                                          moment(
                                            row.attendance[0].date_added
                                          ).format("LT") >
                                          moment(
                                            "2021-01-01 " +
                                              row.day_sched.attn_in
                                          ).format("LT") ? (
                                            <CancelIcon
                                              style={{ color: "#e74c3c" }}
                                            />
                                          ) : (
                                            <CheckCircleIcon
                                              style={{ color: "#2ecc71" }}
                                            />
                                          )
                                        ) : undefined}

                                        <Typography>
                                          {row.attendance.length !== 0
                                            ? moment(
                                                row.attendance[0].date_added
                                              ).format("LT")
                                            : undefined}
                                        </Typography>
                                      </div>
                                    </Grid>
                                    <Grid item md={4}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        {row.jo_accom_list.length >= assign ? (
                                          <CheckCircleIcon
                                            style={{ color: "#2ecc71" }}
                                          />
                                        ) : (
                                          <CancelIcon
                                            style={{ color: "#e74c3c" }}
                                          />
                                        )}

                                        <Typography>Completeness</Typography>
                                      </div>
                                    </Grid>
                                    <Grid item md={4}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                        onClick={(e) => {
                                          // e.stopPropagation();
                                          // // console.log(bulk_data_new)
                                          // get_bulk(bulk_data_new)
                                          // setmapOption({ ...mapOption, lat: parseFloat(lat), lng: parseFloat(lng), zoom: 19 })
                                        }}
                                      >
                                        {bulk2 > 0 ? (
                                          <CancelIcon
                                            style={{ color: "#e74c3c" }}
                                          />
                                        ) : (
                                          <CheckCircleIcon
                                            style={{ color: "#2ecc71" }}
                                          />
                                        )}

                                        <Typography>
                                          {bulk2} Bulk Delivery
                                        </Typography>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: -10 }}>
                                  <Grid
                                    container
                                    className={classes.whiteText}
                                    spacing={2}
                                  >
                                    <Grid item md={4}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        {countInvalid > 0?
                                         <CancelIcon
                                         style={{ color: "#e74c3c" }}
                                       />:<CheckCircleIcon
                                          style={{ color: "#2ecc71" }}
                                        />
                                        }
                                        <Typography>Field Findings</Typography>
                                      </div>
                                    </Grid>
                                    <Grid item md={4}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <CheckCircleIcon
                                          style={{ color: "#2ecc71" }}
                                        />
                                        <Typography>Battery</Typography>
                                      </div>
                                    </Grid>
                                    <Grid item md={4}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        {row.jo_accom_list.length ===
                                        upload_count ? (
                                          <CheckCircleIcon
                                            style={{ color: "#2ecc71" }}
                                          />
                                        ) : (
                                          <CancelIcon
                                            style={{ color: "#e74c3c" }}
                                          />
                                        )}

                                        <Typography>
                                          {upload_count} Uploaded
                                        </Typography>
                                      </div>
                                    </Grid>
                                    <Grid item md={12}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <Typography
                                          style={{ fontWeight: "bold" }}
                                        >
                                          1st Meter : {hours}
                                        </Typography>
                                      </div>
                                    </Grid>
                                    <Grid item md={12}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <Typography
                                          style={{ fontWeight: "bold" }}
                                        >
                                          Battery :{" "}
                                          {"(" +
                                            first_battery+
                                            "%)" +
                                            " " +
                                            first_meter +
                                            " - " +
                                            "(" +
                                            end_battery+
                                            "%)" +
                                            " " +
                                            last_meter}
                                        </Typography>
                                      </div>
                                    </Grid>
                                    <Grid item md={12}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <Typography
                                          style={{ fontWeight: "bold",color:'#f6b93b'}}
                                        >
                                          Validation : {countValidation+' of '+percent}
                                        </Typography>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </>
                            ) : undefined}
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#2d3436",
                            height: 1.8,
                          }}
                        ></div>
                      </>
                    );
                  })}
                </Scrollbars>
              </Grid>
            </div>
          </div>
        </div>
      ) : undefined}
      {showGraph ? (
        <div>
          <div
            className={classes.dashboards}
            style={{
              height: 552,
              width: 620,
              left: 505,
              margin: 18,
              top: 98,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ paddingTop: 15, paddingBottom: 25 }}>
              <Typography
                style={{
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: "bold",
                  marginLeft: 15,
                }}
              >
                Job Order Per Hour
              </Typography>
              <div
                style={{ position: "absolute", zIndex: 2, right: 5, top: 4 }}
              >
                <IconButton
                  onClick={() => {
                    setShowGraph(false);
                  }}
                  aria-label="delete"
                >
                  <CloseIcon style={{ color: "#fff" }} />
                </IconButton>
              </div>
              <div>
                <Line
                  line_data={line_data2}
                  width={600}
                  height={260}
                  type={"ALL"}
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <Line
                  line_data={line_data2}
                  width={600}
                  height={260}
                  total_jo={total_jo}
                  type={"CUMMULATIVE"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : undefined}

      {/* Fieldman List End */}

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
                {/* <FormControl
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
                      return (
                        <MenuItem value={val}>
                          {val}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}
                <FormControl
                  className={classes.formControl}
                  style={{ width: "100%" }}
                  onClick={() => setState({ ...state, modal_employee: true })}
                >
                  <InputLabel shrink htmlFor="select-multiple-native">
                    Job Order
                  </InputLabel>
                  <Select
                  required
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={map_reducer.selected_jo}
                    // onChange={handleChange}

                    input={<Input />}
                    MenuProps={MenuProps}
                    readOnly
                  >
                    {map_reducer.jo_type.map((val, index) => (
                      <MenuItem
                        key={index}
                        value={val}
                        style={getStyles(val, map_reducer.selected_jo, theme)}
                      >
                        {val}
                      </MenuItem>
                    ))}
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
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.modal_employee}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          Select Job Order Type
        </DialogTitle>
        <DialogContent>
          <form>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} md={12}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <TextField size='small' id="outlined-basic" label="Search" style={{ width: '100%' }} onChange={searchDriver2} variant="outlined" />
                                        </div>
                                    </Grid> */}
                  <Grid item xs={12} md={12}>
                    <List component="nav" aria-label="main mailbox folders">
                      {/* <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={state.check_all}
                                                        onChange={(event) => { handleListItemClick('', '', 'ALL') }}
                                                        name="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label={'ALL'}
                                            /> */}
                      {map_reducer.jo_type.map((val, index) => {
                        let value = map_reducer.selected_jo.filter(
                          (data) => data == val
                        );
                        let check = false;
                        if (value.length != 0) {
                          check = true;
                        }
                        return (
                          <>
                            <Divider />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={check}
                                  onChange={(event) => {
                                    handleListItemClick(event, index, val);
                                  }}
                                  name="checkedB"
                                  color="primary"
                                />
                              }
                              label={val}
                            />
                          </>
                        );
                      })}
                      <Divider />
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setState({ ...state, modal_employee: false, searchDriver2: "" })
            }
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Grid container spacing={1}>
          <Grid>
            
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Dashboard;
