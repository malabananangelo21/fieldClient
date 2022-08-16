import DateFnsUtils from '@date-io/date-fns';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TableChartIcon from '@material-ui/icons/TableChart';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import "jspdf-autotable";
import moment from 'moment';
import React, { useEffect } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../App';
import useStyles from '../../../../css/css';
import { getAccomplishmentsV2, getHandleBranch, getUserLoginData } from '../../Functions/home_func';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Mapa from '../../map/map';
import DialogActions from '@material-ui/core/DialogActions';
import GetAppIcon from '@material-ui/icons/GetApp';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ReactExport from "react-data-export";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// ====== ILO ILO MMSC BRANCH HEADER TABLE START =======
const columns = [
    {
        id: 'customer_meter_no',
        label: 'Reference Number',
    },
    {
        id: 'findings',
        label: 'Field Findings',
    },
    {
        id: 'date_accomplished',
        label: 'Date & Time',
    },
];
// ====== ILO ILO MMSC BRANCH HEADER TABLE END =======

// ====== NGC ENTERPRISE HEADER TABLE START =======
const columns2 = [
    {
        id: 'accom_fieldman_name',
        label: 'Fieldman',
    },
    {
        id: 'customer_meter_no',
        label: 'Reference Number',
    },
    {
        id: 'findings',
        label: 'Field Findings',
    },
    {
        id: 'date_accomplished',
        label: 'Date & Time',
    },
];
// ====== NGC ENTERPRISE  HEADER TABLE END =======

