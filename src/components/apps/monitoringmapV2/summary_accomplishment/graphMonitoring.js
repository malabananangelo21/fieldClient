import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography, Card, Checkbox } from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import '../css/home.css'
import './css/summary.css'
import BarLineGraph from "./graph/bar_line";

export default function Index({ state, getdateDetails }) {
    const [mapOption, setmapOption] = React.useState({
        zoom: 12,
        lat: 13.7565,
        lng: 121.0583,
    });
    const [checkState, setCheckState] = React.useState({
        assigned: true,
        re_out_assigned: true,
        unassigned: true,
        re_out_unassigned: true,
        remaining: true,
        accomplishment: true,
        all:true
    });
    const onChecked = (e, value) => {
        setCheckState(prev => ({ ...prev, [e.target.name]: value }))
    }
    return (
        <Grid container spacing={1} style={{ marginTop: 5 }}>
            <Grid item xs={12} md={3}>
                <Card className='card-color-data-summary' style={{ height: 340, padding: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>LEGEND</Typography>
                        <Checkbox
                            onChange={() => {
                                if( checkState.assigned === true && 
                                    checkState.re_out_assigned === true &&
                                    checkState.unassigned === true  &&
                                    checkState.re_out_unassigned === true &&
                                    checkState.remaining === true &&
                                    checkState.accomplishment === true){
                                        setCheckState(prev => ({
                                            ...prev, assigned: false,
                                            re_out_assigned: false,
                                            unassigned: false,
                                            re_out_unassigned: false,
                                            remaining: false,
                                            accomplishment: false,
                                            all:false
                                        }))
                                }else{
                                    setCheckState(prev => ({
                                        ...prev, assigned: true,
                                        re_out_assigned: true,
                                        unassigned: true,
                                        re_out_unassigned: true,
                                        remaining: true,
                                        accomplishment: true,
                                        all:true
                                    }))
                                }
                               
                            }}
                            name='all'
                            checked={checkState.assigned === true && 
                                checkState.re_out_assigned === true &&
                                checkState.unassigned === true  &&
                                checkState.re_out_unassigned === true &&
                                checkState.remaining === true &&
                                checkState.accomplishment === true?true:false}
                            style={{ color: '#fff' }}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ height: 16, width: 16, backgroundColor: '#2bad62', marginRight: 20 }} />
                            <Typography style={{ color: '#fff', fontSize: 14 }}>ACCOMPLISHED</Typography>
                        </div>
                        <Checkbox
                            onChange={(e) => onChecked(e, !checkState.accomplishment)}
                            name='accomplishment'
                            checked={checkState.accomplishment}
                            style={{ color: '#fff' }}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ height: 16, width: 16, backgroundColor: '#f39c12', marginRight: 20 }} />
                            <Typography style={{ color: '#fff', fontSize: 14 }}>UNASSIGNED</Typography>
                        </div>
                        <Checkbox
                            onChange={(e) => onChecked(e, !checkState.unassigned)}
                            name='unassigned'
                            checked={checkState.unassigned}
                            style={{ color: '#fff' }}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ height: 16, width: 16, backgroundColor: '#e74c3c', marginRight: 20 }} />
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ height: 16, width: 16, backgroundColor: '#009DCF', marginRight: 20 }} />
                            <Typography style={{ color: '#fff', fontSize: 14 }}>ASSIGNED RE-OUT</Typography>
                        </div>
                        <Checkbox
                            onChange={(e) => onChecked(e, !checkState.re_out_assigned)}
                            name='re_out_assigned'
                            checked={checkState.re_out_assigned}
                            style={{ color: '#fff' }}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ height: 16, width: 16, backgroundColor: '#FF6103', marginRight: 20 }} />
                            <Typography style={{ color: '#fff', fontSize: 14 }}>UNASSIGNED RE-OUT</Typography>
                        </div>
                        <Checkbox
                            onChange={(e) => onChecked(e, !checkState.re_out_unassigned)}
                            name='re_out_unassigned'
                            checked={checkState.re_out_unassigned}
                            style={{ color: '#fff' }}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>

                </Card>
            </Grid>
            <Grid item xs={12} md={9}>
                <div className='card-color-data-summary' style={{ height: 360 }}>
                    {/* <div style={{zIndex:999}}> */}
                    <BarLineGraph checkState={checkState} summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
                    {/* </div> */}

                </div>
            </Grid>
        </Grid>
    );
}
