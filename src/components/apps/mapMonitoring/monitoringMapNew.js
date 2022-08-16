import DateFnsUtils from "@date-io/date-fns";
import { Button, Card, Grid, IconButton, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// import ReactTooltip from "react-tooltip";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
// import 'mapbox-gl/dist/mapbox-gl.css';
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/Clear";
import CloseIcon from "@material-ui/icons/Close";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FilterListIcon from "@material-ui/icons/FilterList";
import GroupIcon from "@material-ui/icons/Group";
import HistoryIcon from "@material-ui/icons/History";
import MinimizeIcon from "@material-ui/icons/Minimize";
import PauseIcon from "@material-ui/icons/Pause";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RefreshIcon from "@material-ui/icons/Refresh";
import RemoveIcon from "@material-ui/icons/Remove";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import StopIcon from "@material-ui/icons/Stop";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import ReactExport from "react-data-export";
import Draggable from "react-draggable";
import Carousel from "react-material-ui-carousel";
// import { getData, sqlData } from '../../../api/api';
import { useDispatch, useSelector } from "react-redux";
// import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CancelledMarker from "../../../assets/map image/canceled-activity-marker.png";
import OnTripMarker from "../../../assets/map image/default.png";
import DefaultMarker from "../../../assets/map image/electron-blue.png";
import MarkerFrom from "../../../assets/map image/from.png";
import IdleMarker from "../../../assets/map image/gray.png";
import OnTransitActivityMarker from "../../../assets/map image/ontransit-activity-marker.png";
import QueueRequestMarker from "../../../assets/map image/pending-activity-marker.png";
import MarkerTo from "../../../assets/map image/to.png";
import UserImage from "../../../assets/map image/user_image.png";
import { getData, getDataDiscon } from "../../api/api";
import Line from "../mapMonitoring/charts/line";
import PieGrap from "./charts/d_pie2";
import AccomMemo from "./memo/accom";
import Records from "./record/records";
import Switch from "@material-ui/core/Switch";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Summary_monitoring from "./summary_monitoring";
import PDF from "./pdf";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Summary_Page from "./summary_accomplishments/accom";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#2f3640",
    color: "#fff",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);
const HtmlTooltip2 = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

function playback(details, user_id) {
  var data = [];
  data.push(details);
  // console.log(data)
  this.setState({
    count_val: 0,
    col: "col-lg-6",
    displayMarkers: [],
    show_all_users: false,
    display_AccomPlayback: [],
    employee_details: data,
    users_data: data,
  });
}

function getSingleUser(user_id, complete_name, user_pic, details) {
  var image = "";
  var image_pic = "";
  if (user_pic !== "") {
    image_pic =
      "http://images.pacificweb.com.ph/pockethr/profilepic/" + user_pic;
  } else {
    image_pic = require("../../../assets/map image/user.png");
  }
  var data = [
    {
      userId: user_id,
      completeName: complete_name,
      userPic: user_pic,
      detail: details,
    },
  ];
  // console.log(data);

  this.setState({
    show_user: false,
    show_accom: true,
    completeName: complete_name,
    userId: user_id,
    userPic: user_pic,
    specific_user: data,
  });
}
function accomplishments(details, user_id) {
  // alert("qwer")]
  var data = [];
  data.push(details);
  this.setState({
    col: "col-lg-6",
    show: "Customers",
    displayMarkers: [],
    show_accom: true,
    show_all_users: false,
    display_AccomPlayback: [],
    employee_details: data,
    users_data: data,
  });
  // console.log(user_id)
  getData("HumanResource/getCustomers", user_id).then((response) => {
    // console.log(response)
    this.setState({
      displayMarkers: response,
      accomplishment_customers: response,
    });
    setTimeout(() => {
      this.handleSidebar();
    }, 200);
  });
}

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
const exampleMapStyles = [
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        weight: 2,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#dedede",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f79f3b",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const mapCenter = {
  lat: 13.7565,
  lng: 121.0583,
  zoom: 10,
};
const getMapOptions = (maps) => {
  return {
    fullscreenControl: false,
    styles: exampleMapStyles,
    streetViewControl: false,
    disableDoubleClickZoom: false,
    mapTypeControl: false,
    // zoomControl: false,
    clickableIcons: false,
  };
};
const {
  compose,
  withProps,
  withHandlers,
  withStateHandlers,
} = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");

