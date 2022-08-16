import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography, Backdrop, Card, CardContent } from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import '../css/home.css'
import '../summary_accomplishment/css/summary.css'
import UserImage from '../../../../assets/map image/user_image.png'
import PieGrap from './charts/piehistory'
export default function FieldmanDetails({ state, indexState }) {
    const map_reducer = useSelector((state) => state.map_reducer);
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                {typeof state.record_single_data.fieldman !== "undefined" && state.record_single_data.fieldman.map((val, index) => {
                    return <Card className='fieldman-details-history' style={{ padding: 10, alignItems: 'center' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4} md={4}>
                                <div>
                                    <img src={UserImage} style={{ width: 90, height: 90 }} />
                                </div>
                            </Grid>
                            <Grid item xs={8} md={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={4} md={4}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>NAME</Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>:</Typography>
                                    </Grid>
                                    <Grid item xs={7} md={7}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>{val.completename}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={4} md={4}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>BRANCH</Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>:</Typography>
                                    </Grid>
                                    <Grid item xs={7} md={7}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>{map_reducer.branch_name}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={4} md={4}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>POSITION</Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>:</Typography>
                                    </Grid>
                                    <Grid item xs={7} md={7}>
                                        <Typography style={{ color: '#fff', fontSize: 13.4 }}>{val.user_jobposition}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                })
                }
            </Grid>

            {state.attendance_history.map((val, index) => {
                return <>
                 {val.type === 'PRESENT' &&
                    <Grid item xs={12} md={4}>
                        <Card style={{ padding: 10, alignItems: 'center', backgroundColor: '#487eb0' }}>
                            <Typography style={{ color: '#fff', fontSize: 13 }}>PRESENT</Typography>
                            <Typography style={{ color: '#fff', textAlign: 'center' }}>{parseInt(indexState.summary.reduce((count, val1) => {
                                    if ((val1.accomplishment >= (val1.total_jo)*0.95 && val1.attendance) || (val1.appeal_requests)) {
                                        count++
                                    }
                                    return count
                                }, 0)) }</Typography>
                        </Card>
                    </Grid>
            }
                   
                    {val.type === 'ABSENT' &&
                        <Grid item xs={12} md={4} >
                            <Card style={{ padding: 10, alignItems: 'center', backgroundColor: val.color }}>
                                <Typography style={{ color: '#fff', fontSize: 13 }}>{val.type}</Typography>
                                <Typography style={{ color: '#fff', textAlign: 'center' }}>{parseInt(indexState.summary.reduce((count, val1) => {
                                    if ((val1.accomplishment < (val1.total_jo)*0.95 && !val1.appeal_requests) || (val1.attendance == false && !val1.appeal_requests )) {
                                        count++
                                    }
                                    return count
                                }, 0))}</Typography>
                            </Card>
                        </Grid>
                    }

                </>
            })
            }
             <Grid item xs={12} md={4}>
                        <Card style={{ padding: 10, alignItems: 'center', backgroundColor: '#f39c12' }}>
                            <Typography style={{ color: '#fff', fontSize: 13 }}>NO ASSIGN</Typography>
                            <Typography style={{ color: '#fff', textAlign: 'center' }}>{typeof state.record_single_data.count_assign_data !== 'undefined' ? state.record_single_data.count_assign_data.reduce((count, val) => {
                                if (parseInt(val.jo_count) === 0) {
                                    count++
                                }
                                return count
                            }, 0) : 0}</Typography>
                        </Card>
                    </Grid>
            <Grid item xs={12} md={12}>
                <Card className='fieldman-details-history' style={{ padding: 10, alignItems: 'center' }}>
                    <Typography style={{ color: '#fff' }}>ACCOMPLISHMENTS</Typography>
                    <PieGrap pieGraph={indexState.pie_graph} />
                </Card>
            </Grid>
        </Grid>
    );
}
