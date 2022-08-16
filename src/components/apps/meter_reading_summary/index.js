import React, { useEffect } from "react";
// import '../../../App';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../css/css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
// import InitialTable from './initial_table/initial_table'
import Button from "@material-ui/core/Button";
import TableChartIcon from "@material-ui/icons/TableChart";
import TextField from "@material-ui/core/TextField";
import { Redirect, Link as NewLink } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import FilterListIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import readXlsxFile from "read-excel-file";
import Filter from './filter'

function Index() {
    const home_reducer = useSelector((state) => state.home_reducer);
    const classes = useStyles();

    const [state, setState] = React.useState({
        filter_modal:false
    });

    return (
        <div className={classes.root}>
            <Backdrop
                className={classes.backdrop}
                open={home_reducer.loadingIndex}
                style={{ zIndex: 99999999 }}
            >
                <div className='loader'></div>
            </Backdrop>
            <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                <Link href="#/">Home Page</Link>
                <Typography color="textPrimary">Meter Reading Summary</Typography>
            </Breadcrumbs>

            <div style={{ display: 'flex', alignItems: 'row', justifyContent: 'space-between' }}>
                <Button
                 onClick={() =>
                    setState((prev) => ({ ...prev, filter_modal: true }))
                }
                    variant="contained"
                    size="medium"
                    startIcon={<FilterListIcon />}
                    style={{
                        backgroundColor: "rgb(17, 82, 147)",
                        color: "#fff",
                        marginRight: 10,
                    }}
                >
                    Filter
                </Button>
                <TextField
                    id="standard-textarea"
                    label="Search"
                    placeholder="Search"
                    variant={'outlined'}
                    size="small"
                />
            </div>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={state.filter_modal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="simple-dialog-title">
                    Select Job Order Type
                </DialogTitle>
                <DialogContent>
                    <Filter/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            setState((prev) => ({ ...prev, filter_modal: false }))
                        }
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Index;
