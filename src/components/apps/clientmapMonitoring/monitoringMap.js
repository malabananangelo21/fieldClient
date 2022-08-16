import DateFnsUtils from '@date-io/date-fns';
// import MarkerClusterer from '@google/markerclustererplus';
import { Button, Card, Grid, IconButton, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
// import ReactTooltip from "react-tooltip";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import 'mapbox-gl/dist/mapbox-gl.css';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CloseIcon from '@material-ui/icons/Close';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Draggable from 'react-draggable';
import Carousel from 'react-material-ui-carousel';
// import { getData, sqlData } from '../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import CancelledMarker from '../../../assets/map image/canceled-activity-marker.png';
import OnTripMarker from '../../../assets/map image/default.png';
import DefaultMarker from '../../../assets/map image/electron-blue.png';
import MarkerFrom from '../../../assets/map image/from.png';
import IdleMarker from '../../../assets/map image/gray.png';
import OnTransitActivityMarker from '../../../assets/map image/ontransit-activity-marker.png';
import QueueRequestMarker from '../../../assets/map image/pending-activity-marker.png';
import MarkerTo from '../../../assets/map image/to.png';
import { getData } from '../../api/api';
import TextField from '@material-ui/core/TextField';

// const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const exampleMapStyles = [
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": 2
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f79f3b"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    }
];
const getMapOptions = (maps) => {

    return {

        streetViewControl: true,
        scaleControl: false,
        fullscreenControl: false,
        zoomControl: false,
        styles: [
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 2
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f79f3b"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            }
        ],
        gestureHandling: "greedy",
        disableDoubleClickZoom: false,
        mapTypeControl: false,

        mapTypeId: maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: maps.ControlPosition.TOP_LEFT,
            mapTypeIds: [
                maps.MapTypeId.ROADMAP,
                maps.MapTypeId.SATELLITE,
                maps.MapTypeId.HYBRID
            ]

        },

        zoomControl: false,
        clickableIcons: false
    };
}
const { compose, withProps, withHandlers, withStateHandlers, shouldUpdate } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: 'calc(100vh)' }} />,
        containerElement: <div style={{ height: 'calc(100vh)' }} />,
        mapElement: <div style={{ height: 'calc(100vh)' }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
        },
        onMarkerClick: () => (marker) => {
            // link to post view page
            //
            //
            //
            //
            //
            console.log('Go to the marker post page')
            window.location = '/post/oxford';
        }
    }),
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => (id) => ({
            isOpen: {

                [id]: isOpen[id] == undefined ? true : !isOpen[id]
            },
        })
    }),
    withScriptjs,
    withGoogleMap,
  
    
)(props =>
    <GoogleMap
        zoom={props.mapOption.zoom}
        defaultCenter={{ lat: props.mapOption.lat, lng: props.mapOption.lng }}
        options={
            {
                fullscreenControl: false,
                styles: exampleMapStyles,
                streetViewControl: false,
                disableDoubleClickZoom: false,
                mapTypeControl: false,
                // zoomControl: false,
                clickableIcons: false,
            }}
    >
        <MarkerClusterer
            enableRetinaIcons={true}
            onClick={props.onMarkerClustererClick}
            averageCenter
            gridSize={40}
            maxZoom={21}		
            zoomOnClick={true}
            minimumClusterSize={4}	
            
            
        >
            {props.markers.map((marker, index) => {
                return <Marker
                    onClick={() => { props.test(marker); props.onToggleOpen(index) }}
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    slug={marker.slug}
                    noRedraw={true}
                >
                    {props.isOpen[index] && <InfoWindow
                        onCloseClick={props.onToggleOpen}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        options={{ disableAutoPan: true }}
                    >
                        <div style={{ opacity: 0.75, padding: `12px` }}>
                            <div style={{ fontSize: `16px`, color: `#000` }}>
                                <Typography color="inherit" style={{fontWeight:'bold'}}>{marker.meter_number} | {marker.accom_findings}</Typography>
                                <Typography color="inherit">{moment(marker.date_added).format('LLL')}</Typography>
                            </div>
                        </div>
                    </InfoWindow>}
                </Marker>
            })}
        </MarkerClusterer>
    </GoogleMap>
);

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
        backgroundColor: '#2f3640',
        color: '#fff',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

function playback(details, user_id) {

    var data = []
    data.push(details)
    // console.log(data)
    this.setState({
        count_val: 0,
        col: "col-lg-6",
        displayMarkers: [],
        show_all_users: false,
        display_AccomPlayback: [],
        employee_details: data,
        users_data: data

    })

}



function getSingleUser(user_id, complete_name, user_pic, details) {

    var image = "";
    var image_pic = ""
    if (user_pic !== "") {

        image_pic = ("http://images.pacificweb.com.ph/pockethr/profilepic/" + user_pic)
    } else {
        image_pic = require('../../../assets/map image/user.png')
    }
    var data = [{
        userId: user_id,
        completeName: complete_name,
        userPic: user_pic,
        detail: details
    }]
    // console.log(data);

    this.setState({
        show_user: false,
        show_accom: true,
        completeName: complete_name,
        userId: user_id,
        userPic: user_pic,
        specific_user: data

    })
}
function accomplishments(details, user_id) {
    // alert("qwer")
    console.log(details, user_id)
    var data = []
    data.push(details)
    this.setState({
        col: "col-lg-6",
        show: "Customers",
        displayMarkers: [],
        show_accom: true,
        show_all_users: false,
        display_AccomPlayback: [],
        employee_details: data,
        users_data: data

    })
    // console.log(user_id)
    getData("HumanResource/getCustomers", user_id)
        .then(response => {
            // console.log(response)
            this.setState({
                displayMarkers: response,
                accomplishment_customers: response
            })
            setTimeout(() => {
                this.handleSidebar();
            }, 200)


        })
}

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },

    hoverDialog: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    large: {
        width: 100,
        height: 100,
    },
    whiteText: {
        color: '#fff'
    },
    allTable: {
        color: '#dcdcdc',
        fontSize: 12,
        borderColor: 'rgb(255 255 255 / 15%)'
    },
    tableHead: {
        color: '#fff',
        fontSize: 13,
        borderColor: 'rgb(255 255 255 / 15%)'
    },
    dashboards: {
        background: 'rgba(0,0,0,0.6)'
    },
    filterBox: {
        background: 'rgba(0,0,0,0.7)'
    },

});


const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}
const mapCenter = {
    lat: 13.7565,
    lng: 121.0583,
    zoom: 10
}


