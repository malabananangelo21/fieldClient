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
} from "@material-ui/core";
import { Breadcrumbs, Backdrop } from '@material-ui/core';
import Link from "@material-ui/core/Link";
import React from "react";
import {
    HashRouter as Router,
    BrowserRouter,
    Route,
    useParams,
    Redirect,
    Link as NewLink,
    useHistory
} from "react-router-dom";
// import Loading from '../../assets/loading2.gif'
import { useSelector, useDispatch } from "react-redux";
import Map from './monitoringMap'
import MapImage1 from './map3.PNG'
import MapImage2 from './map2.jpg'
import Create from './create_form'
import { getData, cancelRequest } from "../../../api/api";
let width = window.innerWidth;
function renderPropsAreEqual(prevProps, nextProps) {
    if (prevProps === nextProps) {
        return true;
    } else {
        return false;
    }
}


function IndexReport() {
    const map_reducer = useSelector((state) => state.map_reducer);
    let dispatch = useDispatch()
    const [mapOption, setmapOption] = React.useState({
        zoom: 12,
        lat: 13.7565,
        lng: 121.0583,
    });

    const [state, setState] = React.useState({
        refreshMap: false,
        location: []
    })
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    React.useEffect(() => {
        getBranches()
    }, [])


    const getBranches = () => {

        getData("HumanResource/getHandleBranch", {
            user_id: localStorage.getItem("u"),
        }).then((response) => {
            let company = [];
            let branch_id = ""
            let branch_name = ""
            let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph")
            if (onSelectData !== null) {
                onSelectData = JSON.parse(onSelectData)
                branch_id = onSelectData.selection[0]
            }
            response.response.map((item) => {
                let match = false;
                company.map((val) => {
                    if (val.company_name == item.company_name) {
                        match = true;
                    }
                });
                if (!match) {
                    company.push({
                        company_name: item.company_name,
                        company_id: item.company_id,
                    });
                }
                if (branch_id === item.branch_id) {
                    branch_name = item.branch_name
                }
            });



            dispatch_data("gethandleBranch", response.response);
            dispatch_data("company_name", company);
            // dispatch_data("SelectedBranches", []);
            //   navigator.geolocation.getCurrentPosition(function(position) {
            //     console.log("Latitude is :", position.coords.latitude);
            //     console.log("Longitude is :", position.coords.longitude);
            //   });
        });
    };
    return (
        <div>
            <Backdrop
                open={map_reducer.loading_map}
                style={{ zIndex: 999999999999999 }}
            >
                <div className="loadermap"></div>
            </Backdrop>
            <Map mapOption={mapOption} refreshMap={state.refreshMap} location={state.location} />
            <div style={{ marginTop: 60, width: width < 600 ? '100%' : '30%', position: 'absolute', left: 0, height: '90%', overflowY: 'auto' }}>
                <Create coordinates={(val) => {
                    setState(prev => ({
                        ...prev,
                        refreshMap: !state.refreshMap,
                        location: [val]
                    }))
                    setmapOption(prev => ({
                        ...prev,
                        lat: val.lat,
                        lng: val.lng,
                        zoom: 14
                    }))
                }}
                    viewcoordinates={(val) => {
                        setState(prev => ({
                            ...prev,
                            refreshMap: !state.refreshMap,
                            location: val
                        }))

                    }}
                    refreshData={() => {
                        setState(prev => ({
                            ...prev,
                            refreshMap: !state.refreshMap,
                        }))
                    }}
                />
            </div>

        </div>
    );
}
export default React.memo(IndexReport, renderPropsAreEqual);
