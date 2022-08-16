import React from "react";
import clsx from "clsx";
import "../../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import UserImage from "../../../../assets/map image/user_image.png";
import moment from "moment";
import {
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import PieGrap from "../charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../../api/api";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Scrollbars } from "react-custom-scrollbars";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import AccomMemo from "../memo/accom";
import AttachFile from './attach_file'
import ViewAttachment from './view_attachment'
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FilterListIcon from "@material-ui/icons/FilterList";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Summary from "./summary/accom"
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
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
    background: "rgba(0,0,0,0.7)",
  },
  filterBox: {
    background: "rgba(0,0,0,0.7)",
  },
});

function Records({
  record_single_data,
  record_start_date,
  record_end_date,
  user_id,
  branch_name,
  day_sched,
  user_jobposition,
  branch_id,
  discon,
  logo,
  company_id,
  onTrackAccomplishments,
  back,
  setOpenRecord,
  jo_type_val
}) {
  const map_reducer = useSelector((state) => state.map_reducer);
  const [state, setState] = React.useState({
    jo_accom_list: 0,
    assign: 0,
    count_assign_day: 0,
    complete_name: "",
    pie_graph: [
      {
        value: 0,
        title: "Accomplished",
      },
      {
        value: 0,
        title: "Unaccomplished",
      },
    ],
    delivery_type: [],
    open_modal: false,
    open_days: false,
    date_pick: [],
    memo_accom: false,
    memo_details: [],
    memo_data: [],
    index:'',
    attach_file_open:false,
    attach_data:[],
    viewAttachments_open:false,
    summary:false
  });
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  React.useEffect(() => {
    if (record_single_data.length !== 0) {
      getRecord();
    }
  }, [record_single_data]);
  const getRecord = () => {
    let count = 0;
    let jo_assign = 0;
    let jo_accom_list = 0;
    let with_jo = [];
    let with_out_jo = [];
    let latlng = "";
    let present = [];
    let onField = [];
    let absent = [];
    let late = [];
    let user_jobposition = [];
    let hours = [];
    let no_area = [];
    let match_position = [];
    let name = "";

    let jo_aubd = 0;
    let jo_dn = 0;
    let jo_dn_reout = 0;
    let jo_meco = 0;
    let jo_nac = 0;
    let jo_ncr = 0;
    let jo_osb = 0;
    let jo_osn = 0;
    let jo_soa = 0;
    let jo_soa_reout = 0;

    record_single_data.fieldman.map((val, index_val) => {
      getInvalid(val);
      name = val.completename;
      let new_jo_assign = 0;
      val.batch.map((val_batch, index) => {
        new_jo_assign += parseInt(val_batch.jo_count);
        let match = false;
        if (val_batch.jo_count > 0 && index === 0) {
          count++;
          match = true;
        }
        if (match) {
          with_jo.push(val);
          latlng = val.location_latlng;
        } else {
          if (index === 0) {
            with_out_jo.push(val);
          }
        }
        jo_assign += parseInt(val_batch.jo_count);
        jo_aubd += parseInt(val_batch.jo_aubd);
        jo_dn += parseInt(val_batch.jo_dn);
        jo_dn_reout += parseInt(val_batch.jo_dn_reout);
        jo_meco += parseInt(val_batch.jo_meco);
        jo_nac += parseInt(val_batch.jo_nac);
        jo_ncr += parseInt(val_batch.jo_ncr);
        jo_osb += parseInt(val_batch.jo_osb);
        jo_osn += parseInt(val_batch.jo_osn);
        jo_soa += parseInt(val_batch.jo_soa);
        jo_soa_reout += parseInt(val_batch.jo_soa_reout);
      });
      record_single_data.fieldman[index_val]["count"] = new_jo_assign;
      jo_accom_list += parseInt(val.jo_accom_list.length);
      if (val.attendance.length === 0) {
        absent.push(val);
      } else {
        if (parseInt(val.batch[0].jo_count) > 0) {
          present.push(val);
        }
        if (
          String(val.user_jobposition).toUpperCase() === "MESSENGER" ||
          String(val.user_jobposition).toUpperCase() === "METER READER"
        ) {
          if (
            moment(val.attendance[0].date_added).format("HH:mm") >
            moment("2021-01-01 " + day_sched.attn_in).format("HH:mm")
          ) {
            if (parseInt(val.batch[0].jo_count) > 0) {
              late.push(val);
            }
          }
          if (parseInt(val.batch[0].jo_count) === 0) {
            no_area.push(val);
          }
        }
      }
      if (val.jo_accom > 0) {
        onField.push(val);
      }
    });
    with_out_jo.map((val) => {
      with_jo.push(val);
    });
    let pie_graph = [
      {
        value: jo_accom_list,
        title: "Accomplished",
      },
      {
        value: jo_assign - jo_accom_list,
        title: "Unaccomplished",
      },
    ];
    let data_type = [
      { type: "AUBD", count: formatNumber(jo_aubd) },
      { type: "DN", count: formatNumber(jo_dn) },
      { type: "MECO", count: formatNumber(jo_meco) },
      { type: "NAC", count: formatNumber(jo_nac) },
      { type: "NCR", count: formatNumber(jo_ncr) },
      { type: "OSB", count: formatNumber(jo_osb) },
      { type: "OSN", count: formatNumber(jo_osn) },
      { type: "SOA", count: formatNumber(jo_soa) },
      { type: "RE-OUT DN", count: formatNumber(jo_dn_reout) },
      { type: "RE-OUT SOA", count: formatNumber(jo_soa_reout) },
    ];
    setState({
      assign: jo_assign,
      jo_accom_list: jo_accom_list,
      count_assign_day: record_single_data.count_assign,
      complete_name: name,
      pie_graph: pie_graph,
      delivery_type: data_type,
    });
  };
  const generate_validation = () => {
    let attendance = [];
    // record_single_data.fieldman[0].attendance.map((val,index)=>{
    //     let match = false
    //     let match = JSON.stringify
    //     if(!match){
    //         if(val.att_type === 'Time-in'){
    //             let late = ''
    //             if(moment(val.date_added).format('HH:mm') > moment('2020-01-01 7:00').format('HH:mm')){
    //                 late='Late'
    //             }
    //             let attn_details = {
    //                 date:moment(val.date_added).format('YYYY-MM-DD'),
    //                 status:late
    //             }
    //         }
    //     }

    // })
    record_single_data.count_assign_data.map((val) => {
      val["accom_count"] = 0;
      val["Time_in"] = "";
      val["completename"] = record_single_data.fieldman[0]["completename"];
      val["uploaded"] = 0;
      val["count_attendance"] = 0;
      val["count_bulk"] = 0;
      val["user_id"] = "";
      val["user_pic"] = "";
      val["name"] = "";
      val["value_attn"] = [];
      let bulk = 0;
      let bulk2 = -10;
      let prev_coordinates = "";
      let bulk_val = false;
      record_single_data.fieldman.map((val_fn)=>{
        val["user_id"] = val_fn.user_id
        val["user_pic"] = val_fn.user_pic
        val["name"] = val_fn.completename
      })

      record_single_data.fieldman[0]["jo_accom_list"].map((val_jo) => {
        // console.log(val_jo)
        // if(parseInt(val_jo.batch[0].jo_count) > 0){
        // getExcelData(val_jo, moment(val.jo_date_assign).format("YYYY-MM-DD"))
        // }
        if (
          moment(val.jo_date_assign).format("YYYY-MM-DD") ===
          moment(val_jo.date_accom).format("YYYY-MM-DD")
        ) {
          val.accom_count += 1;
          if (val_jo.accom_images !== "") {
            val["uploaded"] += 1;
          }
          if (val_jo.fetched_coordinates === prev_coordinates) {
            bulk++;
          } else {
            if (bulk > 4) {
              bulk2 += bulk;
              bulk_val = true;
            }
            bulk = 0;
          }
          prev_coordinates = val_jo.fetched_coordinates;
        }
      });
      if (bulk > 0) {
        bulk2 += bulk;
      }
      if (bulk2 < 0) {
        bulk2 = 0;
      }
      if (bulk2 > 0) {
        bulk2 += 10;
      }
      val["count_bulk"] = bulk2;
      let attendance_val = []
      record_single_data.fieldman[0]["attendance"].map((val_att) => {
        if (
          moment(val.jo_date_assign).format("YYYY-MM-DD") ===
          moment(val_att.date_added).format("YYYY-MM-DD")
        ) {
          if (val["Time_in"] === "" && val_att.att_type === "Time-in") {
            val["Time_in"] = val_att.date_added;
          }
          attendance_val.push(val_att)
          val["count_attendance"] += 1;
        }
      });
      val["value_attn"] = attendance_val
   

    });
    // record_single_data.count_assign_data.map((val, index) => {
    //   let jo_accom_list = 0;
    //   let bulk = 0;
    //   let bulk2 = -10;
    //   let prev_coordinates = "";
    //   let bulk_val = false;

    //   record_single_data.fieldman[0].jo_accom_list.map(
    //     (val_accom, index_val) => {
    //       if (
    //         moment(val.jo_date_assign).format("YYYY-MM-DD") ===
    //         moment(val_accom.date_accom).format("YYYY-MM-DD")
    //       ) {
    //         jo_accom_list++;
    //         if (val_accom.fetched_coordinates === prev_coordinates) {
    //           bulk++;
    //         } else {
    //           if (bulk > 4) {
    //             bulk2 += bulk;
    //             bulk_val = true;
    //           }
    //           bulk = 0;
    //         }
    //         prev_coordinates = val_accom.fetched_coordinates;
    //       }
    //     }
    //   );
    //   if (bulk > 0) {
    //     bulk2 += bulk;
    //   }
    //   if (bulk2 < 0) {
    //     bulk2 = 0;
    //   }
    //   if (bulk2 > 0) {
    //     bulk2 += 10;
    //   }
      
    //   record_single_data.count_assign_data[index]["jo_accom"] = jo_accom_list;
    //   record_single_data.count_assign_data[index]["bulk"] = bulk2;
    // });
    let day_remove = [];
    record_single_data.count_assign_data.map((val) => {
      let remaining = parseInt(val.jo_count) - parseInt(val.jo_accom);
      let late = false
      // console.log(moment(val.Time_in).format("LT")+' - '+moment("2021-01-01 " + day_sched.attn_in).format("LT"))
      if(moment(val.Time_in).format("LT") > moment("2021-01-01 " + day_sched.attn_in).format("LT")){
        late = true
      }
      if(parseInt(val.jo_count)>0){
        if (val.count_bulk > 0 || remaining > 0 || late == true) {
          let days = moment(val.jo_date_assign).format("YYYY-MM-DD");
          day_remove.push(days);
        }
      }
     
    });
    let selectCutoff = ''
    if(moment(record_start_date).format("DD") === moment('2021-01-01').format("DD")){
      selectCutoff = 'First Cut-off'
    }else if(moment(record_start_date).format("DD") === moment('2021-01-26').format("DD")){
      selectCutoff = 'First Cut-off'
    }
    else if(moment(record_start_date).format("DD") === moment('2021-01-11').format("DD")){
      selectCutoff = 'Second Cut-off'
    }
    else if(moment(record_start_date).format("DD") === moment('2021-01-16').format("DD")){
      selectCutoff = 'Second Cut-off'
    }
    // console.log(day_remove)
    // var details = { branch_id: branch_id, 
    //   selectCutoff: selectCutoff, 
    //   employee_id: personName, 
    //   from_date: moment(record_start_date).format('YYYY-MM-DD'), 
    //   to_date: moment(record_end_date).format('YYYY-MM-DD'),
    //   payroll_detail_id: '', 
    //   deduction_amount: amount.current.value, 
    //   deduction_type_id: state.deduction_type_id, 
    //   user_id: localStorage.getItem("u"), 
    //   type: 'Deduction',deminimis:false }
    // getData("humanResource/delete_days", {
    //   days: day_remove,
    //   user_id: user_id,
    // }).then((res) => {
    //   // if(res === true){
    //   alert("Success");
    //   // }
    //   // if(res === false){
    //   //     alert('Alrea')
    //   // }
    // });
  };
  const getInvalid = (row, date) => {
    let assign = 0;
    let bulk = 0;
    let bulk2 = -10;
    let prev_coordinates = "";
    let bulk_val = false;
    let bulk_data = [];
    let bulk_data_new = [];
    row.batch.map((val) => {
      assign += parseInt(val.jo_count);
    });
    var latlong = "";
    var splitlatlng = "";
    var lat = "";
    var lng = "";
    var complete_name = "";
    let upload_count = 0;
    row.jo_accom_list.map((val) => {
      if (val.accom_images !== "" && val.accom_images !== null) {
        upload_count++;
      }
      if (val.fetched_coordinates === prev_coordinates) {
        bulk++;
        bulk_data.push(val);
      } else {
        if (bulk > 4) {
          bulk2 += bulk;
          bulk_data.map((bulkdata1, index1) => {
            // if (index1 === 0) {
            bulkdata1["bulk"] = bulk;
            bulkdata1["bulk_data"] = bulk_data;
            bulk_data_new.push(bulkdata1);
            // }
            latlong = String(bulkdata1.fetched_coordinates);
            splitlatlng = latlong.split(",");
            lat = splitlatlng[0];
            lng = splitlatlng[1];
          });
          bulk_val = true;
        }
        bulk = 0;
        bulk_data = [];
      }
      prev_coordinates = val.fetched_coordinates;
    });
    if (bulk > 0) {
      bulk2 += bulk;
      bulk_data.map((bulkdata1, index1) => {
        // if (index1 === 0) {
        bulkdata1["bulk"] = bulk;
        bulkdata1["bulk_data"] = bulk_data;
        bulk_data_new.push(bulkdata1);
        // }
      });
    }
    if (bulk2 < 0) {
      bulk2 = 0;
    }

    let width = 0;

    if (isNaN(row.jo_accom_list.length / assign)) {
    } else {
      width = row.jo_accom_list.length / assign;
    }
    if (bulk2 > 0) {
      bulk2 += 10;
    }
    let late = 0;
    if (row.attendance.length !== 0) {
      if (
        moment(row.attendance[0].date_added).format("LT") >
        moment("2020-01-01 7:00").format("LT")
      ) {
        late += 1;
      }
    }
    let remaining = assign - row.jo_accom_list.length;
    let data = [];
    if (bulk2 > 0) {
      data.push({
        FieldmanID: row.user_id,
        FieldmanName: row.completename,
        position: row.user_jobposition,
        branch: row.branch_name,
        date: date,
        type: "Bulk",
        value: bulk2,
      });
    }
    if (late > 0) {
      data.push({
        FieldmanID: row.user_id,
        FieldmanName: row.completename,
        position: row.user_jobposition,
        branch: row.branch_name,
        date: date,
        type: "Tardiness",
        value: late,
      });
    }
    if (remaining > 0) {
      data.push({
        FieldmanID: row.user_id,
        FieldmanName: row.completename,
        position: row.user_jobposition,
        branch: row.branch_name,
        date: date,
        type: "Completeness",
        value: remaining,
      });
    }
    // return data
  };
  const classes = useStyles();
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  const onCLickDays = () => {
    // console.log(record_single_data)
    // dispatch_data("loading_map", true);

    record_single_data.count_assign_data.map((val) => {
      val["accom_count"] = 0;
      val["Time_in"] = "";
      val["completename"] = record_single_data.fieldman[0]["completename"];
      val["uploaded"] = 0;
      val["count_attendance"] = 0;
      val["count_bulk"] = 0;
      val["user_id"] = "";
      val["user_pic"] = "";
      val["name"] = "";
      val["value_attn"] = [];
      let bulk = 0;
      let bulk2 = -10;
      let prev_coordinates = "";
      let bulk_val = false;
      record_single_data.fieldman.map((val_fn)=>{
        val["user_id"] = val_fn.user_id
        val["user_pic"] = val_fn.user_pic
        val["name"] = val_fn.completename
      })

      record_single_data.fieldman[0]["jo_accom_list"].map((val_jo) => {
        // console.log(val_jo)
        // if(parseInt(val_jo.batch[0].jo_count) > 0){
        // getExcelData(val_jo, moment(val.jo_date_assign).format("YYYY-MM-DD"))
        // }
        if (
          moment(val.jo_date_assign).format("YYYY-MM-DD") ===
          moment(val_jo.date_accom).format("YYYY-MM-DD")
        ) {
          val.accom_count += 1;
          if (val_jo.accom_images !== "") {
            val["uploaded"] += 1;
          }
          if (val_jo.fetched_coordinates === prev_coordinates) {
            bulk++;
          } else {
            if (bulk > 4) {
              bulk2 += bulk;
              bulk_val = true;
            }
            bulk = 0;
          }
          prev_coordinates = val_jo.fetched_coordinates;
        }
      });
      if (bulk > 0) {
        bulk2 += bulk;
      }
      if (bulk2 < 0) {
        bulk2 = 0;
      }
      if (bulk2 > 0) {
        bulk2 += 10;
      }
      val["count_bulk"] = bulk2;
      let attendance_val = []
      record_single_data.fieldman[0]["attendance"].map((val_att) => {
        if (
          moment(val.jo_date_assign).format("YYYY-MM-DD") ===
          moment(val_att.date_added).format("YYYY-MM-DD")
        ) {
          if (val["Time_in"] === "" && val_att.att_type === "Time-in") {
            val["Time_in"] = val_att.date_added;
          }
          attendance_val.push(val_att)
          val["count_attendance"] += 1;
        }
      });
      val["value_attn"] = attendance_val
   

    });
    dispatch_data("loading_map", false);
    setState({ ...state, open_days: true });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, val,index) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setState({ ...state, date_pick: val,index:index});
  };

  const handleClose = () => {
    // setAnchorEl(null);
    setState({...state,index:''})
  };
  const getExcelData = (row, date) => {
    // console.log(row)
    let assign = 0;
    let bulk = 0;
    let bulk2 = -10;
    let prev_coordinates = "";
    let bulk_val = false;
    let bulk_data = [];
    let bulk_data_new = [];
    // row.batch.map((val) => {
    //   assign += parseInt(val.jo_count);
    // });
    // var latlong = "";
    // var splitlatlng = "";
    // var lat = "";
    // var lng = "";
    // var complete_name = "";
    // let upload_count = 0;
    // row.jo_accom_list.map((val) => {
    //   if (val.accom_images !== "" && val.accom_images !== null) {
    //     upload_count++;
    //   }
    //   if (val.fetched_coordinates === prev_coordinates) {
    //     bulk++;
    //     bulk_data.push(val);
    //   } else {
    //     if (bulk > 4) {
    //       bulk2 += bulk;
    //       bulk_data.map((bulkdata1, index1) => {
    //         // if (index1 === 0) {
    //         bulkdata1["bulk"] = bulk;
    //         bulkdata1["bulk_data"] = bulk_data;
    //         bulk_data_new.push(bulkdata1);
    //         // }
    //         latlong = String(bulkdata1.fetched_coordinates);
    //         splitlatlng = latlong.split(",");
    //         lat = splitlatlng[0];
    //         lng = splitlatlng[1];
    //       });
    //       bulk_val = true;
    //     }
    //     bulk = 0;
    //     bulk_data = [];
    //   }
    //   prev_coordinates = val.fetched_coordinates;
    // });
    // if (bulk > 0) {
    //   bulk2 += bulk;
    //   bulk_data.map((bulkdata1, index1) => {
    //     // if (index1 === 0) {
    //     bulkdata1["bulk"] = bulk;
    //     bulkdata1["bulk_data"] = bulk_data;
    //     bulk_data_new.push(bulkdata1);
    //     // }
    //   });
    // }
    // if (bulk2 < 0) {
    //   bulk2 = 0;
    // }

    // let width = 0;

    // if (isNaN(row.jo_accom_list.length / assign)) {
    // } else {
    //   width = row.jo_accom_list.length / assign;
    // }
    // if (bulk2 > 0) {
    //   bulk2 += 10;
    // }
    // let late = 1;
    // if (row.attendance.length !== 0) {
    //   if (
    //     moment(row.attendance[0].date_added).format("LT") >
    //     moment("2021-01-01 "+row.day_sched.attn_in).format("LT")
    //   ) {
    //     late = 0;
    //   }
    // }
    // let remaining = assign - row.jo_accom_list.length;
    // if (remaining < 0) {
    //   remaining = 0;
    // }
    // let data = [];
    // let bulk_value = 1;
    // let time1 = 0;
    // let time2 = 0;
    // let time3 = 0;
    // let time4 = 0;
    // let completeness_val = 1;
    // let upload_count_val = 0;

    // if (bulk2 > 0) {
    //   bulk_value = 0;
    // }
    // if (row.attendance.length > 0) {
    //   time1 = 1;
    // }
    // if (row.attendance.length > 1) {
    //   time2 = 1;
    // }
    // if (row.attendance.length > 2) {
    //   time3 = 1;
    // }
    // if (row.attendance.length > 3) {
    //   time4 = 1;
    // }
    // if (remaining > 0) {
    //   completeness_val = 0;
    // }
    // if (upload_count >= row.jo_accom_list.length) {
    //   upload_count_val = 1;
    // }
    // let total = parseInt(
    //   time1 +
    //     time2 +
    //     time3 +
    //     time4 +
    //     late +
    //     completeness_val +
    //     bulk_value +
    //     upload_count_val +
    //     2
    // );

    // data.push({
    //   FieldmanID: row.user_id,
    //   FieldmanName: row.completename,
    //   position: row.user_jobposition,
    //   branch: row.branch_name,
    //   date: date,
    //   time1: time1,
    //   time2: time2,
    //   time3: time3,
    //   time4: time4,
    //   late: late,
    //   completeness: completeness_val,
    //   bulk: bulk_value,
    //   fieldFindings: 1,
    //   battery: 1,
    //   upload: upload_count_val,
    //   bulk_data: bulk2,
    //   completeness_data: remaining,
    //   total: total,
    //   delivered: row.jo_accom_list.length,
    // });
    // // if (bulk2 > 0) {
    // //     data.push({
    // //         FieldmanID: row.user_id,
    // //         FieldmanName: row.completename,
    // //         position: row.user_jobposition,
    // //         branch: row.branch_name,
    // //         date: date,
    // //         type: 'Bulk',
    // //         value: bulk2
    // //     })
    // // }
    // // if (late > 0) {
    // //     data.push({
    // //         FieldmanID: row.user_id,
    // //         FieldmanName: row.completename,
    // //         position: row.user_jobposition,
    // //         branch: row.branch_name,
    // //         date: date,
    // //         type: 'Tardiness',
    // //         value: late
    // //     })
    // // }
    // // if (remaining > 0) {
    // //     data.push({
    // //         FieldmanID: row.user_id,
    // //         FieldmanName: row.completename,
    // //         position: row.user_jobposition,
    // //         branch: row.branch_name,
    // //         date: date,
    // //         type: 'Completeness',
    // //         value: remaining
    // //     })
    // // }
    // return data;
  };
  const generateMemo = (val) => {
    let late = 1;
    let uploaded = 0;
    let bulk = 1;
    let completeness = 1;
    let completeness_data = parseInt(val.jo_count) - parseInt(val.accom_count);
    let time1 = 0;
    let time2 = 0;
    let time3 = 0;
    let time4 = 0;
    if (completeness_data <= 0) {
      completeness_data = 0;
    } else {
      completeness = 0;
    }
    if (val.count_bulk > 0) {
      bulk = 0;
    }
    if (val.uploaded >= val.accom_count) {
      uploaded = 1;
    }
    if (
      moment("2021-01-01 " + day_sched.attn_in).format("hh:mm") <
      moment(val.Time_in).format("hh:mm")
    ) {
      late = 0;
    }
    if (val.count_attendance > 0) {
      time1 = 1;
    }
    if (val.count_attendance > 1) {
      time2 = 1;
    }
    if (val.count_attendance > 2) {
      time3 = 1;
    }
    if (val.count_attendance > 3) {
      time4 = 1;
    }
    let total = parseInt(
      time1 + time2 + time3 + time4 + late + completeness + bulk + uploaded + 2
    );
    let data = {
      FieldmanID: val.user_id,
      FieldmanName: val.completename,
      battery: 1,
      branch: branch_name,
      bulk: bulk,
      bulk_data: val.count_bulk,
      completeness: completeness,
      completeness_data: completeness_data,
      date: moment(val.jo_date_assign).format("YYYY-MM-DD"),
      delivered: val.accom_count,
      fieldFindings: 1,
      late: late,
      position: user_jobposition,
      time1: time1,
      time2: time2,
      time3: time3,
      time4: time4,
      total: total,
      upload: uploaded,
    };
    getData(
      "tracking/generate_memo_SOA2",
      {
        data: [data],
        user_id: localStorage.getItem("u"),
        branch_id: branch_id,
      },
      discon
    ).then((res) => {
      let data_res = res;
      let control_no = "";
      let fieldmanName = "";
      let date_created_val = "";
      let branch_name = "";
      let memo_data = data_res.response;
      let date_accom = "";
      let total_delivered = "";
      let total_pending = "";
      let total_bulk = "";
      let approver_1 = null;
      let approver_2 = null;
      let approver_3 = null;
      memo_data.map((val) => {
        let date_created = String(val.date_created).split("-");
        let c_no =
          date_created[0] +
          "-" +
          date_created[1] +
          "-" +
          val.memo_received_list_id;
        memo_data = val;
        memo_data["control_no"] = c_no;
        date_created_val = moment(val.date_created).format("YYYY-MM-DD");
        let fman_data = JSON.parse(val.memo_details);
        control_no = c_no;
        approver_1 = val.approver_1;
        approver_2 = val.approver_2;
        approver_3 = val.approver_3;
        fman_data.map((val_fman) => {
          fieldmanName = val_fman.FieldmanName;
          branch_name = val_fman.branch;
          date_accom = val_fman.date;
          total_delivered = val_fman.delivered;
          total_pending = val_fman.completeness_data;
          total_bulk = val_fman.bulk_data;
        });
      });
      let details = {};
      details.control_no = control_no;
      details.fieldmanName = fieldmanName;
      details.branch_name = branch_name;
      details.date_created_val = date_created_val;
      details.date_accom = date_accom;
      details.total_delivered = total_delivered;
      details.total_pending = total_pending;
      details.total_bulk = total_bulk;
      details.approver_1 = approver_1;
      details.approver_2 = approver_2;
      details.approver_3 = approver_3;

      let new_details = [];
      new_details.push(details);
      setState({
        ...state,
        memo_accom: true,
        memo_details: data_res.memo_details,
        memo_data: new_details,
      });
    });
  };
  const openAttachFile=(val)=>{
    setState({...state,attach_file_open:true,attach_data:val})

  }
  const viewAttachments=(val)=>{
    console.log(val)
    setState({...state,viewAttachments_open:true,attach_data:val})

  }
  const closeAttachfile =()=>{
    setState({...state,attach_file_open:false})
  }
  const navigate_fieldman_accom = (data) =>{
    console.log(data)
    record_single_data.count_assign_data.map((val) => {
      
      if(moment(val.jo_date_added).format('YYYY-MM-DD') === moment(data.from).format('YYYY-MM-DD')){
        val["accom_count"] = 0;
        val["Time_in"] = "";
        val["completename"] = record_single_data.fieldman[0]["completename"];
        val["uploaded"] = 0;
        val["count_attendance"] = 0;
        val["count_bulk"] = 0;
        val["user_id"] = "";
        val["user_pic"] = "";
        val["name"] = "";
        val["value_attn"] = [];
        let bulk = 0;
        let bulk2 = -10;
        let prev_coordinates = "";
        let bulk_val = false;
        record_single_data.fieldman.map((val_fn)=>{
          val["user_id"] = val_fn.user_id
          val["user_pic"] = val_fn.user_pic
          val["name"] = val_fn.completename
        })
  
        record_single_data.fieldman[0]["jo_accom_list"].map((val_jo) => {
          // console.log(val_jo)
          // if(parseInt(val_jo.batch[0].jo_count) > 0){
          // getExcelData(val_jo, moment(val.jo_date_assign).format("YYYY-MM-DD"))
          // }
          if (
            moment(val.jo_date_assign).format("YYYY-MM-DD") ===
            moment(val_jo.date_accom).format("YYYY-MM-DD")
          ) {
            val.accom_count += 1;
            if (val_jo.accom_images !== "") {
              val["uploaded"] += 1;
            }
            if (val_jo.fetched_coordinates === prev_coordinates) {
              bulk++;
            } else {
              if (bulk > 4) {
                bulk2 += bulk;
                bulk_val = true;
              }
              bulk = 0;
            }
            prev_coordinates = val_jo.fetched_coordinates;
          }
        });
        if (bulk > 0) {
          bulk2 += bulk;
        }
        if (bulk2 < 0) {
          bulk2 = 0;
        }
        if (bulk2 > 0) {
          bulk2 += 10;
        }
        val["count_bulk"] = bulk2;
        let attendance_val = []
        record_single_data.fieldman[0]["attendance"].map((val_att) => {
          if (
            moment(val.jo_date_assign).format("YYYY-MM-DD") ===
            moment(val_att.date_added).format("YYYY-MM-DD")
          ) {
            if (val["Time_in"] === "" && val_att.att_type === "Time-in") {
              val["Time_in"] = val_att.date_added;
            }
            attendance_val.push(val_att)
            val["count_attendance"] += 1;
          }
        });
        val["value_attn"] = attendance_val
       onTrackAccomplishments(val.user_pic,val.user_id,val.jo_date_assign,val.name,val.jo_count,val.count_attendance,attendance_val,{batch:[val]},[],'History')
        // setState({...state,summary:false})
      }
     
   

    });
    record_single_data.count_assign_data.map((val, index) => {
      if(moment(val.jo_date_added).format('YYYY-MM-DD') === moment(data.from).format('YYYY-MM-DD')){
        // 
        console.log(val)
       onTrackAccomplishments(val.user_pic,val.user_id,val.jo_date_assign,val.name,val.jo_count,val.count_attendance,val.value_attn,{batch:[val]},[],'History')
        // setState({...state,summary:false})
      }
      
    })
   
  }
  return (
    <div>
     
  
      {/* <Backdrop
        className={classes.backdrop}
        open={map_reducer.loading_map}
        style={{ zIndex: 999999999 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      {state.summary?<Summary
       back={()=>setState({...state,summary:false})}
       record_start_date = {record_start_date}
       record_end_date = {record_end_date}
       userImage = {UserImage}
       branch_id = {branch_id}
       branch_name={branch_name}
       complete_name = {state.complete_name}
       assign = {state.assign}
       jo_accom_list = {state.jo_accom_list}
       count_assign_day = {state.count_assign_day}
       user_id = {user_id}
       jo_type_val={jo_type_val}
       navigate_fieldman_accom = {navigate_fieldman_accom}
       />: 
      <>
       <div style={{display:'flex',flexDirection:'row'}}>
      <Button
       style={{marginRight:6}}
              display={"none"}
              variant="contained"
              color="#7f8c8d"
              className={classes.button}
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                back()
              }}
            >
              {" "}
              Back
            </Button>
            <Button
              style={{marginRight:6}}
              variant="contained"
              color="#7f8c8d"
              className={classes.button}
              startIcon={<FilterListIcon />}
              onClick={() => {
                setOpenRecord();
              }}
            >
              Filter
            </Button>
            <div
            type='button'
          onClick={() => {
            setState({...state,summary:true})
            // setFieldman_list(false);
            // setShowGraph(true);
          }}
          style={{
            marginRight: 10,
            marginTop:2,
            cursor:'pointer'
          }}
        >
          <EqualizerIcon
            style={{
              color: "#f1c40f",
              fontSize: 35,
              background: "rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>
      <div
        className={classes.dashboards}
        style={{
          height: 100,
          width: 300,
          // margin: 18,
          top: 116,
          position: "fixed",
          zIndex: 2,
          padding: 15,
        }}
      >
        {/* <button onClick={() => { generate_validation() }}>Try</button> */}
        <div style={{ position: "absolute", zIndex: 2, right: 1, top: 1 }}>
          <IconButton
            onClick={() => {
              setState({ ...state, open_modal: true });
            }}
            aria-label="delete"
          >
            <AddCircleIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
        <div
          className={classes.whiteText}
          style={{ position: "absolute", left: 100, top: 10 }}
        >
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
            {moment(record_start_date).format("ll") +
              " -- " +
              moment(record_end_date).format("ll")}
          </Typography>
        </div>
        <img
          alt="picture"
          src={UserImage}
          style={{
            width: 60,
            height: 60,
            margin: "auto",
            borderRadius: 60 / 2,
            margintop: 30,
          }}
        />

        <div
          className={classes.whiteText}
          style={{ position: "absolute", left: 100, top: 40 }}
        >
          <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
            {state.complete_name}
          </Typography>
        </div>
      </div>
      <div
        className={classes.dashboards}
        style={{
          height: 32,
          width: 135,
          left: 335,
          margin: 18,
          top: 98,
          position: "fixed",
          zIndex: 2,
          padding: 15,
        }}
      >
        <div style={{ marginTop: -10 }}>
          <Typography style={{ color: "#fff", fontSize: 14 }}>
            Ave. Assign
          </Typography>
          <div
            className={classes.whiteText}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: -5,
            }}
          >
            <Typography style={{ color: "#3498db", fontSize: 25 }}>
              {isNaN(state.assign / state.count_assign_day)
                ? 0
                : parseInt(state.assign / state.count_assign_day)}
            </Typography>
            <Typography style={{ color: "#3498db", fontSize: 14 }}>
              {" "}
              per day
            </Typography>
          </div>
        </div>
      </div>
      <div
        className={classes.dashboards}
        style={{
          height: 32,
          width: 135,
          left: 335,
          margin: 18,
          top: 165,
          position: "fixed",
          zIndex: 2,
          padding: 15,
        }}
      >
        <div style={{ marginTop: -10 }}>
          <Typography style={{ color: "#fff", fontSize: 14 }}>
            Ave. Accom
          </Typography>
          <div
            className={classes.whiteText}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: -5,
            }}
          >
            <Typography style={{ color: "#2ecc71", fontSize: 25 }}>
              {isNaN(state.jo_accom_list / state.count_assign_day)
                ? 0
                : parseInt(state.jo_accom_list / state.count_assign_day)}
            </Typography>
            <Typography style={{ color: "#2ecc71", fontSize: 14 }}>
              {" "}
              per day
            </Typography>
          </div>
        </div>
      </div>
      <div
        className={classes.dashboards}
        style={{
          height: 140,
          width: 500,
          top: 251,
          // margin: 18,
          position: "fixed",
          zIndex: 2,
        }}
      >
        <div style={{ padding: 15, marginTop: 5 }}>
          <Grid container className={classes.whiteText} spacing={2}>
            <Grid
              item
              xs={3}
              md={3}
              onClick={() => {
                dispatch_data("loading_map", true) 
              setTimeout(()=>{
                onCLickDays()
              },300)}
            }
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 28, color: "#fff" }}>
                  {formatNumber(state.count_assign_day)}
                </Typography>
                <Typography style={{ fontSize: 18, color: "#fff" }}>
                  {}
                </Typography>
                <Typography style={{ fontSize: 14, marginTop: 30 }}>
                  Total Days
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 28, color: "#f1c40f" }}>
                  {formatNumber(state.assign)}
                </Typography>
                <Typography style={{ fontSize: 18, color: "#f1c40f" }}>
                  {}
                </Typography>
                <Typography style={{ fontSize: 14, marginTop: 30 }}>
                  Assigned
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 28, color: "#2ecc71" }}>
                  {formatNumber(state.jo_accom_list)}
                </Typography>
                <Typography style={{ fontSize: 18, color: "#f1c40f" }}>
                  {isNaN(state.jo_accom_list / state.assign)
                    ? 0
                    : parseFloat(
                        (state.jo_accom_list / state.assign) * 100
                      ).toFixed(2)}
                  %
                </Typography>
                <Typography style={{ fontSize: 14 }}>Accomplished</Typography>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontSize: 28, color: "#9c88ff" }}>
                  {formatNumber(state.assign - state.jo_accom_list)}
                </Typography>
                <Typography style={{ fontSize: 18, color: "#9c88ff" }}>
                  {isNaN((state.assign - state.jo_accom_list) / state.assign)
                    ? 0
                    : parseFloat(
                        ((state.assign - state.jo_accom_list) / state.assign) *
                          100
                      ).toFixed(2)}
                  %
                </Typography>
                <Typography style={{ fontSize: 14 }}>Unaccomplished</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div>
        <div
          className={classes.dashboards}
          style={{
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
            height: 252,
            width: 500,
            top: 396,
            // margin: 18,
            position: "fixed",
            zIndex: 2,
          }}
        >
          <div style={{ padding: 15, width: "70%" }}>
            <Typography
              style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}
            >
              Job Order
            </Typography>
            {/* <Grid container className={classes.whiteText} spacing={2}> */}
            <div
              style={{ width: 393, position: "absolute", right: 120, top: 25 }}
            >
              <PieGrap pieGraph={state.pie_graph} />
            </div>
            {/* </Grid> */}
          </div>
          <div style={{ width: "30%", padding: 15 }}>
            {}
            {state.delivery_type.map((val, index) => {
              let width_type = "45%";
              let width_asteris = "20%";

              state.delivery_type.map((val_type) => {
                if (val_type.type === "RE-OUT DN" && val_type.count === 0) {
                  width_type = "60%";
                  width_asteris = "10%";
                }
                if (val_type.type === "RE-OUT SOA" && val_type.count === 0) {
                  width_type = "60%";
                  width_asteris = "10%";
                }
              });
              if (val.count !== 0)
                return (
                  <div
                    key={index}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography
                      style={{
                        color: "#fff",
                        width: width_type,
                        fontSize: 13.5,
                        fontWeight: "bold",
                      }}
                    >
                      {val.type}{" "}
                    </Typography>
                    <Typography
                      style={{
                        color: "#fff",
                        width: width_asteris,
                        fontSize: 13.5,
                        fontWeight: "bold",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      style={{
                        color: "#fff",
                        width: "30%",
                        fontSize: 13.5,
                        fontWeight: "bold",
                      }}
                    >
                      {val.count}
                    </Typography>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      {state.open_days ? (
        <div>
          <div
            className={classes.dashboards}
            style={{
              height: 492,
              width: 560,
              left: 505,
              margin: 18,
              top: 98,
              position: "fixed",
              zIndex: 2,
              padding: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                right: 5,
                top: 4,
              }}
            >
              <IconButton
                onClick={() => {
                  setState({ ...state, open_days: false });
                }}
                aria-label="delete"
              >
                <CloseIcon style={{ color: "#fff" }} />
              </IconButton>
            </div>
            <Typography style={{ fontSize: 15, color: "#fff" }}>
              History Accoplishments
            </Typography>
            <Scrollbars style={{ height: 440, paddingTop: 10 }}>
              {record_single_data.count_assign_data.map((val, index) => {
                let width = 0;
                let assign = parseInt(val.jo_count);
                let late = false
                if (isNaN(val.accom_count / assign)) {
                } else {
                  width = val.accom_count / assign;
                }
                if(moment(val.Time_in).format("LT") > moment("2021-01-01 " + day_sched.attn_in).format("LT")){
                  late = true
                }
                let current_date = false
                if(moment(val.jo_date_assign).format("MMMM DD, YYYY") === moment(new Date()).format("MMMM DD, YYYY")){
                  current_date = true
                }
                return (
                  <div
                
                    key={index}
                    style={{
                      height: 175,
                      position: "relative",
                      marginTop: index === 0 ? 15 : undefined,
                      cursor:'pointer'
                    }}
                  >
                    <div>
                      <Typography
                        style={{
                          color: "#fff",
                          fontWeight: "Bold",
                          fontSize: 14,
                          marginLeft: 10,
                        }}
                      >
                        {moment(val.jo_date_assign).format("MMMM DD, YYYY")}
                      </Typography>
                      <div style={{ padding: 30 }}   onClick={()=>{
                    // back()
                    onTrackAccomplishments(val.user_pic,val.user_id,val.jo_date_assign,val.name,val.jo_count,val.count_attendance,val.value_attn,{batch:[val]},[],'History')
                  }}>
                        <div style={{ position: "relative" }}>
                          <div
                            style={{
                              width: 300,
                              height: 15,
                              borderRadius: 5,
                              backgroundColor: "#fff",
                              position: "absolute",
                            }}
                          ></div>
                          <div
                            style={{
                              width: 300 * width > 300 ? 300 : 300 * width,
                              height: 15,
                              borderRadius: 5,
                              backgroundColor: "#3498db",
                              position: "absolute",
                            }}
                          ></div>
                        </div>
                        <Grid
                          
                          container
                          className={classes.whiteText}
                          spacing={2}
                          style={{
                            marginTop: 15,
                          }}
                        >
                          <Grid item md={4}>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              {late ? (
                                <CancelIcon style={{ color: "#e74c3c" }} />
                              ) : (
                                <CheckCircleIcon style={{ color: "#2ecc71" }} />
                              )}

                              <Typography>
                                {moment(val.Time_in).format("hh:mm")}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item md={4}>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              {parseInt(val.accom_count) < assign ? (
                                <CancelIcon style={{ color: "#e74c3c" }} />
                              ) : (
                                <CheckCircleIcon style={{ color: "#2ecc71" }} />
                              )}

                              <Typography>Completeness</Typography>
                            </div>
                          </Grid>
                          <Grid item md={4}>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              {val.count_bulk > 0 ? (
                                <CancelIcon style={{ color: "#e74c3c" }} />
                              ) : (
                                <CheckCircleIcon style={{ color: "#2ecc71" }} />
                              )}

                              <Typography>
                                {val.count_bulk}&nbsp;Bulk Delivery
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.whiteText}
                          spacing={2}
                          style={{}}
                        >
                          <Grid item md={4}>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              <CheckCircleIcon style={{ color: "#2ecc71" }} />
                              <Typography>Field Findings</Typography>
                            </div>
                          </Grid>
                          <Grid item md={4}>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              <CheckCircleIcon style={{ color: "#2ecc71" }} />
                              <Typography>Battery</Typography>
                            </div>
                          </Grid>
                          <Grid item md={4}>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              {val.accom_count === val.uploaded ? (
                                <CheckCircleIcon style={{ color: "#2ecc71" }} />
                              ) : (
                                <CancelIcon style={{ color: "#e74c3c" }} />
                              )}
                              <Typography>
                                {val.uploaded}&nbsp;Uploaded
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                        {/* <div style={{display:'flex',flexDirection:'row'}}>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                              </div> */}
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        flexDirection: "row",
                        display: "flex",
                        top: 30,
                        right: 60,
                      }}
                    >
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background:
                            val.count_attendance > 0 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background: assign > 0 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background:
                            val.count_attendance > 1 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background:
                            val.count_attendance > 2 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          background:
                            val.count_attendance > 3 ? "#2ecc71" : "#fff",
                          borderRadius: 15 / 2,
                          marginRight: 10,
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        flexDirection: "row",
                        display: "flex",
                        top: -15,
                        right: 10,
                      }}
                    >
                      {((parseInt(val.accom_count) < assign) || (val.count_bulk > 0 )|| (late) )&& val.uploaded >0  ? 
                      <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      style={{
                        backgroundColor: "rgba(6,86,147)",
                        color: "#fff",
                      }}
                      onClick={(e) => handleClick(e, val,index)}
                    >
                      Memo
                    </Button>
                      : undefined
                        
                      }
                    
                      <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={index===state.index?true:false}
                        onClose={handleClose}
                      >
                         {parseInt(val.accom_count) < assign || val.count_bulk > 0 ?
                          <StyledMenuItem
                          onClick={(e) => {  e.stopPropagation(); generateMemo(val)}}
                        >
                          <ListItemIcon>
                            <PictureAsPdfIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Memo Completeness" />
                        </StyledMenuItem>
                         :undefined
              }
                        
                       
                        {/* {late?
                        <StyledMenuItem>
                        <ListItemIcon>
                          <PictureAsPdfIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Memo Late" />
                      </StyledMenuItem>
                        :undefined

                        } */}
                        
                        <StyledMenuItem onClick={(e)=>{
                          e.stopPropagation();
                            openAttachFile(val)
                        }}>
                          <ListItemIcon>
                            <AttachFileIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Attach Explanation" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={(e)=>{
                          e.stopPropagation();
                            viewAttachments(val)
                        }}>
                          <ListItemIcon>
                            <ViewStreamIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="View Explanation" />
                        </StyledMenuItem>
                      </StyledMenu>
                    </div>

                    <div style={{ position: "absolute", top: 50, right: 90 }}>
                      <Typography style={{ color: "#fff" }}>
                        ({val.accom_count} of {assign})
                      </Typography>
                    </div>
                    <div
                      style={{
                        marginTop: -15,
                        width: "100%",
                        backgroundColor: "#2d3436",
                        height: 1.2,
                      }}
                    ></div>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div>
      
      ) : undefined}
        </>
}

      <Dialog
        open={state.open_modal}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            "Are you sure that you want to remove the days with bulk and incomplete accomplishments?"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If this was the action you wanted to do, please confirm your choice,
            or cancel and return to the page
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setState({ ...state, open_modal: false });
            }}
            style={{ color: "rgba(6,86,147)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              generate_validation();
            }}
            style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
            autoFocus
            variant="contained"
            className={classes.button}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.memo_accom}
        onClose={() => {
          setState({ ...state, memo_accom: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Preview</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>
                setState({
                  ...state,
                  memo_accom: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <AccomMemo
            memo_data={state.memo_data}
            memo_details={state.memo_details}
            logo={logo}
            company_id={company_id}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.attach_file_open}
        onClose={() => {
          setState({ ...state, attach_file_open: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Attach File</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>
                setState({
                  ...state,
                  attach_file_open: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <AttachFile 
          user_id={user_id}
          attach_data={state.attach_data}
          closeAttachfile={()=>closeAttachfile()}/>
          
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={state.viewAttachments_open}
        onClose={() => {
          setState({ ...state, viewAttachments_open: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Attachments</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>
                setState({
                  ...state,
                  viewAttachments_open: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <ViewAttachment 
          user_id={user_id}
          attach_data={state.attach_data}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Records;
