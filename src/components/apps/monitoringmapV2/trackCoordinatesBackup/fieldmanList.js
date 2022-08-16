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
// import CancelledMarker from "../../../../assets/map image/canceled-activity-marker.png";
// import OnTripMarker from "../../../../assets/map image/default.png";
// import DefaultMarker from "../../../../assets/map image/electron-blue.png";
// import MarkerFrom from "../../../../assets/map image/from.png";
// import IdleMarker from "../../../../assets/map image/gray.png";
// import OnTransitActivityMarker from "../../../../assets/map image/ontransit-activity-marker.png";
// import QueueRequestMarker from "../../../../assets/map image/pending-activity-marker.png";
// import MarkerTo from "../../../../assets/map image/to.png";
import { getData, serverImageMeter } from "../../../api/api";
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

function renderPropsAreEqual(prevProps, nextProps) {
    if (prevProps === nextProps) {
        return true;
    } else {
        return false;
    }
}
const useStyles = makeStyles({
  
});

function FieldmanList() {
    
    return (
        <div>
    
        </div>
    );
}
export default React.memo(FieldmanList, renderPropsAreEqual);