const {
  MarkerClusterer,
} = require("react-google-maps/lib/components/addons/MarkerClusterer");
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "calc(100vh)" }} />,
    containerElement: <div style={{ height: "calc(100vh)" }} />,
    mapElement: <div style={{ height: "calc(100vh)" }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      //     var isVisible = false;
      //    window.google.maps.event.addListener( window.google.maps.getStreetView(), 'visible_changed', function() {
      //     //   var visible = this.getVisible();
      //     //   if (isVisible != visible) {
      //     //     alert('streetview is ' + (visible ? 'open' : 'closed'));
      //     //   }
      //     //   isVisible = visible;
      //     alert('hehehe')
      //     });
    },
    onMarkerClick: () => (marker) => {
      // link to post view page
      //
      //
      //
      //
      //
      window.location = "/post/oxford";
    },
  }),

  // withStateHandlers(() => ({
  //     isOpen: false,
  // }), {
  //     onToggleOpen: ({ isOpen }) => (id) => ({
  //         isOpen: {

  //             [id]: isOpen[id] == undefined ? true : !isOpen[id]
  //         },
  //     })
  // }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    ref={window.google.maps}
    zoom={props.mapOption.zoom}
    center={{ lat: props.mapOption.lat, lng: props.mapOption.lng }}
    options={{
      streetViewControl: true,
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.TOP_LEFT,
      },
      addressControlOptions: {
        position: window.google.maps.ControlPosition.BOTTOM_CENTER,
      },
      fullscreenControl: false,
      // streetViewControl: false,
      disableDoubleClickZoom: false,
      mapTypeControl: false,
      clickableIcons: false,
      zoomControl: false,
      mapTypeId: "hybrid",
      mapTypeControlOptions: {
        mapTypeIds: ["satellite", "roadmap", "custom-map"],
        // position:'LEFT_BOTTOM'
      },
    }}
  >
    <MarkerClusterer
      enableRetinaIcons={true}
      onClick={props.onMarkerClustererClick}
      averageCenter
      gridSize={40}
      maxZoom={14}
      zoomOnClick={true}
      minimumClusterSize={2}
    >
      {props.markers.map((marker, index) => {
        var latlong = "";
        var splitlatlng = "";

        var complete_name = "";
        latlong = String(marker.fetched_coordinates);
        if (marker.fetched_coordinates === undefined) {
          latlong = String(marker.location_latlng);
        }
        splitlatlng = latlong.split(",");
        var lat = parseFloat(splitlatlng[0]);
        var lng = parseFloat(splitlatlng[1]);
        let num_bulk = 0;
        props.bulkData.map((val_filter, index) => {
          if (val_filter.accom_id === marker.accom_id) {
            num_bulk = val_filter.bulk;
          }
        });
        let image = "";
        if (props.data === "initial") {
          image = require("../../../assets/map image/online.png");
        } else if (props.data === "single") {
          if (
            parseInt(props.branch_name) === 51 ||
            parseInt(props.branch_name) === 67
          ) {
            image = require("../../../assets/map image/water_new.png");
          } else if (parseInt(props.branch_name) === 3) {
            image = require("../../../assets/map image/electric.png");
          } else {
            image = require("../../../assets/map image/envelop.png");
          }
        }
        if (props.data === "play" && props.markers.length === index + 1) {
          image = require("../../../assets/map image/online.png");
        } else if (props.data !== "initial") {
          if (
            parseInt(props.branch_name) === 51 ||
            parseInt(props.branch_name) === 67
          ) {
            image = require("../../../assets/map image/water_new.png");
          } else if (parseInt(props.branch_name) === 3) {
            image = require("../../../assets/map image/electric.png");
          } else {
            image = require("../../../assets/map image/envelop.png");
          }
        }
        if (props.markers.length === index + 1 && props.last_data) {
          image = require("../../../assets/map image/online.png");
        }
        if (props.data === "bulk") {
          image = undefined;
          // if (parseInt(props.branch_name) === 51 || parseInt(props.branch_name) === 67) {
          //     image = require('../../../assets/map image/meter-notnormal.png')
          // }
        } else if (props.new_pickIndex === index) {
          image = require("../../../assets/map image/online.png");
        }
        if (num_bulk > 0) {
          image = undefined;
        }

        return (
          <Marker
            icon={{
              url: image,
              scaledSize: new window.google.maps.Size(30, 38),
            }}
            onClick={() => {
              props.onClickMarker(
                marker,
                index,
                lat,
                lng,
                marker.fetched_coordinates,
                props.data
              );
              props.onToggleOpen(index);
              // props.onMarkerClustererClick()
            }}
            key={marker.accom_id}
            position={{ lat: lat, lng: lng }}
            slug={marker.slug}
            noRedraw={true}
          >
            {props.isOpen[index] && (
              <InfoWindow
                onCloseClick={props.onToggleOpen}
                position={{ lat: lat, lng: lng }}
                options={{ disableAutoPan: true }}
              >
                {marker.fetched_coordinates === undefined ? (
                  <Typography color="inherit">
                    {marker.user_lname}&nbsp;{marker.user_fname}
                  </Typography>
                ) : (
                  <div style={{ opacity: 0.75, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, color: `#000` }}>
                      <Typography
                        color="inherit"
                        style={{ fontWeight: "bold" }}
                      >
                        {marker.meter_number} | {marker.accom_findings}
                      </Typography>
                      <Typography color="inherit">
                        {moment(marker.date_accom).format("LLL")}
                      </Typography>
                      <Typography color="inherit">
                        Bulk count: {num_bulk}
                      </Typography>
                    </div>
                  </div>
                )}
              </InfoWindow>
            )}
            {/* <img source={require('../../../assets/map image/electron-blue.png')} style={{ maxWidth: 40, maxHeight: 40 }}/> */}
          </Marker>
        );
      })}
    </MarkerClusterer>
  </GoogleMap>
));
export default function Mapv2() {
  const dispatch = useDispatch();
  const blmcData = useSelector((state) => state.Mapdash);
  const loginR = useSelector((state) => state.Login);
  const classes = useStyles();
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const matches = useMediaQuery("(max-width:420px)");

  const [viewport, setViewport] = useState({
    latitude: 13.7565,
    longitude: 121.0583,
    zoom: 10,
    width: "100vw",
    height: "50vw",
  });

  const [state, setState] = useState({
    initializeMarkers: "Test",
    onlinePeopleCount: 0,
    onMapUsers: [],
    date_start: new Date(),
    fieldman: [],
    count_fieldman: 0,
    fieldman_list: false,
    pie_graph: [
      {
        value: 0,
        title: "Accomplished",
      },
      {
        value: 0,
        title: "Remaining",
      },
      {
        value: 0,
        title: "Unassigned",
      },
    ],
    total_jo: 0,
    trackAccom: [],
    trackAccom2: [],
    fieldman2: [],
    time_accomplayback: [],
    count_val: 0,
    display_AccomPlayback: [],
    pause: false,
    buttons: false,
    time: "",
    user_pic: "",
    completeName: "",
    singleFieldmanDash: false,
    assign: 0,
    speed: 1,
    singleDetails: [],
    pickIndex: "",
    jo_accom_list: 0,
    assign2: 0,
    unassign: 0,
    singleFieldmanDash2: false,
    last_coordinates: "",
    count_attendance: 0,
    present: [],
    onField: [],
    absent: [],
    late: [],
    user_jobposition: [],
    position: "MESSENGER",
    onSubmitData: [],
    no_area: [],
    fieldman_map: [],
    attendance_array: [],
    delivery_type: [],
    fieldman_delivery_type: [],
    record_single_data: [],
    record_start_date: "",
    record_end_date: "",
    record_user_id: "",
    show_pin: "",
    route_bulk: 0,
    bulk_display: false,
    minimize: false,
    backlog: 0,
    last_data: "",
    new_pickIndex: 0,
    selectedPic: "",
    OpenPic: false,
    degree: 0,
    excel_invalid_data: [],
    branch_name: "",
    validation_type: "",
    summary_accom: false,
    memo_accom: false,
    memo_data: [],
    memo_details: [],
    discon: false,
    accom_diff: 0,
    openPDF: false,
    images_base_64: [],
    logo: "",
    date_start_val: new Date(),
    day_sched: [],
    fieldman_user_jobposition: "",
    summary_page: false,
    singele_history:'',
    date_history:new Date()
  });
  // let pause = false
  const [pause, setpause] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [line_data, setLine] = useState([]);
  const [line_data2, setLine2] = useState([]);
  const [history, setHistory] = useState(false);
  const [bulkData, setBulkData] = useState([]);
  const [isOpen, setIsOpen] = useState([]);

  const [mapOption, setmapOption] = useState({
    zoom: 12,
    lat: 13.7565,
    lng: 121.0583,
  });
  const playBackAccom = (details) => {
    if (state.display_AccomPlayback.length >= details.length) {
      state.display_AccomPlayback = [];
      state.count_val = 0;
    }
    setTimeout(() => {
      ShowMapMarkerPlayback(details, false);
    }, 1000);
  };

  const timerRef = React.useRef(null);
  const map = React.useRef();

  const speeds = React.useRef(1);
  const AnyReactComponent = ({
    user_id,
    latlng,
    complete_name,
    user_fname,
    user_lname,
    user_pic,
    details,
    location_status,
  }) => {
    var image = "";
    var image_pic = "";
    if (latlng !== null) {
      if (location_status === "Mocking") {
        image = require("../../../assets/map image/chi-gong.png");
      } else {
        image = require("../../../assets/map image/electron-blue.png");
      }
      if (user_pic !== "") {
        image_pic =
          "http://images.pacificweb.com.ph/pockethr/profilepic/" + user_pic;
      } else {
        image_pic = require("../../../assets/map image/user.png");
      }
    }
    return (
      <div
        className="tooltipparent"
        style={{ position: "absolute", transform: "translate(-50%, -100%)" }}
      >
        <HtmlTooltip
          color={"#2f3640"}
          title={
            <React.Fragment>
              <Typography color="inherit">
                {user_lname}&nbsp;{user_fname}
              </Typography>
            </React.Fragment>
          }
        >
          <div
            data-tip
            data-for={user_id}
            onClick={() => {
              getSingleUser(user_id, complete_name, user_pic, details);
            }}
            style={{ position: "relative" }}
          >
            <img
              src={image}
              style={{ maxWidth: 40, maxHeight: 40 }}
              className=" animated bounce"
            />
            <img
              style={{
                top: 4,
                left: 13,
                width: 14,
                height: 14,
                position: "absolute",
                borderRadius: 20,
              }}
              src={image_pic}
              className=" animated bounce"
            />
          </div>
        </HtmlTooltip>
      </div>
    );
  };

  const AnyReactComponentCoordinates = ({
    index,
    lat,
    lng,
    details,
    latlng,
    user_pic,
    play,
    lengthData,
    bulk,
    num_bulk,
    show_pin,
  }) => {
    var image = "";
    var image_pic = "";
    // console.log(details)
    if (latlng !== null) {
      if (
        play &&
        lengthData === index + 1 &&
        state.pickIndex == "" &&
        show_pin === ""
      ) {
        image = require("../../../assets/map image/electron-blue.png");
      } else {
        image = require("../../../assets/map image/default.png");
      }
      if (!play && lengthData === index + 1 && show_pin === "") {
        image = require("../../../assets/map image/electron-blue.png");
      }
      if (state.pickIndex === index && show_pin === "") {
        image = require("../../../assets/map image/electron-blue.png");
      }
      if (bulk) {
        image = require("../../../assets/map image/pin.png");
      }
      image_pic = require("../../../assets/map image/user.png");
    }
    return (
      <div
        style={{ position: "absolute", transform: "translate(-50%, -100%)" }}
      >
        <HtmlTooltip
          color={"#2f3640"}
          title={
            <React.Fragment>
              <Typography color="inherit">
                {details.meter_number} | {details.accom_findings}
              </Typography>
              <Typography color="inherit">
                {moment(details.date_accom).format("LLL")}
              </Typography>
              <Typography color="inherit">Bulk count: {num_bulk}</Typography>
            </React.Fragment>
          }
        >
          <div data-tip data-for={index} style={{ position: "relative" }}>
            <img
              onClick={() => {
                setState({
                  ...state,
                  singleDetails: [details],
                  pickIndex: index,
                });
              }}
              src={image}
              style={{ maxWidth: 40, maxHeight: 40 }}
              className=" animated bounce"
            />
            {/* <img style={{ top: 4, left: 13, width: 32, height: 32, position: 'absolute', borderRadius: 20 }} src={image_pic} className=" animated bounce" /> */}
          </div>
        </HtmlTooltip>

        {/* <ReactTooltip id={index}  >
               
            </ReactTooltip> */}
      </div>
    );
  };
  const AnyReactComponentCoordinatesBulk = ({
    index,
    lat,
    lng,
    details,
    latlng,
    user_pic,
    play,
    lengthData,
    bulk,
    num_bulk,
    show_pin,
  }) => {
    var image = "";
    var image_pic = "";
    // console.log(details)
    if (latlng !== null) {
      if (
        play &&
        lengthData === index + 1 &&
        state.pickIndex == "" &&
        show_pin === ""
      ) {
        image = require("../../../assets/map image/electron-blue.png");
      } else {
        image = require("../../../assets/map image/default.png");
      }
      if (!play && lengthData === index + 1 && show_pin === "") {
        image = require("../../../assets/map image/electron-blue.png");
      }
      if (state.pickIndex === index && show_pin === "") {
        image = require("../../../assets/map image/electron-blue.png");
      }
      if (bulk) {
        image = require("../../../assets/map image/pin.png");
      }
      image_pic = require("../../../assets/map image/user.png");
    }
    return (
      <div
        style={{ position: "absolute", transform: "translate(-50%, -100%)" }}
      >
        <HtmlTooltip
          color={"#2f3640"}
          title={
            <React.Fragment>
              <Typography color="inherit">
                {details.meter_number} | {details.accom_findings}
              </Typography>
              <Typography color="inherit">
                {moment(details.date_accom).format("LLL")}
              </Typography>
              <Typography color="inherit">Bulk count: {num_bulk}</Typography>
            </React.Fragment>
          }
        >
          <div data-tip data-for={index} style={{ position: "relative" }}>
            <img
              src={image}
              style={{ maxWidth: 40, maxHeight: 40 }}
              className=" animated bounce"
            />
            {/* <img style={{ top: 4, left: 13, width: 32, height: 32, position: 'absolute', borderRadius: 20 }} src={image_pic} className=" animated bounce" /> */}
          </div>
        </HtmlTooltip>

        {/* <ReactTooltip id={index}  >
               
            </ReactTooltip> */}
      </div>
    );
  };
  const ShowMapMarkerPlayback = (response, paramPause) => {
    if (paramPause) {
      clearTimeout(timerRef.current);
    } else {
      if (state.count_val != response.length) {
        timerRef.current = setTimeout(() => {
          let lat = 0.0;
          let long = 0.0;
          state.display_AccomPlayback.push(response[state.count_val]);
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
          state.count_val++;
          setState({
            ...state,
            trackAccom: [],
            time: timeStart,
            pickIndex: "",
            singleFieldmanDash2: true,
          });
          setFieldman_list(false);

          setrefresh(!refresh);
          ShowMapMarkerPlayback(response, paramPause);
        }, 1200 / speeds.current);
      } else {
        speeds.current = 1;
        setpause(false);
        clearTimeout(timerRef.current);
      }
    }
  };
  const stop = (details) => {
    // setState({ ...state, time: '', trackAccom: state.trackAccom2, display_AccomPlayback: [] })
    setState({
      ...state,
      display_AccomPlayback: [],
      trackAccom: state.trackAccom2,
      count_val: 0,
      time: "",
      pickIndex: "",
    });
    clearTimeout(timerRef.current);
    setpause(false);
  };
  // Activity Table Pagination
  const [fieldman_list, setFieldman_list] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showGraph, setShowGraph] = React.useState(false);

  const handleChangePage = (event, newPage) => {};
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // !Activity Table Pagination

  const [branches, setBranches] = useState({
    branches: [],
    companies: [],
    filteredBranch: [],
    Selectedcompany: 6,
    Selected_branch: 49,
    jo_type: "Reading",
  });
  useEffect(() => {
    dispatch_data("accomplishments_map", []);
    clock();
    userData();
    // goLiveData();
    getBranches();
    getAccomplishment();
    getAssignCount();
    requestsData();

    // console.log(window.google.maps)
    //    let map = new window.google.maps.Map()
    //    let panorama = map.getStreetView();
    // activityData();
  }, [state.refresh]);

  const [activeInfoBox, setActiveInfoBox] = useState({
    activeInfoBox: [],
    accomplishments: [],
  });

  const [infoBox, setInfoBox] = useState({
    visibility: "hidden",
  });

  const [requestInfoBox, setRequestInfoBox] = useState({
    visibility: "hidden",
  });

  const [activeJOBox, setActiveJOBox] = useState({
    activeJODetails: "hidden",
  });

  const [filterBoard, setFilterBoard] = useState({
    HomeVisibility: "hidden",
    branchesVisibility: "none",
    companiesVisibility: "none",
    positionVisibility: "none",
    dateVisibility: "none",
    activityVisibility: "none",
  });

  const [initialBoard, setInitialBoard] = useState({
    visibility: "visible",
  });

  const handleOpenInfoBox = (infoid, type) => {
    const activeData = blmcData.userData.filter((info) => {
      return info.user_id === infoid;
    });

    setActiveInfoBox({
      ...state,
      activeInfoBox: activeData,
    });
    if (type === "userInfo") {
      setInfoBox({ visibility: "visible" });
      setInitialBoard({ visibility: "hidden" });
    } else if (type === "requestInfo") {
      setRequestInfoBox({ visibility: "visible" });
      setInitialBoard({ visibility: "hidden" });
    }
    activityData(infoid);

    // activityData(e.currentTarget.dataset.userid)
  };

  const handleCloseInfoBox = (type) => {
    if (type === "userInfo") {
      setInfoBox({ visibility: "hidden" });
      setInitialBoard({ visibility: "visible" });
    } else if (type === "requestInfo") {
      setRequestInfoBox({ visibility: "hidden" });
      setInitialBoard({ visibility: "visible" });
    }

    // setInfoBox({ visibility: 'hidden' })
    setActiveInfoBox({
      accomplishments: [],
      activeInfoBox: [],
    });
    // setInitialBoard({ visibility: 'visible' })
  };

  const getBranches = () => {
    getData(
      "HumanResource/getHandleBranch",
      {
        user_id: localStorage.getItem("u"),
      },
      state.discon
    ).then((response) => {
      let match_branch = response.response.filter(
        (val) => parseInt(branches.Selected_branch) === parseInt(val.branch_id)
      );
      if (match_branch.length > 0) {
        getMapData();
      }
      let company = [];
      response.response.map((item) => {
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
      dispatch_data("gethandleBranch", response.response);
      dispatch_data("company_name", company);
      const branches_data = response.response.filter(
        (val) => val.company_id == "6"
      );
      branches_data.sort(function (a, b) {
        return a["branch_name"].localeCompare(b["branch_name"]);
      });
      dispatch_data("SelectedBranches", branches_data);
      // dispatch_data('SelectedBranches', [])
    });
  };

  const getAssignCount = (e) => {};

  const goLiveData = () => {
    setTimeout(() => {
      userData();
      requestsData();
      goLiveData();
    }, 3000);
  };

  const getAccomplishment = () => {};

  const showFullMap = (state) => {
    setmapOption({ ...mapOption, lat: undefined, lng: undefined });
    setInitialBoard({ visibility: state });
  };
  //FilterBoard
  const showFilterBoard = (state) => {
    setFilterBoard({
      ...filterBoard,
      HomeVisibility: state,
    });
  };

  // !FilterBoard

  const [open, setOpen] = React.useState(false);
  const [openRecord, setOpenRecord] = React.useState(false);

  const [openPie, setOpenPie] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let MarkerSize = 20;

  const userData = () => {};

  const requestsData = () => {};

  const activityData = (userId) => {};

  const setActiveJo = (jobOrderId) => {
    setState({
      ...state,
      initializeMarkers: "Activity",
    });
    handleCloseInfoBox();
    const activityLocation = [];
    let activeJo = blmcData.activeDriverActivity.filter(
      (jo) => jo.job_order_id == jobOrderId
    );
    var Originlatlng = String(activeJo[0].origin_latlng);
    var Osplitlatlng = Originlatlng.split(",");
    var olat = parseFloat(Osplitlatlng[0]);
    var olng = parseFloat(Osplitlatlng[1]);

    var Destinationlatlng = String(activeJo[0].destination_latlng);
    var Dsplitlatlng = Destinationlatlng.split(",");
    var dlat = parseFloat(Dsplitlatlng[0]);
    var dlng = parseFloat(Dsplitlatlng[1]);
    activityLocation.push(
      {
        type: "origin",
        lat: olat,
        lng: olng,
      },
      {
        type: "destination",
        lat: dlat,
        lng: dlng,
      }
    );

    setActiveJOBox({
      activeJODetails: "visible",
    });
    dispatch({
      type: "setBlmLocationActivity",
      activityLocation: activityLocation,
      activeJOData: activeJo,
    });
  };
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const filterCompany = (company) => {
    let filteredBranch = branches.branches.filter(
      (branch) => branch.company_id == company
    );
    setBranches({
      ...branches,
      filteredBranch: filteredBranch,
    });

    setFilterBoard({
      ...filterBoard,
      branchesVisibility: "block",
    });
    // console.log(filteredBranch);
  };

  const filterBranch = (branch) => {
    const users = state.onMapUsers.filter((user) => user.branch_id == branch);
    // const bounds = new maps.LatLngBounds();
    setState({
      ...state,
      initializeMarkers: users,
    });

    setmapOption({
      ...state,
      zoom: 12,
    });
    // users.map((location) => {
    //     bounds.extend(
    //         new maps.LatLng(location.latitude, location.longitude),
    //     )
    // });
  };

  const FieldUser = [
    { id: 1, name: "Juan Dela Cruz", status: "Active" },
    { id: 2, name: "Ben Louie Casapao", status: "Idle" },
    { id: 3, name: "JP Ysalina", status: "Active" },
    { id: 4, name: "Angelo malabanan", status: "Idle" },
    { id: 5, name: "Lester Santos", status: "Inactive" },
  ];

  const testFunction = () => {
    setmapOption({
      ...state,
      // zoom: 17,
      lat: 13.755303,
      lng: 121.0712453,
    });
  };

  // Google Maps
  const getMapOptions = (maps) => {
    return {
      streetViewControl: true,
      scaleControl: false,
      fullscreenControl: false,
      zoomControl: false,
      styles: [],
      gestureHandling: "greedy",
      disableDoubleClickZoom: false,
      mapTypeControl: false,

      mapTypeId: maps.MapTypeId.HYBRID,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.TOP_LEFT,
        mapTypeIds: [
          maps.MapTypeId.ROADMAP,
          maps.MapTypeId.SATELLITE,
          maps.MapTypeId.HYBRID,
        ],
      },

      zoomControl: false,
      clickableIcons: false,
    };
  };

  const UserMarker = ({ profileImg, lat, lng, userId, locationStatus }) => {
    switch (locationStatus) {
      case "Available":
        return (
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -100%)",
              zIndex: 1000,
            }}
            onClick={() => handleOpenInfoBox(userId, "userInfo")}
          >
            <img
              height="28px"
              width="28px"
              style={{
                position: "fixed",
                borderRadius: 100,
                marginLeft: 12.6,
                marginTop: 4,
              }}
              src={profileImg}
              alt=""
            />
            <img
              src={DefaultMarker}
              style={{ maxWidth: 55, maxHeight: 55, cursor: "pointer" }}
              alt=""
            />
          </div>
        );
      case "Unavailable":
        return (
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -100%)",
            }}
            onClick={() => handleOpenInfoBox(userId, "userInfo")}
          >
            <img
              height="28px"
              width="28px"
              style={{
                position: "fixed",
                borderRadius: 100,
                marginLeft: 12.6,
                marginTop: 4,
              }}
              src={profileImg}
              alt=""
            />
            <img
              src={OnTripMarker}
              style={{ maxWidth: 55, maxHeight: 55, cursor: "pointer" }}
              alt=""
            />
          </div>
        );
      case "":
        return (
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -100%)",
            }}
            onClick={() => handleOpenInfoBox(userId, "userInfo")}
          >
            <img
              height="28px"
              width="28px"
              style={{
                position: "fixed",
                borderRadius: 100,
                marginLeft: 12.6,
                marginTop: 4,
              }}
              src={profileImg}
              alt=""
            />
            <img
              src={IdleMarker}
              style={{ maxWidth: 55, maxHeight: 55, cursor: "pointer" }}
              alt=""
            />
          </div>
        );
    }
  };

  const Requestmarker = ({ lat, lng, joId, RequestLocationStatus }) => {
    switch (RequestLocationStatus) {
      case "Queue":
        return (
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -100%)",
            }}
            onClick={() => handleOpenInfoBox(joId, "requestInfo")}
          >
            <img
              src={QueueRequestMarker}
              style={{ maxWidth: 30, maxHeight: 30, cursor: "pointer" }}
              alt=""
            />
          </div>
        );
      case "Picked up":
        return (
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -100%)",
            }}
            onClick={() => handleOpenInfoBox(joId, "requestInfo")}
          >
            <img
              src={OnTransitActivityMarker}
              style={{ maxWidth: 30, maxHeight: 30, cursor: "pointer" }}
              alt=""
            />
          </div>
        );
      case "Cancelled":
        return (
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -100%)",
            }}
            onClick={() => handleOpenInfoBox(joId, "requestInfo")}
          >
            <img
              src={CancelledMarker}
              style={{ maxWidth: 30, maxHeight: 30, cursor: "pointer" }}
              alt=""
            />
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const JobOrderMarkerFrom = ({ lat, lng, joId }) => {
    return (
      <div
        style={{ position: "absolute", transform: "translate(-50%, -100%)" }}
        data-joid={joId}
        onClick={handleOpenInfoBox}
      >
        <img
          src={MarkerFrom}
          style={{ maxWidth: 55, maxHeight: 55, cursor: "pointer" }}
          alt=""
        />
      </div>
    );
  };

  const JobOrderMarkerTo = ({ lat, lng, joId }) => {
    return (
      <div
        style={{ position: "absolute", transform: "translate(-50%, -100%)" }}
        data-joid={joId}
        onClick={handleOpenInfoBox}
      >
        <img
          src={MarkerTo}
          style={{ maxWidth: 55, maxHeight: 55, cursor: "pointer" }}
          alt=""
        />
      </div>
    );
  };

  const TestMaker = () => {};

  const closeActiveJO = (e) => {
    setActiveJOBox({
      activeJODetails: "hidden",
    });
    userData();
  };
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start_val: date,
    });
  };
  const handleDateChangeStartRecord = (date) => {
    setState({
      ...state,
      record_start_date: date,
    });
  };
  const handleDateChangeEndRecord = (date) => {
    setState({
      ...state,
      record_end_date: date,
    });
  };
  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  // const onSubmit = (e) => {
  //     e.preventDefault();
  //     // let data = {
  //     //     parameter: 'branch_id',
  //     //     reference: state.reference,
  //     //     selection: state.branch_id,
  //     //     date_start: moment(state.date_start).format('YYYY-MM-DD'),
  //     //     type: 'download',
  //     //     date_end: moment(state.date_end).format('YYYY-MM-DD'),
  //     //     company_id: state.company
  //     // }
  //     // if (state.branch_id == '') {
  //     //     NotificationManager.warning('Warning', 'Please complete the details', 5000, true)
  //     // } else {
  //     //     dispatch_data('accomLoading', true)
  //     //     getAccomplishments(data).then((response) => {
  //     //         if (response.accomplishment.length != 0) {
  //     //             dispatch_data('SelectedBranch', state.branch_id)
  //     //             dispatch_data('dateFrom', moment(state.date_start).format('LL'))
  //     //             dispatch_data('dateTo', moment(state.date_end).format('LL'))
  //     //             NotificationManager.info('Generating Data', 'Data successfully generated', 5000, true)
  //     //             setState({ ...state, disable: false })
  //     //         } else {
  //     //             NotificationManager.warning('No Data', 'No record found in selected date or branch', 5000, true)
  //     //         }
  //     //         dispatch_data('accomLoading', false)
  //     //         dispatch_data('accomplishment', response.accomplishment)
  //     //         dispatch_data('getLogo', response.logo)
  //     //     })
  //     // }
  //     // setPage(0)
  // }
  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });
    dispatch_data("SelectedBranches", branches_data);
    setBranches({
      ...branches,
      Selectedcompany: e.target.value,
    });
  };
  const onChangeBranch = (e) => {
    setBranches({
      ...branches,
      Selected_branch: e.target.value,
    });
  };
  const onChangeJoType = (e) => {
    setBranches({
      ...branches,
      jo_type: e.target.value,
    });
  };
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  const getMapData = () => {
    dispatch_data("loading_map", true);
    let data = {
      parameter: "branch_id",
      selection: [branches.Selected_branch],
      from: moment(state.date_start_val).format("YYYY-MM-DD"),
      to: moment(state.date_start_val).format("YYYY-MM-DD"),
      company_id: branches.Selectedcompany,
    };
    setOpen(false);
    getData("tracking/trackEmployeesLocationv4", data, state.discon).then(
      (res) => {
        console.log(res);
        let backlog = 0;
        if (res.backlogresultassign[0]["jo_count"] !== null) {
          backlog =
            parseInt(res.backlogresultassign[0]["jo_count"]) -
            parseInt(res.backLogresultaccomplish);
          if (backlog < 0) {
            backlog = 0;
          }
        }
        // let logo = ''
        // if(res.company.length >0){
        //   logo = res.company[0].logo_base64
        // }

        let count = 0;
        let jo_assign = 0;
        let jo_accom_list = 0;
        let with_jo = [];
        let with_out_jo = [];
        let latlng = "";
        let present = [];
        let onField = [];
        let absent = [];
        let late = [];
        let user_jobposition = [];
        let hours = [];
        let no_area = [];
        let match_position = [];
        let excel_invalid_data = [];
        let branch_name = "";

        res.fieldman.map((val) => {
          branch_name = val.branch_name;
          let match = false;
          match_position.map((val_pos) => {
            if (val_pos === String(val.user_jobposition).toUpperCase()) {
              match = true;
            }
          });
          if (!match) {
            match_position.push(String(val.user_jobposition).toUpperCase());
          }
        });
        let pos_data = JSON.stringify(match_position).includes("MESSENGER");

        let jo_aubd = 0;
        let jo_dn = 0;
        let jo_dn_reout = 0;
        let jo_meco = 0;
        let jo_nac = 0;
        let jo_ncr = 0;
        let jo_osb = 0;
        let jo_osn = 0;
        let jo_soa = 0;
        let jo_soa_reout = 0;

        jo_aubd += parseInt(res.jobcount.jo_aubd);
        jo_dn += parseInt(res.jobcount.jo_dn);
        jo_dn_reout += parseInt(res.jobcount.jo_dn_reout);
        jo_meco += parseInt(res.jobcount.jo_meco);
        jo_nac += parseInt(res.jobcount.jo_nac);
        jo_ncr += parseInt(res.jobcount.jo_ncr);
        jo_osb += parseInt(res.jobcount.jo_osb);
        jo_osn += parseInt(res.jobcount.jo_osn);
        jo_soa += parseInt(res.jobcount.jo_soa);
        jo_soa_reout += parseInt(res.jobcount.jo_soa_reout);
        let new_fieldman = [];
        let rescue = [];

        res.fieldman.map((val) => {
          if (state.position === "SHOW ALL" || pos_data === false) {
            new_fieldman.push(val);
          } else {
            if (String(val.user_jobposition).toUpperCase() === state.position) {
              new_fieldman.push(val);
            }
          }

          let match_pos = false;
          user_jobposition.map((val_user_pos, index2) => {
            if (
              val_user_pos.position ===
              String(val.user_jobposition).toUpperCase()
            ) {
              match_pos = true;
            }
          });
          if (!match_pos) {
            user_jobposition.push({
              position: String(val.user_jobposition).toUpperCase(),
            });
          }
          val.batch.map((val_batch) => {
            if (val_batch.jo_rescue !== "") {
              let rescue_array = JSON.parse(val_batch.jo_rescue);
              rescue_array.map((val_rescue) => {
                rescue.push(val_rescue);
              });
            }
          });
        });
        console.log(state.date_start);
        new_fieldman.map((val, index_val) => {
          let exceldata = [];
          if (parseInt(val.batch[0].jo_count) > 0) {
            exceldata = getExcelData(
              val,
              moment(state.date_start_val).format("YYYY-MM-DD")
            );
          }
          exceldata.map((valexcel) => {
            excel_invalid_data.push(valexcel);
          });
          let new_jo_assign = 0;
          val.batch.map((val_batch, index) => {
            new_jo_assign += parseInt(val_batch.jo_count);
            let match = false;
            if (val_batch.jo_count > 0 && index === 0) {
              count++;
              match = true;
            }
            if (match) {
              with_jo.push(val);
              latlng = val.location_latlng;
            } else {
              if (index === 0) {
                with_out_jo.push(val);
              }
            }

            jo_assign += parseInt(val_batch.jo_count);
          });
          new_fieldman[index_val]["count"] = new_jo_assign;
          jo_accom_list += parseInt(val.jo_accom_list.length);

          if (val.attendance.length === 0) {
            absent.push(val);
          } else {
            if (parseInt(val.batch[0].jo_count) > 0) {
              present.push(val);
            } else {
              let filter = rescue.filter(
                (rescue_filter) => rescue_filter.id === val.user_id
              );
              if (filter.length > 0) {
                present.push(val);
              }
            }
            if (
              String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
              String(val.user_jobposition).toUpperCase() === "METER READER"
            ) {
              if (
                moment(val.attendance[0].date_added).format("HH:mm") >
                moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
              ) {
                if (val.batch[0].jo_count > 0) {
                  late.push(val);
                }
              }
              if (parseInt(val.batch[0].jo_count) === 0) {
                no_area.push(val);
              }
            } else {
              // present.push(val);
            }
          }
          if (val.jo_accom > 0 && val.attendance.length < 4) {
            onField.push(val);
          }
        });

        with_out_jo.map((val) => {
          with_jo.push(val);
        });
        let latlong = String(latlng);
        let splitlatlng = latlong.split(",");
        let lat = parseFloat(splitlatlng[0]);
        let lng = parseFloat(splitlatlng[1]);

        let assign = jo_assign;
        let unassign = parseInt(res.joborder) - assign;
        if (unassign < 0) {
          unassign = 0;
        }
        let total_jo = 0;
        if (assign !== 0) {
          total_jo = assign + unassign;
        }
        if (assign === 0) {
          unassign = 0;
        }

        let pie_graph = [
          { title: "Accomplished", value: jo_accom_list },
          { title: "Remaining", value: assign - jo_accom_list },
          { title: "Unassigned", value: unassign },
        ];
        for (let index = 0; index < 17; index++) {
          const details = {
            time: moment("2020-01-01 4:00").add(index, "hours").format("HH:mm"),
            count: 0,
            fetched_coordinates: "",
            fieldmanCount: 0,
            fieldmanArray: [],
            cumulative: 0,
            total_jo: total_jo,
          };
          hours.push(details);
        }
        let total_accom = 0;
        let index_match = "";
        let last_accom_time = "";
        new_fieldman.map((val) => {
          val.jo_accom_list.map((val_accom, index3) => {
            let time_emp = moment(val_accom.date_accom).format("HH:mm");
            if (last_accom_time === "") {
              last_accom_time = time_emp;
            } else {
              if (last_accom_time < time_emp) {
                last_accom_time = time_emp;
              }
            }
          });
        });

        hours.map((val_hours, index) => {
          let time_data = parseInt(String(val_hours.time).split(":")[0]);
          new_fieldman.map((val) => {
            val.jo_accom_list.map((val_accom, index3) => {
              let time_data_employee = parseInt(
                String(moment(val_accom.date_accom).format("HH:mm")).split(
                  ":"
                )[0]
              );
              if (time_data === time_data_employee) {
                total_accom++;
                let match_name = val_hours.fieldmanArray.find(
                  (val_nm) => val_nm === val.completename
                );
                if (match_name === undefined) {
                  val_hours.fieldmanArray.push(val.completename);
                  val_hours.fieldmanCount += 1;
                }
                if (index_match === "") {
                  index_match = index;
                }
                val_hours.count += 1;
              }
            });
          });
          if (time_data > parseInt(String(last_accom_time).split(":")[0])) {
            val_hours.cumulative = undefined;
          } else {
            val_hours.cumulative += total_accom;
          }
        });

        setLine2(hours);
        let data_type = [
          { type: "AUBD", count: jo_aubd },
          { type: "DN", count: jo_dn },
          { type: "MECO", count: jo_meco },
          { type: "NAC", count: jo_nac },
          { type: "NCR", count: jo_ncr },
          { type: "OSB", count: jo_osb },
          { type: "OSN", count: jo_osn },
          { type: "SOA", count: jo_soa },
          { type: "REO DN", count: jo_dn_reout },
          { type: "REO SOA", count: jo_soa_reout },
        ];
        dispatch_data("loading_map", false);

        // with_jo.sort(sortFunction);
        if (lat !== 0) {
          setmapOption({ ...mapOption, lat: lat, lng: lng });
        }

        setState({
          ...state,
          present: present,
          absent: absent,
          late: late,
          onField: onField,
          count_fieldman: count,
          fieldman: with_jo,
          jo_accom_list: jo_accom_list,
          assign: assign,
          unassign: unassign,
          fieldman2: with_jo,
          pie_graph: pie_graph,
          total_jo: parseInt(total_jo),
          singleFieldmanDash: false,
          display_AccomPlayback: [],
          user_jobposition: user_jobposition,
          onSubmitData: res,
          no_area: no_area,
          trackAccom2: [],
          trackAccom: [],
          singleFieldmanDash2: false,
          delivery_type: data_type,
          backlog: backlog,
          excel_invalid_data: excel_invalid_data,
          branch_name: branch_name,
          logo: res.company,
          date_start: state.date_start_val,
        });
        setFieldman_list(false);
      }
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLine2([]);
    getMapData();
  };
  const sortFunction = (a, b) => {
    if (a["count"] === b["count"]) {
      return 0;
    } else {
      return a["count"] > b["count"] ? -1 : 1;
    }
  };
  const get_bulk = (row) => {
    setFieldman_list(false);
    setBulkData(row);
    setState({ ...state, fieldman2: [], bulk_display: true });
  };
  const bulk_route = () => {
    let match_data = [];
    bulkData.map((val) => {
      let match = JSON.stringify(match_data).includes(val.fetched_coordinates);
      if (!match) {
        match_data.push(val.fetched_coordinates);
      }
    });
    let count = 0;
    if (match_data.length - 1 >= state.route_bulk) {
      count = state.route_bulk;

      let latlong = match_data[count];
      let splitlatlng = 0;
      let lat = 0;
      let lng = 0;
      splitlatlng = latlong.split(",");
      lat = splitlatlng[0];
      lng = splitlatlng[1];
      let zoom = 18;
      if (parseInt(lat) === 0) {
        zoom = 8;
      }
      setmapOption({
        ...mapOption,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: zoom,
      });
      // }
      if (match_data.length - 1 > count) {
        setState({ ...state, route_bulk: count + 1 });
      } else {
        setState({ ...state, route_bulk: 0 });
      }
    }
  };

  const onTrackAccomplishments = (
    pic,
    user_id,
    date,
    name,
    assign,
    attendance_count,
    attendance,
    value,
    bulk_data_new,
    type
  ) => {
    console.log(value)
    setLine([]);
    let data = {
      user_id: user_id,
      date: moment(date).format("YYYY-MM-DD"),
    };
    let date_history = moment(date).format("YYYY-MM-DD")
    dispatch_data("loading_map", true);
    setFieldman_list(!fieldman_list);
    getData("tracking/trackAccomplishments", data, state.discon).then((res) => {
      let jo_aubd = 0;
      let jo_dn = 0;
      let jo_dn_reout = 0;
      let jo_meco = 0;
      let jo_nac = 0;
      let jo_ncr = 0;
      let jo_osb = 0;
      let jo_osn = 0;
      let jo_soa = 0;
      let jo_soa_reout = 0;

      value.batch.map((val_batch, index) => {
        jo_aubd += parseInt(val_batch.jo_aubd);
        jo_dn += parseInt(val_batch.jo_dn);
        jo_dn_reout += parseInt(val_batch.jo_dn_reout);
        jo_meco += parseInt(val_batch.jo_meco);
        jo_nac += parseInt(val_batch.jo_nac);
        jo_ncr += parseInt(val_batch.jo_ncr);
        jo_osb += parseInt(val_batch.jo_osb);
        jo_osn += parseInt(val_batch.jo_osn);
        jo_soa += parseInt(val_batch.jo_soa);
        jo_soa_reout += parseInt(val_batch.jo_soa_reout);
      });

      let data_type = [
        { type: "AUBD", count: jo_aubd },
        { type: "DN", count: jo_dn },
        { type: "MECO", count: jo_meco },
        { type: "NAC", count: jo_nac },
        { type: "NCR", count: jo_ncr },
        { type: "OSB", count: jo_osb },
        { type: "OSN", count: jo_osn },
        { type: "SOA", count: jo_soa },
        { type: "REO DN", count: jo_dn_reout },
        { type: "REO SOA", count: jo_soa_reout },
      ];

      let last_coordinates = "";
      if (res.accomplishment.length > 0) {
        var latlong = "";
        var splitlatlng = "";
        var lat = "";
        var lng = "";
        var complete_name = "";
        for (let index = 0; index < res.accomplishment.length; index++) {
          latlong = String(res.accomplishment[index].fetched_coordinates);
          splitlatlng = latlong.split(",");
          lat = splitlatlng[0];
          lng = splitlatlng[1];
          if (parseInt(lat) !== 0) {
            setmapOption({
              ...mapOption,
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              zoom: 13,
            });
            break;
          }
        }
        // res.accomplishment.map((val) => {
        // if(res.accomplishment[0].fetched_coordinates !== 0){

        // })

        let hours = [];
        for (let index = 0; index < 17; index++) {
          const details = {
            time: moment("2020-01-01 5:00").add(index, "hours").format("HH:mm"),
            count: 0,
            battery: undefined,
            fetched_coordinates: "",
            cumulative: 0,
            total_jo: assign,
          };

          hours.push(details);
        }
        let index_match = "";
        let end = false;
        let total_accom = 0;
        let prev_battery = 0;
        hours.map((val_hours, index) => {
          if (index_match === "") {
            val_hours.battery = 100;
          }
          let time_data = parseInt(String(val_hours.time).split(":")[0]);

          res.accomplishment.map((val, index2) => {
            // var latlong = ""
            // var splitlatlng = ""

            // var complete_name = ""
            // latlong = String(val.fetched_coordinates)
            // splitlatlng = latlong.split(",")
            // var lat = parseFloat(splitlatlng[0])
            // var lng = parseFloat(splitlatlng[1])
            // val['lat'] = lat
            // val['lng'] = lng

            last_coordinates = val.fetched_coordinates;
            let time_data_employee = parseInt(
              String(moment(val.date_accom).format("HH:mm")).split(":")[0]
            );
            if (time_data === time_data_employee) {
              total_accom++;

              if (index_match === "") {
                index_match = index;
              }
              if (index_match === index) {
                if (val_hours.count === 0) {
                  val_hours.battery = parseInt(val.accom_battery_life);
                  prev_battery = parseInt(val.accom_battery_life);
                }
              } else {
                val_hours.battery = parseInt(val.accom_battery_life);
                prev_battery = parseInt(val.accom_battery_life);
              }
              val_hours.count += 1;
              val_hours.fetched_coordinates = val.fetched_coordinates;
            } else {
              if (index_match !== "") {
                if (index2 <= res.accomplishment.length - 1) {
                  if (time_data_employee >= time_data) {
                    val_hours.battery = parseInt(prev_battery);
                  }
                }
              }
            }
            if (index2 === res.accomplishment.length - 1) {
              if (time_data_employee < time_data) {
                end = true;
              }
            }
          });
          if (end) {
            val_hours.count = undefined;
            val_hours.cumulative = undefined;
          } else {
            val_hours.cumulative += total_accom;
          }

          // if(index_match === ''){
          //     val_hours.count = undefined

          // }
        });

        setLine(hours);
      }
      let last_accomplishents = new Date();
      let first_accomplishents = new Date();
      if (res.accomplishment.length > 0) {
        last_accomplishents = new Date(
          res.accomplishment[res.accomplishment.length - 1].date_accom
        );
        first_accomplishents = new Date(res.accomplishment[0].date_accom);
      }
      var oneDay = 24 * 60 * 60 * 1000;
      var date1 = first_accomplishents;
      var date2 = last_accomplishents;

      var diffDays = Math.abs(
        ((date1.getTime() - date2.getTime()) / oneDay) * 24
      );
      let hours_diff = 0;
      if (diffDays < 1) {
        hours_diff = parseInt(diffDays * 60) + " " + "mins.";
      } else {
        let new_hours = parseInt(diffDays);
        let mins = (parseFloat(diffDays).toFixed(2) - new_hours) * 60;
        hours_diff =
          new_hours + " " + "hr." + "  " + parseInt(mins) + " " + "mins.";
      }

      setBulkData(bulk_data_new);
      // back()
      if(type === 'History'){
        setFieldman_list(false)
      }
     
      setState({
        ...state,
        date_history,date_history,
        fieldman_delivery_type: data_type,
        attendance_array: attendance,
        last_coordinates: last_coordinates,
        trackAccom: res.accomplishment,
        trackAccom2: res.accomplishment,
        fieldman2: [],
        buttons: true,
        user_pic: pic,
        completeName: name,
        singleFieldmanDash: true,
        singleFieldmanDash2: true,
        display_AccomPlayback: [],
        assign2: assign,
        count_val: 0,
        pickIndex: "",
        count_attendance: attendance_count,
        accom_diff: hours_diff,
        singele_history:type,
      });
     setHistory(false)
      dispatch_data("loading_map", false);
    });
  };
  const onChangePosition = (position) => {
    setLine2([]);
    setFieldman_list(false);
    setShowGraph(false);
    let count = 0;
    let jo_assign = 0;
    let jo_accom_list = 0;
    let with_jo = [];
    let with_out_jo = [];
    let latlng = "";
    let present = [];
    let onField = [];
    let absent = [];
    let late = [];
    let user_jobposition = [];
    let count_All_emp = 0;
    let no_area = [];
    let hours = [];

    let jo_aubd = 0;
    let jo_dn = 0;
    let jo_dn_reout = 0;
    let jo_meco = 0;
    let jo_nac = 0;
    let jo_ncr = 0;
    let jo_osb = 0;
    let jo_osn = 0;
    let jo_soa = 0;
    let jo_soa_reout = 0;
    jo_aubd += parseInt(state.onSubmitData.jobcount.jo_aubd);
    jo_dn += parseInt(state.onSubmitData.jobcount.jo_dn);
    jo_dn_reout += parseInt(state.onSubmitData.jobcount.jo_dn_reout);
    jo_meco += parseInt(state.onSubmitData.jobcount.jo_meco);
    jo_nac += parseInt(state.onSubmitData.jobcount.jo_nac);
    jo_ncr += parseInt(state.onSubmitData.jobcount.jo_ncr);
    jo_osb += parseInt(state.onSubmitData.jobcount.jo_osb);
    jo_osn += parseInt(state.onSubmitData.jobcount.jo_osn);
    jo_soa += parseInt(state.onSubmitData.jobcount.jo_soa);
    jo_soa_reout += parseInt(state.onSubmitData.jobcount.jo_soa_reout);
    // console.log(state.onSubmitData)
    state.onSubmitData.fieldman.map((val, index_val) => {
      if (String(position).toUpperCase() === "SHOW ALL") {
        let new_jo_assign = 0;
        count_All_emp++;

        val.batch.map((val_batch, index) => {
          new_jo_assign += parseInt(val_batch.jo_count);
          let match = false;
          if (val_batch.jo_count > 0 && index === 0) {
            count++;
            match = true;
          }
          if (match) {
            with_jo.push(val);
            latlng = val.location_latlng;
          } else {
            if (index === 0) {
              with_out_jo.push(val);
            }
          }

          // jo_aubd += parseInt(val_batch.jo_aubd)
          // jo_dn += parseInt(val_batch.jo_dn)
          // jo_dn_reout += parseInt(val_batch.jo_dn_reout)
          // jo_meco += parseInt(val_batch.jo_meco)
          // jo_nac += parseInt(val_batch.jo_nac)
          // jo_ncr += parseInt(val_batch.jo_ncr)
          // jo_osb += parseInt(val_batch.jo_osb)
          // jo_osn += parseInt(val_batch.jo_osn)
          // jo_soa += parseInt(val_batch.jo_soa)
          // jo_soa_reout += parseInt(val_batch.jo_soa_reout)

          jo_assign += parseInt(val_batch.jo_count);
        });

        state.onSubmitData.fieldman[index_val]["count"] = new_jo_assign;
        jo_accom_list += parseInt(val.jo_accom_list.length);

        if (val.attendance.length === 0) {
          absent.push(val);
        } else {
          if (parseInt(val.batch[0].jo_count) > 0) {
            present.push(val);
          }
          if (
            String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
            String(val.user_jobposition).toUpperCase() === "METER READER"
          ) {
            if (
              moment(val.attendance[0].date_added).format("HH:mm") >
              moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
            ) {
              if (parseInt(val.batch[0].jo_count) > 0) {
                late.push(val);
              }
            }
            if (parseInt(val.batch[0].jo_count) === 0) {
              no_area.push(val);
            }
          } else {
            // present.push(val);
          }
        }
        if (val.jo_accom > 0 && val.attendance.length < 4) {
          onField.push(val);
        }
      } else {
        if (
          String(val.user_jobposition).toUpperCase() ===
          String(position).toUpperCase()
        ) {
          count_All_emp++;
          let new_jo_assign = 0;
          val.batch.map((val_batch, index) => {
            new_jo_assign += parseInt(val_batch.jo_count);
            let match = false;
            if (val_batch.jo_count > 0 && index === 0) {
              count++;
              match = true;
            }
            if (match) {
              with_jo.push(val);
              latlng = val.location_latlng;
            } else {
              if (index === 0) {
                with_out_jo.push(val);
              }
            }
            // jo_aubd += parseInt(val_batch.jo_aubd)
            // jo_dn += parseInt(val_batch.jo_dn)
            // jo_dn_reout += parseInt(val_batch.jo_dn_reout)
            // jo_meco += parseInt(val_batch.jo_meco)
            // jo_nac += parseInt(val_batch.jo_nac)
            // jo_ncr += parseInt(val_batch.jo_ncr)
            // jo_osb += parseInt(val_batch.jo_osb)
            // jo_osn += parseInt(val_batch.jo_osn)
            // jo_soa += parseInt(val_batch.jo_soa)
            // jo_soa_reout += parseInt(val_batch.jo_soa_reout)

            jo_assign += parseInt(val_batch.jo_count);
          });

          state.onSubmitData.fieldman[index_val]["count"] = new_jo_assign;
          jo_accom_list += parseInt(val.jo_accom_list.length);

          if (val.attendance.length === 0) {
            absent.push(val);
          } else {
            if (parseInt(val.batch[0].jo_count) > 0) {
              present.push(val);
            }
            if (
              String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
              String(val.user_jobposition).toUpperCase() === "METER READER"
            ) {
              if (
                moment(val.attendance[0].date_added).format("HH:mm") >
                moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
              ) {
                if (parseInt(val.batch[0].jo_count) > 0) {
                  late.push(val);
                }
              }
              if (parseInt(val.batch[0].jo_count) === 0) {
                no_area.push(val);
              }
            }
          }
          if (val.jo_accom > 0 && val.attendance.length < 4) {
            onField.push(val);
          }
        }
      }
    });

    with_out_jo.map((val) => {
      with_jo.push(val);
    });
    let latlong = String(latlng);
    let splitlatlng = latlong.split(",");
    let lat = parseFloat(splitlatlng[0]);
    let lng = parseFloat(splitlatlng[1]);
    if (lat !== 0) {
      setmapOption({ ...mapOption, lat: lat, lng: lng });
    }
    let assign = jo_assign;
    let unassign = 0;
    unassign = parseInt(state.onSubmitData.joborder) - assign;

    if (unassign < 0) {
      unassign = 0;
    }
    let total_jo = 0;
    if (assign !== 0) {
      total_jo = assign + unassign;
    }

    let pie_graph = [
      { title: "Accomplished", value: jo_accom_list },
      { title: "Remaining", value: assign - jo_accom_list },
      { title: "Unassigned", value: unassign },
    ];

    for (let index = 0; index < 17; index++) {
      const details = {
        time: moment("2020-01-01 4:00").add(index, "hours").format("HH:mm"),
        count: 0,
        fetched_coordinates: "",
        fieldmanCount: 0,
        fieldmanArray: [],
        cumulative: 0,
        total_jo: total_jo,
      };
      hours.push(details);
    }
    let total_accom = 0;
    let index_match = "";
    let last_accom_time = "";
    state.onSubmitData.fieldman.map((val) => {
      if (state.position === "SHOW ALL") {
        val.jo_accom_list.map((val_accom, index3) => {
          let time_emp = moment(val_accom.date_accom).format("HH:mm");
          if (last_accom_time === "") {
            last_accom_time = time_emp;
          } else {
            if (last_accom_time < time_emp) {
              last_accom_time = time_emp;
            }
          }
        });
      } else if (String(val.user_jobposition).toUpperCase() === position) {
        val.jo_accom_list.map((val_accom, index3) => {
          let time_emp = moment(val_accom.date_accom).format("HH:mm");
          if (last_accom_time === "") {
            last_accom_time = time_emp;
          } else {
            if (last_accom_time < time_emp) {
              last_accom_time = time_emp;
            }
          }
        });
      }
    });

    hours.map((val_hours, index) => {
      let time_data = parseInt(String(val_hours.time).split(":")[0]);
      state.onSubmitData.fieldman.map((val) => {
        if (state.position === "SHOW ALL") {
          val.jo_accom_list.map((val_accom, index3) => {
            let time_data_employee = parseInt(
              String(moment(val_accom.date_accom).format("HH:mm")).split(":")[0]
            );
            if (time_data === time_data_employee) {
              total_accom++;
              let match_name = val_hours.fieldmanArray.find(
                (val_nm) => val_nm === val.completename
              );
              if (match_name === undefined) {
                val_hours.fieldmanArray.push(val.completename);
                val_hours.fieldmanCount += 1;
              }
              if (index_match === "") {
                index_match = index;
              }
              val_hours.count += 1;
            }
          });
        } else if (String(val.user_jobposition).toUpperCase() === position) {
          val.jo_accom_list.map((val_accom, index3) => {
            let time_data_employee = parseInt(
              String(moment(val_accom.date_accom).format("HH:mm")).split(":")[0]
            );
            if (time_data === time_data_employee) {
              total_accom++;
              let match_name = val_hours.fieldmanArray.find(
                (val_nm) => val_nm === val.completename
              );
              if (match_name === undefined) {
                val_hours.fieldmanArray.push(val.completename);
                val_hours.fieldmanCount += 1;
              }
              if (index_match === "") {
                index_match = index;
              }
              val_hours.count += 1;
            }
          });
        }
      });
      if (time_data > parseInt(String(last_accom_time).split(":")[0])) {
        val_hours.cumulative = undefined;
      } else {
        val_hours.cumulative += total_accom;
      }
    });

    setLine2(hours);
    let data_type = [
      { type: "AUBD", count: jo_aubd },
      { type: "DN", count: jo_dn },
      { type: "MECO", count: jo_meco },
      { type: "NAC", count: jo_nac },
      { type: "NCR", count: jo_ncr },
      { type: "OSB", count: jo_osb },
      { type: "OSN", count: jo_osn },
      { type: "SOA", count: jo_soa },
      { type: "REO DN", count: jo_dn_reout },
      { type: "REO SOA", count: jo_soa_reout },
    ];

    // with_jo.sort(sortFunction);

    setState({
      ...state,
      present: present,
      absent: absent,
      late: late,
      onField: onField,
      count_fieldman: count,
      fieldman: with_jo,
      position: position,
      jo_accom_list: jo_accom_list,
      assign: assign,
      unassign: unassign,
      fieldman2: with_jo,
      pie_graph: pie_graph,
      total_jo: parseInt(total_jo),
      display_AccomPlayback: [],
      no_area: no_area,
      trackAccom2: [],
      trackAccom: [],
      delivery_type: data_type,
      singleFieldmanDash: false,
    });
    dispatch_data("loading_map", false);
  };
  const clock = () => {
    var hour = moment(new Date()).format("hh:mm:ss A");

    document.getElementById("clock").innerText = hour;
    setTimeout(() => {
      clock();
    }, 1000);
  };
  const getAccomALl = (data) => {
    getData("tracking/trackAccomplishmentsAllFieldman", data).then((res) => {});
  };
  const getRecord = (user_id, row) => {
    console.log(row);
    dispatch_data("loading_map", true);
    setHistory(true);
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentDay = new Date();
    const details = {
      firstDay: moment(firstDay).format("YYYY-MM-DD"),
      currentDay: moment(currentDay).format("YYYY-MM-DD"),
      user_id: user_id,
      branch_id: branches.Selected_branch,
    };
    let day_sched = row.day_sched;
    let user_jobposition = row.user_jobposition;

    getData("tracking/getAccomplishementRecord", details, state.discon).then(
      (res) => {
        setState({
          ...state,
          record_single_data: res,
          record_start_date: firstDay,
          record_end_date: currentDay,
          record_user_id: user_id,
          day_sched: day_sched,
          fieldman_user_jobposition: user_jobposition,
        });
        dispatch_data("loading_map", false);
      }
    );
  };
  const changeGetRecord = (e) => {
    dispatch_data("loading_map", true);
    setOpenRecord(false);
    e.preventDefault();
    const firstDay = state.record_start_date;
    const currentDay = state.record_end_date;
    const details = {
      firstDay: moment(firstDay).format("YYYY-MM-DD"),
      currentDay: moment(currentDay).format("YYYY-MM-DD"),
      user_id: state.record_user_id,
      branch_id: branches.Selected_branch,
    };
    getData("tracking/getAccomplishementRecord", details, state.discon).then(
      (res) => {
        setState({
          ...state,
          record_single_data: res,
          record_start_date: firstDay,
          record_end_date: currentDay,
        });
        dispatch_data("loading_map", false);
      }
    );
  };
  const onClickMarker = (details, index, lat, lng, fetch_coor, data) => {
    setmapOption({ ...mapOption, lat: undefined, lng: undefined });
    if (fetch_coor !== undefined && data !== "bulk") {
      setState({
        ...state,
        singleDetails: [details],
        pickIndex: index + 1,
        minimize: true,
        new_pickIndex: index,
      });
    }
  };
  const onClickMarker2 = (details, index, lat, lng, fetch_coor, data) => {
    // setmapOption({ ...mapOption, lat: undefined, lng: undefined })
    if (fetch_coor !== undefined && data !== "bulk") {
      setState({
        ...state,
        singleDetails: [details],
        pickIndex: index + 1,
        minimize: true,
        new_pickIndex: index,
      });
    }
  };
  const onNext = (index) => {
    if (index < state.trackAccom2.length) {
      let details = state.trackAccom2[index];
      var latlong = "";
      var splitlatlng = "";
      var lat = "";
      var lng = "";
      var complete_name = "";
      latlong = String(details.fetched_coordinates);
      splitlatlng = latlong.split(",");
      lat = splitlatlng[0];
      lng = splitlatlng[1];
      setmapOption({
        ...mapOption,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: 20,
      });
      setState({
        ...state,
        singleDetails: [details],
        new_pickIndex: index,
        pickIndex: 1,
      });
      // props.onToggleOpen(index)
      let isOpen = {
        [index]: true,
      };
      setIsOpen(isOpen);
    }
  };
  const onPrevious = (index) => {
    if (index >= 0) {
      let details = state.trackAccom2[index];
      var latlong = "";
      var splitlatlng = "";
      var lat = "";
      var lng = "";
      var complete_name = "";
      latlong = String(details.fetched_coordinates);
      splitlatlng = latlong.split(",");
      lat = splitlatlng[0];
      lng = splitlatlng[1];
      setmapOption({
        ...mapOption,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: 20,
      });
      setState({ ...state, singleDetails: [details], new_pickIndex: index });
    }
    let isOpen = {
      [index]: true,
    };
    setIsOpen(isOpen);
  };
  const onToggleOpen = (index) => {
    let isOpen = {
      [index]: true,
    };
    setIsOpen(isOpen);
  };
  const handleRadioChange = (e) => {
    dispatch_data("loading_map", true);

    let accom_id = "";
    state.singleDetails.map((val, index) => {
      accom_id = val.accom_id;
    });
    let data = {
      value: e.target.value,
      user_id: localStorage.getItem("u"),
      accom_id: accom_id,
    };
    let val2 = e.target.value;
    getData("tracking/onChangeValidation", data, state.discon).then((res) => {
      if (res.response === true) {
        state.singleDetails.map((val, index) => {
          val.validator_remarks = val2;
        });
        setState({ ...state });
      }
      dispatch_data("loading_map", false);
    });
  };
  const getExcelData = (row, date) => {
    console.log(date);
    let assign = 0;
    let bulk = 0;
    let bulk2 = -10;
    let prev_coordinates = "";
    let bulk_val = false;
    let bulk_data = [];
    let bulk_data_new = [];
    row.batch.map((val) => {
      assign += parseInt(val.jo_count);
    });
    var latlong = "";
    var splitlatlng = "";
    var lat = "";
    var lng = "";
    var complete_name = "";
    let upload_count = 0;
    row.jo_accom_list.map((val) => {
      if (val.accom_images !== "" && val.accom_images !== null) {
        upload_count++;
      }
      if (val.fetched_coordinates === prev_coordinates) {
        bulk++;
        bulk_data.push(val);
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
    let late = 1;
    if (row.attendance.length !== 0) {
      if (
        moment(row.attendance[0].date_added).format("LT") >
        moment("2021-01-01 " + row.day_sched.attn_in).format("LT")
      ) {
        late = 0;
      }
    }
    let remaining = assign - row.jo_accom_list.length;
    if (remaining < 0) {
      remaining = 0;
    }
    let data = [];
    let bulk_value = 1;
    let time1 = 0;
    let time2 = 0;
    let time3 = 0;
    let time4 = 0;
    let completeness_val = 1;
    let upload_count_val = 0;

    if (bulk2 > 0) {
      bulk_value = 0;
    }
    if (row.attendance.length > 0) {
      time1 = 1;
    }
    if (row.attendance.length > 1) {
      time2 = 1;
    }
    if (row.attendance.length > 2) {
      time3 = 1;
    }
    if (row.attendance.length > 3) {
      time4 = 1;
    }
    if (remaining > 0) {
      completeness_val = 0;
    }
    if (upload_count >= row.jo_accom_list.length) {
      upload_count_val = 1;
    }
    let total = parseInt(
      time1 +
        time2 +
        time3 +
        time4 +
        late +
        completeness_val +
        bulk_value +
        upload_count_val +
        2
    );

    data.push({
      FieldmanID: row.user_id,
      FieldmanName: row.completename,
      position: row.user_jobposition,
      branch: row.branch_name,
      date: date,
      time1: time1,
      time2: time2,
      time3: time3,
      time4: time4,
      late: late,
      completeness: completeness_val,
      bulk: bulk_value,
      fieldFindings: 1,
      battery: 1,
      upload: upload_count_val,
      bulk_data: bulk2,
      completeness_data: remaining,
      total: total,
      delivered: row.jo_accom_list.length,
    });
    // if (bulk2 > 0) {
    //     data.push({
    //         FieldmanID: row.user_id,
    //         FieldmanName: row.completename,
    //         position: row.user_jobposition,
    //         branch: row.branch_name,
    //         date: date,
    //         type: 'Bulk',
    //         value: bulk2
    //     })
    // }
    // if (late > 0) {
    //     data.push({
    //         FieldmanID: row.user_id,
    //         FieldmanName: row.completename,
    //         position: row.user_jobposition,
    //         branch: row.branch_name,
    //         date: date,
    //         type: 'Tardiness',
    //         value: late
    //     })
    // }
    // if (remaining > 0) {
    //     data.push({
    //         FieldmanID: row.user_id,
    //         FieldmanName: row.completename,
    //         position: row.user_jobposition,
    //         branch: row.branch_name,
    //         date: date,
    //         type: 'Completeness',
    //         value: remaining
    //     })
    // }
    return data;
  };
  const handleChange = (event) => {
    setState({
      ...state,
      refresh: !state.refresh,
      [event.target.name]: event.target.checked,
    });
  };
  const generateMemo = (user_id) => {
    console.log(state.excel_invalid_data);
    let data = state.excel_invalid_data.filter(
      (val) => val.FieldmanID === user_id
    );
    getData(
      "tracking/generate_memo_SOA2",
      {
        data: data,
        user_id: localStorage.getItem("u"),
        branch_id: branches.Selected_branch,
      },
      state.discon
    ).then((res) => {
      let data_res = res;
      let control_no = "";
      let fieldmanName = "";
      let date_created_val = "";
      let branch_name = "";
      let memo_data = data_res.response;
      let date_accom = "";
      let total_delivered = "";
      let total_pending = "";
      let total_bulk = "";
      let approver_1 = null;
      let approver_2 = null;
      let approver_3 = null;
      memo_data.map((val) => {
        let date_created = String(val.date_created).split("-");
        let c_no =
          date_created[0] +
          "-" +
          date_created[1] +
          "-" +
          val.memo_received_list_id;
        memo_data = val;
        memo_data["control_no"] = c_no;
        date_created_val = moment(val.date_created).format("YYYY-MM-DD");
        let fman_data = JSON.parse(val.memo_details);
        control_no = c_no;
        approver_1 = val.approver_1;
        approver_2 = val.approver_2;
        approver_3 = val.approver_3;
        fman_data.map((val_fman) => {
          console.log(val_fman);
          fieldmanName = val_fman.FieldmanName;
          branch_name = val_fman.branch;
          date_accom = val_fman.date;
          total_delivered = val_fman.delivered;
          total_pending = val_fman.completeness_data;
          total_bulk = val_fman.bulk_data;
        });
      });
      let details = [];
      details["control_no"] = control_no;
      details["fieldmanName"] = fieldmanName;
      details["branch_name"] = branch_name;
      details["date_created_val"] = date_created_val;
      details["date_accom"] = date_accom;
      details["total_delivered"] = total_delivered;
      details["total_pending"] = total_pending;
      details["total_bulk"] = total_bulk;
      details["approver_1"] = approver_1;
      details["approver_2"] = approver_2;
      details["approver_3"] = approver_3;
      console.log(details);

      let new_details = [];
      new_details.push(details);
      setState({
        ...state,
        memo_accom: true,
        memo_details: data_res.memo_details,
        memo_data: new_details,
      });
    });
  };
  const back = () => {
    setState({ ...state, summary_page: false });
  };
  return (
    <div style={{ textAlign: "left" }}>
      <Backdrop
        className={classes.backdrop}
        open={map_reducer.loading_map}
        style={{ zIndex: 999999999 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <div
          style={{
            position: "fixed",
            zIndex: 2,
            visibility: filterBoard.HomeVisibility,
            top: 70,
          }}
        >
          <div
            className={classes.filterBox}
            style={{
              height: 200,
              width: 250,
              marginLeft: 290,
              position: "absolute",
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={6}>
                  <span>Filter</span>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}></Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: -20 }}
                className={classes.whiteText}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Scrollbars style={{ height: 150 }}>
                    <Table
                      className={classes.table}
                      style={{ marginTop: 10 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        <TableRow hover>
                          <TableCell
                            onClick={(e) =>
                              setFilterBoard({
                                ...filterBoard,
                                positionVisibility: "block",
                              })
                            }
                            className={classes.allTable}
                          >
                            Position
                          </TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell
                            onClick={(e) =>
                              setFilterBoard({
                                ...filterBoard,
                                companiesVisibility: "block",
                              })
                            }
                            className={classes.allTable}
                          >
                            Branches
                          </TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell
                            onClick={(e) =>
                              setFilterBoard({
                                ...filterBoard,
                                activityVisibility: "block",
                              })
                            }
                            className={classes.allTable}
                          >
                            Activity
                          </TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell
                            onClick={(e) =>
                              setFilterBoard({
                                ...filterBoard,
                                dateVisibility: "block",
                              })
                            }
                            className={classes.allTable}
                          >
                            Date
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Scrollbars>
                </Grid>
              </Grid>
            </div>
          </div>

          <div
            className={classes.filterBox}
            style={{
              height: 200,
              width: 250,
              marginLeft: 550,
              display: filterBoard.positionVisibility,
              position: "absolute",
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={6}>
                  <span>Position</span>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", marginTop: -12 }}
                >
                  <IconButton aria-label="delete">
                    <CloseIcon
                      onClick={(e) =>
                        setFilterBoard({
                          ...filterBoard,
                          positionVisibility: "none",
                        })
                      }
                      style={{ color: "#fff" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: -20 }}
                className={classes.whiteText}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Scrollbars style={{ height: 150 }}>
                    <Table
                      className={classes.table}
                      style={{ marginTop: 10 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody></TableBody>
                    </Table>
                  </Scrollbars>
                </Grid>
              </Grid>
            </div>
          </div>

          <div
            className={classes.filterBox}
            style={{
              height: 250,
              width: 270,
              marginLeft: 550,
              display: filterBoard.companiesVisibility,
              position: "absolute",
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={6}>
                  <span>Select Company</span>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", marginTop: -12 }}
                >
                  <IconButton aria-label="delete">
                    <CloseIcon
                      onClick={(e) =>
                        setFilterBoard({
                          ...filterBoard,
                          companiesVisibility: "none",
                        })
                      }
                      style={{ color: "#fff" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: -20 }}
                className={classes.whiteText}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Scrollbars style={{ height: 150, marginTop: 10 }}>
                    <Table
                      className={classes.table}
                      style={{ marginTop: 10 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        {branches.companies.map((row) => (
                          <TableRow hover key={row.companyId}>
                            <TableCell
                              onClick={() => filterCompany(row.companyId)}
                              className={classes.allTable}
                            >
                              {row.companyName}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbars>
                </Grid>
              </Grid>
            </div>
          </div>

          <div
            className={classes.filterBox}
            style={{
              height: 200,
              width: 250,
              marginLeft: 550,
              display: filterBoard.activityVisibility,
              position: "absolute",
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={6}>
                  <span>Activity</span>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", marginTop: -12 }}
                >
                  <IconButton aria-label="delete">
                    <CloseIcon
                      onClick={(e) =>
                        setFilterBoard({
                          ...filterBoard,
                          activityVisibility: "none",
                        })
                      }
                      style={{ color: "#fff" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: -20 }}
                className={classes.whiteText}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Scrollbars style={{ height: 150 }}>
                    <Table
                      className={classes.table}
                      style={{ marginTop: 10 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody></TableBody>
                    </Table>
                  </Scrollbars>
                </Grid>
              </Grid>
            </div>
          </div>

          <div
            className={classes.filterBox}
            style={{
              height: 200,
              width: 250,
              marginLeft: 550,
              display: filterBoard.dateVisibility,
              position: "absolute",
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={6}>
                  <span>Date</span>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", marginTop: -12 }}
                >
                  <IconButton aria-label="delete">
                    <CloseIcon
                      onClick={(e) =>
                        setFilterBoard({
                          ...filterBoard,
                          dateVisibility: "none",
                        })
                      }
                      style={{ color: "#fff" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: -20 }}
                className={classes.whiteText}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Scrollbars style={{ height: 150 }}>
                    <Table
                      className={classes.table}
                      style={{ marginTop: 10 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody></TableBody>
                    </Table>
                  </Scrollbars>
                </Grid>
              </Grid>
            </div>
          </div>

          <div
            className={classes.filterBox}
            style={{
              height: 250,
              width: 270,
              marginLeft: 550,
              display: filterBoard.branchesVisibility,
              position: "absolute",
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={6}>
                  <span>Branches</span>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", marginTop: -12 }}
                >
                  <IconButton aria-label="delete">
                    <CloseIcon
                      onClick={(e) =>
                        setFilterBoard({
                          ...filterBoard,
                          branchesVisibility: "none",
                        })
                      }
                      style={{ color: "#fff" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: -20 }}
                className={classes.whiteText}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Scrollbars style={{ height: 150 }}>
                    <Table
                      className={classes.table}
                      style={{ marginTop: 10 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        {branches.filteredBranch.map((row) => (
                          <TableRow hover key={row.branch_id}>
                            <TableCell
                              onClick={() => filterBranch(row.branch_id)}
                              className={classes.allTable}
                            >
                              {row.branch_name}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbars>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          width: 250,
          height: 10,
          position: "fixed",
          zIndex: 2,
          left: 18,
          top: 70,
        }}
      >
        {/* <Autocomplete
                    size='small'
                    style={{ color: '#000' }}
                    id="free-solo-demo"
                    freeSolo
                    options={FieldUser.map((option) => option.name)}
                    renderInput={(params) => (
                        < TextField
                            style={{ backgroundColor: '#fff', borderRadius: 5 }}
                            size={'small'}
                            {...params} label="Search on Map" margin="normal" variant="outlined">
                        </ TextField>
                    )}
                /> */}
        { state.summary_page?undefined: history ? (
          <>
            <Button
              display={"none"}
              variant="contained"
              color="#7f8c8d"
              className={classes.button}
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setHistory(false);
              }}
            >
              {" "}
              Back
            </Button>
            <Button
              style={{ position: "fixed", zIndex: 2, left: 120 }}
              variant="contained"
              color="#7f8c8d"
              className={classes.button}
              startIcon={<FilterListIcon />}
              onClick={() => {
                setOpenRecord(true);
              }}
            >
              Filter
            </Button>
            {home_reducer.SelectedBranches.map((val, index) => {
              if (val.branch_id === branches.Selected_branch) {
                return (
                  <div
                    style={{
                      zIndex: 3,
                      position: "fixed",
                      left: 230,
                      background: "rgba(0,0,0,0.6)",
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                      {val.branch_name}
                    </Typography>
                  </div>
                );
              }
            })}
          </>
        ) : (
          state.singele_history === 'History'?<Button
          display={"none"}
          variant="contained"
          color="#7f8c8d"
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            setState({
              ...state,
              bulk_display: false,
              fieldman_map: state.fieldman,
              last_coordinates: "",
              singleFieldmanDash: false,
              singleFieldmanDash2: false,
              buttons: false,
              trackAccom2: [],
              trackAccom: [],
              pickIndex: "",
              time: "",
              validation_type: "",
              singele_history:false
            });
            setFieldman_list(false)
            setHistory(true);
          }}
        >
          {" "}
          Back
        </Button> :
          <>
            <Button
              style={{ position: "fixed", zIndex: 2 }}
              variant="contained"
              color="#7f8c8d"
              className={classes.button}
              startIcon={<FilterListIcon />}
              onClick={() => {
                setOpen(true);
                setFieldman_list(false);
                setShowGraph(false);
              }}
            >
              Filter
            </Button>
            {state.user_jobposition.length > 0 ? (
              <>
                <div
                  style={{
                    width: 200,
                    position: "fixed",
                    zIndex: 2,
                    left: 130,
                  }}
                >
                  <form onSubmit={onSubmit}>
                    <Button
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
                    width: 200,
                    position: "fixed",
                    zIndex: 2,
                    left: 258,
                    backgroundColor: "#fff",
                  }}
                >
                  <select
                    style={{ width: 200, height: 37 }}
                    value={state.position}
                    onChange={(e) => {
                      onChangePosition(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Filter Position
                    </option>
                    <option value={"SHOW ALL"}>SHOW ALL</option>
                    {state.user_jobposition.map((val, index) => {
                      return (
                        <option key={index} value={val.position}>
                          {val.position}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {state.singleFieldmanDash2 === false ? (
                  <>
                    <div
                      onClick={() => {
                        setFieldman_list(false);
                        setShowGraph(true);
                      }}
                      style={{
                        cursor: "pointer",
                        width: 200,
                        zIndex: 3,
                        position: "fixed",
                        left: 470,
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
                        setState({ ...state, summary_page: true });
                      }}
                      style={{
                        cursor: "pointer",
                        width: 200,
                        zIndex: 3,
                        position: "fixed",
                        left: 510,
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
                  </>
                ) : undefined}
                <div
                  style={{
                    zIndex: 3,
                    position: "fixed",
                    left: 555,
                    background: "rgba(0,0,0,0.6)",
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                    {state.branch_name}
                  </Typography>
                </div>

                {/* {home_reducer.SelectedBranches.map((val, index) => {
                                if (val.branch_id === branches.Selected_branch) {
                                    return <div style={{ zIndex: 3, position: 'fixed', left: 520, top: 12, background: 'rgba(0,0,0,0.6)', paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
                                        <Typography style={{ color: '#fff', fontWeight: 'bold' }}>{val.branch_name}</Typography>

                                    </div>
                                }
                            })

                            } */}
              </>
            ) : undefined}
          </>
        )}
      </div>
      {/* {bulkData.length > 0 ? <div style={{ cursor: 'pointer' }} onClick={() => { bulk_route() }} ><div style={{ cursor: 'pointer', position: 'fixed', zIndex: 2, right: 85, top: 75 }}>
                <PersonPinCircleIcon
                    style={{ color: '#e74c3c', fontSize: 40, background: 'rgba(0,0,0,0.6)' }} />
            </div>
                <div style={{ position: 'fixed', zIndex: 2, right: 85, top: 90, fontWeight: 'bold' }}>
                    <Typography style={{ color: '#fff', fontSize: 20 }}>{bulkData.length}</Typography>
                </div>
            </div> : undefined

            } */}
      {/* Buttons Shows */}
      <div style={{ position: "fixed", zIndex: 2, right: 20 }}>
        <IconButton
          onClick={(event) =>
            showFullMap(
              initialBoard.visibility === "visible" ? "hidden" : "visible"
            )
          }
          aria-label="delete"
        >
          <CallMadeIcon style={{ color: "#fff" }} />
        </IconButton>
      </div>

      {/* First Left Dashboard */}
      {/* <div style={{ position: 'fixed', zIndex: 2, right: 223,top:10 }}>
                <IconButton onClick={(event) =>setHistory(!history)} aria-label="delete">
                    <HistoryIcon
                        style={{ color: '#fff',fontSize:30 }} />
                </IconButton>
            </div> */}

      <div>
        <div
          style={{
            cursor: "pointer",
            height: 50,
            width: 136,
            right: 150,
            top: 10,
            position: "fixed",
            zIndex: 2,
          }}
        >
          <Switch
            checked={state.discon}
            onChange={handleChange}
            color="primary"
            name="discon"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div
          className={classes.dashboards}
          style={{
            cursor: "pointer",
            height: 50,
            width: 136,
            right: 80,
            top: 10,
            position: "fixed",
            zIndex: 2,
            visibility: initialBoard.visibility,
          }}
        >
          <div style={{ padding: 15 }}>
            <Typography
              id="clock"
              style={{ fontSize: 18, color: "#fff" }}
            ></Typography>
          </div>
        </div>
        {state.singleFieldmanDash === true ? (
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
                onClick={() =>
                  setState({
                    ...state,
                    validation_type: "Valid",
                    minimize: true,
                  })
                }
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
                    {state.trackAccom2.reduce((count, val) => {
                      if (val.validator_remarks === "Valid") {
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
                onClick={() =>
                  setState({
                    ...state,
                    validation_type: "Invalid",
                    minimize: true,
                  })
                }
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
                    {state.trackAccom2.reduce((count, val) => {
                      if (val.validator_remarks === "Invalid") {
                        count++;
                      }
                      return count;
                    }, 0)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        ) : undefined}
      </div>

      {!state.summary_page && history ? (
        // <div style={{ cursor: 'pointer', height: 580, width: 1100, margin: 18, top: 70, position: 'fixed', zIndex: 2, visibility: initialBoard.visibility,backgrounColor:'red' }}>
        <Records
          user_id={state.record_user_id}
          record_single_data={state.record_single_data}
          record_start_date={state.record_start_date}
          record_end_date={state.record_end_date}
          branch_name={state.branch_name}
          day_sched={state.day_sched}
          user_jobposition={state.fieldman_user_jobposition}
          branch_id={branches.Selected_branch}
          discon={state.discon}
          logo={state.logo}
          company_id={branches.Selectedcompany}
          onTrackAccomplishments={onTrackAccomplishments}
          back={()=>setHistory(false)}

        />
      ) : !state.summary_page ? (
        // </div>
        <div style={{ display: history ? "none" : undefined }}>
          <div>
            {state.singele_history === 'History'?  <div
              className={classes.dashboards}
              style={{
                cursor: "pointer",
                height: 150,
                width: 300,
                margin: 18,
                top: 98,
                position: "fixed",
                zIndex: 2,
                visibility: initialBoard.visibility,
                
              }}
            >
              <div style={{margin:15}}>
              <Typography style={{color:'#fff',fontSize:17}}>{state.branch_name}</Typography>
              <Typography style={{color:'#fff',fontSize:16}}>{moment(state.date_history).format('LL')}</Typography>
                </div>
             
            </div>:
            <div
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 150,
              width: 300,
              margin: 18,
              top: 98,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div
              style={{ padding: 15 }}
              onClick={() => {
                setBulkData([]);
                setShowGraph(false);
                setFieldman_list(true);
                clearTimeout(timerRef.current);
                setpause(false);
                setState({
                  ...state,
                  bulk_display: false,
                  fieldman_map: state.fieldman,
                  last_coordinates: "",
                  singleFieldmanDash: false,
                  singleFieldmanDash2: false,
                  buttons: false,
                  trackAccom2: [],
                  trackAccom: [],
                  pickIndex: "",
                  time: "",
                  validation_type: "",
                });
              }}
            >
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(state.date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {state.count_fieldman + "/" + state.fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>

                <Grid></Grid>
              </Grid>
              <div
                style={{
                  padding: 15,
                  position: "absolute",
                  left: 160,
                  top: -10,
                }}
              >
                <Grid container className={classes.whiteText} spacing={1}>
                  <Grid
                    item
                    xs={12}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGraph(false);
                      setFieldman_list(true);
                      clearTimeout(timerRef.current);
                      setpause(false);
                      setState({
                        ...state,
                        fieldman_map: state.present,
                        last_coordinates: "",
                        singleFieldmanDash: false,
                        singleFieldmanDash2: false,
                        buttons: false,
                        trackAccom2: [],
                        trackAccom: [],
                        pickIndex: "",
                        time: "",
                      });
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
                          color: "#2ecc71",
                        }}
                      >
                        Present : {state.present.length}
                      </Typography>
                    </div>

                    {/* <Typography style={{ fontSize: 14,fontWeight:'bold' ,marginRight:10}}>25</Typography> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGraph(false);
                      setFieldman_list(true);
                      clearTimeout(timerRef.current);
                      setpause(false);
                      setState({
                        ...state,
                        fieldman_map: state.late,
                        last_coordinates: "",
                        singleFieldmanDash: false,
                        singleFieldmanDash2: false,
                        buttons: false,
                        trackAccom2: [],
                        trackAccom: [],
                        pickIndex: "",
                        time: "",
                      });
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
                          color: "#f3a683",
                        }}
                      >
                        Late : {state.late.length}
                      </Typography>
                    </div>

                    {/* <Typography style={{ fontSize: 14,fontWeight:'bold' ,marginRight:10}}>25</Typography> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGraph(false);
                      setFieldman_list(true);
                      clearTimeout(timerRef.current);
                      setpause(false);
                      setState({
                        ...state,
                        fieldman_map: state.onField,
                        last_coordinates: "",
                        singleFieldmanDash: false,
                        singleFieldmanDash2: false,
                        buttons: false,
                        trackAccom2: [],
                        trackAccom: [],
                        pickIndex: "",
                        time: "",
                      });
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
                          color: "#ecf0f1",
                        }}
                      >
                        On field : {state.onField.length}
                      </Typography>
                    </div>

                    {/* <Typography style={{ fontSize: 14,fontWeight:'bold',marginRight:10 }}>25</Typography> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGraph(false);
                      setFieldman_list(true);
                      clearTimeout(timerRef.current);
                      setpause(false);
                      setState({
                        ...state,
                        fieldman_map: state.no_area,
                        last_coordinates: "",
                        singleFieldmanDash: false,
                        singleFieldmanDash2: false,
                        buttons: false,
                        trackAccom2: [],
                        trackAccom: [],
                        pickIndex: "",
                        time: "",
                      });
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
                          color: "#9b59b6",
                        }}
                      >
                        No Assign : {state.no_area.length}
                      </Typography>
                    </div>
                    {/* <Typography style={{ fontSize: 14,fontWeight:'bold' }}>25</Typography> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGraph(false);
                      setFieldman_list(true);
                      clearTimeout(timerRef.current);
                      setpause(false);
                      setState({
                        ...state,
                        fieldman_map: state.absent,
                        last_coordinates: "",
                        singleFieldmanDash: false,
                        singleFieldmanDash2: false,
                        buttons: false,
                        trackAccom2: [],
                        trackAccom: [],
                        pickIndex: "",
                        time: "",
                      });
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
                          color: "#ff7979",
                        }}
                      >
                        Absent : {state.absent.length}
                      </Typography>
                    </div>
                    {/* <Typography style={{ fontSize: 14,fontWeight:'bold' }}>25</Typography> */}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>

            }
          
            {state.singleFieldmanDash2 === false ? (
              <>
                <div>
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
                          <Typography style={{ fontSize: 18 }}>
                            Total JO
                          </Typography>
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
                            <Typography
                              style={{ fontSize: 35, color: "#3498db" }}
                            >
                              {formatNumber(state.total_jo)}
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
                              APF :{" "}
                              {isNaN(state.total_jo / state.count_fieldman)
                                ? 0
                                : parseInt(
                                    state.total_jo / state.count_fieldman
                                  )}
                            </Typography>
                          </div>
                          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Typography style={{ fontSize: 18, color: '#fff' }}>BL : {state.backlog}</Typography>
                                                    </div> */}
                        </Grid>
                        {/* <Grid item xs={12} >

                                        <div>
                                            <Typography style={{ fontSize: 18, color: '#fff' }}>APF : {isNaN(state.total_jo / state.count_fieldman) ? 0 : parseInt(state.total_jo / state.count_fieldman)}</Typography>
                                        </div>
                                    </Grid> */}
                      </Grid>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className={classes.dashboards}
                    style={{
                      cursor: "pointer",
                      height: 140,
                      width: 500,
                      top: 253,
                      margin: 18,
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
                              {formatNumber(state.assign)}
                            </Typography>
                            <Typography style={{ fontSize: 20, color: "#fff" }}>
                              {isNaN(state.assign / state.total_jo)
                                ? 0
                                : parseFloat(
                                    (state.assign / state.total_jo) * 100
                                  ).toFixed(2)}
                              %
                            </Typography>
                            <Typography style={{ fontSize: 15 }}>
                              Assigned
                            </Typography>
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
                              {formatNumber(state.unassign)}
                            </Typography>
                            <Typography style={{ fontSize: 20, color: "#fff" }}>
                              {isNaN(state.unassign / state.total_jo)
                                ? 0
                                : parseFloat(
                                    (state.unassign / state.total_jo) * 100
                                  ).toFixed(2)}
                              %
                            </Typography>
                            <Typography style={{ fontSize: 15 }}>
                              Unassigned
                            </Typography>
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
                              {formatNumber(state.jo_accom_list)}
                            </Typography>
                            <Typography style={{ fontSize: 20, color: "#fff" }}>
                              {isNaN(state.jo_accom_list / state.total_jo)
                                ? 0
                                : parseFloat(
                                    (state.jo_accom_list / state.total_jo) * 100
                                  ).toFixed(2)}
                              %
                            </Typography>
                            <Typography style={{ fontSize: 15 }}>
                              Accomplished
                            </Typography>
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
                              {state.assign - state.jo_accom_list < 0
                                ? 0
                                : formatNumber(
                                    state.assign - state.jo_accom_list
                                  )}
                            </Typography>
                            <Typography style={{ fontSize: 20, color: "#fff" }}>
                              {isNaN(state.assign / state.total_jo)
                                ? 0
                                : parseFloat(
                                    ((state.assign - state.jo_accom_list) /
                                      state.total_jo) *
                                      100
                                  ).toFixed(2)}
                              %
                            </Typography>
                            <Typography style={{ fontSize: 15 }}>
                              Remaining
                            </Typography>
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
                </div>
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
                      top: 398,
                      margin: 18,
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
                        <PieGrap pieGraph={state.pie_graph} />
                      </div>
                      {/* </Grid> */}
                    </div>
                    <div style={{ width: "40%", padding: 15 }}>
                      {}
                      {state.delivery_type.map((val, index) => {
                        let width_type = "45%";
                        let width_asteris = "20%";
                        state.delivery_type.map((val_type) => {
                          if (
                            val_type.type === "RE-OUT DN" &&
                            val_type.count === 0
                          ) {
                            width_type = "60%";
                            width_asteris = "10%";
                          }
                          if (
                            val_type.type === "RE-OUT SOA" &&
                            val_type.count === 0
                          ) {
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
                            state.delivery_type.reduce((count, val) => {
                              count += parseFloat(val.count);
                              return count;
                            }, 0)
                          )}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : undefined}
          </div>

          {state.singleFieldmanDash === true && pause === false ? (
            <>
              <div>
                <div
                  className={classes.dashboards}
                  style={{
                    cursor: "pointer",
                    height: 150,
                    width: 244,
                    top: 98,
                    left: 306,
                    margin: 18,
                    position: "fixed",
                    zIndex: 2,
                    visibility: initialBoard.visibility,
                  }}
                >
                  <div style={{ padding: 15 }}>
                    <Grid container className={classes.whiteText} spacing={2}>
                      <Grid item xs={12}>
                        <Typography style={{ fontSize: 18 }}>
                          Delivery Type
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ maxHeight: 100, overflow: "auto" }}
                      >
                        {state.fieldman_delivery_type.map((val, index) => {
                          let width_type = "60%";
                          let width_asteris = "10%";

                          state.delivery_type.map((val_type) => {
                            if (
                              val_type.type === "RE-OUT DN" &&
                              val_type.count === 0
                            ) {
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
              </div>
              <div>
                <div
                  className={state.minimize ? undefined : classes.dashboards}
                  style={{
                    cursor: "pointer",
                    height: state.minimize ? 50 : 350,
                    width: state.minimize ? 50 : 550,
                    top: 253,
                    margin: 18,
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
                        top: state.minimize ? 1 : -10,
                      }}
                    >
                      {state.minimize ? (
                        <EqualizerIcon
                          onClick={() => {
                            setState({ ...state, minimize: false });
                          }}
                          style={{
                            color: "#f1c40f",
                            fontSize: 35,
                            background: "rgba(0,0,0,0.6)",
                          }}
                        />
                      ) : (
                        <MinimizeIcon
                          onClick={() => {
                            setState({ ...state, minimize: true });
                          }}
                          style={{ color: "#fff" }}
                        />
                      )}
                    </div>
                    {state.minimize ? undefined : (
                      <>
                        <div>
                          <Line
                            line_data={line_data}
                            width={500}
                            height={300}
                            type={""}
                            total_jo={state.total_jo}
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
              {state.validation_type != "" ? (
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
              ) : undefined}
            </>
          ) : undefined}

          {state.singleFieldmanDash === true && state.pickIndex == "" ? (
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
                        setState({
                          ...state,
                          singleFieldmanDash: false,
                          pickIndex: "",
                          singleFieldmanDash2: false,
                          buttons: false,
                          trackAccom: [],
                          trackAccom2: [],
                        });
                      }}
                      aria-label="delete"
                    >
                      <CloseIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </div>
                  <Grid container className={classes.whiteText} spacing={2}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ marginLeft: 10, marginRight: 10 }}>
                        {state.user_pic === "" ? (
                          <img
                            style={{
                              maxWidth: 80,
                              maxHeight: 80,
                              borderRadius: 80 / 2,
                            }}
                            src={require("../../../assets/map image/user.png")}
                            className=" animated bounce"
                          />
                        ) : (
                          <img
                            src={
                              "http://images.pacificweb.com.ph/pockethr/profilepic/" +
                              state.user_pic
                            }
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
                          {String(state.completeName).toUpperCase()}
                        </Typography>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            style={{ fontSize: 14, position: "fixed" }}
                          >
                            {state.trackAccom2.length != 0
                              ? moment(state.trackAccom2[0].date_accom).format(
                                  "LT"
                                ) +
                                " - " +
                                moment(
                                  state.trackAccom2[
                                    state.trackAccom2.length - 1
                                  ].date_accom
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
                            {state.accom_diff}
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
                        {state.trackAccom.length !== 0 ? (
                          <div
                            style={{
                              width:
                                state.assign2 < state.trackAccom.length
                                  ? 370
                                  : (370 * state.trackAccom.length) /
                                    state.assign2,
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
                                state.assign2 < state.count_val
                                  ? 370
                                  : (370 * state.count_val) / state.assign2,
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
                              background:
                                state.count_attendance > 0 ? "#2ecc71" : "#fff",
                              borderRadius: 15 / 2,
                              marginRight: 10,
                            }}
                          ></div>
                          <div
                            style={{
                              width: 15,
                              height: 15,
                              background:
                                state.assign2 > 0 ? "#2ecc71" : "#fff",
                              borderRadius: 15 / 2,
                              marginRight: 10,
                            }}
                          ></div>
                          <div
                            style={{
                              width: 15,
                              height: 15,
                              background:
                                state.count_attendance > 1 ? "#2ecc71" : "#fff",
                              borderRadius: 15 / 2,
                              marginRight: 10,
                            }}
                          ></div>
                          <div
                            style={{
                              width: 15,
                              height: 15,
                              background:
                                state.count_attendance > 2 ? "#2ecc71" : "#fff",
                              borderRadius: 15 / 2,
                              marginRight: 10,
                            }}
                          ></div>
                          <div
                            style={{
                              width: 15,
                              height: 15,
                              background:
                                state.count_attendance > 3 ? "#2ecc71" : "#fff",
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
                            {state.trackAccom.length !== 0
                              ? state.trackAccom.length
                              : state.count_val}
                            /{state.assign2}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{ marginTop: 40, positio: "relative" }}
                    >
                      <div
                        style={{
                          width: "40%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0,0,0,0.3)",
                        }}
                      >
                        {state.time === "" ? (
                          <Typography style={{ fontSize: 30 }}>
                            {"-- : --"}
                          </Typography>
                        ) : (
                          <Typography style={{ fontSize: 30 }}>
                            {state.time}
                          </Typography>
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
                            if (state.last_coordinates !== "") {
                              var latlong = "";
                              var splitlatlng = "";
                              var lat = "";
                              var lng = "";
                              var complete_name = "";
                              splitlatlng = state.last_coordinates.split(",");
                              lat = splitlatlng[0];
                              lng = splitlatlng[1];
                              setmapOption({
                                ...mapOption,
                                lat: parseFloat(lat),
                                lng: parseFloat(lng),
                                zoom: 20,
                              });
                              setState({ ...state, last_data: true });
                            }
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
                              <Typography
                                style={{ color: "#fff", fontSize: 16 }}
                              >
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
            </div>
          ) : undefined}
          {state.singleFieldmanDash === true && state.pickIndex == "" ? (
            <>
              <div>
                <div
                  className={classes.dashboards}
                  style={{
                    cursor: "pointer",
                    height: 140,
                    width: 192,
                    top: 270,
                    right: 213,
                    position: "fixed",
                    zIndex: 2,
                    visibility: initialBoard.visibility,
                  }}
                >
                  <div style={{ padding: 15 }}>
                    <Typography style={{ color: "#fff" }}>
                      Attendance
                    </Typography>
                    <div style={{ width: 120, marginLeft: 5 }}>
                      {state.attendance_array.map((val, index) => {
                        let type = "";
                        if (val.att_type === "Time-in") {
                          type = "In";
                        }
                        if (val.att_type === "Time-out") {
                          type = "Out";
                        }
                        if (index < 4)
                          return (
                            <Grid
                              key={index}
                              container
                              className={classes.whiteText}
                              spacing={1}
                            >
                              <Grid item xs={4} md={3}>
                                <Typography style={{ fontSize: 14 }}>
                                  {type}
                                </Typography>
                              </Grid>
                              <Grid item xs={2} md={2}>
                                <center>
                                  <Typography style={{ fontSize: 14 }}>
                                    :
                                  </Typography>
                                </center>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <Typography style={{ fontSize: 14 }}>
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
                    top: 270,
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
                      {state.attendance_array.map((val, index) => {
                        let hours = 0;
                        if (
                          val.att_type === "Time-out" &&
                          index > 0 &&
                          index < 3 &&
                          state.trackAccom2.length > 0
                        ) {
                          var oneDay = 24 * 60 * 60 * 1000;
                          var date1 = new Date(state.trackAccom2[0].date_accom);
                          var date2 = new Date(val.date_added);
                          var diffDays = Math.abs(
                            ((date1.getTime() - date2.getTime()) / oneDay) * 24
                          );

                          if (diffDays < 1) {
                            hours = parseInt(diffDays * 60) + " " + "mins.";
                          } else {
                            let new_hours = parseInt(diffDays);
                            let mins =
                              (parseFloat(diffDays).toFixed(2) - new_hours) *
                              60;
                            hours =
                              new_hours +
                              " " +
                              "hr." +
                              "  " +
                              parseInt(mins) +
                              "mins.";
                          }
                        }
                        if (
                          val.att_type === "Time-out" &&
                          index > 0 &&
                          index < 3
                        )
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
            </>
          ) : undefined}

          {state.pickIndex != "" ? (
            <div>
              <div
                className={classes.dashboards}
                style={{
                  cursor: "pointer",
                  height: 580,
                  width: 400,
                  top: 70,
                  right: 5,
                  position: "fixed",
                  zIndex: 2,
                  visibility: initialBoard.visibility,
                }}
              >
                <div style={{ padding: 15, marginTop: 15 }}>
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
                        onClick={(e) => setState({ ...state, pickIndex: "" })}
                        style={{ color: "#fff" }}
                      />
                    </IconButton>
                  </div>
                  <Grid container className={classes.whiteText} spacing={2}>
                    <Grid item xs={4} md={4}>
                      {state.new_pickIndex > 0 ? (
                        <div
                          onClick={() => onPrevious(state.new_pickIndex - 1)}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            color: "#fff",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ArrowLeftIcon
                            style={{ color: "#fff", fontSize: 40 }}
                          />
                          <Typography>Previous</Typography>
                        </div>
                      ) : undefined}
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <div
                        onClick={() => onPrevious(state.new_pickIndex - 1)}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          color: "#fff",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>{state.new_pickIndex + 1}</Typography>/
                        <Typography>{state.trackAccom2.length}</Typography>
                      </div>{" "}
                    </Grid>
                    <Grid item xs={4} md={4}>
                      {state.new_pickIndex < state.trackAccom2.length - 1 ? (
                        <div
                          onClick={() => {
                            onNext(state.new_pickIndex + 1);
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
                          <ArrowRightIcon
                            style={{ color: "#fff", fontSize: 40 }}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container className={classes.whiteText} spacing={2}>
                    <Grid item xs={12} md={12}>
                      <div
                        onClick={() => {
                          let images = JSON.parse(
                            state.singleDetails[0].accom_images
                          );
                          getData("Audit/convertImageAccom", images).then(
                            (res) => {
                              setState({
                                ...state,
                                images_base_64: res.image,
                                openPDF: true,
                              });
                            }
                          );
                        }}
                      >
                        <Typography>Print PDF</Typography>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container className={classes.whiteText} spacing={2}>
                    {state.singleDetails.map((val, index) => {
                      console.log(val);
                      let name = "No Name";
                      let location = "No Address";
                      if (
                        val.customer_lname != "" &&
                        val.customer_fname != ""
                      ) {
                        name = val.customer_lname + " " + val.customer_fname;
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
                      return (
                        <>
                          <Grid item xs={12}>
                            <Card variant="outlined" style={{ padding: 10 }}>
                              <Carousel autoPlay={false}>
                                {val.image_path !== "" &&
                                val.image_path !== null ? (
                                  images.map((images) => {
                                    return (
                                      <img
                                        onClick={() => {
                                          setState({
                                            ...state,
                                            selectedPic: images.path,
                                            OpenPic: true,
                                          });
                                        }}
                                        src={
                                          state.discon
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
                                    src={require("../../../assets/map image/no_image.png")}
                                    alt="test"
                                    style={{ width: "100%", height: "250px" }}
                                  />
                                )}
                              </Carousel>
                            </Card>
                          </Grid>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div style={{ paddingRight: 10, paddingLeft: 10 }}>
                              <RadioGroup
                                value={val.validator_remarks}
                                onChange={handleRadioChange}
                              >
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                      value="Valid"
                                      control={
                                        <Radio style={{ color: "#fff" }} />
                                      }
                                      label="Valid"
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                      value="Invalid"
                                      control={
                                        <Radio style={{ color: "#fff" }} />
                                      }
                                      label="Invalid"
                                    />
                                  </Grid>
                                </Grid>
                              </RadioGroup>
                            </div>
                          </div>
                          <Scrollbars style={{ height: 120, marginLeft: 10 }}>
                            <div style={{ padding: 15 }}>
                              <Typography style={{ fontSize: 20 }}>
                                Accomplishment details
                              </Typography>
                              <Typography>
                                Meter number : {name} ( {val.meter_number} ){" "}
                              </Typography>
                              <Typography>
                                Field Findings : {val.accom_findings}
                              </Typography>
                              <Typography>
                                Remarks: {val.accom_remarks}
                              </Typography>
                              <Typography>
                                Reading : {val.present_reading}
                              </Typography>
                              <Typography>Address : {location}</Typography>
                              <Typography>
                                Battery : {val.accom_battery_life}
                              </Typography>
                              <Typography>Date : {val.date_accom}</Typography>
                              <Typography>
                                Latlng : {val.fetched_coordinates}
                              </Typography>
                              {branches.Selected_branch !== 3?undefined:
                              <>
                              <Typography>
                                Meter Condition : {val.meter_condition}
                              </Typography>
                              <Typography>
                                Seal Condition : {val.seal_condition}
                              </Typography>
                              <Typography>
                                Seal Number : {val.seal_number}
                              </Typography>
                              <Typography>
                                Seal Color : {val.seal_color}
                              </Typography>
                              <Typography>
                                Premises Condition : {val.premises_condition}
                              </Typography>
                              <Typography>
                                Field Order number : {val.tracking_number}
                              </Typography>
                              <Typography>
                                Provider: {val.meter_type}
                              </Typography>
                              </>
                              }
                            </div>
                          </Scrollbars>
                          {/* </Grid> */}
                        </>
                      );
                    })}
                  </Grid>
                </div>
              </div>
            </div>
          ) : undefined}
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
                      <Button
                        style={{
                          fontSize: "0.8125rem",
                          backgroundColor: "rgba(6,86,147)",
                          color: "white",
                          marginLeft: 10,
                        }}
                        onClick={() =>
                          setState({ ...state, summary_accom: true })
                        }
                      >
                        Summary
                      </Button>
                      {/* <Button size='large' variant="contained" style={{ fontSize: '0.8125rem', backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} >Download as Excel</Button>} > */}

                      {/* <ExcelFile filename={"Invalid"} element={<Button size='large' variant="contained" style={{ fontSize: '0.8125rem', backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} >Download as Excel</Button>} >
                                                <ExcelSheet data={state.excel_invalid_data}>
                                                    <ExcelColumn label="Emp ID" value='FieldmanID' />
                                                    <ExcelColumn label="Name" value='FieldmanName' />
                                                    <ExcelColumn label="Branch" value='branch' />
                                                    <ExcelColumn label="Date Commited" value='date' />
                                                    <ExcelColumn label="Type" value='type' />
                                                    <ExcelColumn label="value" value='value' />
                                                    <ExcelColumn label="Explanation" />
                                                    <ExcelColumn label="Supervision Recommendation" />
                                                    <ExcelColumn label="Decision" />

                                                </ExcelSheet>
                                            </ExcelFile> */}
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
                    <Grid item xs={12}></Grid>
                    <Scrollbars style={{ height: 432, paddingTop: 10 }}>
                      {state.fieldman_map.map((row, key) => {
                        let assign = 0;
                        let bulk = 0;
                        let bulk2 = -10;
                        let prev_coordinates = "";
                        let bulk_val = false;
                        let bulk_data = [];
                        let bulk_data_new = [];
                        let jo_rescue = [];
                        row.batch.map((val) => {
                          if (val.jo_rescue !== "") {
                            jo_rescue = JSON.parse(val.jo_rescue);
                          }
                          assign += parseInt(val.jo_count);
                        });
                        console.log(jo_rescue);

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
                            moment(
                              "2021-01-01 " + row.day_sched.attn_in
                            ).format("LT")
                          ) {
                            late_val = true;
                          }
                        }

                        return (
                          <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <div
                              type="button"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                onTrackAccomplishments(
                                  row.user_pic,
                                  row.user_id,
                                  state.date_start,
                                  row.completename,
                                  assign,
                                  row.attendance.length,
                                  row.attendance,
                                  row,
                                  bulk_data_new,
                                  ''
                                );
                              }}
                            >
                              <Grid
                                container
                                className={classes.whiteText}
                                spacing={2}
                                style={{
                                  padding: 10,
                                  backgroundColor:
                                    assign > 0
                                      ? undefined
                                      : "rgba(255,255,255, 0.2)",
                                }}
                              >
                                <Grid item xs={12}>
                                  <div
                                    style={{
                                      flexDirection: "row",
                                      display: "flex",
                                      width: "100%",
                                    }}
                                  >
                                    {/* Picture Start */}
                                    <div style={{ width: "15%" }}>
                                      <div style={{ position: "relative" }}>
                                        <img
                                          alt="picture"
                                          src={
                                            row.user_pic === ""
                                              ? UserImage
                                              : "http://images.pacificweb.com.ph/pockethr/profilepic/" +
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
                                              alt="picture"
                                              src={
                                                val2.pic === ""
                                                  ? UserImage
                                                  : "http://images.pacificweb.com.ph/pockethr/profilepic/" +
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
                                    {/* Picture End */}
                                    {/* Name Start */}
                                    <div style={{ width: "50%" }}>
                                      <Typography style={{}}>
                                        {row.completename !== null
                                          ? String(
                                              row.completename
                                            ).toUpperCase()
                                          : undefined}
                                      </Typography>
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
                                      <div style={{ position: "relative" }}>
                                        <div
                                          style={{
                                            width: 250,
                                            height: 15,
                                            background: "#fff",
                                            borderRadius: 5,
                                            position: "absolute",
                                          }}
                                        ></div>
                                        <div
                                          style={{
                                            width:
                                              250 * width > 250
                                                ? 250
                                                : 250 * width,
                                            height: 15,
                                            background: "#3498db",
                                            borderRadius: 5,
                                            position: "absolute",
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                    {/* Name End */}

                                    {/* <Typography style={{ position: 'absolute', left: 80, top: 20, fontSize: 12.5 }}>Contact No. : {row.user_mobile}</Typography> */}
                                    <div style={{ width: "30%" }}>
                                      <div>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <HtmlTooltip2
                                            color={"#2f3640"}
                                            title={
                                              <React.Fragment>
                                                <Typography
                                                  variant="p"
                                                  style={{ fontSize: 15 }}
                                                  color="inherit"
                                                >
                                                  Contact No. :{" "}
                                                  {row.user_mobile}
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
                                                    {row.attendance.map(
                                                      (val, index) => {
                                                        let type = "";
                                                        if (
                                                          val.att_type ===
                                                          "Time-in"
                                                        ) {
                                                          type = "In";
                                                        }
                                                        if (
                                                          val.att_type ===
                                                          "Time-out"
                                                        ) {
                                                          type = "Out";
                                                        }
                                                        if (index < 4)
                                                          return (
                                                            <Grid
                                                              key={index}
                                                              container
                                                              spacing={1}
                                                            >
                                                              <Grid
                                                                item
                                                                xs={4}
                                                                md={3}
                                                              >
                                                                <Typography
                                                                  variant="p"
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  {type}
                                                                </Typography>
                                                              </Grid>
                                                              <Grid
                                                                item
                                                                xs={2}
                                                                md={2}
                                                              >
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
                                                              <Grid
                                                                item
                                                                xs={7}
                                                                md={7}
                                                              >
                                                                <Typography
                                                                  variant="p"
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  {moment(
                                                                    val.date_added
                                                                  ).format(
                                                                    "hh:mm A"
                                                                  )}
                                                                </Typography>
                                                              </Grid>
                                                            </Grid>
                                                          );
                                                      }
                                                    )}
                                                  </div>
                                                </div>
                                              </React.Fragment>
                                            }
                                          >
                                            <AssignmentIndIcon
                                              style={{ fontSize: 23 }}
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
                                            <Tooltip
                                              title="History"
                                              placement="top"
                                            >
                                              <HistoryIcon
                                                style={{ fontSize: 23 }}
                                              />
                                            </Tooltip>
                                          </div>
                                        </div>

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
                                            <Tooltip
                                              title="Memo"
                                              placement="top"
                                            >
                                              <PictureAsPdfIcon
                                                style={{ fontSize: 23 }}
                                              />
                                            </Tooltip>
                                          </div>
                                        ) : undefined}
                                        {/* Dots Start */}
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
                                              background:
                                                assign > 0 ? "#2ecc71" : "#fff",
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
                                      </div>
                                      {/* Count Start */}
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "row",
                                        }}
                                      >
                                        <Typography>
                                          ({row.jo_accom_list.length} of{" "}
                                          {assign})
                                        </Typography>
                                      </div>
                                      {/* Count Start */}
                                    </div>
                                  </div>
                                  {/* Dots End */}
                                </Grid>
                                {assign > 0 ? (
                                  <>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        className={classes.whiteText}
                                        spacing={2}
                                        style={{
                                          paddingRight: 60,
                                          paddingLeft: 60,
                                        }}
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
                                            {row.jo_accom_list.length >=
                                            assign ? (
                                              <CheckCircleIcon
                                                style={{ color: "#2ecc71" }}
                                              />
                                            ) : (
                                              <CancelIcon
                                                style={{ color: "#e74c3c" }}
                                              />
                                            )}

                                            <Typography>
                                              Completeness
                                            </Typography>
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
                                    <Grid
                                      item
                                      xs={12}
                                      style={{ marginTop: -10 }}
                                    >
                                      <Grid
                                        container
                                        className={classes.whiteText}
                                        spacing={2}
                                        style={{
                                          paddingRight: 60,
                                          paddingLeft: 60,
                                        }}
                                      >
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
                                            <Typography>
                                              Field Findings
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
                                      </Grid>
                                    </Grid>
                                  </>
                                ) : undefined}
                              </Grid>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                backgroundColor: "#2d3436",
                                height: 1.2,
                              }}
                            ></div>
                          </Grid>
                        );
                      })}
                    </Scrollbars>
                  </Grid>
                </div>
              </div>
            </div>
          ) : showGraph ? (
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
                    style={{
                      position: "absolute",
                      zIndex: 2,
                      right: 5,
                      top: 4,
                    }}
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
                      total_jo={state.total_jo}
                      type={"CUMMULATIVE"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : undefined}
        </div>
      ) : (
        <Summary_Page
          back={() => back()}
          record_start_date={state.record_start_date}
          record_end_date={state.record_end_date}
          branch_name={state.branch_name}
          branch_id={branches.Selected_branch}
          company_id={branches.Selectedcompany}
          discon={state.discon}
        />
      )}

      {/* Map Component */}
      {state.buttons ? (
        <div
          style={{
            width: "20%",
            height: "8vh",
            zIndex: 999,
            position: "absolute",
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
                setState({ ...state });
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

          {pause ? (
            <PauseIcon
              onClick={() => {
                setpause(false);
                ShowMapMarkerPlayback(state.trackAccom2, true);
              }}
              style={{ fontSize: 50, cursor: "pointer", color: "#fff" }}
            />
          ) : (
            <PlayArrowIcon
              onClick={() => {
                setpause(true);
                playBackAccom(state.trackAccom2, false, 1200);
              }}
              style={{ fontSize: 50, cursor: "pointer", color: "#fff" }}
            />
          )}

          <StopIcon
            onClick={() => {
              stop(state.trackAccom2, true);
              speeds.current = 1;
              setmapOption({ ...mapOption, zoom: 12 });
            }}
            style={{ fontSize: 50, cursor: "pointer", color: "#fff" }}
          />
        </div>
      ) : undefined}

      <div style={{ height: "100vh", width: "100%", position: "absolute" }}>
        <MapWithAMarkerClusterer
          new_pickIndex={state.new_pickIndex}
          last_data={state.last_data}
          data={
            state.fieldman2.length > 0
              ? "initial"
              : state.trackAccom.length > 0
              ? "single"
              : state.display_AccomPlayback.length > 0
              ? "play"
              : "bulk"
          }
          markers={
            state.fieldman2.length > 0
              ? state.fieldman2
              : state.trackAccom.length > 0
              ? state.trackAccom
              : state.display_AccomPlayback.length > 0
              ? state.display_AccomPlayback
              : bulkData
          }
          mapOption={mapOption}
          bulkData={bulkData}
          onClickMarker={onClickMarker}
          isOpen={isOpen}
          onToggleOpen={onToggleOpen}
          branch_name={branches.Selected_branch}
          map={map}
        />
      </div>
      {/* //Inital Data */}

      {/* Marker Info Box  */}
      <div
        className={classes.dashboards}
        // onMouseUp={handleCloseInfoBox}
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
          zIndex: 2,
          visibility: infoBox.visibility,
        }}
      >
        <div style={{ position: "fixed", zIndex: 2, right: 20 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={() => handleCloseInfoBox("userInfo")}
              style={{ color: "#fff" }}
            />
          </IconButton>
        </div>
        <Grid container spacing={10}>
          {activeInfoBox.activeInfoBox.map((activeUser) => (
            <Grid item xs={2}>
              <div style={{ color: "#fff", paddingTop: 50, paddingLeft: 100 }}>
                <Avatar
                  alt={activeUser.user_fname}
                  src={
                    "http://images.pacificweb.com.ph/pockethr/profilepic/" +
                    activeUser.user_pic
                  }
                  className={classes.large}
                />
              </div>
              <div
                style={{
                  color: "#fff",
                  marginLeft: 50,
                  marginTop: 10,
                  width: 200,
                  textAlign: "center",
                }}
              >
                <h4>
                  {activeUser.user_lname}, {activeUser.user_fname}
                </h4>
              </div>
              <div
                style={{
                  color: "#fff",
                  marginLeft: 50,
                  marginTop: -10,
                  width: 200,
                  textAlign: "center",
                }}
              >
                <h5>
                  at{" "}
                  <span style={{ color: "#74b9ff" }}>
                    {activeUser.location_latlng}
                  </span>
                </h5>
                <h3 style={{ marginTop: -23, color: "#27ae60" }}>
                  {moment(activeUser.location_date_added).format(
                    "MMM D, YYYY h:mm a"
                  )}
                </h3>
              </div>
            </Grid>
          ))}
          <Grid item xs={6}>
            <div style={{ marginTop: 50, paddingLeft: 50 }}>
              <Scrollbars
                style={{ marginTop: 50, paddingLeft: 50, height: 550 }}
              >
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={(classes.allTable, classes.tableHead)}
                      >
                        #
                      </TableCell>
                      <TableCell
                        className={(classes.allTable, classes.tableHead)}
                      >
                        Job Order Id
                      </TableCell>
                      <TableCell
                        className={(classes.allTable, classes.tableHead)}
                      >
                        Customer
                      </TableCell>
                      <TableCell
                        className={(classes.allTable, classes.tableHead)}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        className={(classes.allTable, classes.tableHead)}
                      >
                        Date Posted
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {blmcData.activeDriverActivity.map((row, key) => (
                                            <TableRow hover key={row.job_order_id} onClick={() => setActiveJo(row.job_order_id)}>
                                                <TableCell className={classes.allTable} >{key + 1}</TableCell>
                                                <TableCell className={classes.allTable} >{row.job_order_id}</TableCell>
                                                <TableCell className={classes.allTable} >{row.client_fname} {row.client_lname}</TableCell>
                                                <TableCell className={classes.allTable} >{row.jo_status}</TableCell>
                                                <TableCell className={classes.allTable} >{row.date_posted}</TableCell>
                                            </TableRow>
                                        ))} */}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  style={{ color: "#fff" }}
                />
              </Scrollbars>

              <Button color="primary">Playback</Button>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* !Marker Info Box */}

      {/* Request Marker Info Box  */}
      <div
        className={classes.dashboards}
        // onMouseUp={handleCloseInfoBox}
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
          zIndex: 2,
          visibility: requestInfoBox.visibility,
        }}
      >
        <div style={{ position: "fixed", zIndex: 2, right: 20 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={() => handleCloseInfoBox("requestInfo")}
              style={{ color: "#fff" }}
            />
          </IconButton>
        </div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <div style={{ marginTop: 50, paddingLeft: 50 }}></div>
          </Grid>
        </Grid>
      </div>

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
                    value={state.date_start_val}
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
              {/* {parseInt(branches.Selectedcompany) === 5 ?
                                <Grid item xs={12} md={12}>
                                    <FormControl size='small' className={classes.formControl} style={{ width: '100%' }}>
                                        <InputLabel id="demo-simple-select-outlined-label">Job Order Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            onChange={onChangeJoType}
                                            label="branch"
                                            name='branch_id'
                                            value={branches.jo_type}
                                        >
                                            <MenuItem value={'Reading'}>{'Reading'}</MenuItem>
                                            <MenuItem value={'Disconnection'}>{'Disconnection'}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                : undefined
                            } */}
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
        {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions> */}
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openRecord}
        onClose={() => setOpenRecord(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          Generate Accomplishments
        </DialogTitle>
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => setOpenRecord(false)}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <form onSubmit={changeGetRecord}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date"
                    format="MM-dd-yyyy"
                    name="date_start"
                    value={state.record_start_date}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeStartRecord}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date"
                    format="MM-dd-yyyy"
                    name="date_start"
                    value={state.record_end_date}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeEndRecord}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
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
        {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions> */}
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.summary_accom}
        onClose={() => {
          setState({ ...state, summary_accom: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Monitoring</DialogTitle>
        <Summary_monitoring
          branch_id={branches.Selected_branch}
          date_start={state.date_start}
          branch_name={state.branch_name}
          excel_invalid_data={state.excel_invalid_data}
          close={() => {
            setState({
              ...state,
              summary_accom: false,
            });
          }}
        />
      </Dialog>
      <Dialog
        style={{ backgroundColor: "#2d3436", width: "700" }}
        fullWidth
        open={state.OpenPic}
        onClose={() => setState({ ...state, OpenPic: false })}
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
                    setState({
                      ...state,
                      degree: state.degree - 90,
                    });
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
                    setState({
                      ...state,
                      degree: state.degree + 90,
                    });
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
                    onClick={(e) => setState({ ...state, OpenPic: false })}
                    style={{ color: "#fff" }}
                  />
                </IconButton>
              </div>
              <TransformComponent>
                <img
                  src={
                    state.disocon
                      ? "http://audit.api.pacificweb.com.ph/assets/img/meter/" +
                        state.selectedPic
                      : "http://api.pacificweb.com.ph/assets/img/meter/" +
                        state.selectedPic
                  }
                  alt="test"
                  style={{
                    width: "600px",
                    height: "500px",
                    transform: "rotate(" + String(state.degree) + "deg)",
                  }}
                />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.memo_accom}
        onClose={() => {
          setState({ ...state, memo_accom: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Preview</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>
                setState({
                  ...state,
                  memo_accom: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <AccomMemo
            memo_data={state.memo_data}
            memo_details={state.memo_details}
            logo={state.logo}
            company_id={branches.Selectedcompany}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.openPDF}
        onClose={() => {
          setState({ ...state, openPDF: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Preview</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>
                setState({
                  ...state,
                  openPDF: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <PDF
            singleDetails={state.singleDetails}
            images_base_64={state.images_base_64}
            logo={state.logo}
            branch_name={state.branch_name}
          />
        </DialogContent>
      </Dialog>

      {/* !Request Marker Info Box */}
    </div>
  );
}
