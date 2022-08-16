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

function SearchReference() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const referenceNumber = useSelector((state) => state.trackAndTraceReducer.referenceNumber);
    const selectedJobOrder = useSelector((state) => state.trackAndTraceReducer.selectedJobOrder);
    const selectedBranch = useSelector((state) => state.trackAndTraceReducer.selectedBranch);
    const onChangeText = (e) => {
        let value = e.target.value
        let name = e.target.name
        dispatch({
            type: 'onChangeTrackAndTrace',
            data: {
                [name]: value
            }
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        let data={
            referenceNumber:referenceNumber,
            branch_id:selectedBranch?.branch_id,
            jo_type:[selectedJobOrder]
        }
        dispatch({
            type: 'loading_map',
            data: true
        })
        getData('aam/trackAndTrace',data).then((res)=>{
            getFields()
            dispatch({
                type: 'onChangeTrackAndTrace',
                data: {
                    trackList: res.res
                }
            })
            dispatch({
                type: 'loading_map',
                data: false
            })
        })
       
    }
    
    const getFields = () => {
        let branch_field_work =  JSON.parse(selectedBranch.branch_field_work)
        let joIndex = branch_field_work.findIndex((val) => (val == selectedJobOrder))

        let branch_field_details = []
        let initial = [
            {
                name: 'Reference No.',
                key: 'meter_number'
            },
            {
                name: 'Field Findings',
                key: 'accom_findings'
            },
            {
                name: 'Remarks',
                key: 'accom_remarks'
            },
            {
                name: 'Reading',
                key: 'present_reading'
            },
            {
                name: 'Battery',
                key: 'accom_battery_life'
            },
            {
                name: 'Date',
                key: 'date_accom'
            },
            {
                name: 'Coordinates',
                key: 'fetched_coordinates'
            },
        ]
        branch_field_details = initial
        branch_field_details = JSON.parse(selectedBranch.branch_field_details)[joIndex]
        console.log(branch_field_details)
        dispatch({
            type:'onChangeTrackAndTrace',
            data:{
                initialFields:branch_field_details
            }
        })
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
                    <Typography style={{ color: '#3973b6', fontWeight: 'bold', fontSize: 17 }}>Home</Typography>
                    <Typography style={{ color: '#444b5a', fontWeight: 'bold', fontSize: 17 }}>Track and Trace</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12} md={12}>
                <form onSubmit={onSubmit}>
                    <input required name='referenceNumber' onChange={onChangeText} style={{ height: 30, width: 300, marginTop: 5, outline: 'none', borderStyle: 'solid', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#7f8c8d' }} placeholder='Enter valid reference number' />
                    <button type='submit' style={{ height: 34, border: 'none', background: '#115293', color: '#fff', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, cursor: 'pointer', marginRight: 10, fontWeight: 'bold' }}>TRACK</button>
                </form>

            </Grid>
        </Grid>
    );
}
export default SearchReference;
