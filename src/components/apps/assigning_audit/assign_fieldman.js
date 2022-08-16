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
import moment from 'moment'
import { getData } from "../../api/api";
import Checkbox from "@material-ui/core/Checkbox";
const TableUnAssign = ({selectUnassign,classes,jo,jo_unassign}) =>{
 return  <Grid item xs={12} md={12}>
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
              Accounts
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody size={"small"}>
          {jo.map((val, index) => {
            let match = jo_unassign.filter(
              (mru) => mru === val.mru
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
                    onChange={() => selectUnassign(val.mru)}
                    checked={check}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </TableCell>
                <TableCell>{val.branch_name}</TableCell>
                <TableCell>{val.mru}</TableCell>
                <TableCell>{val.mru_count}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
</Grid>
}
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
    jo_assign_details:[],
    open:false,
    user_id:''
  });
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  const getJoAssignedPerFieldman = (user_id) =>{
    let data = {
      date_start: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
      company: assigning_reducer.assign_company_id,
      branch:assigning_reducer.assign_branch_id,
      type: "by_mru",
      mru: "",
      jo_type:assigning_reducer.jo_type,
      user_id:user_id
    };
    let u_id = user_id
    getData("Schedule/getJobOrder_by_mru_user_id_audit", data).then((res) => {
      console.log(res.data)
      setState({...state,jo_assign_details:res.data,open:true,user_id:u_id})
    });
  }
  const selectUnassign = (mru) =>{
    let match = false
    assigning_reducer.jo_unassign.map((val2,index)=>{
      if(mru === val2){
        match = true
        assigning_reducer.jo_unassign.splice(index,1)
      }
    })
    if(!match){
      assigning_reducer.jo_unassign.push(mru)
    }
    setState({...state})
  }
  const onSubmit = () =>{
    if (window.confirm('Are you sure you want to unassign the selected data?')) {
      if(assigning_reducer.jo_unassign.length > 0){
        dispatch_data("LoadingIndex", true)
        let data = {
          date_start: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
          company: assigning_reducer.assign_company_id,
          branch:assigning_reducer.assign_branch_id,
          details:assigning_reducer.jo_unassign,
          user_id:state.user_id,
          jo_type_filter:assigning_reducer.jo_type
        };
        getData("Schedule/unassignJobOrderAudit", data).then((res) => {
          assigning_reducer.jo_unassign.map((mru)=>{
            state.jo_assign_details.map((val,index)=>{
              if(mru === val.mru){
                state.jo_assign_details.splice(index,1)
            }})
          })
          assigning_reducer.jo_unassign = []
          refreshData()
          dispatch_data("LoadingIndex", false)
        });
      }else{
        alert('Please select data to be unssign.')
      }
    } 
  }
  const refreshData = () =>{
    let data = {
      date_start: moment(assigning_reducer.date_filter).format("YYYY-MM-DD"),
      company: assigning_reducer.assign_company_id,
      branch: assigning_reducer.assign_branch_id,
      type: "by_mru",
      mru: "",
      jo_type:assigning_reducer.jo_type
    };
 
    getData("Schedule/getJobOrder_by_mru_audit", data).then((res) => {
      // getData('Audit/getFieldman', {user_id:localStorage.getItem('u')}).then(response => {
        dispatch({
          type:'UpdateDataJO',
          data:res.data,
          jo_assign:[],
          assigned_fieldman:res.data_assigned
        })
        setState({...state,user_id:''})
        dispatch_data("LoadingIndex", false)

    // })
    });
  }
  return (
    <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Paper className={classes.root} variant={"outlined"}>
          <div style={{ height: 95, padding: 10 }}>
            <Typography>Remaining</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                {formatNumber(
                  assigning_reducer.job_order_to_be_assign.reduce(
                    (count, val) => {
                      count += parseInt(val.mru_count);
                      return count;
                    },
                    0
                  )
                )}
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.root} variant={"outlined"}>
          <div style={{ height: 95, padding: 10 }}>
            <Typography>Assigned</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                {formatNumber(
                  assigning_reducer.assigned_fieldman.reduce((count, val) => {
                    count += parseInt(val.mru_count);
                    return count;
                  }, 0)
                )}
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper className={classes.root} variant={"outlined"}>
          <div style={{ height: 450, padding: 10, overflow: "auto" }}>
            <Typography>Assigned Fieldman</Typography>
            <div style={{width:'100%'}}>
            {assigning_reducer.assigned_fieldman.map((val, index) => {
              let full_name = '';
              let user_id = '';

              return <div onClick={()=>{getJoAssignedPerFieldman(val.user_id)}} key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:15,cursor:'pointer'}}>
                  <div>
                  <Typography>{String(val.fullname).toLocaleUpperCase()}</Typography>
                    </div>
               
                <div>
                  <Typography style={{fontWeight:'bold'}}> {val.mru_count}</Typography>
                </div>
              </div>
            })}
            </div>
            
          </div>
        </Paper>
      </Grid>
    </Grid>
    <Dialog
        fullWidth
        maxWidth="md"
        open={state.open}
        onClose={() => {
          setState({ ...state, open: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Job Order</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              style={{ color: "#000" }}
              onClick={() => {
                setState({ ...state, open: false });
              }}
            />
          </IconButton>
        </div>
        <DialogContent>
            <TableUnAssign selectUnassign={selectUnassign} classes={classes} jo = {state.jo_assign_details} jo_unassign={assigning_reducer.jo_unassign}/>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={() => {
              onSubmit()
            }}
            type="submit"
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              height:40,
              marginTop:5,
              marginRight:10
            }}
            className={classes.button}
            // endIcon={<FilterListIcon />}
          >
            Unassign
          </Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default JobOrderTable;
