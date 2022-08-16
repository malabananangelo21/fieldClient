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
import AccountTreeIcon from '@material-ui/icons/AccountTree';


function BranchDetails() {
    console.log('BranchDetails')
    const branch_name = useSelector((state) => state.trackAccomDateFilter.branch_name);
    const joType = useSelector((state) => state.trackAccomDateFilter.joType);
    const dateStart = useSelector((state) => state.trackAccomDateFilter.dateStart);



    return (
        <Card style={{ backgroundColor: '#3498db', position: "absolute", top: 100, left: 10, padding: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <AccountTreeIcon style={{ color: '#115293' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: 17, color: '#fff' }}>{String(branch_name).toUpperCase()}</Typography>
                    <Typography variant='p' style={{ color: '#fff' }}>{String(joType).toUpperCase()}</Typography>
                    <Typography variant='p' style={{ color: '#fff' }}>{moment(dateStart).format('MMM DD, YYYY')}</Typography>
                    <div style={{ height: 1, width: '100%', color: '#fff' }} />
                </div>
            </div>
            <div style={{ backgroundColor: '#fff', width: '100%', height: 1, marginTop: 2, marginBottom: 4 }} />
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <div style={{ backgroundColor: '#3083ba',padding:10 }}>
                    <Typography style={{fontSize:14,color:'#fff',fontWeight:'bold'}}>500</Typography>

                        <Typography style={{fontSize:12,color:'#fff'}}>Total</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div style={{ backgroundColor: '#3083ba',padding:10  }}>
                    <Typography style={{fontSize:14,color:'#fff',fontWeight:'bold'}}>500</Typography>
                        <Typography style={{fontSize:12,color:'#fff'}}>Assign</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} >
                    <div style={{ backgroundColor: '#3083ba',padding:10  }}>
                    <Typography style={{fontSize:14,color:'#fff',fontWeight:'bold'}}>500</Typography>
                        <Typography style={{fontSize:12,color:'#fff'}}>Accomplished</Typography>

                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}
export default BranchDetails;
