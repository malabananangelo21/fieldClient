import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography, Backdrop, Card, Checkbox } from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Map from "../monitoringMap";
import '../css/home.css'
import '../summary_accomplishment/css/summary.css'
import BarGraph from './charts/bar_line_history'
export default function Dashboard({ newState,indexState,navigate_fieldman_accom }) {
    const map_reducer = useSelector((state) => state.map_reducer);
    const [mapOption, setmapOption] = React.useState({
        zoom: 12,
        lat: 13.7565,
        lng: 121.0583,
    });

  
    const formatNumber = (num) => {
        if (num != "") {
            let num2 = parseFloat(num);
            return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
            return 0;
        }
    };
    const [checkState, setCheckState] = React.useState({
        assigned: true,
        re_out_assigned: true,
        unassigned: true,
        re_out_unassigned: true,
        remaining: true,
        accomplishment: true,
        all: true
    });
    const onChecked = (e, value) => {
        setCheckState(prev => ({ ...prev, [e.target.name]: value }))
    }
    const getdateDetails=(data)=>{
        navigate_fieldman_accom(data)
    }
    return (<Grid container spacing={1}>
        <Grid item xs={12} md={12}>
            <div className='fieldman-details-history' style={{ padding: 10, alignItems: 'center' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={2}>
                        <Card variant='outlined' style={{ padding: 10, backgroundColor: '#9b59b6', opacity: 0.9 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white'>TOTAL DAYS</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white' style={{ fontSize: 25, textAlign: 'center' }}>{formatNumber(newState.attendance_history.reduce((count,val)=>{
                                        if(val.type === 'PRESENT'){
                                           count =  val.value.length
                                        }
                                        return count
                                    },0))}</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#9b59b6', fontWeight: 'bold' }}>0</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#9b59b6', fontWeight: 'bold' }}>0</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card variant='outlined' style={{ padding: 10, backgroundColor: '#21467c', opacity: 0.9 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white'>ASSIGNED</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white' style={{ fontSize: 25, textAlign: 'center' }}>{formatNumber(indexState.assign)}</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#21467c', fontWeight: 'bold' }}>0</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Ave. {parseInt(indexState.assign/(newState.attendance_history.reduce((count,val)=>{
                                        if(val.type === 'PRESENT'){
                                           count =  val.value.length
                                        }
                                        return count
                                    },0)))}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card variant='outlined' style={{ padding: 10, backgroundColor: '#4ca05d', opacity: 0.9 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white'>Accomplished</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white' style={{ fontSize: 25, textAlign: 'center' }}>{formatNumber(indexState.jo_accom_list)}</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}> {isNaN(indexState.jo_accom_list / indexState.assign)
                                        ? 0
                                        : parseFloat(
                                            (indexState.jo_accom_list / indexState.assign) * 100
                                        ).toFixed(2)}
                                        %</Typography>
                                        <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Ave. {parseInt(indexState.jo_accom_list/(newState.attendance_history.reduce((count,val)=>{
                                        if(val.type === 'PRESENT'){
                                           count =  val.value.length
                                        }
                                        return count
                                    },0)))}</Typography>
                                   
                                    
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card variant='outlined' style={{ padding: 10, backgroundColor: '#c54a3b', opacity: 0.9 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white'>DELAY</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white' style={{ fontSize: 25, textAlign: 'center' }}> {formatNumber((indexState.assign - indexState.jo_accom_list) < 0?0:indexState.assign - indexState.jo_accom_list)}</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}> {isNaN((indexState.assign - indexState.jo_accom_list) / indexState.assign)
                                        ? 0
                                        : (indexState.assign - indexState.jo_accom_list) < 0?0:parseFloat(
                                            ((indexState.assign - indexState.jo_accom_list) / indexState.assign) *
                                            100
                                        ).toFixed(2) }
                                        %</Typography>
                                        <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Ave. {parseInt(((indexState.assign - indexState.jo_accom_list) < 0?0:indexState.assign - indexState.jo_accom_list)/(newState.attendance_history.reduce((count,val)=>{
                                        if(val.type === 'PRESENT'){
                                           count =  val.value.length
                                        }
                                        return count
                                    },0)))}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card variant='outlined' style={{ padding: 10, backgroundColor: '#a8abae', opacity: 0.9 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white'>VALID</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white' style={{ fontSize: 25, textAlign: 'center' }}> {formatNumber(indexState.summary.reduce((count,val)=>{
                                        return count+= val.valid
                                    },0))}</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>{
                                       isNaN((indexState.summary.reduce((count,val)=>{
                                        return count+= val.valid
                                    },0) / indexState.summary.reduce((count,val)=>{
                                        return count+= val.count_to_validate
                                    },0)))?0:parseFloat((indexState.summary.reduce((count,val)=>{
                                            return count+= val.valid
                                        },0) / indexState.summary.reduce((count,val)=>{
                                            return count+= val.count_to_validate
                                        },0)) * 100).toFixed(2)
                                    }%</Typography>
                                     <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Ave. {parseInt((indexState.summary.reduce((count,val)=>{
                                        return count+= val.valid
                                    },0))/(newState.attendance_history.reduce((count,val)=>{
                                        if(val.type === 'PRESENT'){
                                           count =  val.value.length
                                        }
                                        return count
                                    },0)))}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Card variant='outlined' style={{ padding: 10, backgroundColor: '#485460', opacity: 0.9 }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white'>INVALID</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography className='text-color-white' style={{ fontSize: 25, textAlign: 'center' }}>{formatNumber(indexState.summary.reduce((count,val)=>{
                                        return count+= val.invalid
                                    },0))}</Typography>
                                    <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>{
                                       isNaN((indexState.summary.reduce((count,val)=>{
                                        return count+= val.invalid
                                    },0) / indexState.summary.reduce((count,val)=>{
                                        return count+= val.count_to_validate
                                    },0)))?0:parseFloat((indexState.summary.reduce((count,val)=>{
                                            return count+= val.invalid
                                        },0) / indexState.summary.reduce((count,val)=>{
                                            return count+= val.count_to_validate
                                        },0)) * 100).toFixed(2)
                                    }%</Typography>
                                     <Typography style={{ fontSize: 17, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Ave. {parseInt(formatNumber(indexState.summary.reduce((count,val)=>{
                                        return count+= val.invalid
                                    },0))/(newState.attendance_history.reduce((count,val)=>{
                                        if(val.type === 'PRESENT'){
                                           count =  val.value.length
                                        }
                                        return count
                                    },0)))}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    {/* <Grid item xs={3} md={2}>
                        <Card>
                            <Typography>heheheh</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Card>
                            <Typography>heheheh</Typography>
                        </Card>
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={1} >
                            <Grid item xs={12} md={12}>
                                <div><Typography style={{ color: '#fff', fontSize: 14 }}>LEGEND</Typography></div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ height: 16, width: 16, backgroundColor: '#004987', marginRight: 20 }} />
                                        <Typography style={{ color: '#fff', fontSize: 14 }}>ASSIGNED</Typography>
                                    </div>
                                    <Checkbox
                                        onChange={(e) => onChecked(e, !checkState.assigned)}
                                        name='assigned'
                                        checked={checkState.assigned}
                                        style={{ color: '#fff' }}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ height: 16, width: 16, backgroundColor: '#2bad62', marginRight: 20 }} />
                                        <Typography style={{ color: '#fff', fontSize: 14 }}>ACCOMPLISHED</Typography>
                                    </div>
                                    <Checkbox
                                        onChange={(e) => onChecked(e,!checkState.accomplishment)}
                                        name='assigned'
                                        checked={checkState.accomplishment}
                                        style={{ color: '#fff' }}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ height: 16, width: 16, backgroundColor: '#c54a3b', marginRight: 20 }} />
                                        <Typography style={{ color: '#fff', fontSize: 14 }}>DELAY</Typography>
                                    </div>
                                    <Checkbox
                                        onChange={(e) => onChecked(e, !checkState.remaining)}
                                        name='remaining'
                                        checked={checkState.remaining}
                                        style={{ color: '#fff' }}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                               
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div style={{ height: 242 }}>
                            <BarGraph checkState={checkState} summary={indexState.summary} dataFilter={indexState.dataFilter} company_id={indexState.company_id} jo_type={indexState.jo_type} getdateDetails={getdateDetails} />
                        </div>
                    </Grid>
                   
                </Grid>
                
            </div>
        </Grid>
    </Grid>
    );
}
