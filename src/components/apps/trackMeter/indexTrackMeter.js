// import MarkerClusterer from '@google/markerclustererplus';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    TableContainer,
    TableHead,
    TableCell,
    Table,
    TableRow,
    TableBody,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    TextField
} from "@material-ui/core";
import { Breadcrumbs, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";
import React from "react";
// import Loading from '../../assets/loading2.gif'
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import WorkIcon from '@material-ui/icons/Work';
import SearchIcon from '@material-ui/icons/Search';
import TrackButtons from "./trackButtons";
import TableTrackList from "./tableTrackList";
import { getData, serverImageMeter, serverProfile } from "../../api/api";
import SearchReference from "./searchReference";
const useStyles = makeStyles({
    root: {
        width: '100%',
        // overflowX: "auto",
    },
    container: {
        maxHeight: 440,

    },
    outlined: {
        borderWidth: 2
    },
    cardFont: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff'
    },
    cardFontCount: {
        fontSize: 29,
        fontWeight: 'bold',
        color: '#fff',
        position: 'absolute'
    },
    cardColor: {
        backgroundColor: '#2ecc71'
    },
    cardColorPending: {
        backgroundColor: '#e67e22'
    },
    cardColorDenied: {
        backgroundColor: '#e74c3c'
    },
    tableHeight: {
        maxHeight: 300
    },
    appBar: {
        backgroundColor: '#fff', color: '#000',
        position: 'fixed',
        width: '100%'
    },
    iconSize: {
        height: 17,
        width: 17,
        cursor: 'pointer'
    }
});

function IndexTrackMeter() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const loading_map = useSelector((state) => state.map_reducer.loading_map);
    React.useEffect(() => {
        dispatch({
            type: 'onChangeTrackAndTrace',
            data: {
                trackList:[]
            }
        })

    }, []);
    return (
        <div >
            <Backdrop
                className={classes.backdrop}
                open={loading_map}
                style={{ zIndex: 999999999 }}
            >
                <div className="loadermap"></div>
            </Backdrop>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <SearchReference />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TrackButtons />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableTrackList />
                </Grid>
            </Grid>
        </div>
    );
}
export default IndexTrackMeter;
