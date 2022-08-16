import React, { useEffect, useRef } from 'react';
import '../../../../App'
import useStyles from '../../../../css/css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableChartIcon from '@material-ui/icons/TableChart';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Mapa from '../../map/map2';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RemoveIcon from '@material-ui/icons/Remove';
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from 'moment'
import { getAccomplishments, getUserLoginData } from '../../Functions/home_func'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getData } from '../../../api/api'
import TablePagination from '@material-ui/core/TablePagination';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}





function Schedule_Table() {
    const dispatch = useDispatch();
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data
        })
    }
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
        selectBranch: '',
        disable: true,
        loader: false,
        degree: 0,
        datadialog: false,
        attachmentImg: []

    });
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [secondary, setSecondary] = React.useState(false);

    const handleClickDialogOpen = (data) => {
        console.log(data.all_images)
        let images = []
        data.all_images.map((val) => {
            if (!JSON.stringify(images).includes(val.image_type)) {
                let new_data = {
                    image_type: val.image_type,
                    image_data: [val]
                }
                images.push(new_data)
            }
        })
        let coordinates = data.coordinates.split(',')
        dispatch_data('all_images', images)
        dispatch_data('same_imgType', data.all_images)
        dispatch_data('latitude', coordinates[0])
        dispatch_data('longitude', coordinates[1])
        dispatch_data('singleAccom', data)
        setState({
            ...state,
            datadialog: true,
        })
    };
    const handleClickDialogClose = () => {
        setState({
            ...state,
            datadialog: false
        })
    };
    const handleOnDragStart = (e) => e.preventDefault();

    const [value, setValue] = React.useState(0);

    const home_reducer = useSelector(state => state.home_reducer)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [dense] = React.useState(false);

    const [image, setImage] = React.useState(false);

    const handleImageOpen = () => {
        setImage(true);
    };
    const handleImageClose = () => {
        setImage(false);
    };
    const [attach, setAttach] = React.useState(false);

    const handleAttachOpen = (val) => {
        console.log(val)
        var info = home_reducer.same_imgType.filter((files) => {
            return files.image_type === val
        })
        console.log(info)
        setState({
            ...state,
            attachmentImg: info
        })
        setAttach(true);
    };
    const handleAttachClose = () => {
        setAttach(false);
    };
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
    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
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
        dispatch_data('accomLoading', true)

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
            // dispatch_data('accomLoading', true)
            getData('Tracking/generateAccomplishmentReport', data).then(response => {
                if (response.accomplishments.length != 0) {
                    dispatch_data('accomplishment', response.accomplishments)
                    dispatch_data('SelectedBranch', state.branch_id)
                    dispatch_data('dateFrom', moment(state.date_start).format('LL'))
                    dispatch_data('dateTo', moment(state.date_end).format('LL'))
                    NotificationManager.info('Generating Data', 'Data successfully generated', 5000, true)
                    // setState({ ...state, disable: false })

                } else {
                    NotificationManager.warning('No Data', 'No record found in selected date or branch', 5000, true)
                }
                // dispatch_data('accomLoading', false)
                // dispatch_data('getLogo', response.logo)
                dispatch_data('accomLoading', false)
                setOpen(false);

            })
        }
    }
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const search_accom = (e) => {
        dispatch_data('search2', e.target.value)
        setPage(0)
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button onClick={() => { handleClickOpen() }} size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white" }} className={classes.button} endIcon={<TableChartIcon />}>Generate Table</Button>
                    {/* <Button size='small' variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }} className={classes.button} endIcon={<GetAppIcon />}>Download</Button> */}
                </Grid>
                <Grid item md={6}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField size='small' onChange={(e) => { search_accom(e) }} id="outlined-basic" label="Search" variant="outlined" />
                    </div>
                </Grid>
            </Grid>
            <Paper className={classes.root}>
                <TableContainer style={{ maxHeight: 450, overflow: 'auto', marginTop: 10 }} >
                    <Table stickyHeader className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>BA</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>NAME</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>ADDRESS</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>STATUS</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>WATER</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>MISC.</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>TOTAL AR</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>ISSUE</TableCell>
                                <TableCell style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {home_reducer.searchTable.map((val) => {
                                return <TableRow >
                                    <TableCell>{String(val.BA).toUpperCase()}</TableCell>
                                    <TableCell>{String(val.user_fname + '' + val.user_lname).toUpperCase()}</TableCell>
                                    <TableCell>{String(val.address).toUpperCase()}</TableCell>
                                    <TableCell>{String(val.meter_status).toUpperCase()}</TableCell>
                                    <TableCell>{val.water}</TableCell>
                                    <TableCell>{val.misc}</TableCell>
                                    <TableCell>{val.total_ar}</TableCell>
                                    <TableCell>{String(val.findings).toUpperCase()}</TableCell>
                                    <TableCell>
                                        <IconButton size="small">
                                            <ArrowForwardIcon style={{ color: "rgba(6,86,147)" }} onClick={() => { handleClickDialogOpen(val) }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
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


            <Dialog fullScreen={fullScreen} open={state.datadialog} onClose={handleClickDialogClose} aria-labelledby="responsive-dialog-title" >
                <DialogContent>

                    <Grid container spacing={2}>
                        <Grid item xs={12} xs={12} md={6}>
                            <Mapa />
                        </Grid>
                        <Grid item xs={12} xs={12} md={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} xs={12} md={12}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardMedia
                                            className={classes.media}
                                            title="Contemplative Reptile"
                                        >
                                            <Grid container spacing={2}>
                                                {home_reducer.same_imgType.map((val) => {
                                                    if (val.image_type === '') {
                                                        if (home_reducer.same_imgType.length === 1) {
                                                            return <Grid item sm={12} md={12}>
                                                                <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.image_path} onClick={() => { handleImageOpen() }} style={{ width: '100%', height: '150px' }} />
                                                            </Grid>
                                                        } else if (home_reducer.same_imgType.length === 3) {
                                                            return <Grid item sm={12} md={4}>
                                                                <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.image_path} onClick={() => { handleImageOpen() }} style={{ width: '100%', height: '150px' }} />
                                                            </Grid>
                                                        } else {
                                                            return <Grid item sm={6} md={6}>
                                                                <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.image_path} onClick={() => { handleImageOpen() }} style={{ width: '100%', height: '150px' }} />
                                                            </Grid>
                                                        }
                                                    }
                                                })}
                                            </Grid>
                                        </CardMedia>
                                        <CardContent>
                                            <Typography variant="h6" align='center' component="h2">{home_reducer.singleAccom.findings}</Typography>
                                            <AppBar variant='outlined' position="static" color="default">
                                                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { background: "rgb(6, 86, 147)" } }}>
                                                    <Tab label="Details" {...a11yProps(0)} />
                                                    <Tab label="Attachments" {...a11yProps(1)} />
                                                </Tabs>
                                            </AppBar>
                                            <TabPanel value={value} index={0}>
                                                <Typography variant="subtitle1" component="h2">Investigation Details</Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <Typography color="textSecondary" component="p">
                                                            Account Name:  {home_reducer.singleAccom.name}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Date & Time: {moment(home_reducer.singleAccom.date_accomplished).format('lll')}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Status: {home_reducer.singleAccom.meter_status}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Total AR: {home_reducer.singleAccom.total_ar}
                                                        </Typography>
                                                        <Typography color="textSecondary" component="p">
                                                            Remarks: Other Necessary information gathered
                                                    </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>
                                            <TabPanel value={value} index={1}>
                                                {/* <Typography className={classes.title}> Documents Uploaded</Typography> */}
                                                <List dense={true}>
                                                    {home_reducer.all_images.map((val) => {
                                                        if (val.image_type !== '') {
                                                            return <ListItem button onClick={() => { handleAttachOpen(val.image_type) }} >
                                                                <ListItemIcon>
                                                                    <FolderIcon size='small' />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={val.image_type}
                                                                />
                                                            </ListItem>
                                                        }
                                                    })}

                                                </List>
                                            </TabPanel>


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
                    <TransformWrapper defaultScale={1} defaultPositionX={200} defaultPositionY={100}>
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
                                        <img src={'https://images.locanto.ph/Demolition-Services-We-Buy-Old-House-Building/vap_4585215557.jpg'} alt="test" style={{ width: '100%', height: '400px', transform: 'rotate(' + String(state.degree) + 'deg)' }} />
                                        {/* <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + home_reducer.image.image_path} alt="test" style={{ width: '100%', height: '400px', transform: 'rotate(' + String(state.degree) + 'deg)' }} /> */}
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



            <Dialog fullWidth maxWidth='sm' open={attach} onClose={handleAttachClose} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Attachment Preview</DialogTitle>
                <DialogContent>
                    <AliceCarousel mouseTrackingEnabled fadeOutAnimation>
                        {state.attachmentImg.map((val) => {
                            return <img src={'http://api.pacificweb.com.ph/assets/img/meter/' + val.image_path} style={{ width: '100%', height: '150px' }} />
                        })}
                    </AliceCarousel >
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAttachClose} style={{ backgroundColor: "rgba(6,86,147)", color: "white", marginLeft: 10 }}>Close</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
export default Schedule_Table;
