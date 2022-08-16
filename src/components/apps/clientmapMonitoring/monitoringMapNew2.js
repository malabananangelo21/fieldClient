import MarkerClusterer from "@google/markerclusterer";
import DateFnsUtils from "@date-io/date-fns";
// import MarkerClusterer from '@google/markerclustererplus';
import {
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
  CardContent,
} from "@material-ui/core";
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
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
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
import { getData,serverImageMeter } from "../../api/api";
import TextField from "@material-ui/core/TextField";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import SearchIcon from "@material-ui/icons/Search";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import { height } from "dom-helpers";
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
var newMap = [];
var markerCluster = [];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
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
const getMapOptions = (maps,styleMap) => {
  return {
    streetViewControl: true,
    scaleControl: false,
    fullscreenControl: false,
    zoomControl: false,
    styles: [],
    gestureHandling: "greedy",
    disableDoubleClickZoom: false,
    mapTypeControl: false,

    mapTypeId:styleMap === "HYBRID" ?maps.MapTypeId.HYBRID:
    styleMap === "SATELLITE" ? maps.MapTypeId.SATELLITE:
    styleMap === "ROAD MAP" ? maps.MapTypeId.ROADMAP : maps.MapTypeId.HYBRID
    ,
    streetViewControlOptions: {
      // position: maps.ControlPosition.BOTTOM_LEFT,
    },
    mapTypeControlOptions: {
      style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
      // position: maps.ControlPosition.BOTTOM_LEFT,
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
export default function GoogleMapContainer() {
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
  const theme = useTheme();
  const [state, setState] = useState({
    markers: [],
    singleDetails: [],
    open: false,
    date_start: new Date(),
    date_end: new Date(),
    new_pickIndex: 0,
    prev_pickIndex: 0,

    new_marker: [],
    search: "",
    refresh: false,
    search2: "",
    selectedPic: "",
    degree: 0,
    searchDriver2: "",
    check_all: false,
    selected_details: [],
    modal_field_findings: false,
    field_findings: [],
    selected_field_findings: [],
    markers_map: []
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
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
    let jo_type = []
    let branch_field_details = []
    home_reducer.SelectedBranches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work)
          if (val.branch_field_details != null) {
            branch_field_details = JSON.parse(val.branch_field_details)
          }
        }
      }
    })
    map_reducer.accom_branch_field_details = branch_field_details
    map_reducer.accom_jo_type = jo_type
    map_reducer.accom_selected_jo = ""
    setBranches({
      ...branches,
      Selected_branch: e.target.value,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const refresh = () => {
    setState({ ...state });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    markerCluster.clearMarkers();
    dispatch_data("loading_map", true);
    let data = {
      parameter: "branch_id",
      selection: [branches.Selected_branch],
      from: moment(state.date_start).format("YYYY-MM-DD"),
      to: moment(state.date_end).format("YYYY-MM-DD"),
      ref: state.ref,
      jo_type: personName
    };
    // setState({ ...state, markers: [] });
    setOpen(false);
    getData("tracking/fetchAllAccomplishmentReport", data).then((res) => {
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
        val2["lat"] = lat;
        val2["lng"] = lng;

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
        let new_data = val;
        new_data["lat"] = lat;
        new_data["lng"] = lng;
        new_data["jo_id"] = val.id;
        new_data["imagePath"] = JSON.parse(val.accom_images);

        // let new_data = {
        //   lat: lat,
        //   lng: lng,
        //   jo_id: val.id,
        //   accom_findings: val.accom_findings,
        //   accom_id: val.accom_id,
        //   fetched_coordinates: val.fetched_coordinates,
        //   meter_number: val.meter_number,
        //   date_added: val.date_added,
        //   imagePath: JSON.parse(val.accom_images),
        //   customer_name:val.accom_name,
        // };
        locations.push(new_data);
      });
      let field_findings = []
      let selected_field_findings = []
      locations.forEach((val) => {
        let match = field_findings.filter((val_ff) => (val_ff === val.accom_findings))
        if (match.length == 0) {
          field_findings.push(val.accom_findings)
          selected_field_findings.push(val.accom_findings)
        }
      })
      field_findings.sort(function (a, b) {
        return a.localeCompare(b);
      });

      setState(prev => ({
        ...prev,
        pickIndex: index,
        accomplishments_all: jo_accom,
        markers: locations,
        markers_map: locations,
        refresh: !state.refresh,
        field_findings: field_findings,
        selected_field_findings: selected_field_findings
      }));
      // locations.map((val,index)=>{
      //   setTimeout(() => {
      //     state.markers_map.push(val)
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
      setState({ ...state, accomplishments_all: [], markers: [], markers_map: [] });
      dispatch_data("loading_map", false);
    }
    dispatch_data("coordinates", accom2);
    mapRef2.current = !mapRef2.current;
  };
  const searchDriver2 = (event) => {
    setState({ ...state, searchDriver2: event.target.value.substr(0, 20) });
  }
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
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     console.log("Latitude is :", position.coords.latitude);
      //     console.log("Longitude is :", position.coords.longitude);
      //   });
    });
  };
  const onClickMarker = (marker, index) => {
    var latlong = "";
    var splitlatlng = "";
    var lat = "";
    var lng = "";
    latlong = String(marker.fetched_coordinates);
    splitlatlng = latlong.split(",");
    lat = parseFloat(splitlatlng[0]);
    lng = parseFloat(splitlatlng[1]);
    // let jo_data = {
    //   accom_findings: marker.accom_findings,
    //   accom_id: marker.accom_id,
    //   fetched_coordinates: marker.fetched_coordinates,
    //   jo_id: marker.jo_id,
    //   imagePath: marker.imagePath,
    //   meter_number: marker.meter_number,
    //   date_added: marker.date_added,
    // };
    let new_array = [];
    new_array.push(marker);
    // let icon = {
    //   url: require("../../../assets/map image/online.png"),
    //   scaledSize: new window.google.maps.Size(40, 48),
    // };
    // newMap[index].icon = icon
    // console.log(newMap)
    // state.singleDetails = new_array;
    ArrangeDetailsDisplay(marker)
    setState(prev => ({ ...prev, singleDetails: new_array, new_pickIndex: index }));
    // setmapOption({ ...mapOption, lat: lat, lng: lng })
  };
  let NewMarker = state.markers_map.filter((files) => {
    return (
      files.meter_number
        .toLowerCase()
        .indexOf(state.search.toLocaleLowerCase()) !== -1
    );
  });
  const setGoogleMapRef = (map, maps) => {
    //   console.log(map)
    state.new_marker = [];
    mapRef.current = { map, maps };
    let googleMapRef = map;
    let googleRef = maps;
    let marker = [];
    let newMarker = [];
    let image = "";
    if (
      parseInt(branches.Selected_branch) === 51 ||
      parseInt(branches.Selected_branch) === 67 || parseInt(branches.Selected_branch) === 63 || parseInt(branches.Selected_branch) === 72 || parseInt(branches.Selected_branch) === 74 ||
      parseInt(branches.Selected_branch) === 76 ||  parseInt(branches.Selected_branch) === 77 ||  parseInt(branches.Selected_branch) === 78 ||  parseInt(branches.Selected_branch) === 79 ||
      parseInt(branches.Selected_branch) === 80 ||  parseInt(branches.Selected_branch) === 81
    ) {
      image = require("../../../assets/map image/water_new.png");
    } else if (parseInt(branches.Selected_branch) === 3) {
      image = require("../../../assets/map image/electric.png");
    } else if (parseInt(branches.Selected_branch) === 11) {
      image = require("../../../assets/map image/pole4.png");
    } else {
      image = require("../../../assets/map image/envelop.png");
    }

    // Clear out the old markers.
    // marker.forEach(function(marker2){
    //     console.log(marker2)
    //     marker2.setMap(null);
    //   });
    let lastWIndow = "";
    newMap =
      NewMarker &&
      NewMarker.map((location, index) => {
        let icon = {
          url: image,
          scaledSize: new window.google.maps.Size(30, 38),
        };
        if (state.new_pickIndex === index) {
          icon = {
            url: image,
            scaledSize: new window.google.maps.Size(30, 38),
          };
        } else {
          icon = {
            url: image,
            scaledSize: new window.google.maps.Size(30, 38),
          };
        }
        let marker = new googleRef.Marker({
          position: location,
          icon: icon,
        });
        var infoWindow = new googleRef.InfoWindow({});
        googleRef.event.addListener(marker, "click", function (evt) {
          if (lastWIndow !== "") {
            lastWIndow.close();
          }
          infoWindow.setContent(
            "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold'}}><b>" +
            location.meter_number +
            " | " +
            location.accom_findings +
            "</b></Typography>" +
            "<br/>" +
            "<Typography style={{fontWeight: 'bold'}}><b>" +
            moment(location.date_added).format("LLL") +
            "</b></Typography></div>"
          );
          infoWindow.open(map, marker);
          lastWIndow = infoWindow;
          onClickMarker(location, index);
        });
        state.new_marker.push(marker);
        // newMap.push(marker)
        return marker;
      });
    //   marker.map((new_markers)=>{
    //       return new_markers
    //   })
    markerCluster = new MarkerClusterer(map, newMap, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      gridSize: 10,
      minimumClusterSize: 2,
      maxZoom: 14,
    });
  };
  const mapRef = React.useRef();
  React.useEffect(() => {
    if (mapRef.current) {
      const { map, maps } = mapRef.current;
      setGoogleMapRef(map, maps);
    }
  }, [state.refresh]);
  React.useEffect(() => {
    if (mapRef.current) {
      markerCluster.clearMarkers();
      const { map, maps } = mapRef.current;
      setGoogleMapRef(map, maps);
    }
  }, [map_reducer.refresh]);
  function myClick(id) {
    const { map, maps } = mapRef.current;
    maps.event.trigger(state.new_marker[id], "click");
  }
  const onNext = (index) => {
    if (index < NewMarker.length) {
      //   let icon = {
      //     url: require("../../../assets/map image/online.png"),
      //     scaledSize: new window.google.maps.Size(40, 48),
      //   };
      myClick(index);
      // newMap[index].icon = icon

      let details = NewMarker[index];
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
      ArrangeDetailsDisplay(details)
      setState(prev => ({
        ...prev,
        singleDetails: [details],
        new_pickIndex: index,
        pickIndex: 1,
      }));
      // props.onToggleOpen(index)
      let isOpen = {
        [index]: true,
      };
      setIsOpen(isOpen);
    }
  };
  const ArrangeDetailsDisplay = (details) => {
    let findIndexJo_type = []
    let branch_field_details = []
    if (personName.length > 0) {
      findIndexJo_type = personName.findIndex((element) => (element === details.accom_jo_type))

      if (map_reducer.accom_branch_field_details.length > 0) {
        branch_field_details = map_reducer.accom_branch_field_details[findIndexJo_type]
      } else {
        let initial = [
          {
            name: 'Reference No.',
            key: 'meter_number'
          },
          {
            name: 'Field Findings',
            key: 'accom_findings'
          },
          {
            name: 'Remarks',
            key: 'accom_remarks'
          },
          {
            name: 'Reading',
            key: 'present_reading'
          },
          {
            name: 'Battery',
            key: 'accom_battery_life'
          },
          {
            name: 'Date',
            key: 'date_accom'
          },
          {
            name: 'Coordinates',
            key: 'fetched_coordinates'
          },
        ]
        branch_field_details = initial
      }
    }

    let new_branch_field_details = []
    branch_field_details.forEach((b_details) => {
      let data = b_details;
      [details].forEach((val) => {
        data['value'] = val[b_details.key]
      })
      new_branch_field_details.push(data)
    })

    setState(prev => ({ ...prev, selected_details: new_branch_field_details }))
  }
  const [personName, setPersonName] = React.useState([]);
  const onPrevious = (index) => {
    if (index >= 0) {
      myClick(index);
      //   let icon = {
      //     url: require("../../../assets/map image/online.png"),
      //     scaledSize: new window.google.maps.Size(40, 48),
      //   };
      // newMap[index].icon = icon
      let details = NewMarker[index];
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
      ArrangeDetailsDisplay(details)
      setState(prev => ({ ...prev, singleDetails: [details], new_pickIndex: index }));
    }
    let isOpen = {
      [index]: true,
    };
    setIsOpen(isOpen);
  };

  const search_accom = (e) => {
    setState({
      ...state,
      search2: e.target.value,
    });
  };
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if(state.markers_map.length>0){
  //     dispatch_data("loading_map", true);

  //       markerCluster.clearMarkers();
  //     }
  //       setState({
  //           ...state,
  //           search: state.search2,
  //           refresh:!state.refresh,
  //           singleDetails:[]
  //         });
  //         setmapOption({
  //           ...mapOption,

  //           zoom: 8,
  //         });
  //         setTimeout(()=>{
  //           dispatch_data("loading_map", false);

  //         },600)
  //   }, 600);
  //   return () => {
  //     // dispatch_data("loading_map", false);
  //     clearTimeout(timeout);
  //   };

  // }, [state.search2]);
  const searhAccom = () => {
    dispatch_data("loading_map", true);
    markerCluster.clearMarkers();
    setState({
      ...state,
      search: state.search2,
      refresh: !state.refresh,
      singleDetails: [],
    });
    setmapOption({
      ...mapOption,
      zoom: 8,
    });
    setTimeout(() => {
      dispatch_data("loading_map", false);
    }, 600);
  };
  const onChangeJobOrder = (e) => {
    map_reducer.accom_selected_jo = e.target.value
    setState({
      ...state,
    });
  };
  const handleListItemClick = (event, index, val) => {
    let jo_type = []
    let match = false
    if (val == 'ALL') {
      if (state.check_all == false) {
        map_reducer.accom_jo_type.map((va_data) => {
          jo_type.push(va_data)
        })
      } else {
        jo_type = []
      }
      setState({ ...state, check_all: !state.check_all })
    } else {
      personName.map((va_data) => {
        if (va_data != val) {
          jo_type.push(va_data)
        } else {
          match = true
        }
      })
      if (!match) {
        jo_type.push(val)

      }
    }
    setPersonName(jo_type);
  }
  const handleListItemClickFieldFindings = (event, index, val) => {
    if(val === "All"){
      if(state.selected_field_findings.length === state.field_findings.length){
        setState(prev => ({ ...prev,selected_field_findings:[]}))
      }else{
        setState(prev => ({ ...prev,selected_field_findings:state.field_findings}))
      }
      
    }else{
      let match = false
      state.selected_field_findings.forEach((val_ff, index) => {
        if (val === val_ff) {
          state.selected_field_findings.splice(parseInt(index), 1)
          match = true
          setState(prev => ({ ...prev }))
        }
      })
      if (!match) {
        state.selected_field_findings.push(val)
        setState(prev => ({ ...prev }))
      }
    }

  }
  const onSubmitFindings = (e) => {
    e.preventDefault()
    let data = []
    state.selected_field_findings.forEach((val) => {
      state.markers.map((val_markers) => {
        if (val === val_markers.accom_findings) {
          data.push(val_markers)
        }
      })
    })
    markerCluster.clearMarkers();
    setState(prev => ({
      ...prev,
      markers_map: data,
      refresh: !state.refresh,
      modal_field_findings: false
    }))
  }
  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={map_reducer.loading_map}
        style={{ zIndex: 999999999 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          width: "100%",
          height: 10,
          position: "fixed",
          zIndex: 2,
          left: 10,
          top: 70,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            variant="contained"
            color="#7f8c8d"
            className={classes.button}
            startIcon={<FilterListIcon />}
            style={{ marginRight: 10 }}
            onClick={() => {
              setState({ ...state, singleDetails: [] });
              setOpen(true);
            }}
          >
            Filter
          </Button>
          {state.markers_map.length ?
            <Button
              variant="contained"
              color="#7f8c8d"
              className={classes.button}
              startIcon={<FilterListIcon />}
              style={{ marginRight: 10 }}
              onClick={() => {
                setState({ ...state, modal_field_findings: true,singleDetails:[] });
              }}
            >
              Field FIndings
            </Button>
            : undefined

          }

          <input
            value={state.search2}
            style={{ marginRight: 3 }}
            placeholder="Search"
            onChange={search_accom}
          ></input>
          <Button
            variant="contained"
            color="#7f8c8d"
            className={classes.button}
            style={{ marginRight: 10 }}
            onClick={() => {
              searhAccom();
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div style={{ height: "100vh", width: "100%", position: "absolute" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A" }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => setGoogleMapRef(map, maps)}
          center={{ lat: mapOption.lat, lng: mapOption.lng }}
          zoom={mapOption.zoom}
          options={(maps)=>getMapOptions(maps,localStorage.getItem('MapOption'))}
        ></GoogleMapReact>
      </div>
      <Draggable>
        <div
          onClick={() => {
            dispatch_data("loading_map", true);

            setTimeout(() => {
              setState({
                ...state,
                search: "",
                search2: "",
                refresh: !state.refresh,
                singleDetails: [],
              });
              setmapOption({
                ...mapOption,
                zoom: 8,
              });
              dispatch_data("loading_map", false);
            }, 600);
          }}
          className={classes.dashboards}
          style={{
            cursor: "pointer",
            height: 160,
            width: 275,
            margin: 10,
            top: 100,
            position: "fixed",
            zIndex: 2,
            visibility: initialBoard.visibility,
          }}
        >
          <div style={{ padding: 15 }}>
            <Grid container className={classes.whiteText} spacing={2}>
              <Grid item xs={12}>
                <Typography style={{ fontSize: 18 }}>
                  {map_reducer.accom_selected_jo}
                </Typography>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Typography style={{ fontSize: 16 }}>
                    {moment(state.date_start).format("ll")}
                  </Typography>
                  <Typography style={{ fontSize: 16 }}>
                    &nbsp; - &nbsp;
                  </Typography>

                  <Typography style={{ fontSize: 16 }}>
                    {moment(state.date_end).format("ll")}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <ListAltIcon style={{ fontSize: 55, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 40 }}>
                      {state.markers_map.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -11, fontSize: 15 }}>
                    Total&nbsp;Accomplishments
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={12}></Grid>
            </Grid>
          </div>
        </div>
      </Draggable>
      {state.search !== "" ? (
        <Draggable>
          <div
            onClick={() => {
              setFieldman_list(!fieldman_list);
              clearTimeout(timerRef.current);
              setState({ ...state, singleFieldmanDash2: false });
            }}
            className={classes.dashboards}
            style={{
              cursor: "pointer",
              height: 60,
              width: 175,
              margin: 10,
              top: 258,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ padding: 15 }}>
              <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography style={{ fontSize: 18 }}>
                      Search : {NewMarker.length}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}></Grid>
              </Grid>
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
                    value={map_reducer.accom_selected_jo}
                  >
                    {map_reducer.accom_jo_type.map((val, index) => {
                      return (
                        <MenuItem value={val}>
                          {val}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}

                <FormControl className={classes.formControl} style={{ width: "100%" }} onClick={() => setState({ ...state, modal_employee: true })} >
                  <InputLabel shrink htmlFor="select-multiple-native" >
                    Job Order
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={personName}
                    // onChange={handleChange}

                    input={<Input />}
                    MenuProps={MenuProps}
                    readOnly
                  >

                    {map_reducer.accom_jo_type.map((val, index) => (
                      <MenuItem key={index} value={val} style={getStyles(val, personName, theme)}>
                        {val}
                      </MenuItem>
                    ))}
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
              width: 900,
              top: 60,
              right: 5,
              position: "fixed",
              zIndex: 2,
              visibility: initialBoard.visibility,
            }}
          >
            <div style={{ width: 880, height: 30, background: "rgba(0,0,0,0.8)", display: 'flex', alignItems: 'center', paddingRight: 10, paddingLeft: 10 }}>
              <div style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                <CloseIcon
                  style={{ color: '#000', fontSize: 13 }}
                  onClick={() => {
                    setState({ ...state, singleDetails: [] });
                  }}
                />
              </div>
              <div style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: '#353b48', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>

              </div>
              <div style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: '#353b48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              </div>

            </div>
            <div style={{ padding: 15 }}>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 1,
                }}
              >
                <Typography style={{ fontSize: 20, color: "#fff" }}>
                  Accomplishment
                </Typography>

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
                      <ArrowLeftIcon style={{ color: "#fff", fontSize: 40 }} />
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
                    <Typography>{state.new_pickIndex + 1} /</Typography>
                    <Typography>{NewMarker.length}</Typography>
                  </div>{" "}
                </Grid>
                <Grid item xs={4} md={4}>
                  {state.new_pickIndex < NewMarker.length - 1 ? (
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
                      <ArrowRightIcon style={{ color: "#fff", fontSize: 40 }} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>

              <Grid container className={classes.whiteText} spacing={2}>
                {state.singleDetails.map((val, index) => {
                  let name = "No Name";
                  let location = "No Address";

                  return (
                    <>
                      <Grid item xs={6} md={6}>
                        <Card variant="outlined" style={{ padding: 10, backgroundColor: '#000000cc' }}>
                          <Carousel
                            navButtonsAlwaysVisible={true}
                            autoPlay={false}
                          >
                            {val.imagePath.length !== 0 ? (
                              val.imagePath.map((valImage, index) => {
                                return (
                                  <img
                                    onClick={() => {
                                      setState({
                                        ...state,
                                        selectedPic: valImage.path,
                                        OpenPic: true,
                                      });
                                    }}
                                    src={
                                      serverImageMeter +
                                      valImage.path
                                    }
                                    alt="test"
                                    style={{ width: "100%", height: "300px" }}
                                  />
                                );
                              })
                            ) : (
                              <img
                                src={require("../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "300px" }}
                              />
                            )}
                          </Carousel>

                        </Card>
                        {/* display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden', */}

                        {/* <div style={{marginTop:10,overflow:'auto',whiteSpace:'nowrap'}}>
                            <div style={{width:120,height:60,backgroundColor:'#fff', display: 'inline-block'}}> 
                            <img
                                src={require("../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "100%",marginRight:5 }}
                              />
                            </div>
                            <div style={{width:120,height:60,backgroundColor:'#fff', display: 'inline-block'}}> 
                            <img
                                src={require("../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "100%",marginRight:5 }}
                              />
                            </div>
                            <div style={{width:120,height:60,backgroundColor:'#fff', display: 'inline-block'}}> 
                            <img
                                src={require("../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "100%",marginRight:5 }}
                              />
                            </div>
                            <div style={{width:120,height:60,backgroundColor:'#fff', display: 'inline-block'}}> 
                            <img
                                src={require("../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "100%",marginRight:5 }}
                              />
                            </div>
                            <div style={{width:120,height:60,backgroundColor:'#fff', display: 'inline-block'}}> 
                            <img
                                src={require("../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{ width: "100%", height: "100%",marginRight:5 }}
                              />
                            </div>
                            
                            
                          </div> */}
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Scrollbars style={{ height: 440 }}>
                          <div >
                            <Typography style={{ fontSize: 20 }}>
                              Details
                            </Typography>
                            <div style={{

                              backgroundColor: "rgba(0,0,0,0.7)",
                            }}>
                              {state.selected_details.map((val) => {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      margin: 10
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
                            </div>
                          </div>
                        </Scrollbars>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </div>
          </div>
        </Draggable>
      ) : undefined}
      {/* <Dialog
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
      </Dialog> */}
      <Dialog
        style={{ backgroundColor: "#000" }}
        // fullScreen={fullScreen}
        maxWidth="lg"
        open={state.OpenPic}
        onClose={() => setState({ ...state, OpenPic: false })}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        {/* <DialogContent> */}
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
                    onClick={(e) => setState({ ...state, OpenPic: false })}
                    style={{ color: "#bdc3c7" }}
                  />
                </IconButton>
              </div>
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
                        <AddIcon style={{ color: "#fff", fontSize: 15 }} />
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
                        <RemoveIcon style={{ color: "#fff", fontSize: 22 }} />
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
                        <ClearIcon style={{ color: "#fff", fontSize: 22 }} />
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
                          setState({
                            ...state,
                            degree: state.degree + 90,
                          });
                        }}
                      >
                        <RotateLeftIcon
                          style={{ color: "#fff", fontSize: 22 }}
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
                          setState({
                            ...state,
                            degree: state.degree + 90,
                          });
                        }}
                      >
                        <RotateRightIcon
                          style={{ color: "#fff", fontSize: 22 }}
                        />
                      </IconButton>
                    </div>
                    <TransformComponent style={{ zIndex: 999 }}>
                      {state.singleDetails.map((val, index) => {
                        let images = [];
                        if (
                          val.accom_images !== "" &&
                          val.accom_images !== null
                        ) {
                          images = val.imagePath;
                        }
                        return (
                          <div>
                            {val.imagePath.length !== 0 ? (
                              // images.map((images,index) => {
                              //   return (
                              <img
                                onClick={() => {
                                  // onCLickImage(images);
                                }}
                                src={
                                  serverImageMeter +
                                  state.selectedPic
                                }
                                alt="test"
                                style={{
                                  width: window.innerWidth * 0.585,
                                  height: window.innerHeight * 0.82,
                                  transform:
                                    "rotate(" +
                                    String(state.degree) +
                                    "deg)",
                                }}
                              />
                              // );
                              // })
                            ) : (
                              <img
                                src={require("../../../assets/map image/no_image.png")}
                                alt="test"
                                style={{
                                  width: window.innerWidth * 0.585,
                                  height: window.innerHeight * 0.82,
                                  transform:
                                    "rotate(" + String(state.degree) + "deg)",
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </Grid>

          </Grid>
        </div>
        {/* </DialogContent> */}
      </Dialog>
      <Dialog fullWidth maxWidth='xs' open={state.modal_employee} aria-labelledby="responsive-dialog-title" >
        <DialogTitle id="simple-dialog-title">Select Job Order Type</DialogTitle>
        <DialogContent>
          <form>
            <Card variant='outlined'>
              <CardContent>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} md={12}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <TextField size='small' id="outlined-basic" label="Search" style={{ width: '100%' }} onChange={searchDriver2} variant="outlined" />
                                        </div>
                                    </Grid> */}
                  <Grid item xs={12} md={12}>
                    <List component="nav" aria-label="main mailbox folders" >
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
                      {map_reducer.accom_jo_type.map((val, index) => {
                        let value = personName.filter((data) => (data == val))
                        let check = false
                        if (value.length != 0) {
                          check = true
                        }
                        return <>
                          <Divider />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={check}
                                onChange={(event) => { handleListItemClick(event, index, val) }}
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label={val}
                          />
                        </>
                      })
                      }
                      <Divider />
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState({ ...state, modal_employee: false, searchDriver2: '' })} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth='xs'
        onClose={() => setState({ ...state, modal_field_findings: false })} open={state.modal_field_findings} aria-labelledby="responsive-dialog-title" >
        <DialogTitle id="simple-dialog-title">Field Findings</DialogTitle>
        <form onSubmit={onSubmitFindings}>
          <DialogContent>
            <div style={{ height: 250 }}>
              <Divider />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.field_findings.length === state.selected_field_findings.length?true:false}
                    onChange={(event) => {
                      handleListItemClickFieldFindings(event, '', 'All')
                    }}
                    name="field_findings"
                    color="primary"
                  />
                }
                label={'All'}
              />
              <Divider />
              {state.field_findings.map((val, index) => {
                let match = state.selected_field_findings.filter((val_ff) => (val === val_ff))
                let check = false
                if (match.length > 0) {
                  check = true
                }
                return <>
                  <Divider />
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={check}
                        onChange={(event) => {
                          handleListItemClickFieldFindings(event, index, val)
                        }}
                        name="field_findings"
                        color="primary"
                      />
                    }
                    label={val}
                  />
                </>
              })
              }
            </div>
            <Divider />

          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              size={"small"}
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "white",
              }}>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}
