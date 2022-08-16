import logo from '../../../logo.svg';
import '../../../App.css';

import React, { useContext,useState,forwardRef,useImperativeHandle } from 'react';
import {ClientMapContext} from '../../context/clientMapContext/ClientMap';
import GoogleMapReact from "google-map-react";
// import { useMap } from './hooks/mapHooks'
import { useDispatch, useSelector } from "react-redux";
import { getData } from '../../api/api';
import moment from 'moment'
import MarkerClusterer from "@google/markerclusterer";
var newMap = [];
var markerCluster = [];
const Map = React.memo(forwardRef((props,ref) => {
  // const { state, mapOption, setGoogleMapRef, getMapOptions } = useMap();
  // console.log("Map")
  const refreshAccomDetails = useSelector((state) => state.map_reducer.refreshAccomDetails);
  const refresh = useSelector((state) => state.map_reducer.refresh);

  const mapRef = React.useRef();
  const new_marker = React.useRef([]);
  const { accomList,mapOption,accomCount,accomColor} = useContext(ClientMapContext)
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
      new_marker.current = []
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
                  if(initial.current){
                  dispatch_data("loading_map", true);
                  }
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
              new_marker.current.push(marker)
              return marker;
          });
      let newGrid = (10 * NewMarker.length) / 15000
      let newMinimumClusterSize = 2
      let maxZoom = 16
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
      dispatch({
        type:'MapReducerState',
        data:{
            closeGenerateModal : false,
        }
    })

  };

  useImperativeHandle(ref, () => ({
    onShowInfowindow(id) {
      if (mapRef.current) {
        const { map, maps } = mapRef.current;
        maps.event.trigger(new_marker.current[id], "click");
        }
    }
  }));
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
  return (
    <div style={{ height: "100vh", width: "100%", position: "absolute" ,zIndex:-10}}>
      <GoogleMapReact
        onZoomChanged={()=>console.log('hehehehe')}
        bootstrapURLKeys={{ key: "AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A" }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => setGoogleMapRef(map, maps)}
        center={{ lat: mapOption.lat, lng: mapOption.lng }}
        zoom={mapOption.zoom}
        options={(maps) => getMapOptions(maps, localStorage.getItem('MapOption'))}
      ></GoogleMapReact>
    </div>
  );
}))
export default Map;