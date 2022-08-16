import DateFnsUtils from '@date-io/date-fns';
import Backdrop from '@material-ui/core/Backdrop';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import RemoveIcon from '@material-ui/icons/Remove';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import TableChartIcon from '@material-ui/icons/TableChart';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';
import React, { useEffect } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import ReactExport from "react-data-export";
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import '../../../../App';
import useStyles from '../../../../css/css';
import { getAccomplishments, getHandleBranch, getUserLoginData } from '../../Functions/home_func';
import Mapa from '../../map/map';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const columns = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'fieldman',
        label: 'Fieldman',
    },
    // {
    //     id: 'meternumber',
    //     label: 'Meter Number',
    // },
    {
        id: 'customermeternumber',
        label: 'Reference Number',
    },
    {
        id: 'fieldfindings',
        label: 'Field Findings',
    },
    {
        id: 'timeaccomplishments',
        label: 'Date & Time',
    },
    // {
    //     id: 'image',
    //     label: 'Signature/Photo Evidence',
    // },
];

const columns2 = [
    // {
    //     id: 'id',
    //     label: 'ID',
    // },
    // {
    //     id: 'fieldman',
    //     label: 'Fieldman',
    // },

    {
        id: 'customermeternumber',
        label: 'Reference Number',
    },

    // {
    //     id: 'customername',
    //     label: 'Customer',
    // },
    {
        id: 'account_number',
        label: 'Account Number',
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
        id: 'fieldfindings',
        label: 'Field Findings',
    },
    {
        id: 'comment',
        label: 'Comment',
        width: 140,
    },
    {
        id: 'timeaccomplishments',
        label: 'Date & Time',
    },
    // {
    //     id: 'image',
    //     label: 'Signature/Photo Evidence',
    // },
];