// ====== IRIGA MMSC HEADER TABLE START =======
const columns3 = [
    {
        id: 'customer_meter_no',
        label: 'Reference Number',
    },
    {
        id: 'account_number',
        label: 'Account No',
    },
    {
        id: 'previous_reading',
        label: 'Previous Reading',
    },
    {
        id: 'present_reading',
        label: 'Present Reading',
    },
    {
        id: 'findings',
        label: 'Field Findings',
    },
    {
        id: 'accom_remarks',
        label: 'Remarks',
    },
    {
        id: 'date_accomplished',
        label: 'Date & Time',
    },
];
// ====== IRIGA MMSC  HEADER TABLE END =======

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Schedule_Table() {
    const home_reducer = useSelector(state => state.home_reducer)
    const dispatch = useDispatch();
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data
        })
    }
    const theme = useTheme();
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:600px)');
    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [state, setState] = React.useState({
        branch_id: '',
        date_start: new Date(),
        date_end: new Date(),
        accomplishments: [],
        search: '',
        columndata: [],
        printdialog: false,
        printalldialog: false,
        datadialog: false,
        reference: '',
        company: '',
        selectBranch: '',
        disable: true,
        loader: false,
        degree: 0,
        open: false,
        search: '',
        alertSuccess: false,
        alertWarning: false,
        alertError: false,
        alertBlank: false,
        vertical: 'top',
        horizontal: 'center',
        singleAccom: []
    });
    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };
    useEffect(() => {
        dispatch_data('getAccomplishments', [])
        dispatch_data('searchTable', [])
        async function handleBranch() {
            await getHandleBranch({ user_id: localStorage.getItem('u') }).then(response => {
                let company = []
                response.response.map((item) => {
                    let match = false
                    company.map((val) => {
                        if (val.company_name == item.company_name) {
                            match = true
                        }
                    })
                    if (!match) {
                        company.push({ company_name: item.company_name, company_id: item.company_id })
                    }
                })
                dispatch_data('gethandleBranch', response.response)
                dispatch_data('company_name', company)
                dispatch_data('SelectedBranches', [])
            })
        }
        async function fetchAccountData() {
            await getUserLoginData().then(response => {
                response.user_login_data.map((val) => {
                    dispatch_data('accountData', val)
                })
            })
        }
        setTimeout(() => {
            handleBranch();
            fetchAccountData()
        }, 500)
    }, [])
    const handleClickOpen = () => {
        setState({
            ...state,
            reference: '',
            branch_id: '',
            open: true,
        })
        dispatch_data('SelectedBranches', [])

    };
    const handleClose = () => {
        setState({
            ...state,
            open: false
        })
    };
    const onChangeCompany = (e) => {
        const branches = home_reducer.handleBranch.filter((val) => (val.company_id == e.target.value))
        dispatch_data('SelectedBranches', branches)
        setState({
            ...state,
            company: e.target.value
        })
    }
    const handleDateChangeStart = (date) => {
        setState({
            ...state,
            date_start: date,
        });
    };
    const handleDateChangeEnd = (date) => {
        setState({
            ...state,
            date_end: date,
        });
    };
    const { vertical, horizontal } = state;
    const onSubmit = (e) => {
        e.preventDefault();
        if (moment(state.date_start).format('YYYY-MM-DD') > moment(state.date_end).format('YYYY-MM-DD')) {
            setState({
                ...state,
                alertError: true
            })
        } else if ((moment(state.date_start).format('YYYY')) === (moment('2020-01-01').format('YYYY'))) {
            alert('The accomplishments for the year 2020 you need to generate are on the archive. Please email us with any questions or concerns.')
        } else {
            let data = {
                parameter: 'branch_id',
                reference: state.reference,
                selection: state.branch_id,
                date_start: moment(state.date_start).format('YYYY-MM-DD'),
                type: 'download',
                date_end: moment(state.date_end).format('YYYY-MM-DD'),
                company_id: state.company
            }
            dispatch_data('loader', true)
            getAccomplishmentsV2(data).then((response) => {
                dispatch_data('loader', false)
                if (response.accomplishments.length != 0) {
                    dispatch_data('SelectedBranch', state.branch_id)
                    dispatch_data('dateFrom', moment(state.date_start).format('LL'))
                    dispatch_data('dateTo', moment(state.date_end).format('LL'))
                    dispatch_data('getLogo', response.company[0])
                    setState({
                        ...state,
                        tableheader: state.branch_id,
                        accomplishments: response.accomplishments,
                        open: false,
                        alertSuccess: true,
                    })


                } else {
                    setState({
                        ...state,
                        alertWarning: true
                    })
                }
            })
            setPage(0)
        }
    }
    const handleClickDialogOpen = (data) => {
        var coordinates = data.coordinates.split(',');
        var latitude = coordinates[0];
        var longitude = coordinates[1];
        dispatch_data('latitude', latitude)
        dispatch_data('longitude', longitude)
        setState({
            ...state,
            columndata: data,
            datadialog: true,
        })
    };
    const handleClickDialogClose = () => {
        setState({
            ...state,
            datadialog: false
        })
    };
    let accomSearch = state.accomplishments.filter(
        (files) => {
            return files.customer_meter_no.toLowerCase().indexOf(
                state.search.toLocaleLowerCase()) !== -1 || files.coordinates.toLowerCase().indexOf(
                    state.search.toLocaleLowerCase()) !== -1 || files.accom_fieldman_name.toLowerCase().indexOf(
                        state.search.toLocaleLowerCase()) !== -1
        }
    )
    const search_accom = (e) => {
        setState({
            ...state,
            search: e.target.value
        })
        setPage(0)
    }
    const handleAlertSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({
            ...state,
            alertSuccess: false
        })
    };
    const handleAlertWarningClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({
            ...state,
            alertWarning: false
        })
    };
    const handleAlertErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({
            ...state,
            alertError: false
        })
    };
    const handleAlertBlankClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({
            ...state,
            alertBlank: false
        })
    };
    const handleClickPrintOpen = (data) => {
        setState({
            ...state,
            singleAccom: data,
            printdialog: true,
        })
    };
    const handleClickPrintClose = () => {
        setState({
            ...state,
            printdialog: false
        })
    }
    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',
            paddingBottom: 139,
        },
        page2: {
            backgroundColor: '#fff',
            paddingBottom: 70
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    const handleClickPrintAllOpen = () => {
        if (state.accomplishments.length === 0) {
            setState({
                ...state,
                alertBlank: true,
            })
        } else {
            dispatch_data('SelectedNameBranch', home_reducer.SelectedBranch[0].branch_company)
            setState({
                ...state,
                printalldialog: true,
            })
        }
    };
    const handleClickNoExcelOpen = () => {
        setState({
            ...state,
            alertBlank: true
        })
    };
    const handleClickPrintAllClose = () => {
        setState({
            ...state,
            printalldialog: false
        })
    };
    return (
        <div className={classes.root}>
            <Snackbar open={state.alertSuccess} autoHideDuration={6000} onClose={() => { handleAlertSuccessClose() }} key={vertical, horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleAlertSuccessClose} severity="info" >
                    Accomplishment generated successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={state.alertWarning} autoHideDuration={6000} onClose={() => { handleAlertWarningClose() }} key={vertical, horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleAlertWarningClose} severity="warning" >
                    Accomplishment not found. Please try other date/s
                </Alert>
            </Snackbar>
            <Snackbar open={state.alertError} autoHideDuration={6000} onClose={() => { handleAlertErrorClose() }} key={vertical, horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleAlertErrorClose} severity="error" >
                    Invalid date range. Please select other date/s
                </Alert>
            </Snackbar>
            <Snackbar open={state.alertBlank} autoHideDuration={6000} onClose={() => { handleAlertBlankClose() }} key={vertical, horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleAlertBlankClose} severity="error" >
                    No Accomplishment found. Please generate table first!
                </Alert>
            </Snackbar>
            <Grid container spacing={3}>
                <Grid item md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white" }} className={classes.button} onClick={handleClickOpen} endIcon={<TableChartIcon />}>Generate Table</Button>

                    {home_reducer.accountData.btn_priv != 0 ?
                        <>
                            <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} onClick={() => { handleClickPrintAllOpen() }} endIcon={<GetAppIcon />}>Download as PDF</Button>
                            {state.accomplishments.length === 0 ?
                                <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} onClick={() => { handleClickNoExcelOpen() }} endIcon={<GetAppIcon />}>Download as Excel</Button>
                                :
                                <>
                                    {/* // ====== ILO ILO MMSC BRANCH HEADER TABLE START ======= */}
                                    {state.tableheader == '50' &&
                                        <ExcelFile filename={'Accomplishment ILO-ILO MMSC' + ' ' + home_reducer.dateFrom + ' ' + home_reducer.dateTo} element={<Button size='large' variant="contained" style={{ fontSize: '0.8125rem', backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download as Excel</Button>} >
                                            <ExcelSheet data={accomSearch} name="Accomplishment">
                                                <ExcelColumn label="Reference Number" value='customer_meter_no' />
                                                <ExcelColumn label="Field Findings" value='findings' />
                                                <ExcelColumn label="Date Accomplished" value='date_accomplished' />
                                                <ExcelColumn label="Location" value='coordinates' />
                                                <ExcelColumn label="Comment" value='accom_remarks' />
                                            </ExcelSheet>
                                        </ExcelFile>
                                    }
                                    {/* // ====== ILO ILO MMSC BRANCH HEADER TABLE END ======= */}

                                    {/* // ====== NGC ENTERPRISE HEADER TABLE START ======= */}
                                    {(state.tableheader !== '50' && state.tableheader !== '51') &&
                                        <ExcelFile filename={'Accomplishment NGC ENTERPRISE' + ' ' + home_reducer.dateFrom + ' ' + home_reducer.dateTo} element={<Button size='large' variant="contained" style={{ fontSize: '0.8125rem', backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download as Excel</Button>} >
                                            <ExcelSheet data={accomSearch} name="Accomplishment">
                                                <ExcelColumn label="Fieldman" value='accom_fieldman_name' />
                                                <ExcelColumn label="Reference Number" value='customer_meter_no' />
                                                <ExcelColumn label="Field Findings" value='findings' />
                                                <ExcelColumn label="Date Accomplished" value='date_accomplished' />
                                                <ExcelColumn label="Location" value='coordinates' />
                                                <ExcelColumn label="Comment" value='accom_remarks' />
                                            </ExcelSheet>
                                        </ExcelFile>
                                    }
                                    {/* // ====== NGC ENTERPRISE  HEADER TABLE END ======= */}

                                    {/* // ====== IRIGA MMSC HEADER TABLE START ======= */}
                                    {state.tableheader == '51' &&
                                        <ExcelFile filename={'Accomplishment IRIGA MMSC' + ' ' + home_reducer.dateFrom + ' ' + home_reducer.dateTo} element={<Button size='large' variant="contained" style={{ fontSize: '0.8125rem', backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download as Excel</Button>} >
                                            <ExcelSheet data={accomSearch} name="Accomplishment">
                                                <ExcelColumn label="Reference Number" value='customer_meter_no' />
                                                <ExcelColumn label="Account Number" value='account_number' />
                                                <ExcelColumn label="Previous Reading" value='previous_reading' />
                                                <ExcelColumn label="Present Reading" value='present_reading' />
                                                <ExcelColumn label="Location" value='coordinates' />
                                                <ExcelColumn label="Field Findings" value='findings' />
                                                <ExcelColumn label="Date Accomplished" value='date_accomplished' />
                                                <ExcelColumn label="Comment" value='accom_remarks' />
                                            </ExcelSheet>
                                        </ExcelFile>
                                    }
                                    {/* // ====== IRIGA MMSC  HEADER TABLE END ======= */}
                                </>
                            }
                        </>
                        :
                        undefined
                    }
                </Grid>
                <Grid item md={6}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField size='small' id="outlined-basic" label="Search" onChange={(e) => { search_accom(e) }} variant="outlined" />
                    </div>
                </Grid>
            </Grid>
            <Paper className={classes.root}>
                <TableContainer id='accom_table' className={classes.container} style={{ maxHeight: 400, marginTop: 10 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>

                                {/* ====== ILO ILO MMSC BRANCH HEADER TABLE START ID: 50 ======= */}
                                {state.tableheader == '50' &&
                                    columns.map((column) => {
                                        return <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: "rgba(6,86,147)", color: "white" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    })
                                }
                                {/* ====== ILO ILO MMSC BRANCH HEADER TABLE END ID: 50======= */}

                                {/* ====== IRIGA MMSC BRANCH HEADER TABLE START ID: 51 ======= */}
                                {state.tableheader == '51' &&
                                    columns3.map((column) => {
                                        return <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: "rgba(6,86,147)", color: "white" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    })
                                }
                                {/* ====== IRIGA MMSC BRANCH HEADER TABLE END ID: 5 1======= */}

                                {/* ====== NGC ENTERPRISE BRANCH HEADER TABLE START ======= */}
                                {(state.tableheader !== '51' && state.tableheader !== '50') &&
                                    columns2.map((column) => {
                                        return <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: "rgba(6,86,147)", color: "white" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    })
                                }
                                {/* ====== NGC ENTERPRISE BRANCH HEADER TABLE END======= */}

                                < TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>
                                    Location
                                </TableCell>
                                < TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>
                                    Signature/Photo Evidence
                                </TableCell>
                                < TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accomSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {/* ====== ILO ILO MMSC BRANCH HEADER TABLE START ID: 50 ======= */}

                                        {state.tableheader == '50' &&
                                            columns.map((column) => {
                                                let value = row[column.id];
                                                if (column.id === 'date_accomplished') {
                                                    value = moment(row[column.id]).format('LLL')
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                    >
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })
                                        }
                                        {/* ====== ILO ILO MMSC BRANCH HEADER TABLE END ID: 50======= */}

                                        {/* ====== IRIGA MMSC BRANCH HEADER TABLE START ID: 51 ======= */}

                                        {state.tableheader == '51' &&
                                            columns3.map((column) => {
                                                let value = row[column.id];
                                                if (column.id === 'date_accomplished') {
                                                    value = moment(row[column.id]).format('LLL')
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                    >
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })
                                        }
                                        {/* ====== IRIGA MMSC BRANCH HEADER TABLE END ID: 51 ======= */}
                                        {/* ====== NGC ENTERPRISE BRANCH HEADER TABLE START ======= */}

                                        {(state.tableheader !== '51' && state.tableheader !== '50') &&
                                            columns2.map((column) => {
                                                let value = row[column.id];
                                                if (column.id === 'date_accomplished') {
                                                    value = moment(row[column.id]).format('LLL')
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                    >
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })
                                        }
                                        {/* ====== NGC ENTERPRISE BRANCH HEADER TABLE END======= */}

                                        <TableCell >
                                            <Link href={'https://maps.google.com/maps?q=' + row.coordinates} target='_blank' style={{ textDecoration: 'none' }}><Typography>{row.coordinates}</Typography></Link>
                                        </TableCell>
                                        <TableCell >
                                            <center style={{ display: 'flex', flexDirection: 'row', }}>
                                                {/* <img src='http://api.pacificweb.com.ph/assets/img/meter/000000000-8_6_SIGN_16095728468450.jpg' style={{ width: 100, height: 50, display: 'inline-block' }} /> */}
                                                {row.all_images.length === 1 ?
                                                    <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + row.all_images[0].path} style={{ width: 100, height: 50, display: 'inline-block' }} />
                                                    :
                                                    <Badge badgeContent={row.all_images.length} overlap="circle" color="primary">
                                                        <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + row.all_images[0].path} style={{ width: 100, height: 50, display: 'inline-block' }} />
                                                    </Badge>
                                                }
                                            </center>

                                        </TableCell>
                                        <TableCell >
                                            <center style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography style={{ cursor: 'pointer', color: "rgba(6,86,147)" }} onClick={() => {
                                                    handleClickDialogOpen(row);
                                                }}
                                                >View</Typography>
                                                {home_reducer.accountData.btn_priv != 0 ?
                                                    <>
                                                        &nbsp;&#47;&nbsp;
                                                    <Typography style={{ cursor: 'pointer', color: "rgba(6,86,147)" }} onClick={() => { handleClickPrintOpen(row) }}>Download</Typography>
                                                    </>
                                                    :
                                                    undefined
                                                }

                                            </center>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[100, 500, 1000]}
                    component="div"
                    count={accomSearch.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog fullWidth maxWidth='xs' open={state.open} onClose={handleClose} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Generate Accomplishments</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
                                    <KeyboardDatePicker
                                        id="date-picker-dialog"
                                        label="Filter Date Start"
                                        format="MM-dd-yyyy"
                                        name='date_start'
                                        value={state.date_start}
                                        style={{ width: '100%' }}
                                        onChange={handleDateChangeStart}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
                                    <KeyboardDatePicker
                                        id="date-picker-dialog"
                                        label="Filter Date End"
                                        format="MM-dd-yyyy"
                                        name='date_end'
                                        value={state.date_end}
                                        style={{ width: '100%' }}
                                        onChange={handleDateChangeEnd}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl required size='small' className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Company</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChangeCompany}
                                        label="Company"
                                        name='company'
                                    >
                                        {home_reducer.company_name.map((val) => {
                                            return <MenuItem value={val.company_id}>{val.company_name}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>

                                <FormControl required size='small' className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Branch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={onChange}
                                        label="branch"
                                        name='branch_id'
                                    >
                                        {home_reducer.SelectedBranches.map((val, index) => {
                                            return <MenuItem value={val.branch_id}>{val.branch_company}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField name='reference' onChange={onChange} helperText="Specific customer generation" size="small" style={{ width: '100%' }} id="outlined-basic" label="Customer Number (Optional)" variant="outlined" />
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type='submit' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Submit</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog fullScreen={fullScreen} open={state.datadialog} onClose={handleClickDialogClose} aria-labelledby="responsive-dialog-title" >
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} xs={12} md={6}>
                            <Mapa />
                        </Grid>
                        <Grid item xs={12} xs={12} md={6}>
                            <Grid container spacing={2}>
                                {state.columndata != 0 ?
                                    state.columndata.all_images.map((val, index) => {
                                        return <Grid item xs={12} xs={12} md={6}>
                                            <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.path} style={{ width: '100%', height: '250px' }}
                                            // onClick={() => { handleImageOpen(val) }} 
                                            />
                                        </Grid>
                                    })
                                    :
                                    <p>image</p>
                                }
                                <Grid item xs={12} xs={12} md={12}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5" component="h2">Accomplishment Details</Typography>
                                            <Grid container spacing={2}>
                                                {/* // ====== NGC ENTERPRISE START ======= */}
                                                {(state.tableheader !== '50' && state.tableheader !== '51') &&
                                                    <Grid item xs={12} sm={12} md={6}>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Date & Time: {moment(state.columndata.date_accomplished).format('LLLL')}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Location:  {state.columndata.coordinates}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Fieldman: {state.columndata.accom_fieldman_name}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Field Findings: {state.columndata.findings}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Reference No. : {state.columndata.customer_meter_no}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Remarks : {state.columndata.accom_remarks}
                                                        </Typography>
                                                    </Grid>
                                                }
                                                {/* // ====== NGC ENTERPRISE  END ======= */}

                                                {/* // ====== ILO ILO MMSC BRANCH START ======= */}
                                                {state.tableheader == '50' &&
                                                    <Grid item xs={12} sm={12} md={6}>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Date & Time: {moment(state.columndata.date_accomplished).format('LLLL')}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Location:  {state.columndata.coordinates}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Field Findings: {state.columndata.findings}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Reference No. : {state.columndata.customer_meter_no}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Remarks : {state.columndata.accom_remarks}
                                                        </Typography>
                                                    </Grid>
                                                }
                                                {/* // ====== ILO ILO MMSC BRANCH END ======= */}

                                                {/* // ====== IRIGA MMSC BRANCH START ======= */}
                                                {state.tableheader == '51' &&
                                                    <Grid item xs={12} sm={12} md={6}>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Date & Time: {moment(state.columndata.date_accomplished).format('LLLL')}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Location:  {state.columndata.coordinates}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Field Findings: {state.columndata.findings}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Reference No. : {state.columndata.customer_meter_no}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Account No. : {state.columndata.account_number}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Previous Reading : {state.columndata.previous_reading}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Present Reading : {state.columndata.present_reading}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Remarks : {state.columndata.accom_remarks}
                                                        </Typography>
                                                    </Grid>
                                                }
                                                {/* // ====== IRIGA MMSC BRANCH END ======= */}


                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickDialogClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth maxWidth='lg' open={state.printdialog} onClick={() => { handleClickPrintClose() }} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Print Preview</DialogTitle>
                <DialogContent>
                    <PDFViewer style={{ width: '100%', height: 550 }}>
                        <Document>
                            <Page size="A4" style={styles.page} wrap>
                                <View style={{ padding: 10, position: 'relative', }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ padding: 15 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 2 }}>Accomplishment Report</Text>
                                            <Text style={{ fontSize: 12, color: '#065693', lineHeight: 2 }}>Powered by GZONETECH, INC</Text>
                                            <Text style={{ fontSize: 12, lineHeight: 2 }}>Date Accomplished: {moment(state.singleAccom.date_accomplished).format('LLLL')}</Text>
                                        </View>
                                        <View style={{ padding: 15 }}>
                                            <Image style={{ width: 180, height: 50 }} src={home_reducer.getLogo.logo_base64}></Image>
                                            {home_reducer.SelectedBranch.map((val) => {
                                                return <Text style={{ fontSize: 12, lineHeight: 2, margin: 'auto' }}>{val.branch_company}</Text>
                                            })}
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'black', width: '90%', margin: 'auto', height: 2 }} />
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontSize: 14, margin: 'auto' }}>Accomplishment Details</Text>
                                    </View>

                                    {/* // ====== NGC ENTERPRISE START ======= */}
                                    {(state.tableheader !== '50' && state.tableheader !== '51') &&
                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: 10, marginLeft: 25, marginTop: 25 }}>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Fieldman: {state.singleAccom.accom_fieldman_name}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Location: {state.singleAccom.coordinates}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Field Findings: {state.singleAccom.findings}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Reference No.: {state.singleAccom.customer_meter_no}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Remarks : {state.singleAccom.accom_remarks}</Text>
                                        </View>
                                    }
                                    {/* // ====== NGC ENTERPRISE  END ======= */}

                                    {/* // ====== ILO ILO MMSC START ======= */}
                                    {state.tableheader == '50' &&
                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: 10, marginLeft: 25, marginTop: 25 }}>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Location: {state.singleAccom.coordinates}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Field Findings: {state.singleAccom.findings}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Reference No.: {state.singleAccom.customer_meter_no}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Remarks : {state.singleAccom.accom_remarks}</Text>
                                        </View>
                                    }
                                    {/* // ====== ILO ILO MMSC  END ======= */}

                                    {/* // ======IRIGA MMSC BRANCH START ======= */}
                                    {state.tableheader == '51' &&
                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: 10, marginLeft: 25, marginTop: 25 }}>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Location: {state.singleAccom.coordinates}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Account No.: {state.singleAccom.account_number}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Previous Reading: {state.singleAccom.previous_reading}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Present Reading: {state.singleAccom.present_reading}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Field Findings: {state.singleAccom.findings}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Reference No.: {state.singleAccom.customer_meter_no}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Remarks : {state.singleAccom.accom_remarks}</Text>
                                        </View>
                                    }
                                    {/* // ======IRIGA MMSC BRANCH  END ======= */}

                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        {state.singleAccom.all_images_base64 === undefined ?
                                            undefined
                                            :
                                            state.singleAccom.all_images_base64.map((val, index) => {
                                                return <Image src={val} style={{ width: '45%', height: '250px', padding: 5 }} />
                                            })
                                        }
                                    </View>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClickPrintClose() }} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth='lg' open={state.printalldialog} onClose={handleClickPrintAllClose} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Print Preview</DialogTitle>
                <DialogContent>
                    <PDFViewer style={{ width: '100%', minHeight: 550 }}>
                        <Document>
                            <Page size="A4" style={styles.page} wrap orientation='landscape'>
                                <View fixed>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ padding: 15 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 2 }}>Accomplishment Report</Text>
                                            <Text style={{ fontSize: 12, color: '#065693', lineHeight: 2 }}>Powered by GZONETECH, INC</Text>
                                            <Text style={{ fontSize: 12, lineHeight: 2 }}>Date: {home_reducer.dateFrom + ' - ' + home_reducer.dateTo}</Text>
                                        </View>
                                        <View style={{ padding: 15 }}>
                                            <Image style={{ width: 180, height: 50 }} src={home_reducer.getLogo.logo_base64}></Image>
                                            {home_reducer.SelectedBranch.map((val) => {
                                                return <Text style={{ fontSize: 12, lineHeight: 2, margin: 'auto' }}>{val.branch_company}</Text>
                                            })}
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'black', width: '95%', margin: 'auto', height: 2 }} />
                                    {/* // ====== NGC ENTERPRISE START ======= */}
                                    {(state.tableheader !== '50' && state.tableheader !== '51') &&
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', margin: 'auto' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'white' }}>
                                                <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Reference Number</Text></View>
                                                <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Fieldman</Text></View>
                                                <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Field Findings</Text></View>
                                                <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Location</Text></View>
                                                <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Date & Time</Text></View>
                                                <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Remarks</Text></View>
                                                <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Signature/Photo Evidence</Text></View>
                                            </View>
                                        </View>
                                    }
                                    {/* // ====== NGC ENTERPRISE  END ======= */}

                                    {/* ====== ILO ILO MMSC BRANCH HEADER TABLE START ID: 50 ======= */}
                                    {state.tableheader == '50' &&
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', margin: 'auto' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'white' }}>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Reference Number</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Field Findings</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Location</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Date & Time</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Remarks</Text></View>
                                                <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Signature/Photo Evidence</Text></View>
                                            </View>
                                        </View>
                                    }
                                    {/* ====== ILO ILO MMSC BRANCH HEADER TABLE END ID: 50======= */}

                                    {/* ====== IRIGA MMSC BRANCH HEADER TABLE START ID: 51 ======= */}
                                    {state.tableheader == '51' &&
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', margin: 'auto' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'white' }}>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Reference No.</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Account No.</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Previous Reading</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Present Reading</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Field Findings</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Location</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Date & Time</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Remarks</Text></View>
                                                <View style={{ paddingTop: 10, fontSize: 6, width: '20%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 7 }}>Signature/Photo Evidence</Text></View>
                                            </View>
                                        </View>
                                    }
                                    {/* ====== IRIGA MMSC BRANCH HEADER TABLE END ID: 51======= */}

                                </View>
                                {/* // ====== NGC ENTERPRISE START ======= */}
                                {(state.tableheader !== '50' && state.tableheader !== '51') &&
                                    <View>
                                        {accomSearch.map((val, index) => {
                                            var coor = val.coordinates.split(',')
                                            let lat = coor[0];
                                            let long = coor[1];
                                            let remarks = 'N/A'
                                            if (val.accom_remarks !== '' || val.accom_remarks !== null) {
                                                remarks = val.accom_remarks
                                            }
                                            return <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.customer_meter_no}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.accom_fieldman_name}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.findings}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black', display: 'flex', flexDirection: 'column' }}><Text style={{ fontSize: 6 }}>{lat}</Text><Text style={{ fontSize: 6 }}>{long}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.date_accomplished}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '13.3%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{remarks}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderColor: 'black' }}><Image style={{ width: 100, height: 30 }} src={val.image_base64}></Image></View>
                                                </View>
                                            </View>
                                        })}
                                    </View>
                                }
                                {/* // ====== NGC ENTERPRISE  END ======= */}

                                {/* // ====== ILO ILO MMSC BRANCH START ======= */}
                                {state.tableheader == '50' &&
                                    <View>
                                        {accomSearch.map((val, index) => {
                                            var coor = val.coordinates.split(',')
                                            let lat = coor[0];
                                            let long = coor[1];
                                            let remarks = 'N/A'
                                            if (val.accom_remarks !== '' || val.accom_remarks !== null) {
                                                remarks = val.accom_remarks
                                            }
                                            return <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.customer_meter_no}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.findings}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black', display: 'flex', flexDirection: 'column' }}><Text style={{ fontSize: 6 }}>{lat}</Text><Text style={{ fontSize: 6 }}>{long}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.date_accomplished}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{remarks}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderColor: 'black' }}><Image style={{ width: 100, height: 30 }} src={val.image_base64}></Image></View>
                                                </View>
                                            </View>
                                        })}
                                    </View>
                                }
                                {/* // ====== ILO ILO MMSC BRANCH  END ======= */}

                                {/* // ====== IRIGA MMSC BRANCH  START ======= */}
                                {state.tableheader == '51' &&
                                    <View>
                                        {accomSearch.map((val, index) => {
                                            var coor = val.coordinates.split(',')
                                            let lat = coor[0];
                                            let long = coor[1];
                                            let modulos = index % 2
                                            let color = '#ecf0f1'
                                            let remarks = 'N/A'
                                            if (modulos === 0) {
                                                color = 'white'
                                            }
                                            if (val.accom_remarks !== '' || val.accom_remarks !== null) {
                                                remarks = val.accom_remarks
                                            }

                                            return <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: color }}>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Text style={{ fontSize: 7 }}>{val.customer_meter_no}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Text style={{ fontSize: 7 }}>{val.account_number}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Text style={{ fontSize: 7 }}>{val.previous_reading}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Text style={{ fontSize: 7 }}>{val.present_reading}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Text style={{ fontSize: 7 }}>{val.findings}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none', display: 'flex', flexDirection: 'column' }}><Text style={{ fontSize: 6 }}>{lat}</Text><Text style={{ fontSize: 6 }}>{long}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Text style={{ fontSize: 7 }}>{val.date_accomplished}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Text style={{ fontSize: 7 }}>{remarks}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'solid', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderColor: 'none' }}><Image style={{ width: 100, height: 30 }} src={val.image_base64}></Image></View>
                                                </View>
                                            </View>
                                        })}
                                    </View>
                                }
                                {/* // ====== IRIGA MMSC BRANCH   END ======= */}
                            </Page>
                        </Document>
                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickPrintAllClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
                </DialogActions>
            </Dialog>

            <Backdrop style={{ zIndex: 9999 }} className={classes.backdrop} open={home_reducer.loader}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    );
}
export default Schedule_Table;
