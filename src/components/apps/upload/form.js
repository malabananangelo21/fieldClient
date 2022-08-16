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
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getData } from "../../api/api";
function Index({ refreshForm, openUpload, upload_data,disable_form }) {
  const home_reducer = useSelector((state) => state.home_reducer);
  const classes = useStyles();
  const dispatch = useDispatch();
 
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    selected_company: "",
    selected_branch: "",
    branches: [],
    jo_type: [],
    date_start_val: new Date(),
    selected_jo_type: "",
    dynamic_header_data: [],
    business_area: [],
    selected_ba: "",
    selected_dynamic_header_data: [],
  });
  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });
    setState({
      ...state,
      selected_company: e.target.value,
      branches: branches_data,
    });
  };
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start_val: date,
    });
  };
  const onChangeBranch = (e) => {
    let jo_type = [];
    let ba = [];
    state.branches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
        }
        if (val.business_area !== null && val.business_area !== "") {
          ba = JSON.parse(val.business_area);
        }
      }
    });
    getHeader(e.target.value,jo_type,ba)
 
  };
  const onChangeJobOrder = (e) => {
    let dynamic_header = [];
    if (state.business_area.length > 0) {
      if (state.selected_ba === "") {
        alert("Please Select Business Area");
      } else {
        state.dynamic_header_data.map((val) => {
          if (
            val.branch_id === state.selected_branch &&
            val.BA === state.selected_ba &&
            val.jo_type === e.target.value && val.upload_type !== 'Accomplishments'
          ) {
            dynamic_header = JSON.parse(val.header_details);
          }
        });
        setState({
          ...state,
          selected_jo_type: e.target.value,
          selected_dynamic_header_data: dynamic_header,
        });
      }
    } else {
      state.dynamic_header_data.map((val) => {
        if (
          val.branch_id === state.selected_branch &&
          val.jo_type === e.target.value
        ) {
          dynamic_header = JSON.parse(val.header_details);
        }
      });
      setState({
        ...state,
        selected_jo_type: e.target.value,
        selected_dynamic_header_data: dynamic_header,
      });
    }
  };
  const onChangeBA = (e) => {
    setState({
      ...state,
      selected_ba: e.target.value,
      selected_jo_type:''
    });
  };
  const getHeader = (branch_id,jo_type,ba) =>{
    dispatch_data("LoadingIndex", true)
    getData("Schedule/getDynamicHeaders",branch_id).then((res) => {
      setState({
        ...state,
        selected_branch:branch_id,
        jo_type: jo_type,
        business_area: ba,
        selected_jo_type:'',
        selected_ba:'',
        dynamic_header_data: res
      });
      dispatch_data("LoadingIndex", false)
    });
  }
  // React.useEffect(() => {
  //   dispatch_data("LoadingIndex", true)
  //   getData("Schedule/getDynamicHeaders").then((res) => {
  //     setState({ ...state, dynamic_header_data: res });
  //     dispatch_data("LoadingIndex", false)
  //   });
  // }, []);
  return (
    <Grid item xs={12} md={12}>
      <Paper
        className={classes.root}
        variant={"outlined"}
        style={{ padding: 18 }}
      >
        <Typography style={{ fontSize: 18, marginBottom: 10 }}>
          Upload Option
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                <KeyboardDatePicker
                disabled={disable_form}
                  id="date-picker-dialog"
                  label="Job order Date"
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
              <FormControl
                size="small"
                className={classes.formControl}
                style={{ width: "100%" }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Company
                </InputLabel>
                <Select
                disabled={disable_form}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChangeCompany}
                  label="Company"
                  name="company"
                  value={state.selected_company}
                >
                  {home_reducer.company_name.map((val) => {
                    return (
                      <MenuItem value={val.company_id}>
                        {val.company_name}
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
                  Branch
                </InputLabel>
                <Select
                disabled={disable_form}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChangeBranch}
                  label="branch"
                  name="branch_id"
                  value={state.selected_branch}
                >
                  {state.branches.map((val, index) => {
                    return (
                      <MenuItem value={val.branch_id}>
                        {val.branch_company}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {state.business_area.length > 0 ? (
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
                  disabled={disable_form}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeBA}
                    label="branch"
                    name="branch_id"
                    value={state.selected_ba}
                  >
                    {state.business_area.map((val, index) => {
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
                disabled={disable_form}
                  required
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChangeJobOrder}
                  label="branch"
                  name="branch_id"
                  value={state.selected_jo_type}
                >
                  {state.jo_type.map((val, index) => {
                    return <MenuItem value={val}>{val}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {upload_data === 0 && state.selected_jo_type !== "" ? (
              <Button
                onClick={() => {
                  openUpload(
                    true,
                    state.selected_dynamic_header_data,
                    state.selected_ba,
                    state.selected_branch,
                    state.selected_company,
                    state.selected_jo_type,
                    state.date_start_val
                  );
                }}
                type="button"
                size="medium"
                variant="contained"
                style={{
                  backgroundColor: "rgba(6,86,147)",
                  color: "white",
                  marginRight: 5,
                }}
                className={classes.button}
                startIcon={<CloudUploadIcon />}
              >
                Upload File
              </Button>
            ) : undefined}
            {/* {(upload_data > 0 && state.selected_dynamic_header_data.length === 0 && state.selected_jo_type !== '')?
             <Button
          onClick={()=>{

          }}
          type="button"
          size="medium"
          variant="contained"
          style={{
            backgroundColor: "rgba(6,86,147)",
            color: "white",
            marginRight: 5,
          }}
          className={classes.button}
          startIcon={<AddCircleIcon />}
        >
          Template
        </Button>
          :undefined
          } */}
          </div>
        </form>
      </Paper>
    </Grid>
  );
}

export default Index;
