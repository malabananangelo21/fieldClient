import MarkerClusterer from "@google/markerclusterer";
import DateFnsUtils from "@date-io/date-fns";
// import MarkerClusterer from '@google/markerclustererplus';
import {
    Button,
    Card,
    Grid,
    IconButton,
    Typography,
    CardContent,
    TextField,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// import ReactTooltip from "react-tooltip";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
// import 'mapbox-gl/dist/mapbox-gl.css';
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CloseIcon from "@material-ui/icons/Close";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FilterListIcon from "@material-ui/icons/FilterList";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Draggable from "react-draggable";
import Carousel from "react-material-ui-carousel";
// import { getData, sqlData } from '../../../api/api';
import { useDispatch, useSelector } from "react-redux";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DialogActions from '@material-ui/core/DialogActions';

import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
    customTable: {
        "& .MuiTableCell-sizeSmall": {
            padding: "5px 0px 5px 15px" // <-- arbitrary value
        }
    },
    fontSize: {
        fontSize: 12
    },
    fontSizeHeader: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    fontSizeTotal: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    fontSizeIcon: {
        fontSize: 10,
        color: '#115293'
    }
});

function FieldmanDetails() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log('FieldmanDetails')

    return (
        <Card style={{ backgroundColor: '#fff', position: "absolute", top: 260, left: 10, padding: 10 }}>
            <div>
                <Table hover classes={{ root: classes.customTable }} size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell className={classes.fontSizeHeader}>NAME</TableCell>
                            <TableCell className={classes.fontSizeHeader}>ASSNED</TableCell>
                            <TableCell className={classes.fontSizeHeader}>ACCOM</TableCell>
                            <TableCell className={classes.fontSizeHeader}>REMAIN</TableCell>

                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE Jane</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon style={{ cursor: 'pointer' }} onClick={handleClickOpen} /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><input type='checkbox' /></TableCell>
                            <TableCell><Typography className={classes.fontSize}>ABEL MARY GRACE</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSize}>250</Typography></TableCell>
                            <TableCell className={classes.fontSizeIcon}><EventNoteIcon /></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell></TableCell>
                            <TableCell><Typography className={classes.fontSizeTotal}>TOTAL</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSizeTotal}>123</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSizeTotal}>500</Typography></TableCell>
                            <TableCell><Typography className={classes.fontSizeTotal}>500</Typography></TableCell>
                            <TableCell></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Date Range"}</DialogTitle>

                    <DialogContent style={{ width: 400 }}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Typography>ABEL MARY GRACE</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant='p'>Start Date</Typography>
                                        <TextField style={{ width: '100%' }} type='date' />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant='p'>End Date</Typography>
                                        <TextField style={{ width: '100%' }} type='date' />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{backgroundColor: "#5f6569",color: "white", }} onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button style={{backgroundColor: "rgba(6,86,147)",color: "white", }} onClick={handleClose} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Card>
    );
}
export default FieldmanDetails;
