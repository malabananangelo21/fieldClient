import React, { useEffect } from "react";
// import '../../../App';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../../../css/css";
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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  validate,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import moment from "moment";
// import { getData } from "../../../../../api/api";
function Index({branch_id,company_id,filter_date_start,filter_date_end,closeModal,get_accom_report,job_order,jo_type}) {
  const dispatch = useDispatch();
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);

  const classes = useStyles();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    date_start_val: new Date(filter_date_start),
    date_end_val: new Date(filter_date_end),
    selectedCompany: company_id,
    selected_branch: branch_id,
    selected_jobOrder:"",
    selected_jo_type:jo_type
  });
  const [job_order_type,setJob_order_type] = React.useState([])
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start_val: date,
    });
  };
  const handleDateChangeEnd = (date) => {
    setState({
      ...state,
      date_end_val: date,
    });
  };
  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });
    dispatch_data("SelectedBranches", branches_data);
    setState({
      ...state,
      selectedCompany: e.target.value,
    });
  };
  const onChangeBranch = (e) => {
    let jo_type = []
    home_reducer.SelectedBranches.map((val, index) => {
      if(val.branch_id === e.target.value){
        if(val.branch_field_work !== ""){
          jo_type = JSON.parse(val.branch_field_work) 
        } 
      }
    })
    map_reducer.jo_type = jo_type
    map_reducer.selected_jo = ""
    setState({
      ...state,
      selected_branch: e.target.value,
    });
  };
  const onChangeJobOrder = (e) => {
    map_reducer.selected_jo =  e.target.value
    setState({
      ...state,
    
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
      let date_start = moment(state.date_start_val).format("YYYY-MM-DD")
      let date_end = moment(state.date_end_val).format("YYYY-MM-DD")
      let branch_id =  state.selected_branch
      let branch_name = ''
      home_reducer.SelectedBranches.map((val, index) => {
          if(val.branch_id === branch_id){
            branch_name = val.branch_company
          }
      })
    get_accom_report(date_start,date_end,branch_id,state.selectedCompany,branch_name,map_reducer.selected_jo)
    
  };
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>

        <Grid item xs={12} md={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Filter Date Start"
              format="MM-dd-yyyy"
              name="date_start"
              value={state.date_start_val}
              style={{ width: "100%" }}
              onChange={handleDateChangeStart}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Filter Date End"
              format="MM-dd-yyyy"
              name="date_end"
              value={state.date_end_val}
              style={{ width: "100%" }}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl
            size="small"
            className={classes.formControl}
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
            className={classes.formControl}
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
        <Grid item xs={12} md={12}>
          <FormControl
            size="small"
            className={classes.formControl}
            style={{ width: "100%" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Job Order
            </InputLabel>
            <Select
            required
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={onChangeJobOrder}
              label="branch"
              name="branch_id"
              value={map_reducer.selected_jo}
            >
              {map_reducer.jo_type.map((val,index)=>{
                return <MenuItem value={val}>{val}</MenuItem>
              })
              }
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
  );
}

export default Index;
