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
import { useAccomDetails } from './accomDetails';

export const useDailyAccomplishmentHooks = () => {
    const dispatch = useDispatch()
    const refresh = useSelector((state) => state.map_reducer.refresh);
    const { accomList, onPassdata, accomMasterList, onPassdataSelected,selectedIndexDate,onPassdataSelectedIndex} = useContext(ClientMapContext)
    const {onClose} = useAccomDetails();
    const [state, setState] = useState({
       
    })
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };


    const formatNumber = (num) => {
        if (num != "") {
            let num2 = parseFloat(num);
            return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
            return 0;
        }
    };
    const onClickData = (data,index) => {
        onClose()
        onPassdataSelectedIndex(index)
        dispatch_data("loading_map", true);
        setTimeout(()=>{
            const filterData = accomMasterList.filter((val) => (moment(data.date).format('YYYY-MM-DD') == moment(val.date_accom).format('YYYY-MM-DD')))
            let data_fieldman = []
            let marker = [BgreenMarker,
                BlueMarker,
                DbrownMarker,
                GrayMarker,
                GreenMarker,
                LgreenMarker,
                LpurpleMarker,
                LyellowMarker,
                OrangeMarker,
                PblueMarker,
                PinkMarker,
                PpurpleMarker,
                PurpleMarker,
                RedMarker,
                SblueMarker,
                SkyBlueMarker,
                WhiteMarker,
                YellowMarker,
                YGreenMarker,
            ]
    
            filterData.map((val) => {
                let matchFieldman = data_fieldman.findIndex((val2) => (val2.user_id == val.user_id))
    
                if (matchFieldman == -1) {
                    let newData = {
                        name: val.accom_fieldman_name,
                        user_id: val.user_id,
                        count: 1
    
                    }
                    data_fieldman.push(newData)
                } else {
                    data_fieldman[matchFieldman].count += 1
                }
            })
    
            let marker_count_index = 0;
            data_fieldman.map((val) => {
                if (marker.length === marker_count_index) {
                    marker_count_index = 0
                }
                val.url = marker[marker_count_index]
                if (marker.length > marker_count_index) {
                    marker_count_index++
                }
            })
    
            onPassdataSelected(filterData,[data],data_fieldman,index)
            dispatch({
                type: 'MapReducerState',
                data: { refresh: !refresh }
            })
        },1000)
      
    }
    return {
        state,
        formatNumber,
        onClickData,
        selectedIndexDate
    }
}
