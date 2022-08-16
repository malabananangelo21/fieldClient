import React, { useEffect, useRef } from 'react';
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
import Link from '@material-ui/core/Link';

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
import { getHandleBranch, getAccomplishments, getUserLoginData, fetchAccomplishments } from '../../Functions/home_func'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import Mapa from '../../map/map2';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import jsPDF from "jspdf";
import "jspdf-autotable";
import MMSCLOGO from '../../../media/mmsc.png'
import { Drawer, useForkRef } from '@material-ui/core';
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
// import ReactToPrint from "react-to-print";
import PrintIcon from '@material-ui/icons/Print';
import SingleAccomplishment from '../single_accom/single_accom'
function Schedule_Table() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const classes = useStyles();
    const [state, setState] = React.useState({
        branch_id: '',
        date_start: new Date(),
        date_end: new Date(),
        accomplishments: [],
        search: '',
        columndata: [],
        datadialog: false,
        printdialog: false,
        reference: '',
        company: '',
        selectBranch: '',
        disable: true,
        loader: false,
        degree: 0,
        comment: ''
    });
    const dispatch = useDispatch();
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data
        })
    }
    const useRef = React.useRef()
    const home_reducer = useSelector(state => state.home_reducer)
    const matches = useMediaQuery('(max-width:600px)');
    const headerMMSC = ['Reference number', 'Account Number', 'Previous Reading', 'Present Reading', 'Findings', 'Date', 'Signature/Photo Evidence']
    const [page, setPage] = React.useState(0);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
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
            fetchAccomplishments(data).then((response) => {
                console.log(response)
                if (response.length != 0) {
                    dispatch_data('SelectedBranch', state.branch_id)
                    dispatch_data('dateFrom', moment(state.date_start).format('LL'))
                    dispatch_data('dateTo', moment(state.date_end).format('LL'))
                    dispatch_data('accomplishment', response.accomplishments)
                    dispatch_data('getLogo', response.company)
                    NotificationManager.info('Generating Data', 'Data successfully generated', 5000, true)
                    setOpen(false);
                } else {
                    NotificationManager.warning('No Data', 'No record found in selected date or branch', 5000, true)
                }
            })
        }
        setPage(0)
    }
    const handleClickDialogOpen = (data) => {
        let comment = 'No Comment'
        var coordinates = data.coordinates.split(',');
        var latitude = coordinates[0];
        var longitude = coordinates[1];

        dispatch_data('singleAccom', data)
        dispatch_data('latitude', latitude)
        dispatch_data('longitude', longitude)

        if (data.battery.includes('|')) {
            let value = data.battery.split('|')
            comment = value[value.length - 1]
        }
        setState({
            ...state,
            columndata: data,
            datadialog: true,
            comment: comment
        })
    };
    const handleClickDialogClose = () => {
        setState({
            ...state,
            datadialog: false
        })
    };
    const handlePrintDialogOpen = () => {
        setState({
            ...state,
            printdialog: true,
        })
    };
    const handlePrintDialogClose = () => {
        setState({
            ...state,
            printdialog: false
        })
    };
    const ToPrinting = () => {
        return <Grid ref={useRef} container spacing={2}>
            <Grid xs={12} md={6}>
                <Card variant='outlined' style={{ height: '90vh' }}>
                    <CardHeader title="Accomplishment Details" />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Date & Time: {moment(home_reducer.singleAccom.date_accomplished).format('lll')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Fieldman: {home_reducer.singleAccom.user_fname + ' ' + home_reducer.singleAccom.user_lname}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Previous Reading: {home_reducer.singleAccom.previous_reading}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Present Reading: {home_reducer.singleAccom.present_reading}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Field Findings: {home_reducer.singleAccom.findings}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Customer Name: {home_reducer.singleAccom.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Account Number: {home_reducer.singleAccom.account_number}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Reference No. : {home_reducer.singleAccom.meter_number}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography color="textSecondary" component="p">
                                    Comment : {state.comment}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12} md={6}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>

                    </Grid>
                    <Grid xs={12} md={12}>
                        <center>
                            <Mapa />
                            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Albany,+NY&zoom=13&scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true" alt="Google Map of Albany, NY" />
                        </center>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    }
    return (

        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button onClick={handleClickOpen} size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white" }} className={classes.button} endIcon={<TableChartIcon />}>Generate Table</Button>
                    <Button size='small' disabled variant="contained" style={{ marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download</Button>
                </Grid>
                <Grid item md={6}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField size='small' label="Search" variant="outlined" />
                    </div>
                </Grid>
            </Grid>
            <Paper className={classes.root}>
                <TableContainer className={classes.container} style={{ maxHeight: 400, marginTop: 10 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {headerMMSC.map((val) => {
                                    return <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>{val}</TableCell>
                                })}
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {home_reducer.searchTable.map((val, index) => {
                                let display = 'hidden';
                                if (state.display === index) {
                                    display = 'visible'
                                }
                                return <TableRow hover onMouseOver={() => { setState({ ...state, display: index }) }} onMouseLeave={() => { setState({ ...state, display: '' }) }}>
                                    <TableCell >{val.meter_number}</TableCell>
                                    <TableCell >{val.account_number}</TableCell>
                                    <TableCell >{val.previous_reading}</TableCell>
                                    <TableCell >{val.present_reading}</TableCell>
                                    <TableCell >{val.findings}</TableCell>
                                    <TableCell >{moment(val.date_accomplished).format('lll')}</TableCell>
                                    <TableCell >
                                        {val.all_images.length === 1 ?
                                            <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.all_images[0].image_path} style={{ width: 100, height: 50, display: 'inline-block' }} />
                                            :
                                            <Badge badgeContent={val.all_images.length} overlap="circle" color="primary">
                                                <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.all_images[0].image_path} style={{ width: 100, height: 50, display: 'inline-block' }} />
                                            </Badge>
                                        }
                                    </TableCell>
                                    <TableCell >
                                        {display === 'visible' ?
                                            <Typography className={classes.root}>
                                                <Link style={{ color: 'rgba(6,86,147)', cursor: 'pointer' }} onClick={() => { handleClickDialogOpen(val) }}>Information</Link>
                                                {/* &nbsp;&#47;&nbsp;
                                                        <Link style={{ color: 'rgba(6,86,147)' }}>Print</Link> */}
                                            </Typography>
                                            :
                                            <Typography className={classes.root} style={{ visibility: 'hidden' }}>
                                                <Link style={{ color: 'rgba(6,86,147)', cursor: 'pointer' }} >Information</Link>
                                                {/* &nbsp;&#47;&nbsp;
                                                        <Link style={{ color: 'rgba(6,86,147)' }}>Print</Link> */}
                                            </Typography>
                                        }

                                    </TableCell>
                                </TableRow>
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                    component="div"
                    count={0}
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




            <Dialog fullScreen={fullScreen} open={state.datadialog} onClose={handleClickDialogClose} aria-labelledby="responsive-dialog-title" >
                <DialogActions>
                    <Button onClick={handleClickDialogClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} displayPrint="none">Close</Button>
                </DialogActions>
                <DialogContent>
                    <Grid container spacing={2}>

                        <Grid xs={12} md={6}>
                            <Grid container spacing={2}>
                                {state.columndata != 0 ?
                                    state.columndata.all_images.map((val, index) => {
                                        return <Grid item xs={12} md={6}>
                                            <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.image_path} style={{ width: '100%', height: '250px' }} />
                                        </Grid>
                                    })
                                    :
                                    <p>image</p>
                                }
                                <Grid xs={12} md={12}>
                                    <center>
                                        <Mapa />
                                    </center>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Card variant='none'>
                                <CardHeader title="Accomplishment Details" />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Date & Time: {moment(home_reducer.singleAccom.date_accomplished).format('lll')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Fieldman: {home_reducer.singleAccom.user_fname + ' ' + home_reducer.singleAccom.user_lname}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Previous Reading: {home_reducer.singleAccom.previous_reading}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Present Reading: {home_reducer.singleAccom.present_reading}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Field Findings: {home_reducer.singleAccom.findings}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Customer Name: {home_reducer.singleAccom.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Account Number: {home_reducer.singleAccom.account_number}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Reference No. : {home_reducer.singleAccom.meter_number}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography color="textSecondary" component="p">
                                                Comment : {state.comment}
                                            </Typography>
                                        </Grid>
                                        {/* <Grid item xs={12} sm={12} md={12} displayPrint="none">
                                            <ReactToPrint

                                                trigger={() => <Button size='small' style={{ backgroundColor: 'rgba(6,86,147)', color: 'white' }} variant="contained" className={classes.button} endIcon={<PrintIcon />}>Print</Button>}
                                                content={() => useRef.current}
                                            />
                                            <div style={{ display: 'none' }}><ToPrinting ref={useRef} /></div>
                                            <Button style={{ backgroundColor: 'rgba(6,86,147)', color: 'white' }} onClick={() => handlePrintDialogOpen()}>Print</Button>
                                        </Grid> */}

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>

            </Dialog>

            <Dialog fullScreen={fullScreen} open={state.printdialog} onClose={handlePrintDialogClose} aria-labelledby="responsive-dialog-title" >
                <DialogActions>
                    <Button onClick={handlePrintDialogClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} displayPrint="none">Close</Button>
                </DialogActions>
                <DialogContent>
                    <Mapa />
                </DialogContent>

            </Dialog>
        </div >
    );
}
export default Schedule_Table;
