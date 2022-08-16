import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getData, serverImageMeter } from "../../../api/api";
import moment from 'moment'
import { ClientMapContext } from '../../../context/clientMapContext/ClientMap'
import BgreenMarker from '../../../.././assets/map image/bgreen-marker.png'
import BlackMarker from '../../../.././assets/map image/black-marker.png'
import BlueMarker from '../../../.././assets/map image/blue-marker.png'
import BrownMarker from '../../../.././assets/map image/brown-marker.png'
import DbrownMarker from '../../../.././assets/map image/dbrown-marker.png'
import GrayMarker from '../../../.././assets/map image/gray-marker.png'
import GreenMarker from '../../../.././assets/map image/green-marker.png'
import LgreenMarker from '../../../.././assets/map image/lgreen-marker.png'
import LpurpleMarker from '../../../.././assets/map image/lpurple-marker.png'
import LyellowMarker from '../../../.././assets/map image/lyellow-marker.png'
import OrangeMarker from '../../../.././assets/map image/orange-marker.png'
import PblueMarker from '../../../.././assets/map image/pblue-marker.png'
import PinkMarker from '../../../.././assets/map image/pink-marker.png'
import PpurpleMarker from '../../../.././assets/map image/ppurple-marker.png'
import PurpleMarker from '../../../.././assets/map image/purple-marker.png'
import RedMarker from '../../../.././assets/map image/red-marker.png'
import SblueMarker from '../../../.././assets/map image/sblue-marker.png'
import SkyBlueMarker from '../../../.././assets/map image/skyBlue-marker.png'
import WhiteMarker from '../../../.././assets/map image/white-marker.png'
import YellowMarker from '../../../.././assets/map image/yellow-marker.png'
import YGreenMarker from '../../../.././assets/map image/ygreen-marker.png'
import { useMap } from './mapHooks'
export const useAccomDetails = () => {
    const dispatch = useDispatch()
    const accom_branch_field_details = useSelector((state) => state.map_reducer.accom_branch_field_details);
    const selected_data = useSelector((state) => state.map_reducer.selected_data);
    const job_type_per_branch = useSelector((state) => state.map_reducer.job_type_per_branch);
    const refreshAccomDetails = useSelector((state) => state.map_reducer.refreshAccomDetails);

    const { accomList, onMoveCoordinates, myClick } = useContext(ClientMapContext)
    const [state, setState] = React.useState({
        selected_details: [],
        openFile:false,
        imageDisplay:[]
    })
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    const { NewMarker } = useMap();
    const ArrangeDetailsDisplay = () => {
        let details = selected_data
        let findIndexJo_type = []
        let branch_field_details = []

        if (job_type_per_branch.length > 0) {
            findIndexJo_type = job_type_per_branch.findIndex((element) => (element === details[0].accom_jo_type))
            if (accom_branch_field_details.length > 0 ) {
                branch_field_details = accom_branch_field_details[findIndexJo_type]
                console.log(branch_field_details)
            } else {
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
                        key: 'date_accomplished'
                    },
                    {
                        name: 'Coordinates',
                        key: 'fetched_coordinates'
                    },
                ]
                branch_field_details = initial
            }
        }

        let new_branch_field_details = []
        branch_field_details.forEach((b_details) => {
            let data = b_details;
            details.forEach((val) => {
                data['value'] = val[b_details.key]
            })
            new_branch_field_details.push(data)
        })

        setState(prev => ({ ...prev, selected_details: new_branch_field_details }))
    }

    const onPrevious = (index) => {
        if (index >= 0) {
            dispatch_data("loading_map", true);
            // myClick(index)
            let details = NewMarker[index];
            let data = {
                accom_id: details.accom_id,
                jo_id: details.id
            }
            getData('Tracking/GetAccomDetails', data).then((res) => {
                var latlong = "";
                var splitlatlng = "";
                var lat = "";
                var lng = "";
                var complete_name = "";
                latlong = String(details.fetched_coordinates);
                splitlatlng = latlong.split(",");
                lat = splitlatlng[0];
                lng = splitlatlng[1];
                dispatch({
                    type: 'MapReducerState',
                    data: {
                        selected_data: res.accomplishment,
                        refreshAccomDetails: !refreshAccomDetails,
                        selectedAccomIndex: index,
                    }
                })
                onMoveCoordinates(lat, lng)
                dispatch_data("loading_map", false);
            })
        }
    };
    const onNext = (index) => {
        if (index < NewMarker.length) {
            dispatch_data("loading_map", true);
            // myClick(index)
            let details = NewMarker[index];
            let data = {
                accom_id: details.accom_id,
                jo_id: details.id
            }
            getData('Tracking/GetAccomDetails', data).then((res) => {
                var latlong = "";
                var splitlatlng = "";
                var lat = "";
                var lng = "";
                var complete_name = "";
                latlong = String(details.fetched_coordinates);
                splitlatlng = latlong.split(",");
                lat = splitlatlng[0];
                lng = splitlatlng[1];
                dispatch({
                    type: 'MapReducerState',
                    data: {
                        selected_data: res.accomplishment,
                        refreshAccomDetails: !refreshAccomDetails,
                        selectedAccomIndex: index
                    }
                })
                onMoveCoordinates(lat, lng)
                dispatch_data("loading_map", false);
            })
        }
    };
    const onClose =()=>{
        dispatch({
            type: 'MapReducerState',
            data: {
                selected_data:[],
                selectedAccomIndex: ''
            }
        })
    }
    const openLightbox = () =>{
        setState(prev => ({
            ...prev,
            openFile: true
        }))
    }
    const closeLightbox = () =>{
        setState(prev => ({
            ...prev,
            openFile: false
        }))
    }
    const onSelectImage = (serverImageMeter,images) =>{
        let new_images = []
        images.map((val)=>{
            new_images.push(serverImageMeter+val.path)
        })
        setState(prev => ({
            ...prev,
            imageDisplay: new_images,
            openFile:true
        }))
    }

    let initial = React.useRef(true)
    React.useEffect(()=>{
        onClose()
    },[])
    React.useEffect(() => {
        if (!initial.current) {
            ArrangeDetailsDisplay()
        }
        initial.current = false
    }, [refreshAccomDetails])
    return {
        state,
        onNext,
        onPrevious,
        NewMarker,
        onClose,
        openLightbox,
        closeLightbox,
        onSelectImage
        
    }
}
