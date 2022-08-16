import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography,Backdrop} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Map from "../monitoringMap";
import '../css/home.css'
import '../summary_accomplishment/css/summary.css'
import Pie from './graph/pie'
export default function CurrentAttendance() {
    const map_reducer = useSelector((state) => state.map_reducer);
    const [mapOption, setmapOption] = React.useState({
        zoom: 12,
        lat: 13.7565,
        lng: 121.0583,
    });
    const [indexState, setIndexState] = React.useState({
        dataFilter: [],
        summary: [],
        company_id: "",
        jo_type: ""
    })
    const getdateDetails = (data) => {
        // onClickGraph(data)
    }
    return (
        <div style={{display:'flex',alignItems:'center'}}>
            <Pie/>
        </div>
    );
}
