import React, { useEffect,useRef } from 'react';
import '../../../../App'
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import useStyles from '../../../../css/css';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableChartIcon from '@material-ui/icons/TableChart';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getHandleBranch, getAccomplishments, getUserLoginData } from '../../Functions/home_func'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import Mapa from '../../map/map';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import jsPDF from "jspdf";
import "jspdf-autotable";
import MMSCLOGO from '../../../media/mmsc.png'
import { Drawer } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Badge from '@material-ui/core/Badge';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ReactToPrint from "react-to-print";
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    class ComponentToPrint extends React.Component {
        render() {
            return (
                <table>
                    <thead>
                        <th>column 1</th>
                        <th>column 2</th>
                        <th>column 3</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const componentRef = useRef();
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
        datadialog: false,
        reference: '',
        company: '',
        // people: [
        //     { name: "Keanu Reeves", profession: "Actor" },
        //     { name: "Lionel Messi", profession: "Football Player" },
        //     { name: "Cristiano Ronaldo", profession: "Football Player" },
        //     { name: "Jack Nicklaus", profession: "Golf Player" },
        // ],
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
                dispatch_data('getLogo', response.logo)
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
        setState({
            ...state,
            columndata: data,
            datadialog: true,
        })
        dispatch_data('singleAccom', data)
    };
    const handleClickDialogClose = () => {
        setState({
            ...state,
            datadialog: false
        })
    };
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const generate = () => {
        const marginLeft = 40;
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const doc = new jsPDF(orientation, unit, size);
        // let heading = home_reducer.SelectedBranch[0].branch_company + ' ' + home_reducer.dateFrom + ' - ' + home_reducer.dateTo
        let title = home_reducer.SelectedBranch[0].branch_company + ' ' + home_reducer.dateFrom + ' - ' + home_reducer.dateTo
        var img = new Image()
        img.src = home_reducer.getLogo.logo_base64
        // doc.setFontSize(20)
        // doc.text(heading, marginLeft, 70);
        // doc.setFontSize(7)
        // doc.text('Powered by Pacificweb systems', marginLeft, 100)
        doc.setFontSize(20)
        doc.addImage(home_reducer.getLogo[0].logo_base64, 'PNG', 550, 20, 240, 40)
        doc.text('Accomplishment Report', 40, 35, { align: 'left' })
        doc.setFontSize(11)
        doc.text('Company - ' + home_reducer.SelectedBranch[0].branch_company, 40, 55, { align: 'left' })
        doc.text('Date Start - ' + home_reducer.dateFrom, 40, 75, { align: 'left' })
        doc.text('Date End - ' + home_reducer.dateTo, 40, 95, { align: 'left' })
        doc.text('Powered by PACIFICWEB SYSTEMS', 750, 80, { align: 'right' })

        doc.autoTable({
            startY: 105,
            columnStyles: { cellWidth: 'auto' },
            columnStyles: { 6: { cellWidth: 120 }, 4: { cellWidth: 70 } },
            // columnStyles: {5: {hAlign: 'middle',valign: 'middle' }},
            html: '#mytable',
            //  theme:'plain',
            headerStyles: { CellHeight: 20, hAlign: 'center' },
            bodyStyles: { minCellHeight: 70, hAlign: 'center', valign: 'middle' },
            // bodyStyles: { fontSize: 6, lineColor: '#ecf0f1',  halign : 'center', lineWidth: 0.08,lineColor: '#2f3640'}, 
            // headStyles:{ fontSize: 6 ,valign: 'middle',halign : 'center',  lineWidth: 0.08, lineColor: '#2f3640'},
            didDrawCell: function (data) {
                if (state.branch_id === '51') {
                    if (data.column.index === 7 && data.cell.section === 'body') {
                        var td = data.cell.raw;
                        var img = td.getElementsByTagName('img')[0];
                        var dim = data.cell.height - data.cell.padding('vertical');
                        var textPos = data.cell;
                        if (data.cell.raw.getElementsByTagName('img')[0] != undefined && data.cell.raw.getElementsByTagName('img')[0] != '') {
                            doc.addImage(img.src, textPos.x + 15, textPos.y + 15, 80, 40);
                            // doc.addImage(img.src, 45,45, 120, 30);

                        } else {

                        }

                    }
                } else {
                    if (data.column.index === 4 && data.cell.section === 'body') {
                        var td = data.cell.raw;
                        var img = td.getElementsByTagName('img')[0];
                        var dim = data.cell.height - data.cell.padding('vertical');
                        var textPos = data.cell;
                        if (data.cell.raw.getElementsByTagName('img')[0] != undefined && data.cell.raw.getElementsByTagName('img')[0] != '') {
                            doc.addImage(img.src, textPos.x + 25, textPos.y + 15, 80, 40);
                            // doc.addImage(img.src, 45,45, 120, 30);

                        } else {

                        }

                    }
                }


            }
        });

        doc.save(title + ".pdf")
    }

    return (

        <div className={classes.root}>
            {!matches ? <>

                <Grid container spacing={3}>
                    <Grid item md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white" }} className={classes.button} onClick={handleClickOpen} endIcon={<TableChartIcon />}>Generate Table</Button>

                        {home_reducer.accountData.btn_priv != 0 ?
                            state.disable === true ?
                                <Button size='small' disabled variant="contained" style={{ marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download</Button>
                                :
                                <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} onClick={generate} endIcon={<GetAppIcon />}>Download</Button>
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
                            {state.branch_id === '51' ?
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
                                        state.branch_id === '51' ?
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
                                {state.branch_id === '51' ?
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {home_reducer.accomLoading ?
                                state.branch_id === '51' ?
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => { handleClickDialogOpen(row); passLat(row) }}>
                                            {state.branch_id === '51' ?
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
                                <TextField name='reference' onChange={onChange} helperText="Specific customer generation" size="small" style={{ width: '100%' }} id="outlined-basic" label="Customer Number" variant="outlined" />
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type='submit' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Submit</Button>
                        </div>
                    </form>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions> */}
            </Dialog>

            {/* <Dialog  fullScreen={fullScreen} open={state.datadialog} onClose={handleClickDialogClose} aria-labelledby="responsive-dialog-title" >
                <DialogContent>

                    <Grid container spacing={2}>
                        <Grid item xs={12} xs={12} md={6}>
                            <Mapa />
                        </Grid>
                        <Grid item xs={12} xs={12} md={6}>
                            <Card className={classes.root}>
                                <CardMedia
                                    className={classes.media}
                                    title="Contemplative Reptile"
                                >
                                    <AliceCarousel mouseTrackingEnabled buttonsDisabled fadeOutAnimation>

                                        {state.columndata != 0 ?

                                            state.columndata.all_images.map((val, index) => {
                                                return <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.image_path} style={{ width: '100%', height: '250px' }} />
                                            })
                                            :
                                            <p>image</p>
                                        }

                                    </AliceCarousel >
                                </CardMedia>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Accomplishment Details
          </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Date & Time: {state.columndata.timeaccomplishments}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Messenger: {state.columndata.fieldman}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
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
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickDialogClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog> */}
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
                                            {state.branch_id === '51' ?
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <Typography color="textSecondary" component="p">
                                                            Date & Time: {state.columndata.timeaccomplishments}
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
                                                        {/* <Button onClick={() => window.print()}>Print</Button> */}
                                                    </Grid>
                                                </Grid>
                                                :
                                                state.branch_id === '49' ?
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Date & Time: {state.columndata.timeaccomplishments}
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
                                                            {/* <ReactToPrint
                                                                trigger={() => <button>Print this out!</button>}
                                                                content={() => componentRef.current}
                                                            />
                                                            <ComponentToPrint ref={componentRef} /> */}

                                                        </Grid>
                                                    </Grid>
                                                    : <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                Date & Time: {state.columndata.timeaccomplishments}
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
                                                            {/* <Button onClick={() => window.print()}>Print</Button> */}

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
            <Backdrop className={classes.backdrop} open={state.loader} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    );
}
export default Schedule_Table;
