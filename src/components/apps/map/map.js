import React, { useState } from 'react';
import '../../../App';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
/*import { getUsers, getJD } from '../Functions/home_func'*/
import useStyles from '../../../css/css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GoogleMapReact from 'google-map-react';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import RoomIcon from '@material-ui/icons/Room';
import logo from '../../media/pin.png'
function Index() {
    const home_reducer = useSelector(state => state.home_reducer)
    const classes = useStyles();
    const [state, setState] = React.useState({
        zoom: 18,
        center: {
            lat: parseFloat(home_reducer.latitude),
            lng: parseFloat(home_reducer.longitude)
        },
    });
    const greatPlaceStyle = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    }
    const UserMarker = () => {
        return <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
            {/* <img height='28px' width='28px' style={{ position: 'fixed', borderRadius: 100, marginLeft: 12.6, marginTop: 4 }} src= alt="" /> */}
            <img src={logo} style={{ maxWidth: 45, maxHeight: 45, cursor: 'pointer' }} alt="" />
        </div>
    };
    // const getMapOptions = (maps) => {

    //     return {
    //         streetViewControl: true,
    //         scaleControl: false,
    //         fullscreenControl: false,
    //         zoomControl: false,
          
    //         gestureHandling: "greedy",
    //         disableDoubleClickZoom: false,
    //         mapTypeControl: false,

    //         mapTypeId: maps.MapTypeId.ROADMAP,
    //         mapTypeControlOptions: {
    //             style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
    //             position: maps.ControlPosition.TOP_LEFT,
    //             mapTypeIds: [
    //                 maps.MapTypeId.ROADMAP,
    //                 maps.MapTypeId.SATELLITE,
    //                 maps.MapTypeId.HYBRID
    //             ]

    //         },

    //         zoomControl: false,
    //         clickableIcons: false
    //     };
    // }

    const getMapOptions = (maps) => {

        return {
            streetViewControl: true,
            scaleControl: false,
            fullscreenControl: false,
            zoomControl: false,
            styles: [{
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }]
            }],
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
                    maps.MapTypeId.HYBRID
                ]

            },

            zoomControl: false,
            clickableIcons: false
        };
    }
    // const AnyReactComponent = ({ text }) => <div> <RoomIcon /></div>
    return (
        <div style={{ height: '31vh', width: '38vw'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A' }}
                defaultCenter={state.center}
                defaultZoom={state.zoom}
                // mapTypeId='satellite'
                options={getMapOptions}
            >
                <UserMarker
                    lat={parseFloat(home_reducer.latitude)}
                    lng={parseFloat(home_reducer.longitude)}
                    text="My Marker"
                />

            </GoogleMapReact>

            {/* <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAz0n7-lqY4We_24Yk8QIjVNbnPX1fG8pU' }}
                defaultCenter={{ lat: mapOption.lat, lng: mapOption.lng }}
                defaultZoom={mapOption.zoom}
                options={getMapOptions}
            >
                {state.initializeMarkers.map(marker => {
                    var latlng = String(marker.location_latlng)
                    var splitlatlng = latlng.split(",")
                    var lat = parseFloat(splitlatlng[0])
                    var lng = parseFloat(splitlatlng[1])
                    return <UserMarker
                        lat={lat}
                        lng={lng}
                        userId={marker.user_id}
                        text="My Marker"
                        profileImg={'http://images.pacificweb.com.ph/pockethr/profilepic/' + marker.user_pic}
                    />
                })}
            </GoogleMapReact> */}
        </div>
    );
}

export default Index;
