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
    TableContainer
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
import AccountTreeIcon from '@material-ui/icons/AccountTree';
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
import GoogleMapReact from "google-map-react";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Draggable from "react-draggable";
import Carousel from "react-material-ui-carousel";
import GroupIcon from '@material-ui/icons/Group';
import CachedIcon from '@material-ui/icons/Cached';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
// import { getData, sqlData } from '../../../api/api';
import { useDispatch, useSelector } from "react-redux";
// import CancelledMarker from "../../../../assets/map image/canceled-activity-marker.png";
// import OnTripMarker from "../../../../assets/map image/default.png";
// import DefaultMarker from "../../../../assets/map image/electron-blue.png";
// import MarkerFrom from "../../../../assets/map image/from.png";
// import IdleMarker from "../../../../assets/map image/gray.png";
// import OnTransitActivityMarker from "../../../../assets/map image/ontransit-activity-marker.png";
// import QueueRequestMarker from "../../../../assets/map image/pending-activity-marker.png";
// import MarkerTo from "../../../../assets/map image/to.png";
import { getData, serverImageMeter, serverProfile } from "../../../api/api";
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
import './style.css'
import EventNoteIcon from '@material-ui/icons/EventNote';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BgreenMarker from '../../../../assets/map image/bgreen-marker.png'
import BlackMarker from '../../../../assets/map image/black-marker.png'
import BlueMarker from '../../../../assets/map image/blue-marker.png'
import BrownMarker from '../../../../assets/map image/brown-marker.png'
import DbrownMarker from '../../../../assets/map image/dbrown-marker.png'
import GrayMarker from '../../../../assets/map image/gray-marker.png'
import GreenMarker from '../../../../assets/map image/green-marker.png'
import LgreenMarker from '../../../../assets/map image/lgreen-marker.png'
import LpurpleMarker from '../../../../assets/map image/lpurple-marker.png'
import LyellowMarker from '../../../../assets/map image/lyellow-marker.png'
import OrangeMarker from '../../../../assets/map image/orange-marker.png'
import PblueMarker from '../../../../assets/map image/pblue-marker.png'
import PinkMarker from '../../../../assets/map image/pink-marker.png'
import PpurpleMarker from '../../../../assets/map image/ppurple-marker.png'
import PurpleMarker from '../../../../assets/map image/purple-marker.png'
import RedMarker from '../../../../assets/map image/red-marker.png'
import SblueMarker from '../../../../assets/map image/sblue-marker.png'
import SkyBlueMarker from '../../../../assets/map image/skyBlue-marker.png'
import WhiteMarker from '../../../../assets/map image/white-marker.png'
import YellowMarker from '../../../../assets/map image/yellow-marker.png'
import YGreenMarker from '../../../../assets/map image/ygreen-marker.png'
import NoCircleBlue from '../../../../assets/map image/no-circle-blue.png'
import NoCircleBrown from '../../../../assets/map image/no-circle-brown.png'
import NoCircleDarkBrown from '../../../../assets/map image/no-circle-darkbrown.png'
import NoCircleDarkGreen from '../../../../assets/map image/no-circle-darkgreen.png'
import NoCircleGray from '../../../../assets/map image/no-circle-gray.png'
import NoCircleLightGreen from '../../../../assets/map image/no-circle-light-green.png'
import NoCircleRed from '../../../../assets/map image/no-circle-red.png'
import NoCircleTeal from '../../../../assets/map image/no-circle-teal.png'
import NoCircleViolet from '../../../../assets/map image/no-circle-violet.png'
import NoCircleYellow from '../../../../assets/map image/no-circle-yellow.png'

import TextureBlue from '../../../../assets/map image/texture-blue.png'
import TextureBrownD from '../../../../assets/map image/texture-brown-d.png'
import TextureBrown from '../../../../assets/map image/texture-brown.png'
import TextureGray from '../../../../assets/map image/texture-gray.png'
import TextureGreen from '../../../../assets/map image/texture-green.png'
import TextureGreenD from '../../../../assets/map image/texture-green-d.png'
import TexturePink from '../../../../assets/map image/texture-pink.png'
import TextureRed from '../../../../assets/map image/texture-red.png'
import TextureTeal from '../../../../assets/map image/texture-teal.png'
import TextureViolet from '../../../../assets/map image/texture-violet.png'
import TextureYellow from '../../../../assets/map image/texture-yellow.png'







import TodayIcon from '@material-ui/icons/Today';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RefreshIcon from '@material-ui/icons/Refresh';
import CreateIcon from '@material-ui/icons/Create';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import GetAppIcon from "@material-ui/icons/GetApp";
import ReactExport from "react-data-export";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    validate,
    DatePicker
} from "@material-ui/pickers";
import AutoComplete from '../initial/autocomplete'
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import AccomDetails from './AccomDetails'
import gsap from 'gsap'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
let flightPath
let width = window.innerWidth;
let height_window = window.innerHeight;
let circleCord
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
    parentContainer: {
        width: '100%',
        height: 35,
        backgroundColor: '#115293',
        position: "absolute",
        top: 50,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    },
    iconParentGroup: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',

    },
    endSection: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center'
    },
    endIcon: {
        height: 25,
        width: 30,
        backgroundColor: '#1765b3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        cursor: 'pointer'
    },

    customTable: {
        "& .MuiTableCell-sizeSmall": {
            padding: "5px 0px 5px 15px" // <-- arbitrary value
        }
    },
    fontSize: {
        fontSize: 12
    },
    fontSizeHeader: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    fontSizeTotal: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    fontSizeIcon: {
        fontSize: 10,
        color: '#115293'
    },
    iconStyle: {
        color: '#fff',
        fontSize: 17
    },
    fontStyle: {
        color: '#fff',
        fontSize: 11.5,
        fontWeight: 600
    },
    iconParent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1765b3',
        height: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 2,
        cursor: 'pointer'

    },
});

