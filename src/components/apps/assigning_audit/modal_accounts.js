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
import FilterData from "./filter_data";
import JobOrderTable from "./job_order_table";
import AssignFieldman from "./assign_fieldman";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { getData } from "../../api/api";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// const JobOrderTableComponents = React.memo(({props}) => {
//   return  <JobOrderTable/>
// });
function JobOrderTableComponents2({update,jo_assign, classes,jo_accounts,checkJO }){
  console.log('hehehe')
  return <Grid item xs={12} md={12}>
  <Paper
    className={classes.root}
    variant={"outlined"}
    style={{ padding: 10 }}
  >
    <TableContainer
      className={classes.container}
      className={classes.container}
      style={{ maxHeight: 405, marginTop: 10 }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "#fff",
                width: "20%",
              }}
            >
              No.
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "#fff",
                width: "20%",
              }}
            >
              Select Account No.
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "#fff",
                width: "20%",
              }}
            >
              Branch
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "#fff",
                width: "20%",
              }}
            >
              Account No.
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "#fff",
                width: "20%",
              }}
            >
              MRU
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "#fff",
                width: "20%",
              }}
            >
              Field Findings
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody size={"small"}>
          {jo_accounts.map((val, index) => {
            let match = jo_assign.filter(
              (jo_id) => jo_id === val.jo_id
            );
            let check = false;
            if (match.length > 0) {
              check = true;
            }
            return (
              <TableRow key={index} role="checkbox" tabIndex={-1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Checkbox
                    onChange={() => {checkJO(val.jo_id, val.bid)}}
                    checked={check}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </TableCell>
                <TableCell>{val.branch_name}</TableCell>
                <TableCell>{val.account_number}</TableCell>
                <TableCell>{val.mru}</TableCell>
                <TableCell>{val.field_findings_value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
</Grid>
}
const JobOrderTableComponents =  React.memo(
  ({ update,jo_assign, classes,jo_accounts,checkJO }) => {
  return <JobOrderTableComponents2
    update = {update}
    jo_assign = {jo_assign}
    classes = {classes}
    jo_accounts = {jo_accounts}
    checkJO = {checkJO}
   />
},
(prevProps, nextProps) => {
  // Check to see if the data is the same
  if (
    prevProps.update === nextProps.update
  ) {
    return true; // Return true if they ARE the same
  } else {
    return false; // Return false if they are NOT the same
  }
}
);
// const JobOrderTableComponents = React.memo(JobOrderTableData,
//   (prevProps, nextProps) => {
//     console.log(prevProps)
//     // Check to see if the data is the same
//     // if (
//     //   prevProps.player.firstName === nextProps.player.firstName &&
//     //   prevProps.player.lastName === nextProps.player.lastName &&
//     //   prevProps.player.id === nextProps.player.id &&
//     //   prevProps.modifyPlayer === nextProps.modifyPlayer
//     // ) {
//     //   return true; // Return true if they ARE the same
//     // } else {
//     //   return false; // Return false if they are NOT the same
//     // }
//   }));


function Modal({ jo_type,jo_accounts, showBackdrop, refreshData }) {
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
    filter: false,
    type: "",
    user_id: "",
    date_start_val: new Date(),
    checkOption:false,
    sequence:'',
    percent:"",
    update:false

  });
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start_val: date,
    });
  };
  const onChangeType = (e) => {
    assigning_reducer.type =  e.target.value
    setState({ ...state});
  };
  const onChangeFieldman = (e) => {
    assigning_reducer.user_id =  e.target.value
    setState({ ...state});
  };
  const checkJO = (val, branch_id) => {
    console.log(val)
    let match = false;
    assigning_reducer.jo_assign.map((val2, index) => {
      if (val === val2) {
        match = true;
        assigning_reducer.jo_assign.splice(index, 1);
      }
    });
    if (!match) {
      console.log(val)
      assigning_reducer.jo_assign.push(val);
    }
    setState({...state,update:!state.update});
  };
  const onSubmitAssign = (e) => {
    showBackdrop(true);
    e.preventDefault();
    let data = {
      data: assigning_reducer.jo_assign,
      branch_id: assigning_reducer.assign_branch_id,
      user_id: assigning_reducer.user_id,
      company_id: assigning_reducer.assign_company_id,
      date: moment(state.date_start_val).format("YYYY-MM-DD"),
      type: assigning_reducer.type,
      date_filter: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
    };
    if (assigning_reducer.jo_assign.length > 0) {
      getData("Schedule/assign_by_accounts_audit", data).then((res) => {
        if (res) {
          dataSplice();
         
        } else if (!res) {
          alert("Unable to assign the job order.");
        }
        showBackdrop(false);
      });
    } else {
      alert("Please Select Account Number");
      showBackdrop(false);
    }
  };
  const dataSplice = () => {
    let count=0
    assigning_reducer.jo_assign.map((jo_id) => {
      jo_accounts.map(
        (val,index) => {
          if(parseInt(val.jo_id) === parseInt(jo_id)){
            jo_accounts.splice(index, 1);
          }}
      );
     
    });
    assigning_reducer.percent = ''
    assigning_reducer.sequence = ''
    setState({...state,update:!state.update})
    refreshData();

    // setState({ ...state });
  };
  const AssignFieldman = (e)=>{
    assigning_reducer.percent = e.target.value
    if(assigning_reducer.sequence === 'Consecutive'){
      const percent = (jo_accounts.length) * (parseInt(e.target.value) / 100);
      let result = []
      for (var i = 0; result.length < (Math.round(percent)); i++) {
          result.push(jo_accounts[i]['jo_id']);
      }
      dispatch_data('clearAssign',result)
    }else{
      const percent = (jo_accounts.length) * (parseInt(e.target.value) / 100);
      let result = []
      let randomArray = []
      for (var i = 0; result.length < (Math.round(percent)); i++) {
          var index = Math.floor(Math.random() * jo_accounts.length);
          if (!randomArray.includes(index)) {
              result.push(jo_accounts[index]['jo_id']);
          }
          randomArray.push(index)
      }
      dispatch_data('clearAssign',result)
    }
    setState({...state,update:!state.update})
  }
  const sequenceFunction = (e) =>{
      assigning_reducer.sequence = e.target.value
      assigning_reducer.percent = ''

      dispatch_data('clearAssign',[])
  }
  console.log(state.user_id)
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Paper variant={"outlined"} style={{ padding: 10 }}>
            <form onSubmit={onSubmitAssign}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                      <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="Assign Date"
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
                  <Grid item xs={12} md={4}>
                    <FormControl
                      size="small"
                      className={classes.formControl}
                      style={{ marginRight: 10, marginTop: 3 }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={onChangeType}
                        required
                        label="type"
                        name="type"
                        value={assigning_reducer.type}
                      >
                        {jo_type.map((val,index)=>{
                            if(val.category_details === 'Audit Disconnection' || val.category_details === 'Audit Reading')
                          return <MenuItem value={val.category_details}>{val.category_details}</MenuItem>
                        })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl
                      size="small"
                      className={classes.formControl}
                      style={{ marginRight: 10, marginTop: 3 }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Select Fieldman
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={onChangeFieldman}
                        required
                        label="branch"
                        name="branch_id"
                        value={assigning_reducer.user_id}
                      >
                        {assigning_reducer.fieldman_list.map((val, index) => {
                          return (
                            <MenuItem value={val.user_id}>
                              {String(
                                val.user_lname + " " + val.user_fname
                              ).toLocaleUpperCase()}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  // onClick={() => {
                  //   setState({ ...state, filter: true });
                  // }}
                  type="submit"
                  size="medium"
                  variant="contained"
                  style={{
                    backgroundColor: "rgba(6,86,147)",
                    color: "white",
                    height: 40,
                    marginTop: 5,
                  }}
                  className={classes.button}
                  // endIcon={<FilterListIcon />}
                >
                  Assign
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper variant={"outlined"} style={{ width: "100%", padding: 10,display:'flex',flexDirection:'row' }}>
            <FormControlLabel
            style={{marginTop:10}}
             checked={assigning_reducer.checkOption}
              control={<Checkbox color="primary" />}
              label="Option"
              labelPlacement="end"
              onChange={()=>{ 
                assigning_reducer.checkOption = !assigning_reducer.checkOption 
                assigning_reducer.percent = ''
                assigning_reducer.sequence = ''
                assigning_reducer.jo_assign = []
                dispatch_data('clearAssign',[])
                setState({...state,update:!state.update});}}
            />
            {assigning_reducer.checkOption === true ? 
            <>
          <FormControl size="small" className={classes.formControl} style={{width:200,marginRight:10}}>
            <InputLabel id="demo-simple-select-outlined-label">
              Sequence Type
            </InputLabel>
            <Select
            required
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={sequenceFunction}
              label="branch"
              name="percent"
              style={{ textAlign: "justify" }}
              value={assigning_reducer.sequence}
            >
              <MenuItem value={'Consecutive'}>Consecutive</MenuItem>
              <MenuItem value={'Random'}>Random</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" className={classes.formControl} style={{width:200}}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select Percentage
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={AssignFieldman}
              label="branch"
              name="percent"
              style={{ textAlign: "justify" }}
              value={assigning_reducer.percent}
            >
              <MenuItem value={10}>10 %</MenuItem>
              <MenuItem value={20}>20 %</MenuItem>
              <MenuItem value={30}>30 %</MenuItem>
              <MenuItem value={40}>40 %</MenuItem>
              <MenuItem value={50}>50 %</MenuItem>
              <MenuItem value={60}>60 %</MenuItem>
              <MenuItem value={70}>70 %</MenuItem>
              <MenuItem value={80}>80 %</MenuItem>
              <MenuItem value={90}>90 %</MenuItem>
              <MenuItem value={100}>100 %</MenuItem>
            </Select>
          </FormControl>
          </>
            :undefined

            }
            
          </Paper>
        </Grid>
        <JobOrderTableComponents
          update={state.update}
          jo_assign={assigning_reducer.jo_assign}
          classes={classes}
          jo_accounts={jo_accounts}
          checkJO={checkJO}
        />
      </Grid>
    </div>
  );
}
export default Modal;
