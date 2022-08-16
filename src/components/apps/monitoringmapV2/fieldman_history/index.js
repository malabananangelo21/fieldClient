import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography, Backdrop, Card, Dialog, DialogContent, DialogTitle, Checkbox } from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Map from "../monitoringMap";
import '../css/home.css'
import '../summary_accomplishment/css/summary.css'
import Dashboard from "./dashboard";
import BarScore from "./charts/bar_score"
import FieldmanDetails from './fieldmanDetails'
import FilterListIcon from "@material-ui/icons/FilterList";
import { DataParser } from "@amcharts/amcharts4/core";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AverageLineGraph from './charts/average_line'

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
export default function Index({ state, setState, changeGetRecord, openHome, onTrackAccomplishmentsRoute }) {
    const dispatch = useDispatch()
    const map_reducer = useSelector((state) => state.map_reducer);
    const [mapOption, setmapOption] = React.useState({
        zoom: 12,
        lat: 13.7565,
        lng: 121.0583,
    });
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    // const [openRecord, setOpenRecord] = React.useState(false);
    const [indexState, setIndexState] = React.useState({
        assign: 0,
        jo_accom_list: [],
        count_assign_day: 0,
        complete_name: "",
        pie_graph: [
            {
                value: 0,
                title: "Accomplished",
            },
            {
                value: 0,
                title: "Unaccomplished",
            },
        ],
        delivery_type: [],
        summary: [{
            accomplishment: 0,
            assigned: 0,
            average_assign: 0,
            date: "",
            fieldman: 0,
            name: "",
            re_out: 0,
            re_out_assigned: 0,
            re_out_unassigned: 0,
            remaining: 0,
            total_jo: 0,
            unassigned: 0,
            valid: 0,
            invalid: 0,
            count_to_validate: 0
        }],
        dataFilter: [],
        company_id: "",
        jo_type: [],
        running_average: [],
        display_running_accom: true,
        display_running_assign: true,
        display_ave_assign: true,
        display_ave_accom: true,
        display_valid: true,
        display_invalid: true,
        totalScore: []
    })

    const formatNumber = (num) => {
        if (num != "") {
            let num2 = parseFloat(num);
            return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
            return 0;
        }
    };
    const onChecked = (e, value) => {
        setIndexState(prev => ({ ...prev, [e.target.name]: value }))
    }

    React.useEffect(() => {
        getRecord()
        get_accom_report(state.record_start_date, state.record_end_date, state.Selected_branch, state.Selectedcompany, map_reducer.branch_name, map_reducer.selected_jo)
        getGrade()

    }, [state.refreshHistory])
    const getGrade = () => {
        if (typeof state.record_single_data.fieldman !== "undefined") {
            let data = {
                user_id: state.record_single_data.fieldman[0].user_id,
                branch_id: [state.Selected_branch],
                company_id: state.Selectedcompany,
                date: moment(state.record_end_date).format("YYYY-MM-DD"),
                jo_type: map_reducer.selected_jo[0],
                parameter: 'branch_id',
            }
            var d = new Date(state.record_end_date);
            d.setMonth(d.getMonth() - 1);
            let data2 = {
                user_id: state.record_single_data.fieldman[0].user_id,
                branch_id: [state.Selected_branch],
                company_id: state.Selectedcompany,
                date: moment(d.toLocaleDateString()).format("YYYY-MM-DD"),
                jo_type: map_reducer.selected_jo[0],
                parameter: 'branch_id',
            }

            var d2 = new Date(state.record_end_date);
            d2.setMonth(d2.getMonth() - 2);
            let data3 = {
                user_id: state.record_single_data.fieldman[0].user_id,
                branch_id: [state.Selected_branch],
                company_id: state.Selectedcompany,
                date: moment(d2.toLocaleDateString()).format("YYYY-MM-DD"),
                jo_type: map_reducer.selected_jo[0],
                parameter: 'branch_id',
            }

            var d3 = new Date(state.record_end_date);
            d3.setMonth(d3.getMonth() - 3);
            let data4 = {
                user_id: state.record_single_data.fieldman[0].user_id,
                branch_id: [state.Selected_branch],
                company_id: state.Selectedcompany,
                date: moment(d3.toLocaleDateString()).format("YYYY-MM-DD"),
                jo_type: map_reducer.selected_jo[0],
                parameter: 'branch_id',
            }
            
            Promise.all([getData("tracking/getSingleEvaluationMonth", data),
            getData("tracking/getSingleEvaluationMonth", data2),
            getData("tracking/getSingleEvaluationMonth", data3),
            getData("tracking/getSingleEvaluationMonth", data4)

            ]).then((data) => {
                console.log(data)

                let totalScore = 0;
                let totalScore2 = 0;
                let totalScore3 = 0;
                let totalScore4 = 0;


                let structure =[]

                let grade_array = data[0].data
                let grade_array2 = data[1].data
                let grade_array3 = data[2].data
                let grade_array4 = data[3].data

                for (let index = 0; index < grade_array4.length; index++) {
                    const element = grade_array4[index];
                    let attitude = element.attitude
                    let attitude_total = 0

                    if (element.attitude === null) {
                        element.attitude_data.forEach((val) => {
                            attitude_total += parseFloat(val.evaluation_grade)
                        })
                        attitude = attitude_total / element.attitude_data.length
                    }
                    totalScore4 = parseFloat(element.absentism) + parseFloat(element.accuracy) + parseFloat(element.completeness) + parseFloat(element.tardiness) + parseFloat(attitude)

                }
                structure.push({
                    month: moment(d3.toLocaleDateString()).format("MMM-DD"),
                    totalScore: totalScore4,
                    data: grade_array4
                })

                for (let index = 0; index < grade_array3.length; index++) {
                    const element = grade_array3[index];
                    let attitude = element.attitude
                    let attitude_total = 0

                    if (element.attitude === null) {
                        element.attitude_data.forEach((val) => {
                            attitude_total += parseFloat(val.evaluation_grade)
                        })
                        attitude = attitude_total / element.attitude_data.length
                    }
                    totalScore3 = parseFloat(element.absentism) + parseFloat(element.accuracy) + parseFloat(element.completeness) + parseFloat(element.tardiness) + parseFloat(attitude)

                }
                structure.push({
                    month: moment(d2.toLocaleDateString()).format("MMM-DD"),
                    totalScore: totalScore3,
                    data: grade_array3
                })

                for (let index = 0; index < grade_array2.length; index++) {
                    const element = grade_array2[index];
                    let attitude = element.attitude
                    let attitude_total = 0

                    if (element.attitude === null) {
                        element.attitude_data.forEach((val) => {
                            attitude_total += parseFloat(val.evaluation_grade)
                        })
                        attitude = attitude_total / element.attitude_data.length
                    }
                    totalScore2 = parseFloat(element.absentism) + parseFloat(element.accuracy) + parseFloat(element.completeness) + parseFloat(element.tardiness) + parseFloat(attitude)

                }
                structure.push({
                    month: moment(d.toLocaleDateString()).format("MMM-DD"),
                    totalScore: totalScore2,
                    data: grade_array2
                })

                for (let index = 0; index < grade_array.length; index++) {
                    const element = grade_array[index];
                    let attitude = element.attitude
                    let attitude_total = 0

                    if (element.attitude === null) {
                        element.attitude_data.forEach((val) => {
                            attitude_total += parseFloat(val.evaluation_grade)
                        })
                        attitude = attitude_total / element.attitude_data.length
                    }
                    totalScore = parseFloat(element.absentism) + parseFloat(element.accuracy) + parseFloat(element.completeness) + parseFloat(element.tardiness) + parseFloat(attitude)

                }
                structure.push({
                    month: moment(state.record_end_date).format("MMM-DD"),
                    totalScore: totalScore,
                    data: grade_array
                })

                setIndexState(prev => ({
                    ...prev, totalScore: structure
                }))

            })
        }
    }

    const getRecord = () => {
        let count = 0;
        let jo_assign = 0;
        let jo_accom_list = 0;
        let with_jo = [];
        let with_out_jo = [];
        let latlng = "";
        let present = [];
        let onField = [];
        let absent = [];
        let late = [];
        let user_jobposition = [];
        let hours = [];
        let no_area = [];
        let match_position = [];
        let name = "";

        let jo_aubd = 0;
        let jo_dn = 0;
        let jo_dn_reout = 0;
        let jo_meco = 0;
        let jo_nac = 0;
        let jo_ncr = 0;
        let jo_osb = 0;
        let jo_osn = 0;
        let jo_soa = 0;
        let jo_soa_reout = 0;
        typeof state.record_single_data.fieldman !== 'undefined' && state.record_single_data.fieldman.map((val, index_val) => {
            //   getInvalid(val);
            name = val.completename;
            let new_jo_assign = 0;
            val.batch.map((val_batch, index) => {
                new_jo_assign += parseInt(val_batch.jo_count);
                let match = false;
                if (val_batch.jo_count > 0 && index === 0) {
                    count++;
                    match = true;
                }
                if (match) {
                    with_jo.push(val);
                    latlng = val.location_latlng;
                } else {
                    if (index === 0) {
                        with_out_jo.push(val);
                    }
                }
                jo_assign += parseInt(val_batch.jo_count);
                jo_aubd += parseInt(val_batch.jo_aubd);
                jo_dn += parseInt(val_batch.jo_dn);
                jo_dn_reout += parseInt(val_batch.jo_dn_reout);
                jo_meco += parseInt(val_batch.jo_meco);
                jo_nac += parseInt(val_batch.jo_nac);
                jo_ncr += parseInt(val_batch.jo_ncr);
                jo_osb += parseInt(val_batch.jo_osb);
                jo_osn += parseInt(val_batch.jo_osn);
                jo_soa += parseInt(val_batch.jo_soa);
                jo_soa_reout += parseInt(val_batch.jo_soa_reout);
            });
            state.record_single_data.fieldman[index_val]["count"] = new_jo_assign;
            jo_accom_list += parseInt(val.jo_accom_list.length);
            if (val.attendance.length === 0) {
                absent.push(val);
            } else {
                if (parseInt(val.batch[0].jo_count) > 0) {
                    present.push(val);
                }
                if (
                    String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
                    String(val.user_jobposition).toUpperCase() === "METER READER"
                ) {
                    if (
                        moment(val.attendance[0].date_added).format("HH:mm") >
                        moment("2021-01-01 " + state.day_sched.attn_in).format("HH:mm")
                    ) {
                        if (parseInt(val.batch[0].jo_count) > 0) {
                            late.push(val);
                        }
                    }
                    if (parseInt(val.batch[0].jo_count) === 0) {
                        no_area.push(val);
                    }
                }
            }
            if (val.jo_accom > 0) {
                onField.push(val);
            }
        });
        with_out_jo.map((val) => {
            with_jo.push(val);
        });
        let pie_graph = [
            {
                value: jo_accom_list,
                title: "Accomplished",
            },
            {
                value: jo_assign - jo_accom_list,
                title: "Unaccomplished",
            },
        ];

        let data_type = [
            { type: "AUBD", count: formatNumber(jo_aubd) },
            { type: "DN", count: formatNumber(jo_dn) },
            { type: "MECO", count: formatNumber(jo_meco) },
            { type: "NAC", count: formatNumber(jo_nac) },
            { type: "NCR", count: formatNumber(jo_ncr) },
            { type: "OSB", count: formatNumber(jo_osb) },
            { type: "OSN", count: formatNumber(jo_osn) },
            { type: "SOA", count: formatNumber(jo_soa) },
            { type: "RE-OUT DN", count: formatNumber(jo_dn_reout) },
            { type: "RE-OUT SOA", count: formatNumber(jo_soa_reout) },
        ];

        setIndexState(prev => ({
            ...prev,
            assign: jo_assign,
            jo_accom_list: jo_accom_list,
            count_assign_day: state.record_single_data.count_assign,
            complete_name: name,
            pie_graph: pie_graph,
            delivery_type: data_type,
        }));
    };
    const get_accom_report = (filter_date_start, filter_date_end, bid, c_id, b_name, jo_type_val) => {
        dispatch_data("loading_map", true);
        var oneDay = 24 * 60 * 60 * 1000;
        var date1 = new Date(filter_date_start + ' ' + '00:00');
        var date2 = new Date(filter_date_end + ' ' + '00:00');
        var diffDays = Math.abs((date1.getTime() - date2.getTime()) / oneDay);
        if (typeof state.record_single_data.fieldman !== "undefined") {
            let data = {
                firstDay: moment(filter_date_start).format("YYYY-MM-DD"),
                currentDay: moment(filter_date_end).format("YYYY-MM-DD"),
                branch_id: bid,
                diffDays: diffDays,
                jo_type: jo_type_val,
                user_id: state.record_single_data.fieldman[0].user_id
            };
            getData("tracking/summary_report_accom2", data).then((res) => {
                //   setState({ ...state,count_accom:res.count_accom,dataFilter:data,filter:false,branch_name:b_name,summary: res.new_accom, show_bar: true,filter_date_start:filter_date_start,filter_date_end:filter_date_end,branch_id:bid,company_id:c_id ,jo_type:jo_type_val,type:''});
                let new_summary = res.new_accom
              
                state.attendance_history.forEach((val) => {
                   
                    if (val.type === 'ABSENT') {
                        val.value.forEach((val_date) => {
                            let dateMatch = res.new_accom.filter(val2=>(val2.date == moment(val_date.date_added).format('YYYY-MM-DD')))
                            if(dateMatch.length == 0){
                                new_summary.push({
                                    type: 'ABSENT',
                                    accomplishment: 0,
                                    appeal_requests: false,
                                    appeal_requests_justification: "",
                                    approved_hours: "",
                                    attendance: false,
                                    assigned: 0,
                                    average_assign: 0,
                                    count_to_validate: 0,
                                    count_to_validate_stack: 0,
                                    date: val_date.date_added,
                                    fieldman: 0,
                                    name: moment(val_date.date_added).format('MMM DD'),
                                    re_out: 0,
                                    re_out_assigned: 0,
                                    re_out_unassigned: 0,
                                    remaining: 0,
                                    total_jo: 0,
                                    unassigned: 0,
                                    valid: 0,
                                    invalid: 0,
                                    count_to_validate: 0
    
                                })
                            }
                          
                        })
                    }
                })
                new_summary.sort(function (a, b) {
                    return a['date'].localeCompare(b['date']);
                });
                setIndexState(prev => (
                    {
                        ...prev,
                        summary: res.new_accom,
                        dataFilter: data,
                        company_id: c_id,
                        jo_type: jo_type_val,
                        running_average: res.average_data
                    }))
                dispatch_data("loading_map", false);

            });
        }

    };
    const handleDateChangeStartRecord = (date) => {
        setState(prev => ({
            ...prev,
            record_start_date: date,
        }));
    };
    const handleDateChangeEndRecord = (date) => {
        setState(prev => ({
            ...prev,
            record_end_date: date,
        }));
    };
    const navigate_fieldman_accom = (data) => {

        let details = []
        let match_jo = state.record_single_data.count_assign_data.filter((val) => (moment(val.jo_date_assign).format('YYYY-MM-DD') === moment(data.from).format('YYYY-MM-DD')))
        let new_record_single_data = JSON.stringify(state.record_single_data.fieldman);

        (JSON.parse(new_record_single_data)).forEach((val) => {
            let attendance = val.attendance.filter((val_attn) => (moment(val_attn.date_added).format('YYYY-MM-DD') === moment(data.from).format('YYYY-MM-DD')))

            details = val
            details['batch'] = match_jo
            details['attendance'] = attendance
        })
        onTrackAccomplishmentsRoute(details, data.from, match_jo[0].jo_count, [], 'History')
    }


    return (
        <div style={{ overflowY: "auto", height: "100%" }}>
            <div style={{ marginTop: 60, padding: 20 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <div style={{ display: 'flex', alignItems: "center", }}>
                            <div>
                                <IconButton
                                    aria-label="delete"
                                    size="md"
                                    onClick={() => openHome()}
                                >
                                    <KeyboardBackspaceIcon
                                        className="font-color-white"
                                        fontSize="inherit"
                                        style={{}}
                                    />
                                </IconButton>
                            </div>
                            <div>
                                <Button
                                    onClick={(e) => setState(prev => ({ ...prev, openRecord: true }))}
                                    variant="contained"
                                    size="small"
                                    startIcon={<FilterListIcon />}
                                    style={{
                                        backgroundColor: "rgb(17, 82, 147)",
                                        color: "#fff",
                                        marginRight: 10,
                                    }}
                                >
                                    Filter
                                </Button>
                            </div>
                            <div>
                                <Card className='card-color-data-summary' style={{ padding: 5, marginRight: 5 }}>
                                    <Typography style={{ color: '#fff' }}>{moment(new Date(state.record_start_date)).format('LL') + ' - ' + moment(new Date(state.record_end_date)).format('LL')}</Typography>
                                </Card>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FieldmanDetails state={state} indexState={indexState} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Dashboard newState={state} indexState={indexState} navigate_fieldman_accom={navigate_fieldman_accom} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className='fieldman-details-history' style={{ padding: 10, alignItems: 'center' }}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: "#fff",
                                }}
                            >
                                  GRADE
                            </Typography>
                                <BarScore  width={510}
                                height={160} state={state} indexState={indexState} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card className='fieldman-details-history' style={{ padding: 10, alignItems: 'center' }}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: "#fff",
                                }}
                            >
                                ASSIGN AND ACCOMPLISHMENT AVERAGE
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid xs={12} md={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onChange={(e) => onChecked(e, !indexState.display_running_assign)}
                                            name='display_running_assign'
                                            checked={indexState.display_running_assign}
                                            style={{ color: '#9b59b6' }}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#9b59b6',marginRight:5 }} /> */}
                                        <Typography style={{ fontSize: 13, color: '#fff' }}>Running Assign</Typography>
                                    </div>
                                </Grid>
                                <Grid xs={12} md={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onChange={(e) => onChecked(e, !indexState.display_running_accom)}
                                            name='display_running_accom'
                                            checked={indexState.display_running_accom}
                                            style={{ color: '#1e9651' }}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#1e9651',marginRight:5 }} /> */}
                                        <Typography style={{ fontSize: 13, color: '#fff' }}>Running Accom</Typography>
                                    </div>
                                </Grid>
                                <Grid xs={12} md={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onChange={(e) => onChecked(e, !indexState.display_ave_assign)}
                                            name='display_ave_assign'
                                            checked={indexState.display_ave_assign}
                                            style={{ color: '#3498db' }}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#3498db',marginRight:5 }} /> */}
                                        <Typography style={{ fontSize: 13, color: '#fff' }}>Assign</Typography>
                                    </div>
                                </Grid>
                                <Grid xs={12} md={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onChange={(e) => onChecked(e, !indexState.display_ave_accom)}
                                            name='display_ave_accom'
                                            checked={indexState.display_ave_accom}
                                            style={{ color: '#f1c40f' }}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#1e9651',marginRight:5 }} /> */}
                                        <Typography style={{ fontSize: 13, color: '#fff' }}>Accom</Typography>
                                    </div>
                                </Grid>
                                <Grid xs={12} md={2} justify='flex-start'>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onChange={(e) => onChecked(e, !indexState.display_valid)}
                                            name='display_valid'
                                            checked={indexState.display_valid}
                                            style={{ color: '#009432' }}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#009432',marginRight:5 }} /> */}
                                        <Typography style={{ fontSize: 13, color: '#fff' }}>Valid</Typography>
                                    </div>
                                </Grid>
                                <Grid xs={12} md={2} justify='flex-start'>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onChange={(e) => onChecked(e, !indexState.display_invalid)}
                                            name='display_invalid'
                                            checked={indexState.display_invalid}
                                            style={{ color: '#e74c3c' }}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        {/* <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#e74c3c',marginRight:5 }} /> */}
                                        <Typography style={{ fontSize: 13, color: '#fff' }}>Invalid</Typography>
                                    </div>
                                </Grid>

                                {/* <Grid xs={12} md={3}>
                            <div style={{ display: 'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Checkbox
                                onChange={(e) => onChecked(e, !state.display_valid)}
                                name='display_valid'
                                checked={state.display_valid}
                                style={{ color: '#fff' }}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#f1c40f',marginRight:5 }} />
                              <Typography style={{ fontSize: 13, color: '#fff' }}>Valid</Typography>
                            </div>
                          </Grid>
                          <Grid xs={12} md={3}>
                            <div style={{ display: 'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Checkbox
                                onChange={(e) => onChecked(e, !state.display_invalid)}
                                name='display_invalid'
                                checked={state.display_invalid}
                                style={{ color: '#fff' }}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#f1c40f',marginRight:5 }} />
                              <Typography style={{ fontSize: 13, color: '#fff' }}>Invalid</Typography>
                            </div>
                          </Grid> */}
                            </Grid>
                            <AverageLineGraph
                                line_data={indexState.running_average}
                                width={510}
                                height={160}
                                total_jo={indexState.total_jo}
                                state={indexState}
                                type={"ASSIGN AND ACCOMPLISHMENT AVERAGE"}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={state.openRecord}
                onClose={() => setState(prev => ({ ...prev, openRecord: false }))}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="simple-dialog-title">
                    Generate Accomplishments
                </DialogTitle>
                <div style={{ position: "absolute", right: 1, top: 1 }}>
                    <IconButton aria-label="delete">
                        <CloseIcon
                            onClick={(e) => setState(prev => ({ ...prev, openRecord: false }))}
                            style={{ color: "#000" }}
                        />
                    </IconButton>
                </div>
                <DialogContent>
                    <form onSubmit={changeGetRecord}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                {/* <FormControl
            size="small"
            className={classes.formControl}
            style={{ width: "100%" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Job Order
            </InputLabel>
            <Select
            required
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={onChangeJobOrder}
              label="branch"
              name="branch_id"
              value={map_reducer.selected_jo}
            >
              {state.job_order_type.map((val,index)=>{
                return <MenuItem value={val.category_details}>{val.category_details}</MenuItem>
              })
              }
            </Select>
          </FormControl> */}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                                    <KeyboardDatePicker
                                        id="date-picker-dialog"
                                        label="Filter Date"
                                        format="MM-dd-yyyy"
                                        name="date_start"
                                        value={state.record_start_date}
                                        style={{ width: "100%" }}
                                        onChange={handleDateChangeStartRecord}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                                    <KeyboardDatePicker
                                        id="date-picker-dialog"
                                        label="Filter Date"
                                        format="MM-dd-yyyy"
                                        name="date_start"
                                        value={state.record_end_date}
                                        style={{ width: "100%" }}
                                        onChange={handleDateChangeEndRecord}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                        </Grid>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{
                                    backgroundColor: "rgba(6,86,147)",
                                    color: "white",
                                    margin: 15,
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