function Schedule_Table() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:600px)');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        setState({
            ...state,
            reference: '',
            branch_id: ''
        })
        dispatch_data('SelectedBranches', [])

    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleImageOpen = (data) => {
        dispatch_data('image', data)
        setImage(true);
    };
    const handleImageClose = () => {
        setImage(false);
    };
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

    });
    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
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

    const home_reducer = useSelector(state => state.home_reducer)
    const onSubmit = (e) => {
        e.preventDefault();
        let data = {
            parameter: 'branch_id',
            reference: state.reference,
            selection: state.branch_id,
            date_start: moment(state.date_start).format('YYYY-MM-DD'),
            type: 'download',
            date_end: moment(state.date_end).format('YYYY-MM-DD'),
            company_id: state.company
        }
        if (state.branch_id == '') {
            NotificationManager.warning('Warning', 'Please complete the details', 5000, true)
        } else {
            dispatch_data('accomLoading', true)
            getAccomplishments(data).then((response) => {
                console.log(state.branch_id)
                if (response.accomplishment.length != 0) {
                    dispatch_data('SelectedBranch', state.branch_id)
                    dispatch_data('dateFrom', moment(state.date_start).format('LL'))
                    dispatch_data('dateTo', moment(state.date_end).format('LL'))
                    NotificationManager.info('Generating Data', 'Data successfully generated', 5000, true)
                    setState({ ...state, disable: false })
                } else {
                    NotificationManager.warning('No Data', 'No record found in selected date or branch', 5000, true)
                }
                dispatch_data('accomLoading', false)
                dispatch_data('accomplishment', response.accomplishment)
                dispatch_data('getLogo', response.logo[0])
            })
        }
        setPage(0)
    }
    const passLat = (data) => {
        var coordinates = data.coordinates.split(',');
        var latitude = coordinates[0];
        var longitude = coordinates[1];
        dispatch_data('latitude', latitude)
        dispatch_data('longitude', longitude)
    }
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data
        })
    }
    const search_accom = (e) => {
        dispatch_data('search', e.target.value)
        setPage(0)
    }
    const handleClickDialogOpen = (data) => {
        // console.log(data)
        setState({
            ...state,
            columndata: data,
            datadialog: true,
        })
        // dispatch_data('singleAccom', data)
    };
    const handleClickDialogClose = () => {
        setState({
            ...state,
            datadialog: false
        })
    };
    const handleClickPrintAllOpen = () => {
        // home_reducer.selectedBranch.map((val) => {
        //     dispatch_data('SelectedNameBranch', val.branch_company)
        // })
        dispatch_data('SelectedNameBranch', home_reducer.SelectedBranch[0].branch_company)
        setState({
            ...state,
            printalldialog: true,
        })
    };
    const handleClickPrintAllClose = () => {
        setState({
            ...state,
            printalldialog: false
        })
    };

    const handleClickPrintOpen = (data) => {
        setState({
            ...state,
            columndata: data,
            printdialog: true,
        })
        dispatch_data('singleAccom', data)
    };
    const handleClickPrintClose = () => {
        setState({
            ...state,
            printdialog: false
        })
    };
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const generate = () => {
        const marginLeft = 40;
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const doc = new jsPDF(orientation, unit, size);
        let title = home_reducer.SelectedBranch[0].branch_company + ' ' + home_reducer.dateFrom + ' - ' + home_reducer.dateTo
        var img = new Image()
        img.src = home_reducer.getLogo.logo_base64
        doc.setFontSize(20)
        doc.addImage(home_reducer.getLogo.logo_base64, 'PNG', 550, 20, 240, 40)
        doc.text('Accomplishment Report', 40, 35, { align: 'left' })
        doc.setFontSize(11)
        doc.text('Company - ' + home_reducer.SelectedBranch[0].branch_company, 40, 55, { align: 'left' })
        doc.text('Date Start - ' + home_reducer.dateFrom, 40, 75, { align: 'left' })
        doc.text('Date End - ' + home_reducer.dateTo, 40, 95, { align: 'left' })
        doc.text('Powered by PACIFICWEB SYSTEMS', 750, 80, { align: 'right' })
        doc.autoTable({
            startY: 105,
            columnStyles: { cellWidth: 'auto' },
            columnStyles: { 6: { cellWidth: 120 }, 4: { cellWidth: 90 }, 5: { cellWidth: 70 } },
            html: '#mytable',
            headerStyles: { CellHeight: 20, hAlign: 'center' },
            bodyStyles: { minCellHeight: 70, hAlign: 'center', valign: 'middle' },
            didDrawCell: function (data) {
                if (state.branch_id === '51' || state.branch_id === '55') {
                    if (data.column.index === 7 && data.cell.section === 'body') {
                        var td = data.cell.raw;
                        var img = td.getElementsByTagName('img')[0];
                        var textPos = data.cell;
                        if (data.cell.raw.getElementsByTagName('img')[0] != undefined && data.cell.raw.getElementsByTagName('img')[0] != '') {
                            doc.addImage(img.src, textPos.x + 15, textPos.y + 15, 80, 40);
                        } else {

                        }
                    }
                } else {
                    if (data.column.index === 4 && data.cell.section === 'body') {
                        var td = data.cell.raw;
                        var img = td.getElementsByTagName('img')[0];
                        var textPos = data.cell;
                        if (data.cell.raw.getElementsByTagName('img')[0] != undefined && data.cell.raw.getElementsByTagName('img')[0] != '') {
                            doc.addImage(img.src, textPos.x + 10, textPos.y + 15, 80, 40);
                        } else {

                        }
                    }
                }
            }
        });
        doc.save(title + ".pdf")
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
    console.log(state.columndata)
    return (

        <div className={classes.root}>
            {!matches ? <>

                <Grid container spacing={3}>
                    <Grid item md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white" }} className={classes.button} onClick={handleClickOpen} endIcon={<TableChartIcon />}>Generate Table</Button>

                        {home_reducer.accountData.btn_priv != 0 ?
                            state.disable === true ?
                                <>
                                    <Button size='small' disabled variant="contained" style={{ marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download as PDF</Button>
                                    <Button size='small' disabled variant="contained" style={{ marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download as Excel</Button>
                                </>
                                :
                                <>
                                    {/* <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} onClick={generate} endIcon={<GetAppIcon />}>Download as PDF</Button> */}
                                    <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} onClick={() => { handleClickPrintAllOpen() }} endIcon={<GetAppIcon />}>Download as PDF</Button>
                                    <ExcelFile filename='Accomplishment Report' element={<Button size='large' variant="contained" style={{ fontSize: '0.8125rem', backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download as Excel</Button>} >
                                        <ExcelSheet data={home_reducer.getAccomplishments} name="Accomplishment">
                                            <ExcelColumn label="Accomplishment ID" value="id" />
                                            <ExcelColumn label="Fieldman" value="fieldman" />
                                            <ExcelColumn label="Reference Number" value="meternumber" />
                                            <ExcelColumn label="Meter Number" value='customermeternumber' />
                                            <ExcelColumn label="Accomplishment Date Time" value='timeaccomplishments' />
                                            <ExcelColumn label="Customer Name" value='customername' />
                                            <ExcelColumn label="Account Number" value='account_number' />
                                            <ExcelColumn label="Findings" value='fieldfindings' />
                                            <ExcelColumn label="Comment" value='comment' />
                                        </ExcelSheet>
                                    </ExcelFile>
                                </>
                            : undefined
                        }

                    </Grid>
                    <Grid item md={6}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TextField size='small' onChange={(e) => { search_accom(e) }} id="outlined-basic" label="Search" variant="outlined" />
                        </div>
                    </Grid>
                </Grid>
            </> : <>
                    <Grid container spacing={2}>
                        <Grid item sm={12} item xs={12}>
                            <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '100%' }} className={classes.button} onClick={handleClickOpen} endIcon={<TableChartIcon />}>Generate Table</Button>
                            {home_reducer.accountData.btn_priv != 0 ?
                                state.disable === true ?
                                    <Button size='small' disabled variant="contained" style={{ width: '100%' }} className={classes.button} endIcon={<GetAppIcon />}>Download</Button>
                                    :
                                    <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", width: '100%' }} className={classes.button} onClick={generate} endIcon={<GetAppIcon />}>Download</Button>
                                : undefined
                            }
                            <TextField style={{ width: '100%' }} size='small' onChange={(e) => { search_accom(e) }} id="outlined-basic" label="Search" variant="outlined" />
                        </Grid>
                        <Grid item sm={12} item xs={12}></Grid>
                    </Grid>
                </>}
            <Paper className={classes.root}>
                <TableContainer component={Paper} style={{ display: 'none' }}>
                    {/* <TableContainer component={Paper}> */}
                    <Table className={classes.table} aria-label="simple table" id='mytable'>
                        <TableHead>
                            {state.branch_id === '51' || state.branch_id === '58' ?
                                <TableRow>
                                    {/* <TableCell align="center" style={{ width: '20%' }}>Fieldman</TableCell> */}
                                    <TableCell align="center" style={{ width: '10%' }}>Reference number</TableCell>
                                    {/* <TableCell align="center" style={{ width: '10%' }}>Costumer</TableCell> */}
                                    <TableCell align="center" style={{ width: '10%' }}>Account Number</TableCell>
                                    <TableCell align="center" style={{ width: '10%' }}>Previous Reading</TableCell>
                                    <TableCell align="center" style={{ width: '10%' }}>Present Reading</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Findings</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Date Time</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Comment</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Signature/Photo Evidence</TableCell>
                                </TableRow>
                                :
                                <TableRow>
                                    <TableCell align="center" style={{ width: '20%' }}>Fieldman</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Reference number</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Findings</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Contact</TableCell>
                                    <TableCell align="center" style={{ width: '20%' }}>Signature/Photo Evidence</TableCell>
                                </TableRow>
                            }

                        </TableHead>
                        <TableBody>
                            {home_reducer.searchTable.map((row, index) => {
                                let email = row.email
                                let number = row.contact
                                return <>
                                    {
                                        state.branch_id === '51' || state.branch_id === '58' ?
                                            <TableRow key={index}>
                                                {/* <TableCell align="center" style={{ width: '20%' }}>{row.fieldman}</TableCell> */}
                                                <TableCell align="center" style={{ width: '10%' }}>{row.customermeternumber}</TableCell>
                                                {/* <TableCell align="center" style={{ width: '10%' }}>{row.customername}</TableCell> */}
                                                <TableCell align="center" style={{ width: '10%' }}>{row.account_number}</TableCell>
                                                <TableCell align="center" style={{ width: '10%' }}>{row.previous_reading}</TableCell>
                                                <TableCell align="center" style={{ width: '10%' }}>{row.present_reading}</TableCell>
                                                <TableCell align="center" style={{ width: '20%' }}>{row.fieldfindings}</TableCell>
                                                <TableCell align="center" style={{ width: '20%' }}>{moment(row.timeaccomplishments).format('lll')}</TableCell>
                                                <TableCell align="center" style={{ width: '20%', wordWrap: 'break-word' }}>{row.comment}</TableCell>
                                                <TableCell align="center" style={{ width: '20%' }}><img src={row.img} /></TableCell>
                                            </TableRow>
                                            :
                                            (row.email != '' || row.contact != 0) ?
                                                <TableRow key={index}>
                                                    <TableCell align="center">{row.fieldman}</TableCell>
                                                    <TableCell align="center">{row.customermeternumber}</TableCell>
                                                    <TableCell align="center">{row.fieldfindings}</TableCell>
                                                    <TableCell align="center">{email}{number}</TableCell>
                                                    <TableCell align="center"><img src={row.img} /></TableCell>
                                                </TableRow>
                                                : <TableRow key={index}>
                                                    <TableCell align="center">{row.fieldman}</TableCell>
                                                    <TableCell align="center">{row.customermeternumber}</TableCell>
                                                    <TableCell align="center">{row.fieldfindings}</TableCell>
                                                    <TableCell align="center">N/A</TableCell>
                                                    <TableCell align="center"><img src={row.img} /></TableCell>
                                                </TableRow>
                                    }
                                </>

                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer id='accom_table' className={classes.container} style={{ maxHeight: 400, marginTop: 10 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {state.branch_id === '51' || state.branch_id === '58' ?
                                    columns2.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ width: column.width, backgroundColor: "rgba(6,86,147)", color: "white" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )) :
                                    columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: "rgba(6,86,147)", color: "white" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))
                                }
                                < TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>
                                    Signature/Photo Evidence
                                </TableCell>
                                < TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {home_reducer.accomLoading ?
                                state.branch_id === '51' || state.branch_id === '58' ?
                                    <>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                        </TableRow>
                                    </>
                                    :
                                    <>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={20} width="70%" variant="text" /></TableCell>
                                            <TableCell><Skeleton animation="wave" height={70} variant="text" /></TableCell>
                                        </TableRow>
                                    </>
                                :
                                home_reducer.searchTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {state.branch_id === '51' || state.branch_id === '58' ?
                                                columns2.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}
                                                        >
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })
                                                :
                                                columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}
                                                        >
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                            <TableCell >
                                                {row.all_images.length === 1 ?
                                                    <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + row.all_images[0].image_path} style={{ width: 100, height: 50, display: 'inline-block' }} />
                                                    :
                                                    <Badge badgeContent={row.all_images.length} overlap="circle" color="primary">
                                                        <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + row.all_images[0].image_path} style={{ width: 100, height: 50, display: 'inline-block' }} />
                                                    </Badge>
                                                }

                                            </TableCell>
                                            <TableCell >
                                                <center style={{ display: 'flex', flexDirection: 'row', }}>
                                                    <Typography style={{ cursor: 'pointer', color: "rgba(6,86,147)" }} onClick={() => {
                                                        handleClickDialogOpen(row);
                                                        passLat(row)
                                                    }}
                                                    >View</Typography>
                                                    {home_reducer.accountData.btn_priv != 0 ?
                                                        <>
                                                            &nbsp;&#47;&nbsp;
                                                    <Typography style={{ cursor: 'pointer', color: "rgba(6,86,147)" }} onClick={() => { handleClickPrintOpen(row); passLat(row) }}>Download</Typography>
                                                        </> :
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
                    rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                    component="div"
                    count={home_reducer.searchTable.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" >
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
                                <FormControl size='small' className={classes.formControl}>
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
                                <FormControl size='small' className={classes.formControl}>
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
                                            <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.image_path} style={{ width: '100%', height: '250px' }} onClick={() => { handleImageOpen(val) }} />
                                        </Grid>
                                    })
                                    :
                                    <p>image</p>
                                }
                                <Grid item xs={12} xs={12} md={12}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">Accomplishment Details</Typography>
                                            {state.branch_id === '51' || state.branch_id === '58' ?
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <Typography color="textSecondary" component="p">
                                                            Date & Time: {state.columndata.timeaccomplishments}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Location: {state.columndata.coordinates}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Messenger: {state.columndata.fieldman}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Previous Reading: {state.columndata.previous_reading}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Present Reading: {state.columndata.present_reading}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Field Findings: {state.columndata.fieldfindings}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Customer Name: {state.columndata.customername}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Account Number: {state.columndata.account_number}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Reference No. : {state.columndata.customermeternumber}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Comment : {state.columndata.comment}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                :
                                                state.branch_id === '49' ?
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Date & Time: {state.columndata.timeaccomplishments}
                                                            </Typography>
                                                            <Typography color="textSecondary" component="p">
                                                                Location: {state.columndata.coordinates}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Messenger: {state.columndata.fieldman}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Field Findings: {state.columndata.fieldfindings}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Customer No. : {state.columndata.customermeternumber}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Comment : {state.columndata.comment}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    : <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Date & Time: {state.columndata.timeaccomplishments}
                                                            </Typography>
                                                            <Typography color="textSecondary" component="p">
                                                                Location: {state.columndata.coordinates}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Messenger: {state.columndata.fieldman}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Field Findings: {state.columndata.fieldfindings}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Customer No. : {state.columndata.customermeternumber}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Comment : {state.columndata.comment}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                            }
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
            <Dialog fullWidth maxWidth='sm' open={image} onClose={handleImageClose} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Image Preview</DialogTitle>
                <DialogContent>
                    <TransformWrapper
                        defaultScale={1}
                        defaultPositionX={200}
                        defaultPositionY={100}
                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <React.Fragment>
                                <center>
                                    <ButtonGroup size='small' variant="text" >
                                        <Button onClick={zoomIn} endIcon={<AddIcon />}>Zoom&nbsp;in</Button>
                                        <Button onClick={zoomOut} endIcon={<RemoveIcon />}>Zoom&nbsp;out</Button>
                                        <Button onClick={() => {
                                            setState({
                                                ...state,
                                                degree: state.degree - 90
                                            })
                                        }} endIcon={<RotateLeftIcon />}>Rotate&nbsp;Left</Button>
                                        <Button onClick={() => {
                                            setState({
                                                ...state,
                                                degree: state.degree + 90
                                            })
                                        }} endIcon={<RotateRightIcon />}>Rotate&nbsp;Right</Button>
                                    </ButtonGroup>
                                    <TransformComponent>
                                        <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + home_reducer.image.image_path} alt="test" style={{ width: '100%', height: '400px', transform: 'rotate(' + String(state.degree) + 'deg)' }} />
                                    </TransformComponent>
                                </center>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth maxWidth='sm' open={image} onClose={handleImageClose} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Image Preview</DialogTitle>
                <DialogContent>
                    <TransformWrapper
                        defaultScale={1}
                        defaultPositionX={200}
                        defaultPositionY={100}
                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <React.Fragment>
                                <center>
                                    <ButtonGroup size='small' variant="text" >
                                        <Button onClick={zoomIn} endIcon={<AddIcon />}>Zoom&nbsp;in</Button>
                                        <Button onClick={zoomOut} endIcon={<RemoveIcon />}>Zoom&nbsp;out</Button>
                                        <Button onClick={() => {
                                            setState({
                                                ...state,
                                                degree: state.degree - 90
                                            })
                                        }} endIcon={<RotateLeftIcon />}>Rotate&nbsp;Left</Button>
                                        <Button onClick={() => {
                                            setState({
                                                ...state,
                                                degree: state.degree + 90
                                            })
                                        }} endIcon={<RotateRightIcon />}>Rotate&nbsp;Right</Button>
                                    </ButtonGroup>
                                    <TransformComponent>
                                        <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + home_reducer.image.image_path} alt="test" style={{ width: '100%', height: '400px', transform: 'rotate(' + String(state.degree) + 'deg)' }} />
                                    </TransformComponent>
                                </center>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
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
                                            <Text style={{ fontSize: 12, lineHeight: 2, margin: 'auto' }}>{home_reducer.SelectedNameBranch}</Text>
                                        </View>
                                    </View>
                                    {state.branch_id === '51' || state.branch_id === '58' ?
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'white' }}>
                                                <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Reference Number</Text></View>
                                                <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Account Number</Text></View>
                                                <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Previous Reading</Text></View>
                                                <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Present Reading</Text></View>
                                                <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Findings</Text></View>
                                                <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Comment</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Signature/Photo Evidence</Text></View>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'white' }}>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Reference Number</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Fieldman</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Field Findings</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Location</Text></View>
                                                <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Date & Time</Text></View>
                                                <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: 'white', color: 'white', backgroundColor: '#065693' }}><Text style={{ fontSize: 10 }}>Signature/Photo Evidence</Text></View>
                                            </View>
                                        </View>
                                    }
                                </View>
                                <View>
                                    {home_reducer.getAccomplishments.map((val, index) => {
                                        return state.branch_id === '51' || state.branch_id === '58' ?
                                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.customermeternumber}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.account_number}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.previous_reading}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.present_reading}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.fieldfindings}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.comment}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderColor: 'black' }}><Image style={{ width: 100, height: 30 }} src={val.img}></Image></View>
                                                </View>

                                            </View>
                                            :
                                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.customermeternumber}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.fieldman}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.fieldfindings}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.fieldfindings}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '16%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderRight: 'none', borderColor: 'black' }}><Text style={{ fontSize: 10 }}>{val.timeaccomplishments}</Text></View>
                                                    <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderWidth: 1, borderBottom: 'none', borderLeft: 'none', borderColor: 'black' }}><Image style={{ width: 100, height: 30 }} src='data:image/jpeg;base64,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'></Image></View>
                                                </View>
                                            </View>
                                    })}
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickPrintAllClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth='lg' open={state.printdialog} onClose={handleClickPrintClose} aria-labelledby="responsive-dialog-title" >
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
                                            <Text style={{ fontSize: 12, lineHeight: 2 }}>Date Accomplished: {home_reducer.singleAccom.timeaccomplishments}</Text>
                                        </View>
                                        <View style={{ padding: 15 }}>
                                            <Image style={{ width: 180, height: 50 }} src={home_reducer.getLogo.logo_base64}></Image>
                                            <Text style={{ fontSize: 12, lineHeight: 2, margin: 'auto' }}>{home_reducer.SelectedNameBranch}</Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'black', width: '90%', margin: 'auto', height: 2 }} />
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontSize: 14, margin: 'auto' }}>Accomplishment Details</Text>
                                    </View>
                                    {state.branch_id === '51' || state.branch_id === '58' ?
                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: 10, marginLeft: 25, marginTop: 25 }}>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Messenger: {home_reducer.singleAccom.fieldman}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Location: {home_reducer.singleAccom.coordinates}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Previous Reading: {home_reducer.singleAccom.previous_reading}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Present Reading: {home_reducer.singleAccom.present_reading}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Field Findings: {home_reducer.singleAccom.fieldfindings}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Customer Name: {home_reducer.singleAccom.customername}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Account Number: {home_reducer.singleAccom.account_number}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Reference No.: {home_reducer.singleAccom.customermeternumber}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, fontStyle: 'normal' }}>Comment : {home_reducer.singleAccom.comment}</Text>
                                        </View>
                                        :
                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: 10, marginLeft: 25, marginTop: 25 }}>
                                            {/* <Text style={{ fontSize: 12, letterSpacing: 2, lineHeight: 2, fontStyle: 'normal' }}>Date & Time: {home_reducer.singleAccom.timeaccomplishments}</Text> */}

                                            <Text style={{ fontSize: 12, letterSpacing: 2, lineHeight: 2, fontStyle: 'normal' }}>Messenger: {home_reducer.singleAccom.fieldman}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, lineHeight: 2, fontStyle: 'normal' }}>Location: {home_reducer.singleAccom.coordinates}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, lineHeight: 2, fontStyle: 'normal' }}>Field Findings: {home_reducer.singleAccom.fieldfindings}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, lineHeight: 2, fontStyle: 'normal' }}>Reference No.: {home_reducer.singleAccom.customermeternumber}</Text>

                                            <Text style={{ fontSize: 12, letterSpacing: 2, lineHeight: 2, fontStyle: 'normal' }}>Comment : {home_reducer.singleAccom.comment}</Text>
                                        </View>
                                    }
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        {state.columndata.all_images_base64 === undefined ?
                                            undefined
                                            :
                                            state.columndata.all_images_base64.map((val, index) => {
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
                    <Button onClick={handleClickPrintClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
                </DialogActions>
            </Dialog>
            <Backdrop className={classes.backdrop} open={state.loader} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    );
}
export default Schedule_Table;
