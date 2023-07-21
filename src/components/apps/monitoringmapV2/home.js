import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  TextField,
  Card,
  CardContent,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Checkbox,
} from "@material-ui/core";
import moment from "moment";
import Map from "./monitoringMap";
import "./css/home.css";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Dashbboard from "./initial/dashboard";
import FieldmanList from "./initial/fieldman_list";
import { getData, serverImageMeter } from "../../api/api";
import Line from "./initial/charts/line";
import Line2 from "./initial/charts/line2";
import BarSingleFieldman from "./initial/charts/bar_single_fieldman";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import Bar from "./initial/charts/bar";
import FieldmanDetails from "./fieldman_details";
import BarChartIcon from "@material-ui/icons/BarChart";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Carousel from "react-material-ui-carousel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Mapa from "../map/map2";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ValidationFieldman from "./validation/validation_fieldman";
import PDF from "../mapMonitoring/pdf";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FieldmanHistory from "./fieldman_history/index";
import AverageLineGraph from "./initial/charts/average_line";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
let width = window.innerWidth;
let height_window = window.innerHeight;
const useStyles = makeStyles({
  cssLabel: {
    color: "#fff !important",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#ffff !important",
    color: "#ffff",
  },
});
let trackAccom = [];
let refreshMap = false;
let refreshMapFDetails = false;
let playButton = false;
let clearCLuster = false;
let markerCluster = [];
const MapComponents = React.memo(
  ({
    childRef,
    trackAccomParam,
    isOpen,
    onToggleOpen,
    refreshMap,
    mapOption,
    clearTimeout,
    fieldmanDeatilsOpen,
    new_pickIndex,
    trackAccomSpan,
    pathCoordinates,
    midPoint,
    openMapSelectedFieldman,
  }) => {
    return (
      <Map
        ref={childRef}
        trackAccom={trackAccomParam}
        isOpen={isOpen}
        onToggleOpen={onToggleOpen}
        refresh={refreshMap}
        clearCLuster={clearCLuster}
        playButton={playButton}
        mapOption={mapOption}
        clearTimeout={clearTimeout}
        fieldmanDeatilsOpen={fieldmanDeatilsOpen}
        new_pickIndex={new_pickIndex}
        trackAccomSpan={trackAccomSpan}
        pathCoordinates={pathCoordinates}
        midPoint={midPoint}
        openMapSelectedFieldman={openMapSelectedFieldman}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.refreshMap === nextProps.refreshMap) {
      return true;
    } else {
      return false;
    }
  }
);

