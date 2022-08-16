import React from "react";
import clsx from "clsx";
import "../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import UserImage from "../../../assets/map image/user_image.png";
import moment from "moment";
import {
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import PieGrap from "./charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../api/api";
import GroupIcon from "@material-ui/icons/Group";
import ReactExport from "react-data-export";
import CloseIcon from "@material-ui/icons/Close";
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },

  hoverDialog: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  large: {
    width: 100,
    height: 100,
  },
  whiteText: {
    color: "#fff",
  },
  allTable: {
    color: "#dcdcdc",
    fontSize: 12,
    borderColor: "rgb(255 255 255 / 15%)",
  },
  tableHead: {
    color: "#fff",
    fontSize: 13,
    borderColor: "rgb(255 255 255 / 15%)",
  },
  dashboards: {
    background: "rgba(0,0,0,0.6)",
  },
  filterBox: {
    background: "rgba(0,0,0,0.7)",
  },
});

function Initial({ date_start, branch_name, excel_invalid_data, close,branch_id }) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    openModal: false,
    filter_date_start: new Date(),
    filter_date_end: new Date(),
    summary_data :[],
    openModalSummary:false,
    summary_onClick_details:[],
    onSelectName:''

  });
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const MonitoringReport =(e)=>{
    e.preventDefault();
    dispatch_data("loading_map", true);
    let data = {
        filter_date_start:moment(state.filter_date_start).format('YYYY-MM-DD'),
        filter_date_end:moment(state.filter_date_end).format('YYYY-MM-DD'),
        branch_id:branch_id
    }
    getData('Audit/getMonitoringPointsDateRange',data)
    .then((val)=>{
      let response = val
      response.sort(function (a, b) {
        return a['name'].localeCompare(b['name']);
      });
        setState({...state,summary_data:response,openModal:false})
        dispatch_data("loading_map", false);

    })
  }
  const classes = useStyles();
  const onClickSummary = (data) =>{
    console.log(data)
    setState({...state,onSelectName:data.name,openModalSummary:true,summary_onClick_details:data.details})
  }
  return (
    <div>
      <div style={{ position: "absolute", top: 20, right: 60 }}>
        <IconButton
          onClick={() => {
            setState({ ...state, openModal: true });
          }}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <DateRangeIcon />
        </IconButton>
        {state.summary_data.length === 0 ? <ExcelFile
          filename={
            "Invalid Findings" +
            "-" +
            branch_name +
            " " +
            moment(new Date(date_start)).format("YYYY-MM-DD")
          }
          element={
            <Button
              size="medium"
              variant="contained"
              style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
              className={classes.button}
              endIcon={<GetAppIcon />}
            >
              Download
            </Button>
          }
        >
          <ExcelSheet data={excel_invalid_data} name="Invalid">
            <ExcelColumn label="Emp ID" value="FieldmanID" />
            <ExcelColumn label="Name" value="FieldmanName" />
            <ExcelColumn label="Branch" value="branch" />
            <ExcelColumn label="Date Commited" value="date" />
            <ExcelColumn label="Time in" value="time1" />
            <ExcelColumn label="Time out" value="time2" />
            <ExcelColumn label="Time in" value="time3" />
            <ExcelColumn label="Time out" value="time4" />
            <ExcelColumn label="Late" value="late" />
            <ExcelColumn label="Completeness" value="completeness" />
            <ExcelColumn label="Bulk" value="bulk" />
            <ExcelColumn label="Field Findings" value="fieldFindings" />
            <ExcelColumn label="Battery" value="battery" />
            <ExcelColumn label="Upload" value="upload" />
            <ExcelColumn label="Total" value="total" />
            <ExcelColumn label="Bulk Count" value="bulk_data" />
            <ExcelColumn label="Remaining" value="completeness_data" />
            <ExcelColumn label="Explanation" value="" />
            <ExcelColumn label="Supervision Recommendation" value="" />
            <ExcelColumn label="Decision" value="" />
          </ExcelSheet>
        </ExcelFile>:
          <ExcelFile
          filename={
            "Penalty" +
            "-" +
            branch_name +
            " " +
            moment(new Date(state.filter_date_start)).format("YYYY-MM-DD")+' - '+moment(new Date(state.filter_date_end)).format("YYYY-MM-DD")
          }
          element={
            <Button
              size="medium"
              variant="contained"
              style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
              className={classes.button}
              endIcon={<GetAppIcon />}
            >
              Download
            </Button>
          }
        >
          <ExcelSheet data={state.summary_data} name="Invalid">
            <ExcelColumn label="Emp ID" value="user_id" />
            <ExcelColumn label="Name" value="name" />
            <ExcelColumn label="Days" value="days_penalty" />
            <ExcelColumn label="No. Penalty" value="no_penalty" />
            <ExcelColumn label="Total amount" value="amount" />
                      </ExcelSheet>
        </ExcelFile>
}
       

       
      </div>
      <div style={{ position: "absolute", zIndex: 2, right: 2, top: -1 }}>
        <IconButton aria-label="delete">
          <CloseIcon onClick={(e) => close()} style={{ color: "#000" }} />
        </IconButton>
      </div>
      <DialogContent>
      {state.summary_data.length !== 0 ?
      <div>
          <Typography >From : {moment(state.filter_date_start).format('LL')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To : {moment(state.filter_date_end).format('LL')} </Typography>
        </div>:undefined}
        {state.summary_data.length === 0 ?
            <TableContainer style={{ maxHeight: 500 }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
              id="mytable"
            >
              <TableHead>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  #
                </TableCell>
  
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Name
                </TableCell>
  
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  In
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Out
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  In
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Out
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Late
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Bulk
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Completeness
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  FF
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Battery
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Upload
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Bulk Count
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Remaining
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Total
                </TableCell>
              </TableHead>
              <TableBody>
                {excel_invalid_data.map((val, index) => {
                  let bgColor = "#27ae60";
                  if (parseInt(val.total) < 10) {
                    bgColor = "#e74c3c";
                  }
                  return (
                    <TableRow hover key={index}>
                      <TableCell>
                        <center>{index + 1}</center>
                      </TableCell>
                      <TableCell>{val.FieldmanName}</TableCell>
                      <TableCell>
                        <center>{val.time1}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.time2}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.time3}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.time4}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.late}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.bulk}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.completeness}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.fieldFindings}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.battery}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.upload}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.bulk_data}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.completeness_data}</center>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: bgColor, color: "#fff" }}
                      >
                        <center>{val.total}</center>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>:undefined
        }
        {state.summary_data.length > 0 ?
        <>
        
        {/* <Typography>From: {state.filter_date_start} </Typography>
        <Typography>To: {state.filter_date_end}</Typography> */}
           <TableContainer style={{ maxHeight: 500 }}>
           <Table
             stickyHeader
             className={classes.table}
             aria-label="simple table"
             id="mytable"
           >
             <TableHead>
               <TableCell
                 style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
               >
                 #
               </TableCell>
               <TableCell
                 style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
               >
                ID
               </TableCell>
 
               <TableCell
                 style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
               >
                 Name
               </TableCell>
               <TableCell
                 style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
               >
                 No. of Days
               </TableCell>
               <TableCell
                 style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
               >
                 No. of Penalty 
               </TableCell>
               <TableCell
                 style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
               >
                Total Amount
               </TableCell>
 
              
             </TableHead>
             <TableBody>
               {state.summary_data.map((val, index) => {
                 if(val.user_id != 0)
                 return (
                   <TableRow hover key={index} onClick={()=>onClickSummary(val)}>
                     <TableCell>
                       {index + 1}
                     </TableCell>
                     <TableCell>{val.user_id}</TableCell>
                     <TableCell>
                       {val.name}
                     </TableCell>
                     <TableCell>
                       {val.days_penalty}
                     </TableCell>
                     <TableCell>
                       {val.no_penalty}
                     </TableCell>
                     <TableCell>
                       {(val.amount)}
                     </TableCell>
                   </TableRow>
                 );
               })}
             </TableBody>
           </Table>
         </TableContainer>
         </>
        :undefined

        }
        
       
      </DialogContent>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.openModal}
        onClose={() => {
          setState({ ...state, openModal: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Generate Report</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton
            onClick={() => {
              setState({ ...state, openModal: false });
            }}
            aria-label="delete"
          >
            <CloseIcon style={{ color: "#000" }} />
          </IconButton>
        </div>
        <form onSubmit={MonitoringReport}>
        <DialogContent>
        <Grid container className={classes.whiteText} spacing={2}>
          <Grid item xs={12} md={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
              <KeyboardDatePicker
                id="date-picker-dialog"
                label="Filter Date Start"
                format="MM-dd-yyyy"
                name="date_start"
                value={state.filter_date_start}
                style={{ width: "100%" }}
                onChange={(e)=>{setState({...state,filter_date_start:e})}}
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
                value={state.filter_date_end}
                style={{ width: "100%" }}
                onChange={(e)=>{setState({...state,filter_date_end:e})}}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
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
        </DialogContent>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.openModalSummary}
        onClose={() => {
          setState({ ...state, openModalSummary: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Summary</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton
            onClick={() => {
              setState({ ...state, openModalSummary: false });
            }}
            aria-label="delete"
          >
            <CloseIcon style={{ color: "#000" }} />
          </IconButton>
        </div>
        <form onSubmit={MonitoringReport}>
        <DialogContent>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <Typography >NAME : {state.onSelectName}</Typography>
            <ExcelFile
          filename={
            "Summary Findings" +
            "-" +
            branch_name +
            " " +
            moment(new Date(state.filter_date_start)).format("YYYY-MM-DD")+' - '+ moment(new Date(state.filter_date_end)).format("YYYY-MM-DD")
          }
          element={
            <Button
              size="medium"
              variant="contained"
              style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
              className={classes.button}
              endIcon={<GetAppIcon />}
            >
              Download
            </Button>
          }
        >
          <ExcelSheet data={state.summary_onClick_details} name="Invalid">
            <ExcelColumn label="Emp ID" value="user_id" />
            <ExcelColumn label="Name" value="fieldman_name" />
            <ExcelColumn label="Date Commited" value="date" />
            <ExcelColumn label="Time in" value="first_attn" />
            <ExcelColumn label="Time out" value="second_attn" />
            <ExcelColumn label="Time in" value="third_attn" />
            <ExcelColumn label="Time out" value="forth_attn" />
            <ExcelColumn label="Late" value="late" />
            <ExcelColumn label="Completeness" value="completeness" />
            <ExcelColumn label="Bulk" value="bulk" />
            <ExcelColumn label="Field Findings" value="fiel_findings" />
            <ExcelColumn label="Battery" value="battery" />
            <ExcelColumn label="Upload" value="upload" />
            <ExcelColumn label="Total" value="total" />
            <ExcelColumn label="Bulk Count" value="bulk_data" />
            <ExcelColumn label="Remaining" value="completeness_data" />
            <ExcelColumn label="Explanation" value="" />
            <ExcelColumn label="Supervision Recommendation" value="" />
            <ExcelColumn label="Decision" value="" />
          </ExcelSheet>
        </ExcelFile>
          </div>
        <TableContainer style={{ maxHeight: 400 }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
              id="mytable"
            >
              <TableHead>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  #
                </TableCell>
  
               
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Date
                </TableCell>
  
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  In
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Out
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  In
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Out
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Late
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Bulk
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Completeness
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  FF
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Battery
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Upload
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Bulk Count
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Remaining
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
                >
                  Total
                </TableCell>
              </TableHead>
              <TableBody>
                {state.summary_onClick_details.map((val, index) => {
                  let bgColor = "#27ae60";
                  if (parseInt(val.total) < 10) {
                    bgColor = "#e74c3c";
                  }
                  return (
                    <TableRow hover key={index}>
                      <TableCell>
                        <center>{index + 1}</center>
                      </TableCell>
                     
                      <TableCell>
                        <center>{val.date}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.first_attn}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.second_attn}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.third_attn}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.forth_attn}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.late}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.bulk}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.completeness}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.fiel_findings}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.battery}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.upload}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.bulk_data}</center>
                      </TableCell>
                      <TableCell>
                        <center>{val.completeness_data}</center>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: bgColor, color: "#fff" }}
                      >
                        <center>{val.total}</center>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default Initial;