const getMapOptions = (maps, cursor, styleMap) => {
    return {
        streetViewControl: true,
        scaleControl: false,
        fullscreenControl: false,
        zoomControl: false,
        styles: [],
        gestureHandling: "greedy",
        disableDoubleClickZoom: false,
        mapTypeControl: false,

        mapTypeId: styleMap === "HYBRID" ? maps.MapTypeId.HYBRID :
            styleMap === "SATELLITE" ? maps.MapTypeId.SATELLITE :
                styleMap === "ROAD MAP" ? maps.MapTypeId.ROADMAP : maps.MapTypeId.HYBRID
        ,
        streetViewControlOptions: {
            position: maps.ControlPosition.TOP_LEFT,
        },
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
        draggableCursor: cursor
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
    const handleBranch = useSelector((state) => state.home_reducer.handleBranch);
    const SelectedBranches = useSelector((state) => state.home_reducer.SelectedBranches);
    const company_name = useSelector((state) => state.home_reducer.company_name);
    let accom_branch_field_details = useSelector((state) => state.map_reducer.accom_branch_field_details);
    let accom_jo_type = useSelector((state) => state.map_reducer.accom_jo_type);
    let accom_selected_jo = useSelector((state) => state.map_reducer.accom_selected_jo);
    const refresh = useSelector((state) => state.map_reducer.refresh);
    const loading_map = useSelector((state) => state.map_reducer.loading_map);
    const refreshAccomDetails = useSelector((state) => state.map_reducer.refreshAccomDetails);
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
        markers_map: [],
        fieldman_list: [],
        fieldman_checked: [],
        branch_name_display: "",
        selectedMarker: "",
        searchAccountPerson: "",
        pathCoordinates: [],
        createPolyline: false,
        modal_list_jo: false,
        list_jo: [],
        cursor: '',
        location_modal: false,
        location_lat: "",
        location_lng: "",
        location_date: new Date(),
        diameter: 0.5,
        location_description: "",
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        },

        date_range_modal: false,
        selected_fieldman: [],
        selected_accoom: [],
        assignCount: 0,
        imageDisplay: [],
        minimize: false

    });
    const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const [branches, setBranches] = useState({
        branches: [],
        companies: [],
        filteredBranch: [],
        Selectedcompany: "",
        Selected_branch: "",
        ref: "",
        branch_name: "",

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
    useEffect(() => {
        let mounted = true;
        const script = document.createElement("script");
        script.src =
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
        script.async = true;
        document.body.appendChild(script);
        dispatch_data("loading_map", true);
        dispatch_data("accomplishments_map", []);
        getBranches();

        return () => (mounted = false);
    }, []);
    const onChangeCompany = (e) => {
        const branches_data = handleBranch.filter(
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
        setPersonName([])
        setState({ ...state, comp_id: e.target.value });
    };
    const onChangeText = (e) => {

        setState({ ...state, [e.target.name]: e.target.value });
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
        let branch_name = ""
        SelectedBranches.map((val, index) => {
            if (val.branch_id === e.target.value) {
                if (val.branch_field_work !== "") {
                    jo_type = JSON.parse(val.branch_field_work)
                    if (val.branch_field_details != null) {
                        branch_field_details = JSON.parse(val.branch_field_details)

                    }
                }
                branch_name = val.branch_name
            }
        })
        // accom_branch_field_details = branch_field_details
        // accom_jo_type = jo_type

        // console.log(jo_type)
        // accom_selected_jo = ""
        dispatch({
            type:'MapReducerState',
            data:{
                accom_branch_field_details:branch_field_details,
                accom_jo_type:jo_type,
                accom_selected_jo : ""
            }
        })
        setBranches({
            ...branches,
            Selected_branch: e.target.value,
            branch_name: branch_name
        });
        setPersonName([])
    };
    const handleClose = () => {
        setOpen(false);
    };
    const refreshFunc = () => {
        setState({ ...state });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        markerCluster.clearMarkers();

        let data = {
            parameter: "branch_id",
            selection: [branches.Selected_branch],
            from: moment(state.date_start).format("YYYY-MM-DD"),
            to: moment(state.date_start).format("YYYY-MM-DD"),
            ref: state.ref,
            jo_type: personName,
            company_id: state.comp_id
        };
        sessionStorage.setItem('onSelectSingleDateGraph', JSON.stringify(data))
        let branch_name = branches.branch_name
        if (branches.branch_name == '') {
            branch_name = state.branch_name_display
        }

        fetchAllAccomplishments(data, branch_name, personName)
        // setState({ ...state, markers: [] });

    };
    const getBranches = () => {
        getData("HumanResource/getHandleBranch", {
            user_id: localStorage.getItem("u"),
        }).then((response) => {
            let company = [];
            let branch_id = ""
            let branch_name = ""
            let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph")
            if (onSelectData !== null) {
                onSelectData = JSON.parse(onSelectData)
                branch_id = onSelectData.selection[0]
                onSelectData.to = onSelectData.from
            }
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
                if (branch_id === item.branch_id) {
                    branch_name = item.branch_name
                }
            });

            if (onSelectData != null) {
                fetchAllAccomplishments(onSelectData, branch_name)
                setPersonName(onSelectData.jo_type)
                const branches_data = response.response.filter(
                    (val) => val.company_id == onSelectData.company_id
                );
                branches_data.sort(function (a, b) {
                    return a["branch_name"].localeCompare(b["branch_name"]);
                });
                let branch_field_details = []
                let jo_type = ""
                response.response.map((val, index) => {
                    if (val.branch_id === branch_id) {

                        if (val.branch_field_work !== "") {
                            jo_type = JSON.parse(val.branch_field_work)
                            if (val.branch_field_details != null) {
                                branch_field_details = JSON.parse(val.branch_field_details)

                            }
                        }
                    }
                })
                accom_branch_field_details = branch_field_details
                accom_jo_type = jo_type

                dispatch_data("MapReducerState", { accom_branch_field_details: branch_field_details, accom_jo_type: jo_type });

                dispatch_data("SelectedBranches", branches_data);
            }

            dispatch_data("gethandleBranch", response.response);
            dispatch_data("company_name", company);
            // dispatch_data("SelectedBranches", []);
            //   navigator.geolocation.getCurrentPosition(function(position) {
            //     console.log("Latitude is :", position.coords.latitude);
            //     console.log("Longitude is :", position.coords.longitude);
            //   });
        });
    };
    const fetchAllAccomplishments = (data, branch_name, personName) => {

        setOpen(false);
        dispatch_data("loading_map", true);
        getData("tracking/fetchAllAccomplishment", data).then((res) => {

            let accom = [];
            let accom2 = [];
            var lat = "";
            var lng = "";
            let fieldman_list = []
            let fieldman_checked = []


            let marker = [BgreenMarker,
                BlueMarker,
                TextureYellow,
                DbrownMarker,
                TextureBlue,
                GrayMarker,
                PinkMarker,
                TextureBrownD,
                GreenMarker,
                TextureBrown,
                LpurpleMarker,
                TextureGray,
                LyellowMarker,
                OrangeMarker,
                PblueMarker,
                TextureGreen,
                TexturePink,
                YGreenMarker,
                PurpleMarker,
                TextureGreenD,
                RedMarker,
                LgreenMarker,
                SkyBlueMarker,
                TextureRed,
                WhiteMarker,
                YellowMarker,
                SblueMarker,
                TextureTeal,
                TextureViolet
            ]

            let marker_count_index = 0;


            res.accomplishment.map((val2, index) => {
                let fieldman = fieldman_list.filter((val) => (val.user_id == val2.user_id))
                if (fieldman.length === 0) {
                    fieldman_list.push({ user_id: val2.user_id, name: val2.completename, accom: 1, user_pic: val2.user_pic })
                    fieldman_checked.push(val2.user_id)
                } else {
                    fieldman_list.forEach((val) => {
                        if (val.user_id == val2.user_id) {
                            val.accom++
                        }
                    })
                }

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
            fieldman_list.sort(function (a, b) {
                return a['name'].localeCompare(b['name']);
            });
            let assign = []
            let assignCount = 0;
            res.resultassign.forEach((val) => {
                let match = assign.indexOf((val2) => (val2.user_id == val.user_id))
                if (match === -1) {
                    assign.push(({ user_id: val.user_id, jo_count: val.jo_count }))
                } else {
                    assign[match].jo_count += val.jo_count
                    // assign.push(({user_id:val.user_id,jo_count:val.jo_count}))
                }
                if (val.user_id != 0) {
                    assignCount += parseInt(val.jo_count)
                }
            })
            fieldman_list.forEach((val) => {
                if (marker.length === marker_count_index) {
                    marker_count_index = 0
                }
                val.url = marker[marker_count_index]
                let match_data = assign.filter((assign_val) => (assign_val.user_id === val.user_id))
                val.jo_count = 0
                if (match_data.length > 0) {
                    val.jo_count = match_data[0].jo_count
                }
                if (marker.length > marker_count_index) {
                    marker_count_index++
                }
            })
            getImagesInitial(accom, 0, accom2, fieldman_list, fieldman_checked, branch_name, data, 'initial', assignCount);
        });
    }
    const getImagesInitial = (jo_accom, index, accom2, fieldman_list, fieldman_checked, branch_name, data, type, assignCount) => {
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
                new_data["imagePath"] = [];

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
            if (type === 'initial') {
                setState(prev => ({
                    ...prev,
                    ...prev,
                    pickIndex: index,
                    accomplishments_all: jo_accom,
                    markers: locations,
                    markers_map: locations,
                    refresh: !state.refresh,
                    field_findings: field_findings,
                    selected_field_findings: selected_field_findings,
                    fieldman_list: fieldman_list,
                    fieldman_checked: fieldman_checked,
                    branch_name_display: branch_name,
                    pathCoordinates: [],
                    createPolyline: false,
                    cursor: "",
                    comp_id: data.company_id,
                    date_start: data.from,
                    location_modal: false,
                    location_description: "",
                    location_lat: "",
                    location_lng: "",
                    selected_fieldman: [],
                    assignCount: assignCount
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    pickIndex: index,
                    accomplishments_all: jo_accom,
                    markers: locations,
                    markers_map: locations,
                    refresh: !state.refresh,
                    field_findings: field_findings,
                    selected_field_findings: selected_field_findings,
                    fieldman_list: fieldman_list,
                    fieldman_checked: fieldman_checked,
                    branch_name_display: branch_name,
                    pathCoordinates: [],
                    createPolyline: false,
                    cursor: "",
                    comp_id: data.company_id,
                    date_start: data.from,
                    location_modal: false,
                    date_range_modal: false,
                    assignCount: assignCount
                }));
            }
            setBranches(prev => ({ ...prev, Selected_branch: data.selection[0] }))

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
            setState({
                ...state, accomplishments_all: [], markers: [], markers_map: [], branch_name_display: branch_name,
                pathCoordinates: [],
                markers: [],
                markers_map: [],
                refresh: !state.refresh,
                createPolyline: false,
                cursor: "",
                comp_id: data.company_id,
                date_start: data.from,
                fieldman_list: [],
                fieldman_checked: [],
                location_modal: false,
                selected_fieldman: []
            });
            setBranches(prev => ({ ...prev, Selected_branch: data.selection[0] }))
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
        setState(prev => ({ ...prev, singleDetails: new_array, new_pickIndex: index, selectedMarker: marker.user_id }));
        // setmapOption({ ...mapOption, lat: lat, lng: lng })
    };
    let NewMarker = state.markers_map.filter((files) => {
        return (
            files.meter_number
                .toLowerCase()
                .indexOf(state.search.toLocaleLowerCase()) !== -1
        );
    });

    const onClickInfoWindow = (location,index) => {
        let data = {
            accom_id: location.accom_id,
            jo_id: location.id
        }
        dispatch_data("loading_map", true);
        getData('Tracking/GetAccomDetails', data).then((res) => {
            onClickMarker(location, index)
            // dispatch({
            //     type: 'MapReducerState',
            //     data: {
            //         selected_data: res.accomplishment,
            //         refreshAccomDetails: !refreshAccomDetails,
            //         selectedAccomIndex: index
            //     }
            // })
            dispatch_data("loading_map", false);
            // res.accomplishment.map((val, index) => {
            //     infoWindow.setContent(
            //         "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold',fontSize:17}}><b>" +
            //         val.accom_fieldman_name +
            //         // "</b></Typography>"+"<br/>" +"<Typography style={{fontWeight: 'bold'}}><b>" +
            //         // val.meter_number +
            //         // " | " +
            //         // val.accom_findings +
            //         // "</b></Typography>" +
            //         "<br/>" +
            //         "<Typography style={{fontWeight: 'bold'}}><b>" +
            //         moment(location.date_accom).format("LLL") +
            //         "</b></Typography></div>"
            //     );
            //     infoWindow.open(map, marker);
            //     lastWIndow = infoWindow;
            // })


        })
    }
    const initial = React.useRef(false)

    const setGoogleMapRef = (map, maps) => {
        //   console.log(map)
        state.new_marker = [];
        mapRef.current = { map, maps };
        let googleMapRef = map;
        let googleRef = maps;
        let marker = [];
        let newMarker = [];
        let image = "";

        flightPath = new googleRef.Polyline({
            path: state.pathCoordinates,
            geodesic: true,
            strokeColor: "#FFC312",
            strokeOpacity: 1.0,
            strokeWeight: 2,
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
        });

        flightPath.setMap(map);



        circleCord = new maps.Circle({
            strokeColor: "#2ecc71",
            strokeOpacity: 0.2,
            strokeWeight: 2,
            fillColor: "#2ecc71",
            fillOpacity: 0.35,
            map,
            center: { lat: state.location_lat, lng: state.location_lng },
            radius: state.diameter * 1000,
        });
        circleCord.setMap(map);
        // Clear out the old markers.
        // marker.forEach(function(marker2){
        //     console.log(marker2)
        //     marker2.setMap(null);
        //   });
        let lastWIndow = "";
        newMap =
            NewMarker &&
            NewMarker.map((location, index) => {
                let match_url = state.fieldman_list.filter((val) => location.user_id === val.user_id)
                if (match_url.length === 0) {
                    match_url = state.fieldman_list.filter((val) => moment(location.date_accom).format("YYYY-MM-DD") === val.user_id)
                }
                let icon = {
                    url: match_url[0].url,
                    scaledSize: new window.google.maps.Size(20, 28)
                }
                // let icon = {
                //     // path: new window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                //     strokeColor: "pink",
                //     scaledSize: new window.google.maps.Size(30, 38),
                // };

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
                        "<div><div style='display:flex;flex-direction:row><Typography style='font-size:17px'><b>" +
                        location.completename + " | " + "<span  id='onClickInfoWindow' style='color:#4c98dc;cursor:pointer;font-size:14px'><u>View</u></span>" +
                        "<br/>" +
                        "<Typography style='font-size:13px'><b>" +
                        moment(location.date_accom).format("LLL") +
                    "</b></Typography></div></div>"
                    );
                   googleRef.event.addListener(infoWindow, 'domready', function() {
                       googleRef.event.addDomListener(document.getElementById("onClickInfoWindow"), 'click', function(e) {
                            onClickInfoWindow(location,index)
                        })
                      });
                    infoWindow.open(map, marker);
                    lastWIndow = infoWindow;

                    // infoWindow.setContent(
                    //     "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold'}}><b>" +
                    //     location.completename + " | " + location.meter_number +
                    //     " | " +
                    //     location.accom_findings +
                    //     "</b></Typography>" +
                    //     "<br/>" +
                    //     "<Typography style={{fontWeight: 'bold'}}><b>" +
                    //     moment(location.date_accom).format("LLL") +
                    //     "</b></Typography></div>"
                    // );
                    // infoWindow.open(map, marker);
                    // lastWIndow = infoWindow;
                    // onClickMarker(location, index);
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
            maxZoom: 10,
        });
        if( initial.current){
            dispatch_data("loading_map", false);

        }
        initial.current = true
    };
    const mapRef = React.useRef();
    React.useEffect(() => {
        if (mapRef.current) {
            markerCluster.clearMarkers();
            flightPath.setMap(null)
            circleCord.setMap(null)
            const { map, maps } = mapRef.current;
            setGoogleMapRef(map, maps);
        }
    }, [state.refresh]);
    React.useEffect(() => {
        if (mapRef.current) {
            markerCluster.clearMarkers();
            flightPath.setMap(null)
            circleCord.setMap(null)
            const { map, maps } = mapRef.current;
            setGoogleMapRef(map, maps);
        }
    }, [refresh]);

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
    const formatNumber = (num) => {
        if (num != "") {
            let num2 = parseFloat(num);
            return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
            return 0;
        }
    };
    const ArrangeDetailsDisplay = (details) => {
        let findIndexJo_type = []
        let branch_field_details = []
        if (personName.length > 0) {
            findIndexJo_type = personName.findIndex((element) => (element === details.accom_jo_type))
            if (accom_branch_field_details.length > 0) {
                branch_field_details = accom_branch_field_details[findIndexJo_type]
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
        accom_selected_jo = e.target.value
        setState({
            ...state,
        });
    };
    const handleListItemClick = (event, index, val) => {
        let jo_type = []
        let match = false
        if (val == 'ALL') {
            if (state.check_all == false) {
                accom_jo_type.map((va_data) => {
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
        if (val === "All") {
            if (state.selected_field_findings.length === state.field_findings.length) {
                setState(prev => ({ ...prev, selected_field_findings: [] }))
            } else {
                setState(prev => ({ ...prev, selected_field_findings: state.field_findings }))
            }

        } else {
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
    const onCheckFieldman = (user_id) => {
        dispatch_data("loading_map", true);
        let index = state.fieldman_checked.findIndex(val => (val === user_id))
        let checked = state.fieldman_checked
        let new_marker = []

        if (user_id === "ALL") {
            if (state.fieldman_checked.length >= state.fieldman_list.length) {
                state.fieldman_checked = []


            } else {
                state.fieldman_list.forEach((val) => {
                    state.fieldman_checked.push(val.user_id)

                })
                state.markers.forEach((val) => {
                    let match = checked.filter((val_checked) => (val_checked === val.user_id))
                    if (match.length === 0) {
                        match = checked.filter((val_checked) => (val_checked === moment(val.date_accom).format('YYYY-MM-DD')))
                    }

                    if (match.length > 0) {
                        new_marker.push(val)
                    }
                })
            }
            setmapOption({
                ...mapOption,
                zoom: 11,
            });
        } else {

            if (index < 0) {
                state.fieldman_checked.push(user_id)
            } else {
                state.fieldman_checked.splice(index, 1)
                // checked.splice(index,1)
            }
            state.markers.forEach((val) => {
                let match = checked.filter((val_checked) => (val_checked === val.user_id))
                if (match.length === 0) {
                    match = checked.filter((val_checked) => (val_checked === moment(val.date_accom).format('YYYY-MM-DD')))
                }
                if (match.length > 0) {
                    new_marker.push(val)
                }
            })
        }
        markerCluster.clearMarkers();
        setState(prev => ({
            ...prev, new_pickIndex: '',
            selected_details: [],
            singleDetails: [], markers_map: new_marker, refresh: !state.refresh, searchAccountPerson: ""
        }))

    }
    const hideHistory = () => {
        document.getElementById("div-details").style.cssText =
            "transition: 0.5s;left:-100%;";
    }
    const serachCoordinates = (e) => {
        let data = e.target.value
        setState(prev => ({ ...prev, searchAccountPerson: data }))
    }

    const onSearch = () => {
        let search_value = state.markers.filter((files) => {
            return (
                files.completename !== null && files.completename
                    .toLowerCase()
                    .indexOf(state.searchAccountPerson.toLocaleLowerCase()) !== -1 ||
                files.meter_number !== null && files.meter_number
                    .toLowerCase()
                    .indexOf(state.searchAccountPerson.toLocaleLowerCase()) !== -1
            );
        })
        let fieldman_checked = []
        if (search_value.length > 0) {
            search_value.forEach((val, index) => {
                let match = fieldman_checked.filter((val_check) => (val_check = val.user_id))
                if (match.length == 0) {
                    fieldman_checked.push(val.user_id)
                }
                if (index === 0) {
                    let latlong = String(val.fetched_coordinates);
                    let splitlatlng = latlong.split(",");
                    let lat = splitlatlng[0];
                    let lng = splitlatlng[1];
                    setmapOption({
                        ...mapOption,
                        lat: parseFloat(lat),
                        lng: parseFloat(lng),
                        zoom: 15,
                    });
                }

            })
        }

        markerCluster.clearMarkers();
        setState(prev => ({ ...prev, markers_map: search_value, fieldman_checked: fieldman_checked, refresh: !state.refresh }))
    }

    const pointInPolygon = (polygonPath, coordinates) => {
        let numberOfVertexs = polygonPath.length - 1;
        let inPoly = false;
        let {
            lat,
            lng
        } = coordinates;

        let lastVertex = polygonPath[numberOfVertexs];
        let vertex1, vertex2;

        let x = lat,
            y = lng;

        let inside = false;
        for (var i = 0, j = polygonPath.length - 1; i < polygonPath.length; j = i++) {
            let xi = polygonPath[i].lat,
                yi = polygonPath[i].lng;
            let xj = polygonPath[j].lat,
                yj = polygonPath[j].lng;

            let intersect = ((yi > y) != (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }

    const onGetPolygon = () => {
        let pathCoordinates = JSON.stringify(state.pathCoordinates)
        let pathCoordinates2 = JSON.parse(pathCoordinates)

        if (pathCoordinates.length > 0) {
            pathCoordinates2.push(state.pathCoordinates[0])
        }
        let match_data = []
        for (let index = 0; index < NewMarker.length; index++) {
            let return_data = pointInPolygon(pathCoordinates2, NewMarker[index])
            if (return_data) {
                match_data.push(NewMarker[index])
            }
        }
        match_data.sort(function (a, b) {
            return a["date_accom"].localeCompare(b["date_accom"]);
        });
        setState(prev => ({
            ...prev,
            modal_list_jo: true,
            list_jo: match_data
        }))
    }

    const findLocation = () => {
        let data = {
            lat: state.location_lat,
            lng: state.location_lng,
            date: moment(state.location_date).format('YYYY-MM-DD'),
            selection: [branches.Selected_branch],
            jo_type: personName,
            parameter: "branch_id",
            diameter: state.diameter,
            company_id: state.comp_id
        }
        setState(prev => ({ ...prev, location_modal: false }))
        dispatch_data("loading_map", true);
        getData('aam/find_locations', data).then((res) => {
            markerCluster.clearMarkers();
            let marker = [BgreenMarker,
                BlueMarker,
                TextureYellow,
                DbrownMarker,
                TextureBlue,
                GrayMarker,
                PinkMarker,
                TextureBrownD,
                GreenMarker,
                TextureBrown,
                LpurpleMarker,
                TextureGray,
                LyellowMarker,
                OrangeMarker,
                PblueMarker,
                TextureGreen,
                TexturePink,
                YGreenMarker,
                PurpleMarker,
                TextureGreenD,
                RedMarker,
                LgreenMarker,
                SkyBlueMarker,
                TextureRed,
                WhiteMarker,
                YellowMarker,
                SblueMarker,
                TextureTeal,
                TextureViolet
            ]
            let fieldman_list = []
            let fieldman_checked = []
            let accom = [];
            let accom2 = [];
            var lat = "";
            var lng = "";
            let marker_count_index = 0;
            res.res.map((val2, index) => {
                let fieldman = fieldman_list.filter((val) => (val.user_id == val2.user_id))
                if (fieldman.length === 0) {
                    fieldman_list.push({ user_id: val2.user_id, name: val2.completename, accom: 1 })
                    fieldman_checked.push(val2.user_id)
                } else {
                    fieldman_list.forEach((val) => {
                        if (val.user_id == val2.user_id) {
                            val.accom++
                        }
                    })
                }

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
            fieldman_list.sort(function (a, b) {
                return a['name'].localeCompare(b['name']);
            });
            let assign = []
            // res.resultassign.forEach((val) => {
            //     let match = assign.indexOf((val2) => (val2.user_id == val.user_id))
            //     if (match === -1) {
            //         assign.push(({ user_id: val.user_id, jo_count: val.jo_count }))
            //     } else {
            //         assign[match].jo_count += val.jo_count
            //         // assign.push(({user_id:val.user_id,jo_count:val.jo_count}))
            //     }
            // })
            fieldman_list.forEach((val) => {
                if (marker.length === marker_count_index) {
                    marker_count_index = 0
                }
                val.url = marker[marker_count_index]
                let match_data = assign.filter((assign_val) => (assign_val.user_id === val.user_id))
                val.jo_count = 0
                if (match_data.length > 0) {
                    val.jo_count = match_data[0].jo_count
                }
                if (marker.length > marker_count_index) {
                    marker_count_index++
                }
            })
            getImagesInitial(accom, 0, accom2, fieldman_list, fieldman_checked, state.branch_name_display, data, state.assignCount);

            // setState(prev=>({...prev,markers_map:res.res,refresh:!state.refresh}))

        })
    }

    const getDateRange = () => {
        setState(prev => ({ ...prev, date_range_modal: false }))
        let data = {
            start: moment(state.selection.startDate).format('YYYY-MM-DD'),
            end: moment(state.selection.endDate).format('YYYY-MM-DD'),
            user_id: state.selected_fieldman.user_id,
            branch_id: [branches.Selected_branch],
            jo_type: personName[0],
            selection: [branches.Selected_branch],
            company_id: state.comp_id,
            from: state.date_start

        }
        dispatch_data("loading_map", true);
        getData('tracking/getAccomplishmentDays', data).then((res) => {
            let fieldman_list = []
            let accom = []
            let accom2 = []
            let marker_count_index = 0;
            let fieldman_checked = []
            let marker = [BgreenMarker,
                BlueMarker,
                TextureYellow,
                DbrownMarker,
                TextureBlue,
                GrayMarker,
                PinkMarker,
                TextureBrownD,
                GreenMarker,
                TextureBrown,
                LpurpleMarker,
                TextureGray,
                LyellowMarker,
                OrangeMarker,
                PblueMarker,
                TextureGreen,
                TexturePink,
                YGreenMarker,
                PurpleMarker,
                TextureGreenD,
                RedMarker,
                LgreenMarker,
                SkyBlueMarker,
                TextureRed,
                WhiteMarker,
                YellowMarker,
                SblueMarker,
                TextureTeal,
                TextureViolet
            ]
            res.data.forEach((val2, index) => {
                if (marker.length === marker_count_index) {
                    marker_count_index = 0
                }
                let accom_data = val2.data
                let jo_count = 0

                if (val2.assign.length > 0) {
                    let assign_data = val2.assign
                    for (let index = 0; index < assign_data.length; index++) {
                        const element = assign_data[index];
                        jo_count += parseInt(element.total_assign)
                    }
                }
                if ((jo_count !== 0 && typeof val2.date !== 'undefined') || (accom_data.length !== 0 && typeof val2.date !== 'undefined')) {
                    fieldman_list.push({ user_id: val2.date, name: val2.date, accom: accom_data.length, url: marker[marker_count_index], jo_count: jo_count })
                    fieldman_checked.push(val2.date)
                    for (let index = 0; index < accom_data.length; index++) {
                        const element = accom_data[index];
                        var latlong = "";
                        var splitlatlng = "";
                        latlong = String(element.fetched_coordinates);
                        splitlatlng = latlong.split(",");
                        let lat = parseFloat(splitlatlng[0]);
                        let lng = parseFloat(splitlatlng[1]);
                        element["lat"] = lat;
                        element["lng"] = lng;
                        element['completename'] = state.selected_fieldman.name
                        accom.push(element)
                        accom2.push({ lat: lat, lng: lng });
                    }
                    if (marker.length > marker_count_index) {
                        marker_count_index++
                    }
                }

            });
            getImagesInitial(accom, 0, accom2, fieldman_list, fieldman_checked, state.branch_name_display, data, state.assignCount);
        })
    }

    const refresh_fetch = () => {
        dispatch_data("loading_map", true);
        let data = {
            parameter: "branch_id",
            selection: [branches.Selected_branch],
            from: moment(state.date_start).format("YYYY-MM-DD"),
            to: moment(state.date_start).format("YYYY-MM-DD"),
            ref: state.ref,
            jo_type: personName,
            company_id: state.comp_id
        };
        sessionStorage.setItem('onSelectSingleDateGraph', JSON.stringify(data))
        fetchAllAccomplishments(data, state.branch_name_display, personName)
    }

    const getJoAssign = () => {
        let data = {
            parameter: "branch_id",
            selection: [branches.Selected_branch],
            from: moment(state.date_start).format("YYYY-MM-DD"),
            to: moment(state.date_start).format("YYYY-MM-DD"),
            ref: state.ref,
            jo_type: personName,
            company_id: state.comp_id
        };
        getData('aam/getJoAssign', data).then((res) => {

        })
    }
    const onSelectImage = (serverImageMeter, images) => {
        let new_images = []
        images.map((val) => {
            new_images.push(serverImageMeter + val.path)
        })
        setState(prev => ({
            ...prev,
            imageDisplay: new_images,
            openFile: true
        }))
    }

    const closeLightbox = () => {
        setState(prev => ({
            ...prev,
            openFile: false
        }))
    }

    return (
        <div className="id-content-container">
            <Backdrop
                className={classes.backdrop}
                open={loading_map}
                style={{ zIndex: 999999999999999 }}
            >
                <div className="loadermap"></div>
            </Backdrop>
            <div style={{ height: "100vh", width: "100%", position: "absolute" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A" }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => setGoogleMapRef(map, maps)}
                    center={{ lat: mapOption.lat, lng: mapOption.lng }}
                    zoom={mapOption.zoom}
                    options={(maps) => getMapOptions(maps, state.cursor, localStorage.getItem('MapOption'))}
                    onClick={ev => {
                        if (state.createPolyline) {
                            flightPath.setMap(null);
                            state.pathCoordinates.push({ lat: ev.lat, lng: ev.lng })
                            setState(prev => ({ ...prev, refresh: !state.refresh }))
                        }

                    }}
                >

                </GoogleMapReact>
            </div>
            <AccomDetails imageDisplay={state.imageDisplay} closeLightbox={closeLightbox} openFile={state.openFile} onSelectImage={onSelectImage} onClose={() => {
                setState(prev => ({
                    ...prev,
                    new_pickIndex: '',
                    selected_details: [],
                    singleDetails: []
                }))
            }} NewMarker={NewMarker} onNext={onNext} onPrevious={onPrevious} new_pickIndex={state.new_pickIndex} selected_details={state.selected_details} singleDetails={state.singleDetails} />

            {/* <div style={{ position: 'absolute', top: 60, right: 0, width: 254 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <Card style={{ width: 230, padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <input value={state.searchAccountPerson} placeholder="Search" style={{ borderStyle: 'none', outline: 'none' }} onChange={(e) => serachCoordinates(e)} />
                            <SearchIcon style={{ cursor: 'pointer' }} onClick={() => onSearch()} />
                            <RefreshIcon style={{ cursor: 'pointer' }} onClick={() => onCheckFieldman("ALL")} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card onClick={() => {
                            let cursor = ''
                            if (state.cursor === "") {
                                cursor = 'crosshair'
                            } else {
                                cursor = ''
                            }
                            state.pathCoordinates = []
                            // if (mapRef.current) {
                            //     // circleCord.setMap(null)
                            //     flightPath.setMap(null)
                            //     const { map, maps } = mapRef.current;
                            //     setGoogleMapRef(map, maps);
                            // }


                            setState(prev => ({ ...prev, createPolyline: !state.createPolyline, cursor: cursor, refresh: !state.refresh }))


                        }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', widht: 30, height: 30, borderRadius: 15, background: state.createPolyline ? '#4cd137' : undefined }}>
                            <CreateIcon style={{ color: state.createPolyline ? '#fff' : undefined }} />

                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card onClick={() => state.pathCoordinates.length > 0 ? onGetPolygon() : ''} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', widht: 30, height: 30, borderRadius: 15, background: state.pathCoordinates.length > 0 ? '#4cd137' : undefined }}>
                            <FormatListNumberedIcon style={{ color: state.pathCoordinates.length ? '#fff' : undefined }} />

                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card onClick={() => setState(prev => ({ ...prev, location_modal: true, selected_fieldman: [] }))} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', widht: 30, height: 30, borderRadius: 15, background: state.location_description.length > 0 ? '#4cd137' : undefined }}>
                            <LocationSearchingIcon style={{ color: state.location_description.length ? '#fff' : undefined }} />

                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card onClick={() => getJoAssign()} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', widht: 30, height: 30, borderRadius: 15, background: state.location_description.length > 0 ? '#4cd137' : undefined }}>
                            <MenuOpenIcon style={{ color: state.location_description.length ? '#fff' : undefined }} />

                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {state.location_description !== "" ?
                            <Card style={{ padding: 5, width: 230, }}>
                                <Typography style={{ fontWeight: 'bold', fontSize: 12 }}>{state.location_description}</Typography>

                            </Card>
                            : undefined
                        }
                    </Grid>
                </Grid>
            </div> */}

            {/* <div id="div-details"
                style={{
                    width: width < 768 ? '94%' : 540, cursor: 'pointerx   ', position: 'absolute', padding: 10, left: "0%"
                }}> */}
            <Grid container spacing={1}>
                <Grid container justify="flex-start" item xs={12} md={12}>
                    <Card style={{ backgroundColor: '#3498db', position: "relative", marginTop: 100, padding: 10, marginLeft: 10, minWidth: 300 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            {state.selected_fieldman.length === 0 ?
                                <AccountTreeIcon style={{ color: '#115293' }} />

                                :
                                <KeyboardBackspaceIcon style={{ color: '#115293', cursor: 'pointer' }} onClick={() => refresh_fetch()} />
                            }
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='p' style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }}>{state.selected_fieldman.length === 0 ? state.branch_name_display : state.selected_fieldman.name}</Typography>
                                <Typography variant='p' style={{ color: '#fff' }}>{personName}</Typography>
                                {state.location_description !== "" ? <Typography style={{ color: '#fff' }}>{moment(state.location_date).format("MMMM YYYY")}</Typography> : <Typography style={{ fontWeight: 'bold', fontSize: 13, color: '#fff' }}>{state.selected_fieldman.length === 0 ? moment(state.date_start).format("ll") : moment(state.selection.startDate).format("MMMM DD, YYYY") + ' - ' + moment(state.selection.endDate).format("MMMM DD, YYYY")}</Typography>}

                                {/* {state.location_description !== "" ? <Typography style={{ fontWeight: 'bold', fontSize: 14,color: '#fff' }}>Count : {NewMarker.length}</Typography> :
                                        <Typography style={{ fontWeight: 'bold', fontSize: 14,color: '#fff' }}>Count : {NewMarker.length} / {state.fieldman_list.reduce((count, val) => {
                                            return count += parseInt(val.jo_count)
                                        }, 0)}</Typography>
                                    } */}
                                <div style={{ height: 1, width: '100%', color: '#fff' }} />
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#fff', width: '100%', height: 1, marginTop: 2, marginBottom: 4 }} />
                        <Grid container spacing={1}>
                            {/* <Grid item xs={12} md={4}>
                                    <div style={{ backgroundColor: '#3083ba', padding: 10 }}>
                                        <Typography style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>500</Typography>

                                        <Typography style={{ fontSize: 12, color: '#fff' }}>Total</Typography>
                                    </div>
                                </Grid> */}
                            {state.selected_fieldman.length == 0 ?
                                <Grid item xs={12} md={4}>
                                    <div style={{ backgroundColor: '#3083ba', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}>
                                        <Typography style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{formatNumber(state.assignCount)}</Typography>

                                        <Typography style={{ fontSize: 9, color: '#fff' }}>ASSIGNED</Typography>
                                    </div>
                                </Grid> : undefined
                            }

                            <Grid item xs={12} md={4} >
                                <div style={{ backgroundColor: '#3083ba', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}>
                                    <Typography style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{formatNumber(state.markers.length)}</Typography>
                                    <Typography style={{ fontSize: 9, color: '#fff' }}>ACCOMPLISHED</Typography>

                                </div>
                            </Grid>
                            {state.selected_fieldman.length == 0 ?
                                <Grid item xs={12} md={4} >
                                    <div style={{ backgroundColor: '#3083ba', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}>
                                        <Typography style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{formatNumber(state.assignCount - state.markers.length)}</Typography>
                                        <Typography style={{ fontSize: 9, color: '#fff' }}>REMAINING</Typography>

                                    </div>
                                </Grid> : undefined
                            }
                        </Grid>
                    </Card>
                    {/* <Card style={{ marginTop: 55, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10, position: 'relative' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div
                                    onClick={() => {
                                        setState({ ...state, singleDetails: [] });
                                        setOpen(true);
                                    }} style={{
                                        width: 25, height: 25, marginRight: 5,
                                        backgroundColor: "#115293"
                                        , borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: "center", cursor: 'pointer'
                                    }}>
                                    <SearchIcon style={{ color: '#fff' }} />
                                </div>
                                <div
                                    onClick={() => {
                                        hideHistory()
                                    }} style={{
                                        width: 25, height: 25, marginRight: 5, marginTop: 5,
                                        backgroundColor: "#115293"
                                        , borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: "center", cursor: 'pointer'
                                    }}>
                                    <ArrowBackIcon style={{ color: '#fff' }} />
                                </div>
                            </div>

                            <div>
                                <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{state.selected_fieldman.length === 0 ? state.branch_name_display : state.selected_fieldman.name}</Typography>
                                <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{personName}</Typography>
                                {state.location_description !== "" ? <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{moment(state.location_date).format("MMMM YYYY")}</Typography> : <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{state.selected_fieldman.length === 0 ? moment(state.date_start).format("ll") : moment(state.selection.startDate).format("MMMM DD, YYYY") + ' - ' + moment(state.selection.endDate).format("MMMM DD, YYYY")}</Typography>}

                                {state.location_description !== "" ? <Typography style={{ fontWeight: 'bold', fontSize: 14 }}>Count : {NewMarker.length}</Typography> :
                                    <Typography style={{ fontWeight: 'bold', fontSize: 14 }}>Count : {NewMarker.length} / {state.fieldman_list.reduce((count, val) => {
                                        return count += parseInt(val.jo_count)
                                    }, 0)}</Typography>
                                }


                            </div>
                        </Card> */}
                </Grid>
            </Grid>
            <div id="div-details"
                style={{
                    width: width < 768 ? '94%' : 550, cursor: 'pointerx   ', position: 'absolute', padding: 10, left: "0%"
                }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <div style={{ position: 'relative' }}>
                            <Card  >

                                <CardContent>
                                    <TableContainer className={classes.container} style={{ maxHeight: 352 }}>
                                        <Table hover stickyHeader aria-label="sticky table" classes={{ root: classes.customTable }} size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><input onClick={() => onCheckFieldman("ALL")} checked={state.fieldman_list.length <= state.fieldman_checked.length ? true : false} type="checkbox" /></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell className={classes.fontSizeHeader}>NAME</TableCell>
                                                    <TableCell className={classes.fontSizeHeader}>ASSINED</TableCell>
                                                    {state.location_description == "" &&
                                                        <>
                                                            <TableCell className={classes.fontSizeHeader}>ACCOM</TableCell>
                                                            <TableCell className={classes.fontSizeHeader}>REMAIN</TableCell>
                                                        </>
                                                    }
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {state.fieldman_list.map((val, index) => {
                                                    let match = state.fieldman_checked.filter((checked) => (checked === val.user_id))
                                                    let checked = false
                                                    if (match.length > 0) {
                                                        checked = true
                                                    }
                                                    return <TableRow onClick={() => onCheckFieldman(val.user_id)} style={{ cursor: 'pointer' }}>
                                                        <TableCell><input checked={checked} type="checkbox" /></TableCell>
                                                        <TableCell><Typography className={classes.fontSize}> <img src={val.url} style={{ width: 15, height: 20, marginRight: 5 }} /></Typography></TableCell>
                                                        <TableCell><Typography className={classes.fontSize} style={{ width: 150 }}>{val.name}</Typography></TableCell>
                                                        <TableCell><Typography className={classes.fontSize}>{val.jo_count} </Typography></TableCell>
                                                        {state.location_description == "" &&
                                                            <>
                                                                <TableCell><Typography className={classes.fontSize}>{val.accom}</Typography></TableCell>
                                                                <TableCell><Typography className={classes.fontSize}>{val.jo_count - val.accom < 0 ? 0 : val.jo_count - val.accom}</Typography></TableCell>
                                                            </>
                                                        }
                                                        <TableCell>
                                                            <ArrowLeftIcon style={{ fontSize: 25, color: val.jo_count - val.accom > 0 ? '#e74c3c' : '#2ecc71' }} />
                                                        </TableCell>
                                                        <TableCell className={classes.fontSizeIcon}> <EventNoteIcon style={{ color: '#115293', width: 18, height: 18, display: state.selected_fieldman.length === 0 ? undefined : 'none' }} onClick={(e) => {
                                                            e.stopPropagation();
                                                            let match = []
                                                            state.accomplishments_all.forEach((val2) => {
                                                                if (val2.user_id === val.user_id) {
                                                                    match.push(val2)
                                                                }
                                                            })
                                                            setState(prev => ({
                                                                ...prev,
                                                                date_range_modal: true,
                                                                selected_fieldman: val,
                                                                selected_accoom: match
                                                            }))
                                                        }} /></TableCell>
                                                    </TableRow>
                                                })}

                                                {/* <TableRow >
                                            <TableCell></TableCell>
                                            <TableCell><Typography className={classes.fontSizeTotal}>TOTAL</Typography></TableCell>
                                            <TableCell><Typography className={classes.fontSizeTotal}>123</Typography></TableCell>
                                            <TableCell><Typography className={classes.fontSizeTotal}>500</Typography></TableCell>
                                            <TableCell><Typography className={classes.fontSizeTotal}>500</Typography></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow> */}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                            <div onClick={() => {
                                gsap.to('#div-details', {
                                    width: state.minimize == false ? 8 : width < 768 ? '94%' : 550,
                                    duration: 0.4,
                                    ease: "ease-in-out",
                                })
                                gsap.to('#arrow', {
                                    rotation: state.minimize == false ? 180 : 360,
                                    duration: 0.5,
                                    ease: "ease-in-out",
                                })
                                setState(prev => ({
                                    ...prev,
                                    minimize: !state.minimize
                                }))
                            }} style={{ width: 30, height: 40, position: 'absolute', top: 0, right: -26, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ArrowBackIosIcon id='arrow' style={{ color: '#3498db' }} />
                            </div>
                        </div>

                    </Grid>
                </Grid>

            </div>

            {/* </div> */}
            <div className={classes.parentContainer}>
                <div className={classes.iconParentGroup} >
                    <div className={classes.iconParent} onClick={() => {
                        setState({ ...state, singleDetails: [] });
                        setOpen(true);
                    }}>
                        <TodayIcon className={classes.iconStyle} />
                        <Typography variant='p' className={classes.fontStyle}>GENERATE ACCOMPLISHMENTS</Typography>
                    </div>
                    {/* <div className={classes.iconParent} >
                    <AccountTreeIcon className={classes.iconStyle} />
                    <Typography variant='p' className={classes.fontStyle}>FILTER BRANCH</Typography>
                </div>
                <div className={classes.iconParent} >
                    <PlaylistAddCheckIcon className={classes.iconStyle} />
                    <Typography variant='p' className={classes.fontStyle}>FILTER FINDINGS</Typography>
                </div> */}
                </div>

                <div className={classes.endSection}>
                    <div className={classes.endIcon} onClick={() => {
                        let cursor = ''
                        if (state.cursor === "") {
                            cursor = 'crosshair'
                        } else {
                            cursor = ''
                        }
                        state.pathCoordinates = []
                        // if (mapRef.current) {
                        //     // circleCord.setMap(null)
                        //     flightPath.setMap(null)
                        //     const { map, maps } = mapRef.current;
                        //     setGoogleMapRef(map, maps);
                        // }

                        setState(prev => ({ ...prev, createPolyline: !state.createPolyline, cursor: cursor, refresh: !state.refresh }))
                    }} style={{ background: state.createPolyline ? '#4cd137' : '#1765b3' }}>
                        <CreateIcon style={{ color: '#fff' }} />
                    </div>
                    <div className={classes.endIcon} style={{ background: state.pathCoordinates.length > 0 ? '#4cd137' : '#1765b3' }} onClick={() => state.pathCoordinates.length > 0 ? onGetPolygon() : ''}>
                        <FormatListNumberedIcon style={{ color: '#fff' }} />
                    </div>
                    <div onClick={() => setState(prev => ({ ...prev, location_modal: true, selected_fieldman: [] }))} style={{ background: state.location_description.length > 0 ? '#4cd137' : '#1765b3' }} className={classes.endIcon}>
                        <LocationSearchingIcon style={{ color: '#fff' }} />
                    </div>

                    <Card style={{ width: 230, padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <input onChange={(e) => serachCoordinates(e)} value={state.searchAccountPerson} placeholder="Search" style={{ borderStyle: 'none', outline: 'none' }} />
                        <SearchIcon style={{ cursor: 'pointer' }} onClick={() => onSearch()} />
                        <RefreshIcon style={{ cursor: 'pointer' }} onClick={() => onCheckFieldman("ALL")} />
                    </Card>
                </div>


            </div>
            {/* <div
                onClick={() => {
                    setState({ ...state, singleDetails: [] });
                    setOpen(true);
                }} style={{
                    position: 'absolute', left: 15, top: 65, width: 30, height: 30, marginRight: 5,
                    backgroundColor: "#000",
                    opacity: 0.7
                    , borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: "center", cursor: 'pointer'
                }}>
                <SearchIcon style={{ color: '#fff' }} />
            </div>
            <div className='id-content-container'>
                <Typography>heheheh</Typography>
            </div> */}
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
                                        autoOk
                                        style={{ width: "100%" }}
                                        variant="inline"
                                        label="With keyboard"
                                        format="MM/dd/yyyy"
                                        value={state.date_start}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={handleDateChangeStart}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            {/* <Grid item xs={12} md={12}>
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
              </Grid> */}
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
                                        {company_name.map((val) => {
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
                                        {SelectedBranches.map((val, index) => {
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
                                        {accom_jo_type.map((val, index) => (
                                            <MenuItem key={index} value={val} style={getStyles(val, personName, theme)}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* <Grid item xs={12} md={12}>
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
                            </Grid> */}
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
            <Dialog fullWidth maxWidth='xs' open={state.modal_employee} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Select Job Order Type</DialogTitle>
                <DialogContent>
                    <form>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <List component="nav" aria-label="main mailbox folders" >
                                            {accom_jo_type.map((val, index) => {
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
            <Dialog fullWidth maxWidth='md' open={state.modal_list_jo} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">List</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={2}>
                            <ExcelFile
                                filename={
                                    "Accomplishments" +
                                    "-" +
                                    state.branch_name_display +
                                    " " +
                                    moment(new Date(state.date_start)).format("YYYY-MM-DD")
                                }
                                element={
                                    <Button
                                        size="small"
                                        style={{
                                            fontSize: "0.8125rem",
                                            backgroundColor: "rgba(6,86,147)",
                                            color: "white",
                                            width: '100%'
                                        }}
                                        endIcon={<GetAppIcon style={{ color: "#fff" }} />}
                                    >
                                        Download
                                    </Button>
                                }
                            >
                                <ExcelSheet data={state.list_jo} name="Accomplishments">
                                    <ExcelColumn label="Meter Number" value="meter_number" />
                                    <ExcelColumn label="Meter Type" value="meter_type" />
                                    <ExcelColumn label="Date" value="date_accom" />
                                    <ExcelColumn label="Fieldman" value="completename" />
                                </ExcelSheet>
                            </ExcelFile>
                        </Grid>
                        <Grid container item xs={12} md={10} justify="flex-end">
                            <Typography>TOTAL : {state.list_jo.length}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Table stickyHeader aria-label="sticky table" style={{ whiteSpace: "nowrap" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ background: "#115293", color: '#fff' }}>No.</TableCell>
                                        <TableCell style={{ background: "#115293", color: '#fff' }}>Meter Number</TableCell>
                                        <TableCell style={{ background: "#115293", color: '#fff' }}>Meter Type</TableCell>
                                        <TableCell style={{ background: "#115293", color: '#fff' }}>Date</TableCell>
                                        <TableCell style={{ background: "#115293", color: '#fff' }}>Fieldman</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.list_jo.map((val, index) => {
                                        return <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{val.meter_number}</TableCell>
                                            <TableCell>{val.meter_type}</TableCell>
                                            <TableCell>{val.date_accom}</TableCell>
                                            <TableCell>{val.completename}</TableCell>
                                        </TableRow>
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </Grid>

                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setState({ ...state, modal_list_jo: false })} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog onClose={() => setState(prev => ({ ...prev, location_modal: false }))} fullWidth maxWidth='xs' open={state.location_modal} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Locations</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">

                                <DatePicker
                                    variant="outlined"
                                    openTo="year"
                                    views={["year", "month"]}
                                    label="Year and Month"
                                    value={state.location_date}
                                    style={{ width: "100%" }}
                                    onChange={(e) =>
                                        setState(prev => ({ ...prev, location_date: e }))
                                    }
                                //  onChange={handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <FormControl
                                size="small"
                                className={classes.formControl}
                                style={{ width: "100%" }}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Radius
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={onChangeText}

                                    name="diameter"
                                    value={state.diameter}

                                >
                                    <MenuItem value={0.5}>0.5 KM</MenuItem>
                                    <MenuItem value={1}>1 KM</MenuItem>
                                    <MenuItem value={1.5}>1.5 KM</MenuItem>
                                    <MenuItem value={2}>2 KM</MenuItem>
                                    <MenuItem value={2.5}>2.5 KM</MenuItem>
                                    <MenuItem value={3}>3 KM</MenuItem>



                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <AutoComplete newvalue={state.location_description} locationGet={(location) => {

                                setState(prev => ({
                                    ...prev, location_lat: location.lat, location_lng: location.lng, location_description: location.description
                                }))

                            }} />
                        </Grid>

                        <Grid container item xs={12} md={12} justify="flex-end">
                            <Button
                                onClick={() => findLocation()}
                                style={{
                                    backgroundColor: "rgba(6,86,147)",
                                    color: "white",
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={state.date_range_modal} onClose={() => setState(prev => ({ ...prev, date_range_modal: false, selected_fieldman: [] }))} fullWidth maxWidth='md' aria-labelledby="responsive-dialog-title" >
                <div onClick={() => setState(prev => ({ ...prev, date_range_modal: false, selected_fieldman: [] }))} style={{ position: 'absolute', top: 6, right: 6, cursor: 'pointer' }}>
                    <CloseIcon />
                </div>
                <DialogTitle id="simple-dialog-title">Details</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={5}>
                            <DateRange
                                editableDateInputs={true}
                                moveRangeOnFirstSelection={false}
                                onChange={item => setState({ ...state, ...item })}
                                ranges={[state.selection]}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Card variant="outlined" style={{ borderWidth: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={5}>
                                            <Card variant="outlined" style={{ borderWidth: 2 }} >
                                                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <img src={serverProfile + state.selected_fieldman.user_pic} style={{ with: 180, height: 180 }} />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>{state.selected_fieldman.name}</Typography>
                                            <Typography style={{ fontSize: 15 }}>Accomplishmnets : {state.selected_fieldman.accom}</Typography>
                                            <Typography style={{ fontSize: 15 }}>First meter : {state.selected_accoom.length > 0 ? moment(state.selected_accoom[0].date_accom).format('hh:mm A') : undefined}</Typography>
                                            <Typography style={{ fontSize: 15 }}>Last meter : {state.selected_accoom.length > 0 ? moment(state.selected_accoom[state.selected_accoom.length - 1].date_accom).format('hh:mm A') : undefined}</Typography>

                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Grid container item xs={12} md={12} justify="flex-end">
                                <Button
                                    onClick={() => getDateRange()}
                                    style={{
                                        backgroundColor: "rgba(6,86,147)",
                                        color: "white",
                                        marginTop: 10
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                      

                    </Grid>
                </DialogContent>
            </Dialog>
        </div >
    );
}
