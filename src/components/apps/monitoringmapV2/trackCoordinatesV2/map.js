import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import MarkerClusterer from "@google/markerclusterer";
var newMap = [];
var markerCluster = [];
let flightPath
let infowindowPoly
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
const Map = forwardRef((props, ref) => {
  const { trackAccom, 
    isOpen, 
    onToggleOpen, 
    refresh, 
    clearCLuster, 
    playButton, 
    mapOption, 
    clearTimeout, 
    fieldmanDeatilsOpen, 
    new_pickIndex, 
    trackAccomSpan, 
    pathCoordinates, 
    midPoint,
    openMapSelectedFieldman } = props



  // function Map({ trackAccom, isOpen, onToggleOpen, refresh,clearCLuster,playButton,mapOption,clearTimeout,fieldmanDeatilsOpen}) {
  const map_reducer = useSelector((state) => state.map_reducer);
  const mapRef2 = React.useRef(false);

  // const [mapOption, setmapOption] = React.useState({
  //   zoom: 12,
  //   lat: 13.7565,
  //   lng: 121.0583,
  // });
  const [state, setState] = React.useState({
    new_marker: [],
  });

  const mapRef = React.useRef();

  const getMapBounds = (map, maps, trackAccom) => {
    const bounds = new maps.LatLngBounds();

    trackAccom.forEach((place) => {
      bounds.extend(new maps.LatLng(
        place.lat,
        place.lng,
      ));
    });
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 20),
    y: -height,
  });

  const setGoogleMapRef = (map, maps) => {

    state.new_marker = [];
    mapRef.current = { map, maps };
    let googleRef = maps;
 
    newMap =
      trackAccom &&
      trackAccom.map((location, index) => {
        let image_pic = undefined;
      
        let image = require("../../../../assets/map image/online.png");;
       
      
        let icon = {
          url: image,
          scaledSize: new window.google.maps.Size(30, 38),
        };

        let marker = new googleRef.Marker({
          position: location,
          icon: icon,
        });
        return marker;
      });
   
    markerCluster = new MarkerClusterer(map, newMap, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      gridSize: 10,
      minimumClusterSize: 2,
      maxZoom: 13,
    });

  };

 
  console.log('Map')


  return (
    <div style={{ height: "100vh", width: "100%", position: "absolute" }}>

      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A" }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => setGoogleMapRef(map, maps)}
        center={{ lat:13.7565, lng: 121.0583}}
        zoom={4}
        options={(maps)=>getMapOptions(maps,localStorage.getItem('MapOption'))}
      ></GoogleMapReact>
    </div>
  );
}
)
export default React.memo(Map);
