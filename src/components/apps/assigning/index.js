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
import FilterData from './filter_data';
import JobOrderTable from './job_order_table';
import AssignFieldman from './assign_fieldman';
const JobOrderTableComponents = React.memo(({ props }) => {
  return <JobOrderTable />
});
const AssignFieldmanComponents = React.memo(({ props }) => {
  return <AssignFieldman />
});
function Index() {
  const dispatch = useDispatch();
  const home_reducer = useSelector((state) => state.home_reducer);
  const classes = useStyles();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    filter: false,
    loading: false
  });
  const closeModal = () => {
    setState({ ...state, filter: false });
  }

  const assigning_reducer = useSelector((state) => state.assigning_reducer);
  let jo = assigning_reducer.job_order_to_be_assign
  return (
    <div className={classes.root}>
      <Backdrop
        className={classes.backdrop}
        open={home_reducer.loadingIndex}
        // onClick={() => dispatch_data("LoadingIndex", false)}
        style={{ zIndex: 99999999 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
        <Link style={{ color: '#3973b6', fontWeight: 'bold', fontSize: 17 }} href="#/">Home Page</Link>
          <Typography style={{ color: '#444b5a', fontWeight: 'bold', fontSize: 17 }}>Assigning Job Orders</Typography>
        </Breadcrumbs>
      <NotificationContainer />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Button
            onClick={() => {
              setState({ ...state, filter: true });
            }}
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginRight: 5,
            }}
            className={classes.button}
            endIcon={<FilterListIcon />}
          >
            Filter
          </Button>
        </Grid>


      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <JobOrderTableComponents jo={jo} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AssignFieldmanComponents jo={jo} />
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.filter}
        onClose={() => {
          setState({ ...state, filter: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Filter</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              style={{ color: "#000" }}
              onClick={() => {
                setState({ ...state, filter: false });
              }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <FilterData closeModal={() => closeModal()} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;
