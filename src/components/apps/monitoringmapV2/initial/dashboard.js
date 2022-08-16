import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Divider,
  TableBody,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel ,
  Radio
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Pie from "./charts/pie";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReorderIcon from '@material-ui/icons/Reorder';
import Slide from "@material-ui/core/Slide";
import Filter from "./filter";
import CloseIcon from "@material-ui/icons/Close";
import { getData, cancelRequest } from "../../../api/api";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import axios from "axios"
import RefreshIcon from '@material-ui/icons/Refresh';
import Summary_monitoring from './summary_monitoring'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import TrackingAssignedLocation from './trackassignedLocation'
import TableAssignFormat from './table_assign_format'
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import MoneyIcon from '@material-ui/icons/Money';
import ReturnedJo from './returnedJo'
import GavelIcon from '@material-ui/icons/Gavel';
import TableChartIcon from '@material-ui/icons/TableChart';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MuiTableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(TableCell);
let counterError = 0;

const Home = forwardRef((props, ref) => {
  const {
    closeHome,
    onClickFieldman,
    gridSize,
    openLineHours,
    dash_click,
    onChangeLogo,
    refresh,
    closeList,
    onChangetrackAccom,
    onChangeExcelFile,
    passRunningAverage,
    fieldman_map,
    onTrackAccomplishmentsRoute

  } = props
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const [open, setOpen] = React.useState(false);
  // React.useEffect(() => {
  //   averageRunningAssign()
   
  //   // initial_data()
  // }, [])

  const initial_data = () => {
    let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph")
    if (onSelectData !== null) {
      let jo_type = [];
      let branch_field_details = [];
      let job_position = "";
      let pin_img = [];
      home_reducer.SelectedBranches.map((val, index) => {
        if (val.branch_id === JSON.parse(onSelectData).selection[0]) {
          if (val.branch_field_work !== "") {
            jo_type = JSON.parse(val.branch_field_work);
            if (val.branch_field_details != null) {
              branch_field_details = JSON.parse(val.branch_field_details);
            }
            if (val.branches_pin_img != null) {
              pin_img = JSON.parse(val.branches_pin_img);
            }
            if (val.branch_field_personnel !== "") {
              let user_pos = JSON.parse(val.branch_field_personnel);
              job_position = user_pos[0];
            }
          }
  
        }
      });
      map_reducer.branch_field_details = branch_field_details;

      getMapData(JSON.parse(onSelectData))

    }
  }

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    date_start_val: new Date(),
    date_display: new Date(),
    Selectedcompany: "",
    Selected_branch: "",
    countRequest: 0,
    jo_position: "",
    array_dashboard_data: [
      { type: "PRESENT", data: [], color: "#58b19f" },
      { type: "LATE", data: [], color: "#f3a683" },
      { type: "ABSENT", data: [], color: "#ff7979" },
      { type: "ON FIELD", data: [], color: "#ecf0f1" },
      { type: "REPLACEMENT", data: [], color: "#9b59b6" },
      { type: "RESCUE", data: [], color: "#ff4d4d" },
      { type: "NO SCHEDULE", data: [], color: "#74b9ff" },
      { type: "INACTIVE", data: [], color: "#f1c40f" },

    ],
    attendance_data: [
      { type: "PRESENT", data: [], color: "#58b19f" },
      { type: "LATE", data: [], color: "#f3a683" },
      { type: "ABSENT", data: [], color: "#ff7979" },
    ],
    jo_accom_list: 0,
    pie_graph: [],
    fieldman: [],
    count_fieldman: 0,
    total_jo: 0,
    runningAve: 0,
    assign: 0,
    status_jo: [
      {
        type: "ASSIGN",
        value: 0,
        percentage: 0,
        bg_color: "#487eb0",
      },
      {
        type: "ACCOMPLISHED",
        value: 0,
        percentage: 0,
        bg_color: "#58b19f",
      },
      {
        type: "UNASSIGNED",
        value: 0,
        percentage: 0,
        bg_color: "#f39c12",
      },

      {
        type: "REMAINING",
        value: 0,
        percentage: 0,
        bg_color: "#e74c3c",
      },
    ],
    data_type: [],
    fieldman_map: [],
    line_hours: [],
    summary_accom: false,
    excel_invalid_data: [],
    excelFile: [],
    breakdown: false,
    with_schedule: [],
    no_schedule: [],
    scheduled: [
      {
        type: 'PRESENT',
        count: [],
        color: "#2980b9"
      },
      {
        type: 'LATE',
        count: [],
        color: "#f1c40f"
      },
      {
        type: 'ABSENT',
        count: [],
        color: "#e74c3c"
      },
      {
        type: 'ASSIGNED',
        count: [],
        color: "#2ecc71"
      },
      {
        type: 'NO ASSIGNED',
        count: [],
        color: "#9b59b6"
      },
    ],
    no_scheduled: [
      {
        type: 'PRESENT',
        count: [],
        color: "#2980b9"
      },
      {
        type: 'LATE',
        count: [],
        color: "#f1c40f"
      },
      {
        type: 'ASSIGNED',
        count: [],
        color: "#2ecc71"
      },
      {
        type: 'NO ASSIGNED',
        count: [],
        color: "#9b59b6"
      },
    ],
    rescue_data: [
      {
        type: 'PRESENT',
        count: [],
        color: "#2980b9"
      },
      {
        type: 'LATE',
        count: [],
        color: "#f1c40f"
      },
      {
        type: 'ASSIGNED',
        count: [],
        color: "#2ecc71"
      },
    ],
    selectedBreakdown: "",
    selectedBreakdownData: [],
    selectedBreakdownModal: false,
    emp_position: ['REGULAR', 'APPRENTICE', 'TRAINEE'],
    initial_data_fetch: [],
    data_filter: [],
    average: [
      { name: 'RUNNING ACCOM', value: 0 },
      { name: 'RUNNING ASSIGN', value: 0 },
      { name: 'ACCOM AVE.', value: 0 },
      { name: 'ASSIGN AVE.', value: 0 },
    ],
    average_data:[],
    trackAssignLocationModal:false,
    optionTracking:'Name',
    tableFormatAssignedDetails:false,
    returnedJO_modal:false
  });

  useImperativeHandle(ref, () => ({
    get_nitial_data() {
      initial_data()
    },
    open_summary() {
      setState(prev => ({ ...prev, summary_accom: true }))
    },
    updateDashboard(countChange) {
      let initial = state.initial_data_fetch
      initial.fieldman = countChange
      Data_format(initial, state.data_filter)
      setState(prev => ({ ...prev }))
    }
  }));
  const handleDateChangeStart = (date) => {
    setState((prev) => ({
      ...prev,
      date_start_val: date,
    }));
  };

  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });
    home_reducer.SelectedBranches = branches_data;
    setState((prev) => ({
      ...prev,
      Selectedcompany: e.target.value,
    }));
  };

  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };

  const onChangeBranch = (e) => {
    let jo_type = [];
    let branch_field_details = [];
    let job_position = "";
    let pin_img = [];
    home_reducer.SelectedBranches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
          if (val.branch_field_details != null) {
            branch_field_details = JSON.parse(val.branch_field_details);
          }
          if (val.branches_pin_img != null) {
            pin_img = JSON.parse(val.branches_pin_img);
          }
          if (val.branch_field_personnel !== "") {
            let user_pos = JSON.parse(val.branch_field_personnel);
            job_position = user_pos[0];
          }
        }

      }
    });
    map_reducer.branch_field_details = branch_field_details;
    map_reducer.jo_type = jo_type;
    map_reducer.job_position = job_position;
    map_reducer.selected_jo = [];
    map_reducer.pin_img = pin_img;
    setState((prev) => ({
      ...prev,
      Selected_branch: e.target.value,
    }));
  };

  const onChangeJobOrder = (e) => {
    map_reducer.selected_jo.push(e.target.value);
    setState((prev) => ({
      ...prev,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getMapData(data) {
    try {
      dispatch_data("loading_map", true);
      let selection = data.selection;
      let from = data.from;
      let to = data.to;
      let company_id = data.company_id;
      let jo_type = data.jo_type;
      let counter = 0;
      setTimeout(() => {
        if (counter === 0) {
          if (counterError === 0) {
            cancelRequest()
            getMapData(data)
            counterError++
          } else {
            cancelRequest()
            alert("Poor internet connection.")
            dispatch_data("loading_map", false);
          }
        }
      }, 50000)
      let res = await getData("aam/trackEmployeesLocationv4", data);
      counter = 1
      dispatch({
        type: 'selected_filter',
        branch_id: data.selection[0],
        company_id: data.company_id
      })
      Data_format(res, data);
    } catch (error) {
      let resCancel = String(error).includes("Operation canceled by the user")
      if (!resCancel) {
        dispatch_data("loading_map", false);
      }
      let res = String(error).includes("Network Error");
      if (res) {

        if (state.countRequest < 5) {
          setTimeout(() => {
            getMapData(data);
          }, 2000);
          setState((prev) => ({ ...prev, countRequest: state.countRequest++ }));
        } else {
          // dispatch_data("loading_map", false);
          alert("Please check your internet connection.");
        }

      } else {
        // dispatch_data("loading_map", false);
        // alert("Something went wrong.");
      }
    }
  }
  const Data_format = (data, data_filter) => {
    averageRunningAssign(data_filter)

    let jo_aubd = parseInt(data.jobcount.jo_aubd);
    let jo_dn = parseInt(data.jobcount.jo_dn);
    let jo_dn_reout = parseInt(data.jobcount.jo_dn_reout);
    let jo_meco = parseInt(data.jobcount.jo_meco);
    let jo_nac = parseInt(data.jobcount.jo_nac);
    let jo_ncr = parseInt(data.jobcount.jo_ncr);
    let jo_osb = parseInt(data.jobcount.jo_osb);
    let jo_osn = parseInt(data.jobcount.jo_osn);
    let jo_soa = parseInt(data.jobcount.jo_soa);
    let jo_soa_reout = parseInt(data.jobcount.jo_soa_reout);
    let new_fieldman = [];
    let rescue = [];
    let absent = [];
    let no_schedule = [];
    let onField = [];
    let no_area = [];
    let late = [];
    let inactive = [];
    let schedule_fieldman = data.scheduled_fieldman;
    let with_jo = [];
    let with_out_jo = [];
    let latlng = "";
    let jo_assign = 0;
    let jo_accom_list = 0;
    let present = [];
    let replacement = [];
    let fieldman_count = 0;
    let rescue_diff_position = [];
    let with_schedule = [];



    let branch_name = '';
    let jo_assign_type = {
      jo_aubd: 0,
      jo_count: 0,
      jo_discon: 0,
      jo_dn: 0,
      jo_dn_reout: 0,
      jo_map: 0,
      jo_meco: 0,
      jo_nac: 0,
      jo_ncr: 0,
      jo_osb: 0,
      jo_osn: 0,
      jo_reading: 0,
      jo_recon: 0,
      jo_rescue: 0,
      jo_soa: 0,
      jo_soa_reout: 0,
      jo_validate: 0,
    }
    data.fieldman.map((val) => {
      branch_name = val.branch_name;
      let fieldman_data = val;
      if (
        String(val.user_jobposition).toUpperCase() ===
        String(map_reducer.job_position).toUpperCase()
      ) {
        fieldman_data["jo_sched"] = "Normal";
        new_fieldman.push(fieldman_data);
      } else {
        if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom > 0) {
          fieldman_data["jo_sched"] = "Rescue";
          new_fieldman.push(fieldman_data);
          rescue_diff_position.push(val);
        }
      }
      val.batch.map((val_batch) => {
        jo_assign_type.jo_aubd += parseInt(val_batch.jo_aubd)
        jo_assign_type.jo_count += parseInt(val_batch.jo_count)
        jo_assign_type.jo_discon += parseInt(val_batch.jo_discon)
        jo_assign_type.jo_dn += parseInt(val_batch.jo_dn)
        jo_assign_type.jo_dn_reout += parseInt(val_batch.jo_dn_reout)
        jo_assign_type.jo_map += parseInt(val_batch.jo_map)
        jo_assign_type.jo_meco += parseInt(val_batch.jo_meco)
        jo_assign_type.jo_nac += parseInt(val_batch.jo_nac)
        jo_assign_type.jo_ncr += parseInt(val_batch.jo_ncr)
        jo_assign_type.jo_osn += parseInt(val_batch.jo_osn)
        jo_assign_type.jo_osb += parseInt(val_batch.jo_osb)
        jo_assign_type.jo_reading += parseInt(val_batch.jo_reading)
        jo_assign_type.jo_recon += parseInt(val_batch.jo_recon)
        jo_assign_type.jo_rescue += parseInt(val_batch.jo_rescue)
        jo_assign_type.jo_soa += parseInt(val_batch.jo_soa)
        jo_assign_type.jo_soa_reout += parseInt(val_batch.jo_soa_reout)
        jo_assign_type.jo_validate += parseInt(val_batch.jo_validate)

        if (val_batch.jo_rescue !== "") {
          let rescue_array = JSON.parse(val_batch.jo_rescue);
          rescue_array.map((val_rescue) => {
            rescue.push(val_rescue);
          });
        }
      });
    });

    // Deleted Fieldman Start
    data.deleted_fieldman.forEach((val) => {
      if (val.jo_accom_list.length > 0) {
        let fieldman_data = val;
        if (
          String(val.user_jobposition).toUpperCase() ===
          String(map_reducer.job_position).toLocaleUpperCase()
        ) {
          fieldman_data["jo_sched"] = "Normal";
          new_fieldman.push(fieldman_data);
        } else {
          if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom > 0) {
            fieldman_data["jo_sched"] = "Rescue";
            new_fieldman.push(fieldman_data);
            rescue_diff_position.push(val);
          }
        }
        val.batch.forEach((val_batch) => {
          jo_assign_type.jo_aubd += parseInt(val_batch.jo_aubd)
          jo_assign_type.jo_count += parseInt(val_batch.jo_count)
          jo_assign_type.jo_discon += parseInt(val_batch.jo_discon)
          jo_assign_type.jo_dn += parseInt(val_batch.jo_dn)
          jo_assign_type.jo_dn_reout += parseInt(val_batch.jo_dn_reout)
          jo_assign_type.jo_map += parseInt(val_batch.jo_map)
          jo_assign_type.jo_meco += parseInt(val_batch.jo_meco)
          jo_assign_type.jo_nac += parseInt(val_batch.jo_nac)
          jo_assign_type.jo_ncr += parseInt(val_batch.jo_ncr)
          jo_assign_type.jo_osn += parseInt(val_batch.jo_osn)
          jo_assign_type.jo_osb += parseInt(val_batch.jo_osb)
          jo_assign_type.jo_reading += parseInt(val_batch.jo_reading)
          jo_assign_type.jo_recon += parseInt(val_batch.jo_recon)
          jo_assign_type.jo_rescue += parseInt(val_batch.jo_rescue)
          jo_assign_type.jo_soa += parseInt(val_batch.jo_soa)
          jo_assign_type.jo_soa_reout += parseInt(val_batch.jo_soa_reout)
          jo_assign_type.jo_validate += parseInt(val_batch.jo_validate)
          if (val_batch.jo_rescue !== "") {
            let rescue_array = JSON.parse(val_batch.jo_rescue);
            rescue_array.forEacj((val_rescue) => {
              rescue.push(val_rescue);
            });
          }
        });
      }
    });
    // Deleted Fieldman End
    let data_type = []

    data_type = [
      { type: "SOA", count: formatNumber(jo_soa), assign: formatNumber(jo_assign_type.jo_soa), diff: jo_soa - jo_assign_type.jo_soa },
      { type: "AUBD", count: formatNumber(jo_aubd), assign: formatNumber(jo_assign_type.jo_aubd), diff: jo_aubd - jo_assign_type.jo_aubd },
      { type: "DN", count: formatNumber(jo_dn), assign: formatNumber(jo_assign_type.jo_dn), diff: jo_dn - jo_assign_type.jo_dn },
      { type: "MECO", count: formatNumber(jo_meco), assign: formatNumber(jo_assign_type.jo_meco), diff: jo_meco - jo_assign_type.jo_meco },
      { type: "NAC", count: formatNumber(jo_nac), assign: formatNumber(jo_assign_type.jo_nac), diff: jo_nac - jo_assign_type.jo_nac },
      { type: "NCR", count: formatNumber(jo_ncr), assign: formatNumber(jo_assign_type.jo_ncr), diff: jo_ncr - jo_assign_type.jo_ncr },
      { type: "OSB", count: formatNumber(jo_osb), assign: formatNumber(jo_assign_type.jo_osb), diff: jo_osb - jo_assign_type.jo_osb },
      { type: "OSN", count: formatNumber(jo_osn), assign: formatNumber(jo_assign_type.jo_osn), diff: jo_osn - jo_assign_type.jo_osn },
      { type: "REO DN", count: formatNumber(jo_dn_reout), assign: formatNumber(jo_assign_type.jo_dn_reout), diff: jo_dn_reout - jo_assign_type.jo_dn_reout },
      { type: "REO SOA", count: formatNumber(jo_soa_reout), assign: formatNumber(jo_assign_type.jo_soa_reout), diff: jo_soa_reout - jo_assign_type.jo_soa_reout },
    ];

    for (let index = 0; index < data.reout.length; index++) {
      const element = data.reout[index];
      let assign_reout = 0;
      let match = false
      data_type.forEach((val) => {
        if (val.type === element.type) {
          val.count = formatNumber(element.data.length)
          match = true
        }
      })
      if (!match) {
        if (element.type !== "REO ") {
          data_type.push({ type: element.type, count: formatNumber(element.data.length), assign: formatNumber(assign_reout) })
        }

      }
    }
    // if(data.reout.length === 0){
    //   if(){}
    //   data_type.push(
    //   { type: "REO DN", count: formatNumber(jo_dn_reout),assign:formatNumber(jo_assign_type.jo_dn_reout),diff:jo_dn_reout - jo_assign_type.jo_dn_reout },
    //   { type: "REO SOA", count: formatNumber(jo_soa_reout),assign:formatNumber(jo_assign_type.jo_soa_reout),diff:jo_soa_reout - jo_assign_type.jo_soa_reout },
    //   )
    // }

    let count_receive = jo_aubd + jo_dn + jo_meco + jo_nac + jo_ncr + jo_osb + jo_osn + jo_soa
    let count_assign = jo_assign_type.jo_aubd + jo_assign_type.jo_dn + jo_assign_type.jo_meco + jo_assign_type.jo_nac + jo_assign_type.jo_ncr + jo_assign_type.jo_osb + jo_assign_type.jo_osn + jo_assign_type.jo_soa
    let total_jo_received = count_receive + jo_dn_reout + jo_soa_reout
    let total_assigned = count_assign + jo_assign_type.jo_dn_reout + jo_assign_type.jo_soa_reout

    data_type.unshift({ type: "TODAY", count: formatNumber(count_receive), assign: formatNumber(count_assign), diff: formatNumber(count_receive - count_assign) })
    data_type.push({ type: "TOTAL", count: formatNumber(total_jo_received), assign: formatNumber(total_assigned), diff: formatNumber(total_jo_received - total_assigned) })
    let total_accom = 0;
    let index_match = "";
    let last_accom_time = "";
    let excel_invalid_data = []

    new_fieldman.map((val, index_val) => {

      let exceldata = [];
      if (parseInt(val.batch[0].jo_count) > 0 || val.jo_accom_list.length > 0) {
        exceldata = getExcelData(
          val,
          moment(state.date_start_val).format("YYYY-MM-DD")
        );
      }
      exceldata.map((valexcel) => {
        excel_invalid_data.push(valexcel);
      });
      // CheckSchedule Start
      let sched_date_match = schedule_fieldman.filter(
        (schedule_fieldman_val) =>
        (val.user_id === schedule_fieldman_val.user_id && String(val.user_jobposition).toUpperCase() ===
          String(map_reducer.job_position).toLocaleUpperCase())
      );
      let sched_date_val = false;
      let sched_date_type = "Normal";
      if (sched_date_match.length > 0) {
        sched_date_val = true;
        sched_date_type = sched_date_match[0].sched_type;
      }
      // CheckSchedule End

      let new_jo_assign = 0;

      let latlong = String(val.location_latlng);
      let splitlatlng = latlong.split(",");
      var lat = parseFloat(splitlatlng[0]);
      var lng = parseFloat(splitlatlng[1]);
      val['lat'] = lat
      val['lng'] = lng

      val.batch.map((val_batch, index) => {
        new_jo_assign += parseInt(val_batch.jo_count);
        let match = false;
        if (val_batch.jo_count > 0 && index === 0) {
          fieldman_count++;
          match = true;
        }
        if (sched_date_val && index === 0) {
          with_schedule.push(val)
          // count++;
          // match = true;
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
      });

      new_fieldman[index_val]["count"] = new_jo_assign;
      jo_accom_list += parseInt(val.jo_accom_list.length);

      // Attendance Start
      if (val.attendance.length === 0) {
        if (parseInt(val.user_delete_id) === 0) {
          if (sched_date_val) {
            absent.push(val);
          } else {
            no_schedule.push(val);
          }
        }
      } else {
        // if (parseInt(val.batch[0].jo_count) > 0) {
        let match_rescue = rescue_diff_position.filter((val_rescue) => (val_rescue.user_id === val.user_id))
        if (match_rescue.length == 0) {
          present.push(val);
        }
        if (sched_date_type === "Replacement") {
          replacement.push(val);
        }
        if (parseInt(val.user_delete_id) === 1) {
          inactive.push(val);
        }
        if (!sched_date_val && match_rescue.length == 0) {
          no_schedule.push(val);
        }
        // } 
        // else {
        //   let filter = rescue.filter(
        //     (rescue_filter) => rescue_filter.id === val.user_id
        //   );
        //   if (filter.length > 0) {
        //     if (parseInt(val.user_delete_id) === 1) {
        //       inactive.push(val);
        //     }
        //   } else {
        //     no_schedule.push(val);
        //     // present.push(val);
        //   }
        // }

        if (
          moment(val.attendance[0].date_added).format("HH:mm") >
          moment("2021-01-01 " + val.day_sched.attn_in).format("HH:mm")
        ) {
          // if (val.batch[0].jo_count > 0) {
          let match_rescue = rescue_diff_position.filter((val_rescue) => (val_rescue.user_id === val.user_id))
          if (match_rescue.length == 0 && sched_date_val) {
            late.push(val);
          }
          // }
        }

        if (parseInt(val.batch[0].jo_count) === 0) {
          no_area.push(val);
        }
      }
      let first_attendance = ''
      if (val.attendance.length > 0) {
        first_attendance = val.attendance[0].date_added
      }

      if (val.jo_accom > 0 && val.attendance.length < 3 && moment(first_attendance).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")) {
        onField.push(val);
      }
      // Attendance End
      val.jo_accom_list.map((val_accom, index3) => {
        let time_emp = moment(val_accom.date_accom).format("HH:mm");
        if (last_accom_time === "") {
          last_accom_time = time_emp;
        } else {
          if (last_accom_time < time_emp) {
            last_accom_time = time_emp;
          }
        }
      });
    });

    with_out_jo.forEach((val) => {
      let latlong = String(val.location_latlng);
      let splitlatlng = latlong.split(",");
      var lat = parseFloat(splitlatlng[0]);
      var lng = parseFloat(splitlatlng[1]);
      val['lat'] = lat
      val['lng'] = lng
      with_jo.push(val);
    });

    // First Coordinates Start
    let latlong = String(latlng);
    let splitlatlng = latlong.split(",");
    let lat = parseFloat(splitlatlng[0]);
    let lng = parseFloat(splitlatlng[1]);
    // First Coordinates End

    // Pie Graph Start
    let assign = jo_assign;
    let unassign = parseInt(data.joborder) - assign;
    if (unassign < 0) {
      unassign = 0;
    }
    let total_jo = 0;
    if (assign !== 0) {
      total_jo = assign + unassign;
    }
    if (assign === 0) {
      unassign = 0;
    }

    let pie_graph = [
      { title: "Accomplished", value: jo_accom_list },
      { title: "Remaining", value: assign - jo_accom_list },
      { title: "Unassigned", value: unassign },
    ];
    // Pie Graph End

    // Line Graph Start
    let hours = [];
    for (let index = 0; index < 17; index++) {
      const details = {
        time: moment("2020-01-01 4:00").add(index, "hours").format("HH:mm"),
        count: 0,
        fetched_coordinates: "",
        fieldmanCount: 0,
        fieldmanArray: [],
        cumulative: 0,
        total_jo: total_jo,
      };
      hours.push(details);
    }
    hours.map((val_hours, index) => {
      let time_data = parseInt(String(val_hours.time).split(":")[0]);
      new_fieldman.map((val) => {
        val.jo_accom_list.map((val_accom, index3) => {
          let time_data_employee = parseInt(
            String(moment(val_accom.date_accom).format("HH:mm")).split(":")[0]
          );
          if (time_data === time_data_employee) {
            total_accom++;
            let match_name = val_hours.fieldmanArray.find(
              (val_nm) => val_nm === val.completename
            );
            if (match_name === undefined) {
              val_hours.fieldmanArray.push(val.completename);
              val_hours.fieldmanCount += 1;
            }
            if (index_match === "") {
              index_match = index;
            }
            val_hours.count += 1;
          }
        });
      });
      if (time_data > parseInt(String(last_accom_time).split(":")[0])) {
        val_hours.cumulative = undefined;
      } else {
        val_hours.cumulative += total_accom;
      }
    });
    // Line Graph End
    let array_dashboard_data = [
      { type: "PRESENT", data: present, color: "#58b19f" },
      { type: "LATE", data: late, color: "#f3a683" },
      { type: "ABSENT", data: absent, color: "#ff7979" },
      { type: "ON FIELD", data: onField, color: "#ecf0f1" },
      { type: "REPLACEMENT", data: replacement, color: "#9b59b6" },
      { type: "RESCUE", data: rescue_diff_position, color: "#ff4d4d" },
      { type: "NO SCHEDULE", data: no_schedule, color: "#74b9ff" },
      { type: "INACTIVE", data: inactive, color: "#f1c40f" },
    ];
    let attendance_data = [
      { type: "PRESENT", data: present, color: "#2ecc71" },
      { type: "LATE", data: late, color: "#f3a683" },
      { type: "ABSENT", data: absent, color: "#ff7979" },
    ];
    let remaining = assign - jo_accom_list;
    let remaining_percentage = 0;
    let jo_accom_list_percentage = 0;
    let unassign_percentage = 0;
    let assign_percentage = 0;
    if (remaining < 0) {
      remaining = 0;
    }
    let excelFile = [];
    with_jo.map((row, key) => {
      let trackAccom2_new = row.jo_accom_list;
      let batch = row.batch;

      let first = "";
      let last = "";
      let date = "";

      if (trackAccom2_new.length > 0) {
        first = moment(trackAccom2_new[0].date_accom).format("hh:mm A");
        last = moment(
          trackAccom2_new[trackAccom2_new.length - 1].date_accom
        ).format("hh:mm A");
      }
      let data = {
        user_id: row.user_id,
        name: row.completename,
        date: data_filter.from,
        first: first,
        last: last,
      };
      if (trackAccom2_new.length > 0) {
        excelFile.push(data);
      }
    });

    if (parseInt(total_jo) !== 0) {
      remaining_percentage = parseFloat((remaining / total_jo) * 100).toFixed(
        2
      );
      jo_accom_list_percentage = parseFloat(
        (jo_accom_list / total_jo) * 100
      ).toFixed(2);
      unassign_percentage = parseFloat((unassign / total_jo) * 100).toFixed(2);
      assign_percentage = parseFloat((assign / total_jo) * 100).toFixed(2);
    }

    let status = [
      {
        type: "ASSIGN",
        value: formatNumber(assign),
        percentage: assign_percentage,
        bg_color: "#487eb0",
      },
      {
        type: "ACCOMPLISHED",
        value: formatNumber(jo_accom_list),
        percentage: jo_accom_list_percentage,
        bg_color: "#58b19f",
      },
      {
        type: "UNASSIGNED",
        value: formatNumber(unassign),
        percentage: unassign_percentage,
        bg_color: "#f39c12",
      },

      {
        type: "REMAINING",
        value: formatNumber(remaining),
        percentage: remaining_percentage,
        bg_color: "#e74c3c",
      },
    ];
    let last_fieldman_location = with_jo.filter((val) => (moment(val.location_date_added).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')))
    onChangetrackAccom(last_fieldman_location, excelFile, excel_invalid_data, data_filter.selection[0], data_filter.company_id, data.company)

    let scheduled = []
    let present_sched_count = []
    let late_sched_count = []
    let absent_sched_count = []
    let assigned_sched_count = []
    let no_assigned_sched_count = []

    let no_scheduled = []
    let present_no_sched_count = []
    let late_no_sched_count = []
    let assigned_no_sched_count = []
    let no_assigned_no_sched_count = []

    let rescue_data = []
    let present_rescue_sched_count = []
    let late_rescue_sched_count = []
    let assigned_rescue_sched_count = []
    rescue_diff_position.forEach((val) => {
      if (val.attendance.length > 0) {
        present_rescue_sched_count.push(val)
        if (moment(val.attendance[0].date_added).format(
          "LT"
        ) >
          moment(
            "2021-01-01 " + val.day_sched.attn_in
          ).format("LT")) {
          late_rescue_sched_count.push(val)
        }
      }
      if (val.count > 0) {
        assigned_rescue_sched_count.push(val)
      }
    })

    rescue_data = [
      {
        type: 'PRESENT',
        count: present_rescue_sched_count,
        color: "#2980b9"
      },
      {
        type: 'LATE',
        count: late_rescue_sched_count,
        color: "#f1c40f"
      },
      {
        type: 'ASSIGNED',
        count: assigned_rescue_sched_count,
        color: "#2ecc71"
      },
    ]

    no_schedule.forEach((val) => {
      if (val.attendance.length > 0) {
        present_no_sched_count.push(val)
        if (moment(val.attendance[0].date_added).format(
          "LT"
        ) >
          moment(
            "2021-01-01 " + val.day_sched.attn_in
          ).format("LT")) {
          late_no_sched_count.push(val)
        }
      }
      if (val.count > 0) {
        assigned_no_sched_count.push(val)
      }
      if (val.attendance.length > 0 && val.count == 0) {
        no_assigned_no_sched_count.push(val)
      }
    })

    no_scheduled = [
      {
        type: 'PRESENT',
        count: present_no_sched_count,
        color: "#2980b9"
      },
      {
        type: 'LATE',
        count: late_no_sched_count,
        color: "#f1c40f"
      },
      {
        type: 'ASSIGNED',
        count: assigned_no_sched_count,
        color: "#2ecc71"
      },
      {
        type: 'NO ASSIGNED',
        count: no_assigned_no_sched_count,
        color: "#9b59b6"
      },
    ]

    with_schedule.forEach((val) => {
      if (val.attendance.length > 0) {
        present_sched_count.push(val)
        if (moment(val.attendance[0].date_added).format(
          "LT"
        ) >
          moment(
            "2021-01-01 " + val.day_sched.attn_in
          ).format("LT")) {
          late_sched_count.push(val)
        }
      }
      if (val.count > 0) {
        assigned_sched_count.push(val)
      }
      let absent_data = absent.filter((val_absent) => (val_absent.user_id === val.user_id))
      if (absent_data.length > 0) {
        absent_sched_count.push(val)
      }
      if (val.count == 0 && absent_data.length == 0) {
        no_assigned_sched_count.push(val)
      }
    })
    scheduled = [
      {
        type: 'PRESENT',
        count: present_sched_count,
        color: "#2980b9"
      },
      {
        type: 'LATE',
        count: late_sched_count,
        color: "#f1c40f"
      },
      {
        type: 'ABSENT',
        count: absent_sched_count,
        color: "#e74c3c"
      },
      {
        type: 'ASSIGNED',
        count: assigned_sched_count,
        color: "#2ecc71"
      },
      {
        type: 'NO ASSIGNED',
        count: no_assigned_sched_count,
        color: "#9b59b6"
      },
    ]
    onClickFieldman(with_jo, data_filter.from,true);
    setState((prev) => ({
      ...prev,
      initial_data_fetch: data,
      attendance_data: attendance_data,
      array_dashboard_data: array_dashboard_data,
      jo_accom_list: jo_accom_list,
      pie_graph: pie_graph,
      fieldman: with_jo,
      count_fieldman: fieldman_count,
      total_jo: parseInt(total_jo),
      runningAve: data.runningAverageAssign,
      assign: assign,
      status_jo: status,
      data_type: data_type,
      fieldman_map: with_jo,
      line_hours: hours,
      date_display: data_filter.from,
      date_start_val: data_filter.from,
      Selectedcompany: data_filter.company_id,
      Selected_branch: data_filter.selection[0],
      excel_invalid_data: excel_invalid_data,
      with_schedule: with_schedule,
      scheduled: scheduled,
      no_scheduled: no_scheduled,
      no_schedule: no_schedule,
      data_filter: data_filter,
      rescue_data
    }));
    handleClose();
    onChangeLogo(data.company)
    dispatch_data("branch_name", branch_name);
    let count_validation = 0
    data.count_validation_logs.map((val) => {
      count_validation = parseInt(val.percentage)
    })
    dispatch_data("count_validation_logs", count_validation);
    localStorage.removeItem("onSelectSingleDateGraph");
    dispatch_data("loading_map", false);

  };
  const getExcelData = (row, date) => {
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
    let countInvalid = 0;
    row.jo_accom_list.map((val) => {
      if (val.validator_remarks === "INVALID") {
        countInvalid++;
      }
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
    let late = 1;
    if (row.attendance.length !== 0) {
      if (
        moment(row.attendance[0].date_added).format("LT") >
        moment("2021-01-01 " + row.day_sched.attn_in).format("LT")
      ) {
        late = 0;
      }
    }
    let remaining = assign - row.jo_accom_list.length;
    if (remaining < 0) {
      remaining = 0;
    }
    let data = [];
    let bulk_value = 1;
    let time1 = 0;
    let time2 = 0;
    let time3 = 0;
    let time4 = 0;
    let completeness_val = 1;
    let upload_count_val = 0;
    let fieldFindings = 1;

    if (bulk2 > 0) {
      bulk_value = 0;
    }
    if (row.attendance.length > 0) {
      time1 = 1;
    }
    if (row.attendance.length > 1) {
      time2 = 1;
    }
    if (row.attendance.length > 2) {
      time3 = 1;
    }
    if (row.attendance.length > 3) {
      time4 = 1;
    }
    if (remaining > 0) {
      completeness_val = 0;
    }
    if (upload_count >= row.jo_accom_list.length) {
      upload_count_val = 1;
    }
    if (countInvalid > 0) {
      fieldFindings = 0;
    }
    let total = parseInt(
      time1 +
      time2 +
      time3 +
      time4 +
      late +
      completeness_val +
      bulk_value +
      upload_count_val +
      fieldFindings +
      1
    );

    data.push({
      FieldmanID: row.user_id,
      FieldmanName: row.completename,
      position: row.user_jobposition,
      branch: row.branch_name,
      date: date,
      time1: time1,
      time2: time2,
      time3: time3,
      time4: time4,
      late: late,
      completeness: completeness_val,
      bulk: bulk_value,
      fieldFindings: fieldFindings,
      battery: 1,
      upload: upload_count_val,
      bulk_data: bulk2,
      completeness_data: remaining,
      total: total,
      delivered: row.jo_accom_list.length,
    });
    // if (bulk2 > 0) {
    //     data.push({
    //         FieldmanID: row.user_id,
    //         FieldmanName: row.completename,
    //         position: row.user_jobposition,
    //         branch: row.branch_name,
    //         date: date,
    //         type: 'Bulk',
    //         value: bulk2
    //     })
    // }
    // if (late > 0) {
    //     data.push({
    //         FieldmanID: row.user_id,
    //         FieldmanName: row.completename,
    //         position: row.user_jobposition,
    //         branch: row.branch_name,
    //         date: date,
    //         type: 'Tardiness',
    //         value: late
    //     })
    // }
    // if (remaining > 0) {
    //     data.push({
    //         FieldmanID: row.user_id,
    //         FieldmanName: row.completename,
    //         position: row.user_jobposition,
    //         branch: row.branch_name,
    //         date: date,
    //         type: 'Completeness',
    //         value: remaining
    //     })
    // }
    return data;
  };
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  const averageRunningAssign = (data_filter) => {
    
    getData("tracking/running_assign_average2", data_filter).then((res) => {
      let filter_accom = res.filter((val) => (val.date === data_filter.from))
   
      if (filter_accom.length > 0) {
        let average = [
          { name: 'RUNNING ACCOM', value: filter_accom[0].running_accom},
          { name: 'RUNNING ASSIGN', value: filter_accom[0].running_average },
          { name: 'ACCOM AVE.', value: filter_accom[0].average_accom},
          { name: 'ASSIGN AVE.', value: filter_accom[0].average_assign },
          { name: 'VALID', value: filter_accom[0].total_valid },
          { name: 'INVALID', value: filter_accom[0].total_invalid },

        ]
        setState(prev => ({
          ...prev,  
          average: average,
          average_data : res
        }))
      }
      // dispatch_data("loading_map", false);
    })
  }

  const onClickAutoAppeal = () =>{
    if(window.confirm('Are you sure you want to execute auto appeal?')){
      let data = {
        branch_id : [state.Selected_branch],
        date : state.date_start_val,
        jo_type : map_reducer.selected_jo[0]
      }
      getData('tracking/generateAutoAppeal',data).then((res)=>{
        alert('Success')
      })
    }
  }
  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ marginTop: 60, padding: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <div style={{ display: "flex", alignItems: "center", opacity: 1 }}>
              <div style={{}}>
                <IconButton
                  aria-label="delete"
                  size="md"
                  onClick={() => closeHome()}
                >
                  <KeyboardBackspaceIcon
                    className="font-color-white"
                    fontSize="inherit"
                    style={{}}
                  />
                </IconButton>
              </div>
              <div>
                <Button
                  onClick={() => { closeList(); handleClickOpen() }}
                  variant="contained"
                  size="small"
                  startIcon={<FilterListIcon />}
                  style={{
                    backgroundColor: "rgb(17, 82, 147)",
                    color: "#fff",
                    marginRight: 10,
                  }}
                >
                  Filter
                </Button>
              </div>
            
              <IconButton
                onClick={() => { closeList(); refresh() }}
                aria-label="delete"
                style={{
                  backgroundColor: "#1b5ea0",
                  marginRight: 5,
                  width: 33,
                  height: 33,
                }}
              >
                <RefreshIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  openLineHours(state.line_hours, state.total_jo);
                }}
                aria-label="delete"
                style={{
                  backgroundColor: "#1b5ea0",
                  marginRight: 5,
                  width: 33,
                  height: 33,
                }}
              >
                <EqualizerIcon style={{ color: "#fff" }} />
              </IconButton>
              {/* <IconButton
                onClick={() => {
                  setState(prev=>({
                    ...prev,trackAssignLocationModal:true
                  }))
                }}
                aria-label="delete"
                style={{
                  backgroundColor: "#1b5ea0",
                  marginRight: 5,
                  width: 33,
                  height: 33,
                }}
              >
                <MyLocationIcon style={{ color: "#fff" }} />
              </IconButton> */}
              <IconButton
                onClick={() => {
                  setState(prev=>({
                    ...prev,tableFormatAssignedDetails:true
                  }))
                }}
                aria-label="delete"
                style={{
                  backgroundColor: "#1b5ea0",
                  marginRight: 5,
                  width: 33,
                  height: 33,
                }}
              >
                <TableChartIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setState(prev=>({
                    ...prev,returnedJO_modal:true
                  }))
                }}
                aria-label="delete"
                style={{
                  backgroundColor: "#1b5ea0",
                  marginRight: 5,
                  width: 33,
                  height: 33,
                }}
              >
                <AssignmentReturnedIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                 onClickAutoAppeal()
                }}
                aria-label="delete"
                style={{
                  backgroundColor: "#1b5ea0",
                  marginRight: 5,
                  width: 33,
                  height: 33,
                }}
              >
                <GavelIcon style={{ color: "#fff" }} />
              </IconButton>
              
              {/* <IconButton
                onClick={() => {
                  setState(prev=>({
                    ...prev,returnedJO_modal:true
                  }))
                }}
                aria-label="delete"
                style={{
                  backgroundColor: "#1b5ea0",
                  marginRight: 5,
                  width: 33,
                  height: 33,
                }}
              >
                <MoneyIcon style={{ color: "#fff" }} />
              </IconButton> */}
              
              
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                // backgroundColor: "rgba(30, 32, 38, 0.498)",
              }}
            >
              <Typography
                style={{ fontSize: 15, fontWeight: "bold" }}
                variant="p"
              >

              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  className="font-color-white"
                  style={{ fontSize: 15 }}
                  variant="p"
                >

                  {moment(state.date_display).format("LL")}
                </Typography>
                <Typography
                  className="font-color-white"
                  style={{ fontSize: 15 }}
                  variant="p"
                >
                  {map_reducer.branch_name}
                </Typography>
              </div>

            </div>
          </Grid>
        </Grid>

        <Grid container spacing={1}>

          <Grid item xs={12} md={8}>
            <Card elevation={3} className="card-color-data" style={{ height: 170 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={1}>
                  <div style={{ padding: 5 }}>
                    <PeopleAltIcon className="font-color-white" />
                    <ReorderIcon className="font-color-white" onClick={(e) => {
                      e.stopPropagation();
                      setState(prev => ({ ...prev, breakdown: true }))
                    }} />
                  </div>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Card

                    className="card-color-data"
                    style={{ cursor: 'pointer', height: 170 }}
                    onClick={() => {
                      onClickFieldman(state.fieldman_map, state.date_start_val);
                    }}
                  >
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography style={{ color: "#7c868a", fontWeight: "bold" }}>
                          FIELDMAN
                        </Typography>
                      </div>
                      <div>
                        {map_reducer.selected_jo.map((val, index) => {
                          if (index == 0)
                            return <Grid item xs={12} md={12} style={{ display: 'flex', width: '100%' }}>
                              <Typography key={index}
                                className="font-color-white"
                                style={{ fontSize: 13, fontWeight: "bold", textAlign: 'center' }}
                                variant="p"
                              >
                                {val}
                              </Typography>&nbsp;
                              {map_reducer.selected_jo.length > 1 ? <Typography key={index}
                                className="font-color-white"
                                style={{ fontSize: 13, fontWeight: "bold", textAlign: 'center' }}
                                variant="p"
                              >
                                +{map_reducer.selected_jo.length - 1} more
                              </Typography> : undefined
                              }
                            </Grid>
                        })
                        }
                      </div>

                      <div className="center-body">
                        <Typography
                          className="font-color-white"
                          style={{ fontSize: 35, fontWeight: "bold", marginTop: 15 }}
                        >
                          {/* {state.count_fieldman} /{" "}
                          {state.fieldman.reduce((count, val) => {
                            if (parseInt(val.user_delete_id) === 0) {
                              count++;
                            }
                            return count;
                          }, 0)} */}
                          {state.array_dashboard_data.reduce((count, val) => {
                            if (val.type === "ON FIELD") {
                              count = val.data.length
                            }
                            return count
                          }, 0)
                          }
                        </Typography>
                      </div>
                      <div className="center-body">
                        <Grid container >
                          <Grid item xs={12} md={12} style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography className="font-color-white"
                              style={{ fontSize: 12.4, fontWeight: "bold", textAlign: 'center' }}
                              variant="p"
                            >
                              IS WORKING
                            </Typography>
                          </Grid>
                          {/* <Grid item xs={12} md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                              <Typography className="font-color-white" style={{ fontSize: 12 }}>T :    {state.fieldman.reduce((count, val) => {
                                if (parseInt(val.user_delete_id) === 0) {
                                  count++;
                                }
                                return count;
                              }, 0) - parseInt(state.array_dashboard_data.reduce((count, val) => {
                                if (val.type === 'RESCUE') {
                                  count = val.data.length;
                                }
                                return count;

                              }, 0))} </Typography>
                              <Typography className="font-color-white" style={{ fontSize: 12 }}>S : {state.with_schedule.length}</Typography>
                              <Typography className="font-color-white" style={{ fontSize: 12 }}>A : {(parseInt(state.fieldman.reduce((count, val) => {
                                if (parseInt(val.user_delete_id) === 0 && val.count > 0) {
                                  count++;
                                }
                                return count;
                              }, 0)))}</Typography>
                            </div>
                          </Grid> */}


                        </Grid>
                      </div>
                      {/* <div>
                  <Table size="small">
                    {state.attendance_data.map((val, index) => {
                      return (
                        <TableRow key={index}   onClick={(e) => {
                          dash_click(e, val.data);
                        }}>
                          <TableCell  style={{borderStyle:'none'}}>
                            <Typography
                              className="font-color-white"
                              style={{
                                fontWeight: "bold",
                                fontSize: 12,
                                cursor: "pointer",
                              }}
                            >
                              {val.type}
                            </Typography>
                          </TableCell>
                          <TableCell  style={{borderStyle:'none'}}>
                            <Typography
                              className="font-color-white"
                              style={{
                                fontWeight: "bold",
                                fontSize: 12,
                                cursor: "pointer",
                                textAlign:'right'
                              }}
                            >
                              {val.data.length}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </Table>
                </div> */}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card className="card-color-data" style={{ height: 170 }}>
                    <CardContent>
                      <div onClick={(e) => {
                        let data = state.fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0) && String(map_reducer.job_position).toLocaleUpperCase() === String(val.user_jobposition).toLocaleUpperCase())
                        // onClickFieldman(data, state.date_start_val);
                        onClickFieldman(data, state.date_start_val);
                      }} style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer", marginBottom: 5 }}>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}>ACTIVE</Typography>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}>{state.fieldman.reduce((count, val) => {
                          if (parseInt(val.user_delete_id) === 0) {
                            count++;
                          }
                          return count;
                        }, 0) - parseInt(state.array_dashboard_data.reduce((count, val) => {
                          if (val.type === 'RESCUE') {
                            count = val.data.length;
                          }
                          return count;

                        }, 0))}</Typography>
                      </div>
                      <div onClick={(e) => {
                        let data = []
                        state.array_dashboard_data.forEach((val) => {

                          if (val.type === 'PRESENT') {
                            data = val.data;
                          }
                          // return data;

                        })
                        onClickFieldman(data, state.date_start_val);
                      }} style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer", marginBottom: 5 }}>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}>PRESENT</Typography>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}> {parseInt(state.array_dashboard_data.reduce((count, val) => {
                          if (val.type === 'PRESENT') {
                            count = val.data.length;
                          }
                          return count;

                        }, 0))}</Typography>
                      </div>
                      <div onClick={(e) => {
                        let data = []
                        state.array_dashboard_data.forEach((val) => {

                          if (val.type === 'RESCUE') {
                            data = val.data;
                          }
                          // return data;

                        })
                        onClickFieldman(data, state.date_start_val);
                      }} style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer", marginBottom: 5 }}>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}>RESCUE</Typography>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}>{
                            parseInt(state.array_dashboard_data.reduce((count, val) => {
                              if (val.type === 'RESCUE') {
                                count = val.data.length;
                              }
                              return count;

                            }, 0))}

                        </Typography>
                      </div>
                      <div onClick={(e) => {
                        let data = state.fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0) && val.count > 0)
                        onClickFieldman(data, state.date_start_val);
                      }} style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer", }}>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}>ASSIGNED</Typography>
                        <Typography className="font-color-white" style={{
                          fontWeight: "bold",
                          fontSize: 12,

                        }}>{(parseInt(state.fieldman.reduce((count, val) => {
                          if (parseInt(val.user_delete_id) === 0 && val.count > 0) {
                            count++;
                          }
                          return count;
                        }, 0)))}</Typography>
                      </div>

                      {/* {state.array_dashboard_data.map((val, index) => {
                        return (
                          <div onClick={(e) => {
                            dash_click(e, val.data);
                          }} style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer", }}>
                            <Typography className="font-color-white" style={{
                              fontWeight: "bold",
                              fontSize: 12,

                            }}> {val.type}</Typography>
                            <Typography className="font-color-white" style={{
                              fontWeight: "bold",
                              fontSize: 12,

                            }}> {val.data.length}</Typography>
                          </div>)
                      })} */}

                      {/* {state.array_dashboard_data.map((val, index) => {
                        return (
                          <Table size="small" key={index}>
                            <TableRow onClick={(e) => {
                              dash_click(e, val.data);
                            }}>
                              <TableCell style={{ borderStyle: 'none' }}>
                                <Typography
                                  className="font-color-white"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    cursor: "pointer",
                                  }}
                                >
                                  {val.type}
                                </Typography>
                              </TableCell>
                              <TableCell style={{ borderStyle: 'none' }}>
                                <Typography
                                  className="font-color-white"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    cursor: "pointer",
                                    textAlign: 'right'
                                  }}
                                >
                                  {val.data.length}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </Table>
                        );
                      })} */}

                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </Card>


          </Grid>


          <Grid item xs={12} md={4}>
            {/* <Grid container spacing={1}> */}

            <Card
              className="card-color-data"
              elevation={3}
              style={{ height: 170 }}
            >
              {/* <CardContent> */}
              <div style={{padding:5}}>
                <Typography
                  style={{ color: "#7c868a", fontWeight: "bold" }}
                >
                  TOTAL JOB ORDER
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >
                  <Typography
                    className="font-color-white"
                    style={{ fontSize: 23, fontWeight: "bold" }}
                  >
                    {formatNumber(state.total_jo)}
                  </Typography>
                </div>
              </div>
              {/* </CardContent>   */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  padding: "10px",
                  marginBottom: 8,
                }}
              >
                <Grid style={{ cursor: 'pointer' }} onClick={() => {
                   passRunningAverage(state.average_data)
                }} container>
                  <Grid item xs={12} md={12}>
                    {state.average.map((val, index) => {
                      return <div
                        style={{
                          width: '100%',
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          className="font-color-white"
                          style={{ fontWeight: "bold", fontSize: 12.5 }}
                        >
                          {val.name}
                        </Typography>
                        <Typography
                          className="font-color-white"
                          style={{ fontWeight: "bold" }}
                        >
                          {val.value}
                        </Typography>
                      </div>

                    })
                    }
                  </Grid>
                </Grid>
              </div>
            </Card>


            {/* <Grid item xs={12} md={12}>
                <Card className="card-color-data" elevation={3}>
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 103,
                      padding: "10px",
                      marginBottom: 8,
                    }}
                  >
                    <Table>
                      <TableRow>
                        <TableCell>
                          <Typography
                            className="font-color-white"
                            style={{ fontWeight: "bold" }}
                          >
                            RUNNING AVE.
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            className="font-color-white"
                            style={{ fontWeight: "bold" }}
                          >
                            {state.runningAve}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            className="font-color-white"
                            style={{ fontWeight: "bold" }}
                          >
                            ASSIGN AVE.
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            className="font-color-white"
                            style={{ fontWeight: "bold" }}
                          >
                            {" "}
                            {isNaN(state.assign / state.count_fieldman)
                              ? 0
                              : parseInt(state.assign / state.count_fieldman)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </Table>
                  </CardContent>
                </Card>
              </Grid> */}
            {/* </Grid> */}
          </Grid>
          {state.status_jo.map((val, index) => {
            return (
              <Grid item xs={12} md={3}>
                <Card
                  className="card-color"
                  elevation={3}
                  style={{ backgroundColor: val.bg_color }}
                >
                  <CardContent>
                    <div className="center-body">
                      <Typography
                        style={{
                          fontSize: 31,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {val.value}
                      </Typography>
                    </div>
                    <div className="center-body">
                      <Typography
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {val.percentage}%
                      </Typography>
                    </div>
                    <div className="center-body">
                      <Typography style={{ color: "#fff", fontWeight: "bold" }}>
                        {val.type}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          <Grid item xs={12} md={5}>
            <Card className="card-color-data" elevation={3}>
              <CardContent>
                <Pie pieGraph={state.pie_graph} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            {/* <div className="card-color-size-two"> */}
            <Card className="card-color-data" style={{ minHeight: 260 }}>
              <CardContent>
                <Typography style={{ color: "#7c868a", fontWeight: "bold" }}>
                  JO TYPE
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>JO</TableCell>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>Total</TableCell>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>Assign</TableCell>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>Remaining</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.data_type.map((val, index) => {
                      let match = false
                      if ((val.count !== 0 || val.assign !== 0) &&  (val.type !== "TODAY")){
                        match = true
                      }
                      if(match)
                        return (
                          <TableRow>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'left' }}
                              >
                                {val.type}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'right' }}
                              >
                                {val.count}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'right' }}
                              >
                                {val.assign}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'right' }}
                              >
                                {val.diff}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                    })}
                  </TableBody>
                </Table>
                {/* <div style={{marginTop:20}}/>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>JO</TableCell>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>Total</TableCell>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>Assign</TableCell>
                      <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff' }}>Remaining</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.data_type.map((val, index) => {
                     let match = false
                     if ((val.count !== 0 || val.assign !== 0) && (val.type !== "TOTAL" && val.type !== "TODAY"   && val.type !== "REO DN" && val.type !== "REO SOA")){
                       match = true
                     }
                     if(match)

                        return (
                          <TableRow>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'left' }}
                              >
                                {val.type}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'right' }}
                              >
                                {val.count}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'right' }}
                              >
                                {val.assign}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                className="font-color-white"
                                style={{ fontWeight: "bold", fontSize: 12, textAlign: 'right' }}
                              >
                                {val.diff}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                    })}
                  </TableBody>
                </Table> */}
              </CardContent>
            </Card>
            {/* <Grid container spacing={1}>
              {state.data_type.map((val, index) => {
                if (val.count !== 0)
                  return (
                    <Grid item xs={12} md={6} key={index}>
                      <Card
                        elevation={3}
                       
                      >
                        <CardContent  style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          
                          padding: "10px",
                        }}>
                        <div>
                          <Typography
                            style={{ fontWeight: "bold", fontSize: 12 }}
                          >
                            {val.type}
                          </Typography>
                        </div>
                        <div>
                          <Typography style={{fontWeight:'bold'}}>{val.count}</Typography>
                        </div>
                        </CardContent>
                       
                      </Card>
                    </Grid>
                  );
              })}
            </Grid> */}
            {/* </div> */}
          </Grid>
        </Grid>
        {/*       
        <Grid container spacing={1}>
          {state.array_dashboard_data.map((val, index) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <Card
                elevation={3}
                  onClick={(e) => {
                    dash_click(e, val.data);
                  }}
                >
                  <CardContent  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 38,
                    padding: "10px",
                  }}>
                  <div>
                    <Typography style={{ fontWeight: "bold", fontSize: 12 }}>
                      {val.type}
                    </Typography>
                  </div>
                  <div>
                    <Typography style={{ fontWeight: "bold"}} >{val.data.length}</Typography>
                  </div>
                  </CardContent>
                 
                </Card>
              </Grid>
            );
          })}
        </Grid> */}

      </div>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => handleClose()}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-slide-title">
          {"GENERATE ACCOMPLISHMENTS"}
        </DialogTitle>
        <DialogContent>
          <Filter
            handleDateChangeStart={handleDateChangeStart}
            date_start_val={state.date_start_val}
            onChangeCompany={onChangeCompany}
            Selectedcompany={state.Selectedcompany}
            onChangeBranch={onChangeBranch}
            Selected_branch={state.Selected_branch}
            onChangeJobOrder={onChangeJobOrder}
            getMapData={getMapData}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.summary_accom}
        onClose={() => {
          setState(prev => ({ ...prev, summary_accom: false }));
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Monitoring</DialogTitle>
        <Summary_monitoring
          branch_id={state.Selected_branch}
          date_start={state.date_start_val}
          branch_name={map_reducer.branch_name}
          excel_invalid_data={state.excel_invalid_data}
          close={() => {
            setState(prev => ({ ...prev, summary_accom: false }));
          }}
        />
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={state.breakdown}
        onClose={() => {
          setState(prev => ({ ...prev, breakdown: false }));
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => setState(prev => ({ ...prev, breakdown: false }))}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogTitle id="simple-dialog-title">BREAKDOWN</DialogTitle>
        <DialogContent>

          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <Card
                onClick={(e) => {
                  let data = state.fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.jo_sched !== 'Rescue'))
                  setState(prev => ({ ...prev, breakdown: false }));
                  onClickFieldman(data, state.date_start_val);
                }} elevation={4} className='breakdown' style={{ cursor: 'pointer', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                <Typography style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>{state.fieldman.reduce((count, val) => {
                  if (parseInt(val.user_delete_id) === 0 && val.jo_sched !== 'Rescue') {
                    count++;
                  }
                  return count;
                }, 0)}</Typography>
                <Typography style={{ color: '#fff', fontSize: 12 }}>TOTAL</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                onClick={(e) => {
                  let data = state.fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.employee_status === 'Regular' && val.jo_sched !== 'Rescue'))
                  setState(prev => ({ ...prev, breakdown: false }));
                  onClickFieldman(data, state.date_start_val);
                }} elevation={4} className='breakdown' style={{ cursor: 'pointer', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>{state.fieldman.reduce((count, val) => {
                  if (parseInt(val.user_delete_id) === 0 && val.jo_sched !== 'Rescue' && val.employee_status === 'Regular') {
                    count++;
                  }
                  return count;
                }, 0)}</Typography>
                <Typography style={{ color: '#fff', fontSize: 12 }}>REGULAR</Typography>

              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  let data = state.fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.employee_status === 'Probationary' && val.jo_sched !== 'Rescue'))
                  setState(prev => ({ ...prev, breakdown: false }));
                  onClickFieldman(data, state.date_start_val);

                }} elevation={4} className='breakdown' style={{ cursor: 'pointer', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                <Typography style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>{state.fieldman.reduce((count, val) => {
                  if (parseInt(val.user_delete_id) === 0 && val.employee_status == 'Probationary' && val.jo_sched !== 'Rescue') {
                    count++;
                  }
                  return count;
                }, 0)}</Typography>
                <Typography style={{ color: '#fff', fontSize: 12 }}>PROBATIONARY</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  let data = state.fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.employee_status === 'Trainee' && val.jo_sched !== 'Rescue'))
                  setState(prev => ({ ...prev, breakdown: false }));
                  onClickFieldman(data, state.date_start_val);
                }} elevation={4} className='breakdown' style={{ cursor: 'pointer', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                <Typography style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>{state.fieldman.reduce((count, val) => {
                  if (parseInt(val.user_delete_id) === 0 && val.employee_status == 'Trainee') {
                    count++;
                  }
                  return count;
                }, 0)}</Typography>
                <Typography style={{ color: '#fff', fontSize: 12 }}>TRAINEE</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  let data = state.fieldman.filter((val, index) => (parseInt(val.user_delete_id) === 0 && val.employee_status === 'For Orientation' && val.jo_sched !== 'Rescue'))
                  setState(prev => ({ ...prev, breakdown: false }));
                  onClickFieldman(data, state.date_start_val);
                }} elevation={4} className='breakdown' style={{ cursor: 'pointer', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                <Typography style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>{state.fieldman.reduce((count, val) => {
                  if (parseInt(val.user_delete_id) === 0 && val.employee_status == 'For Orientation') {
                    count++;
                  }
                  return count;
                }, 0)}</Typography>
                <Typography style={{ color: '#fff', fontSize: 12 }}>FOR ORIENTATION</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={4} className='breakdown'>
                <CardContent>
                  <Typography style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>SCHEDULED : {state.with_schedule.length}</Typography>
                  <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                    <Table size="small">
                      <TableBody>
                        {state.scheduled.map((val) => {
                          return <TableRow style={{ cursor: 'pointer' }} onClick={() => {
                            setState(prev => ({
                              ...prev,
                              selectedBreakdown: "SCHEDULED",
                              selectedBreakdownData: val.count,
                              selectedBreakdownModal: true
                            }))
                          }}>
                            <MuiTableCell><div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: val.color, marginRight: 5 }} />
                              <Typography style={{ color: '#fff', fontSize: 12.8 }}>{val.type}</Typography>
                            </div>
                            </MuiTableCell>
                            <MuiTableCell>
                              <Typography style={{ color: '#fff', fontSize: 12.8 }}>{val.count.length}</Typography>
                            </MuiTableCell>
                          </TableRow>
                        })
                        }
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={4} className='breakdown'>
                <CardContent>
                  <Typography style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>NO SCHEDULED : {state.no_schedule.length}</Typography>
                  <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                    <Table size="small">
                      <TableBody>
                        {state.no_scheduled.map((val) => {
                          return <TableRow style={{ cursor: 'pointer' }} onClick={() => {
                            setState(prev => ({
                              ...prev,
                              selectedBreakdown: "NO SCHEDULED",
                              selectedBreakdownData: val.count,
                              selectedBreakdownModal: true
                            }))
                          }}>
                            <MuiTableCell><div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: val.color, marginRight: 5 }} />
                              <Typography style={{ color: '#fff', fontSize: 12.8 }}>{val.type}</Typography>
                            </div>
                            </MuiTableCell>
                            <MuiTableCell>
                              <Typography style={{ color: '#fff', fontSize: 12.8 }}>{val.count.length}</Typography>
                            </MuiTableCell>
                          </TableRow>
                        })
                        }
                        <TableRow>
                          <MuiTableCell><div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <div style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: val.color, marginRight: 5 }} /> */}
                            <Typography style={{ color: '#333232', fontSize: 12.8 }}>{"test"}</Typography>
                          </div>
                          </MuiTableCell>
                          <MuiTableCell>
                            <Typography style={{ color: '#333232', fontSize: 12.8 }}>{"0"}</Typography>
                          </MuiTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={4} className='breakdown'    >
                <CardContent>
                  <Typography style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>RESCUE : {state.array_dashboard_data.reduce((count, val) => {
                    if (val.type === 'RESCUE') {
                      count = val.data.length
                    }
                    return count
                  }, 0)}</Typography>
                  <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                    <Table size="small">
                      <TableBody>
                        {state.rescue_data.map((val) => {
                          return <TableRow style={{ cursor: 'pointer' }} onClick={() => {
                            setState(prev => ({
                              ...prev,
                              selectedBreakdown: "RESCUE",
                              selectedBreakdownData: val.count,
                              selectedBreakdownModal: true
                            }))
                          }}>
                            <MuiTableCell><div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: val.color, marginRight: 5 }} />
                              <Typography style={{ color: '#fff', fontSize: 12.8 }}>{val.type}</Typography>
                            </div>
                            </MuiTableCell>
                            <MuiTableCell>
                              <Typography style={{ color: '#fff', fontSize: 12.8 }}>{val.count.length}</Typography>
                            </MuiTableCell>
                          </TableRow>
                        })
                        }
                        <TableRow>
                          <MuiTableCell><div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <div style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: val.color, marginRight: 5 }} /> */}
                            <Typography style={{ color: '#333232', fontSize: 12.8 }}>{"test"}</Typography>
                          </div>
                          </MuiTableCell>
                          <MuiTableCell>
                            <Typography style={{ color: '#333232', fontSize: 12.8 }}>{"0"}</Typography>
                          </MuiTableCell>
                        </TableRow>
                        <TableRow>
                          <MuiTableCell><div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <div style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: val.color, marginRight: 5 }} /> */}
                            <Typography style={{ color: '#333232', fontSize: 12.8 }}>{"test"}</Typography>
                          </div>
                          </MuiTableCell>
                          <MuiTableCell>
                            <Typography style={{ color: '#333232', fontSize: 12.8 }}>{"0"}</Typography>
                          </MuiTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={state.selectedBreakdownModal}
        onClose={() => {
          setState(prev => ({ ...prev, selectedBreakdownModal: false }));
        }}
        aria-labelledby="responsive-dialog-title">
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => setState(prev => ({ ...prev, selectedBreakdownModal: false }))}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogTitle id="simple-dialog-title">{state.selectedBreakdown}</DialogTitle>
        <DialogContent >
          <Card variant={'outlined'}>
            <div style={{ padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {state.emp_position.map((val) => {
                  return <div>
                    <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>{val} : {state.selectedBreakdownData.reduce((count, val2) => {
                      if (String(val).toUpperCase() === String(val2.employee_status).toUpperCase()) {
                        count++
                      }
                      return count
                    }, 0)}</Typography>
                  </div>
                })
                }
              </div>
            </div>
          </Card>
          <hr />
          <Card variant={'outlined'}>
            <div style={{ padding: 10 }}>
              <Table>
                <TableBody>
                  {state.selectedBreakdownData.map((val, index) => {
                    let num = index + 1
                    return <TableRow>
                      <TableCell>{num + '. ' + val.completename}</TableCell>
                      <TableCell style={{ color: '#f39c12', fontWeight: 'bold' }}>{(val.user_jobposition !== "" ? String(val.user_jobposition).toUpperCase() : undefined)}</TableCell>
                      <TableCell>{val.employee_status}</TableCell>
                    </TableRow>
                  })
                  }
                </TableBody>
              </Table>
            </div>
          </Card>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={state.trackAssignLocationModal}
        onClose={() => {
          setState(prev => ({ ...prev, trackAssignLocationModal: false }));
        }}
        aria-labelledby="responsive-dialog-title">
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => setState(prev => ({ ...prev, trackAssignLocationModal: false }))}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogTitle id="simple-dialog-title">TRACK ASSIGNED LOCATIONS</DialogTitle>
        <DialogContent >
          <TrackingAssignedLocation state={state} setState={setState} fieldman_map={fieldman_map}/>
        </DialogContent>
      </Dialog>
      <Dialog
       fullScreen
        open={state.tableFormatAssignedDetails}
        onClose={() => {
          setState(prev => ({ ...prev, tableFormatAssignedDetails: false }));
          let getFilter = sessionStorage.getItem('onSelectSingleDateGraph')
          let dataList = []
          if(getFilter != null){
              dataList = JSON.parse(getFilter)
          }
          dataList.from = state.date_start_val
          dataList.to = state.date_start_val

          sessionStorage.setItem('onSelectSingleDateGraph',JSON.stringify(dataList))
          sessionStorage.removeItem('searchName') 
        }}
        aria-labelledby="responsive-dialog-title">
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>{
              setState(prev => ({ ...prev, tableFormatAssignedDetails: false }));
              let getFilter = sessionStorage.getItem('onSelectSingleDateGraph')
              let dataList = []
              if(getFilter != null){
                  dataList = JSON.parse(getFilter)
              }
              dataList.from = state.date_start_val
              dataList.to = state.date_start_val
    
              sessionStorage.setItem('onSelectSingleDateGraph',JSON.stringify(dataList))    
              sessionStorage.removeItem('searchName')        }}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogTitle id="simple-dialog-title">TRACK ASSIGNED LOCATIONS</DialogTitle>
        <DialogContent >
          <TableAssignFormat state={state} setState={setState} fieldman_map={fieldman_map} branch_name = {map_reducer.branch_name}/>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.returnedJO_modal}
        onClose={() => {
          setState(prev => ({ ...prev, returnedJO_modal: false }));
        }}
        aria-labelledby="responsive-dialog-title">
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => setState(prev => ({ ...prev, returnedJO_modal: false }))}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogTitle id="simple-dialog-title">RETURNED JOB ORDER</DialogTitle>
        <DialogContent >
          <ReturnedJo state={state} setState={setState} fieldman_map={fieldman_map} branch_name = {map_reducer.branch_name}/>
        </DialogContent>
      </Dialog>

    </div>
  );
})
export default React.memo(Home);
