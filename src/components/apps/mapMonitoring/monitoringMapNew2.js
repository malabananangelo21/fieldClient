import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
// import ReactTooltip from "react-tooltip";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactExport from "react-data-export";
// import { getData, sqlData } from '../../../api/api';
import { useDispatch, useSelector } from "react-redux";
// import { start } from "repl";
// import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CancelledMarker from "../../../assets/map image/canceled-activity-marker.png";
import OnTripMarker from "../../../assets/map image/default.png";
import DefaultMarker from "../../../assets/map image/electron-blue.png";
import MarkerFrom from "../../../assets/map image/from.png";
import IdleMarker from "../../../assets/map image/gray.png";
import OnTransitActivityMarker from "../../../assets/map image/ontransit-activity-marker.png";
import QueueRequestMarker from "../../../assets/map image/pending-activity-marker.png";
import MarkerTo from "../../../assets/map image/to.png";
import { getData } from "../../api/api";
import Dashboard from ".//initial_dashboard/dashboard";
import FieldmanAccom from "./fieldman_accom/fieldman_accom";
import AccomMemo from "./memo/accom";
import Records from "./record/records";
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
  console.log(user_id);

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
  Polyline,
  OverlayView,
} = require("react-google-maps");
const getPixelPositionOffset = (width, height) => ({
  x: -(width / 20),
  y: -height,
});
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
)((props) => {
  const mapRef = React.useRef(null);

  // Fit bounds function
  const fitBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    props.markers.map((marker, index) => {
      console.log(marker);
      let latlong = String(marker.fetched_coordinates);
      if (marker.fetched_coordinates === undefined) {
        latlong = String(marker.location_latlng);
      }
      let splitlatlng = latlong.split(",");
      var lat = parseFloat(splitlatlng[0]);
      var lng = parseFloat(splitlatlng[1]);
      bounds.extend({ lat: lat, lng: lng });
      return index;
    });
    mapRef.current.fitBounds(bounds);
  };
  useEffect(() => {
    if (typeof props.midPoint.lat !== "undefined") {
      fitBounds();
    }
  }, [props.markers]);

  return (
    <GoogleMap
      ref={mapRef}
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
        <Polyline
          options={{
            strokeColor: "#FFC312",
            strokeOpacity: 0.9,
            strokeWeight: 2.4,
            icons: [
              {
                // https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-custom
                icon: {
                  path: "M -2,0 0,-2 2,0 0,2 z",
                  strokeColor: "#FFC312",
                  fillColor: "#FFC312",
                  fillOpacity: 1,
                },
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
          path={props.pathCoordinates}
        />
        {props.markers.map((marker, index) => {
          var splitlatlng = "";
          let sizeA = 30;
          let sizeB = 38;
          var complete_name = "";
          let latlong = String(marker.fetched_coordinates);
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
              parseInt(props.branch_name) === 67 ||
              parseInt(props.branch_name) === 68 ||
              parseInt(props.branch_name) === 63 ||
              parseInt(props.branch_name) === 72 ||
              parseInt(props.branch_name) === 74 ||
              parseInt(props.branch_name) === 76
            ) {
              image = require("../../../assets/map image/water_new.png");
            } else if (parseInt(props.branch_name) === 3) {
              image = require("../../../assets/map image/electric.png");
            } else if (parseInt(props.branch_name) === 11) {
              image = require("../../../assets/map image/pole4.png");
            } else {
              image = require("../../../assets/map image/envelop.png");
            }
          }
          if (props.data === "play" && props.markers.length === index + 1) {
            image = require("../../../assets/map image/online.png");
          } else if (props.data !== "initial") {
            if (
              parseInt(props.branch_name) === 51 ||
              parseInt(props.branch_name) === 67 ||
              parseInt(props.branch_name) === 68 ||
              parseInt(props.branch_name) === 63 ||
              parseInt(props.branch_name) === 72 ||
              parseInt(props.branch_name) === 74 ||
              parseInt(props.branch_name) === 76
            ) {
              image = require("../../../assets/map image/water_new.png");
            } else if (parseInt(props.branch_name) === 3) {
              image = require("../../../assets/map image/electric.png");
            } else if (parseInt(props.branch_name) === 11) {
              sizeA = 50;
              sizeB = 58;
              image = require("../../../assets/map image/pole4.png");
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
                scaledSize: new window.google.maps.Size(sizeA, sizeB),
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
        {typeof props.midPoint.lat !== "undefined" ? (
          <OverlayView
            position={{ lat: props.midPoint.lat, lng: props.midPoint.lng }}
            //  options={{ disableAutoPan: true }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={getPixelPositionOffset}
          >
            <div
              className="overlay-shadow"
              style={{
                backgroundColor: "#427ef5",
                width: "100%",
                height: "100%",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Typography style={{ color: "#fff" }}>
                Distance : {props.midPoint.distance} m
              </Typography>
              <Typography style={{ color: "#fff" }}>
                Time Interval : {props.midPoint.time} min.
              </Typography>
            </div>
          </OverlayView>
        ) : undefined}

        {/* < Polyline
          path={props.pathCoordinates}
        
          options={{
              geodesic:true,
              strokeColor: "#ff2527",
              strokeOpacity: 1,
              strokeWeight: 2,
            
          }}
      /> */}
      </MarkerClusterer>
    </GoogleMap>
  );
});
export default function Mapv2() {
  const dispatch = useDispatch();
  const blmcData = useSelector((state) => state.Mapdash);
  const loginR = useSelector((state) => state.Login);
  const classes = useStyles();
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const realtime_reducer = useSelector((state) => state.realtimeReducer);

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
    minimize: true,
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
    singele_history: "",
    date_history: new Date(),
    job_order_type: [],
    jo_type: ["Messengerial"],
    jo_type_val: [],
    inactive: [],
    get_accom_to_be_audited: [],
    excelFile: [],
    leftPageSelect: false,
    pathCoordinates: [],
    trackAccomSpan: [],
    midPoint: [],
    running: 0,
    single_user_id: "",
    no_schedule: [],
    array_dashboard_data: [],
    account_no_records: [],
    with_schedule: []
  });
  // let pause = false
  const [pause, setpause] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [line_data, setLine] = useState([]);
  const [line_data2, setLine2] = useState([]);
  const [history, setHistory] = useState(false);
  const [bulkData, setBulkData] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [validation_priviledge, setvalidation_priviledge] = useState("");
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
            trackAccomSpan: [],
            pathCoordinates: [],
            midPoint: [],
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
      trackAccomSpan: [],
      pathCoordinates: [],
      midPoint: [],
    });
    clearTimeout(timerRef.current);
    setpause(false);
  };
  // Activity Table Pagination
  const [fieldman_list, setFieldman_list] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showGraph, setShowGraph] = React.useState(false);
  const [job_order_type, setJob_order_type] = React.useState([]);

  const handleChangePage = (event, newPage) => { };
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
    getBranches();
  }, [state.refresh]);

  const get_jotype = (match_branch) => {
    let jo_type = [];
    let branch_field_details = [];
    let initial_branch_id = "";
    match_branch.forEach((val, index) => {
      if (val.branch_field_work !== "") {
        if (initial_branch_id == "") {
          initial_branch_id = val.branch_id;
          jo_type = JSON.parse(val.branch_field_work);
          if (val.branch_field_details != null) {
            branch_field_details = JSON.parse(val.branch_field_details);
          }
        }
      }
    });
    let jo_type_val = "";
    if (jo_type.length !== 0) {
      dispatch_data("JobOrderType", jo_type);
      dispatch_data("Branch_field_details", branch_field_details);
      jo_type_val = jo_type[0];
    }

    if (initial_branch_id != "") {
      let data = {
        parameter: "branch_id",
        selection: [initial_branch_id],
        from: moment(state.date_start_val).format("YYYY-MM-DD"),
        to: moment(state.date_start_val).format("YYYY-MM-DD"),
        company_id: branches.Selectedcompany,
        jo_type: [jo_type_val],
      };
      branches.Selected_branch = match_branch[0].branch_id;
      getMapData(data, 0);
    } else {
      dispatch_data("loading_map", false);
    }
  };

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

  const getBranches = React.useCallback(async function getBranches() {
    dispatch_data("loading_map", true);
    await getData(
      "HumanResource/getHandleBranch",
      {
        user_id: localStorage.getItem("u"),
      },
      state.discon
    ).then((response) => {
      let match_branch = response.response.filter(
        (val, index) => parseInt(val.company_id) === branches.Selectedcompany
      );
      let company = [];
      response.response.map((item, index) => {
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
      setvalidation_priviledge(response.validation[0].validation_priviledge);
      // const branches_data = response.response.filter(
      //   (val) => val.company_id == "6"
      // );
      match_branch.sort(function (a, b) {
        return a["branch_name"].localeCompare(b["branch_name"]);
      });
      home_reducer.handleBranch = response.response;
      home_reducer.company_name = company;
      home_reducer.SelectedBranches = match_branch;

      get_jotype(match_branch);

      // dispatch_data('SelectedBranches', [])
    });
  }, []);

  const goLiveData = () => {
    setTimeout(() => {
      userData();
      requestsData();
      goLiveData();
    }, 3000);
  };

  const getAccomplishment = () => { };

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

  const userData = () => { };

  const requestsData = () => { };

  const activityData = (userId) => { };

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

  const TestMaker = () => { };

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
    let jo_type = [];
    let branch_field_details = [];
    home_reducer.SelectedBranches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
          if (val.branch_field_details != null) {
            branch_field_details = JSON.parse(val.branch_field_details);
          }
        }
      }
    });
    map_reducer.branch_field_details = branch_field_details;
    map_reducer.jo_type = jo_type;
    map_reducer.selected_jo = [];
    setBranches({
      ...branches,
      Selected_branch: e.target.value,
    });
    // setJob_order_type(jo_type)
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
  const getMapData = (data, initial) => {
    dispatch_data("loading_map", true);
    let selection = data.selection;
    let from = data.from;
    let to = data.to;
    let company_id = data.company_id;
    let jo_type = data.jo_type;
    let job_position = "";
    if (realtime_reducer.branch !== "") {
      data.selection = [realtime_reducer.branch]
      data.jo_type = realtime_reducer.jotype
    }
    // if (initial == 0) {
    home_reducer.SelectedBranches.forEach((val, index) => {
      if (initial == 0) {
        if (job_position == "") {
          selection = [val.branch_id]
          if (val.branch_field_work !== "") {
            let j_type = JSON.parse(val.branch_field_work);
            jo_type = j_type[0];
            if (val.branch_field_personnel !== "") {
              let user_pos = JSON.parse(val.branch_field_personnel);
              job_position = user_pos[0];
            }
          }
        }
      } else {
        if (parseInt(val.branch_id) === parseInt(selection[0])) {
          if (val.branch_field_work !== "") {
            let j_type = JSON.parse(val.branch_field_work);
            jo_type = j_type[0];
            if (val.branch_field_personnel !== "") {
              let user_pos = JSON.parse(val.branch_field_personnel);
              job_position = user_pos[0];
            }
          }
        }

      }

    });
    // }
    console.log(job_position)

    setOpen(false);
    getData("aam/trackEmployeesLocationv4", data, state.discon)
      .then((res) => {

        let backlog = 0;
        // if (res.backlogresultassign[0]["jo_count"] !== null) {
        //   backlog =
        //     parseInt(res.backlogresultassign[0]["jo_count"]) -
        //     parseInt(res.backLogresultaccomplish);
        //   if (backlog < 0) {
        //     backlog = 0;
        //   }
        // }
        // console.log(selection)
        // //Selected Branch Start
        // let selectedBranch = ''
        // if(selection.length > 0){
        //   selectedBranch = selection
        // }
        // let matchPosition = ''
        // const branches_data = home_reducer.handleBranch.forEach(
        //   (val) => {
        //     if(val.branch_id == selectedBranch){
        //       for (let index = 0; index < jo_type.length; index++) {
        //         le

        //       }
        //       console.log(val)
        //     }
        //   }
        // );

        //Selected Branch End
        let with_schedule = [];
        let count = 0;
        let jo_assign = 0;
        let jo_accom_list = 0;
        let with_jo = [];
        let with_out_jo = [];
        let deleted_fieldman = [];
        let latlng = "";
        let present = [];
        let onField = [];
        let replacement = [];
        let absent = [];
        let inactive = [];
        let late = [];
        let user_jobposition = [];
        let hours = [];
        let no_area = [];
        let no_schedule = [];
        let match_position = [];
        let excel_invalid_data = [];
        let branch_name = "";
        let rescue_diff_position = [];
        let schedule_fieldman = res.scheduled_fieldman;
        // res.fieldman.map((val) => {
        //   branch_name = val.branch_name;
        //   let match = false;
        //   match_position.map((val_pos) => {
        //     if (val_pos === String(val.user_jobposition).toUpperCase()) {
        //       match = true;
        //     }
        //   });
        //   if (!match) {
        //     match_position.push(String(val.user_jobposition).toUpperCase());
        //   }
        // });

        // Deleted Fieldman Start
        // res.deleted_fieldman.map((val) => {
        //   branch_name = val.branch_name;
        //   let match = false;
        //   match_position.map((val_pos) => {
        //     if (val_pos === String(val.user_jobposition).toUpperCase()) {
        //       match = true;
        //     }
        //   });
        //   if (!match) {
        //     match_position.push(String(val.user_jobposition).toUpperCase());
        //   }
        // });
        // Deleted Fieldman End
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

        // res.fieldman.map((val) => {
        //   if (state.position === "SHOW ALL" || pos_data === false) {
        //     new_fieldman.push(val);
        //   } else {v4
        //     if (String(val.user_jobposition).toUpperCase() === state.position) {
        //       new_fieldman.push(val);
        //     }
        //   }

        //   let match_pos = false;
        //   user_jobposition.map((val_user_pos, index2) => {
        //     if (
        //       val_user_pos.position ===
        //       String(val.user_jobposition).toUpperCase()
        //     ) {
        //       match_pos = true;
        //     }
        //   });
        //   if (!match_pos) {
        //     user_jobposition.push({
        //       position: String(val.user_jobposition).toUpperCase(),
        //     });
        //   }
        //   val.batch.map((val_batch) => {
        //     if (val_batch.jo_rescue !== "") {
        //       let rescue_array = JSON.parse(val_batch.jo_rescue);
        //       rescue_array.map((val_rescue) => {
        //         rescue.push(val_rescue);
        //       });
        //     }
        //   });
        // });

        res.fieldman.map((val) => {
          branch_name = val.branch_name;
          let fieldman_data = val;
          if (
            String(val.user_jobposition).toUpperCase() ===
            String(job_position).toUpperCase()
          ) {
            fieldman_data["jo_sched"] = "Normal";
            new_fieldman.push(fieldman_data);
          } else {
            if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
              fieldman_data["jo_sched"] = "Rescue";
              new_fieldman.push(fieldman_data);
              rescue_diff_position.push(val);
            }
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

        // Deleted Fieldman Start
        res.deleted_fieldman.forEach((val) => {
          if (val.jo_accom_list.length > 0) {
            let fieldman_data = val;
            if (
              String(val.user_jobposition).toUpperCase() ===
              String(job_position).toLocaleUpperCase()
            ) {

              fieldman_data["jo_sched"] = "Normal";
              new_fieldman.push(fieldman_data);

            } else {
              if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
                fieldman_data["jo_sched"] = "Rescue";
                new_fieldman.push(fieldman_data);
                rescue_diff_position.push(val);
              }
            }
            val.batch.forEach((val_batch) => {
              if (val_batch.jo_rescue !== "") {
                let rescue_array = JSON.parse(val_batch.jo_rescue);
                rescue_array.forEach((val_rescue) => {
                  rescue.push(val_rescue);
                });
              }
            });
          }
        });
        // res.deleted_fieldman.map((val) => {
        //   if(val.jo_accom_list.length > 0){
        //     if (state.position === "SHOW ALL" || pos_data === false) {
        //       new_fieldman.push(val);
        //     } else {
        //       if (String(val.user_jobposition).toUpperCase() === state.position) {
        //         new_fieldman.push(val);
        //       }
        //     }

        //     let match_pos = false;
        //     user_jobposition.map((val_user_pos, index2) => {
        //       if (
        //         val_user_pos.position ===
        //         String(val.user_jobposition).toUpperCase()
        //       ) {
        //         match_pos = true;
        //       }
        //     });
        //     if (!match_pos) {
        //       user_jobposition.push({
        //         position: String(val.user_jobposition).toUpperCase(),
        //       });
        //     }
        //     val.batch.map((val_batch) => {
        //       if (val_batch.jo_rescue !== "") {
        //         let rescue_array = JSON.parse(val_batch.jo_rescue);
        //         rescue_array.map((val_rescue) => {
        //           rescue.push(val_rescue);
        //         });
        //       }
        //     });
        //   }

        // });
        // Deleted Fieldman End

        new_fieldman.map((val, index_val) => {
          let exceldata = [];
          if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
            exceldata = getExcelData(
              val,
              moment(state.date_start_val).format("YYYY-MM-DD")
            );
          }
          // CheckSchedule Start
          let sched_date_match = schedule_fieldman.filter(
            (schedule_fieldman_val) =>
              val.user_id === schedule_fieldman_val.user_id
          );
          let sched_date_val = false;
          let sched_date_type = "Normal";
          if (sched_date_match.length > 0) {
            sched_date_val = true;
            sched_date_type = sched_date_match[0].sched_type;
            console.log(val.completename)
          }
          // console.log(sched_date_val)
          // CheckSchedule End
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
            if (sched_date_val && index === 0) {
              with_schedule.push(val)
              // count++;
              // match = true;
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
            if (parseInt(val.user_delete_id) === 0) {
              if (sched_date_val) {
                absent.push(val);
              } else {
                no_schedule.push(val);
              }
            }
          } else {
            // if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0){
            let match_rescue = rescue_diff_position.filter((val_rescue) => (val_rescue.user_id === val.user_id))
            if (match_rescue.length == 0 && sched_date_val) {
              present.push(val);
            }
            if (sched_date_type === "Replacement") {
              replacement.push(val);
            }
            if (parseInt(val.user_delete_id) === 1) {
              inactive.push(val);
            }
            // }else{
            //   let filter = rescue.filter(
            //     (rescue_filter) => rescue_filter.id === val.user_id
            //   );
            //   if (filter.length > 0) {
            //     if (parseInt(val.user_delete_id) === 1) {
            //       inactive.push(val);
            //     }
            //   } else {
            //     no_schedule.push(val);
            //     // present.push(val);
            //   }
            // }
            if (
              String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
              String(val.user_jobposition).toUpperCase() === "METER READER"
            ) {
              if (
                moment(val.attendance[0].date_added).format("HH:mm") >
                moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
              ) {
                if (val.batch[0].jo_count > 0) {
                  let match_rescue = rescue_diff_position.filter((val_rescue) => (val_rescue.user_id === val.user_id))
                  if (match_rescue.length == 0 && sched_date_val) {
                    late.push(val);
                  }

                }
              }
              if (parseInt(val.batch[0].jo_count) === 0) {
                no_area.push(val);
              }
            } else {
              // present.push(val);
            }
          }
          if (val.jo_accom > 0 && val.attendance.length < 3) {
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
        if (lat !== 0) {
          setmapOption({ ...mapOption, lat: lat, lng: lng });
        }
        let excelFile = [];
        with_jo.map((row, key) => {
          let trackAccom2_new = row.jo_accom_list;
          let batch = row.batch;

          let first = "";
          let last = "";
          let date = "";

          if (trackAccom2_new.length > 0) {
            first = moment(trackAccom2_new[0].date_accom).format("hh:mm A");
            last = moment(
              trackAccom2_new[trackAccom2_new.length - 1].date_accom
            ).format("hh:mm A");
          }
          let data = {
            user_id: row.user_id,
            name: row.completename,
            date: from,
            first: first,
            last: last,
          };
          if (trackAccom2_new.length > 0) {
            excelFile.push(data);
          }
        });
        let array_dashboard_data = [
          { type: "Present", data: present, color: "#2ecc71" },
          { type: "Late", data: late, color: "#f3a683" },
          { type: "On field", data: onField, color: "#ecf0f1" },
          // {type:'Replacement',data:replacement,color:'#9b59b6'},
          { type: "No Schedule", data: no_schedule, color: "#74b9ff" },
          { type: "Absent", data: absent, color: "#ff7979" },
          { type: "Inactive", data: inactive, color: "#f1c40f" },
          { type: "Rescue", data: rescue_diff_position, color: "#bdc3c7" },
        ];
        realtime_reducer.branch = ""
        realtime_reducer.jotype = ""
        // console.log(rescue_diff_position)

        setState({
          ...state,
          array_dashboard_data: array_dashboard_data,
          inactive: inactive,
          present: present,
          absent: absent,
          late: late,
          replacement: replacement,
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
          date_start: from,
          summary_page: false,
          date_start_val: from,
          jo_type: jo_type,
          jo_type_val: data.jo_type,
          get_accom_to_be_audited: res.get_accom_to_be_audited,
          excelFile: excelFile,
          running: res.runningAverageAssign,
          no_schedule: no_schedule,
          with_schedule: with_schedule
        });
        setBranches({
          ...branches,
          Selected_branch: selection[0],
          Selectedcompany: company_id,
        });
        let count_validation = 0
        res.count_validation_logs.map((val) => {
          count_validation = parseInt(val.percentage)
        })

        dispatch_data("count_validation_logs", count_validation);
        setHistory(false);
        setFieldman_list(false);
        dispatch_data("loading_map", false);
      })
      .catch((e) => {
        dispatch_data("loading_map", false);
      });
  };
  console.log(map_reducer)
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      parameter: "branch_id",
      selection: [branches.Selected_branch],
      from: moment(state.date_start_val).format("YYYY-MM-DD"),
      to: moment(state.date_start_val).format("YYYY-MM-DD"),
      company_id: branches.Selectedcompany,
      jo_type: map_reducer.selected_jo,
    };
    setLine2([]);
    getMapData(data);
  };
  const Refresh = (e) => {
    e.preventDefault();
    let data = {
      parameter: "branch_id",
      selection: [branches.Selected_branch],
      from: moment(new Date()).format("YYYY-MM-DD"),
      to: moment(new Date()).format("YYYY-MM-DD"),
      company_id: branches.Selectedcompany,
      jo_type: map_reducer.selected_jo,
    };
    setLine2([]);
    getMapData(data);
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
    setLine([]);
    let data = {
      user_id: user_id,
      date: moment(date).format("YYYY-MM-DD"),
    };
    let date_history = moment(date).format("YYYY-MM-DD");
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
      if (type === "History") {
        setFieldman_list(false);
      }
      setState({
        ...state,
        date_history,
        date_history,
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
        singele_history: type,
        single_user_id: user_id,
      });
      setHistory(false);
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
    let replacement = [];
    let onField = [];
    let inactive = [];
    let absent = [];
    let late = [];
    let user_jobposition = [];
    let count_All_emp = 0;
    let no_area = [];
    let no_schedule = [];
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
    console.log(state.onSubmitData);
    state.onSubmitData.fieldman.map((val, index_val) => {
      // CheckSchedule Start
      let sched_date_match = state.onSubmitData.scheduled_fieldman.filter(
        (schedule_fieldman_val) => val.user_id === schedule_fieldman_val.user_id
      );
      let sched_date_val = false;
      let sched_date_type = "Normal";
      if (sched_date_match.length > 0) {
        sched_date_val = true;
        sched_date_type = sched_date_match[0].sched_type;
      }
      // console.log(sched_date_val)
      // CheckSchedule End
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
          jo_assign += parseInt(val_batch.jo_count);
        });

        state.onSubmitData.fieldman[index_val]["count"] = new_jo_assign;
        jo_accom_list += parseInt(val.jo_accom_list.length);

        if (val.attendance.length === 0) {
          if (parseInt(val.user_delete_id) === 0) {
            if (sched_date_val) {
              absent.push(val);
            } else {
              no_schedule.push(val);
            }
          }
        } else {
          if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
            if (parseInt(val.user_delete_id) === 1) {
              inactive.push(val);
            }
            present.push(val);
            if (sched_date_type === "Replacement") {
              replacement.push(val);
            }
          } else {
            no_schedule.push(val);
          }
          if (
            String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
            String(val.user_jobposition).toUpperCase() === "METER READER"
          ) {
            if (
              moment(val.attendance[0].date_added).format("HH:mm") >
              moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
            ) {
              if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
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
        if (val.jo_accom > 0 && val.attendance.length < 3) {
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
            jo_assign += parseInt(val_batch.jo_count);
          });

          state.onSubmitData.fieldman[index_val]["count"] = new_jo_assign;
          jo_accom_list += parseInt(val.jo_accom_list.length);

          if (val.attendance.length === 0) {
            if (parseInt(val.user_delete_id) === 0) {
              if (sched_date_val) {
                absent.push(val);
              } else {
                no_schedule.push(val);
              }
            }
          } else {
            if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
              if (parseInt(val.user_delete_id) === 1) {
                inactive.push(val);
              }
              present.push(val);
              if (sched_date_type === "Replacement") {
                replacement.push(val);
              }
            } else {
              no_schedule.push(val);
            }
            if (
              String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
              String(val.user_jobposition).toUpperCase() === "METER READER"
            ) {
              if (
                moment(val.attendance[0].date_added).format("HH:mm") >
                moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
              ) {
                if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
                  late.push(val);
                }
              }
              if (parseInt(val.batch[0].jo_count) === 0) {
                no_area.push(val);
              }
            }
          }
          if (val.jo_accom > 0 && val.attendance.length < 3) {
            onField.push(val);
          }
        }
      }
    });

    state.onSubmitData.deleted_fieldman.map((val, index_val) => {
      // CheckSchedule Start
      let sched_date_match = state.onSubmitData.scheduled_fieldman.filter(
        (schedule_fieldman_val) => val.user_id === schedule_fieldman_val.user_id
      );
      let sched_date_val = false;
      let sched_date_type = "Normal";
      if (sched_date_match.length > 0) {
        sched_date_val = true;
        sched_date_type = sched_date_match[0].sched_type;
      }
      // console.log(sched_date_val)
      // CheckSchedule End
      if (val.jo_accom_list.length > 0) {
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
            jo_assign += parseInt(val_batch.jo_count);
          });

          state.onSubmitData.deleted_fieldman[index_val]["count"] =
            new_jo_assign;
          jo_accom_list += parseInt(val.jo_accom_list.length);

          if (val.attendance.length === 0) {
            if (parseInt(val.user_delete_id) === 0) {
              if (sched_date_val) {
                absent.push(val);
              } else {
                no_schedule.push(val);
              }
            }
          } else {
            if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
              if (parseInt(val.user_delete_id) === 1) {
                inactive.push(val);
              }
              present.push(val);
              if (sched_date_type === "Replacement") {
                replacement.push(val);
              }
            } else {
              no_schedule.push(val);
            }
            if (
              String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
              String(val.user_jobposition).toUpperCase() === "METER READER"
            ) {
              if (
                moment(val.attendance[0].date_added).format("HH:mm") >
                moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
              ) {
                if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
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
          if (val.jo_accom > 0 && val.attendance.length < 3) {
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
              jo_assign += parseInt(val_batch.jo_count);
            });

            state.onSubmitData.deleted_fieldman[index_val]["count"] =
              new_jo_assign;
            jo_accom_list += parseInt(val.jo_accom_list.length);

            if (val.attendance.length === 0) {
              if (parseInt(val.user_delete_id) === 0) {
                if (sched_date_val) {
                  absent.push(val);
                } else {
                  no_schedule.push(val);
                }
              }
            } else {
              if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
                if (parseInt(val.user_delete_id) === 1) {
                  inactive.push(val);
                }
                present.push(val);
                if (sched_date_type === "Replacement") {
                  replacement.push(val);
                }
              } else {
                no_schedule.push(val);
              }
              if (
                String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
                String(val.user_jobposition).toUpperCase() === "METER READER"
              ) {
                if (
                  moment(val.attendance[0].date_added).format("HH:mm") >
                  moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
                ) {
                  if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
                    late.push(val);
                  }
                }
                if (parseInt(val.batch[0].jo_count) === 0) {
                  no_area.push(val);
                }
              }
            }
            if (val.jo_accom > 0 && val.attendance.length < 3) {
              onField.push(val);
            }
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

    state.onSubmitData.deleted_fieldman.map((val) => {
      if (val.jo_accom_list.length > 0) {
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
      state.onSubmitData.deleted_fieldman.map((val) => {
        if (val.jo_accom_list.length > 0) {
          if (state.position === "SHOW ALL") {
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
          } else if (String(val.user_jobposition).toUpperCase() === position) {
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
          }
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
    let array_dashboard_data = [
      { type: "Present", data: present, color: "#2ecc71" },
      { type: "Late", data: late, color: "#f3a683" },
      { type: "On field", data: onField, color: "#ecf0f1" },
      { type: "Replacement", data: replacement, color: "#9b59b6" },
      { type: "No Schedule", data: no_schedule, color: "#74b9ff" },
      { type: "Absent", data: absent, color: "#ff7979" },
      { type: "Inactive", data: inactive, color: "#f1c40f" },
    ];
    setState({
      ...state,
      array_dashboard_data: array_dashboard_data,
      present: present,
      absent: absent,
      late: late,
      inactive: inactive,
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
      no_schedule: no_schedule,
      trackAccom2: [],
      trackAccom: [],
      delivery_type: data_type,
      singleFieldmanDash: false,
    });
    dispatch_data("loading_map", false);
  };
  console.log(state.fieldman);
  const clock = () => {
    var hour = moment(new Date()).format("hh:mm:ss A");

    document.getElementById("clock").innerText = hour;
    setTimeout(() => {
      clock();
    }, 1000);
  };
  const getAccomALl = (data) => {
    getData("tracking/trackAccomplishmentsAllFieldman", data).then((res) => { });
  };
  const getRecord = (user_id, row) => {
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
      jo_type_val: state.jo_type_val,
    };
    console.log(details);
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
      ArrangeDetailsDisplay(details);
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
      ArrangeDetailsDisplay(details);
      setState({
        ...state,
        singleDetails: [details],
        pickIndex: index + 1,
        minimize: true,
        new_pickIndex: index,
      });
    }
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
    map_reducer.selected_details = new_branch_field_details;
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
      let zoom = 20;
      if (parseFloat(lat) === 0 && parseFloat(lng) === 0) {
        zoom = 10;
      }
      setmapOption({
        ...mapOption,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: zoom,
      });
      ArrangeDetailsDisplay(details);
      setState((prev) => ({
        ...prev,
        singleDetails: [details],
        new_pickIndex: index,
        pickIndex: 1,
        trackAccomSpan: [],
        pathCoordinates: [],
        midPoint: [],
        leftPageSelect: false,
      }));
      getAccountNumberRecords(details);
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
      let zoom = 20;
      if (parseFloat(lat) === 0 && parseFloat(lng) === 0) {
        zoom = 10;
      }
      setmapOption({
        ...mapOption,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: zoom,
      });

      ArrangeDetailsDisplay(details);
      getAccountNumberRecords(details);

      setState((prev) => ({
        ...prev,
        singleDetails: [details],
        new_pickIndex: index,
      }));
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
  const handleRadioChange = (e, userId) => {
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
    let user_id = userId;
    getData("tracking/onChangeValidation", data, state.discon).then((res) => {
      if (res.response === true) {
        state.singleDetails.map((val, index) => {
          val.validator_remarks = val2;
        });
        console.log(state.fieldman_map);
        console.log(state.singleDetails);

        state.fieldman_map.forEach((val) => {
          if (val.user_id === user_id) {
            val.jo_accom_list.forEach((jo_accom) => {
              if (jo_accom.accom_id === accom_id) {
                jo_accom.validator_remarks = val2;
              }
            });
          }
        });
        setState((prev) => ({ ...prev }));
        // setState({ ...state });
      }
      dispatch_data("loading_map", false);
    });
  };
  const getExcelData = (row, date) => {
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
    let countInvalid = 0;
    row.jo_accom_list.map((val) => {
      if (val.validator_remarks === "INVALID") {
        countInvalid++;
      }
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
    let fieldFindings = 1;

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
    if (countInvalid > 0) {
      fieldFindings = 0;
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
      fieldFindings +
      1
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
      fieldFindings: fieldFindings,
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
      let approver_1_signature = null;
      let approver_2_signature = null;
      let approver_3_signature = null;
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
        approver_1_signature = val.approver_1_signature;
        approver_2_signature = val.approver_2_signature;
        approver_3_signature = val.approver_3_signature;

        fman_data.map((val_fman) => {
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
      details["approver_1_signature"] = approver_1_signature;
      details["approver_2_signature"] = approver_2_signature;
      details["approver_3_signature"] = approver_3_signature;

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
    let array1 = state.jo_type_val;
    let array2 = map_reducer.selected_jo;
    setState({ ...state, summary_page: false });

    if (array1.sort().join(",") === array2.sort().join(",")) {
    } else {
      let data = {
        parameter: "branch_id",
        selection: [branches.Selected_branch],
        from: moment(new Date(state.date_start_val)).format("YYYY-MM-DD"),
        to: moment(new Date(state.date_start_val)).format("YYYY-MM-DD"),
        company_id: branches.Selectedcompany,
        jo_type: map_reducer.selected_jo,
      };
      setLine2([]);
      getMapData(data);
    }
  };
  const dash_fielman = () => {
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
      trackAccomSpan: [],
      pathCoordinates: [],
      midPoint: [],
      fieldman2: state.fieldman,
    });
    sessionStorage.setItem("scrollPosition", 0);
  };
  const dash_click = (e, type) => {
    e.stopPropagation();
    setShowGraph(false);
    setFieldman_list(true);
    clearTimeout(timerRef.current);
    setpause(false);
    setState({
      ...state,
      fieldman_map: type,
      last_coordinates: "",
      singleFieldmanDash: false,
      singleFieldmanDash2: false,
      buttons: false,
      trackAccom2: [],
      trackAccom: [],
      pickIndex: "",
      time: "",
    });
  };
  const onChangeJobOrder = (e) => {
    map_reducer.selected_jo.push(e.target.value);
    setState({
      ...state,
    });
  };
  const onClickGraph = (data) => {
    getMapData(data);
  };
  async function getAccountNumberRecords(data) {
    try {
      let match = data.accom_jo_type.includes("Audit");

      if (match) {
        dispatch_data("loading_map", true);
        let details = {
          branch_id: branches.Selected_branch,
          account_number: data.account_no,
          jo_id: data.jo_id,
        };
        let res = await getData("aam/getAccountNumberRecords", details);
        setState((prev) => ({
          ...prev,
          account_no_records: res.res,
        }));
        dispatch_data("loading_map", false);
      }
    } catch (error) {
      alert("Request failed.");
      dispatch_data("loading_map", false);
    }
  }
  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={map_reducer.loading_map}
        style={{ zIndex: 999999999 }}
      >
        <div className="loadermap"></div>
      </Backdrop>
      <div
        className={classes.dashboards}
        style={{ position: "fixed", right: 5, top: 5, zIndex: 2, padding: 5 }}
      >
        <Typography
          id="clock"
          style={{ fontSize: 18, color: "#fff" }}
        ></Typography>
      </div>
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
        {state.singleFieldmanDash === false &&
          state.summary_page &&
          !history ? (
          <Summary_Page
            back={() => back()}
            record_start_date={state.record_start_date}
            record_end_date={state.record_end_date}
            branch_name={state.branch_name}
            branch_id={branches.Selected_branch}
            company_id={branches.Selectedcompany}
            discon={state.discon}
            jo_type={map_reducer.selected_jo}
            onClickGraph={onClickGraph}
            job_order_type={job_order_type}
          />
        ) : state.singleFieldmanDash === false &&
          !state.summary_page &&
          !history ? (
          <Dashboard
            setOpen={setOpen}
            setFieldman_list={setFieldman_list}
            setShowGraph={(e) => setShowGraph(e)}
            open={open}
            handleClose={() => handleClose()}
            onSubmit={onSubmit}
            Refresh={Refresh}
            handleDateChangeStart={handleDateChangeStart}
            onChangeCompany={onChangeCompany}
            branches={branches}
            home_reducer={home_reducer}
            onChangeBranch={onChangeBranch}
            initialBoard={initialBoard}
            setBulkData={setBulkData}
            timerRef={timerRef}
            setpause={setpause}
            dash_fielman={() => dash_fielman()}
            date_start={state.date_start}
            count_fieldman={state.count_fieldman}
            fieldman={state.fieldman}
            late={state.late}
            present={state.present}
            dash_click={dash_click}
            onField={state.onField}
            no_area={state.no_area}
            absent={state.absent}
            date_start_val={state.date_start_val}
            total_jo={state.total_jo}
            unassign={state.unassign}
            assign={state.assign}
            jo_accom_list={state.jo_accom_list}
            pie_graph={state.pie_graph}
            delivery_type={state.delivery_type}
            fieldman_list={fieldman_list}
            user_jobposition={state.user_jobposition}
            onChangePosition={onChangePosition}
            position={state.position}
            summary_page={() => setState({ ...state, summary_page: true })}
            branch_name={state.branch_name}
            fieldman_map={state.fieldman_map}
            summary_accom_function={(e) => {
              setState({ ...state, summary_accom: e });
            }}
            onTrackAccomplishments={onTrackAccomplishments}
            getRecord={getRecord}
            generateMemo={generateMemo}
            line_data2={line_data2}
            showGraph={showGraph}
            summary_accom={state.summary_accom}
            excel_invalid_data={state.excel_invalid_data}
            job_order_type={job_order_type}
            jo_type={map_reducer.selected_jo}
            jo_type_val={state.jo_type_val}
            onChangeJobOrder={onChangeJobOrder}
            inactive={state.inactive}
            excelFile={state.excelFile}
            running={state.running}
            no_schedule={state.no_schedule}
            array_dashboard_data={state.array_dashboard_data}
            with_schedule={state.with_schedule}
          />
        ) : undefined}
        {state.singleFieldmanDash === false &&
          !state.summary_page &&
          history ? (
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
            back={() => setHistory(false)}
            setOpenRecord={() => setOpenRecord(true)}
            jo_type_val={state.jo_type_val}
          />
        ) : undefined}
        {state.singleFieldmanDash === true ? (
          <FieldmanAccom
            setOpen={setOpen}
            setFieldman_list={setFieldman_list}
            setShowGraph={(e) => setShowGraph(e)}
            open={open}
            handleClose={() => handleClose()}
            onSubmit={onSubmit}
            handleDateChangeStart={handleDateChangeStart}
            onChangeCompany={onChangeCompany}
            branches={branches}
            home_reducer={home_reducer}
            onChangeBranch={onChangeBranch}
            initialBoard={initialBoard}
            setBulkData={setBulkData}
            timerRef={timerRef}
            setpause={setpause}
            dash_fielman={() => dash_fielman()}
            date_start={state.date_start}
            count_fieldman={state.count_fieldman}
            fieldman={state.fieldman}
            late={state.late}
            present={state.present}
            dash_click={dash_click}
            onField={state.onField}
            no_area={state.no_area}
            absent={state.absent}
            date_start_val={state.date_start_val}
            total_jo={state.total_jo}
            unassign={state.unassign}
            assign={state.assign}
            jo_accom_list={state.jo_accom_list}
            pie_graph={state.pie_graph}
            delivery_type={state.delivery_type}
            fieldman_list={fieldman_list}
            user_jobposition={state.user_jobposition}
            onChangePosition={onChangePosition}
            position={state.position}
            summary_page={() => setState({ ...state, summary_page: true })}
            branch_name={state.branch_name}
            fieldman_map={state.fieldman_map}
            summary_accom_function={(e) => {
              setState({ ...state, summary_accom: e });
            }}
            onTrackAccomplishments={onTrackAccomplishments}
            getRecord={getRecord}
            generateMemo={generateMemo}
            line_data2={line_data2}
            showGraph={showGraph}
            summary_accom={state.summary_accom}
            excel_invalid_data={state.excel_invalid_data}
            fieldman_delivery_type={state.fieldman_delivery_type}
            minimize={state.minimize}
            minimized_func={(e) => setState({ ...state, minimize: e })}
            line_data={line_data}
            singleFieldmanDash={state.singleFieldmanDash}
            pickIndex={state.pickIndex}
            closeButton={() =>
              setState({
                ...state,
                singleFieldmanDash: false,
                pickIndex: "",
                singleFieldmanDash2: false,
                buttons: false,
                trackAccom: [],
                trackAccom2: [],
              })
            }
            user_pic={state.user_pic}
            completeName={state.completeName}
            trackAccom2={state.trackAccom2}
            accom_diff={state.accom_diff}
            trackAccom={state.trackAccom}
            assign2={state.assign2}
            count_val={state.count_val}
            count_attendance={state.count_attendance}
            time={state.time}
            last_coordinates={state.last_coordinates}
            onNext={onNext}
            pinCircle={(last_coordinates) => {
              if (last_coordinates !== "") {
                var latlong = "";
                var splitlatlng = "";
                var lat = "";
                var lng = "";
                var complete_name = "";
                splitlatlng = last_coordinates.split(",");
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
            bulk_route={() => bulk_route()}
            bulkData={bulkData}
            attendance_array={state.attendance_array}
            onClosepic={() => {
              setState({ ...state, pickIndex: "" });
            }}
            new_pickIndex={state.new_pickIndex}
            singleDetails={state.singleDetails}
            pdfPrint={() => {
              let images = JSON.parse(state.singleDetails[0].accom_images);
              getData("Audit/convertImageAccom", images).then((res) => {
                setState({
                  ...state,
                  images_base_64: res.image,
                  openPDF: true,
                });
              });
            }}
            onCLickImage={(images) => {
              setState({
                ...state,
                selectedPic: images.path,
                OpenPic: true,
              });
            }}
            discon={state.discon}
            onPrevious={onPrevious}
            handleRadioChange={handleRadioChange}
            invalid={(e) =>
              setState({
                ...state,
                validation_type: e,
                minimize: true,
              })
            }
            closeValidation={() =>
              setState({
                ...state,
                validation_type: "",
              })
            }
            validation_type={state.validation_type}
            setmapOption={setmapOption}
            mapOption={mapOption}
            onClickMarker2={onClickMarker2}
            onToggleOpen={onToggleOpen}
            OpenPic={state.OpenPic}
            onCLosePicture={() => setState({ ...state, OpenPic: false })}
            rotateLeft={() =>
              setState({
                ...state,
                degree: state.degree - 90,
              })
            }
            rotateRight={() =>
              setState({
                ...state,
                degree: state.degree + 90,
              })
            }
            degree={state.degree}
            selectedPic={state.selectedPic}
            backHistory={() => {
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
                singele_history: false,
                trackAccomSpan: [],
                pathCoordinates: [],
                midPoint: [],
                fieldman2: state.fieldman,
              });
              setFieldman_list(false);
              setHistory(true);
            }}
            singele_history={state.singele_history}
            date_history={state.date_history}
            openPDF={state.openPDF}
            openPDF_func={() => setState({ ...state, openPDF: false })}
            images_base_64={state.images_base_64}
            logo={state.logo}
            buttons={state.buttons}
            fastForward={() => {
              if (speeds.current === 8) {
                speeds.current = 1;
              } else {
                speeds.current++;
              }
              setState({ ...state });
            }}
            pause={pause}
            pausefunction={() => {
              setpause(false);
              ShowMapMarkerPlayback(state.trackAccom2, true);
            }}
            play={() => {
              setpause(true);
              playBackAccom(state.trackAccom2, false, 1200);
            }}
            stop={() => {
              stop(state.trackAccom2, true);
              speeds.current = 1;
              setmapOption({ ...mapOption, zoom: 12 });
            }}
            speeds={speeds}
            onChangeJobOrder={onChangeJobOrder}
            jo_type={map_reducer.selected_jo}
            jo_type_val={state.jo_type_val}
            inactive={state.inactive}
            get_accom_to_be_audited={state.get_accom_to_be_audited}
            leftPageSelect={state.leftPageSelect}
            accomlistdurationpermeter={() =>
              setState({ ...state, leftPageSelect: !state.leftPageSelect })
            }
            onClick_list_Duration={(val, pathCoordinates, midPoint) => {
              setmapOption({
                ...mapOption,
                lat: pathCoordinates[0].lat,
                lng: pathCoordinates[0].lng,
              });
              setState({
                ...state,
                trackAccomSpan: val,
                leftPageSelect: !state.leftPageSelect,
                pathCoordinates: pathCoordinates,
                midPoint: midPoint,
              });
            }}
            onClickListDetails={(details, index) =>
              setState({
                ...state,
                singleDetails: [details],
                pickIndex: index,
              })
            }
            validation_priviledge={validation_priviledge}
            userId={state.single_user_id}
            no_schedule={state.no_schedule}
            array_dashboard_data={state.array_dashboard_data}
            account_no_records={state.account_no_records}
            with_schedule={state.with_schedule}
          />
        ) : undefined}
      </div>

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
            state.trackAccomSpan.length > 0
              ? state.trackAccomSpan
              : state.fieldman2.length > 0
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
          pathCoordinates={state.pathCoordinates}
          midPoint={state.midPoint}
        />
      </div>
      {state.buttons ? (
        <div
          style={{
            width: "20%",
            height: "8vh",
            // zIndex: 2,
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
              {state.job_order_type.map((val,index)=>{
                return <MenuItem value={val.category_details}>{val.category_details}</MenuItem>
              })
              }
            </Select>
          </FormControl> */}
              </Grid>
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
    </div>
  );
}
