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
import { getData } from "../../api/api";
function Index({closeModal}) {
  const assigning_reducer = useSelector((state) => state.assigning_reducer);
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
    date_start_val: new Date(),
    selectedCompany: "",
    selected_branch: "",
    selected_jobOrder:"",
    mru:"",
    job_order_type:[],
    business_area:[],
    selected_ba:"",
    disable_form:false,
    jo_type:[]
  });
  const handleDateChangeStart = (date) => {
    assigning_reducer.date_filter = date
    setState({
      ...state,
      date_start_val: date,
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
    assigning_reducer.assign_company_id =  e.target.value
    setState({
      ...state,
      selectedCompany: e.target.value,
    });
  };
  // const onChangeBranch = (e) => {
  //   assigning_reducer.assign_branch_id =  e.target.value
  //   setState({
  //     ...state,
  //     selected_branch: e.target.value,
  //   });
  // };
  const onChangeBranch = (e) => {
    let jo_type = [];
    let ba = [];
    assigning_reducer.assign_branch_id =  e.target.value
    
    home_reducer.SelectedBranches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
        }
        if (val.business_area !== null && val.business_area !== "") {
          ba = JSON.parse(val.business_area);
        }
      }
    });
    assigning_reducer.ba = ba
    assigning_reducer.jo_type_array = jo_type
    setState({
      ...state,
      selected_branch: e.target.value,
      jo_type: jo_type,
      business_area: ba,
      selected_jobOrder:'',
      selected_ba:''
    });
  };
  const onChangeBA = (e) => {
    setState({
      ...state,
      selected_ba: e.target.value,
      selected_jobOrder:''
    });
  };
  const onChangeJobOrder = (e) => {
    assigning_reducer.jo_type = e.target.value
    setState({
      ...state,
      selected_jobOrder: e.target.value,
    });
  };
  const onSubmit = (e) => {
    dispatch_data("LoadingIndex", true)
    e.preventDefault();
    let data = {
      date_start: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
      company: assigning_reducer.assign_company_id,
      branch:assigning_reducer.assign_branch_id,
      type: "by_mru", 
      mru: state.mru,
      jo_type:assigning_reducer.jo_type,
      selected_ba:state.selected_ba
    };

    getData("Schedule/getJobOrder_by_mru", data).then((res) => {
      getData('Audit/getFieldman', {user_id:localStorage.getItem('u'),branch_id:assigning_reducer.assign_branch_id}).then(response => {
   
        dispatch({
          type: 'job_order_to_be_assign',
          data: res.data,
          fieldman_list:response,
          filterCompanyID:assigning_reducer.assign_company_id,
          joType:assigning_reducer.jo_type,
          date_filter: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
          assigned_fieldman:res.data_assigned,
          branch:assigning_reducer.assign_branch_id,
        });
        if(state.mru === ''){
          dispatch_data("mru",'')
        }
        dispatch_data("LoadingIndex", false)
        closeModal()
    })
    });
  };
  useEffect(()=>{
    getData("Schedule/getJobOrderType").then((res) => {
      setState({...state,job_order_type:res})
  })
},[])
console.log(state.business_area)
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={12}>
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
              value={assigning_reducer.jo_type}
            >
              {state.job_order_type.map((val,index)=>{
                return <MenuItem value={val.category_details}>{val.category_details}</MenuItem>
              })
              }
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Filter Date"
              format="MM-dd-yyyy"
              name="date_start"
              value={assigning_reducer.date_filter}
              style={{ width: "100%" }}
              onChange={handleDateChangeStart}
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
              value={assigning_reducer.assign_company_id}
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
              value={assigning_reducer.assign_branch_id}
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
        {assigning_reducer.ba.length > 0 ? (
              <Grid item xs={12} md={12}>
                <FormControl
                  size="small"
                  className={classes.formControl}
                  style={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Business Area
                  </InputLabel>
                  <Select
                    required
                   disabled={state.disable_form}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeBA}
                    label="branch"
                    name="branch_id"
                    value={state.selected_ba}
                  >
                    {assigning_reducer.ba.map((val, index) => {
                      return <MenuItem value={val}>{val}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            ) : undefined}
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
                disabled={state.disable_form}
                  required
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChangeJobOrder}
                  label="branch"
                  name="branch_id"
                  value={state.selected_jobOrder}
                >
                  {assigning_reducer.jo_type_array.map((val, index) => {
                    return <MenuItem value={val}>{val}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
        <Grid item xs={12} md={12}>

          <TextField style={{ width: '100%' }} size='small' value={state.mru} onChange={(e) => {
              setState({...state,mru: e.target.value })
              dispatch_data("mru", e.target.value )
          }} id="outlined-basic" label="MRU" variant="outlined" />

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
