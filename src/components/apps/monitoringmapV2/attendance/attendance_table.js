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
        label: "Position",
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
    },,
];
export default function AttendanceTable({ state, setState }) {
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
                <TableContainer style={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            backgroundColor: "#115293",
                                            color: "white",
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                               

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.search_attendance_data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                                .map((row, index) => {
                                    let display = "hidden";
                                    if (state.display === index) {
                                        display = "visible";
                                    }
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                            onMouseOver={() => {
                                                setState({ ...state, display: index });
                                            }}
                                            onMouseLeave={() => {
                                                setState({ ...state, display: "" });
                                            }}
                                        >
                                            {columns.map((column) => {
                                                let value = row[column.id];
                                                // if (column.id === "name") {
                                                //   value = row[column.id].toUpperCase();
                                                // }
                                                // if (column.id === "user_jobposition") {
                                                //   value = row[column.id].toUpperCase();
                                                // }
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ textTransform: 'capitalize' }}
                                                    >
                                                        {column.format &&
                                                            typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={state.search_attendance_data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />

            </Grid>
        </Grid>
    );
}
