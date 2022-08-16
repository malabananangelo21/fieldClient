import React from "react";
import clsx from "clsx";
import "../../../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import UserImage from "../../../../../assets/map image/user_image.png";
import moment from "moment";
import {
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
// import PieGrap from "./charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../../../api/api";
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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FilterListIcon from "@material-ui/icons/FilterList";
import BarLineGraph from "./graph/bar_line";
import BarLineGraphAPF from "./graph/bar_line_apf";
import BarLineGraphTotal from "./graph/bar_line_total";
import BarLineGraphAssign from "./graph/bar_line_assign";
import BarLineGraphUnassign from "./graph/bar_line_unassign";
import BarLineGraphAccomplish from "./graph/bar_line_accomplish";
import BarLineGraphDelay from "./graph/bar_line_delay";


import FilterData from "./filter_data"
import Dashboard from './dashboard'
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

function Accom({
  back,
  record_start_date,
  record_end_date,
  branch_name,
  branch_id,
  discon,
  company_id,
  jo_type,
  onClickGraph,
  job_order_type,
  user_id,
  jo_type_val,
  complete_name,
  navigate_fieldman_accom,
  count_assign_day
}) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    openModal: false,
    filter_date_start: new Date(record_start_date),
    filter_date_end: new Date(record_end_date),
    summary: [],
    show_bar: false,
    filter:false,
    company_id:company_id,
    branch_id:branch_id,
    branch_name:branch_name,
    dataFilter:[],
    jo_type:jo_type,
    type:'',
    count_accom:0,
    
  });
  const classes = useStyles();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  React.useEffect(() => {
    get_accom_report(state.filter_date_start,state.filter_date_end,branch_id,company_id,branch_name,jo_type);
  }, []);
  const get_accom_report = (filter_date_start,filter_date_end,bid,c_id,b_name,jo_type_val) => {
    dispatch_data("loading_map", true);
    var oneDay = 24 * 60 * 60 * 1000;
    var date1 = new Date(filter_date_start + ' ' + '00:00');
    var date2 = new Date(filter_date_end + ' ' + '00:00');
    var diffDays = Math.abs((date1.getTime() - date2.getTime()) / oneDay);
    let data = {
      firstDay: moment(filter_date_start).format("YYYY-MM-DD"),
      currentDay: moment(filter_date_end).format("YYYY-MM-DD"),
      branch_id: bid,
      diffDays:diffDays,
      jo_type:jo_type_val,
      user_id:user_id
    };
    console.log(data)
    getData("tracking/summary_report_accom", data).then((res) => {
      console.log(data)
      dispatch_data("loading_map", false);
      setState({ ...state,count_accom:res.count_accom,dataFilter:data,filter:false,branch_name:b_name,summary: res.new_accom, show_bar: true,filter_date_start:filter_date_start,filter_date_end:filter_date_end,branch_id:bid,company_id:c_id ,jo_type:jo_type_val,type:''});
    });
  };
  console.log(state.count_accom)
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  
  let assign_percentage = state.summary.reduce((count,val)=>{
    return count += val.assigned
  },0)
  let total_percentage = state.summary.reduce((count,val)=>{
    return count += val.total_jo
  },0)
  let unassign_percentage = state.summary.reduce((count,val)=>{
    return count += val.unassigned
  },0)
  let accom_percentage = state.summary.reduce((count,val)=>{
    return count += val.accomplishment
  },0)
  let remaining_percentage = state.summary.reduce((count,val)=>{
    return count += val.remaining
  },0)
  const closeModal=()=>{
    setState({ ...state, filter: false });
  }
  const getdateDetails=(data)=>{
    navigate_fieldman_accom(data)
  }
  let fieldman = state.summary.reduce((count,val)=>{
    return count += val.fieldman
  },0)
  console.log(state.summary)
  const onClickCard = (e,type) =>{
    e.stopPropagation();
    setState({...state,type:type})
  }
  return (
    <div style={{ position: "fixed", top: 75, left: 17, zIndex: 2 }}>
      <div style={{display:'flex',flexDirection:'row'}}>
        <Button
          display={"none"}
          variant="contained"
          color="#7f8c8d"
          style={{marginRight:5}}
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          onClick={() => back()}
        >
          {" "}
          Back
        </Button>
        {/* <Button
         style={{marginRight:5,padding:5}}
          variant="contained"
          color="#7f8c8d"
          className={classes.button}
          startIcon={<FilterListIcon />}
          onClick={()=>setState({...state,filter:true})}
        >
          Filter
        </Button> */}
        <div
         style={{marginRight:5,padding:5}}
          className={classes.dashboards}
          
        >
          <Typography style={{color:'#fff',marginTop:5}}>{complete_name}</Typography>
          </div>
        <div
        
          className={classes.dashboards}
          style={{marginRight:5,padding:5}}
        >
          <Typography style={{color:'#fff',marginTop:5}}>{branch_name}</Typography>
          </div>
          <div
         style={{marginRight:5,padding:5}}
          className={classes.dashboards}
          
        >
          <Typography style={{color:'#fff',marginTop:5}}>{moment(state.filter_date_start).format('LL')+' - '+moment(state.filter_date_end).format('LL')}</Typography>
          </div>
        
      </div>
    <Dashboard count_assign_day={count_assign_day} summary={state.summary} count_accom={state.count_accom} onClickCard={onClickCard}/>

      {state.show_bar ? (
        <div
          className={classes.dashboards}
          style={{ width: 1050, marginTop: 5, height: 320,paddingTop:10,paddingBottom:10 }}
        >
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Typography style={{marginLeft:10,color:'#fff',marginTop:5}}>Accomplishment Summary</Typography>
          {/* <Typography style={{color:'#fff',fontWeight:'bold',fontSize:18,}}>APF : {isNaN(assign_percentage / fieldman)?0:formatNumber(parseInt(assign_percentage / fieldman))}</Typography> */}
            </div>
            {state.type === ''?
            <BarLineGraph summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
            :undefined
            }
             {/* {state.type === 'Average Assign'?
            <BarLineGraphAPF summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
            :undefined
            }
            {state.type === 'Total'?
            <BarLineGraphTotal summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
            :undefined
            }
             {state.type === 'Assign'?
            <BarLineGraphAssign summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
            :undefined
            }
             {state.type === 'Unassign'?
            <BarLineGraphUnassign summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
            :undefined
            }
            {state.type === 'Accomplish'?
            <BarLineGraphAccomplish summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
            :undefined
            }
            {state.type === 'Delay'?
            <BarLineGraphDelay summary={state.summary} dataFilter={state.dataFilter} company_id={state.company_id} jo_type={state.jo_type} getdateDetails={getdateDetails} />
            :undefined
            } */}
        </div>
      ) : undefined}
        
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
            <FilterData company_id={state.company_id} branch_id={state.branch_id} filter_date_start ={state.filter_date_start} filter_date_end ={state.filter_date_end} get_accom_report={get_accom_report} closeModal={()=>closeModal()}  job_order_type={job_order_type} jo_type={jo_type} onReset={()=>setState({...state,type:''})}/>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}

export default Accom;
