import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Mapa from "../map/map4";
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { useSelector, useDispatch } from "react-redux";
import { getData } from '../../api/api';
import Carousel from "react-material-ui-carousel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
const columns = [
    {
        id: 'meter_number',
        label: 'Meter Number',
    },
    {
        id: 'accom_findings',
        label: 'Findings    ',
        format: (value) => String(value).toLocaleUpperCase(),
    },
    {
        id: 'date_accomplished',
        label: 'Date',
        format: (value) => moment(value).format('MMM DD, YYYY'),
    },
    {
        id: 'date_accomplished',
        label: 'Time',
        format: (value) => moment(value).format('HH:MM'),
    },
    {
        id: 'meter_type',
        label: 'Type',
        format: (value) => String(value).toLocaleUpperCase(),
    },
    {
        id: 'accom_fieldman_name',
        label: 'Fieldman',
        format: (value) => String(value).toLocaleUpperCase(),
    },
    {
        id: 'accom_jo_type',
        label: 'JO Type',
        format: (value) => String(value).toLocaleUpperCase(),
    },
    {
        id: 'installation',
        label: 'Method',
        format: (value) => String(value).toLocaleUpperCase(),
    },
    {
        id: 'accom_remarks',
        label: 'Remarks',
        format: (value) => String(value).toLocaleUpperCase(),
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
        maxHeight: 440,
    },
    customTable: {
        "& .MuiTableCell-sizeSmall": {
            padding: "3px 0px 3px 12px" // <-- arbitrary value
        }
    },
});