export default function Mapv2() {
    const [open, setOpen] = React.useState(false);
    const [openPie, setOpenPie] = React.useState(false);
    const [fieldman_list, setFieldman_list] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();
    const blmcData = useSelector(state => state.Mapdash);
    const loginR = useSelector(state => state.Login)
    const classes = useStyles();
    const home_reducer = useSelector(state => state.home_reducer)
    const map_reducer = useSelector(state => state.map_reducer)
    const mapRef = React.useRef();
    const mapRef2 = React.useRef(false);
    const [pause, setpause] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [mapOption, setmapOption] = useState({
        zoom: 6,
        lat: 12.8797,
        lng: 121.7740
    })
    const [viewport, setViewport] = useState({
        latitude: 13.7565,
        longitude: 121.0583,
        zoom: 10,
        width: '100vw',
        height: '50vw',
    })
    const timerRef = React.useRef(null);
    const speeds = React.useRef(1);

    const [state, setState] = useState({
        initializeMarkers: "Test",
        onlinePeopleCount: 0,
        onMapUsers: [],
        date_start: new Date(),
        fieldman: [],
        count_fieldman: 0,
        fieldman_list: false,
        pie_graph: [{
            value: 0,
            title: 'Accomplished'
        },
        {
            value: 0,
            title: 'Assign'
        },
        {
            value: 0,
            title: 'Unassign'
        },],
        total_jo: 0,
        trackAccom: [],
        trackAccom2: [],
        fieldman2: [],
        time_accomplayback: [],
        count_val: 0,
        display_AccomPlayback: [],
        pause: false,
        buttons: false,
        time: '',
        user_pic: '',
        completeName: '',
        singleFieldmanDash: false,
        assign: 0,
        speed: 1,
        singleDetails: [],
        pickIndex: 0,
        jo_accom_list: 0,
        assign: 0,
        unassign: 0,
        singleFieldmanDash2: false,
        date_end: new Date(),
        accomplishments_all: [],
        comp_id: '',
        markers: [],
        ref:''
    });
    const [branches, setBranches] = useState({
        branches: [],
        companies: [],
        filteredBranch: [],
        Selectedcompany: '',
        Selected_branch: ''
    })

    const [activeInfoBox, setActiveInfoBox] = useState({
        activeInfoBox: [],
        accomplishments: []
    })

    const [infoBox, setInfoBox] = useState({
        visibility: 'hidden'
    });

    const [requestInfoBox, setRequestInfoBox] = useState({
        visibility: 'hidden'
    })

    const [activeJOBox, setActiveJOBox] = useState({
        activeJODetails: 'hidden'
    })

    const [filterBoard, setFilterBoard] = useState({
        HomeVisibility: 'hidden',
        branchesVisibility: 'none',
        companiesVisibility: 'none',
        positionVisibility: 'none',
        dateVisibility: 'none',
        activityVisibility: 'none',
    })

    const [initialBoard, setInitialBoard] = useState({
        visibility: 'visible'
    })
    const showCurrentLocation = () => {
        try{
        console.log(navigator.geolocation)

            navigator.geolocation.getCurrentPosition(
                position => {

                //  setState(prevState => ({
                //     currentLatLng: {
                //       ...prevState.currentLatLng,
                //       lat: position.coords.latitude,
                //       lng: position.coords.longitude
                //     },
                //     isMarkerShown: true
                //   }))
                }
              )
        }catch(error){
            console.log(error)
        }
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(
        //     position => {
        //     //  setState(prevState => ({
        //     //     currentLatLng: {
        //     //       ...prevState.currentLatLng,
        //     //       lat: position.coords.latitude,
        //     //       lng: position.coords.longitude
        //     //     },
        //     //     isMarkerShown: true
        //     //   }))
        //     }
        //   )
        // } else {
        //   error => console.log(error)
        // }
      }


    useEffect(() => {
        let  mounted = true;
        const script = document.createElement('script')
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js'
        script.async = true
        document.body.appendChild(script)
        dispatch_data('accomplishments_map', [])
        showCurrentLocation()
        userData();
        // goLiveData();
        getBranches();
        getAccomplishment();
        getAssignCount();
        requestsData();
        return () => mounted = false;
        // activityData();

    }, []);
    // useEffect(() => {
    //     if (mapRef.current) {
    //         const { map, maps } = mapRef.current;
    //         console.log(map)

    //         setGoogleMapRef(map, maps)
    //     }
    // }, [mapRef2.current]);




  
    // let pause = false
   
    const playBackAccom = (details) => {
        if (state.display_AccomPlayback.length >= details.length) {
            state.display_AccomPlayback = []
            state.count_val = 0
        }
        setTimeout(() => { ShowMapMarkerPlayback(details, false) }, 1000)
    }



    const AnyReactComponent = ({ user_id, latlng, complete_name, user_fname, user_lname, user_pic, details, location_status }) => {
        var image = "";
        var image_pic = ""
        if (latlng !== null) {
            if (location_status === 'Mocking') {
                image = require('../../../assets/map image/chi-gong.png');
            } else {
                image = require('../../../assets/map image/electron-blue.png');
            }
            if (user_pic !== "") {

                image_pic = ("http://images.pacificweb.com.ph/pockethr/profilepic/" + user_pic)
            } else {
                image_pic = require('../../../assets/map image/user.png')
            }

        }
        return <div className="tooltipparent" style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>

            <HtmlTooltip color={'#2f3640'}
                title={
                    <React.Fragment>
                        <Typography color="inherit">{user_lname}&nbsp;{user_fname}</Typography>
                    </React.Fragment>
                }
            >
                <div data-tip data-for={user_id} onClick={() => { getSingleUser(user_id, complete_name, user_pic, details) }} style={{ position: 'relative' }}>
                    <img src={image} style={{ maxWidth: 60, maxHeight: 60 }} className=" animated bounce" />
                    <img style={{ top: 4, left: 13, width: 32, height: 32, position: 'absolute', borderRadius: 20 }} src={image_pic} className=" animated bounce" />

                </div>
            </HtmlTooltip>

        </div>
    }
    // getData('tracking/trackEmployeesLocationv2', data)
    const getImages = (details, index) => {
        getData('tracking/getImages', details.jo_id)
            .then((res) => {
                let images = res
                if (details.jo_id === "") {
                    images = []
                }
                let jo_data = {
                    accom_findings: details.accom_findings,
                    accom_id: details.accom_id,
                    fetched_coordinates: details.fetched_coordinates,
                    jo_id: details.jo_id,
                    imagePath: images,
                    meter_number: details.meter_number,
                    date_added: details.date_added,

                }
                setState({ ...state, singleDetails: [jo_data], pickIndex: index })

            })

    }
    const getImagesInitial = (jo_accom, index, accom2) => {
       

        if (jo_accom.length !== 0) {
            let details = jo_accom[0]
            getData('tracking/getImages', details.jo_id)
                .then((res) => {
                    let images = res
                    if (details.jo_id === "") {
                        images = []
                    }
                    let jo_data = {
                        accom_findings: details.accom_findings,
                        accom_id: details.accom_id,
                        fetched_coordinates: details.fetched_coordinates,
                        jo_id: details.jo_id,
                        imagePath: images,
                        meter_number: details.meter_number,
                        date_added: details.date_added,
                    }
                    var latlong_initial = ""
                    var splitlatlng_initial = ""
                    var lat_initial = ""
                    var lng_initial = ""
                    latlong_initial = String(details.fetched_coordinates)
                    splitlatlng_initial = latlong_initial.split(",")
                    lat_initial = parseFloat(splitlatlng_initial[0])
                    lng_initial = parseFloat(splitlatlng_initial[1])

                    let locations = []
                    jo_accom.map((val, index) => {
                        var latlong = ""
                        var splitlatlng = ""
                        var lat = ""
                        var lng = ""
                        latlong = String(val.fetched_coordinates)
                        splitlatlng = latlong.split(",")
                        lat = parseFloat(splitlatlng[0])
                        lng = parseFloat(splitlatlng[1])
                        let new_data = {
                            lat: lat,
                            lng: lng,
                            jo_id: val.jo_id,
                            accom_findings: val.accom_findings,
                            accom_id: val.accom_id,
                            fetched_coordinates: val.fetched_coordinates,
                            jo_id: val.jo_id,
                            meter_number: val.meter_number,
                            date_added: val.date_added,
                        }
                        locations.push(new_data)
                    })
                   

                    setState({ ...state, pickIndex: index, accomplishments_all: jo_accom, markers: locations })
                    // setmapOption({ ...mapOption,zoom:4 })

                    // setmapOption({ ...mapOption, lat: lat_initial, lng: lng_initial,zoom:6 })
                    setmapOption({ ...mapOption, lat: lat_initial, lng: lng_initial,zoom:6 })
                    dispatch_data('loading_map', false)

                })
        }else{
            setState({ ...state, accomplishments_all: [], markers: [] })
            dispatch_data('loading_map', false)
        }


    }

    const AnyReactComponentCoordinates = ({ index, lat, lng, details, latlng, user_pic, play, lengthData }) => {

        var image = "";
        var image_pic = ""
        // console.log(details)
        if (latlng !== null) {
            // if (play && lengthData === (index + 1) && state.pickIndex == '') {
            //     image = require('../../../assets/map image/electron-blue.png');
            // } else {
            image = require('../../../assets/map image/default.png');

            // }
            // if (state.pickIndex === index) {
            //     image = require('../../../assets/map image/electron-blue.png');
            // }
            image_pic = require('../../../assets/map image/user.png')
        }
        return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
            <HtmlTooltip color={'#2f3640'}
                title={
                    <React.Fragment>
                        <Typography color="inherit">{details.meter_number} | {details.accom_findings}</Typography>
                        <Typography color="inherit">{moment(details.date_accom).format('LLL')}</Typography>
                    </React.Fragment>
                }
            >
                <div data-tip data-for={index} style={{ position: 'relative' }}>
                    <img onClick={() => { getImages(details, index) }} src={image} style={{ maxWidth: 60, maxHeight: 60 }} className=" animated bounce" />
                    {/* <img style={{ top: 4, left: 13, width: 32, height: 32, position: 'absolute', borderRadius: 20 }} src={image_pic} className=" animated bounce" /> */}
                </div>
            </HtmlTooltip>

            {/* <ReactTooltip id={index}  >
               
            </ReactTooltip> */}
        </div>
    }
    const ShowMapMarkerPlayback = (response, paramPause) => {
        console.log(response.length + ' ' + state.count_val)
        if (paramPause) {
            clearTimeout(timerRef.current)

        } else {

            if (state.count_val != (response.length)) {
                timerRef.current = setTimeout(() => {
                    let lat = 0.0;
                    let long = 0.0;
                    state.display_AccomPlayback.push(response[state.count_val])
                    console.log(response[state.count_val])
                    let latlong = ""
                    let splitlatlng = ""
                    let lat_data = ""
                    let lng_data = ""
                    let complete_name = ""
                    latlong = String(response[state.count_val].fetched_coordinates)
                    splitlatlng = latlong.split(",")
                    lat_data = splitlatlng[0]
                    lng_data = splitlatlng[1]
                    lat = lat_data;
                    long = lng_data;
                    setmapOption({ ...mapOption, lat: parseFloat(lat), lng: parseFloat(long), zoom: 15 })

                    let timeStart = moment(response[state.count_val].date_accom).format('LT')
                    state.count_val++
                    setState({
                        ...state,
                        trackAccom: [],
                        time: timeStart,
                        pickIndex: '',
                        singleFieldmanDash2: true,

                    })
                    setFieldman_list(false)

                    setrefresh(!refresh)
                    ShowMapMarkerPlayback(response, paramPause);
                }, (1200 / speeds.current));
                console.log(speeds.current)
            } else {
                speeds.current = 1
                setpause(false)
                clearTimeout(timerRef.current)


            }
        }
    }
    const stop = (details) => {
        // setState({ ...state, time: '', trackAccom: state.trackAccom2, display_AccomPlayback: [] })
        setState({
            ...state,
            display_AccomPlayback: [],
            trackAccom: state.trackAccom2,
            count_val: 0,
            time: '',
            pickIndex: ''
        })
        clearTimeout(timerRef.current)
        setpause(false)
    }
    // Activity Table Pagination
  

    const handleChangePage = (event, newPage) => {


    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // !Activity Table Pagination


  

    const handleOpenInfoBox = (infoid, type) => {

        const activeData = blmcData.userData.filter((info) => {
            return info.user_id === infoid
        });

        setActiveInfoBox({
            ...state,
            activeInfoBox: activeData,
        });
        console.log(infoid);
        if (type === 'userInfo') {
            setInfoBox({ visibility: 'visible' });
            setInitialBoard({ visibility: 'hidden' });
        } else if (type === 'requestInfo') {
            setRequestInfoBox({ visibility: 'visible' });
            setInitialBoard({ visibility: 'hidden' });
        }
        activityData(infoid)

        // activityData(e.currentTarget.dataset.userid)                


    }

    const handleCloseInfoBox = (type) => {
        if (type === 'userInfo') {
            setInfoBox({ visibility: 'hidden' });
            setInitialBoard({ visibility: 'visible' });
        } else if (type === 'requestInfo') {
            setRequestInfoBox({ visibility: 'hidden' });
            setInitialBoard({ visibility: 'visible' });
        }

        // setInfoBox({ visibility: 'hidden' })
        setActiveInfoBox({
            accomplishments: [],
            activeInfoBox: []
        })
        // setInitialBoard({ visibility: 'visible' })
    }

    const getBranches = () => {
        getData("HumanResource/getHandleBranch", { user_id: localStorage.getItem('u') }).then((response) => {
            let company = []
            response.response.map((item) => {
                let match = false
                company.map((val) => {
                    if (val.company_name == item.company_name) {
                        match = true
                    }
                })
                if (!match) {
                    company.push({ company_name: item.company_name, company_id: item.company_id })
                }
            })
            dispatch_data('gethandleBranch', response.response)
            dispatch_data('company_name', company)
            dispatch_data('SelectedBranches', [])
        })
    }

    const getAssignCount = (e) => {


    }

    const goLiveData = () => {
        setTimeout(() => {
            userData();
            requestsData();
            goLiveData();
        }, 3000)

    }

    const getAccomplishment = () => {

    }



    const showFullMap = (state) => {
        setInitialBoard({ visibility: state })
    }
    //FilterBoard
    const showFilterBoard = (state) => {
        setFilterBoard({
            ...filterBoard,
            HomeVisibility: state
        })
    }

    // !FilterBoard

   


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let MarkerSize = 20;

    const userData = () => {

    }

    const requestsData = () => {

    }


    const activityData = (userId) => {




    }

    const setActiveJo = (jobOrderId) => {
        setState({
            ...state,
            initializeMarkers: 'Activity'
        });
        handleCloseInfoBox();
        const activityLocation = [];
        let activeJo = blmcData.activeDriverActivity.filter(jo => jo.job_order_id == jobOrderId);
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
                type: 'origin',
                lat: olat,
                lng: olng
            },
            {
                type: 'destination',
                lat: dlat,
                lng: dlng
            }
        )

        setActiveJOBox({
            activeJODetails: 'visible'
        })
        dispatch({
            type: 'setBlmLocationActivity',
            activityLocation: activityLocation,
            activeJOData: activeJo
        })

    }
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data
        })
    }
    const filterCompany = (company) => {
        let filteredBranch = branches.branches.filter((branch) => branch.company_id == company)
        setBranches({
            ...branches,
            filteredBranch: filteredBranch
        });

        setFilterBoard({
            ...filterBoard,
            branchesVisibility: 'block'
        })
        // console.log(filteredBranch);
    }

    const filterBranch = (branch) => {
        const users = state.onMapUsers.filter(user => user.branch_id == branch);
        // const bounds = new maps.LatLngBounds();
        setState({
            ...state,
            initializeMarkers: users
        });

        console.log(users)

        setmapOption({
            ...state,
            zoom: 12
        })
        // users.map((location) => {
        //     bounds.extend(
        //         new maps.LatLng(location.latitude, location.longitude),
        //     )    
        // });
    }

    const FieldUser = [
        { id: 1, name: 'Juan Dela Cruz', status: 'Active' },
        { id: 2, name: 'Ben Louie Casapao', status: 'Idle' },
        { id: 3, name: 'JP Ysalina', status: 'Active' },
        { id: 4, name: 'Angelo malabanan', status: 'Idle' },
        { id: 5, name: 'Lester Santos', status: 'Inactive' },
    ];

    const testFunction = () => {
        setmapOption({
            ...state,
            // zoom: 17,
            lat: 13.755303,
            lng: 121.0712453
        })
    }

    // Google Maps
    const getMapOptions = (maps) => {

        return {
            streetViewControl: true,
            scaleControl: false,
            fullscreenControl: false,
            zoomControl: false,
            styles: [
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "weight": 2
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dedede"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#f79f3b"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                }
            ],
            gestureHandling: "greedy",
            disableDoubleClickZoom: false,
            mapTypeControl: false,

            mapTypeId: maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: maps.ControlPosition.TOP_LEFT,
                mapTypeIds: [
                    maps.MapTypeId.ROADMAP,
                    maps.MapTypeId.SATELLITE,
                    maps.MapTypeId.HYBRID
                ]

            },

            zoomControl: false,
            clickableIcons: false
        };
    }

    const UserMarker = ({ profileImg, lat, lng, userId, locationStatus }) => {
        switch (locationStatus) {
            case 'Available':
                return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)', zIndex: 1000 }} onClick={() => handleOpenInfoBox(userId, 'userInfo')}>
                    <img height='28px' width='28px' style={{ position: 'fixed', borderRadius: 100, marginLeft: 12.6, marginTop: 4 }} src={profileImg} alt="" />
                    <img src={DefaultMarker} style={{ maxWidth: 55, maxHeight: 55, cursor: 'pointer' }} alt="" />
                </div>
            case 'Unavailable':
                return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} onClick={() => handleOpenInfoBox(userId, 'userInfo')}>
                    <img height='28px' width='28px' style={{ position: 'fixed', borderRadius: 100, marginLeft: 12.6, marginTop: 4 }} src={profileImg} alt="" />
                    <img src={OnTripMarker} style={{ maxWidth: 55, maxHeight: 55, cursor: 'pointer' }} alt="" />
                </div>
            case '':
                return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} onClick={() => handleOpenInfoBox(userId, 'userInfo')}>
                    <img height='28px' width='28px' style={{ position: 'fixed', borderRadius: 100, marginLeft: 12.6, marginTop: 4 }} src={profileImg} alt="" />
                    <img src={IdleMarker} style={{ maxWidth: 55, maxHeight: 55, cursor: 'pointer' }} alt="" />
                </div>
        }
    };

    const Requestmarker = ({ lat, lng, joId, RequestLocationStatus }) => {
        switch (RequestLocationStatus) {
            case "Queue":
                return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} onClick={() => handleOpenInfoBox(joId, 'requestInfo')}>
                    <img src={QueueRequestMarker} style={{ maxWidth: 30, maxHeight: 30, cursor: 'pointer' }} alt="" />
                </div>
            case "Picked up":
                return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} onClick={() => handleOpenInfoBox(joId, 'requestInfo')}>
                    <img src={OnTransitActivityMarker} style={{ maxWidth: 30, maxHeight: 30, cursor: 'pointer' }} alt="" />
                </div>
            case "Cancelled":
                return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} onClick={() => handleOpenInfoBox(joId, 'requestInfo')}>
                    <img src={CancelledMarker} style={{ maxWidth: 30, maxHeight: 30, cursor: 'pointer' }} alt="" />
                </div>
            default:
                return (<div></div>);

        }
    };

    const JobOrderMarkerFrom = ({ lat, lng, joId }) => {
        return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} data-joid={joId} onClick={handleOpenInfoBox}>
            <img src={MarkerFrom} style={{ maxWidth: 55, maxHeight: 55, cursor: 'pointer' }} alt="" />
        </div>
    };

    const JobOrderMarkerTo = ({ lat, lng, joId }) => {
        return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} data-joid={joId} onClick={handleOpenInfoBox}>
            <img src={MarkerTo} style={{ maxWidth: 55, maxHeight: 55, cursor: 'pointer' }} alt="" />
        </div>
    };

    const TestMaker = () => {
        console.log(branches.branches);
    }

    const closeActiveJO = (e) => {
        setActiveJOBox({
            activeJODetails: 'hidden'
        });
        userData();

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
    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
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
        const branches_data = home_reducer.handleBranch.filter((val) => (val.company_id == e.target.value))
        branches_data.sort(function (a, b) {
            return a['branch_name'].localeCompare(b['branch_name']);
        });
        dispatch_data('SelectedBranches', branches_data)
        setBranches({
            ...branches,
            Selectedcompany: e.target.value
        })
        setState({ ...state, comp_id: e.target.value })
    }
    const onChangeBranch = (e) => {
        setBranches({
            ...branches,
            Selected_branch: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch_data('loading_map', true)
        let data = {
            parameter: 'branch_id',
            selection: [branches.Selected_branch],
            from: moment(state.date_start).format('YYYY-MM-DD'),
            to: moment(state.date_start).format('YYYY-MM-DD'),
            ref:state.ref
        }
        setState({ ...state,  markers: [] })
        setOpen(false)
        getData('tracking/trackEmployeesLocationv2', data)
            .then((res) => {
                console.log(res)
                let accom = []
                let accom2 = []

                var lat = ""
                var lng = ""
                res.fieldman.map((val, index) => {
                    val.jo_accom_list.map((val2, index) => {
                        var latlong = ""
                        var splitlatlng = ""
                        latlong = String(val2.fetched_coordinates)
                        splitlatlng = latlong.split(",")
                        lat = parseFloat(splitlatlng[0])
                        lng = parseFloat(splitlatlng[1])
                        accom2.push({ lat: lat, lng: lng });
                        accom.push(val2);
                    })
                })
               
                    getImagesInitial(accom, 0, accom2)
                
                // if(accom.length != 0){
              

                // }
                setmapOption({ ...mapOption, lat: lat, lng: lng })
                // setState({ ...state, accomplishments_all: accom })

                console.log(accom)
                dispatch_data('coordinates', accom2)
                mapRef2.current = !mapRef2.current

                // let count = 0
                // let jo_assign = 0;
                // let jo_accom_list = 0
                // let with_jo = []
                // let with_out_jo = []
                // let latlng = ''

                // res.fieldman.map((val) => {
                //     val.batch.map((val_batch, index) => {
                //         let match = false;
                //         if (val_batch.jo_count > 0 && index === 0) {
                //             count++;
                //             match = true
                //         }
                //         if (match) {
                //             with_jo.push(val)
                //             latlng = val.location_latlng
                //         } else {
                //             with_out_jo.push(val)
                //         }
                //         jo_assign += parseInt(val_batch.jo_count);
                //     })
                //     jo_accom_list += parseInt(val.jo_accom_list.length)
                // })

                // with_out_jo.map((val) => {
                //     with_jo.push(val)
                // })
                // let latlong = String(latlng)
                // let splitlatlng = latlong.split(",")
                // let lat = parseFloat(splitlatlng[0])
                // let lng = parseFloat(splitlatlng[1])
                // // console.log(latlng)
                // setmapOption({ ...mapOption, lat: lat, lng: lng })
                // let assign = jo_assign - jo_accom_list
                // let unassign = parseInt(res.joborder) - (assign + jo_accom_list)
                // if (unassign < 0) {
                //     unassign = 0;
                // }
                // let total_jo = 0;
                // total_jo = jo_accom_list + assign + unassign

                // let pie_graph = [{ title: 'Accomplished', value: jo_accom_list }, { title: 'Assign', value: assign }, { title: 'Unassign', value: unassign }]

                // setState({ ...state, jo_accom_list: jo_accom_list, assign: assign, unassign: unassign, fieldman: with_jo, fieldman2: with_jo, count_fieldman: count, pie_graph: pie_graph, total_jo: parseInt(total_jo), singleFieldmanDash: false, display_AccomPlayback: [] })
                // dispatch_data('loading_map', false)

            })
    }
    const onTrackAccomplishments = (pic, user_id, date, name, assign) => {
        let data = {
            user_id: user_id,
            date: moment(date).format('YYYY-MM-DD')
        }
        dispatch_data('loading_map', true)
        setFieldman_list(!fieldman_list)
        getData('tracking/trackAccomplishments', data)
            .then((res) => {
                console.log(res.accomplishment)

                if (res.accomplishment.length > 0) {
                    var latlong = ""
                    var splitlatlng = ""
                    var lat = ""
                    var lng = ""
                    var complete_name = ""
                    latlong = String(res.accomplishment[0].fetched_coordinates)
                    splitlatlng = latlong.split(",")
                    lat = splitlatlng[0]
                    lng = splitlatlng[1]
                    console.log(lat + ' - ' + lng)
                    setmapOption({ ...mapOption, lat: parseFloat(lat), lng: parseFloat(lng) })
                }

                setState({ ...state, trackAccom: res.accomplishment, trackAccom2: res.accomplishment, fieldman2: [], buttons: true, user_pic: pic, completeName: name, singleFieldmanDash: true, singleFieldmanDash2: true, display_AccomPlayback: [], assign: assign, count_val: 0, pickIndex: '' })
                dispatch_data('loading_map', false)
            })
    }

    const setGoogleMapRef = (map, maps) => {

        mapRef.current = { map, maps };

        let locations = []
        state.accomplishments_all.map((val, index) => {
            var latlong = ""
            var splitlatlng = ""
            var lat = ""
            var lng = ""
            var complete_name = ""
            latlong = String(val.fetched_coordinates)
            splitlatlng = latlong.split(",")
            lat = parseFloat(splitlatlng[0])
            lng = parseFloat(splitlatlng[1])
            let new_data = { lat: lat, lng: lng }
            locations.push(new_data)

        })


        console.log(locations)
        let markers = locations.map((location) => {
            return new maps.Marker({ position: location })
        })

        const markerCluster = new MarkerClusterer(map, markers, {
            // image = require('../../../assets/map image/chi-gong.png');
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: 30,
            minimumClusterSize: 5,
            zoomOnClick: true

        });


    };
    const ViewerPrev = () => {
        if (state.pickIndex < state.accomplishments_all.length) {
            let index = state.pickIndex--
            let details = state.accomplishments_all[index]
            getData('tracking/getImages', details.jo_id)
                .then((res) => {
                    let images = res
                    if (details.jo_id === "") {
                        images = []
                    }
                    let jo_data = {
                        accom_findings: details.accom_findings,
                        accom_id: details.accom_id,
                        fetched_coordinates: details.fetched_coordinates,
                        jo_id: details.jo_id,
                        imagePath: images,
                        meter_number: details.meter_number,
                        date_added: details.date_added,
                    }
                    setState({ ...state, singleDetails: [jo_data] })
                })
        }
    }
    const ViewerNext = () => {
        if ((state.pickIndex + 1) < state.accomplishments_all.length) {
            let index = state.pickIndex++
            let details = state.accomplishments_all[index]
            getData('tracking/getImages', details.jo_id)
                .then((res) => {
                    let images = res
                    if (details.jo_id === "") {
                        images = []
                    }
                    let jo_data = {
                        accom_findings: details.accom_findings,
                        accom_id: details.accom_id,
                        fetched_coordinates: details.fetched_coordinates,
                        jo_id: details.jo_id,
                        imagePath: images,
                        meter_number: details.meter_number,
                        date_added: details.date_added,
                    }
                    setState({ ...state, singleDetails: [jo_data] })
                })
        }
    }
    const test = (test) => {
        getData('tracking/getImages', test.jo_id)
            .then((res) => {
                let images = res
                if (test.jo_id === "") {
                    images = []
                }
                var latlong = ""
                var splitlatlng = ""
                var lat = ""
                var lng = ""
                latlong = String(test.fetched_coordinates)
                splitlatlng = latlong.split(",")
                lat = parseFloat(splitlatlng[0])
                lng = parseFloat(splitlatlng[1])
                setmapOption({ ...mapOption, lat: lat, lng: lng })
                let jo_data = {
                    accom_findings: test.accom_findings,
                    accom_id: test.accom_id,
                    fetched_coordinates: test.fetched_coordinates,
                    jo_id: test.jo_id,
                    imagePath: images,
                    meter_number: test.meter_number,
                    date_added: test.date_added,
                }
                setState({ ...state, singleDetails: [jo_data] })

            })
    }
    return (

        <div style={{ textAlign: 'left', }}>
            <Backdrop className={classes.backdrop} open={map_reducer.loading_map} style={{ zIndex: 999999999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Draggable>

                <div style={{ position: 'fixed', zIndex: 2, visibility: filterBoard.HomeVisibility, top: 70 }}>
                    <div className={classes.filterBox} style={{ height: 200, width: 250, marginLeft: 290, position: 'absolute' }}>
                        <div style={{ padding: 15 }}>
                            <Grid container className={classes.whiteText} spacing={2}>
                                <Grid item xs={6} >
                                    <span>Filter</span>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right' }}></Grid>
                            </Grid>
                            <Grid container style={{ marginTop: -20 }} className={classes.whiteText} spacing={2}>
                                <Grid item xs={12}>
                                    <Scrollbars style={{ height: 150 }}>
                                        <Table className={classes.table} style={{ marginTop: 10 }} size="small" aria-label="a dense table">
                                            <TableBody>
                                                <TableRow hover>
                                                    <TableCell onClick={(e) =>
                                                        setFilterBoard({
                                                            ...filterBoard,
                                                            positionVisibility: 'block'
                                                        })
                                                    } className={classes.allTable} >Position</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell onClick={(e) =>
                                                        setFilterBoard({
                                                            ...filterBoard,
                                                            companiesVisibility: 'block'
                                                        })
                                                    } className={classes.allTable} >Branches</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell onClick={(e) =>
                                                        setFilterBoard({
                                                            ...filterBoard,
                                                            activityVisibility: 'block'
                                                        })
                                                    } className={classes.allTable} >Activity</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell onClick={(e) =>
                                                        setFilterBoard({
                                                            ...filterBoard,
                                                            dateVisibility: 'block'
                                                        })
                                                    } className={classes.allTable} >Date</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Scrollbars>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className={classes.filterBox} style={{ height: 200, width: 250, marginLeft: 550, display: filterBoard.positionVisibility, position: 'absolute' }}>
                        <div style={{ padding: 15 }}>
                            <Grid container className={classes.whiteText} spacing={2}>
                                <Grid item xs={6} >
                                    <span>Position</span>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right', marginTop: -12, }}>
                                    <IconButton aria-label="delete">
                                        <CloseIcon onClick={(e) =>
                                            setFilterBoard({
                                                ...filterBoard,
                                                positionVisibility: 'none'
                                            })} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: -20 }} className={classes.whiteText} spacing={2}>
                                <Grid item xs={12}>
                                    <Scrollbars style={{ height: 150 }}>
                                        <Table className={classes.table} style={{ marginTop: 10 }} size="small" aria-label="a dense table">
                                            <TableBody>

                                            </TableBody>
                                        </Table>
                                    </Scrollbars>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className={classes.filterBox} style={{ height: 250, width: 270, marginLeft: 550, display: filterBoard.companiesVisibility, position: 'absolute' }}>
                        <div style={{ padding: 15 }}>
                            <Grid container className={classes.whiteText} spacing={2}>
                                <Grid item xs={6} >
                                    <span>Select Company</span>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right', marginTop: -12, }}>
                                    <IconButton aria-label="delete">
                                        <CloseIcon onClick={(e) =>
                                            setFilterBoard({
                                                ...filterBoard,
                                                companiesVisibility: 'none'
                                            })} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: -20 }} className={classes.whiteText} spacing={2}>
                                <Grid item xs={12}>
                                    <Scrollbars style={{ height: 150, marginTop: 10 }}>
                                        <Table className={classes.table} style={{ marginTop: 10 }} size="small" aria-label="a dense table">
                                            <TableBody>
                                                {branches.companies.map((row) => (
                                                    <TableRow hover key={row.companyId}>
                                                        <TableCell onClick={() => filterCompany(row.companyId)} className={classes.allTable} >{row.companyName}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Scrollbars>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className={classes.filterBox} style={{ height: 200, width: 250, marginLeft: 550, display: filterBoard.activityVisibility, position: 'absolute' }}>
                        <div style={{ padding: 15 }}>
                            <Grid container className={classes.whiteText} spacing={2}>
                                <Grid item xs={6} >
                                    <span>Activity</span>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right', marginTop: -12, }}>
                                    <IconButton aria-label="delete">
                                        <CloseIcon onClick={(e) =>
                                            setFilterBoard({
                                                ...filterBoard,
                                                activityVisibility: 'none'
                                            })} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: -20 }} className={classes.whiteText} spacing={2}>
                                <Grid item xs={12}>
                                    <Scrollbars style={{ height: 150 }}>
                                        <Table className={classes.table} style={{ marginTop: 10 }} size="small" aria-label="a dense table">
                                            <TableBody>

                                            </TableBody>
                                        </Table>
                                    </Scrollbars>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className={classes.filterBox} style={{ height: 200, width: 250, marginLeft: 550, display: filterBoard.dateVisibility, position: 'absolute' }}>
                        <div style={{ padding: 15 }}>
                            <Grid container className={classes.whiteText} spacing={2}>
                                <Grid item xs={6} >
                                    <span>Date</span>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right', marginTop: -12, }}>
                                    <IconButton aria-label="delete">
                                        <CloseIcon onClick={(e) =>
                                            setFilterBoard({
                                                ...filterBoard,
                                                dateVisibility: 'none'
                                            })} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: -20 }} className={classes.whiteText} spacing={2}>
                                <Grid item xs={12}>
                                    <Scrollbars style={{ height: 150 }}>
                                        <Table className={classes.table} style={{ marginTop: 10 }} size="small" aria-label="a dense table">
                                            <TableBody>

                                            </TableBody>
                                        </Table>
                                    </Scrollbars>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className={classes.filterBox} style={{ height: 250, width: 270, marginLeft: 550, display: filterBoard.branchesVisibility, position: 'absolute' }}>
                        <div style={{ padding: 15 }}>
                            <Grid container className={classes.whiteText} spacing={2}>
                                <Grid item xs={6} >
                                    <span>Branches</span>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right', marginTop: -12, }}>
                                    <IconButton aria-label="delete">
                                        <CloseIcon onClick={(e) =>
                                            setFilterBoard({
                                                ...filterBoard,
                                                branchesVisibility: 'none'
                                            })} style={{ color: '#fff' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: -20 }} className={classes.whiteText} spacing={2}>
                                <Grid item xs={12}>
                                    <Scrollbars style={{ height: 150 }}>
                                        <Table className={classes.table} style={{ marginTop: 10 }} size="small" aria-label="a dense table">
                                            <TableBody>
                                                {branches.filteredBranch.map((row) => (
                                                    <TableRow hover key={row.branch_id}>
                                                        <TableCell onClick={() => filterBranch(row.branch_id)} className={classes.allTable} >{row.branch_name}</TableCell>
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
            </Draggable>

            {/* Search */}
            <div style={{ width: 250, height: 10, position: 'fixed', zIndex: 2, left: 10, top: 10 }}>
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
                <Button
                    variant="contained"
                    color="#7f8c8d"
                    className={classes.button}
                    startIcon={<FilterListIcon />}
                    onClick={() => { setOpen(true);setState({...state,singleDetails:[]})}}
                >
                    Filter
      </Button>

            </div>
            {/* Buttons Shows */}
            <div style={{ position: 'fixed', zIndex: 2, right: 20 }}>
                <IconButton aria-label="delete">
                    <CallMadeIcon
                        onClick={(event) => showFullMap(
                            initialBoard.visibility === 'visible' ?
                                'hidden' : 'visible'
                        )} style={{ color: '#fff' }} />
                </IconButton>

            </div>

            {/* First Left Dashboard */}

            <Draggable>
                <div onClick={() => { setFieldman_list(!fieldman_list); clearTimeout(timerRef.current); setpause(false); setState({ ...state, singleFieldmanDash2: false }) }} className={classes.dashboards} style={{ cursor: 'pointer', height: 150, width: 275, margin: 10, top: 45, position: 'fixed', zIndex: 2, visibility: initialBoard.visibility }}>
                    <div style={{ padding: 15 }}>
                        <Grid container className={classes.whiteText} spacing={2}>
                            <Grid item xs={12} >
                                <Typography style={{ fontSize: 18 }}>{moment(state.date_start).format('ll')}</Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <ListAltIcon style={{ fontSize: 55, color: '#f39c12' }} />
                                    <Typography style={{ marginLeft: 10, fontSize: 40 }}>{state.accomplishments_all.length}</Typography>
                                </div>
                                <Typography style={{ marginTop: -11, fontSize: 15 }}>Total&nbsp;Accomplishments</Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Draggable>
            {state.singleDetails != 0 ? <Draggable>
                <div className={classes.dashboards} style={{ cursor: 'pointer', height: 580, width: 400, top: 60, right: 5, position: 'fixed', zIndex: 2, visibility: initialBoard.visibility }}>
                    <div style={{ padding: 15 }}>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',marginBottom:4 }}>
                           <CloseIcon style={{color:'#fff'}} onClick={()=>{setState({...state,singleDetails:[]})}}/>
                        </div>
                        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            {state.pickIndex !== 0 ?
                                <Link component="button" style={{ padding: 5, color: 'white' }} onClick={() => { ViewerPrev() }}>Previous</Link>
                                :
                                <Typography style={{ padding: 5, color: 'grey', cursor: 'not-allowed' }}>Previous</Typography>

                            }
                            {state.pickIndex + 1 !== state.accomplishments_all.length ?
                                < Link component="button" style={{ padding: 5, color: 'white' }} onClick={() => { ViewerNext() }}>Next</Link>
                                :
                                <Typography style={{ padding: 5, color: 'grey', cursor: 'not-allowed' }}>Next</Typography>
                            }
                        </div> */}
                        <Grid container className={classes.whiteText} spacing={2}>
                            {state.singleDetails.map((val, index) => {
                                let name = 'No Name'
                                let location = 'No Address'
                                if (val.customer_lname != "" && val.customer_fname != "") {
                                    name = val.customer_lname + ' ' + val.customer_fname
                                }
                                if (val.customer_location != "") {
                                    name = val.customer_location
                                }
                                return <><Grid item xs={12} >
                                    <Card variant='outlined' style={{ padding: 10 }}>
                                        <Carousel navButtonsAlwaysVisible={true} autoPlay={false} >
                                            {val.imagePath.length !== 0 ?
                                                val.imagePath.map((valImage, index) => {
                                                    return <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + valImage.image_path} alt="test" style={{ width: '100%', height: '250px' }} />
                                                })
                                                :
                                                <img src={require('../../../assets/map image/no_image.png')} alt="test" style={{ width: '100%', height: '250px' }} />

                                            }

                                        </Carousel>
                                    </Card>

                                </Grid>

                                    {/* <Grid item xs={12} > */}
                                    <Scrollbars style={{ height: 200, marginLeft: 10 }}>
                                        <div >
                                            <Typography style={{ fontSize: 20 }}>Accomplishment details</Typography>
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
                                                        <Typography>{moment(val.date_added).format('lll')}</Typography>
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
                                                    <Link href={'https://maps.google.com/maps?q=' + val.fetched_coordinates} target='_blank' style={{ textDecoration: 'none',color: 'white' }}><Typography>{val.fetched_coordinates}</Typography></Link>
                                                      
                                                    </Grid>
                                                </Grid>

                                            </div>



                                        </div>
                                    </Scrollbars>
                                    {/* </Grid> */}


                                </>
                            })

                            }


                            {/* <Grid item xs={12} md={12} style={{position:'relative'}}>
                            
                         </Grid> */}
                        </Grid>
                    </div>
                </div>
            </Draggable> : undefined



            }

            {/* {(fieldman_list) ?
                <Draggable>
                    <div className={classes.dashboards} style={{ height: 582, width: 580, left: 505, margin: 18, top: 50, position: 'fixed', zIndex: 2, visibility: initialBoard.visibility }}>
                        <div style={{ padding: 15 }}>
                            <Grid container className={classes.whiteText} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography style={{ fontSize: 15 }}>Choose Fieldman</Typography>
                                    <div style={{ position: 'fixed', zIndex: 2, right: 5, top: 4 }}>
                                        <IconButton onClick={() => { setFieldman_list(!fieldman_list) }} aria-label="delete">
                                            <CloseIcon
                                                style={{ color: '#fff' }} />
                                        </IconButton>
                                    </div>

                                </Grid>
                                <Grid item xs={12} >
                                </Grid>
                                <Scrollbars style={{ height: 480, paddingTop: 10 }}>
                                    {state.fieldman.map((row, key) => {
                                        let assign = 0
                                        let bulk = 0
                                        let bulk2 = -10
                                        let prev_coordinates = ''
                                        let bulk_val = false;
                                        row.batch.map((val) => {
                                            console.log(row)
                                            assign += parseInt(val.jo_count)
                                        })
                                        row.jo_accom_list.map((val) => {
                                            if (val.fetched_coordinates === prev_coordinates) {
                                                bulk++;
                                            } else {
                                                if (bulk > 4) {
                                                    bulk2 += bulk
                                                    bulk_val = true
                                                }
                                                bulk = 0;
                                            }
                                            prev_coordinates = val.fetched_coordinates
                                        })
                                        if (bulk > 0) {
                                            bulk2 += bulk
                                        }
                                        if (bulk2 < 0) {
                                            bulk2 = 0;
                                        }
                                        let width = 0;

                                        if (isNaN(row.jo_accom_list.length / assign)) {

                                        } else {
                                            width = row.jo_accom_list.length / assign
                                        }

                                        return <Grid item xs={12} style={{ marginBottom: 20 }}>
                                            <div type="button" style={{ cursor: 'pointer' }} onClick={() => { onTrackAccomplishments(row.user_pic, row.user_id, state.date_start, row.completename, assign) }}
                                            >
                                                <Grid container className={classes.whiteText} spacing={2} style={{ padding: 10 }}>
                                                    <Grid item xs={12}>
                                                        <div style={{ position: 'relative' }}>
                                                            {row.user_pic === "" ? <img alt="picture" src={UserImage} style={{ width: 60, height: 60, margin: 'auto', borderRadius: 60 / 2 }} /> :
                                                                <img alt="picture" src={("http://images.pacificweb.com.ph/pockethr/profilepic/" + row.user_pic)} style={{ width: 60, height: 60, margin: 'auto', borderRadius: 60 / 2 }} />
                                                            }
                                                            <Typography style={{ position: 'absolute', left: 80, top: 10 }}>{row.completename !== null ? String(row.completename).toUpperCase() : undefined}</Typography>
                                                            <div style={{ width: 250, height: 10, background: '#fff', borderRadius: 5, position: 'absolute', left: 80, top: 35 }}>
                                                            </div>
                                                            <div style={{ width: (250 * width) > 250 ? 250 : (250 * width), height: 10, background: '#3498db', borderRadius: 5, position: 'absolute', left: 80, top: 35 }}>
                                                            </div >
                                                            <div style={{ position: 'absolute', right: 50, top: 13, display: 'flex', alignItems: 'row' }}>
                                                                <div style={{ width: 15, height: 15, background: row.attendance.length > 0 ? '#2ecc71' : '#fff', borderRadius: 15 / 2, marginRight: 10 }}>
                                                                </div>
                                                                <div style={{ width: 15, height: 15, background: assign > 0 ? '#2ecc71' : '#fff', borderRadius: 15 / 2, marginRight: 10 }}>
                                                                </div>
                                                                <div style={{ width: 15, height: 15, background: row.attendance.length > 1 ? '#2ecc71' : '#fff', borderRadius: 15 / 2, marginRight: 10 }}>
                                                                </div>
                                                                <div style={{ width: 15, height: 15, background: row.attendance.length > 2 ? '#2ecc71' : '#fff', borderRadius: 15 / 2, marginRight: 10 }}>
                                                                </div>
                                                                <div style={{ width: 15, height: 15, background: row.attendance.length > 3 ? '#2ecc71' : '#fff', borderRadius: 15 / 2 }}>
                                                                </div>
                                                            </div>
                                                            <div style={{ position: 'absolute', right: 80, top: 30, display: 'flex', alignItems: 'row' }}>
                                                                <Typography>({row.jo_accom_list.length} of {assign})</Typography>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    {assign > 0 ?
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Grid container className={classes.whiteText} spacing={2} style={{ paddingRight: 60, paddingLeft: 60 }}>
                                                                    <Grid item md={4}>
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                            <CheckCircleIcon style={{ color: '#2ecc71' }} />
                                                                            <Typography>{row.attendance.length !== 0 ? moment(row.attendance[0].date_added).format('LT') : undefined}</Typography>
                                                                        </div>

                                                                    </Grid>
                                                                    <Grid item md={4}>
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                            {row.jo_accom_list.length >= assign ?
                                                                                <CheckCircleIcon style={{ color: '#2ecc71' }} /> :
                                                                                <CancelIcon style={{ color: '#e74c3c' }} />

                                                                            }

                                                                            <Typography>Completeness</Typography>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item md={4}>
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                            {bulk2 > 0 ? <CancelIcon style={{ color: '#e74c3c' }} /> :
                                                                                <CheckCircleIcon style={{ color: '#2ecc71' }} />
                                                                            }

                                                                            <Typography>{bulk2} Bulk Delivery</Typography>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={12} style={{ marginTop: -10 }}>
                                                                <Grid container className={classes.whiteText} spacing={2} style={{ paddingRight: 60, paddingLeft: 60 }}>
                                                                    <Grid item md={4}>
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                            <CheckCircleIcon style={{ color: '#2ecc71' }} />
                                                                            <Typography>Field Findings</Typography>
                                                                        </div>

                                                                    </Grid>
                                                                    <Grid item md={4}>
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                            <CheckCircleIcon style={{ color: '#2ecc71' }} />
                                                                            <Typography>Battery</Typography>
                                                                        </div>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>

                                                        </>
                                                        : undefined
                                                    }
                                                </Grid>
                                            </div>
                                            <div style={{ width: '100%', backgroundColor: '#2d3436', height: 1.2 }}>
                                            </div>

                                        </Grid>
                                    })}
                                </Scrollbars>
                            </Grid>
                        </div>
                    </div>
                </Draggable>
                : undefined

            } */}


            {/* Activity Details */}
            <div className={classes.dashboards}
                style={{
                    height: '80%', width: 250, top: 50, margin: 18, position: 'fixed', zIndex: 2, visibility: activeJOBox.activeJODetails
                }}>
                {/* {blmcData.activeJOData.map(row => {
                    return (<div style={{ padding: 15 }}>
                        <Grid container className={classes.whiteText} spacing={2}>
                            <Grid item xs={6} >
                                <span>{moment(row.jo_date_added).format('MMM D, YYYY')}</span>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: 'right', marginTop: -12, }}>
                                <IconButton aria-label="delete">
                                    <CloseIcon onClick={closeActiveJO} style={{ color: '#fff' }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginTop: -20 }} className={classes.whiteText} spacing={2}>
                            <Grid item xs={12}>
                                <span style={{ fontSize: 25, color: '#27ae60' }}>{row.jo_status}</span>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.whiteText} spacing={2}>
                            <Grid item xs={12}>
                                <span style={{ width: '', fontSize: 13, color: '#2980b9', fontWeight: 700 }}>{row.origin}</span>
                                <p style={{ marginTop: -3, fontSize: 13 }}>Origin</p>

                            </Grid>
                        </Grid>
                        <Grid container className={classes.whiteText} spacing={2}>
                            <Grid item xs={12}>
                                <span style={{ width: '', fontSize: 13, color: '#b03e4b', fontWeight: 700 }}>{row.destination}</span>
                                <p style={{ marginTop: -3, fontSize: 13 }}>Destination</p>

                            </Grid>
                        </Grid>
                        <Grid container className={classes.whiteText} spacing={2}>
                            <Grid item xs={12}>
                                <span style={{ width: '', fontSize: 13, color: '#27ae60', fontWeight: 700 }}>{row.driver_fname} {row.driver_mname} {row.driver_lname}</span>
                                <p style={{ marginTop: -3, fontSize: 13 }}>Driver</p>

                            </Grid>
                        </Grid>
                        <Grid container className={classes.whiteText} spacing={2}>
                            <Grid item xs={12}>
                                <span style={{ width: '', fontSize: 13, color: '#27ae60', fontWeight: 700 }}>{row.vehicle_name}|{row.vehicle_plate_number}</span>
                                <p style={{ marginTop: -3, fontSize: 13 }}>Vehicle | Plate#</p>
                            </Grid>
                        </Grid>
                    </div>)

                })} */}

            </div>
            {/* !Activity Details */}

            {/* Map Component */}
            {
                state.buttons ? <div style={{ width: '20%', height: '8vh', zIndex: 999, position: 'absolute', bottom: 35, left: '40%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ position: 'relative' }}>
                        <FastForwardIcon onClick={() => {
                            if (speeds.current === 8) {
                                speeds.current = 1
                            } else {
                                speeds.current++
                            }
                            setState({ ...state })
                        }} style={{ fontSize: 50, cursor: 'pointer' }} />

                        <Typography style={{ position: 'absolute', bottom: 38, left: 30, fontSize: 18, fontWeight: 'bold' }}>{'x' + speeds.current}</Typography>
                    </div>


                    {pause ?
                        <PauseIcon onClick={() => {
                            setpause(false)
                            ShowMapMarkerPlayback(state.trackAccom2, true)
                        }} style={{ fontSize: 50, cursor: 'pointer' }} />
                        :
                        <PlayArrowIcon onClick={() => {
                            setpause(true)
                            playBackAccom(state.trackAccom2, false, 1200)
                        }} style={{ fontSize: 50, cursor: 'pointer' }} />
                    }


                    <StopIcon onClick={() => {
                        stop(state.trackAccom2, true)
                        speeds.current = 1
                        setmapOption({ ...mapOption, zoom: 12 })

                    }} style={{ fontSize: 50, cursor: 'pointer' }} />
                </div> : undefined

            }

            < div style={{ height: '100vh', width: '100%', position: 'absolute' }}>
                <MapWithAMarkerClusterer markers={state.markers} mapOption={mapOption} test={(event) => test(event)} />
            </div>
            {/* //Inital Data */}

            {/* Marker Info Box  */}
            <div className={classes.dashboards}
                // onMouseUp={handleCloseInfoBox} 
                style={{
                    height: '100%', width: '100%', position: 'fixed', zIndex: 2, visibility: infoBox.visibility
                }}>
                <div style={{ position: 'fixed', zIndex: 2, right: 20 }}>
                    <IconButton aria-label="delete">
                        <CloseIcon
                            onClick={() => handleCloseInfoBox('userInfo')} style={{ color: '#fff' }} />
                    </IconButton>
                </div>
                <Grid container spacing={10}>
                    {activeInfoBox.activeInfoBox.map(activeUser =>

                        <Grid item xs={2} >

                            <div style={{ color: '#fff', paddingTop: 50, paddingLeft: 100 }}>
                                <Avatar alt={activeUser.user_fname} src={'http://images.pacificweb.com.ph/pockethr/profilepic/' + activeUser.user_pic} className={classes.large} />
                            </div>
                            <div style={{ color: '#fff', marginLeft: 50, marginTop: 10, width: 200, textAlign: 'center' }}>
                                <h4>{activeUser.user_lname}, {activeUser.user_fname}</h4>
                            </div>
                            <div style={{ color: '#fff', marginLeft: 50, marginTop: -10, width: 200, textAlign: 'center' }}>
                                <h5>at <span style={{ color: '#74b9ff' }}>{activeUser.location_latlng}</span></h5>
                                <h3 style={{ marginTop: -23, color: '#27ae60' }}>{moment(activeUser.location_date_added).format('MMM D, YYYY h:mm a')}</h3>
                            </div>
                        </Grid>
                    )}
                    <Grid item xs={6}>
                        <div style={{ marginTop: 50, paddingLeft: 50 }}>
                            <Scrollbars style={{ marginTop: 50, paddingLeft: 50, height: 550 }}>

                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.allTable, classes.tableHead}>#</TableCell>
                                            <TableCell className={classes.allTable, classes.tableHead}>Job Order Id</TableCell>
                                            <TableCell className={classes.allTable, classes.tableHead}>Customer</TableCell>
                                            <TableCell className={classes.allTable, classes.tableHead}>Status</TableCell>
                                            <TableCell className={classes.allTable, classes.tableHead}>Date Posted</TableCell>
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
                                    style={{ color: '#fff' }}
                                />

                            </Scrollbars>

                            <Button color="primary">Playback</Button>
                        </div>
                    </Grid>
                </Grid>


            </div>
            {/* !Marker Info Box */}

            {/* Request Marker Info Box  */}
            <div className={classes.dashboards}
                // onMouseUp={handleCloseInfoBox} 
                style={{
                    height: '100%', width: '100%', position: 'fixed', zIndex: 2, visibility: requestInfoBox.visibility
                }}>
                <div style={{ position: 'fixed', zIndex: 2, right: 20 }}>
                    <IconButton aria-label="delete">
                        <CloseIcon
                            onClick={() => handleCloseInfoBox('requestInfo')} style={{ color: '#fff' }} />
                    </IconButton>
                </div>
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <div style={{ marginTop: 50, paddingLeft: 50 }}>

                        </div>
                    </Grid>
                </Grid>


            </div>

            <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Generate Accomplishments</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
                                    <KeyboardDatePicker
                                        id="date-picker-dialog"
                                        label="Filter Date"
                                        format="MM-dd-yyyy"
                                        name='date_start'
                                        value={state.date_start}
                                        style={{ width: '100%' }}
                                        onChange={handleDateChangeStart}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            {/* <Grid item xs={12} md={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
                                    <KeyboardDatePicker
                                        id="date-picker-dialog"
                                        label="Filter Date To"
                                        format="MM-dd-yyyy"
                                        name='date_start'
                                        value={state.date_end}
                                        style={{ width: '100%' }}
                                        onChange={handleDateChangeEnd}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid> */}
                            <Grid item xs={12} md={12}>
                                <FormControl size='small' className={classes.formControl} style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Company</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChangeCompany}
                                        label="Company"
                                        name='company'
                                        value={state.comp_id}
                                    >
                                        {home_reducer.company_name.map((val) => {
                                            return <MenuItem value={val.company_id}>{val.company_name}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl size='small' className={classes.formControl} style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Branch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChangeBranch}
                                        label="branch"
                                        name='branch_id'
                                        value={branches.Selected_branch}
                                    >
                                        {home_reducer.SelectedBranches.map((val, index) => {
                                            return <MenuItem value={val.branch_id}>{val.branch_company}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div>
                                <TextField style={{width:'100%'}} onChange={(e)=>setState({...state,ref:e.target.value})}  size='small' id="outlined-basic" label="Reference Number"  variant="outlined" />
                                </div>
                               
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type='submit' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Submit</Button>
                        </div>
                    </form>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions> */}
            </Dialog>
            <Dialog fullWidth maxWidth='md' open={openPie} onClose={handleClose} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Monitoring</DialogTitle>
                <DialogContent>


                </DialogContent>

            </Dialog>
            {/* !Request Marker Info Box */}

        </div >
    );
}

