import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import MarkerClusterer from "@google/markerclusterer";
var newMap = [];
var markerCluster = [];
let flightPath;
let infowindowPoly;
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

    mapTypeId:
      styleMap === "HYBRID"
        ? maps.MapTypeId.HYBRID
        : styleMap === "SATELLITE"
        ? maps.MapTypeId.SATELLITE
        : styleMap === "ROAD MAP"
        ? maps.MapTypeId.ROADMAP
        : maps.MapTypeId.HYBRID,
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
  const {
    trackAccom,
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
    openMapSelectedFieldman,
  } = props;

  // function Map({ trackAccom, isOpen, onToggleOpen, refresh,clearCLuster,playButton,mapOption,clearTimeout,fieldmanDeatilsOpen}) {
  const map_reducer = useSelector((state) => state.map_reducer);
  const pin_img = useSelector((state) => state.map_reducer.pin_img);
  const jo_type = useSelector((state) => state.map_reducer.jo_type);

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
      bounds.extend(new maps.LatLng(place.lat, place.lng));
    });
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 20),
    y: -height,
  });
  const setGoogleMapRef = (map, maps) => {
    // if(playButton && trackAccom.length >= 2 ){
    //   markerCluster.removeMarker(newMap[trackAccom.length - 2]);
    // }
    // if (trackAccom.length > 0 && !playButton) {
    //   // Get bounds by our places
    //   const bounds = getMapBounds(map, maps, trackAccom);
    //   // Fit map to bounds
    //   map.fitBounds(bounds);
    //   // Bind the resize listener
    //   bindResizeListener(map, maps, bounds);
    // }

    state.new_marker = [];
    mapRef.current = { map, maps };
    let googleRef = maps;
    let lastWIndow = "";
    let lastWIndowPoly = "";
    flightPath = new googleRef.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: "#FFC312",
      strokeOpacity: 1.0,
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
    });

    flightPath.setMap(map);

    if (typeof props.midPoint.lat !== "undefined") {
      infowindowPoly = new googleRef.InfoWindow({
        content:
          "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold'}}><b>" +
          "Distance" +
          " : " +
          props.midPoint.distance +
          " m" +
          "</b></Typography>" +
          "<br/>" +
          "<Typography style={{fontWeight: 'bold'}}><b>" +
          "Time Interval " +
          " : " +
          props.midPoint.time +
          "min." +
          "</b></Typography></div>",
      });

      infowindowPoly.setPosition({
        lat: props.midPoint.lat,
        lng: props.midPoint.lng,
      });
      infowindowPoly.open(map);
    }
    newMap =
      trackAccom &&
      trackAccom.map((location, index) => {
        let image_pic = undefined;
        if (pin_img.length > 0) {
          let findIndexJo_type = jo_type.findIndex(
            (element) => location.accom_jo_type === element
          );
          image_pic = pin_img[findIndexJo_type];
        }

        let image = require("../../../assets/map image/online.png");
        if (image_pic != undefined) {
          image = require("../../../assets/map image/" + image_pic);
        }
        if (playButton && trackAccom.length === index + 1) {
          image = require("../../../assets/map image/online.png");
        }
        let icon = {
          url: image,
          scaledSize: new window.google.maps.Size(30, 38),
        };

        let marker = new googleRef.Marker({
          position: location,
          icon: icon,
        });
        var infoWindow = new googleRef.InfoWindow({});
        if (playButton && trackAccom.length === index + 1) {
          if (lastWIndow !== "") {
            infoWindow.close();
          }
          infoWindow.setContent(
            "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold'}}><b>" +
              location.meter_number +
              " | " +
              location.accom_findings +
              "</b></Typography>" +
              "<br/>" +
              "<Typography style={{fontWeight: 'bold'}}><b>" +
              moment(location.date_accom).format("LLL") +
              "</b></Typography></div>"
          );
          infoWindow.open(map, marker);
          lastWIndow = infoWindow;
        }
        let previous_click = "";
        let loading = true;
        googleRef.event.addListener(marker, "click", function (evt) {
          if (typeof location.meter_number !== "undefined") {
            if (lastWIndow !== "") {
              lastWIndow.close();
            }
            if (playButton) {
              clearTimeout();
            }
            if (previous_click === location.accom_id) {
              loading = false;
            }
            fieldmanDeatilsOpen([location], markerCluster, index, loading);
            previous_click = location.accom_id;
            infoWindow.setContent(
              "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold'}}><b>" +
                location.meter_number +
                " | " +
                location.accom_findings +
                "</b></Typography>" +
                "<br/>" +
                "<Typography style={{fontWeight: 'bold'}}><b>" +
                moment(location.date_accom).format("LLL") +
                "</b></Typography></div>"
            );
            infoWindow.open(map, marker);
            lastWIndow = infoWindow;
          } else {
            if (lastWIndow !== "") {
              lastWIndow.close();
            }
            infoWindow.setContent(
              "<div style={{displa:'flex'}}><Typography style={{fontWeight: 'bold'}}><b>" +
                location.completename +
                "</b></Typography></div>"
            );
            infoWindow.open(map, marker);
            lastWIndow = infoWindow;
            openMapSelectedFieldman(location.user_id);
          }

          // onClickMarker(location, index);
        });
        state.new_marker.push(marker);
        // newMap.push(marker)
        return marker;
      });
    if (clearCLuster === true) {
      // if(markerCluster){
      // console.log(markerCluster)
      markerCluster.clearMarkers();
      // }
    }
    markerCluster = new MarkerClusterer(map, newMap, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      gridSize: 10,
      minimumClusterSize: 2,
      maxZoom: 13,
    });
  };

  React.useEffect(() => {
    let mounted = true;
    const script = document.createElement("script");
    script.src =
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
    script.async = true;
    document.body.appendChild(script);

    return () => (mounted = false);
  }, []);
  React.useEffect(() => {
    if (mapRef.current) {
      const { map, maps } = mapRef.current;
      flightPath.setMap(null);
      if (infowindowPoly) {
        infowindowPoly.close();
      }
      setGoogleMapRef(map, maps);
    }
  }, [refresh]);

  React.useEffect(() => {
    if (mapRef.current) {
      markerCluster.clearMarkers();
      const { map, maps } = mapRef.current;
      flightPath.setMap(null);
      if (infowindowPoly) {
        infowindowPoly.close();
      }
      setGoogleMapRef(map, maps);
    }
  }, [map_reducer.refresh]);

  useImperativeHandle(ref, () => ({
    getAlert(index, lat, lng) {
      const { map, maps } = mapRef.current;
      // var currCenter = map.getCenter();
      maps.event.trigger(state.new_marker[index], "click");
      map.setCenter({ lat: lat, lng: lng });
    },
  }));

  function myClick(id) {
    const { map, maps } = mapRef.current;

    maps.event.trigger(state.new_marker[id], "click");
  }
  return (
    <div style={{ height: "100vh", width: "100%", position: "absolute" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBUcX6oxxkiBfsFbrpImKg90w7kxXG_qnw" }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => setGoogleMapRef(map, maps)}
        center={{ lat: mapOption.lat, lng: mapOption.lng }}
        zoom={mapOption.zoom}
        options={(maps) =>
          getMapOptions(maps, localStorage.getItem("MapOption"))
        }
      ></GoogleMapReact>
    </div>
  );
});
export default React.memo(Map);
