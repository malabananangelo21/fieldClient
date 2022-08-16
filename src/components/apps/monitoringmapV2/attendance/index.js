import React, { Fragment, PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Grid,
    IconButton,
    Typography,
    Backdrop,
    Card,
    InputLabel,
    MenuItem,
    FormControl,
    Dialog, DialogTitle, DialogContent,
    Select,
    Input,
} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Map from "../monitoringMap";
import '../css/home.css'
import '../summary_accomplishment/css/summary.css'
import CurrentAttendance from './current_attendance'
import AttendanceTable from "./attendance_table";
import DailyTable from "./daily_attendance";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    validate,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import RefreshIcon from '@material-ui/icons/Refresh';
import ReactExport from "react-data-export";
import GetAppIcon from "@material-ui/icons/GetApp";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export default function Index() {
    const dispatch = useDispatch();
    const map_reducer = useSelector((state) => state.map_reducer);
    const home_reducer = useSelector((state) => state.home_reducer);
    const [mapOption, setmapOption] = React.useState({
        zoom: 12,
        lat: 13.7565,
        lng: 121.0583,
    });
    const [state, setState] = React.useState({
        openMonthly: false,
        record_start_month: new Date(),
        record_end_month: new Date(),
        year: moment(new Date()).format('YYYY'),
        month: [],
        Selectedcompany: "",
        Selected_branch: "",
        openDaily: false.branch_id,
        isOpen: false,
        attendance_data: [],
        display_branch_name: '',
        selectedButton: 0,
        tableDisplay: "Summary",
        search_attendance_data: [],
        filter_attendance_data: [],
        searchDriver: "",
        position_data: [],
        selected_filter_position: "",
        column_date: []
    })
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    const handleDateChangeStartRecord = (date) => {
        setState(prev => ({
            ...prev,
            record_start_month: date,
        }));
    };
    const handleDateChangeEndRecord = (date) => {
        setState(prev => ({
            ...prev,
            record_end_month: date,
        }));
    };
    React.useEffect(() => {
        monthFormat()
        getBranches()
    }, [])
    const monthFormat = () => {
        let month = [
            {
                name: 'JANUARY', firstDate: moment(state.year + '-01-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-01-01').getFullYear(), new Date(state.year + '01-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'FEBRUARY', firstDate: moment(state.year + '-02-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(String(state.year + '-02-01')).getFullYear(), new Date(String(state.year + '-02-01')).getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'MARCH', firstDate: moment(state.year + '-03-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-03-01').getFullYear(), new Date(state.year + '-03-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'APRIL', firstDate: moment(state.year + '-04-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-04-01').getFullYear(), new Date(state.year + '-04-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'MAY', firstDate: moment(state.year + '-05-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-05-01').getFullYear(), new Date(state.year + '-05-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'JUNE', firstDate: moment(state.year + '-06-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-06-01').getFullYear(), new Date(state.year + '-06-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'JULY', firstDate: moment(state.year + '-07-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-07-01').getFullYear(), new Date(state.year + '-07-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'AUGUST', firstDate: moment(state.year + '-08-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-08-01').getFullYear(), new Date(state.year + '-08-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'SEPTEMBER', firstDate: moment(state.year + '-09-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-09-01').getFullYear(), new Date(state.year + '-09-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'OCTOBER', firstDate: moment(state.year + '-10-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-10-01').getFullYear(), new Date(state.year + '-10-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'NOVEMBER', firstDate: moment(state.year + '-11-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-11-01').getFullYear(), new Date(state.year + '-11-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
            {
                name: 'DECEMBER', firstDate: moment(state.year + '-12-01').format('YYYY-MM-DD'), lastDate: moment(new Date(new Date(state.year + '-12-01').getFullYear(), new Date(state.year + '-12-01').getMonth() + 1, 0)).format('YYYY-MM-DD')
            },
        ]
        setState(prev => ({ ...prev, month: month }))

    }
    const onSubmitAttendance = (e) => {
        e.preventDefault();
        getAttendance(state.record_start_month, state.record_end_month, state.Selected_branch)
    }
    const getAttendance = (record_start_month, record_end_month, Selected_branch) => {
        let date_start = new Date(record_start_month)
        let date_end = new Date(record_end_month)

        var firstDay = new Date(date_start.getFullYear(), date_start.getMonth(), 1);
        var lastDay = new Date(date_end.getFullYear(), date_end.getMonth() + 1, 0);
        if (moment(date_end).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')) {
            var lastDay = new Date();
        }
        let data = {
            datefilterfrom: moment(firstDay).format('YYYY-MM-DD'),
            datefilterto: moment(lastDay).format('YYYY-MM-DD'),
            bid: Selected_branch,
            user_id: localStorage.getItem('u')
        }
        getData('audit/attendance_data2', data).then((res) => {
            let branch = home_reducer.SelectedBranches.filter((val) => (val.branch_id == Selected_branch))
            let branch_name = ''
            if (branch.length > 0) {
                branch_name = branch[0].branch_name
            }
            let position_data = []
            let index = []
            let column_date = []
            res.forEach((val, index) => {
                if (index === 0) {
                    column_date = val.data
                }
                let position_match = position_data.filter((val2) => (String(val2).toLocaleUpperCase() === String(val.user_jobposition).toLocaleUpperCase()))
                if (position_match.length === 0) {
                    position_data.push(String(val.user_jobposition).toLocaleUpperCase())
                }

            })

            setState(prev => ({ ...prev, column_date: column_date, attendance_data: res, display_branch_name: branch_name, search_attendance_data: res, position_data: position_data, filter_attendance_data: res }))
        })
    }
    const onChangeCompany = (e) => {
        const branches_data = home_reducer.handleBranch.filter(
            (val) => val.company_id == e.target.value
        );
        branches_data.sort(function (a, b) {
            return a["branch_name"].localeCompare(b["branch_name"]);
        });
        home_reducer.SelectedBranches = branches_data;
        setState((prev) => ({
            ...prev,
            selectedCompany: e.target.value,
        }));
    };
    const onChangeBranch = (e) => {
        setState((prev) => ({
            ...prev,
            Selected_branch: e.target.value,
        }));
    };

    const getBranches = React.useCallback(async function getBranches() {
        dispatch_data("loading_map", true);
        await getData(
            "HumanResource/getHandleBranch",
            {
                user_id: localStorage.getItem("u"),
            }
        ).then((response) => {
            let onSelectData = sessionStorage.getItem('onSelectSingleDateGraph');

            let company = [];
            let company_id = '';
            let match_branch = []
            let branch_id = ''
            let branch_name = ''
            let jo_type_val = []
            let jo_type_data = []
            let job_position = "";
            let selected_branch_id = ""
            if (onSelectData != null) {
                let json_selected_data = JSON.parse(onSelectData)
                company_id = json_selected_data.company_id
                selected_branch_id = json_selected_data.selection[0]
            }
            response.response.map((item, index) => {
                let match = false;
                company.map((val) => {
                    if (val.company_name == item.company_name) {
                        match = true;
                    }
                });
                if (!match) {
                    company.push({
                        company_name: item.company_name,
                        company_id: item.company_id,
                    });
                }
            });
            match_branch = response.response.filter(
                (val, index) => (parseInt(val.company_id) === parseInt(company_id) && (val.branch_field_work) !== "")
            );
            match_branch.sort(function (a, b) {
                return a["branch_name"].localeCompare(b["branch_name"]);
            });
            match_branch.forEach((val, index) => {
                if ((val.branch_field_work) !== "") {
                    if (branch_id == "") {
                        branch_id = val.branch_id

                        branch_name = val.branch_name
                        let jo_type = JSON.parse(val.branch_field_work)
                        jo_type_val = jo_type[0]
                        jo_type_data = jo_type
                        if (val.branch_field_personnel !== "") {
                            let user_pos = JSON.parse(val.branch_field_personnel);
                            job_position = user_pos[0];
                        }
                    }
                }
            })
            setState(prev => ({ ...prev, selectedCompany: company_id, Selected_branch: selected_branch_id }))
            getAttendance(state.record_start_month, state.record_end_month, selected_branch_id)
            dispatch_data("job_position", job_position);
            home_reducer.handleBranch = response.response;
            home_reducer.company_name = company;
            home_reducer.SelectedBranches = match_branch;

            dispatch({
                type: 'JobOrderType',
                data: jo_type_data
            })
            dispatch_data("loading_map", false);
        });
    }, []);
    const onChangeSearch = () => {
        let search = state.filter_attendance_data.filter(
            (files) => {
                return files.name.toLowerCase().indexOf(
                    state.searchDriver.toLocaleLowerCase()) !== -1
            }
        )
        setState(prev => ({ ...prev, search_attendance_data: search }))

    }
    const onChangeSearchReset = () => {
        setState(prev => ({ ...prev, search_attendance_data: state.filter_attendance_data, searchDriver: "" }))
    }
    const onChangefilterReset = () => {
        setState(prev => ({ ...prev, search_attendance_data: state.attendance_data, selected_filter_position: "", searchDriver: "" }))
    }
    const onChangePosition = (e) => {
        let filter = e.target.value
        let search = state.attendance_data.filter(
            (files) => (String(files.user_jobposition).toLocaleUpperCase() === String(filter).toLocaleUpperCase())
        )
        setState(prev => ({ ...prev, filter_attendance_data: search, search_attendance_data: search, selected_filter_position: filter, searchDriver: "" }))
    }
    return (
        <div className='parent'>
            <Backdrop

                open={map_reducer.loading_map}
                style={{ zIndex: 999999999 }}
            >
                <div className="loadermap"></div>
            </Backdrop>
            <div  >
                <div style={{ marginTop: 60, padding: 20 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>{state.display_branch_name}</Typography>
                                <Typography style={{ fontSize: 13, fontWeight: 'bold' }}>{moment(state.record_start_month).format('MMM YYYY') + " to " + moment(state.record_end_month).format('MMM YYYY')}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Button
                                    onClick={() => setState(prev => ({ ...prev, openMonthly: true }))}
                                    variant="contained"
                                    size="small"
                                    style={{
                                        backgroundColor: "rgb(17, 82, 147)",
                                        color: "#fff",
                                        marginRight: 10,
                                    }}
                                >
                                    GENERATE
                                </Button>
                                {/* <Button
                                    onClick={() => setState(prev => ({ ...prev, openMonthly: true }))}
                                    variant="contained"
                                    size="small"
                                    style={{
                                        backgroundColor: "rgb(17, 82, 147)",
                                        color: "#fff",
                                        marginRight: 10,
                                    }}
                                >
                                    Download
                                </Button> */}
                                {state.tableDisplay === "Daily" &&
                                <ExcelFile
                                    filename={
                                        "Daily "+state.display_branch_name+' '+moment(state.record_start_month).format('MMM YYYY') + " to " + moment(state.record_end_month).format('MMM YYYY')
                                    }
                                    element={
                                        <Button
                                            size="small"
                                            style={{
                                                fontSize: "0.8125rem",
                                                backgroundColor: "rgba(6,86,147)",
                                                color: "white",
                                                marginLeft: 5,
                                            }}
                                            endIcon={<GetAppIcon style={{ color: "#fff" }} />}
                                        >
                                            Download
                                        </Button>
                                    }
                                >
                                    <ExcelSheet data={state.search_attendance_data} name="Accomplishments">
                                        <ExcelColumn label="Emp ID" value="user_id" />
                                        <ExcelColumn label="Name" value="name" />
                                        <ExcelColumn label="Position" value="user_jobposition" />

                                        {state.column_date.map((val) => {
                                            return <ExcelColumn label={val.date} value={val.date} />
                                        })
                                        }
                                    </ExcelSheet>
                                </ExcelFile>
                            }
                              {state.tableDisplay === "Summary" &&
                                <ExcelFile
                                    filename={
                                        "Summary "+state.display_branch_name+' '+moment(state.record_start_month).format('MMM YYYY') + " to " + moment(state.record_end_month).format('MMM YYYY')
                                    }
                                    element={
                                        <Button
                                            size="small"
                                            style={{
                                                fontSize: "0.8125rem",
                                                backgroundColor: "rgba(6,86,147)",
                                                color: "white",
                                                marginLeft: 5   ,
                                            }}
                                            endIcon={<GetAppIcon style={{ color: "#fff" }} />}
                                        >
                                            Download
                                        </Button>
                                    }
                                >
                                    <ExcelSheet data={state.search_attendance_data} name="Accomplishments">
                                        <ExcelColumn label="Emp ID" value="user_id" />
                                        <ExcelColumn label="Name" value="name" />
                                        <ExcelColumn label="Position" value="user_jobposition" />
                                        <ExcelColumn label="Present" value="present_count" />
                                        <ExcelColumn label="Late" value="late_count" />
                                        <ExcelColumn label="Absent" value="absent_count" />
                                        <ExcelColumn label="Leave" value="leave_count" />
                                        <ExcelColumn label="OB" value="ob_count" />
                                        <ExcelColumn label="Present %" value="present_percent" />
                                        <ExcelColumn label="Absent %" value="absent_percent" />
                                    </ExcelSheet>
                                </ExcelFile>
}
                                <div style={{ display: 'flex', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderRadius: 3, borderColor: '#95a5a6',marginLeft:5 }}>

                                    <select value={state.selected_filter_position} style={{ borderStyle: 'none', outline: 'none' }} name="position" id="position" onChange={(e) => onChangePosition(e)}>
                                        <option hidden>ALL</option>
                                        {state.position_data.map((val, index) => {
                                            return <option value={val} key={index}>{val}</option>
                                        })
                                        }
                                    </select>
                                    {/* <SearchIcon style={{color:'#115293',cursor:'pointer'}} onClick={()=>onChangeSearch()}/> */}
                                    <RefreshIcon style={{ color: "#115293", cursor: 'pointer' }} onClick={() => onChangefilterReset()} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderRadius: 3, borderColor: '#95a5a6', marginLeft: 5 }}>
                                    <input placeholder='Search' value={state.searchDriver} style={{ borderStyle: 'none', outline: 'none' }} onChange={(e) => { let search = e.target.value; setState(prev => ({ ...prev, searchDriver: search })) }} />
                                    <SearchIcon style={{ color: '#115293', cursor: 'pointer' }} onClick={() => onChangeSearch()} />
                                    <RefreshIcon style={{ color: "#115293", cursor: 'pointer' }} onClick={() => onChangeSearchReset()} />
                                </div>

                            </div>
                        </Grid>
                        <Grid container item xs={12} md={5} justify="flex-end">
                            <Button
                                onClick={() => setState(prev => ({ ...prev, tableDisplay: "Summary", selectedButton: 0 }))}
                                variant="contained"
                                size="small"
                                style={{
                                    backgroundColor: state.selectedButton === 0 ? "#fff" : "rgb(17, 82, 147)",
                                    color: state.selectedButton === 0 ? "rgb(17, 82, 147)" : "#fff",
                                    marginRight: 10,
                                }}
                            >
                                Summary
                            </Button>
                            <Button
                                onClick={() => setState(prev => ({ ...prev, tableDisplay: "Daily", selectedButton: 1 }))}
                                variant="contained"
                                size="small"
                                style={{
                                    backgroundColor: state.selectedButton === 1 ? "#fff" : "rgb(17, 82, 147)",
                                    color: state.selectedButton === 1 ? "rgb(17, 82, 147)" : "#fff",
                                    marginRight: 10,
                                }}
                            >
                                Daily
                            </Button>
                            <Button
                                onClick={() => setState(prev => ({ ...prev, openMonthly: true }))}
                                variant="contained"
                                size="small"
                                style={{
                                    backgroundColor: state.selectedButton === 2 ? "#fff" : "rgb(17, 82, 147)",
                                    color: state.selectedButton === 2 ? "rgb(17, 82, 147)" : "#fff",
                                    marginRight: 10,
                                }}
                            >
                                Weekly
                            </Button>
                            <Button
                                onClick={() => setState(prev => ({ ...prev, openMonthly: true }))}
                                variant="contained"
                                size="small"
                                style={{
                                    backgroundColor: state.selectedButton === 3 ? "#fff" : "rgb(17, 82, 147)",
                                    color: state.selectedButton === 3 ? "rgb(17, 82, 147)" : "#fff",
                                    marginRight: 10,
                                }}
                            >
                                Monthly
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Card style={{}}>
                                {state.tableDisplay === "Daily" &&
                                    <DailyTable state={state} setState={setState} />
                                }
                                {state.tableDisplay === "Summary" &&
                                    <AttendanceTable state={state} setState={setState} />
                                }
                            </Card>
                        </Grid>
                        {/* <Grid item xs={12} md={2}>
                        </Grid> */}
                    </Grid>
                </div>
            </div>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={state.openMonthly}
                onClose={() => setState(prev => ({ ...prev, openMonthly: false }))}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="simple-dialog-title">
                    GENERATE ATTENDANCE
                </DialogTitle>
                <div style={{ position: "absolute", right: 1, top: 1 }}>
                    <IconButton aria-label="delete">
                        <CloseIcon
                            onClick={(e) => setState(prev => ({ ...prev, openMonthly: false }))}
                            style={{ color: "#000" }}
                        />
                    </IconButton>
                </div>
                <DialogContent>
                    <form onSubmit={onSubmitAttendance}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <FormControl
                                    size="small"
                                    style={{ width: "100%" }}
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Company
                                    </InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChangeCompany}
                                        label="Company"
                                        name="company"
                                        value={state.selectedCompany}
                                    >
                                        {home_reducer.company_name.map((val) => {
                                            return (
                                                <MenuItem value={val.company_id}>{val.company_name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl
                                    size="small"
                                    style={{ width: "100%" }}
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Branch
                                    </InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChangeBranch}
                                        label="branch"
                                        name="branch_id"
                                        value={state.Selected_branch}
                                    >
                                        {home_reducer.SelectedBranches.map((val, index) => {
                                            return (
                                                <MenuItem value={val.branch_id}>
                                                    {val.branch_company}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                                    <Fragment>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            autoOk
                                            variant="inline"
                                            openTo="year"
                                            views={["year", "month"]}
                                            label="From"
                                            value={state.record_start_month}
                                            onChange={(date) => { handleDateChangeStartRecord(date) }}
                                        />
                                    </Fragment>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                                    <Fragment>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            autoOk
                                            variant="inline"
                                            openTo="year"
                                            views={["year", "month"]}
                                            label="To"
                                            value={state.record_end_month}
                                            onChange={(date) => { handleDateChangeEndRecord(date) }}
                                        />
                                    </Fragment>
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
            </Dialog>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={state.openDaily}
                onClose={() => setState(prev => ({ ...prev, openDaily: false }))}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="simple-dialog-title">
                    GENERATE ATTENDANCE
                </DialogTitle>
                <div style={{ position: "absolute", right: 1, top: 1 }}>
                    <IconButton aria-label="delete">
                        <CloseIcon
                            onClick={(e) => setState(prev => ({ ...prev, openDaily: false }))}
                            style={{ color: "#000" }}
                        />
                    </IconButton>
                </div>
                <DialogContent>
                    <form onSubmit={onSubmitAttendance}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <FormControl
                                    size="small"
                                    style={{ width: "100%" }}
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Company
                                    </InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChangeCompany}
                                        label="Company"
                                        name="company"
                                        value={state.selectedCompany}
                                    >
                                        {home_reducer.company_name.map((val) => {
                                            return (
                                                <MenuItem value={val.company_id}>{val.company_name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl
                                    size="small"
                                    style={{ width: "100%" }}
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Branch
                                    </InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChangeBranch}
                                        label="branch"
                                        name="branch_id"
                                        value={state.selected_branch}
                                    >
                                        {home_reducer.SelectedBranches.map((val, index) => {
                                            return (
                                                <MenuItem value={val.branch_id}>
                                                    {val.branch_company}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-helper-label">From</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        // value={age}
                                        label="Age"
                                        onChange={handleDateChangeStartRecord}
                                    >
                                        {state.month.map((val, index) => (
                                            <MenuItem
                                                key={index}
                                                value={val.firstDate}
                                            >
                                                {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-helper-label">To</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        // value={age}
                                        label="Age"
                                        onChange={handleDateChangeEndRecord}
                                    >
                                        {state.month.map((val, index) => (
                                            <MenuItem
                                                key={index}
                                                value={val.lastDate}
                                            >
                                                {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
            </Dialog>
        </div>
    );
}
