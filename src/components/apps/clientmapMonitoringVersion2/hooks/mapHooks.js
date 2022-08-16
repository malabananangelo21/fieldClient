import React, { useState, useContext } from 'react'
import MarkerClusterer from "@google/markerclusterer";
import { useDispatch, useSelector } from "react-redux";
import { ClientMapContext } from '../../../context/clientMapContext/ClientMap'
import BgreenMarker from '../../../.././assets/map image/bgreen-marker.png'
import BlackMarker from '../../../.././assets/map image/black-marker.png'
import BlueMarker from '../../../.././assets/map image/blue-marker.png'
import BrownMarker from '../../../.././assets/map image/brown-marker.png'
import DbrownMarker from '../../../.././assets/map image/dbrown-marker.png'
import GrayMarker from '../../../.././assets/map image/gray-marker.png'
import GreenMarker from '../../../.././assets/map image/green-marker.png'
import LgreenMarker from '../../../.././assets/map image/lgreen-marker.png'
import LpurpleMarker from '../../../.././assets/map image/lpurple-marker.png'
import LyellowMarker from '../../../.././assets/map image/lyellow-marker.png'
import OrangeMarker from '../../../.././assets/map image/orange-marker.png'
import PblueMarker from '../../../.././assets/map image/pblue-marker.png'
import PinkMarker from '../../../.././assets/map image/pink-marker.png'
import PpurpleMarker from '../../../.././assets/map image/ppurple-marker.png'
import PurpleMarker from '../../../.././assets/map image/purple-marker.png'
import RedMarker from '../../../.././assets/map image/red-marker.png'
import SblueMarker from '../../../.././assets/map image/sblue-marker.png'
import SkyBlueMarker from '../../../.././assets/map image/skyBlue-marker.png'
import WhiteMarker from '../../../.././assets/map image/white-marker.png'
import YellowMarker from '../../../.././assets/map image/yellow-marker.png'
import YGreenMarker from '../../../.././assets/map image/ygreen-marker.png'
import moment from 'moment'
import { getData } from '../../../api/api';
var newMap = [];
var markerCluster = [];

export const useMap = () => {
    const refreshAccomDetails = useSelector((state) => state.map_reducer.refreshAccomDetails);
    const refresh = useSelector((state) => state.map_reducer.refresh);

    const { accomList,mapOption,accomCount,accomColor,mapRef,new_marker} = useContext(ClientMapContext)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        new_marker: [],
        markers_map: [],
        search: ''
    })
   
    let NewMarker = accomList.filter((files) => {
        return (
            files.meter_number
                .toLowerCase()
                .indexOf(state.search.toLocaleLowerCase()) !== -1
        );
    });
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    const getDetails = (accom_id,jo_id) => {
        let data = {
            accom_id,
            jo_id
        }
        getData('Tracking/GetAccomDetails',data).then(()=>{

        })
    }
    const initial = React.useRef(false)
    const setGoogleMapRef = (map, maps) => {
        // reset_new_marker()
        // new_marker.current = []
        mapRef.current = { map, maps };
        let googleMapRef = map;
        let googleRef = maps;
        let marker = [];
        let newMarker = [];
        let image = "";

        let lastWIndow = "";
         state.new_marker = []
        newMap =
            NewMarker &&
            NewMarker.map((location, index) => {
                let match_url = []
                if( typeof accomColor[0].date != 'undefined'){
                    match_url = accomColor.filter((val) =>moment(location.date_accom).format('YYYY-MM-DD')== moment(val.date).format('YYYY-MM-DD'))
                }else{
                     match_url = accomColor.filter((val) => (val.user_id == location.user_id))
                }
               
                
                let icon = {
                    url:  match_url[0].url,
                    scaledSize: new window.google.maps.Size(20, 28)
                }
                // let icon = {
                //   url: image,
                //   scaledSize: new window.google.maps.Size(30, 38),
                // };
                let new_latlong = String(location.fetched_coordinates).split(',')
                let latlng = {
                    lat: parseFloat(new_latlong[0]),
                    lng: parseFloat(new_latlong[1])
                }
                let marker = new googleRef.Marker({
                    position: latlng,
                    icon: icon,
                });
                var infoWindow = new googleRef.InfoWindow({});
                googleRef.event.addListener(marker, "click", function (evt) {
                    if (lastWIndow !== "") {
                        lastWIndow.close();
                    }
                    let data = {
                        accom_id:location.accom_id,
                        jo_id:location.id
                    }
                    dispatch_data("loading_map", true);
                    getData('Tracking/GetAccomDetails',data).then((res)=>{
                        
                        dispatch({
                            type:'MapReducerState',
                            data:{
                                selected_data : res.accomplishment,
                                refreshAccomDetails:!refreshAccomDetails,
                                selectedAccomIndex:index
                            }
                        })
                        dispatch_data("loading_map", false);
                        res.accomplishment.map((val,index)=>{
                            infoWindow.setContent(
                                "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold'}}><b>" +
                                val.meter_number +
                                " | " +
                                val.accom_findings +
                                "</b></Typography>" +
                                "<br/>" +
                                "<Typography style={{fontWeight: 'bold'}}><b>" +
                                moment(location.date_accom).format("LLL") +
                                "</b></Typography></div>"
                            );
                            infoWindow.open(map, marker);
                            lastWIndow = infoWindow;
                        })
                       
                    })
                  
                });
               state.new_marker.push(marker)
                return marker;
            });
           


        let newGrid = (5 * NewMarker.length) / 5000
        let newMinimumClusterSize = 5
        let maxZoom =  (10 * NewMarker.length) / 5000
        markerCluster = new MarkerClusterer(map, newMap, {
            imagePath:
                "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            gridSize: newGrid,
            minimumClusterSize: newMinimumClusterSize,
            maxZoom: maxZoom,
        });
        if(initial.current){
            dispatch_data("loading_map", false);
        }
        initial.current = true

    };
    const getMapOptions = (maps, styleMap) => {
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

   
    React.useEffect(() => {
        setTimeout(() => {
            if (mapRef.current) {
                markerCluster.clearMarkers();
                const { map, maps } = mapRef.current;
                setGoogleMapRef(map, maps);
            }
        }, 500)


    }, [refresh])

    return { state,mapOption, setGoogleMapRef, getMapOptions,NewMarker}
}
