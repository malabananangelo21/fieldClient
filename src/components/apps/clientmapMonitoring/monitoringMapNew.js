import DateFnsUtils from "@date-io/date-fns";
// import MarkerClusterer from '@google/markerclustererplus';
import { Button, Card, Grid, IconButton, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// import ReactTooltip from "react-tooltip";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
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
import CallMadeIcon from "@material-ui/icons/CallMade";
import CloseIcon from "@material-ui/icons/Close";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FilterListIcon from "@material-ui/icons/FilterList";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Draggable from "react-draggable";
import Carousel from "react-material-ui-carousel";
// import { getData, sqlData } from '../../../api/api';
import { useDispatch, useSelector } from "react-redux";
import CancelledMarker from "../../../assets/map image/canceled-activity-marker.png";
import OnTripMarker from "../../../assets/map image/default.png";
import DefaultMarker from "../../../assets/map image/electron-blue.png";
import MarkerFrom from "../../../assets/map image/from.png";
import IdleMarker from "../../../assets/map image/gray.png";
import OnTransitActivityMarker from "../../../assets/map image/ontransit-activity-marker.png";
import QueueRequestMarker from "../../../assets/map image/pending-activity-marker.png";
import MarkerTo from "../../../assets/map image/to.png";
import { getData } from "../../api/api";
import TextField from "@material-ui/core/TextField";
var open = false
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
  withGoogleMap,
)((props) => (
  <GoogleMap
    // ref = {map}
    zoom={props.mapOption.zoom}
    defaultCenter={{ lat: props.mapOption.lat, lng: props.mapOption.lng }}
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
      maxZoom={12}
      zoomOnClick={true}
      minimumClusterSize={2}
    >
      {props.markers.map((marker_details, index) => {
        // setTimeout(()=>{
          let marker = marker_details
          let image = "";
          if ( parseInt(branch_name) === 51 || parseInt(branch_name) === 67 ||  parseInt(branch_name) === 68 ||
                  parseInt(branch_name) === 69 ||  parseInt(branch_name) === 74 ||
                  parseInt(branch_name) === 76 ||  parseInt(branch_name) === 77 || 
                  parseInt(branch_name) === 78 ||  parseInt(branch_name) === 79 || 
                  parseInt(branch_name) === 80 ||  parseInt(branch_name) === 81
          ) {
            image = require("../../../assets/map image/water_new.png");
          } else if (parseInt(props.branch_name) === 3) {
            image = require("../../../assets/map image/electric.png");
          } else {
            image = require("../../../assets/map image/envelop.png");
          }
          // props.refresh()
          return (
            <Marker
              icon={{
                url: image,
                scaledSize: new window.google.maps.Size(30, 38),
              }}
              onClick={() => {
                props.onClickMarker(marker);
                props.onToggleOpen(index);
              }}
              key={marker.jo_id}
              position={{ lat: marker.lat, lng: marker.lng }}
              slug={marker.slug}
              noRedraw={true}
            >
              {props.isOpen[index] && (
                <InfoWindow
                  onCloseClick={props.onToggleOpen}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  options={{ disableAutoPan: true }}
                >
                  <div style={{ opacity: 0.75, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, color: `#000` }}>
                      <Typography color="inherit" style={{ fontWeight: "bold" }}>
                        {marker.meter_number} | {marker.accom_findings}
                      </Typography>
                      <Typography color="inherit">
                        {moment(marker.date_added).format("LLL")}
                      </Typography>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        // },(10*index))  
     
      })}
    </MarkerClusterer>
  </GoogleMap>
));
export default function Mapv2() {
  const timerRef = React.useRef(null);
  const [fieldman_list, setFieldman_list] = React.useState(false);
  const [isOpen, setIsOpen] = useState([]);
  const mapRef2 = React.useRef(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const [mapOption, setmapOption] = useState({
    zoom: 6,
    lat: 13.7565,
    lng: 121.0583,
  });
  const [state, setState] = useState({
    markers: [],
    singleDetails: [],
    open: false,
    date_start: new Date(),
    date_end: new Date(),
  });
  const [branches, setBranches] = useState({
    branches: [],
    companies: [],
    filteredBranch: [],
    Selectedcompany: "",
    Selected_branch: "",
    ref: "",
  });
  const onToggleOpen = (index) => {
    // setmapOption({ ...mapOption, lat: undefined, lng: undefined });
    let isOpen = {
      [index]: true,
    };
    setIsOpen(isOpen);
  };
  const [initialBoard, setInitialBoard] = useState({
    visibility: "visible",
  });
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
    setState({ ...state, comp_id: e.target.value });
  };
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const onChangeBranch = (e) => {
    setBranches({
      ...branches,
      Selected_branch: e.target.value,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const refresh = () => {
    setState({...state});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch_data("loading_map", true);
    let data = {
      parameter: "branch_id",
      selection: [branches.Selected_branch],
      from: moment(state.date_start).format("YYYY-MM-DD"),
      to: moment(state.date_end).format("YYYY-MM-DD"),
      ref: state.ref,
    };
    // setState({ ...state, markers: [] });
    setOpen(false);
    getData("tracking/fetchAllAccomplishment", data).then((res) => {
      console.log(res);
      let accom = [];
      let accom2 = [];

      var lat = "";
      var lng = "";
      res.accomplishment.map((val2, index) => {
        var latlong = "";
        var splitlatlng = "";
        latlong = String(val2.fetched_coordinates);
        splitlatlng = latlong.split(",");
        lat = parseFloat(splitlatlng[0]);
        lng = parseFloat(splitlatlng[1]);
        accom2.push({ lat: lat, lng: lng });
        accom.push(val2);
      });
      getImagesInitial(accom, 0, accom2);
    });
  };
  const getImagesInitial = (jo_accom, index, accom2) => {
    if (jo_accom.length !== 0) {
      let details = jo_accom[0];
      // getData('tracking/getImages', details.jo_id)
      //     .then((res) => {

      let jo_data = {
        accom_findings: details.accom_findings,
        accom_id: details.accom_id,
        fetched_coordinates: details.fetched_coordinates,
        jo_id: details.id,
        imagePath: details.accom_images,
        meter_number: details.meter_number,
        date_added: details.date_added,
      };
      var latlong_initial = "";
      var splitlatlng_initial = "";
      var lat_initial = "";
      var lng_initial = "";
      latlong_initial = String(details.fetched_coordinates);
      splitlatlng_initial = latlong_initial.split(",");
      lat_initial = parseFloat(splitlatlng_initial[0]);
      lng_initial = parseFloat(splitlatlng_initial[1]);

      let locations = [];
      jo_accom.map((val, index) => {
        var latlong = "";
        var splitlatlng = "";
        var lat = "";
        var lng = "";
        latlong = String(val.fetched_coordinates);
        splitlatlng = latlong.split(",");
        lat = parseFloat(splitlatlng[0]);
        lng = parseFloat(splitlatlng[1]);
        let new_data = {
          lat: lat,
          lng: lng,
          jo_id: val.id,
          accom_findings: val.accom_findings,
          accom_id: val.accom_id,
          fetched_coordinates: val.fetched_coordinates,
          meter_number: val.meter_number,
          date_added: val.date_added,
          imagePath: JSON.parse(val.accom_images),
        };
        locations.push(new_data);
      });

      setState({
        ...state,
        pickIndex: index,
        accomplishments_all: jo_accom,
        markers: locations,
      });
      // locations.map((val,index)=>{
      //   setTimeout(() => {
      //     state.markers.push(val)
      //     setState({
      //       ...state,
      //     });
      //   }, 10*index);
      // })
      setmapOption({
        ...mapOption,
        lat: lat_initial,
        lng: lng_initial,
        zoom: 9,
      });
      dispatch_data("loading_map", false);
     
      // })
    } else {
      setState({ ...state, accomplishments_all: [], markers: [] });
      dispatch_data("loading_map", false);
    }
    dispatch_data("coordinates", accom2);
    mapRef2.current = !mapRef2.current;
  };
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start: date,
    });
  };
  const handleDateChangeEnd = (date) => {
    setState({
      ...state,
      date_end: date,
    });
  };
  useEffect(() => {
    let mounted = true;
    const script = document.createElement("script");
    script.src =
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    script.async = true;
    document.body.appendChild(script);
    dispatch_data("accomplishments_map", []);
    getBranches();
    return () => (mounted = false);
    // activityData();
  }, []);
  const getBranches = () => {
    getData("HumanResource/getHandleBranch", {
      user_id: localStorage.getItem("u"),
    }).then((response) => {
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
      dispatch_data("SelectedBranches", []);
    });
  };
  const onClickMarker = (marker) => {
    var latlong = ""
    var splitlatlng = ""
    var lat = ""
    var lng = ""
    latlong = String(marker.fetched_coordinates)
    splitlatlng = latlong.split(",")
    lat = parseFloat(splitlatlng[0])
    lng = parseFloat(splitlatlng[1])
    let jo_data = {
        accom_findings: marker.accom_findings,
        accom_id: marker.accom_id,
        fetched_coordinates: marker.fetched_coordinates,
        jo_id: marker.jo_id,
        imagePath: marker.imagePath,
        meter_number: marker.meter_number,
        date_added: marker.date_added,
    }
    console.log(jo_data)
    let new_array = []
    new_array.push(jo_data)
    state.singleDetails = new_array
    // setState({ ...state, singleDetails: new_array })
    // setmapOption({ ...mapOption, lat: lat, lng: lng })
  };
  return (
    <div>
        <Backdrop className={classes.backdrop} open={map_reducer.loading_map} style={{ zIndex: 999999999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
      <div
        style={{
          width: 250,
          height: 10,
          position: "fixed",
          zIndex: 2,
          left: 10,
          top: 60,
        }}
      >
        <Button
          variant="contained"
          color="#7f8c8d"
          className={classes.button}
          startIcon={<FilterListIcon />}
          onClick={() => {
            setState({ ...state, singleDetails: [] });
            setOpen(true);
          }}
        >
          Filter
        </Button>
      </div>
      <Draggable>
                <div onClick={() => { setFieldman_list(!fieldman_list); clearTimeout(timerRef.current);setState({ ...state, singleFieldmanDash2: false }) }} className={classes.dashboards} style={{ cursor: 'pointer', height: 150, width: 275, margin: 10, top: 100, position: 'fixed', zIndex: 2, visibility: initialBoard.visibility }}>
                    <div style={{ padding: 15 }}>
                        <Grid container className={classes.whiteText} spacing={2}>
                            <Grid item xs={12} >
                              <div style={{display:'flex',flexDirection:'row'}}>
                              <Typography style={{ fontSize: 18 }}>{moment(state.date_start).format('ll')}</Typography>
                              <Typography style={{ fontSize: 18 }}>&nbsp; - &nbsp;</Typography>

                                <Typography style={{ fontSize: 18 }}>{moment(state.date_start).format('ll')}</Typography>
                              </div>
                               
                            </Grid>
                            <Grid item xs={6} >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <ListAltIcon style={{ fontSize: 55, color: '#f39c12' }} />
                                    <Typography style={{ marginLeft: 10, fontSize: 40 }}>{state.markers.length}</Typography>
                                </div>
                                <Typography style={{ marginTop: -11, fontSize: 15 }}>Total&nbsp;Accomplishments</Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Draggable>
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
                    value={state.date_start}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeStart}
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
                    label="Filter Date To"
                    format="MM-dd-yyyy"
                    name="date_start"
                    value={state.date_end}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeEnd}
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
                    value={state.comp_id}
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
                <div>
                  <TextField
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      setState({ ...state, ref: e.target.value })
                    }
                    size="small"
                    id="outlined-basic"
                    label="Reference Number"
                    variant="outlined"
                  />
                </div>
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
      {state.singleDetails.length != 0 ? (
        <Draggable>
          <div
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 580,
              width: 400,
              top: 60,
              right: 5,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ padding: 15 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 4,
                }}
              >
                <CloseIcon
                  style={{ color: "#fff" }}
                  onClick={() => {
                    setState({ ...state, singleDetails: [] });
                  }}
                />
              </div>

              <Grid container className={classes.whiteText} spacing={2}>
                {state.singleDetails.map((val, index) => {
                  let name = "No Name";
                  let location = "No Address";

                  return (
                    <>
                      <Grid item xs={12}>
                        <Card variant="outlined" style={{ padding: 10 }}>
                          <Carousel
                            navButtonsAlwaysVisible={true}
                            autoPlay={false}
                          >
                            {val.imagePath.length !== 0 ? (
                              val.imagePath.map((valImage, index) => {
                                return (
                                  <img
                                    src={
                                      "http://api.pacificweb.com.ph/assets/img/meter/" +
                                      valImage.path
                                    }
                                    alt="test"
                                    style={{ width: "100%", height: "250px" }}
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
                      <Scrollbars style={{ height: 200, marginLeft: 10 }}>
                        <div>
                          <Typography style={{ fontSize: 20 }}>
                            Accomplishment details
                          </Typography>
                          <div style={{ marginTop: 20 }}>
                            <Grid container spacing={0}>
                              <Grid item xs={4} md={4}>
                                <Typography>Meter Number </Typography>
                              </Grid>
                              <Grid item xs={1} md={1}>
                                <Typography>: </Typography>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <Typography>{val.meter_number}</Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                              <Grid item xs={4} md={4}>
                                <Typography>Field Findings </Typography>
                              </Grid>
                              <Grid item xs={1} md={1}>
                                <Typography>: </Typography>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <Typography>{val.accom_findings}</Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                              <Grid item xs={4} md={4}>
                                <Typography>Date </Typography>
                              </Grid>
                              <Grid item xs={1} md={1}>
                                <Typography>: </Typography>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <Typography>
                                  {moment(val.date_added).format("lll")}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                              <Grid item xs={4} md={4}>
                                <Typography>Latlng </Typography>
                              </Grid>
                              <Grid item xs={1} md={1}>
                                <Typography>: </Typography>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <Link
                                  href={
                                    "https://maps.google.com/maps?q=" +
                                    val.fetched_coordinates
                                  }
                                  target="_blank"
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  <Typography>
                                    {val.fetched_coordinates}
                                  </Typography>
                                </Link>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </Scrollbars>
                    </>
                  );
                })}
              </Grid>
            </div>
          </div>
        </Draggable>
      ) : undefined}
      <div style={{ height: "100vh", width: "100%", position: "absolute" }}>
        <MapWithAMarkerClusterer
          markers={state.markers}
          mapOption={mapOption}
          isOpen={isOpen}
          branch_name={branches.Selected_branch}
          onClickMarker={onClickMarker}
          onToggleOpen={onToggleOpen}
          refresh={refresh}
        />
      </div>
    </div>
  );
}

function Map({markers,mapOption,isOpen,branch_name,onClickMarker,onToggleOpen,refresh}){
 
  
    const AsyncMap = compose( withScriptjs,
      withGoogleMap)(
       ( props) => (
          <GoogleMap
          // ref = {map}
          zoom={mapOption.zoom}
          defaultCenter={{ lat: mapOption.lat, lng: mapOption.lng }}
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
            // onClick={onMarkerClustererClick}
            averageCenter
            gridSize={40}
            maxZoom={12}
            zoomOnClick={true}
            minimumClusterSize={2}
          >
            {markers.map((marker_details, index) => {
              // setTimeout(()=>{
                let marker = marker_details
                let image = "";
                if (
                  parseInt(branch_name) === 51 || parseInt(branch_name) === 67 ||  parseInt(branch_name) === 68 ||
                  parseInt(branch_name) === 69 ||  parseInt(branch_name) === 74 ||
                  parseInt(branch_name) === 76 ||  parseInt(branch_name) === 77 || 
                  parseInt(branch_name) === 78 ||  parseInt(branch_name) === 79 || 
                  parseInt(branch_name) === 80 ||  parseInt(branch_name) === 81
                ) {
                  image = require("../../../assets/map image/water_new.png");
                } else if (parseInt(branch_name) === 3) {
                  image = require("../../../assets/map image/electric.png");
                } else {
                  image = require("../../../assets/map image/envelop.png");
                }
                // refresh()
                return (
                  <Marker
                    icon={{
                      url: image,
                      scaledSize: new window.google.maps.Size(30, 38),
                    }}
                    onClick={() => {
                      onClickMarker(marker);
                      onToggleOpen(index); 
                    }}
                    key={marker.jo_id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    slug={marker.slug}
                    noRedraw={true}
                  >
                    {this.state.open[index] && (
                      <InfoWindow
                        onCloseClick={onToggleOpen}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        options={{ disableAutoPan: true }}
                      >
                        <div style={{ opacity: 0.75, padding: `12px` }}>
                          <div style={{ fontSize: `16px`, color: `#000` }}>
                            <Typography color="inherit" style={{ fontWeight: "bold" }}>
                              {marker.meter_number} | {marker.accom_findings}
                            </Typography>
                            <Typography color="inherit">
                              {moment(marker.date_added).format("LLL")}
                            </Typography>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                );
              // },(10*index))  
           
            })}
          </MarkerClusterer>
        </GoogleMap>
        )
      )
    var map
    if(mapOption.lat !== undefined){
      map = <AsyncMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={
          <div style={{ height: "calc(100vh)"  }} />
        }
        containerElement={
          <div style={{ height: "calc(100vh)"  }} />
        }
        mapElement={
          <div style={{ height: "calc(100vh)"  }} />
        }
      />
    }else{
      map = <div  />
    }
    return(map)
 
}
