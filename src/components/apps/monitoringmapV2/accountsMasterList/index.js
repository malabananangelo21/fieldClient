import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import BarChartIcon from "@material-ui/icons/BarChart";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Carousel from "react-material-ui-carousel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import '../css/home.css'
import './accounts.css'
import Map from "../monitoringMap";
import ListIcon from '@material-ui/icons/List';
import AccountList from './accountList'
const useStyles = makeStyles({
  cssLabel: {
    color: "#fff !important",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#ffff !important",
    color: "#ffff",
  },
});
let trackAccom = [];
let refreshMap = false;
let playButton = false;
let clearCLuster = false;
let markerCluster = [];
const MapComponents = React.memo(
  ({
    trackAccomParam,
    isOpen,
    onToggleOpen,
    refreshMap,
    mapOption,
    clearTimeout,
    fieldmanDeatilsOpen,
  }) => {
    return (
      <Map
        trackAccom={trackAccomParam}
        isOpen={isOpen}
        onToggleOpen={onToggleOpen}
        refresh={refreshMap}
        clearCLuster={clearCLuster}
        playButton={playButton}
        mapOption={mapOption}
        clearTimeout={clearTimeout}
        fieldmanDeatilsOpen={fieldmanDeatilsOpen}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.refreshMap === nextProps.refreshMap) {
      return true;
    } else {
      return false;
    }
  }
);

export default function Index() {
  const [mapOption, setmapOption] = React.useState({
    zoom: 12,
    lat: 13.7565,
    lng: 121.0583,
  });
  const openAccountListSlider=()=>{
    document.getElementById("account-list-slider").style.cssText =
    "transition: 0.5s;left:0%;";
  }
  React.useEffect(()=>{
    openAccountListSlider()
  },[])
  return (
    <div className="parent">
      <div className="map-parent">
        <MapComponents  
          trackAccomParam={[]}
          isOpen={false}
          onToggleOpen={""}
          refreshMap={refreshMap}
          mapOption={mapOption}
          clearTimeout={() => {
          }}
          fieldmanDeatilsOpen={()=>{
          }}
        />
      </div>
      <div id="account-list-slider" className="account-list-slider"> 
      <AccountList/>
      </div>
     <div className="top-nav">
        <div className='navigation-list-settings'
        >
          <IconButton
          className="nav-icon"
            aria-label="delete"
          >
            <HomeIcon style={{ color: "#fff" }} />
            <span className='nav-icon-span'> HOME</span>
          </IconButton>
          <IconButton
            aria-label="delete"
            className="nav-icon"
          >
            <ListIcon style={{ color: "#fff" }} />
            <span className='nav-icon-span'> ACCOUNTS&nbsp;LIST</span>
          </IconButton>
          </div>
        </div>
    </div>
  );
}
