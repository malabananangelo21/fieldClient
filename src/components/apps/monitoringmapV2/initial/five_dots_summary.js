import React from "react";
import clsx from "clsx";
// import "../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import UserImage from "../../../assets/map image/user_image.png";
import moment from "moment";
import {
    Grid,
    Card,
    LinearProgress,
    IconButton,
    Button,
    Typography,
} from "@material-ui/core";
// import PieGrap from "./charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../../api/api";
import GroupIcon from "@material-ui/icons/Group";
import ReactExport from "react-data-export";
import CloseIcon from "@material-ui/icons/Close";
import {
    Table,
    TableContainer,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import FilterListIcon from "@material-ui/icons/FilterList";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px",
    },

    hoverDialog: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
    large: {
        width: 100,
        height: 100,
    },
    whiteText: {
        color: "#fff",
    },
    allTable: {
        color: "#dcdcdc",
        fontSize: 12,
        borderColor: "rgb(255 255 255 / 15%)",
    },
    tableHead: {
        color: "#fff",
        fontSize: 13,
        borderColor: "rgb(255 255 255 / 15%)",
    },
    dashboards: {
        background: "rgba(0,0,0,0.6)",
    },
    filterBox: {
        background: "rgba(0,0,0,0.7)",
    },
});

function FiveDotsSummary({ state, setState }) {
    const dispatch = useDispatch();
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    const Dots = (val) => {
        return <div >
            <div style={{
                width: '15px',
                height: '15px',
                backgroundColor: val > 0 ? 'rgb(46, 204, 113)' : '#f1c40f',
                borderRadius: '7.5px',
                marginRight: '10px'
            }} />
        </div>
    }
    const dataset = ()=>{
        let columns = [
            {title: "EMPLOYEE ID"},//pixels width 
            {title: "NAME"},//char width 
            {title: "POSITION"},
            {title: "STAUS"},
            {title: "DATE"},
            {title: "TIME IN"},
            {title: "ASSIGN"},
            {title: "TIME OUT"},
            {title: "TIME IN"},
            {title: "TIME OUT"},
            {title: "NO. ASSIGNED"},
            {title: "NO. ACCOMPLISHED"},
            {title: "PAYMENT PERCENTAGE"},
            {title: "DOUBLE BOOK"},
            {title: "FIRST METER"},
            {title: "LAST METER"},


        ]
        let new_data = []
        state.five_dots_data.forEach(val => {
            let data_format = [
                { value:val.user_id},
                { value:val.name,},
                { value:val.position,},
                { value:val.status,},
                { value:val.date,},
                { value:val.attendance1,style: {fill: {patternType: "solid", fgColor: {rgb:val.attendance1>0?"2ECC71":"F1C40F"}}}},
                { value:val.count_assign,style: {fill: {patternType: "solid", fgColor: {rgb:val.count_assign>0?"2ECC71":"F1C40F"}}}},
                { value:val.attendance2,style: {fill: {patternType: "solid", fgColor: {rgb:val.attendance2>0?"2ECC71":"F1C40F"}}}},
                { value:val.attendance3,style: {fill: {patternType: "solid", fgColor: {rgb:val.attendance3>0?"2ECC71":"F1C40F"}}}},
                { value:val.attendance4,style: {fill: {patternType: "solid", fgColor: {rgb:val.attendance4>0?"2ECC71":"F1C40F"}}}},
                { value:val.jo_assign,},
                { value:val.total_accom,},
                { value:val.percent_payment,},
                { value:val.doublebook,},
                { value:val.first_meter,},
                { value:val.last_meter,},
            ]
            new_data.push(data_format)
                 
        });
        let multisetdata=[
            {
                columns:columns,
                data:new_data
            }
        ]
        return multisetdata
    }
    const datasetmvp = ()=>{
        let columns = [
            {title: "Emp ID"},//pixels width 
            {title: "Date"},//char width 
            {title: "Name"},
            {title: "Time In AM"},
            {title: "Time Out AM"},
            {title: "First Accom"},
            {title: "Last Accom"},
            {title: "Time In PM"},
            {title: "Time Out PM"},
            {title: "Assigned Bills"},
            {title: "Accomplished Bills"},
            {title: "Invalid Report"},
            {title: "Time In the Following Day"},
        ]
        let new_data = []
        state.five_dots_data.forEach(val => {
            let data_format = [
                { value:val.user_id},
                { value:val.date,},
                { value:val.name,},
                { value:val.attendance_att1,},
                { value:val.attendance_att2,},
                { value:val.first_meter,},
                { value:val.last_meter,},
                { value:val.attendance_att3,},
                { value:val.attendance_att4,},
                { value:val.jo_assign,},
                { value:val.total_accom,},
                { value: String(val.invalid),},
                { value:val.following_day},
            ]
            new_data.push(data_format)
                 
        });
        let multisetdata=[
            {
                columns:columns,
                data:new_data
            }
        ]
        return multisetdata
    }
    const datasetrunning = ()=>{
        let columns = [
            {title: "Emp ID"},//pixels width 
            {title: "Date"},//char width 
            {title: "Name"},
            {title: "Total Assigned"},
            {title: "Total Delivered"},
            {title: "Undelivered"},
            {title: "Complaints"},
            {title: "Invalid Report"},
            {title: "No of Days"},
            {title: "Total"},
            {title: "Incentive"},
        ]
        let new_data = []
        state.five_dots_data_top.forEach(val => {
            let data_format = [
                { value:val.user_id},
                { value:val.date,},
                { value:val.name,},
                { value:val.jo_assign,},
                { value:val.total_accom,},
                { value: val.remaining},
                { value:'',},
                { value:val.invalid,},
                { value:'',},
                { value:'',},
                { value:'',},
                
            ]
            new_data.push(data_format)
                 
        });
        let multisetdata=[
            {
                columns:columns,
                data:new_data
            }
        ]
        return multisetdata
    }
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                    </Grid>
                    <Button
                        size="small"
                        style={{
                            fontSize: "0.8125rem",
                            backgroundColor: "rgba(6,86,147)",
                            color: "white",
                            marginRight: 6
                        }}
                        startIcon={<FilterListIcon />}
                        onClick={() => setState(prev => ({ ...prev, openFilterDots: true }))}
                    >
                        Filter
                    </Button>
                    <ExcelFile
                        filename={
                            "Summary 5 Dots" +
                            "-" +
                            moment(new Date(state.filter_date_start)).format("YYYY-MM-DD") + ' - ' + moment(new Date(state.filter_date_end)).format("YYYY-MM-DD")
                        }
                        element={
                            <Button
                                size="small"
                                variant="contained"
                                style={{ backgroundColor: "rgba(6,86,147)", color: "white",marginRight: 6 }}
                                
                                startIcon={<GetAppIcon />}
                            >
                                Download
                            </Button>
                        }
                    >

                        <ExcelSheet dataSet={dataset()} name="Invalid">
                            {/* <ExcelColumn label="EMPLOYEE ID" value="user_id" />
                            <ExcelColumn label="NAME" value="name" />
                            <ExcelColumn label="POSITION" value="position" />
                            <ExcelColumn label="STATUS" value="staus" />
                            <ExcelColumn label="DATE" value="date" />
                            <ExcelColumn label="TIME IN" value="attendance1" />
                            <ExcelColumn label="ASSIGN" value="count_assign" />
                            <ExcelColumn style={{backgroundColor:'red'}} label="TIME OUT" value="attendance2" />
                            <ExcelColumn label="TIME IN" value="attendance3" />
                            <ExcelColumn label="TIME OUT" value="attendance4" /> */}
                        </ExcelSheet>
                    </ExcelFile>
                    <ExcelFile
                        filename={
                            "MVP" +
                            "-" +
                            moment(new Date(state.filter_date_start)).format("YYYY-MM-DD") + ' - ' + moment(new Date(state.filter_date_end)).format("YYYY-MM-DD")
                        }
                        element={
                            <Button
                                size="small"
                                variant="contained"
                                style={{ backgroundColor: "rgba(6,86,147)", color: "white",marginRight:5}}
                                
                                startIcon={<GetAppIcon />}
                            >
                               MVP Download
                            </Button>
                        }
                    >

                        <ExcelSheet dataSet={datasetmvp()} name="MVP">
                        </ExcelSheet>
                    </ExcelFile>
                    <ExcelFile
                        filename={
                            "Running" +
                            "-" +
                            moment(new Date(state.filter_date_start)).format("YYYY-MM-DD") + ' - ' + moment(new Date(state.filter_date_end)).format("YYYY-MM-DD")
                        }
                        element={
                            <Button
                                size="small"
                                variant="contained"
                                style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                                
                                startIcon={<GetAppIcon />}
                            >
                               Running Download
                            </Button>
                        }
                    >

                        <ExcelSheet dataSet={datasetrunning()} name="Running">
                        </ExcelSheet>
                    </ExcelFile>
                   

                </Grid>
                <Grid  item xs={12} md={12}>
                <div>
                    <Typography>{moment(state.filter_date_start).format("LL")+' - '+moment(state.filter_date_end).format("LL")}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer style={{ maxHeight: 440 }}>
                        <Table
                            stickyHeader
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>NAME</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>POSITION</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>STATUS</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>DATE</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>DOTS</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>NO. ASSIGNED</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>NO. ACCOMPLISHED</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>PAYMENT PERCENTAGE</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>DOUBLE BOOK</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>FIRST METER</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>LAST METER</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>INVALID</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>TIME IN</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>TIME OUT</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>TIME IN</TableCell>
                                    <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '20%',whiteSpace:'nowrap' }}>TIME OUT</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.five_dots_data.map((val, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>{val.name}</TableCell>
                                        <TableCell>{val.position}</TableCell>
                                        <TableCell>{val.status}</TableCell>
                                        <TableCell>{val.date}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex' }}>
                                                {Dots(val.attendance1)}
                                                {Dots(val.count_assign)}
                                                {Dots(val.attendance2)}
                                                {Dots(val.attendance3)}
                                                {Dots(val.attendance4)}
                                            </div>
                                        </TableCell>
                                        <TableCell>{val.jo_assign}</TableCell>
                                        <TableCell>{val.total_accom}</TableCell>
                                        <TableCell>{val.percent_payment}</TableCell>
                                        <TableCell>{val.doublebook}</TableCell>
                                        <TableCell>{val.first_meter}</TableCell>
                                        <TableCell>{val.last_meter}</TableCell>
                                        <TableCell>{val.invalid}</TableCell>
                                        <TableCell>{val.attendance_att1}</TableCell>
                                        <TableCell>{val.attendance_att2}</TableCell>
                                        <TableCell>{val.attendance_att3}</TableCell>
                                        <TableCell>{val.attendance_att4}</TableCell>
                                    </TableRow>
                                })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </div>
    );
}
export default FiveDotsSummary;