export default function TableTrackList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const trackList = useSelector((state) => state.trackAndTraceReducer.trackList);
    const selectedAccom = useSelector((state) => state.trackAndTraceReducer.selectedAccom);
    const selectedBranch = useSelector((state) => state.trackAndTraceReducer.selectedBranch);
    const branchFieldDtails = useSelector((state) => state.trackAndTraceReducer.branchFieldDtails);
    const initialFields = useSelector((state) => state.trackAndTraceReducer.initialFields);         


    const [state, setState] = useState({
        degree: 0
    })
    const dispatch = useDispatch()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onSelected = (row) => {
        let data = {
            accom_id: row.accom_id,
            jo_id: row.id
        }
        dispatch({
            type: 'loading_map',
            data: true
        })
        getData('Tracking/GetAccomDetails', data).then((res) => {
          
            if (res.accomplishment.length > 0) {
                let branch_field_work =  JSON.parse(selectedBranch.branch_field_work)
            let joIndex = branch_field_work.findIndex((val)=>(val ==  res.accomplishment[0].accom_jo_type))
            
            let branch_field_details = []
            let initial = [
                {
                    name: 'Reference No.',
                    key: 'meter_number'
                },
                {
                    name: 'Field Findings',
                    key: 'accom_findings'
                },
                {
                    name: 'Remarks',
                    key: 'accom_remarks'
                },
                {
                    name: 'Reading',
                    key: 'present_reading'
                },
                {
                    name: 'Battery',
                    key: 'accom_battery_life'
                },
                {
                    name: 'Date',
                    key: 'date_accom'
                },
                {
                    name: 'Coordinates',
                    key: 'fetched_coordinates'
                },
            ]
            branch_field_details = initial
            branch_field_details = JSON.parse(selectedBranch.branch_field_details)[joIndex] 

            branch_field_details.forEach((val)=>{
                val.value = res.accomplishment[0][val.key]
            })
            
            dispatch({
                type: 'onChangeTrackAndTrace',
                data: {
                    selectedAccom: res.accomplishment,
                    branchFieldDtails:branch_field_details
                }
            })
                let latlong = String(res.accomplishment[0].fetched_coordinates);
                let splitlatlng = latlong.split(",");
                let lat_data = splitlatlng[0];
                let lng_data = splitlatlng[1];
                dispatch({
                    type: 'latitude',
                    data: lat_data
                })
                dispatch({
                    type: 'longitude',
                    data: lng_data
                })
            setOpenModal(true)

            }else{
                alert('Warning , Data is not yet uploaded!')
            }
            dispatch({
                type: 'loading_map',
                data: false 
            })
        })
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <Paper className={classes.root} variant='outlined'>
            <TableContainer style={{ maxHeight: 420 }}>
                <Table stickyHeader aria-label="sticky table" classes={{ root: classes.customTable }} >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{ color: '#fff', backgroundColor: '#115293' }}
                            >
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, color: '#fff', backgroundColor: '#115293' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trackList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell> <OpenInNewIcon onClick={() => onSelected(row)} style={{ color: '#115293', cursor: 'pointer',display:row.accom_id != ''?undefined:'none' }} /></TableCell>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format ? column.format(value) : value}
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
                count={trackList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={openModal}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                    {selectedAccom.map((val, index) => {
                        let images = [];
                        if (val.accom_images !== "" && val.accom_images !== null) {
                            images = JSON.parse(val.accom_images);
                        }
                        return <Grid container spacing={1} key={index}>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Carousel style={{}} autoPlay={false} >
                                            {images.map((images, index) => {
                                                return (
                                                    <TransformWrapper
                                                        defaultScale={1}
                                                        defaultPositionX={200}
                                                        defaultPositionY={100}
                                                    >
                                                        {({
                                                            zoomIn,
                                                            zoomOut,
                                                            resetTransform,
                                                            ...rest
                                                        }) => (
                                                            <React.Fragment>
                                                                <div
                                                                    className="tools"
                                                                    style={{
                                                                        position: "absolute",
                                                                        display: "flex",
                                                                        flexDirection: "row",

                                                                        marginTop: 10,
                                                                        marginLeft: 10,
                                                                        marginBottom: 10,
                                                                    }}
                                                                >
                                                                    <IconButton
                                                                        style={{
                                                                            backgroundColor: "rgba(0,0,0,0.6)",
                                                                            fontWeight: "bold",
                                                                            color: "#fff",
                                                                            borderStyle: "none",
                                                                            fontSize: 20,
                                                                            marginRight: 7,
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderRadius: 40 / 2,
                                                                            // borderRadius: 3,
                                                                            outline: "none",
                                                                            zIndex: 999999999999999999,
                                                                        }}
                                                                        onClick={zoomIn}
                                                                    >
                                                                        <AddIcon
                                                                            style={{
                                                                                color: "#fff",
                                                                                fontSize: 15,
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                    <br />
                                                                    <IconButton
                                                                        style={{
                                                                            backgroundColor: "rgba(0,0,0,0.6)",
                                                                            fontWeight: "bold",
                                                                            color: "#fff",
                                                                            borderStyle: "none",
                                                                            fontSize: 20,
                                                                            marginRight: 7,
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderRadius: 40 / 2,
                                                                            // borderRadius: 3,
                                                                            outline: "none",
                                                                            zIndex: 999999999999999999,
                                                                        }}
                                                                        onClick={zoomOut}
                                                                    >
                                                                        <RemoveIcon
                                                                            style={{
                                                                                color: "#fff",
                                                                                fontSize: 22,
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                    <br />
                                                                    <IconButton
                                                                        style={{
                                                                            backgroundColor: "rgba(0,0,0,0.6)",
                                                                            fontWeight: "bold",
                                                                            color: "#fff",
                                                                            borderStyle: "none",
                                                                            fontSize: 20,
                                                                            marginRight: 7,
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderRadius: 40 / 2,
                                                                            // borderRadius: 3,
                                                                            outline: "none",
                                                                            zIndex: 999999999999999999,
                                                                        }}
                                                                        onClick={resetTransform}
                                                                    >
                                                                        <ClearIcon
                                                                            style={{
                                                                                color: "#fff",
                                                                                fontSize: 22,
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        style={{
                                                                            backgroundColor: "rgba(0,0,0,0.6)",
                                                                            fontWeight: "bold",
                                                                            color: "#fff",
                                                                            borderStyle: "none",
                                                                            fontSize: 20,
                                                                            marginRight: 7,
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderRadius: 40 / 2,
                                                                            // borderRadius: 3,
                                                                            outline: "none",
                                                                            zIndex: 999999999999999999,
                                                                        }}
                                                                        onClick={() => {
                                                                            setState(prev => ({ ...prev, degree: state.degree - 90, }))
                                                                        }}
                                                                    >
                                                                        <RotateLeftIcon
                                                                            style={{
                                                                                color: "#fff",
                                                                                fontSize: 22,
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        style={{
                                                                            backgroundColor: "rgba(0,0,0,0.6)",
                                                                            fontWeight: "bold",
                                                                            color: "#fff",
                                                                            borderStyle: "none",
                                                                            fontSize: 20,
                                                                            marginRight: 7,
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderRadius: 40 / 2,
                                                                            zIndex: 999999999999999999,
                                                                        }}
                                                                        onClick={() => {
                                                                            setState(prev => ({ ...prev, degree: state.degree + 90, }))
                                                                        }}
                                                                    >
                                                                        <RotateRightIcon
                                                                            style={{
                                                                                color: "#fff",
                                                                                fontSize: 22,
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                </div>
                                                                <TransformComponent
                                                                    style={{ zIndex: 999 }}
                                                                >
                                                                    <img
                                                                        // onClick={() => {
                                                                        //   onCLickImage(images);
                                                                        // }}
                                                                        src={
                                                                            "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                                                                            images.path
                                                                        }
                                                                        alt="test"
                                                                        style={{
                                                                            width: window.innerWidth * 0.500,
                                                                            height: window.innerHeight * 0.450,
                                                                            transform:
                                                                                "rotate(" +
                                                                                String(state.degree) +
                                                                                "deg)",
                                                                        }}
                                                                    />
                                                                </TransformComponent>
                                                            </React.Fragment>
                                                        )}
                                                    </TransformWrapper>

                                                );
                                            })
                                            }</Carousel>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Mapa />
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <TableContainer style={{ maxHeight: 490  }}>
                                            <Table hover stickyHeader aria-label="sticky table" classes={{ root: classes.customTable }} size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{background:'#115293'}}> <Typography style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Details</Typography></TableCell>
                                                        <TableCell  style={{background:'#115293'}}></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {branchFieldDtails.map((val) => {
                                                            return <TableRow>
                                                            <TableCell style={{ fontWeight: 600 }}>{String(val.name).toLocaleUpperCase()}</TableCell>
                                                            <TableCell>{String(val?.value == undefined?'':val?.value).toLocaleUpperCase()}</TableCell>
                                                        </TableRow>
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>

                    })}



                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} style={{ backgroundColor: '#1b5ea0' }}>
                        <Typography style={{ color: '#fff' }}>
                            Close
                        </Typography>

                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}