import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography,Backdrop} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Map from "../monitoringMap";

// import Dashboard from './dashboard';
// import GraphMonitoring from './graphMonitoring'
export default function Index() {
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
        <div>
            {/* <Backdrop
                open={map_reducer.loading_map}
                style={{ zIndex: 999999999 }}
            >
                <div className="loadermap"></div>
            </Backdrop> */}
            <div style={{background:'#dadfe3',position:'absolute',width:'100%',height:'100%'}}>
                <Typography>Test</Typography>

            </div>
            
           
        </div>
    );
}
