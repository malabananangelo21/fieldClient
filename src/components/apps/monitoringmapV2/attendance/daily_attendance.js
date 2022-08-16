import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Grid,
    IconButton,
    Typography,
    Backdrop,
    Card,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Map from "../monitoringMap";
import '../css/home.css'
import '../summary_accomplishment/css/summary.css'
import CurrentAttendance from './current_attendance'
const columns = [
    {
        id: "user_id",
        label: "ID",
    },
    {
        id: "name",
        label: "Employee Name",
    },
    {
        id: "user_jobposition",
        label: "Job Position",
    },
    {
        id: "present_count",
        label: "Present",
    },
    {
        id: "late_count",
        label: "Late",
    },
    {
        id: "absent_count",
        label: "Absent",
    },
    {
        id: "leave_count",
        label: "Leave",
    },
    {
        id: "ob_count",
        label: "OB",
    },
    {
        id: "present_percent",
        label: "Present %",
    },
    {
        id: "absent_percent",
        label: "Absent %",
    }, ,
];
export default function DailyAttendanceTable({ state, setState }) {
    const map_reducer = useSelector((state) => state.map_reducer);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [indexState, setIndexState] = React.useState({
        dataFilter: [],
        summary: [],
        company_id: "",
        jo_type: ""
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <TableContainer style={{ maxHeight: 430 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        width: 5,
                                        backgroundColor: "#115293",
                                        color: "white",
                                    }}
                                >
                                    ID
                                </TableCell>
                                <TableCell
                                    style={{
                                        backgroundColor: "#115293",
                                        color: "white"
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    style={{
                                        backgroundColor: "#115293",
                                        color: "white"
                                    }}
                                >
                                    Position
                                </TableCell>
                                {state.search_attendance_data.length > 0 && state.attendance_data[0].data.map((val, index) => {
                                    return <TableCell
                                        style={{
                                            width: 5,
                                            backgroundColor: "#115293",
                                            color: "white",
                                            textAlign: 'center'
                                        }}
                                    >
                                        {moment(val.date).format('DD')}
                                    </TableCell>
                                })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.search_attendance_data.map((val, index) => {
                                return <TableRow key={index}>
                                    <TableCell>{val.user_id}</TableCell>
                                    <TableCell>{String(val.name).toLocaleUpperCase()}</TableCell>
                                    <TableCell>{String(val.user_jobposition).toLocaleUpperCase()}</TableCell>

                                    {val.data.map((val_data, index2) => {
                                        let backgroundColor = "";
                                        if (val_data.status == "P") {
                                            backgroundColor = "#2ecc71"
                                        } else if (val_data.status == "A") {
                                            backgroundColor = "#e74c3c"
                                        }
                                        else if (val_data.status == "LV") {
                                            backgroundColor = "#f1c40f"
                                        }
                                        else if (val_data.status == "RD") {
                                            backgroundColor = "#c582e0"
                                        }
                                        return <TableCell style={{ fontSize: 11, backgroundColor: backgroundColor, textAlign: 'center' }} key={index2}>{val_data.status}</TableCell>
                                    })

                                    }
                                </TableRow>
                            })
                            }


                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
