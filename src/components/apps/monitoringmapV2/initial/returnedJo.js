import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Grid,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Card,
    CardContent,
    TableCell,
    TableHead,
    TableRow,
    Table,
    Divider,
    TableBody,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    InputLabel,
    TextField,
    TableContainer,
    MenuItem,
    Paper,
    TablePagination
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Pie from "./charts/pie";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReorderIcon from '@material-ui/icons/Reorder';
import Slide from "@material-ui/core/Slide";
import Filter from "./filter";
import CloseIcon from "@material-ui/icons/Close";
import { getData, cancelRequest } from "../../../api/api";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import axios from "axios"
import RefreshIcon from '@material-ui/icons/Refresh';
import Summary_monitoring from './summary_monitoring'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import AutoComplete from './autocomplete'
import { regions, provinces, cities, barangays } from 'select-philippines-address';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MuiTableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(TableCell);
let counterError = 0;

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'date_added', label: 'Date' },
    { id: 'customer_meter_no', label: 'Meter Number' },
];

const columns2 = [
    { id: 'name', label: 'Name' },
    { id: 'date_added', label: 'Date' },
    {
        id: 'data',
        label: 'Count',
        format: (value) => value.length,
    },
];


function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 350,
    },
});
const StickyHeadTable = ({ indexState, branch_name }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState("");
    const [searchName, setSearchName] = React.useState("");


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    let ReturnedJo = indexState.returnedJo.filter((files) => {

            return (files.customer_meter_no
                    .toLowerCase()
                    .indexOf(search.toLocaleLowerCase()) !== -1 
            );
        });
        
    let FielmanReturnedList = indexState.fielmanReturnedList.filter((files) => {

        return (files.name
                .toLowerCase()
                .indexOf(searchName.toLocaleLowerCase()) !== -1 
        );
    });
    // .filter((files) => {

    //     return (
    //     //     (files.compelete_name !== null && files.compelete_name !== "" && typeof files.compelete_name !== "undefined") && files.compelete_name
    //     //         .toLowerCase()
    //     //         .indexOf(search.toLocaleLowerCase()) !== -1 ||
    //     //     (files.barangay !== null && files.barangay !== "" && typeof files.barangay !== "undefined") && files.barangay
    //     //         .toLowerCase()
    //     //         .indexOf(search.toLocaleLowerCase()) !== -1 ||
    //     //     (files.description !== null && files.description !== "" && typeof files.description !== "undefined") && files.description
    //     //         .toLowerCase()
    //     //         .indexOf(search.toLocaleLowerCase()) !== -1
    //     );
    // });
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
                <TextField style={{ width: '100%' }} size="small" label='Search Name' variant='outlined' onChange={(e) => {
                    let data = e.target.value
                    setSearchName(data)

                }} />
            </Grid>
            <Grid item xs={12} md={8}>
            <TextField style={{ width: '100%' }} size="small" label='Search Meter Number' variant='outlined' onChange={(e) => {
                    let data = e.target.value
                    setSearch(data)

                }} />
                {/* <ExcelFile
                    filename={
                        "Assigned Job Order"+
                        "-" +
                        branch_name +
                         " " +
                         indexState.date_start +' - '+indexState.date_end
                       
                    }
                    element={
                        <Button
                            size="medium"
                            variant="contained"
                            style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                            className={classes.button}
                            endIcon={<GetAppIcon />}
                        >
                            Download
                        </Button>
                    }
                >
                    <ExcelSheet data={EmployeeSearch} name="Invalid">
                        <ExcelColumn label="Name" value="compelete_name" />
                        <ExcelColumn label="Date" value="date" />
                        <ExcelColumn label="City" value="city" />
                        <ExcelColumn label="Barangay" value="barangay" />
                        <ExcelColumn label="Allowance" value="jo_allowance" />
                        <ExcelColumn label="AUBD" value="AUBD" />
                        <ExcelColumn label="DN" value="DN" />
                        <ExcelColumn label="MECO" value="MECO" />
                        <ExcelColumn label="NAC" value="NAC" />
                        <ExcelColumn label="NCR" value="NCR" />
                        <ExcelColumn label="OSB" value="OSB" />
                        <ExcelColumn label="OSN" value="OSN" />
                        <ExcelColumn label="Re-out DN" value="RDN" />
                        <ExcelColumn label="Re-out SOA" value="RSOA" />
                        <ExcelColumn label="SOA" value="SOA" />
                    </ExcelSheet>
                </ExcelFile> */}
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.root} variant='outlined'>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell
                                        style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}
                                    >
                                        #
                                    </TableCell> */}
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }} >
                                        Name
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }} >
                                        Date
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }} >
                                        Count
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {FielmanReturnedList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                              <TableCell  align={'left'}>{row.name}</TableCell>
                                              <TableCell  align={'left'}>{row.date_added}</TableCell>
                                              <TableCell  align={'left'}>{row.data.length}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={ReturnedJo.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper className={classes.root} variant='outlined'>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell
                                        style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}
                                    >
                                        #
                                    </TableCell> */}
                                    {columns.map((column) => (
                                        <TableCell

                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ReturnedJo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={'left'}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
                        count={ReturnedJo.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>

    );
}
const TableAssignFormat = forwardRef((props, ref) => {
    const {
        state,
        setState,
        fieldman_map,
        branch_name
    } = props
    const [indexState, setIndexState] = React.useState({
        date_start: moment(new Date()).format('YYYY-MM-DD'),
        date_end: moment(new Date()).format('YYYY-MM-DD'),
        trackAssignedData: [],
        returnedJo: [],
        fielmanReturnedList: []
    })
    const dispatch = useDispatch()

    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };

    const handleDateChangeStart = (date) => {
        setIndexState(prev => ({
            ...prev,
            date_start: moment(date).format('YYYY-MM-DD'),
        }));
    };

    const handleDateChangeEnd = (date) => {
        setIndexState(prev => ({
            ...prev,
            date_end: moment(date).format('YYYY-MM-DD'),
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault()
        getAssignedLocation()
    }

    const getAssignedLocation = () => {

        let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph")
        let selected_data = []
        if (onSelectData !== null) {
            selected_data = JSON.parse(onSelectData)
            selected_data.from = moment(indexState.date_start).format('YYYY-MM-DD')
            selected_data.to = moment(indexState.date_end).format('YYYY-MM-DD')
        }
        getData("tracking/fetchMapJOReturned", selected_data).then((res) => {
            let new_returned_jo = []
            for (let index = 0; index < res.accomplishment.length; index++) {
                const element = res.accomplishment[index];
                let details = {
                    name: element.name,
                    user_id: element.user_id,
                    group: element.group,
                    data: [element],
                    date_added: moment(element.date_added).format('YYYY-MM-DD')
                }

                let match = new_returned_jo.findIndex((val) => (val.user_id === element.user_id && moment(val.date_added).format('YYYY-MM-DD') === moment(element.date_added).format('YYYY-MM-DD')))
                match == -1 ? new_returned_jo.push(details) :
                    new_returned_jo[match].data.push(element)
            }
            setIndexState(prev => ({
                ...prev,
                returnedJo: res.accomplishment,
                fielmanReturnedList: new_returned_jo
            }))
        })


        // if (typeof selected_data.jo_type != "undefined") {
        //     // getData('aam/getAssignedLocation', selected_data).then((res) => {
        //     //     setIndexState(prev => ({ ...prev, trackAssignedData: res.res }))
        //     // })
        //     getData("tracking/fetchMapAssigning", data).then((res) => {

        //     })
        // }
    }
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Card variant='outlined'>

                        <CardContent>
                            <form onSubmit={onSubmit}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">

                                    <KeyboardDatePicker
                                        variant="outlined"
                                        autoOk
                                        label="Date Start"
                                        format="MM/dd/yyyy"
                                        value={indexState.date_start}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={handleDateChangeStart}
                                        style={{ marginLeft: 5 }}
                                    />
                                </MuiPickersUtilsProvider>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                                    <KeyboardDatePicker
                                        variant="outlined"
                                        autoOk
                                        label="Date End"
                                        format="MM/dd/yyyy"
                                        value={indexState.date_end}
                                        InputAdornmentProps={{ position: "end" }}
                                        onChange={handleDateChangeEnd}
                                        style={{ marginLeft: 5 }}
                                    />
                                </MuiPickersUtilsProvider>
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
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                    <StickyHeadTable indexState={indexState} branch_name={branch_name} />
                </Grid>

            </Grid>

        </div>
    );
})
export default React.memo(TableAssignFormat);
