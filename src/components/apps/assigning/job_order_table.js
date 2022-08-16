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
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getData } from "../../api/api";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  validate,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment'
import ModalAccounts from './modal_accounts'
function JobOrderTable() {
  const dispatch = useDispatch();
  const assigning_reducer = useSelector((state) => state.assigning_reducer);
  const classes = useStyles();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    filter: false,
    jo_assign:[],
    user_id:'',
    date_start_val:new Date(),
    type:'',
    modal_accounts:false,
    jo_accounts:[],
    loading:false,
    job_order_type:[]
  });
  const checkJO =(val,branch_id)=>{
    let match = false
    assigning_reducer.jo_assign.map((val2,index)=>{
      if(val === val2){
        match = true
        assigning_reducer.jo_assign.splice(index,1)
      }
    })
    if(!match){
      assigning_reducer.jo_assign.push(val)
    }
    assigning_reducer.assign_branch_id = branch_id
    setState({...state})
  }
  const onSubmitAssign=(e)=>{
    dispatch_data("LoadingIndex", true)
    e.preventDefault();
    let data ={
      data:assigning_reducer.jo_assign,
      branch_id:assigning_reducer.assign_branch_id,
      user_id:state.user_id,
      company_id:assigning_reducer.assign_company_id,
      date:moment(state.date_start_val).format('YYYY-MM-DD'),
      type:state.type,
      date_filter:moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
      jo_type_filter:assigning_reducer.jo_type
      
    }
    if(assigning_reducer.jo_assign.length > 0){
      getData('Schedule/assign_by_mru',data)
      .then((res)=>{
        if(res){
          refreshData()
        }else if(!res){
          alert('Unable to assign the job order.')
          dispatch_data("LoadingIndex", false)
        }
      })
    }else{
      alert('Please Select MRU')
      dispatch_data("LoadingIndex", false)
    }
  
  }
  const onChangeFieldman = (e) =>{
    setState({...state,user_id:e.target.value})
  }
  const onChangeType = (e) =>{
    setState({...state,type:e.target.value})
  }
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start_val: date,
    });
  };
  const refreshData = () =>{
    let data = {
      date_start: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
      company: assigning_reducer.assign_company_id,
      branch: assigning_reducer.assign_branch_id,
      type: "by_mru",
      mru: "",
      jo_type:assigning_reducer.jo_type
    };
 
    getData("Schedule/getJobOrder_by_mru", data).then((res) => {
      // getData('Audit/getFieldman', {user_id:localStorage.getItem('u')}).then(response => {
        // dispatch({
        //   type:'UpdateDataJO',
        //   data:res.data,
        //   jo_assign:[],
        //   assigned_fieldman:res.data_assigned
        // })
        assigning_reducer.job_order_to_be_assign = res.data
        assigning_reducer.jo_assign = []
        assigning_reducer.assigned_fieldman = res.data_assigned


        setState({...state,user_id:''})
        dispatch_data("LoadingIndex", false)

    // })
    });
  }
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const onGetAccounts =(val_mru)=>{
    let mru = val_mru
    if(mru === null || mru === ''){
      mru = assigning_reducer.mru
    }
    setShowBackdrop(true)
    dispatch_data('ClearCheckBox',[])
    dispatch_data("LoadingIndex", true)
    let data = {
      date_start: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
      company: assigning_reducer.assign_company_id,
      branch: assigning_reducer.assign_branch_id,
      type: "by_account",
      mru: mru,
      jo_type:assigning_reducer.jo_type
    };
    console.log(data)
    getData("Schedule/getJobOrder_by_accounts", data).then((res) => {
      // dispatch_data('JoAccounts',res.data)
      setState({...state,modal_accounts:true,jo_accounts:res.data})
      setShowBackdrop(false)
      dispatch_data("LoadingIndex", false)
    })
  }
  useEffect(()=>{
    assigning_reducer.job_order_to_be_assign = []
    getData("Schedule/getJobOrderType").then((res) => {
      console.log(res)
      setState({...state,job_order_type:res})
  })
},[])

  return (
    <>
       <Backdrop
        className={classes.backdrop}
        open={showBackdrop}
        // onClick={() => dispatch_data("LoadingIndex", false)}
        style={{zIndex:99999999}}
      > <CircularProgress color="inherit" /></Backdrop>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Paper variant={'outlined'} style={{padding:10}}>
          <form onSubmit={onSubmitAssign}>
          <div style={{display:'flex',flexDirection:"row"}}>
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
            style={{marginRight:10,marginTop:3}}
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
              value={state.type}
            >
              {state.job_order_type.map((val,index)=>{
                if(val.category_details !== 'Audit Disconnection' && val.category_details !== 'Audit Reading')
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
            style={{marginRight:10,marginTop:3}}
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
              value={state.user_id}
            >{assigning_reducer.fieldman_list.map((val,index)=>{
              return <MenuItem value={val.user_id}>{String(val.user_lname+' '+val.user_fname).toLocaleUpperCase()}</MenuItem>
            })

            }
            </Select>
          </FormControl>
          </Grid>
          </Grid>
            </div>
            <div style={{width:'100%' ,display:'flex',justifyContent:'flex-end'}}> 
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
              height:40,
              marginTop:5
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
        <Paper className={classes.root} variant={"outlined"} style={{padding:10}}> 
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
                    Select MRU
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
                    MRU
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "rgba(6,86,147)",
                      color: "#fff",
                      width: "20%",
                    }}
                  >
                    No. of Accounts
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody size={"small"}>
                {assigning_reducer.job_order_to_be_assign.map((val, index) => {
                  let match = assigning_reducer.jo_assign.filter((mru)=>(mru === val.mru))
                  let check = false;
                  if(match.length >0){
                    check = true
                  }
                  return (
                    <TableRow key={index} role="checkbox" tabIndex={-1}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={()=>checkJO(val.mru,val.bid)}
                          checked={check}
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </TableCell>
                      <TableCell>{val.branch_name}</TableCell>
                      <TableCell>{val.mru}</TableCell>
                      <TableCell style={{cursor:'pointer'}} onClick={()=>onGetAccounts(val.mru)}>{val.mru_count}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
    <Dialog
        fullWidth
        maxWidth="md"
        open={state.modal_accounts}
        onClose={() => {
          setState({ ...state, modal_accounts: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Accounts</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              style={{ color: "#000" }}
              onClick={() => {
               
                setState({ ...state, modal_accounts: false });
              }}
            />
          </IconButton>
        </div>
        <DialogContent>
           <ModalAccounts jo_type = {state.job_order_type} jo_accounts={state.jo_accounts} showBackdrop={(e)=>setShowBackdrop(e)} refreshData={()=>refreshData()}/>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default JobOrderTable;
