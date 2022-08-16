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
    TextField
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
import TodayIcon from '@material-ui/icons/Today';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SearchIcon from "@material-ui/icons/Search";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import RefreshIcon from '@material-ui/icons/Refresh';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import CreateIcon from '@material-ui/icons/Create';
import Menu from '@material-ui/core/Menu';
const useStyles = makeStyles({
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
    }

});
function SubNavigation() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dateStart = useSelector((state) => state.trackAccomDateFilter.dateStart);
    const dateEnd = useSelector((state) => state.trackAccomDateFilter.dateEnd);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeDate = (e) =>{
        dispatch({
            type:'onChangeTrackAccomDate',
            data:{[e.target.name] : e.target.value,dateEnd:e.target.value}
        })
    }
    console.log('SubNavigation')
    return (
        <div className={classes.parentContainer}>
            <div className={classes.iconParentGroup} >
                <div className={classes.iconParent} onClick={handleClick} >
                    <TodayIcon className={classes.iconStyle} />
                    <Typography variant='p' className={classes.fontStyle}>FILTER DATE</Typography>
                </div>
                <div className={classes.iconParent} >
                    <AccountTreeIcon className={classes.iconStyle} />
                    <Typography variant='p' className={classes.fontStyle}>FILTER BRANCH</Typography>
                </div>
                <div className={classes.iconParent} >
                    <PlaylistAddCheckIcon className={classes.iconStyle} />
                    <Typography variant='p' className={classes.fontStyle}>FILTER FINDINGS</Typography>
                </div>
            </div>

            <div className={classes.endSection}>
                <div className={classes.endIcon}>
                    <CreateIcon style={{ color: '#fff' }} />
                </div>
                <div className={classes.endIcon}>
                    <FormatListNumberedIcon style={{ color: '#fff' }} />
                </div>
                <div className={classes.endIcon}>
                    <LocationSearchingIcon style={{ color: '#fff' }} />
                </div>

                <Card style={{ width: 230, padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <input placeholder="Search" style={{ borderStyle: 'none', outline: 'none' }} />
                    <SearchIcon style={{ cursor: 'pointer' }} />
                    <RefreshIcon style={{ cursor: 'pointer' }} />
                </Card>
            </div>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div style={{ padding: 10, width: 300 }}>
                    <Grid container spacing={1}>
                        <Grid container justify='flex-start' item xs={12} md={12}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TodayIcon style={{color:'rgba(6,86,147)'}}/>
                                <Typography variant='p' style={{ fontWeight: 'bold',color:'rgba(6,86,147)' }}>FILTER DATE</Typography>
                            </div>

                        </Grid>
                    </Grid>
                    <Card variant="outlined">
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <Typography variant='p' style={{fontSize:13}}>Start Date</Typography>
                                    <TextField style={{ width: '100%' }} name ='dateStart' onChange={onChangeDate} type='date' value={moment(dateStart).format('YYYY-MM-DD')}/>
                                </Grid>
                                {/* <Grid item xs={12} md={12}>
                                    <Typography variant='p' style={{fontSize:13}}>End Date</Typography>
                                    <TextField style={{ width: '100%' }} name ='dateEnd' type='date' onChange={onChangeDate} value={moment(dateEnd).format('YYYY-MM-DD')}/>
                                </Grid> */}
                                <Grid container justify="flex-end" item xs={12} md={12}>
                                    <Button style={{ backgroundColor: "rgba(6,86,147)", color: "white", }} color="primary">
                                        FILTER
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>


            </Menu>
        </div>
    );
}
export default SubNavigation;
