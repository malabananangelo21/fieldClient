import logo from '../../../logo.svg';
import '../../../App.css';
import React, { useContext } from 'react';
import ClientMapContext from '../../context/clientMapContext/ClientMap';
import GoogleMap from './map'
import '../../css/clientMap/clientMap.css'
import Accomplishment from './Accomplishment';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    Grid,
    IconButton,
    Typography,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    TextField,
    DialogActions,
    List,
    Divider,
    FormControlLabel,
    Checkbox

} from "@material-ui/core";
import moment from 'moment';
import { useDailyAccomplishmentHooks } from './hooks/dailyAccomplishmentHooks'
let width = window.innerWidth;
const DailyAccomplishments = React.memo((props) => {
    const { accomDailyCount,resetFieldFinding} = props
    const { state, formatNumber, onClickData, selectedIndexDate } = useDailyAccomplishmentHooks()
    // const map_reducer = useSelector((state) => state.map_reducer);
    console.log("DailyAccomolishments")
    const dispatch = useDispatch()

    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    return (
        <div>
            {accomDailyCount.length > 0 ?
                accomDailyCount.map((val, index) => {
                    return <Card onClick={() => {
                        resetFieldFinding()
                        onClickData(val, index)
                    }} key={index} variant='outlined' style={{ cursor: 'pointer', display: 'flex', alignItems: 'flex-start', marginBottom: 5, justifyContent: 'flex-start', padding: 10, position: 'relative', backgroundColor: selectedIndexDate === index ? '#115293' : undefined }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img style={{ width: 15, height: 20, marginRight: 5 }} src={val.url} /> <Typography style={{ fontWeight: 'bold', fontSize: 13, color: selectedIndexDate === index ? '#fff' : undefined }}>Date : {moment(val.date).format('MMM DD, YYYY')}</Typography>
                            </div>

                            <Typography style={{ fontWeight: 'bold', fontSize: 15, color: selectedIndexDate === index ? '#fff' : undefined }}>Count : {formatNumber(val.count)}</Typography>
                        </div>
                        <ArrowRightAltIcon style={{ position: 'absolute', top: 20, right: 10, color: '#bdc3c7' }} />
                    </Card>
                }) :
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                    <Typography style={{ color: '#95a5a6', fontWeight: 'bold', fontSize: 18 }}>No Data</Typography>
                </div>
            }
        </div>
    );
})
export default DailyAccomplishments;