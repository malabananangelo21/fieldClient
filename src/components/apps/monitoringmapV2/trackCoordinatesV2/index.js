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
import Map from './map'
import SubNavigation from "./subNavigation";
import FieldmanDetails from "./fieldmanDetails";
import BranchDetails from "./branchDetails";
import { getData, serverImageMeter, serverProfile } from "../../../api/api";
function Indextrack() {
    let dispatch = useDispatch()
    React.useEffect(() => {
        getInitial()
    }, [])

    const getInitial = () => {
        getData("HumanResource/getHandleBranch", {
            user_id: localStorage.getItem("u"),
        }).then((response) => {
            let initialFilter = sessionStorage.getItem('onSelectSingleDateGraph')
            let company = [];
            let branch_id = ""
            let branch_name = ""
            let branch_field_details = []
            let jo_type = ""
            let filterData = []

            if (initialFilter != null && initialFilter != undefined) {
                filterData = JSON.parse(initialFilter)
                branch_id = filterData.selection[0]
                dispatch({
                    type: 'onChangeTrackAccomDate',
                    data: {
                        companyId: filterData.company_id,
                        joType: filterData.jo_type,
                        parameter: filterData.parameter,
                        selection: filterData.selection,
                        dateStart: filterData.from,
                        dateEnd: filterData.from,
                    }
                })
            }
            response.response.forEach((item) => {
                let match = company.findIndex((val)=>(val.company_name == item.company_name))
                if(match > -1){
                    company.push({
                        company_name: item.company_name,
                        company_id: item.company_id,
                    });
                }
                if (branch_id == item.branch_id) {
                    branch_name = item.branch_name
                    if (item.branch_field_work !== "") {
                        jo_type = JSON.parse(item.branch_field_work)
                        if (item.branch_field_details != null) {
                            branch_field_details = JSON.parse(item.branch_field_details)
                        }
                    }
                }
            })
            dispatch({
                type: 'onChangeTrackAccomDate',
                data: {
                    branch_name: branch_name,
                    branch_field_details:branch_field_details,
                    jo_type: jo_type,
                }
            })

            if (initialFilter != null) {
                fetchAllAccomplishments(filterData)
            }
        })
    }

    const fetchAllAccomplishments = (data) => {
        getData("tracking/fetchAllAccomplishment", data).then((res) => {

        })
    }


    return (
        <div>
            <Map />
            <SubNavigation />
            <BranchDetails />
            <FieldmanDetails />
        </div>
    );
}
export default Indextrack;