export default function Home() {
  const childRef = React.useRef();
  const childRefValidation = React.useRef();
  const childRefDashboard = React.useRef();
  const childRefFieldmanDetails = React.useRef();
  const childRefFieldmanList = React.useRef();
  const dispatch = useDispatch();
  const map_reducer = useSelector((state) => state.map_reducer);
  const classes = useStyles();
  const home_reducer = useSelector((state) => state.home_reducer);
  const timerRef = React.useRef(null);
  const speeds = React.useRef(1);
  const matches = useMediaQuery("(min-width:600px)");

  const [mapOption, setmapOption] = React.useState({
    zoom: 12,
    lat: 13.7565,
    lng: 121.0583,
  });
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    gridSize: 12,
    fieldman_map: [],
    lineHours: [],
    lineShow: false,
    total_jo: 0,
    date: new Date(),
    fieldman_details: [],
    // Fieldman Details Accom
    fieldman_delivery_type: [],
    attendance: [],
    line: [],
    showGraph: false,
    showProfile: "none",
    trackAccom: [],
    trackAccomMasterList: [],
    selectedDetails: [],
    new_pickIndex: 0,
    openModalDetails: false,
    degree: 0,
    fieldman_id: "",
    field_findings: [],
    refreshOnClickFieldman: false,
    new_trackAccom: [],
    match_new_trackAccom: [],
    duration: 5,
    index_randomJOToValidate: [],
    validation_priviledge: "",
    leftPageSelect: false,
    pathCoordinates: [],
    trackAccomSpan: [],
    midPoint: [],
    openPDF: false,
    images_base_64: [],
    logo: "",
    record_single_data: [],
    record_start_date: new Date(),
    record_end_date: new Date(),
    record_user_id: "",
    day_sched: [],
    fieldman_user_jobposition: "",
    refreshHistory: false,
    openRecord: false,
    attendance_history: [
      // {
      //   type: 'PRESENT',
      //   value: [],
      //   color: '#487eb0'
      // },
      {
        type: "ABSENT",
        value: [],
        color: "#e74c3c",
      },
    ],
    //Google Map
    refreshMap: false,
    pause: false,
    display_AccomPlayback: [],
    count_val: 0,
    clearCLuster: false,
    excelFile: [],
    excel_invalid_data: [],
    Selected_branch: "",
    Selectedcompany: "",
    date_selected_fieldman: "",
    single_history: "",
    actual_reading: [],
    comparison: [],
    running_average: [],
    display_running_accom: true,
    display_running_assign: true,
    display_ave_assign: true,
    display_ave_accom: true,
    display_valid: true,
    display_invalid: true,
    get_lack_of_time: [],
    get_lack_of_time_list: [],
  });
  const [isOpen, setIsOpen] = React.useState([]);
  const [loadingImage, setLoadingImage] = React.useState(true);
  const counter = React.useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    // if (counter.current >= urls.length) {
    setLoadingImage(false);
    // }
  };
  function openHome() {
    if (width < 600) {
      document.getElementById("dashboard").style.cssText =
        "transition: 0.5s;left:0;width:100%";
      document.getElementById("line-graph").style.cssText =
        "transition: 0.5s;left:-100%;";
    } else {
      document.getElementById("dashboard").style.cssText =
        "transition: 0.5s;left:0;";
      // document.getElementById("fieldman-list").style.cssText =
      //   "transition: 0.5s;left:-38%;";
      // document.getElementById("line-graph").style.cssText =
      //   "transition: 0.5s;left:-38%;";
      document.getElementById("fieldmanDeatils-slider-left").style.cssText =
        "transition: 0.5s;left:-50%;";
      document.getElementById("fieldmanDeatils-open").style.cssText =
        "transition: 0.5s;left:-50%;";
    }

    setState((prev) => ({ ...prev, gridSize: 12, showProfile: "none" }));
  }
  function closeHome() {
    document.getElementById("dashboard").style.cssText =
      "transition: 0.5s;left:-50%;";
    document.getElementById("fieldman-list").style.cssText =
      "transition: 0.5s;left:-38%;";
    document.getElementById("line-graph").style.cssText =
      "transition: 0.5s;left:-50%;";
    setTimeout(() => {
      setState((prev) => ({ ...prev, gridSize: 12, lineShow: false }));
    }, 1000);
  }
  function onClickFieldman(data, date, initial, get_lack_of_time) {
    document.getElementById("line-graph").style.cssText =
      "transition: 0.5s;left:-50%;";
    if (!initial) {
      if (width < 600) {
        document.getElementById("fieldman-list").style.cssText =
          "transition: 0.5s;left:0; width:100%";
        document.getElementById("dashboard").style.cssText =
          "transition: 0.5s;left:-100%;width:100%";
      } else {
        document.getElementById("fieldman-list").style.cssText =
          "transition: 0.5s;left:50%;";
      }
    }

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        gridSize: 8,
        fieldman_map: data,
        lineShow: false,
        date,
        get_lack_of_time: get_lack_of_time,
      }));
    }, 100);
  }
  React.useEffect(() => {
    setTimeout(() => {
      openHome();
      getBranches();
    }, 400);
  }, []);

  async function getBranches(details) {
    try {
      dispatch_data("loading_map", true);
      let res = await getData("HumanResource/getHandleBranch", {
        user_id: localStorage.getItem("u"),
      });
      let selectedData = [];
      let match_branch = [];
      let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph");
      let onSelectDataLocalStorage = localStorage.getItem(
        "onSelectSingleDateGraph"
      );
      if (onSelectDataLocalStorage !== null) {
        onSelectData = onSelectDataLocalStorage;
      }
      if (onSelectData === null) {
        match_branch = res.response.filter(
          (val, index) =>
            parseInt(val.company_id) === 6 &&
            val.branch_field_work !== "" &&
            val.branch_field_work !== null
        );
      } else {
        let bid = JSON.parse(onSelectData);
        match_branch = res.response.filter(
          (val, index) =>
            parseInt(val.company_id) === parseInt(bid.company_id) &&
            val.branch_field_work !== "" &&
            val.branch_field_work !== null
        );
      }

      let company = [];
      res.response.map((item, index) => {
        let match = false;
        company.map((val) => {
          if (val.company_name == item.company_name) {
            match = true;
          }
        });
        if (!match) {
          company.push({
            company_name: item.company_name,
            company_id: item.company_id,
          });
        }
      });

      let branch_id = "";
      let company_id = "";
      let branch_name = "";
      let jo_type_val = [];
      let jo_type_data = [];
      let job_position = "";
      match_branch.sort(function (a, b) {
        return a["branch_name"].localeCompare(b["branch_name"]);
      });
      if (onSelectData === null) {
        if (match_branch.length > 0) {
          match_branch.forEach((val, index) => {
            if (val.branch_field_work !== "") {
              if (branch_id == "") {
                branch_id = val.branch_id;
                company_id = 6;
                branch_name = val.branch_name;
                let jo_type = JSON.parse(val.branch_field_work);
                jo_type_val = [jo_type[0]];
                jo_type_data = jo_type;
                if (val.branch_field_personnel !== "") {
                  let user_pos = JSON.parse(val.branch_field_personnel);
                  job_position = user_pos[0];
                }
              }
            }
          });
        } else {
          res.response.forEach((val, index) => {
            if (
              val.branch_field_work !== "" &&
              val.branch_field_work !== null
            ) {
              if (branch_id == "") {
                branch_id = val.branch_id;
                company_id = parseInt(val.company_id);
                branch_name = val.branch_name;
                let jo_type = JSON.parse(val.branch_field_work);
                jo_type_val = [jo_type[0]];
                jo_type_data = jo_type;
                if (val.branch_field_personnel !== "") {
                  let user_pos = JSON.parse(val.branch_field_personnel);
                  job_position = user_pos[0];
                }
              }
            }
          });
        }
        let data = {
          parameter: "branch_id",
          selection: [branch_id],
          from: moment(new Date()).format("YYYY-MM-DD"),
          to: moment(new Date()).format("YYYY-MM-DD"),
          company_id: company_id,
          jo_type: jo_type_val,
        };
        sessionStorage.setItem("onSelectSingleDateGraph", JSON.stringify(data));
      } else {
        selectedData = JSON.parse(onSelectData);
        let data_match = match_branch.filter(
          (val) =>
            parseInt(val.branch_id) === parseInt(selectedData.selection[0])
        );
        if (data_match.length > 0) {
          jo_type_val = selectedData.jo_type;
          let jo_type = JSON.parse(data_match[0].branch_field_work);
          jo_type_data = jo_type;
          if (data_match[0].branch_field_personnel !== "") {
            let user_pos = JSON.parse(data_match[0].branch_field_personnel);
            job_position = user_pos[0];
          }
        }
        sessionStorage.setItem(
          "onSelectSingleDateGraph",
          JSON.stringify(selectedData)
        );
      }
      dispatch({
        type: "JobOrderType_position",
        job_position: job_position,
        jo_type: jo_type_data,
        jo_type_val: jo_type_val,
      });
      setTimeout(() => {
        childRefDashboard.current.get_nitial_data();
      }, 500);
      // dispatch_data("JobOrderType", jo_type_data);
      // map_reducer.job_position = job_position
      // map_reducer.jo_type = jo_type_data
      // map_reducer.selected_jo = jo_type_val

      dispatch({
        type: "onChangeHomeReducer",
        data: {
          handleBranch: res.response,
          company_name: company,
          SelectedBranches: match_branch,
        },
      });
      setState((prev) => ({
        ...prev,
        validation_priviledge: res.validation[0].validation_priviledge,
      }));

      // dispatch_data("loading_map", false);
    } catch (error) {
      console.log(error);
      let res = String(error).includes("Network Error");
      if (res) {
        if (state.countRequest < 5) {
          setTimeout(() => {
            getBranches(details);
          }, 2000);
          setState({ ...state, countRequest: state.countRequest++ });
        } else {
          // dispatch_data("loading_map", false);
          alert("Please check your internet connection.");
        }
      } else {
        // dispatch_data("loading_map", false);
        alert("Something went wrong.");
      }
    }
  }
  const openLineHours = (data, total_jo) => {
    document.getElementById("fieldman-list").style.cssText =
      "transition: 0.5s;left:-38%;";
    document.getElementById("line-graph").style.cssText =
      "transition: 0.5s;left:50%;";
    setState((prev) => ({
      ...prev,
      lineHours: data,
      lineShow: true,
      total_jo,
    }));
  };
  const dash_click = (e, type) => {
    e.stopPropagation();
    document.getElementById("line-graph").style.cssText =
      "transition: 0.5s;left:-50%;";
    document.getElementById("fieldman-list").style.cssText =
      "transition: 0.5s;left:50%;";
    setState({
      ...state,
      fieldman_map: type,
    });
  };
  const onShow = (data) => {
    closeHome();
    trackAccom = data.trackAccom;
    let new_attendance = [];
    for (let index = 0; index < data.attendance.length; index++) {
      if (new_attendance.length == 0) {
        if (data.attendance[index].att_type === "Time-in") {
          new_attendance.push(data.attendance[index]);
        }
      } else {
        if (
          new_attendance[new_attendance.length - 1].att_type ===
          data.attendance[index].att_type
        ) {
          let type = "Time-in";
          if (data.attendance[index].att_type === "Time-in") {
            type = "Time-out";
          }
          new_attendance.push({
            att_class: "Office",
            att_type: type,
            date_added: "--:--",
            user_id: data.attendance[index].user_id,
          });
          new_attendance.push(data.attendance[index]);
        } else {
          new_attendance.push(data.attendance[index]);
        }
      }
    }
    setState((prev) => ({
      ...prev,
      fieldman_delivery_type: data.fieldman_delivery_type,
      attendance: new_attendance,
      line: data.line,
      trackAccomMasterList: data.trackAccom,
      trackAccom: data.trackAccom,
      fieldman_details: [data],
      fieldman_id: data.single_user_id,
      date_selected_fieldman: moment(data.date_history).format("LL"),
      single_history: data.singele_history,
      get_lack_of_time_list: data.get_lack_of_time,
    }));
    setTimeout(() => {
      document.getElementById("fieldmanDeatils-slider-left").style.cssText =
        "transition: 0.5s;left:0%;";
      getfield_findings(data.trackAccom);
    }, 100);
  };
  async function getfield_findings(trackAccom) {
    try {
      let onSelectDataLocalStorage = sessionStorage.getItem(
        "onSelectSingleDateGraph"
      );
      let type = "Delivery";

      if (onSelectDataLocalStorage !== null) {
        let new_type = JSON.parse(onSelectDataLocalStorage).jo_type;
        if (new_type.length > 0) {
          if (new_type[0] === "Audit Reading") {
            type = new_type[0];
          }
        }
      }

      let data = {
        user_id: localStorage.getItem("u"),
        type: type,
        status: "",
        branch_id: map_reducer.branch_id,
        company_id: map_reducer.company_id,
      };
      let res = await getData("tracking/getfield_findings", data);
      let stringArray = JSON.stringify(trackAccom);
      let new_track = JSON.parse(stringArray).reverse();
      getDurationInterval(new_track, res.field_findings, 5, trackAccom);
    } catch (error) {}
  }
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
  const getDurationInterval = (data, field_findings, duration, trackAccom) => {
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
    let percent = parseInt(
      trackAccom.length * (map_reducer.count_validation_logs / 100)
    );
    if (trackAccom.length <= 50) {
      percent = trackAccom.length;
    }
    if (percent < 50) {
      if (trackAccom.length > 50) {
        percent = 50;
      }
    }
    let result = [];
    let randomArray = [];
    let user_id = "";
    let date = "";
    let branch_id = "";
    let accom_jo_type = "";
    let interval = parseInt(trackAccom.length / percent);
    let interval_array = [];

    for (let index = 0; index < percent; index++) {
      const index_val = interval * index;
      interval_array.push(index_val);
    }
    refreshMap = !refreshMap;
    refreshMapFDetails = !refreshMapFDetails;

    setState((prev) => ({
      ...prev,
      field_findings: field_findings,
      new_trackAccom: new_trackAccom_data,
      match_new_trackAccom: new_trackAccom_data,
      duration: duration,
      index_randomJOToValidate: interval_array,
      refreshOnClickFieldman: !state.refreshOnClickFieldman,
      showGraph: true,
      showProfile: "contents",
    }));

    // setState((prev) => ({
    //   ...prev,
    //   showGraph: true,
    //   showProfile: "contents",
    // }));
  };
  const onChecked = (e, value) => {
    setState((prev) => ({ ...prev, [e.target.name]: value }));
  };
  const HomeDashboard = () => {
    return (
      <>
        <div id="line-graph" className="line-graph">
          <div
            style={{ overflowY: "auto", height: "99%", overflowX: "hidden" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                {state.lineShow ? (
                  <div
                    style={{
                      marginTop: 60,
                      paddingTop: 20,
                    }}
                  >
                    <Card elevation={4} className="card-line">
                      <CardContent>
                        <Typography
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          JOB ORDER PER HOUR
                        </Typography>
                        <Line
                          line_data={state.lineHours}
                          width={510}
                          height={260}
                          type={"ALL"}
                        />
                      </CardContent>
                    </Card>
                  </div>
                ) : undefined}
              </Grid>
              <Grid item xs={12} md={12}>
                {state.lineShow ? (
                  <div
                    style={{
                      // marginTop: 10,
                      paddingTop: 20,
                    }}
                  >
                    <Card elevation={4} className="card-line">
                      <CardContent>
                        <Typography
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          CUMMULATIVE JOB ORDER
                        </Typography>
                        <Line
                          line_data={state.lineHours}
                          width={510}
                          height={260}
                          total_jo={state.total_jo}
                          type={"CUMMULATIVE"}
                        />
                      </CardContent>
                    </Card>
                  </div>
                ) : undefined}
              </Grid>
              <Grid item xs={12} md={12}>
                {state.lineShow ? (
                  <div
                    style={{
                      // marginTop: 10,
                      // marginTop: 60,
                      paddingTop: 20,
                    }}
                  >
                    <Card elevation={4} className="card-line">
                      <CardContent>
                        <Typography
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          ACTIVE FIELDMAN PER HOUR
                        </Typography>
                        <Bar line_data={state.lineHours} />
                      </CardContent>
                    </Card>
                  </div>
                ) : undefined}
              </Grid>
              <Grid item xs={12} md={12}>
                {state.running_average.length > 0 ? (
                  <div
                    style={{
                      marginTop: 40,
                      paddingTop: 20,
                    }}
                  >
                    <Card elevation={4} className="card-line">
                      <CardContent>
                        <Typography
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          ASSIGN AND ACCOMPLISHMENT AVERAGE
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={12} md={3}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Checkbox
                                onChange={(e) =>
                                  onChecked(e, !state.display_running_assign)
                                }
                                name="display_running_assign"
                                checked={state.display_running_assign}
                                style={{ color: "#9b59b6" }}
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                              {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#9b59b6',marginRight:5 }} /> */}
                              <Typography
                                style={{ fontSize: 13, color: "#fff" }}
                              >
                                Running Assign
                              </Typography>
                            </div>
                          </Grid>
                          <Grid xs={12} md={3}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Checkbox
                                onChange={(e) =>
                                  onChecked(e, !state.display_running_accom)
                                }
                                name="display_running_accom"
                                checked={state.display_running_accom}
                                style={{ color: "#1e9651" }}
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                              {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#1e9651',marginRight:5 }} /> */}
                              <Typography
                                style={{ fontSize: 13, color: "#fff" }}
                              >
                                Running Accom
                              </Typography>
                            </div>
                          </Grid>
                          <Grid xs={12} md={3}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Checkbox
                                onChange={(e) =>
                                  onChecked(e, !state.display_ave_assign)
                                }
                                name="display_ave_assign"
                                checked={state.display_ave_assign}
                                style={{ color: "#3498db" }}
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                              {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#3498db',marginRight:5 }} /> */}
                              <Typography
                                style={{ fontSize: 13, color: "#fff" }}
                              >
                                Ave. Assign
                              </Typography>
                            </div>
                          </Grid>
                          <Grid xs={12} md={3}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Checkbox
                                onChange={(e) =>
                                  onChecked(e, !state.display_ave_accom)
                                }
                                name="display_ave_accom"
                                checked={state.display_ave_accom}
                                style={{ color: "#f1c40f" }}
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                              {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#1e9651',marginRight:5 }} /> */}
                              <Typography
                                style={{ fontSize: 13, color: "#fff" }}
                              >
                                Ave. Accom
                              </Typography>
                            </div>
                          </Grid>
                          <Grid xs={12} md={3} justify="flex-start">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Checkbox
                                onChange={(e) =>
                                  onChecked(e, !state.display_valid)
                                }
                                name="display_valid"
                                checked={state.display_valid}
                                style={{ color: "#009432" }}
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                              {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#009432',marginRight:5 }} /> */}
                              <Typography
                                style={{ fontSize: 13, color: "#fff" }}
                              >
                                Valid
                              </Typography>
                            </div>
                          </Grid>
                          <Grid xs={12} md={3} justify="flex-start">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Checkbox
                                onChange={(e) =>
                                  onChecked(e, !state.display_invalid)
                                }
                                name="display_invalid"
                                checked={state.display_invalid}
                                style={{ color: "#e74c3c" }}
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                              {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#e74c3c',marginRight:5 }} /> */}
                              <Typography
                                style={{ fontSize: 13, color: "#fff" }}
                              >
                                Invalid
                              </Typography>
                            </div>
                          </Grid>

                          {/* <Grid xs={12} md={3}>
                            <div style={{ display: 'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Checkbox
                                onChange={(e) => onChecked(e, !state.display_valid)}
                                name='display_valid'
                                checked={state.display_valid}
                                style={{ color: '#fff' }}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#f1c40f',marginRight:5 }} />
                              <Typography style={{ fontSize: 13, color: '#fff' }}>Valid</Typography>
                            </div>
                          </Grid>
                          <Grid xs={12} md={3}>
                            <div style={{ display: 'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Checkbox
                                onChange={(e) => onChecked(e, !state.display_invalid)}
                                name='display_invalid'
                                checked={state.display_invalid}
                                style={{ color: '#fff' }}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#f1c40f',marginRight:5 }} />
                              <Typography style={{ fontSize: 13, color: '#fff' }}>Invalid</Typography>
                            </div>
                          </Grid> */}
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid xs={12} md={12}>
                            <AverageLineGraph
                              line_data={state.running_average}
                              width={510}
                              height={160}
                              total_jo={state.total_jo}
                              state={state}
                              type={"ASSIGN AND ACCOMPLISHMENT AVERAGE"}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </div>
                ) : undefined}
              </Grid>
            </Grid>
            {/* <Grid container spacing={1}> */}

            {/* </Grid> */}
            {/* <Grid container spacing={1}>
             
            </Grid> */}
            {/* <Grid container spacing={1}>
              
         
            </Grid> */}
          </div>
        </div>
        <div id="fieldman-list" className="fieldman-list">
          <FieldmanList
            hideHistory={hideHistory}
            ref={childRefFieldmanList}
            fieldman_map={state.fieldman_map}
            date_start={state.date}
            onShow={onShow}
            getfield_findings={getfield_findings}
            refreshOnClickFieldman={() => {
              setState((prev) => ({
                ...prev,
                refreshOnClickFieldman: !state.refreshOnClickFieldman,
              }));
            }}
            resetTrackSpan={() => {
              clearCLuster = true;
              refreshMap = !refreshMap;
              setState((prev) => ({
                ...prev,
                trackAccomSpan: [],
                midPoint: [],
                pathCoordinates: [],
              }));
            }}
            open_summary={() => childRefDashboard.current.open_summary()}
            excelFile={state.excelFile}
            excel_invalid_data={state.excel_invalid_data}
            Selected_branch={state.Selected_branch}
            Selectedcompany={state.Selectedcompany}
            logo={state.logo}
            openFiedmanHistory={openFiedmanHistory}
            getRecord={getRecord}
            updateDashboard={(countChange) =>
              childRefDashboard.current.updateDashboard(countChange)
            }
            closemobile={() => {
              document.getElementById("dashboard").style.cssText =
                "transition: 0.5s;left:0%; width:100%";
              document.getElementById("fieldman-list").style.cssText =
                "transition: 0.5s;left:-100%;";
            }}
            get_lack_of_time={state.get_lack_of_time}
          />
        </div>
        <div className="dash-slider-button" id="dash-slider-button">
          <IconButton
            onClick={() => {
              if (width < 600) {
                document.getElementById("dash-slider-button").style.cssText =
                  "transition: 0.5s;left:-10%;";
                document.getElementById("dashboard").style.cssText =
                  "transition: 0.5s;left:0%; width:100%";
              } else {
                document.getElementById("dash-slider-button").style.cssText =
                  "transition: 0.5s;left:-10%;";
                document.getElementById("dashboard").style.cssText =
                  "transition: 0.5s;left:0%;";
              }

              // openLineHours(state.line_hours, state.total_jo);
            }}
            aria-label="delete"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              marginRight: 5,
              width: 33,
              height: 33,
            }}
          >
            <ArrowForwardIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
        <div id="dashboard" className="dash-slider">
          <Dashbboard
            fieldman_map={state.fieldman_map}
            ref={childRefDashboard}
            closeHome={() => {
              document.getElementById("dash-slider-button").style.cssText =
                "transition: 0.5s;left:.5%;";
              closeHome();
            }}
            onClickFieldman={onClickFieldman}
            gridSize={state.gridSize}
            openLineHours={openLineHours}
            dash_click={dash_click}
            onChangeLogo={(logo) => {
              setState((prev) => ({ ...prev, logo: logo }));
            }}
            refresh={() => {
              let onSelectData = sessionStorage.getItem(
                "onSelectSingleDateGraph"
              );
              let selectedData = JSON.parse(onSelectData);
              selectedData.to = moment(new Date()).format("YYYY-MM-DD");
              selectedData.from = moment(new Date()).format("YYYY-MM-DD");
              sessionStorage.setItem(
                "onSelectSingleDateGraph",
                JSON.stringify(selectedData)
              );
              getBranches();
            }}
            closeList={() => {
              document.getElementById("line-graph").style.cssText =
                "transition: 0.5s;left:-50%;";
              document.getElementById("fieldman-list").style.cssText =
                "transition: 0.5s;left:-50%;";
            }}
            onChangetrackAccom={(
              data,
              excelFile,
              excel_invalid_data,
              Selected_branch,
              Selectedcompany,
              logo
            ) => {
              trackAccom = data;
              refreshMap = !refreshMap;
              clearCLuster = true;
              setState((prev) => ({
                ...prev,
                excelFile: excelFile,
                excel_invalid_data: excel_invalid_data,
                Selected_branch: Selected_branch,
                Selectedcompany: Selectedcompany,
                logo,
              }));
            }}
            passRunningAverage={(average) => {
              document.getElementById("fieldman-list").style.cssText =
                "transition: 0.5s;left:-38%;";
              document.getElementById("line-graph").style.cssText =
                "transition: 0.5s;left:50%;";
              setState((prev) => ({
                ...prev,
                running_average: average,
                lineShow: false,
              }));
            }}
            onTrackAccomplishmentsRoute={(
              row,
              date_start,
              assign,
              bulk,
              type
            ) => {
              childRefFieldmanList.current.onTrackAccomplishmentsRoute(
                row,
                date_start,
                assign,
                bulk,
                type
              );
            }}

            // onClearCLuster={()=>{
            //   clearCLuster = true
            // }}
          />
        </div>
      </>
    );
  };
  function isset(ref) {
    return typeof ref !== "undefined";
  }
  const openIcon = () => {
    document.getElementById("fieldman-icon-transition").style.cssText =
      "background-color:red;border-radius:0;width: 100%";
  };
  async function getAccountNumberRecords(data) {
    try {
      let match = data.accom_jo_type.includes("Audit");
      if (match) {
        dispatch_data("loading_map", true);
        let reference = data.account_no;
        if (reference != "" && reference != null) {
          reference = data.meter_number;
        }
        let details = {
          branch_id: map_reducer.branch_id,
          account_number: reference,
          jo_id: data.jo_id,
          date: moment(data.date_accom).format("YYYY-MM-DD"),
        };
        // let res = await getData("aam/getAccountNumberRecords", details);
        let data_new = [];
        let comparison = [];
        // [data].forEach((val)=>{
        data_new.push({ type: "Fieldman", value: data.actual_fieldman_name });
        data_new.push({ type: "Reading", value: data.actual_reading });
        data_new.push({
          type: "Date Accomplished",
          value: data.actual_reading_date,
        });
        comparison.push({
          type: "Previous Reading",
          value: data.new_previous_reading,
        });
        comparison.push({ type: "Audit Reading", value: data.present_reading });
        comparison.push({ type: "Actual Reading", value: data.actual_reading });
        // })
        setState((prev) => ({
          ...prev,
          actual_reading: data_new,
          comparison: comparison,
        }));
        dispatch_data("loading_map", false);
      }
    } catch (error) {
      // alert("Request failed.");
      // dispatch_data("loading_map", false);
    }
  }
  const FieldmanDetailsComponent = () => {
    const handleClose = () => {
      childRefValidation.current.getAlert();
    };
    const handleOpen = (fetched_coordinates) => {
      let latlong = String(fetched_coordinates);
      let splitlatlng = latlong.split(",");
      let lat_data = splitlatlng[0];
      let lng_data = splitlatlng[1];
      dispatch_data("latitude", lat_data);
      dispatch_data("longitude", lng_data);
      setState((prev) => ({ ...prev, openModalDetails: true }));
    };
    return (
      <div>
        <div style={{ display: state.showProfile }}>
          <FieldmanDetails
            ref={childRefFieldmanDetails}
            // getfield_findings={getfield_findings}
            fieldman_details={state.fieldman_details}
            trackAccom={trackAccom}
            refreshMap={refreshMapFDetails}
            playButton={playButton}
            onNext={onNext}
            refreshOnClickFieldman={state.refreshOnClickFieldman}
            state={state}
            getDurationInterval={getDurationInterval}
            setState={setState}
            onrefreshMapFDetails={(match_data) => {
              refreshMapFDetails = !refreshMapFDetails;
              setState((prev) => ({
                ...prev,
                match_new_trackAccom: match_data,
              }));
            }}
            onClick_list_Duration={(val, pathCoordinates, midPoint) => {
              document.getElementById(
                "fieldmanDeatils-slider-left"
              ).style.cssText = "transition: 0.5s;left:-50%;";
              document.getElementById("fieldmanDeatils-open").style.cssText =
                "transition: 0.5s;left:-50%;";
              setmapOption({
                ...mapOption,
                lat: pathCoordinates[0].lat,
                lng: pathCoordinates[0].lng,
              });
              refreshMap = !refreshMap;
              clearCLuster = true;
              setState({
                ...state,
                trackAccomSpan: val,
                // leftPageSelect: !state.leftPageSelect,
                pathCoordinates: pathCoordinates,
                midPoint: midPoint,
              });
            }}
            resetTrackSpan={() => {
              clearCLuster = true;
              refreshMap = !refreshMap;
              setState((prev) => ({
                ...prev,
                trackAccomSpan: [],
                midPoint: [],
                pathCoordinates: [],
              }));
            }}
            resetSelected={() => {
              setState((prev) => ({ ...prev, selectedDetails: [] }));
            }}
            get_lack_of_time_list={state.get_lack_of_time_list}
          />
        </div>
        <div
          id="fieldmanDeatils-slider-left"
          className="fieldmanDeatils-slider-left"
        >
          <div
            style={{ overflowY: "auto", maxHeight: "98%", overflowX: "hidden" }}
          >
            <div className="card-color-delivery-type-fieldman">
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 60,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {state.single_history === "History" ? (
                      <IconButton
                        onClick={() => {
                          removeFielmanMarker();
                          document.getElementById(
                            "fieldmanHistory-slider-left"
                          ).style.cssText = "transition: 0.5s;left:0";
                          document.getElementById(
                            "fieldmanDeatils-slider-left"
                          ).style.cssText = "transition: 0.5s;left:-50%;";
                          document.getElementById(
                            "fieldmanDeatils-open"
                          ).style.cssText = "transition: 0.5s;left:-50%;";
                          setState((prev) => ({
                            ...prev,
                            gridSize: 12,
                            showProfile: "none",
                          }));
                        }}
                        aria-label="delete"
                        style={{
                          marginRight: 5,
                          backgroundColor: "#fff",
                          opacity: 0.7,
                          width: 35,
                          height: 35,
                        }}
                      >
                        <KeyboardBackspaceIcon style={{ color: "#000" }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          removeFielmanMarker();
                          openHome();
                        }}
                        aria-label="delete"
                        style={{
                          marginRight: 5,
                          backgroundColor: "#fff",
                          opacity: 0.7,
                          width: 35,
                          height: 35,
                        }}
                      >
                        <KeyboardBackspaceIcon style={{ color: "#000" }} />
                      </IconButton>
                    )}
                    <div>
                      <Typography style={{ color: "#fff" }}>
                        {state.date_selected_fieldman}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography style={{ color: '#fff' }}>{state.date_selected_fieldman}</Typography>
                  </div>
                </Grid> */}
                <Grid item xs={12} md={12}>
                  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Typography
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      DELIVERY TYPE
                    </Typography>
                  </div>
                  <hr />
                </Grid>
                {state.fieldman_delivery_type.map((val, index) => {
                  if (val.count !== 0)
                    return (
                      <>
                        <Grid item xs={4} md={4} key={index}>
                          <Card elevation={3} className="card-color-data">
                            <CardContent
                              className=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 10,
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: 12,
                                  fontWeight: "bold",
                                  color: "#fff",
                                }}
                              >
                                {val.type}
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: 12,
                                  fontWeight: "bold",
                                  color: "#fff",
                                }}
                              >
                                {val.count}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </>
                    );
                })}
              </Grid>
            </div>
            <div className="card-color-delivery-type-fieldman" style={{}}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Typography
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      ATTENDANCE
                    </Typography>
                  </div>
                  <hr />
                </Grid>
                {state.attendance.map((val, index) => {
                  let date = "--:--";
                  if (val.date_added != "--:--") {
                    date = moment(val.date_added).format("HH:mm A");
                  }
                  return (
                    <Grid item xs={4} md={4} key={index}>
                      <Card elevation={3} className="card-color-data">
                        <CardContent
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "space-between",

                            padding: 10,
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: 11.5,
                              fontWeight: "bold",
                              color: "#fff",
                            }}
                          >
                            {String(val.att_type).toUpperCase()}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: 11.5,
                              fontWeight: "bold",
                              color: "#fff",
                            }}
                          >
                            {date}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
            <div className="card-color-delivery-type-fieldman" style={{}}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
                >
                  ACCOMPLISHMENTS
                </Typography>
                <div>
                  {/* <ShowChartIcon style={{marginRight:5}}/>
              <BarChartIcon/> */}
                </div>
              </div>

              <hr />
              <Grid container spacing={1}>
                <Grid item xs={6} md={6}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 12 / 2,
                        backgroundColor: "#27ae60",
                        marginRight: 10,
                      }}
                    />
                    <Typography style={{ fontSize: 12.7, color: "#fff" }}>
                      Accomplishments / Hour
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} md={6}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 12 / 2,
                        backgroundColor: "#e74c3c",
                        marginRight: 10,
                      }}
                    />
                    <Typography style={{ fontSize: 12.7, color: "#fff" }}>
                      Accomplishments
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} md={6}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 12 / 2,
                        backgroundColor: "#e74c3c",
                        marginRight: 10,
                      }}
                    />
                    <Typography style={{ fontSize: 12.7, color: "#fff" }}>
                      Battery
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid xs={12} md={12}>
                  <Card
                    className="card-color-data"
                    elevation={4}
                    style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}
                  >
                    <CardContent
                      style={
                        {
                          // backgroundColor: "rgb(59 43 60 / 50%)",
                        }
                      }
                    >
                      {/* <Line
                line_data={state.state.fieldman_details.line}
                width={462}
                height={260}
                total_jo={state.total_jo}
                type={"CUMMULATIVE"}
              /> */}
                      {state.showGraph ? (
                        <>
                          <Line2
                            line_data={state.line}
                            width={500}
                            height={300}
                            type={""}
                            total_jo={state.total_jo}
                          />
                        </>
                      ) : undefined}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div id="fieldmanDeatils-open" className="fieldmanDeatils-open">
          <div
            style={{ overflowY: "auto", height: "100%", overflowX: "hidden" }}
          >
            {state.selectedDetails.map((val, index) => {
              let images = [];
              let validator_remarks = "";
              let validator_remark_type = "";
              let validator_remark_type_category = "";
              let validator_name = "";
              let date_validated = "";
              let validator_comment = "";
              let percent = parseInt(
                state.trackAccomMasterList.length *
                  (map_reducer.count_validation_logs / 100)
              );
              if (state.trackAccomMasterList.length <= 50) {
                percent = state.trackAccomMasterList.length;
              }
              if (percent < 50) {
                if (state.trackAccomMasterList.length > 50) {
                  percent = 50;
                }
              }
              let interval = parseInt(
                state.trackAccomMasterList.length / percent
              );
              let interval_array = [];

              for (let index = 0; index < percent; index++) {
                const index_val = interval * index;
                interval_array.push(index_val);
              }
              let match_random = interval_array.filter(
                (val) => val == state.new_pickIndex
              );
              if (val.accom_images !== "" && val.accom_images !== null) {
                images = JSON.parse(val.accom_images);
              }
              if (
                val.validator_remarks != "" &&
                val.validator_remarks != null
              ) {
                validator_remarks = val.validator_remarks;
              }
              if (
                val.validator_remark_type != "" &&
                val.validator_remark_type != null
              ) {
                validator_remark_type = val.validator_remark_type;
              }
              if (
                val.validator_remark_type_category != "" &&
                val.validator_remark_type_category != null
              ) {
                validator_remark_type_category =
                  val.validator_remark_type_category;
              }
              if (val.user_lname != null) {
                validator_name = val.user_lname + " " + val.user_fname;
              }
              if (val.date_validated != null) {
                date_validated = val.date_validated;
              }
              if (
                val.validator_comment != null &&
                val.validator_comment != ""
              ) {
                validator_comment = val.validator_comment;
              }
              let borderColor = undefined;
              let borderWidth = undefined;
              let borderStyle = undefined;
              let display = "none";
              if (match_random.length > 0) {
                borderColor = "#e67e22";
                borderWidth = 4;
                borderStyle = "solid";
                display = undefined;
              }
              return (
                <>
                  <Grid container spacing={0} style={{ marginTop: 50 }}>
                    <Grid item xs={12} md={12}>
                      <Card style={{ position: "relative" }} variant="outlined">
                        {val.image_path !== "" && val.image_path !== null ? (
                          <div style={{ position: "relative" }}>
                            <div
                              style={{
                                display: loadingImage ? "block" : "none",
                                width: "100%",
                                height: "40vh",
                                position: "absolute",
                                backgroundColor: "#fff",
                                zIndex: 99,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  height: "100%",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography style={{ fontWeight: "bold" }}>
                                  Loading image...
                                </Typography>
                              </div>
                            </div>
                            <Carousel
                              style={{
                                display: loadingImage ? "none" : "block",
                                position: "absolute",
                              }}
                              autoPlay={false}
                            >
                              {images.map((images, index) => {
                                return (
                                  <img
                                    key={index}
                                    onClick={() => {
                                      handleOpen(val.fetched_coordinates);
                                    }}
                                    src={serverImageMeter + images.path}
                                    onLoad={imageLoaded}
                                    alt="test"
                                    style={{
                                      width: "100%",
                                      height: "24vh",
                                    }}
                                  />
                                );
                              })}
                            </Carousel>
                          </div>
                        ) : (
                          <Carousel
                            style={{
                              display: loadingImage ? "none" : "block",
                              position: "absolute",
                            }}
                            autoPlay={false}
                          >
                            <img
                              src={require("../../../assets/map image/no_image.png")}
                              alt="test"
                              onLoad={imageLoaded}
                              style={{ width: "100%", height: "24vh" }}
                            />
                          </Carousel>
                        )}

                        <div style={{ position: "absolute", left: 5, top: 5 }}>
                          <IconButton
                            onClick={() => {
                              document.getElementById(
                                "fieldmanDeatils-open"
                              ).style.cssText = "transition: 0.5s;left:-50%;";
                              document.getElementById(
                                "fieldmanDeatils-slider-left"
                              ).style.cssText = "transition: 0.5s;left:0%;";
                            }}
                            style={{
                              backgroundColor: "rgb(15, 16, 19)",
                              opacity: 0.7,
                              width: 40,
                              height: 40,
                            }}
                          >
                            <CloseIcon style={{ color: "#fff" }} />
                          </IconButton>
                        </div>
                        {val.image_path !== "" && val.image_path !== null ? (
                          <div
                            style={{
                              position: "absolute",
                              right: 5,
                              bottom: 40,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Button
                                style={{
                                  fontSize: "0.8125rem",
                                  backgroundColor: "rgba(6,86,147)",
                                  color: "white",
                                }}
                                onClick={() => {
                                  let images = JSON.parse(
                                    state.selectedDetails[0].accom_images
                                  );
                                  getData(
                                    "Audit/convertImageAccom",
                                    images
                                  ).then((res) => {
                                    setState((prev) => ({
                                      ...prev,
                                      images_base_64: res.image,
                                      openPDF: true,
                                    }));
                                  });
                                  // pdfPrint();
                                }}
                              >
                                Download&nbsp;PDF
                              </Button>
                            </div>
                          </div>
                        ) : undefined}
                      </Card>
                    </Grid>
                    {/* <Grid item xs={12} md={12} style={{ backgroundColor: '#fff' }}>
                      <div
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          marginTop: 7,
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#1b5ea0",
                          }}
                        >
                          ACCOMPLISHMENT DETAILS
                        </Typography>
                      </div>
                      <hr />
                    </Grid> */}

                    <Grid item xs={12} md={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: 10,
                        }}
                      >
                        {state.new_pickIndex > 0 ? (
                          <div
                            onClick={() => {
                              onPrevious(state.new_pickIndex - 1);
                            }}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ArrowLeftIcon style={{ color: "#fff" }} />
                            <Typography style={{ fontSize: 14, color: "#fff" }}>
                              PREVIOUS
                            </Typography>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ArrowLeftIcon style={{ color: "#969696" }} />
                            <Typography
                              style={{ fontSize: 14, color: "#969696" }}
                            >
                              PREVIOUS
                            </Typography>
                          </div>
                        )}
                        <div>
                          <Typography style={{ fontSize: 14, color: "#fff" }}>
                            {state.new_pickIndex +
                              1 +
                              " / " +
                              trackAccom.length}
                          </Typography>
                        </div>
                        {state.new_pickIndex < trackAccom.length - 1 ? (
                          <div
                            onClick={() => {
                              onNext(state.new_pickIndex + 1);
                            }}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography style={{ fontSize: 14, color: "#fff" }}>
                              NEXT
                            </Typography>
                            <ArrowRightIcon style={{ color: "#fff" }} />
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              style={{ fontSize: 14, color: "#969696" }}
                            >
                              NEXT
                            </Typography>
                            <ArrowRightIcon style={{ color: "#969696" }} />
                          </div>
                        )}
                      </div>
                    </Grid>

                    {/* <Grid item xs={12} md ={12}>
                  <div style={{backgroundColor:'#1c1e247f',padding:5}}>
                    <div >
                      <IconButton style={{backgroundColor:'#fff',width: 40,height: 40,}}>
                        <CheckCircleIcon style={{color:'#000'}}/>
                      </IconButton>
                    </div>
                  </div>
                </Grid> */}
                  </Grid>
                  <Grid id="style-1" container spacing={1}>
                    <Grid item xs={12} md={12}>
                      <div style={{ backgroundColor: "#1c1e247f", padding: 5 }}>
                        <Typography
                          style={{
                            fontSize: 14,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          DETAILS
                        </Typography>
                      </div>
                      <Typography
                        style={{
                          fontSize: 12.5,
                          color: "rgb(247, 159, 31)",
                          fontWeight: "bold",
                          display: display,
                        }}
                      >
                        REQUIRED TO VALIDATE
                      </Typography>
                    </Grid>
                    <Grid container spacing={1} style={{ padding: 15 }}>
                      {map_reducer.selected_details.map((val, index) => {
                        return (
                          <Grid item xs={12} md={6} key={index}>
                            <div style={{}}>
                              <TextField
                                multiline
                                size="small"
                                style={{ width: "100%" }}
                                id="filled-read-only-input"
                                label={val.name}
                                value={val.value}
                                InputLabelProps={{
                                  classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssLabel,
                                  },
                                }}
                                InputProps={{
                                  readOnly: true,
                                  classes: {
                                    root: classes.notchedOutline,
                                    focused: classes.notchedOutline,
                                    notchedOutline: classes.notchedOutline,
                                  },
                                }}
                                variant="outlined"
                              />
                            </div>
                          </Grid>
                        );
                      })}
                    </Grid>
                    {state.actual_reading.length > 0 ? (
                      <Grid item xs={12} md={12}>
                        <div
                          style={{ backgroundColor: "#1c1e247f", padding: 5 }}
                        >
                          <Typography
                            style={{
                              fontSize: 14,
                              color: "#fff",
                              fontWeight: "bold",
                            }}
                          >
                            ACTUAL READING
                          </Typography>
                        </div>
                      </Grid>
                    ) : undefined}

                    <Grid container spacing={1} style={{ padding: 15 }}>
                      {state.actual_reading.map((val, index) => {
                        return (
                          <Grid item xs={12} md={6} key={index}>
                            <div style={{}}>
                              <TextField
                                multiline
                                size="small"
                                style={{ width: "100%" }}
                                id="filled-read-only-input"
                                label={val.type}
                                value={val.value}
                                InputLabelProps={{
                                  classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssLabel,
                                  },
                                }}
                                InputProps={{
                                  readOnly: true,
                                  classes: {
                                    root: classes.notchedOutline,
                                    focused: classes.notchedOutline,
                                    notchedOutline: classes.notchedOutline,
                                  },
                                }}
                                variant="outlined"
                              />
                            </div>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div style={{ backgroundColor: "#1c1e247f", padding: 5 }}>
                        <Typography
                          style={{
                            fontSize: 14,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          VALIDATION
                        </Typography>
                      </div>
                    </Grid>
                    <Grid container spacing={1} style={{ padding: 15 }}>
                      <Grid item xs={12} md={6}>
                        <div style={{}}>
                          <TextField
                            multiline
                            style={{ width: "100%" }}
                            size="small"
                            id="filled-read-only-input"
                            label="Status"
                            value={validator_remarks}
                            InputLabelProps={{
                              classes: {
                                root: classes.cssLabel,
                                focused: classes.cssLabel,
                              },
                            }}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                root: classes.notchedOutline,
                                focused: classes.notchedOutline,
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                            variant="outlined"
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <div style={{}}>
                          <TextField
                            multiline
                            style={{ width: "100%" }}
                            size="small"
                            id="filled-read-only-input"
                            label="Field Findings"
                            value={validator_remark_type}
                            InputLabelProps={{
                              classes: {
                                root: classes.cssLabel,
                                focused: classes.cssLabel,
                              },
                            }}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                root: classes.notchedOutline,
                                focused: classes.notchedOutline,
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                            variant="outlined"
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <div style={{}}>
                          <TextField
                            multiline
                            size="small"
                            style={{ width: "100%" }}
                            id="filled-read-only-input"
                            label="Remarks"
                            value={validator_remark_type_category}
                            InputLabelProps={{
                              classes: {
                                root: classes.cssLabel,
                                focused: classes.cssLabel,
                              },
                            }}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                root: classes.notchedOutline,
                                focused: classes.notchedOutline,
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                            variant="outlined"
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <div style={{}}>
                          <TextField
                            multiline
                            size="small"
                            style={{ width: "100%" }}
                            id="filled-read-only-input"
                            label="Comment"
                            value={validator_comment}
                            InputLabelProps={{
                              classes: {
                                root: classes.cssLabel,
                                focused: classes.cssLabel,
                              },
                            }}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                root: classes.notchedOutline,
                                focused: classes.notchedOutline,
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                            variant="outlined"
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <div style={{}}>
                          <TextField
                            multiline
                            size="small"
                            style={{ width: "100%" }}
                            id="filled-read-only-input"
                            label="Validator"
                            value={validator_name}
                            InputLabelProps={{
                              classes: {
                                root: classes.cssLabel,
                                focused: classes.cssLabel,
                              },
                            }}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                root: classes.notchedOutline,
                                focused: classes.notchedOutline,
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                            variant="outlined"
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <div style={{}}>
                          <TextField
                            multiline
                            size="small"
                            style={{ width: "100%" }}
                            id="filled-read-only-input"
                            label="Date"
                            value={date_validated}
                            InputLabelProps={{
                              classes: {
                                root: classes.cssLabel,
                                focused: classes.cssLabel,
                              },
                            }}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                root: classes.notchedOutline,
                                focused: classes.notchedOutline,
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                            variant="outlined"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </div>
        </div>
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={state.openModalDetails}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            <ValidationFieldman
              ref={childRefValidation}
              state={state}
              loadingImage={loadingImage}
              setState={setState}
              imageLoaded={imageLoaded}
              onPrevious={onPrevious}
              dispatch_data={dispatch_data}
              trackAccom={trackAccom}
              onNext={onNext}
              map_reducer={map_reducer}
              field_findings={state.field_findings}
              onrefreshMap={() => {
                refreshMapFDetails = !refreshMapFDetails;
                setState((prev) => ({ ...prev }));
              }}
              resetSelected={() => {
                setState((prev) => ({ ...prev, selectedDetails: [] }));
              }}
              resetTrackSpan={() => {
                clearCLuster = true;
                refreshMap = !refreshMap;
                setState((prev) => ({
                  ...prev,
                  trackAccomSpan: [],
                  midPoint: [],
                  pathCoordinates: [],
                }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "#1b5ea0" }}
            >
              <Typography style={{ color: "#fff" }}>Close</Typography>
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullWidth
          maxWidth="lg"
          open={state.openPDF}
          onClose={() => {
            setState((prev) => ({ ...prev, openPDF: false }));
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="simple-dialog-title">Preview</DialogTitle>
          <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
            <IconButton aria-label="delete">
              <CloseIcon
                onClick={() =>
                  setState((prev) => ({ ...prev, openPDF: false }))
                }
                style={{ color: "#000" }}
              />
            </IconButton>
          </div>
          <DialogContent>
            <PDF
              singleDetails={state.selectedDetails}
              images_base_64={state.images_base_64}
              logo={state.logo}
              branch_name={map_reducer.branch_name}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const onToggleOpen = (index) => {
    let isOpen = {
      [index]: true,
    };
    setIsOpen(isOpen);
    refreshMap = !refreshMap;
    // setState(prev=>({...prev,refreshMap:!state.refreshMap}))
  };
  const stopPlay = () => {
    trackAccom = state.trackAccomMasterList;
    refreshMap = !refreshMap;
    refreshMapFDetails = !refreshMapFDetails;

    playButton = false;
    clearTimeout(timerRef.current);
    setState((prev) => ({ ...prev, pause: false, count_val: 0 }));
    document.getElementById("fieldmanDeatils-slider-left").style.cssText =
      "transition: 0.5s;left:0%;";
  };
  const removeFielmanMarker = () => {
    trackAccom = [];
    refreshMap = !refreshMap;
    refreshMapFDetails = !refreshMapFDetails;

    playButton = false;
    clearCLuster = true;
    clearTimeout(timerRef.current);
    setState((prev) => ({ ...prev, pause: false, count_val: 0 }));
  };

  const playBackAccom = (details) => {
    if (trackAccom.length === details.length) {
      trackAccom = [];
      playButton = true;
      clearCLuster = true;
      refreshMap = !refreshMap;
      refreshMapFDetails = !refreshMapFDetails;

      childRefFieldmanDetails.current.closeCountValidatioList();
      setState((prev) => {
        return {
          ...prev,
        };
      });
      // state.count_val = 0;
    }
    setTimeout(() => {
      ShowMapMarkerPlayback(details, false);
    }, 100);
  };
  const ShowMapMarkerPlayback = (response, paramPause) => {
    if (paramPause) {
      clearTimeout(timerRef.current);
    } else {
      if (state.count_val != response.length) {
        timerRef.current = setTimeout(() => {
          let lat = 0.0;
          let long = 0.0;
          trackAccom.push(response[state.count_val]);
          let latlong = "";
          let splitlatlng = "";
          let lat_data = "";
          let lng_data = "";
          let complete_name = "";
          latlong = String(response[state.count_val].fetched_coordinates);
          splitlatlng = latlong.split(",");
          lat_data = splitlatlng[0];
          lng_data = splitlatlng[1];
          lat = lat_data;
          long = lng_data;
          setmapOption({
            ...mapOption,
            lat: parseFloat(lat),
            lng: parseFloat(long),
            zoom: 17,
          });

          let timeStart = moment(response[state.count_val].date_accom).format(
            "LT"
          );

          // clearCLuster = false
          refreshMap = !refreshMap;
          refreshMapFDetails = !refreshMapFDetails;

          setState((prev) => {
            return {
              ...prev,
              count_val: state.count_val++,
            };
          });
          ShowMapMarkerPlayback(response, paramPause);
        }, 1200 / speeds.current);
      } else {
        speeds.current = 1;
        playButton = false;
        refreshMap = !refreshMap;
        refreshMapFDetails = !refreshMapFDetails;

        setState((prev) => {
          return {
            ...prev,
            pause: false,
            count_val: 0,
          };
        });
        document.getElementById("fieldmanDeatils-slider-left").style.cssText =
          "transition: 0.5s;left:0%;";
        clearTimeout(timerRef.current);
      }
    }
  };

  const Buttons = () => {
    if (state.showProfile !== "none")
      return (
        <div
          style={{
            width: "20%",
            height: "8vh",
            position: "fixed",
            bottom: 35,
            left: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ position: "relative" }}>
            <FastForwardIcon
              onClick={() => {
                if (speeds.current === 8) {
                  speeds.current = 1;
                } else {
                  speeds.current++;
                }
                setState((prev) => ({ ...prev }));
              }}
              style={{ fontSize: 50, cursor: "pointer", color: "#fff" }}
            />

            <Typography
              style={{
                position: "absolute",
                bottom: 38,
                left: 30,
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {"x" + speeds.current}
            </Typography>
          </div>
          {state.pause ? (
            <PauseIcon
              onClick={() => {
                setState((prev) => {
                  return { ...prev, pause: false };
                });
                ShowMapMarkerPlayback(state.trackAccomMasterList, true);
              }}
              style={{ fontSize: 50, cursor: "pointer", color: "#fff" }}
            />
          ) : (
            <PlayArrowIcon
              onClick={() => {
                if (
                  state.count_val > 0 &&
                  trackAccom.length != state.trackAccomMasterList.length
                ) {
                  setState((prev) => {
                    return { ...prev, count_val: state.count_val++ };
                  });
                }
                refreshMap = !refreshMap;
                setState((prev) => {
                  return {
                    ...prev,
                    pause: true,
                    trackAccomSpan: [],
                    midPoint: [],
                    pathCoordinates: [],
                  };
                });
                playBackAccom(state.trackAccomMasterList, false);
                document.getElementById(
                  "fieldmanDeatils-slider-left"
                ).style.cssText = "transition: 0.5s;left:-50%;";
                document.getElementById("fieldmanDeatils-open").style.cssText =
                  "transition: 0.5s;left:-50%;";
              }}
              style={{ fontSize: 50, cursor: "pointer", color: "#fff" }}
            />
          )}

          <StopIcon
            onClick={() => {
              document.getElementById("fieldmanDeatils-open").style.cssText =
                "transition: 0.5s;left:-50%;";
              if (trackAccom.length !== state.trackAccomMasterList.length) {
                stopPlay();
              }
            }}
            style={{ fontSize: 50, cursor: "pointer", color: "#fff" }}
          />
        </div>
      );
  };
  const onNext = (index) => {
    if (index < state.trackAccom.length) {
      setLoadingImage(true);

      document.getElementById("fieldmanDeatils-slider-left").style.cssText =
        "transition: 0.5s;left:-50%;";
      document.getElementById("fieldmanDeatils-open").style.cssText =
        "transition: 0.5s;left:0%;";
      let details = state.trackAccom[index];
      var latlong = "";
      var splitlatlng = "";
      var lat = "";
      var lng = "";
      var complete_name = "";
      latlong = String(details.fetched_coordinates);
      splitlatlng = latlong.split(",");
      lat = splitlatlng[0];
      lng = splitlatlng[1];
      let zoom = 20;
      if (parseFloat(lat) === 0 && parseFloat(lng) === 0) {
        zoom = 10;
      }
      childRef.current.getAlert(index, parseFloat(lat), parseFloat(lng));

      ArrangeDetailsDisplay(details);
      getAccountNumberRecords(details);
      setState((prev) => ({
        ...prev,
        selectedDetails: [details],
        new_pickIndex: index,
      }));
      // refreshMap = !refreshMap
      // playButton = true
      setmapOption({
        ...mapOption,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: zoom,
      });
    }
  };
  const onPrevious = (index) => {
    if (index >= 0) {
      setLoadingImage(true);
      document.getElementById("fieldmanDeatils-slider-left").style.cssText =
        "transition: 0.5s;left:-50%;";
      document.getElementById("fieldmanDeatils-open").style.cssText =
        "transition: 0.5s;left:0%;";
      let details = state.trackAccom[index];
      getAccountNumberRecords(details);
      var latlong = "";
      var splitlatlng = "";
      var lat = "";
      var lng = "";
      var complete_name = "";
      latlong = String(details.fetched_coordinates);
      splitlatlng = latlong.split(",");
      lat = splitlatlng[0];
      lng = splitlatlng[1];
      let zoom = 20;
      if (parseFloat(lat) === 0 && parseFloat(lng) === 0) {
        zoom = 10;
      }
      childRef.current.getAlert(index, parseFloat(lat), parseFloat(lng));
      setmapOption({
        ...mapOption,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: zoom,
      });

      ArrangeDetailsDisplay(details);
      setState((prev) => ({
        ...prev,
        selectedDetails: [details],
        new_pickIndex: index,
      }));
    }
  };
  const fieldmanDeatilsOpen = (selectedDetails, mark, index, loading) => {
    setLoadingImage(loading);
    document.getElementById("fieldmanDeatils-slider-left").style.cssText =
      "transition: 0.5s;left:-50%;";
    document.getElementById("fieldmanDeatils-open").style.cssText =
      "transition: 0.5s;left:0%;";
    ArrangeDetailsDisplay(selectedDetails[0]);
    setState((prev) => ({
      ...prev,
      selectedDetails: selectedDetails,
      new_pickIndex: index,
    }));
  };
  const openFiedmanHistory = (user_id, row) => {
    document.getElementById("fieldman-list").style.cssText =
      "transition: 0.5s;left:-50%;";
    document.getElementById("dashboard").style.cssText =
      "transition: 0.5s;left:-50;";
    document.getElementById("fieldmanHistory-slider-left").style.cssText =
      "transition: 0.5s;left:0%;";
    getRecord(user_id, row);
  };
  const getRecord = (user_id, row) => {
    dispatch_data("loading_map", true);
    // setHistory(true);
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentDay = new Date();
    const details = {
      firstDay: moment(firstDay).format("YYYY-MM-DD"),
      currentDay: moment(currentDay).format("YYYY-MM-DD"),
      user_id: user_id,
      branch_id: state.Selected_branch,
      jo_type_val: map_reducer.selected_jo,
    };
    let day_sched = row.day_sched;
    let user_jobposition = row.user_jobposition;

    getData("aam/getAccomplishementRecord", details, state.discon).then(
      (res) => {
        setState((prev) => ({
          ...prev,
          record_single_data: res,
          record_start_date: firstDay,
          record_end_date: currentDay,
          record_user_id: user_id,
          day_sched: day_sched,
          fieldman_user_jobposition: user_jobposition,
          refreshHistory: !state.refreshHistory,
          attendance_history: [
            {
              type: "PRESENT",
              value: res.present,
              color: "#487eb0",
            },
            {
              type: "ABSENT",
              value: res.absent,
              color: "#e74c3c",
            },
          ],
        }));
        dispatch_data("loading_map", false);
      }
    );
  };
  const changeGetRecord = (e) => {
    dispatch_data("loading_map", true);
    // setOpenRecord(false);
    e.preventDefault();
    const firstDay = state.record_start_date;
    const currentDay = state.record_end_date;
    const details = {
      firstDay: moment(firstDay).format("YYYY-MM-DD"),
      currentDay: moment(currentDay).format("YYYY-MM-DD"),
      user_id: state.record_user_id,
      branch_id: state.Selected_branch,
      jo_type_val: map_reducer.selected_jo,
    };
    getData("aam/getAccomplishementRecord", details).then((res) => {
      setState((prev) => ({
        ...prev,
        record_single_data: res,
        record_start_date: firstDay,
        record_end_date: currentDay,
        openRecord: false,
        refreshHistory: !state.refreshHistory,
        attendance_history: [
          {
            type: "PRESENT",
            value: res.present,
            color: "#487eb0",
          },
          {
            type: "ABSENT",
            value: res.absent,
            color: "#e74c3c",
          },
        ],
      }));
      // dispatch_data("loading_map", false);
    });
  };
  const hideHistory = () => {
    document.getElementById("fieldmanHistory-slider-left").style.cssText =
      "transition: 0.5s;left:-100%;";
  };
  const ArrangeDetailsDisplay = (details) => {
    let findIndexJo_type = [];
    let branch_field_details = [];
    if (map_reducer.jo_type.length > 0) {
      findIndexJo_type = map_reducer.jo_type.findIndex(
        (element) => element === details.accom_jo_type
      );
      if (map_reducer.branch_field_details.length > 0) {
        branch_field_details =
          map_reducer.branch_field_details[findIndexJo_type];
      } else {
        let initial = [
          { name: "Reference No.", key: "meter_number" },
          { name: "Field Findings", key: "accom_findings" },
          { name: "Remarks", key: "accom_remarks" },
          { name: "Reading", key: "present_reading" },
          { name: "Battery", key: "accom_battery_life" },
          { name: "Date", key: "date_accom" },
          { name: "Coordinates", key: "fetched_coordinates" },
        ];
        branch_field_details = initial;
      }
    }
    let new_branch_field_details = [];
    branch_field_details.forEach((b_details) => {
      let data = b_details;
      [details].forEach((val) => {
        data["value"] = val[b_details.key];
      });
      new_branch_field_details.push(data);
    });
    dispatch_data("selected_details", new_branch_field_details);
  };
  const NavigationTop = () => {
    return (
      <div className="top-nav">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => {
              removeFielmanMarker();
              openHome();
            }}
            aria-label="delete"
            style={{
              backgroundColor: "#1b5ea0",
              marginRight: 5,
              width: 40,
              height: 40,
            }}
          >
            <HomeIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{
              backgroundColor: "#1b5ea0",
              marginRight: 5,
              width: 40,
              height: 40,
            }}
          >
            <QueryBuilderIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
      </div>
    );
  };
  const FieldmanHistoryPage = () => {
    return (
      <div
        id="fieldmanHistory-slider-left"
        className="fieldmanHistory-slider-left"
      >
        <FieldmanHistory
          state={state}
          setState={setState}
          changeGetRecord={changeGetRecord}
          onTrackAccomplishmentsRoute={(
            row,
            date_start,
            assign,
            bulk,
            type
          ) => {
            childRefFieldmanList.current.onTrackAccomplishmentsRoute(
              row,
              date_start,
              assign,
              bulk,
              type
            );
          }}
          openHome={() => {
            document.getElementById(
              "fieldmanHistory-slider-left"
            ).style.cssText = "transition: 0.5s;left:-100%;";
            openHome();
          }}
        />
      </div>
    );
  };
  return (
    <div className="parent">
      <Backdrop
        className={classes.backdrop}
        open={map_reducer.loading_map}
        style={{ zIndex: 999999999 }}
      >
        <div className="loadermap"></div>
      </Backdrop>
      <div className="map-parent">
        <MapComponents
          childRef={childRef}
          trackAccomSpan={state.trackAccomSpan}
          midPoint={state.midPoint}
          pathCoordinates={state.pathCoordinates}
          trackAccomParam={
            state.trackAccomSpan.length > 0 ? state.trackAccomSpan : trackAccom
          }
          isOpen={isOpen}
          onToggleOpen={onToggleOpen}
          refreshMap={refreshMap}
          mapOption={mapOption}
          openMapSelectedFieldman={(user_id) =>
            childRefFieldmanList.current.openMapSelectedFieldman(user_id)
          }
          clearTimeout={() => {
            setState((prev) => {
              return { ...prev, pause: false };
            });
            ShowMapMarkerPlayback(state.trackAccomMasterList, true);
          }}
          fieldmanDeatilsOpen={fieldmanDeatilsOpen}
          new_pickIndex={state.new_pickIndex}
        />
      </div>

      {HomeDashboard()}
      {FieldmanDetailsComponent()}
      {FieldmanHistoryPage()}
      {/* {NavigationTop()} */}
      {Buttons()}
    </div>
  );
}
