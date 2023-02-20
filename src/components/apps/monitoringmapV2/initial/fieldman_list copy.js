import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
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
  Tooltip,
  Card,
  CardContent,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TextareaAutosize,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Pie from "./charts/pie";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FilterListIcon from "@material-ui/icons/FilterList";
import Slide from "@material-ui/core/Slide";
import Filter from "./filter";
import CloseIcon from "@material-ui/icons/Close";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HistoryIcon from "@material-ui/icons/History";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import UserImage from "../../../../assets/map image/user_image.png";
import { getData, serverProfile } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import ReactExport from "react-data-export";
import GetAppIcon from "@material-ui/icons/GetApp";
import AccomMemo from "../../mapMonitoring/memo/accom";
import { useHistory } from "react-router-dom";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FiveDotsSummary from "./five_dots_summary";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AutoComplete from "./autocomplete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ListAltIcon from "@material-ui/icons/ListAlt";
import GroupIcon from "@material-ui/icons/Group";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import MoneyIcon from "@material-ui/icons/Money";
import PettyCAsh from "./pettyCash/pettycash";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";

let width = window.innerWidth;
let height_window = window.innerHeight;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const HtmlTooltip2 = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);
// function FieldmanList({ fieldman_map, date_start, onShow, getfield_findings, refreshOnClickFieldman, resetTrackSpan, open_summary,excel_invalid_data,Selected_branch,excelFile,Selectedcompany,logo,openFiedmanHistory,getRecord}) {
const AssigningField = ({ val, index, state, setState }) => {
  const [regionData, setRegion] = React.useState([]);
  const [provinceData, setProvince] = React.useState([]);
  const [cityData, setCity] = React.useState([]);
  const [barangayData, setBarangay] = React.useState([]);

  const [regionAddr, setRegionAddr] = React.useState("");
  const [provinceAddr, setProvinceAddr] = React.useState("");
  const [cityAddr, setCityAddr] = React.useState("");
  const [barangayAddr, setBarangayAddr] = React.useState("");

  React.useEffect(() => {
    regions().then((response) => {
      setRegion(response);
      provinces(val.location.region_code).then((response) => {
        setProvince(response);
        cities(val.location.province_code).then((response) => {
          setCity(response);
          barangays(val.location.city_code).then((response) => {
            setBarangay(response);
          });
        });
      });
    });
  }, [state.batch_change]);
  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e, index) => {
    let data = regionData.filter((val) => val.region_code === e);
    setRegionAddr(data[0].region_name);
    let region = { region: data[0].region_name };
    setState((prev) => ({
      ...prev,
      jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
        index === index_jo
          ? {
              ...jo_data,
              location: {
                ...jo_data.location,
                region: data[0].region_name,
                region_code: e,
              },
            }
          : jo_data
      ),
    }));
    provinces(e).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e, index) => {
    let data = provinceData.filter((val) => val.province_code === e);
    setProvinceAddr(data[0].province_name);
    setState((prev) => ({
      ...prev,
      jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
        index === index_jo
          ? {
              ...jo_data,
              location: {
                ...jo_data.location,
                province: data[0].province_name,
                province_code: e,
              },
            }
          : jo_data
      ),
    }));
    cities(e).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e, index) => {
    let data = cityData.filter((val) => val.city_code === e);
    setCityAddr(data[0].city_name);
    barangays(e).then((response) => {
      setBarangay(response);
      setState((prev) => ({
        ...prev,
        jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
          index === index_jo
            ? {
                ...jo_data,
                location: {
                  ...jo_data.location,
                  city: data[0].city_name,
                  city_code: e,
                },
              }
            : jo_data
        ),
      }));
    });
  };

  const brgy = (e, index) => {
    let data = barangayData.filter((val) => val.brgy_code === e);

    setBarangayAddr(data[0].brgy_name);
    setState((prev) => ({
      ...prev,
      jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
        index === index_jo
          ? {
              ...jo_data,
              location: {
                ...jo_data.location,
                barangay: data[0].brgy_name,
                barangay_code: e,
              },
            }
          : jo_data
      ),
    }));
  };
  return (
    <Card variant="outlined" style={{ marginBottom: 6, position: "relative" }}>
      <CardContent>
        <div
          style={{
            backgroundColor: "#2a5793",
            height: 25,
            width: 25,
            borderRadius: 12.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 8,
          }}
        >
          <Typography style={{ color: "#fff" }}>{index + 1}</Typography>
        </div>
        <Grid container spacing={1} key={index} style={{ marginTop: 25 }}>
          <Grid item xs={12} md={2}>
            <FormControl
              size="small"
              variant="outlined"
              style={{ width: "100%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Region
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => province(e.target.value, index)}
                onSelect={region}
                label="Rover ID"
                name="selected_rover"
                value={val.location.region_code}
              >
                {regionData &&
                  regionData.length > 0 &&
                  regionData.map((item) => (
                    <MenuItem key={item.region_code} value={item.region_code}>
                      {item.region_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* <AutoComplete newvalue={val.location.description} locationGet={(location) => {
            setState(prev => ({
              ...prev,
              jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
                index === index_jo ? {
                  ...jo_data,
                  location: location
                } : jo_data)
            }))
          }} /> */}
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl
              size="small"
              variant="outlined"
              style={{ width: "100%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Province
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => city(e.target.value, index)}
                label="Rover ID"
                name="selected_rover"
                value={val.location.province_code}
              >
                {provinceData &&
                  provinceData.length > 0 &&
                  provinceData.map((item) => (
                    <MenuItem
                      key={item.province_code}
                      value={item.province_code}
                    >
                      {item.province_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl
              size="small"
              variant="outlined"
              style={{ width: "100%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                City
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => barangay(e.target.value, index)}
                label="Rover ID"
                name="selected_rover"
                value={val.location.city_code}
              >
                {cityData &&
                  cityData.length > 0 &&
                  cityData.map((item) => (
                    <MenuItem key={item.city_code} value={item.city_code}>
                      {item.city_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl
              size="small"
              variant="outlined"
              style={{ width: "100%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Barangay
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => brgy(e.target.value, index)}
                label="Rover ID"
                name="selected_rover"
                value={val.location.barangay_code}
              >
                {barangayData &&
                  barangayData.length > 0 &&
                  barangayData.map((item) => (
                    <MenuItem key={item.brgy_code} value={item.brgy_code}>
                      {item.brgy_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Street(Optional)"
              size="small"
              style={{ width: "100%" }}
              value={val.location.description}
              variant={"outlined"}
              onChange={(e) => {
                let location_details = e.target.value;
                setState((prev) => ({
                  ...prev,
                  jo_type_assign: state.jo_type_assign.map(
                    (jo_data, index_jo) =>
                      index === index_jo
                        ? {
                            ...jo_data,
                            location: {
                              ...jo_data.location,
                              description: location_details,
                            },
                          }
                        : jo_data
                  ),
                }));
              }}
            />
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                {val.jo.map((val_header, index) => {
                  return (
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        textAlign: "center",
                        color: "#fff",
                        backgroundColor: "#2a5793",
                      }}
                      key={index}
                    >
                      {val_header.type}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {val.jo.map((jo_val, index2) => {
                  return (
                    <TableCell item xs={12} md={7}>
                      <TextField
                        value={jo_val.count}
                        onChange={(e) => {
                          // if(e.target.value !== ""){
                          const { name, value } = e.target;
                          setState((prev) => ({
                            ...prev,
                            jo_type_assign: state.jo_type_assign.map(
                              (jo_data, index_jo) =>
                                index === index_jo
                                  ? {
                                      ...jo_data,
                                      jo: jo_data.jo.map((count_val, index3) =>
                                        index3 === index2
                                          ? { ...count_val, count: value }
                                          : count_val
                                      ),
                                    }
                                  : jo_data
                            ),
                          }));
                          // }
                        }}
                        type="number"
                        value={jo_val.count}
                        inputProps={{ min: 0, style: { textAlign: "center" } }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </CardContent>
    </Card>
  );
};
const FieldmanList = forwardRef((props, ref) => {
  const comment_ref = React.useRef("");
  const {
    fieldman_map,
    date_start,
    onShow,
    getfield_findings,
    refreshOnClickFieldman,
    resetTrackSpan,
    open_summary,
    excel_invalid_data,
    Selected_branch,
    excelFile,
    Selectedcompany,
    logo,
    openFiedmanHistory,
    getRecord,
    hideHistory,
    updateDashboard,
    closemobile,
  } = props;
  const [state, setState] = React.useState({
    countRequest: 0,
    memo_accom: false,
    memo_details: [],
    memo_data: [],
    fivedots_modal: false,
    openFilterDots: false,
    filter_date_start: new Date(),
    filter_date_end: new Date(),
    five_dots_data: [],
    modal_comment: false,
    comment_data: "",
    jo_assign_id: "",
    fieldman_id: "",
    modal_assigning: false,
    location: [],
    tableAssignHeader: [
      "SOA",
      "DN",
      "NCR",
      "NAC",
      "SOA",
      "OSB",
      "OSN",
      "MECO",
      "AUBD",
      "RE-OUT SOA",
      "RE-OUT DN",
    ],
    jo_type_assign: [
      {
        location: {
          lat: 0,
          lng: 0,
          region: "",
          region_code: "",
          province: "",
          province_code: "",
          city: "",
          city_code: "",
          barangay: "",
          barangay_code: "",
          description: "",
        },
        jo: [
          {
            type: "SOA",
            count: "0",
            name: "jo_soa",
          },
          {
            type: "DN",
            count: "0",
            name: "jo_dn",
          },
          {
            type: "NCR",
            count: "0",
            name: "jo_ncr",
          },
          {
            type: "NAC",
            count: "0",
            name: "jo_nac",
          },
          {
            type: "OSB",
            count: "0",
            name: "jo_osb",
          },
          {
            type: "OSN",
            count: "0",
            name: "jo_osn",
          },
          {
            type: "MECO",
            count: "0",
            name: "jo_meco",
          },
          {
            type: "AUBD",
            count: "0",
            name: "jo_aubd",
          },
          {
            type: "RE-OUT SOA",
            count: "0",
            name: "jo_soa_reout",
          },
          {
            type: "RE-OUT DN",
            count: "0",
            name: "jo_dn_reout",
          },
        ],
      },
    ],
    selected_user_id: "",
    selected_batch: [],
    batchButton: [],
    activeBatchButton: 0,
    rover_details: [],
    selected_rover: "",
    batch_change: false,
    allowance: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    selected_allowance: 0,
    map_selected_fieldman: false,
    map_selected_fieldman_id: "",
    pettyCashModel: false,
    pettyCash: [],
    searchDriver: "",
    five_dots_data_top: [],
  });
  const [regionData, setRegion] = React.useState([]);
  const [provinceData, setProvince] = React.useState([]);
  const [cityData, setCity] = React.useState([]);
  const [barangayData, setBarangay] = React.useState([]);

  const [regionAddr, setRegionAddr] = React.useState("");
  const [provinceAddr, setProvinceAddr] = React.useState("");
  const [cityAddr, setCityAddr] = React.useState("");
  const [barangayAddr, setBarangayAddr] = React.useState("");

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const history = useHistory();
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  React.useEffect(() => {
    let searchName = sessionStorage.getItem("searchName");
    if (searchName != null) {
      setState((prev) => ({
        ...prev,
        searchDriver: searchName,
      }));
    }
  }, []);
  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e, index) => {
    let data = regionData.filter((val) => val.region_code === e);
    setRegionAddr(data[0].region_name);
    let region = { region: data[0].region_name };
    setState((prev) => ({
      ...prev,
      jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
        index === index_jo
          ? {
              ...jo_data,
              location: {
                ...jo_data.location,
                region: data[0].region_name,
                region_code: e,
              },
            }
          : jo_data
      ),
    }));
    provinces(e).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e, index) => {
    let data = provinceData.filter((val) => val.province_code === e);
    setProvinceAddr(data[0].province_name);
    setState((prev) => ({
      ...prev,
      jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
        index === index_jo
          ? {
              ...jo_data,
              location: {
                ...jo_data.location,
                province: data[0].province_name,
                province_code: e,
              },
            }
          : jo_data
      ),
    }));
    cities(e).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e, index) => {
    let data = cityData.filter((val) => val.city_code === e);
    setCityAddr(data[0].city_name);
    barangays(e).then((response) => {
      setBarangay(response);
      setState((prev) => ({
        ...prev,
        jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
          index === index_jo
            ? {
                ...jo_data,
                location: {
                  ...jo_data.location,
                  city: data[0].city_name,
                  city_code: e,
                },
              }
            : jo_data
        ),
      }));
    });
  };

  const brgy = (e, index) => {
    let data = barangayData.filter((val) => val.brgy_code === e);

    setBarangayAddr(data[0].brgy_name);
    setState((prev) => ({
      ...prev,
      jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
        index === index_jo
          ? {
              ...jo_data,
              location: {
                ...jo_data.location,
                barangay: data[0].brgy_name,
                barangay_code: e,
              },
            }
          : jo_data
      ),
    }));
  };

  const onTrackAccomplishments = (
    row,
    date_start,
    assign,
    bulk_data_new,
    type
  ) => {
    let data = {
      user_id: row.user_id,
      date: moment(date_start).format("YYYY-MM-DD"),
      jo_type: map_reducer.selected_jo,
    };
    let pin_img = [];
    let match = false;
    home_reducer.SelectedBranches.map((val, index) => {
      if (Selected_branch === val.branch_id) {
        if (val.branch_field_work !== "" && !match) {
          match = true;
          if (val.branches_pin_img != null) {
            pin_img = JSON.parse(val.branches_pin_img);
          }
        }
      }
    });

    dispatch({ type: "pin_img", pin_img: pin_img });
    getAccom(data, row, date_start, assign, bulk_data_new, type);
  };
  async function getAccom(data, row, date_start, assign, bulk_data_new, type) {
    // try {
    dispatch_data("loading_map", true);
    let date_history = moment(date_start).format("YYYY-MM-DD");
    let res = await getData("tracking/trackAccomplishments", data);
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

    row.batch.map((val_batch, index) => {
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
    let data_type = [
      { type: "AUBD", count: jo_aubd },
      { type: "DN", count: jo_dn },
      { type: "MECO", count: jo_meco },
      { type: "NAC", count: jo_nac },
      { type: "NCR", count: jo_ncr },
      { type: "OSB", count: jo_osb },
      { type: "OSN", count: jo_osn },
      { type: "SOA", count: jo_soa },
      { type: "REO DN", count: jo_dn_reout },
      { type: "REO SOA", count: jo_soa_reout },
    ];
    let hours = [];
    let last_coordinates = "";
    if (res.accomplishment.length > 0) {
      var latlong = "";
      var splitlatlng = "";
      var lat = "";
      var lng = "";
      var complete_name = "";
      for (let index = 0; index < res.accomplishment.length; index++) {
        latlong = String(res.accomplishment[index].fetched_coordinates);
        splitlatlng = latlong.split(",");
        lat = splitlatlng[0];
        lng = splitlatlng[1];
        // if (parseInt(lat) !== 0) {
        //   setmapOption({
        //     ...mapOption,
        //     lat: parseFloat(lat),
        //     lng: parseFloat(lng),
        //     zoom: 13,
        //   });
        //   break;
        // }
      }
      // res.accomplishment.map((val) => {
      // if(res.accomplishment[0].fetched_coordinates !== 0){

      // })

      for (let index = 0; index < 17; index++) {
        const details = {
          time: moment("2020-01-01 5:00").add(index, "hours").format("HH:mm"),
          count: 0,
          battery: undefined,
          fetched_coordinates: "",
          cumulative: 0,
          total_jo: assign,
        };

        hours.push(details);
      }
      let index_match = "";
      let end = false;
      let total_accom = 0;
      let prev_battery = 0;
      hours.map((val_hours, index) => {
        if (index_match === "") {
          val_hours.battery = 100;
        }
        let time_data = parseInt(String(val_hours.time).split(":")[0]);

        res.accomplishment.map((val, index2) => {
          last_coordinates = val.fetched_coordinates;
          let time_data_employee = parseInt(
            String(moment(val.date_accom).format("HH:mm")).split(":")[0]
          );
          if (time_data === time_data_employee) {
            total_accom++;

            if (index_match === "") {
              index_match = index;
            }
            if (index_match === index) {
              if (val_hours.count === 0) {
                val_hours.battery = parseInt(val.accom_battery_life);
                prev_battery = parseInt(val.accom_battery_life);
              }
            } else {
              val_hours.battery = parseInt(val.accom_battery_life);
              prev_battery = parseInt(val.accom_battery_life);
            }
            val_hours.count += 1;
            val_hours.fetched_coordinates = val.fetched_coordinates;
          } else {
            if (index_match !== "") {
              if (index2 <= res.accomplishment.length - 1) {
                if (time_data_employee >= time_data) {
                  val_hours.battery = parseInt(prev_battery);
                }
              }
            }
          }
          if (index2 === res.accomplishment.length - 1) {
            if (time_data_employee < time_data) {
              end = true;
            }
          }
        });
        if (end) {
          val_hours.count = undefined;
          val_hours.cumulative = undefined;
        } else {
          val_hours.cumulative += total_accom;
        }
      });
      // setLine(hours);
    }
    let last_accomplishents = new Date();
    let first_accomplishents = new Date();
    if (res.accomplishment.length > 0) {
      last_accomplishents = new Date(
        res.accomplishment[res.accomplishment.length - 1].date_accom
      );
      first_accomplishents = new Date(res.accomplishment[0].date_accom);
    }
    var oneDay = 24 * 60 * 60 * 1000;
    var date1 = first_accomplishents;
    var date2 = last_accomplishents;

    var diffDays = Math.abs(
      ((date1.getTime() - date2.getTime()) / oneDay) * 24
    );
    let hours_diff = 0;
    if (diffDays < 1) {
      hours_diff = parseInt(diffDays * 60) + " " + "mins.";
    } else {
      let new_hours = parseInt(diffDays);
      let mins = (parseFloat(diffDays).toFixed(2) - new_hours) * 60;
      hours_diff =
        new_hours + " " + "hr." + "  " + parseInt(mins) + " " + "mins.";
    }
    let locations = [];
    res.accomplishment.forEach((val) => {
      var latlong = "";
      var splitlatlng = "";
      var lat = "";
      var lng = "";
      latlong = String(val.fetched_coordinates);
      splitlatlng = latlong.split(",");
      lat = parseFloat(splitlatlng[0]);
      lng = parseFloat(splitlatlng[1]);
      let new_data = val;
      new_data["lat"] = lat;
      new_data["lng"] = lng;
      locations.push(new_data);
    });
    let details_fieldman = {
      date_history: date_history,
      fieldman_delivery_type: data_type,
      last_coordinates: last_coordinates,
      trackAccom: locations,
      trackAccom2: locations,
      user_pic: row.user_pic,
      completeName: row.completename,
      assign2: assign,
      count_attendance: row.attendance.length,
      accom_diff: hours_diff,
      singele_history: type,
      single_user_id: row.user_id,
      attendance: row.attendance,
      line: hours,
    };
    hideHistory();
    onShow(details_fieldman);
    dispatch_data("loading_map", false);
    // } catch (error) {
    //   console.log(error)
    //   dispatch_data("loading_map", false);
    //   let res = String(error).includes("Network Error");
    //   errorhandling(
    //     res,
    //     data,
    //     row,
    //     date_start,
    //     assign,
    //     bulk_data_new,
    //     type
    //   );
    // }
  }
  useImperativeHandle(ref, () => ({
    onTrackAccomplishmentsRoute(row, date_start, assign, bulk, type) {
      onTrackAccomplishments(row, date_start, assign, bulk, type);
    },
    openMapSelectedFieldman(user_id) {
      setState((prev) => ({
        ...prev,
        map_selected_fieldman: true,
        map_selected_fieldman_id: user_id,
      }));
    },
  }));
  const totalValidation = () => {
    let countValidation = 0;
    let percent = 0;
    fieldman_map.map((row, key) => {
      let new_percent = 0;
      if (row.jo_accom_list.length !== 0) {
        let trackAccom2 = row.jo_accom_list;
        countValidation += trackAccom2.reduce((count, val) => {
          if (
            val.validator_remarks === "INVALID" ||
            val.validator_remarks === "VALID"
          ) {
            count++;
          }
          return count;
        }, 0);
        new_percent = parseInt(
          trackAccom2.length * (map_reducer.count_validation_logs / 100)
        );
        if (trackAccom2.length <= 50) {
          new_percent = trackAccom2.length;
        }
        if (new_percent < 50) {
          if (trackAccom2.length > 50) {
            new_percent = 50;
          }
        }
        percent += new_percent;
      }
    });
    return countValidation + " of " + percent;
  };

  const errorhandling = (
    res,
    data,
    row,
    date_start,
    assign,
    bulk_data_new,
    type
  ) => {
    if (res) {
      if (state.countRequest < 3) {
        setTimeout(() => {
          getAccom(data, row, date_start, assign, bulk_data_new, type);
        }, 2000);
        setState((prev) => ({
          ...prev,
          countRequest: state.countRequest++,
        }));
      } else {
        alert("Please check your internet connection.");
      }
    } else {
      alert("Something went wrong.");
    }
  };
  const generateMemo = (user_id) => {
    let data = excel_invalid_data.filter((val) => val.FieldmanID === user_id);
    getData(
      "tracking/generate_memo_SOA2",
      {
        data: data,
        user_id: localStorage.getItem("u"),
        branch_id: Selected_branch,
      },
      state.discon
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
      let approver_1_signature = null;
      let approver_2_signature = null;
      let approver_3_signature = null;
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
        approver_1_signature = val.approver_1_signature;
        approver_2_signature = val.approver_2_signature;
        approver_3_signature = val.approver_3_signature;

        fman_data.map((val_fman) => {
          fieldmanName = val_fman.FieldmanName;
          branch_name = val_fman.branch;
          date_accom = val_fman.date;
          total_delivered = val_fman.delivered;
          total_pending = val_fman.completeness_data;
          total_bulk = val_fman.bulk_data;
        });
      });
      let details = [];
      details["control_no"] = control_no;
      details["fieldmanName"] = fieldmanName;
      details["branch_name"] = branch_name;
      details["date_created_val"] = date_created_val;
      details["date_accom"] = date_accom;
      details["total_delivered"] = total_delivered;
      details["total_pending"] = total_pending;
      details["total_bulk"] = total_bulk;
      details["approver_1"] = approver_1;
      details["approver_2"] = approver_2;
      details["approver_3"] = approver_3;
      details["approver_1_signature"] = approver_1_signature;
      details["approver_2_signature"] = approver_2_signature;
      details["approver_3_signature"] = approver_3_signature;

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
  async function onFilterJODOTS(e) {
    e.preventDefault();
    dispatch_data("loading_map", true);
    let data = {
      filter_date_start: state.filter_date_start,
      filter_date_end: state.filter_date_end,
      branch_id: Selected_branch,
      jo_type: map_reducer.selected_jo,
    };
    let res = await getData("aam/getFiveDotsSummary", data);
    setState((prev) => ({
      ...prev,
      five_dots_data: res.new_data,
      five_dots_data_top: res.month_below,
      openFilterDots: false,
    }));
    dispatch_data("loading_map", false);
  }
  const insertComment = (e) => {
    e.preventDefault();
    let details = {
      user_id_comment: localStorage.getItem("u"),
      jo_comment: comment_ref.current.value,
      jo_assign_id: state.jo_assign_id,
    };
    dispatch_data("loading_map", true);

    getData("aam/add_comment_jo_assign", details).then((res) => {
      let jo_id = "";
      fieldman_map.forEach((val) => {
        if (val.user_id === state.fieldman_id) {
          val.batch.forEach((val, index_batch) => {
            if (jo_id === "") {
              jo_id = val.jo_assign_id;
              val.jo_comment = comment_ref.current.value;
            }
          });
        }
      });
      setState({ ...state, modal_comment: false });

      comment_ref.current.value = "";
      dispatch_data("loading_map", false);
    });
  };
  let EmployeeSearch = fieldman_map.filter((files) => {
    return (
      files.completename
        .toLowerCase()
        .indexOf(state.searchDriver.toLocaleLowerCase()) !== -1
    );
  });

  const onAddAssigning = () => {
    state.jo_type_assign.push({
      location: {
        lat: 0,
        lng: 0,
        region: "",
        region_code: "",
        province: "",
        province_code: "",
        city: "",
        city_code: "",
        barangay: "",
        barangay_code: "",
        description: "",
      },
      jo: [
        {
          type: "SOA",
          count: "0",
          name: "jo_soa",
        },
        {
          type: "DN",
          count: "0",
          name: "jo_dn",
        },
        {
          type: "NCR",
          count: "0",
          name: "jo_ncr",
        },
        {
          type: "NAC",
          count: "0",
          name: "jo_nac",
        },
        {
          type: "OSB",
          count: "0",
          name: "jo_osb",
        },
        {
          type: "OSN",
          count: "0",
          name: "jo_osn",
        },
        {
          type: "MECO",
          count: "0",
          name: "jo_meco",
        },
        {
          type: "AUBD",
          count: "0",
          name: "jo_aubd",
        },
        {
          type: "RE-OUT SOA",
          count: "0",
          name: "jo_soa_reout",
        },
        {
          type: "RE-OUT DN",
          count: "0",
          name: "jo_dn_reout",
        },
        {
          type: "Validate",
          count: "0",
          name: "jo_validate",
        },
        {
          type: "503",
          count: "0",
          name: "503",
        },
      ],
    });
    setState((prev) => ({ ...prev }));
  };
  const onRemoveAssigning = () => {
    let count = state.jo_type_assign.length;

    state.jo_type_assign.splice(count - 1, 1);
    setState((prev) => ({ ...prev }));
  };
  const onSubmitAssign = () => {
    dispatch_data("loading_map", true);
    let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph");
    let date = moment().format("YYYY-MM-DD");
    let branch_id = "";
    let jo_type = "";
    let jo_assign_id = 0;

    if (onSelectData !== null) {
      let new_data = JSON.parse(onSelectData);
      date = moment(new_data.from).format("YYYY-MM-DD");
      branch_id = new_data.selection[0];
      jo_type = new_data.jo_type[0];
    }
    let new_data_val = { jo_assign_id: "", data: [], date: "" };
    let rover_filter = state.rover_details.filter(
      (val) => val.rover_id === state.selected_rover
    );
    let new_data = {
      jo_date_assign: date,
      user_id: state.selected_user_id,
      jo_date_added: moment().format("YYYY-MM-DD"),
      jo_location_structure: JSON.stringify(state.jo_type_assign),
      branch_id: branch_id,
      jo_type: jo_type,
      jo_count: 0,
      rover_assigned: JSON.stringify(rover_filter),
      allowance: state.selected_allowance,
    };
    new_data["jo_assign_id"] = jo_assign_id;
    if (state.jo_assign_id !== "") {
      new_data["jo_assign_id"] = state.jo_assign_id;
      jo_assign_id = state.jo_assign_id;
    }
    state.jo_type_assign.forEach((val) => {
      val.jo.forEach((val2) => {
        let count = 0;
        if (val2.count !== "") {
          count = parseInt(val2.count);
        }
        let match = false;
        if (typeof new_data[val2.name] != "undefined") {
          new_data[val2.name] += count;
          new_data.jo_count += count;
          match = true;
        }
        if (!match) {
          new_data[val2.name] = count;
          new_data.jo_count += count;
        }
      });
    });

    getData("tracking/logAssignCount", new_data).then((res) => {
      let countChange = 0;
      fieldman_map.forEach((val) => {
        if (val.user_id === state.selected_user_id) {
          if (typeof val.batch[state.activeBatchButton] !== "undefined") {
            let batch_fm_count = val.batch[state.activeBatchButton].jo_count;
            countChange = new_data.jo_count - parseInt(batch_fm_count);
            val.batch[state.activeBatchButton].jo_count = new_data.jo_count;
            val.batch[state.activeBatchButton].jo_location_structure =
              new_data.jo_location_structure;
            val.batch[state.activeBatchButton].jo_aubd = new_data.jo_aubd;
            val.batch[state.activeBatchButton].jo_discon = new_data.jo_discon;
            val.batch[state.activeBatchButton].jo_dn = new_data.jo_dn;
            val.batch[state.activeBatchButton].jo_dn_reout =
              new_data.jo_dn_reout;
            val.batch[state.activeBatchButton].jo_meco = new_data.jo_meco;
            val.batch[state.activeBatchButton].jo_nac = new_data.jo_nac;
            val.batch[state.activeBatchButton].jo_ncr = new_data.jo_ncr;
            val.batch[state.activeBatchButton].jo_osb = new_data.jo_osb;
            val.batch[state.activeBatchButton].jo_osn = new_data.jo_osn;
            val.batch[state.activeBatchButton].jo_osn = new_data.jo_validate;

            val.batch[state.activeBatchButton].jo_reading = new_data.jo_reading;
            val.batch[state.activeBatchButton].jo_recon = new_data.jo_recon;
            val.batch[state.activeBatchButton].jo_soa = new_data.jo_soa;
            val.batch[state.activeBatchButton].jo_soa_reout =
              new_data.jo_soa_reout;
            val.batch[state.activeBatchButton].rover_assigned =
              new_data.rover_assigned;
          } else {
            countChange = new_data.jo_count;
            new_data.jo_assign_id = String(res.id);
            new_data.jo_comment = null;
            new_data.jo_approval_array = "";
            new_data.user_id_comment = null;
            new_data.jo_validate = "0";
            new_data.jo_discon = "0";
            new_data.jo_map = "0";
            new_data.jo_reading = "0";
            new_data.jo_recon = "0";
            new_data.jo_discon = "0";
            new_data.jo_dn = String(new_data.jo_dn);
            new_data.jo_dn_reout = String(new_data.jo_dn_reout);
            new_data.jo_soa = String(new_data.jo_soa);
            new_data.jo_soa_reout = String(new_data.jo_soa_reout);
            new_data.jo_nac = String(new_data.jo_nac);
            new_data.jo_aubd = String(new_data.jo_aubd);
            new_data.jo_count = String(new_data.jo_count);
            new_data.jo_meco = String(new_data.jo_meco);
            new_data.jo_ncr = String(new_data.jo_ncr);
            new_data.jo_osb = String(new_data.jo_osb);
            new_data.jo_osn = String(new_data.jo_osn);
            new_data.jo_validate = String(new_data.jo_validate);
            new_data.jo_date_added = new_data.jo_date_added + " 00:00:00";
            new_data.jo_date_assign = new_data.jo_date_assign + " 00:00:00";
            new_data.jo_rescue = "";
            val.batch.push(new_data);
          }
        }
      });

      updateDashboard(fieldman_map);
      setState((prev) => ({
        ...prev,
        modal_assigning: false,
        selected_batch: [],
      }));
    });
  };

  const onSelectFieldmanAssign = (index, batch, user_id) => {
    getData("aam/getRoverDetails", { branch_id: Selected_branch }).then(
      (res) => {
        let batch_data = [];
        let jo_assign_id = "";
        let selected_rover = "";
        let allowance = 0;
        if (typeof batch[index] !== "undefined") {
          jo_assign_id = batch[index].jo_assign_id;
          allowance = batch[index].allowance;
          if (batch[index].jo_location_structure != null) {
            batch_data = JSON.parse(batch[index].jo_location_structure);

            if (
              batch[index].rover_assigned != null &&
              batch[index].rover_assigned != "[]"
            ) {
              selected_rover = JSON.parse(batch[index].rover_assigned)[0]
                .rover_id;
            }

            if (typeof batch_data[0].location.region !== "undefined") {
              // province(batch_data[0].location.region_code,index)
              // provinces(batch_data[0].location.region_code).then(response => {
              //   setProvince(response);
              //   cities(batch_data[0].location.province_code).then(response => {
              //     setCity(response);
              //     barangays(batch_data[0].location.city_code).then(response => {
              //       setBarangay(response);
              //     });
              //   });
              // });
            }
          } else {
            batch_data = [
              {
                location: {
                  lat: 0,
                  lng: 0,
                  region: "",
                  region_code: "",
                  province: "",
                  province_code: "",
                  city: "",
                  city_code: "",
                  barangay: "",
                  barangay_code: "",
                  description: "",
                },
                jo: [
                  {
                    type: "SOA",
                    count: batch[index].jo_soa,
                    name: "jo_soa",
                  },
                  {
                    type: "DN",
                    count: batch[index].jo_dn,
                    name: "jo_dn",
                  },
                  {
                    type: "NCR",
                    count: batch[index].jo_ncr,
                    name: "jo_ncr",
                  },
                  {
                    type: "NAC",
                    count: batch[index].jo_nac,
                    name: "jo_nac",
                  },
                  {
                    type: "OSB",
                    count: batch[index].jo_osb,
                    name: "jo_osb",
                  },
                  {
                    type: "OSN",
                    count: batch[index].jo_osn,
                    name: "jo_osn",
                  },
                  {
                    type: "MECO",
                    count: batch[index].jo_meco,
                    name: "jo_meco",
                  },
                  {
                    type: "AUBD",
                    count: batch[index].jo_aubd,
                    name: "jo_aubd",
                  },
                  {
                    type: "RE-OUT SOA",
                    count: batch[index].jo_soa_reout,
                    name: "jo_soa_reout",
                  },
                  {
                    type: "RE-OUT DN",
                    count: batch[index].jo_dn_reout,
                    name: "jo_dn_reout",
                  },
                  {
                    type: "Validate",
                    count: batch[index].jo_validate,
                    name: "jo_validate",
                  },
                  {
                    type: "503",
                    count: "0",
                    name: "503",
                  },
                ],
              },
            ];
          }
        } else {
          batch_data = [
            {
              location: {
                lat: 0,
                lng: 0,
                region: "",
                region_code: "",
                province: "",
                province_code: "",
                city: "",
                city_code: "",
                barangay: "",
                barangay_code: "",
                description: "",
              },
              jo: [
                {
                  type: "SOA",
                  count: "0",
                  name: "jo_soa",
                },
                {
                  type: "DN",
                  count: "0",
                  name: "jo_dn",
                },
                {
                  type: "NCR",
                  count: "0",
                  name: "jo_ncr",
                },
                {
                  type: "NAC",
                  count: "0",
                  name: "jo_nac",
                },
                {
                  type: "OSB",
                  count: "0",
                  name: "jo_osb",
                },
                {
                  type: "OSN",
                  count: "0",
                  name: "jo_osn",
                },
                {
                  type: "MECO",
                  count: "0",
                  name: "jo_meco",
                },
                {
                  type: "AUBD",
                  count: "0",
                  name: "jo_aubd",
                },
                {
                  type: "RE-OUT SOA",
                  count: "0",
                  name: "jo_soa_reout",
                },
                {
                  type: "RE-OUT DN",
                  count: "0",
                  name: "jo_dn_reout",
                },
                {
                  type: "Validate",
                  count: "0",
                  name: "jo_validate",
                },
                {
                  type: "503",
                  count: "0",
                  name: "503",
                },
              ],
            },
          ];
        }
        let batchButtonCount = batch.length;
        let batchButton = [];
        if (batch.length < state.batchButton.length) {
          batchButtonCount = state.batchButton.length;
        }

        for (let i = 0; i < batchButtonCount; i++) {
          batchButton.push(i);
        }
        let new_allowance = parseInt(allowance);
        if (allowance === null) {
          new_allowance = "";
        }

        setState((prev) => ({
          ...prev,
          selected_rover: selected_rover,
          selected_allowance: new_allowance,
          jo_type_assign: batch_data,
          modal_assigning: true,
          selected_user_id: user_id,
          jo_assign_id: jo_assign_id,
          selected_batch: batch,
          batchButton: batchButton,
          activeBatchButton: index,
          rover_details: res.res,
          batch_change: !state.batch_change,
        }));
      }
    );
  };

  const onChangeValue = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const getPettyCash = (user_id = "") => {
    let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph");
    let selected_data = [];
    if (onSelectData !== null) {
      selected_data = JSON.parse(onSelectData);
      // selected_data.from = moment(indexState.date_start).format('YYYY-MM-DD')
      // selected_data.to = moment(indexState.date_end).format('YYYY-MM-DD')
    }
    selected_data.user_id = user_id;
    if (typeof selected_data.jo_type != "undefined") {
      getData("aam/getAssignedLocation", selected_data).then((res) => {
        let new_data_pettyCash = [];

        for (let index = 0; index < res.get_data.length; index++) {
          const element = res.get_data[index];
          let jo_location_structure = JSON.parse(element.jo_location_structure);
          let location = [];
          location = {
            user_id: element.user_id,
            fullname: element.user_lname + " " + element.user_fname,
            allownce: element.jo_allowance,
            date: selected_data.to,
            jo_location_structure: jo_location_structure,
          };
          new_data_pettyCash.push(location);
        }

        setState((prev) => ({
          ...prev,
          pettyCash: new_data_pettyCash,
          pettyCashModel: true,
        }));
      });
    }
  };

  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ marginTop: 60, paddingRight: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            {width < 600 ? (
              <IconButton
                aria-label="delete"
                size="md"
                onClick={() => closemobile()}
              >
                <KeyboardBackspaceIcon
                  className="font-color-white"
                  fontSize="inherit"
                  style={{}}
                />
              </IconButton>
            ) : undefined}

            <Typography
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              FIELDMAN LIST
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <div style={{ paddingRight: 10, paddingLeft: 10 }}>
              <Tooltip title="Summary">
                <IconButton
                  onClick={() => open_summary()}
                  aria-label="delete"
                  style={{
                    backgroundColor: "#1b5ea0",
                    marginRight: 5,
                    width: 33,
                    height: 33,
                  }}
                >
                  <ListAltIcon style={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title=" Summary 5 Dots">
                <IconButton
                  onClick={() =>
                    setState((prev) => ({ ...prev, fivedots_modal: true }))
                  }
                  aria-label="delete"
                  style={{
                    backgroundColor: "#1b5ea0",
                    marginRight: 5,
                    width: 33,
                    height: 33,
                  }}
                >
                  <FormatListBulletedIcon style={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>

              <ExcelFile
                filename={
                  "Accomplishments" +
                  "-" +
                  map_reducer.branch_name +
                  " " +
                  moment(new Date(date_start)).format("YYYY-MM-DD")
                }
                element={
                  <Tooltip title="Download">
                    <IconButton
                      onClick={() =>
                        setState((prev) => ({ ...prev, fivedots_modal: true }))
                      }
                      aria-label="delete"
                      style={{
                        backgroundColor: "#1b5ea0",
                        marginRight: 5,
                        width: 33,
                        height: 33,
                      }}
                    >
                      <GetAppIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ExcelSheet data={excelFile} name="Accomplishments">
                  <ExcelColumn label="Emp ID" value="user_id" />
                  <ExcelColumn label="Name" value="name" />
                  <ExcelColumn label="Date and Time" value="date" />
                  <ExcelColumn label="First Accom" value="first" />
                  <ExcelColumn label="Last Accom" value="last" />
                </ExcelSheet>
              </ExcelFile>

              <ExcelFile
                filename={
                  "Fieldman List" +
                  "-" +
                  map_reducer.branch_name +
                  " " +
                  moment(new Date(date_start)).format("YYYY-MM-DD")
                }
                element={
                  <Tooltip title=" Employee List">
                    <IconButton
                      onClick={() =>
                        setState((prev) => ({ ...prev, fivedots_modal: true }))
                      }
                      aria-label="delete"
                      style={{
                        backgroundColor: "#1b5ea0",
                        marginRight: 5,
                        width: 33,
                        height: 33,
                      }}
                    >
                      <GroupIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ExcelSheet data={fieldman_map} name="Accomplishments">
                  <ExcelColumn label="Emp ID" value="user_id" />
                  <ExcelColumn label="Name" value="completename" />
                  <ExcelColumn label="Total Assigned" value="count" />
                </ExcelSheet>
              </ExcelFile>
              <Tooltip title="Petty Cash">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    getPettyCash();
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
                </IconButton>
              </Tooltip>
            </div>
            <div
              style={{
                marginLeft: 10,
                marginTop: 10,
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Card
                style={{
                  width: 230,
                  padding: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginRight: 20,
                }}
              >
                <input
                  value={state.searchDriver}
                  placeholder="Search"
                  style={{ borderStyle: "none", outline: "none" }}
                  onChange={(e) => {
                    let val = e.target.value;
                    setState((prev) => ({
                      ...prev,
                      searchDriver: val,
                    }));
                    sessionStorage.removeItem("searchName");
                  }}
                  name="searchDriver"
                />

                <CloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      searchDriver: "",
                    }));
                    sessionStorage.removeItem("searchName");
                  }}
                />
              </Card>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Typography
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#f6b93b",
                marginRight: 20,
              }}
            >
              VALIDATION : {totalValidation()}
            </Typography>
          </Grid>
        </Grid>
        {EmployeeSearch.map((row, index) => {
          let timeout = "";
          let hours = 0;
          let first_meter = "-- : -- --";
          let last_meter = "-- : -- --";
          let first_battery = 0;
          let end_battery = 0;
          let countValidation = 0;
          let percent = 0;
          let countInvalid = 0;
          let jo_id = "";
          let comments = "";
          if (row.jo_accom_list.length !== 0) {
            let trackAccom2 = row.jo_accom_list;
            countValidation = trackAccom2.reduce((count, val) => {
              if (
                val.validator_remarks === "INVALID" ||
                val.validator_remarks === "VALID"
              ) {
                count++;
              }
              if (val.validator_remarks === "INVALID") {
                countInvalid++;
              }
              return count;
            }, 0);
            percent = parseInt(
              trackAccom2.length * (map_reducer.count_validation_logs / 100)
            );
            if (trackAccom2.length <= 50) {
              percent = trackAccom2.length;
            }
            if (percent < 50) {
              if (trackAccom2.length > 50) {
                percent = 50;
              }
            }
            let timeout = row.jo_accom_list[0];
            first_meter = moment(trackAccom2[0].date_accom).format("hh:mm A");
            last_meter = moment(
              trackAccom2[trackAccom2.length - 1].date_accom
            ).format("hh:mm A");
            let new_battery_end = trackAccom2[trackAccom2.length - 1].battery;
            end_battery = String(new_battery_end).replace("%", "");
            let new_battery_first = trackAccom2[0].battery;
            first_battery = String(new_battery_first).replace("%", "");
            row.attendance.map((val, index) => {
              if (
                val.att_type === "Time-out" &&
                index > 0 &&
                index < 3 &&
                trackAccom2.length > 0
              ) {
                var oneDay = 24 * 60 * 60 * 1000;

                var date1 = new Date(trackAccom2[0].date_accom);
                var date2 = new Date(val.date_added);
                var diffDays = Math.abs(
                  ((date1.getTime() - date2.getTime()) / oneDay) * 24
                );
                hours = parseFloat(diffDays).toFixed(2) + " " + "hr.";
                if (diffDays < 1) {
                  hours = parseInt(diffDays * 60) + " " + "min.";
                }
              }
            });
          }
          let assign = 0;
          let bulk = 0;
          let bulk2 = -10;
          let prev_coordinates = "";
          let bulk_val = false;
          let bulk_data = [];
          let bulk_data_new = [];
          let jo_rescue = [];
          let new_batch_count = [];
          let jo_accom_list_count = row.jo_accom_list.length;
          let rover_number = "";
          let rover_data = [];

          row.batch.forEach((val, index_batch) => {
            if (jo_id === "") {
              jo_id = val.jo_assign_id;
              comments = val.jo_comment;
            }
            if (val.jo_rescue !== "") {
              jo_rescue = JSON.parse(val.jo_rescue);
            }
            assign += parseInt(val.jo_count);
            let assign_jo_count = parseInt(val.jo_count);
            if (jo_accom_list_count < 0) {
              jo_accom_list_count = 0;
            }
            let new_jo_accom_list_count = jo_accom_list_count;
            if (
              jo_accom_list_count > assign_jo_count &&
              index_batch < row.batch.length - 1
            ) {
              new_jo_accom_list_count = assign_jo_count;
            }
            if (
              val.rover_assigned !== null &&
              typeof val.rover_assigned !== "undefined"
            ) {
              let rover_details = JSON.parse(val.rover_assigned);
              rover_data = rover_details;
            }
            new_batch_count.push({
              assigned: assign_jo_count,
              accom: new_jo_accom_list_count,
            });
            jo_accom_list_count -= assign_jo_count;

            // if (index_batch + 1 === row.batch.length) {
            //   jo_per_batch = jo_accom_list_count;
            //   new_batch_count.push({
            //     assigned: assign_jo_count,
            //     accom: jo_per_batch,
            //   });
            // } else {
            //   if (jo_accom_list_count >= assign_jo_count) {
            //     jo_accom_list_count -= assign_jo_count;
            //     new_batch_count.push({
            //       assigned: assign_jo_count,
            //       accom: assign_jo_count,
            //     });
            //   } else {
            //     new_batch_count.push({
            //       assigned: assign_jo_count,
            //       accom: jo_accom_list_count,
            //     });
            //   }
            // }
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
          let late_val = false;
          if (row.attendance.length !== 0) {
            if (
              moment(row.attendance[0].date_added).format("LT") >
              moment("2021-01-01 " + row.day_sched.attn_in).format("LT")
            ) {
              late_val = true;
            }
          }
          let textColor = "#fff";
          let statusUser = "";
          if (parseInt(row.user_delete_id) === 1) {
            textColor = "#e74c3c";
            statusUser = " - Inactive";
          }

          let new_attendance = [];
          for (let index = 0; index < row.attendance.length; index++) {
            if (new_attendance.length == 0) {
              if (row.attendance[index].att_type === "Time-in") {
                new_attendance.push(row.attendance[index]);
              }
            } else {
              if (
                new_attendance[new_attendance.length - 1].att_type ===
                row.attendance[index].att_type
              ) {
                let type = "Time-in";
                if (row.attendance[index].att_type === "Time-in") {
                  type = "Time-out";
                }
                new_attendance.push({
                  att_class: "Office",
                  att_type: type,
                  date_added: "--:--",
                  user_id: row.attendance[index].user_id,
                });
                new_attendance.push(row.attendance[index]);
              } else {
                new_attendance.push(row.attendance[index]);
              }
            }
          }
          return (
            <Card key={index} elevation={4} className="card-fieldman">
              <CardContent>
                <Grid
                  container
                  spacing={1}
                  key={index}
                  onClick={() => {
                    resetTrackSpan();
                    setTimeout(() => {
                      onTrackAccomplishments(
                        row,
                        date_start,
                        assign,
                        bulk_data_new
                      );
                    }, 200);
                  }}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Grid item xs={12} md={12}>
                    <div>
                      {/* Image Start */}
                      <Grid container spacing={1}>
                        <Grid item xs={3} md={3}>
                          <Typography>{index + 1}</Typography>
                          <div style={{ position: "relative" }}>
                            <img
                              alt="picture"
                              onError={(e) => {
                                e.target.src = UserImage;
                              }}
                              src={
                                row.user_pic === ""
                                  ? UserImage
                                  : serverProfile + row.user_pic
                              }
                              style={{
                                position: "absolute",
                                filter:
                                  assign > 0 ? undefined : "grayscale(100%)",
                                width: 60,
                                height: 60,
                                margin: "auto",
                                borderRadius: 60 / 2,
                              }}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={5} md={5}>
                          <div style={{}}>
                            <Typography style={{ fontSize: 15 }}>
                              <Typography style={{ fontSize: 13 }}>
                                ID : {row.user_id}
                              </Typography>
                              <Typography
                                style={{
                                  fontWeight: "bold",
                                  color: "#58b19f",
                                  fontSize: 14.1,
                                }}
                              >
                                {row.completename !== null
                                  ? String(row.completename).toUpperCase() +
                                    statusUser
                                  : undefined}
                              </Typography>
                              <Typography
                                style={{ fontSize: 14.1, color: "#f6b93b" }}
                              >
                                {(row.user_jobposition !== ""
                                  ? String(row.user_jobposition).toUpperCase()
                                  : undefined) +
                                  " - " +
                                  row.employee_status}
                              </Typography>
                              {jo_rescue !== ""
                                ? jo_rescue.map((val2, index) => {
                                    return (
                                      <Typography
                                        style={{
                                          fontWeight: "bold",
                                          color: "#f39c12",
                                          fontSize: 14.1,
                                        }}
                                      >
                                        {val2.name}
                                      </Typography>
                                    );
                                  })
                                : undefined}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div style={{ zIndex: 0 }}>
                              {upload_count > 0 &&
                              (row.jo_accom_list.length < assign ||
                                bulk2 > 0) ? (
                                <div
                                  style={{
                                    zIndex: 999,
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    generateMemo(row.user_id);
                                  }}
                                >
                                  {date_start <
                                  moment(new Date()).format("YYYY-MM-DD") ? (
                                    <Tooltip title="Memo" placement="top">
                                      <PictureAsPdfIcon
                                        style={{
                                          fontSize: 26,
                                          marginRight: 5,
                                        }}
                                      />
                                    </Tooltip>
                                  ) : undefined}
                                </div>
                              ) : undefined}
                              {rover_data.map((val, index) => {
                                return (
                                  <HtmlTooltip2
                                    key={index}
                                    color={"#2f3640"}
                                    title={
                                      <React.Fragment>
                                        <Typography
                                          variant="p"
                                          style={{ fontSize: 15 }}
                                          color="inherit"
                                        >
                                          ROVER NO. : {val.rover_mobile_number}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  >
                                    <PhoneAndroidIcon
                                      style={{ fontSize: 26, marginRight: 5 }}
                                    />
                                  </HtmlTooltip2>
                                );
                              })}

                              <HtmlTooltip2
                                color={"#2f3640"}
                                title={
                                  <React.Fragment>
                                    <Typography
                                      variant="p"
                                      style={{ fontSize: 15 }}
                                      color="inherit"
                                    >
                                      CONTACT NO. : {row.user_mobile}
                                    </Typography>

                                    <div
                                      style={{
                                        borderStyle: "solid",
                                        borderWidth: 2,
                                        borderColor: "#dfe6e9",
                                        padding: 6,
                                      }}
                                    >
                                      <Typography
                                        variant="p"
                                        style={{
                                          marginTop: 12,
                                          fontSize: 15,
                                        }}
                                        color="inherit"
                                      >
                                        ATTENDANCE
                                      </Typography>
                                      <div style={{ padding: 10 }}>
                                        {new_attendance.map((val, index) => {
                                          let type = "";
                                          if (val.att_type === "Time-in") {
                                            type = "In";
                                          }
                                          if (val.att_type === "Time-out") {
                                            type = "Out";
                                          }
                                          if (index < 6)
                                            return (
                                              <Grid
                                                key={index}
                                                container
                                                spacing={1}
                                              >
                                                <Grid item xs={4} md={3}>
                                                  <Typography
                                                    variant="p"
                                                    style={{
                                                      fontSize: 15,
                                                    }}
                                                  >
                                                    {type}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={2} md={2}>
                                                  <center>
                                                    <Typography
                                                      variant="p"
                                                      style={{
                                                        fontSize: 15,
                                                      }}
                                                    >
                                                      :
                                                    </Typography>
                                                  </center>
                                                </Grid>
                                                <Grid item xs={7} md={7}>
                                                  <Typography
                                                    variant="p"
                                                    style={{
                                                      fontSize: 15,
                                                    }}
                                                  >
                                                    {val.date_added !== "--:--"
                                                      ? moment(
                                                          val.date_added
                                                        ).format("hh:mm A")
                                                      : val.date_added}
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            );
                                        })}
                                      </div>
                                    </div>
                                  </React.Fragment>
                                }
                              >
                                <AssignmentIndIcon
                                  style={{ fontSize: 26, marginRight: 5 }}
                                />
                              </HtmlTooltip2>
                              <Tooltip title="History" placement="top">
                                <HistoryIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openFiedmanHistory(row.user_id, row);
                                  }}
                                  style={{ fontSize: 26, marginRight: 5 }}
                                />
                              </Tooltip>
                              <Tooltip title="Assigning" placement="top">
                                <AssignmentIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectFieldmanAssign(
                                      0,
                                      row.batch,
                                      row.user_id
                                    );
                                  }}
                                  style={{ fontSize: 26, marginRight: 5 }}
                                />
                              </Tooltip>
                              <Tooltip title="Petty Cash">
                                <MoneyIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    getPettyCash(row.user_id);
                                  }}
                                  aria-label="delete"
                                  style={{
                                    fontSize: 26,
                                    color: "#fff",
                                  }}
                                />
                              </Tooltip>
                            </div>
                          </div>
                          {/* Five Dots Start */}
                          <div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: 15,
                                  height: 15,
                                  background:
                                    new_attendance.length > 0
                                      ? "#2ecc71"
                                      : "#dfe6e9",
                                  borderRadius: 15 / 2,
                                  marginRight: 10,
                                }}
                              ></div>
                              <div
                                style={{
                                  width: 15,
                                  height: 15,
                                  background:
                                    assign > 0 ? "#2ecc71" : "#dfe6e9",
                                  borderRadius: 15 / 2,
                                  marginRight: 10,
                                }}
                              ></div>
                              <div
                                style={{
                                  width: 15,
                                  height: 15,
                                  background:
                                    new_attendance.length > 1
                                      ? new_attendance[1].date_added != "--:--"
                                        ? "#2ecc71"
                                        : "#dfe6e9"
                                      : "#dfe6e9",
                                  borderRadius: 15 / 2,
                                  marginRight: 10,
                                }}
                              ></div>
                              <div
                                style={{
                                  width: 15,
                                  height: 15,
                                  background:
                                    new_attendance.length > 2
                                      ? new_attendance[2].date_added != "--:--"
                                        ? "#2ecc71"
                                        : "#dfe6e9"
                                      : "#dfe6e9",
                                  borderRadius: 15 / 2,
                                  marginRight: 10,
                                }}
                              ></div>
                              <div
                                style={{
                                  width: 15,
                                  height: 15,
                                  background:
                                    new_attendance.length > 3
                                      ? new_attendance[3].date_added != "--:--"
                                        ? "#2ecc71"
                                        : "#dfe6e9"
                                      : "#dfe6e9",
                                  borderRadius: 15 / 2,
                                }}
                              ></div>
                            </div>
                          </div>
                          {/* Five Dots End */}
                        </Grid>
                      </Grid>

                      <Grid container spacing={1} style={{ marginTop: 10 }}>
                        <Grid item xs={2} md={2}></Grid>
                        <Grid item xs={6} md={6}>
                          {new_batch_count.map((batch_data) => {
                            let bar = 0;
                            let assigned = 0;

                            if (batch_data.assigned === 0) {
                              bar = 0;
                            } else {
                              bar =
                                (batch_data.accom / batch_data.assigned) * 100;
                            }
                            if (bar > 100) {
                              bar = 100;
                            }
                            return (
                              <div
                                style={{
                                  marginTop: 4,
                                }}
                              >
                                <div
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    height: 15,
                                    marginBottom: 5,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      height: 15,
                                      background: "#dfe6e9",
                                      borderRadius: 5,
                                      position: "absolute",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      width: String(bar + "%"),
                                      height: 15,
                                      background: "#3498db",
                                      borderRadius: 5,
                                      position: "absolute",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <div>
                            {new_batch_count.map((batch_data) => {
                              return (
                                <Typography>
                                  ({batch_data.accom} of {batch_data.assigned})
                                </Typography>
                              );
                            })}
                          </div>
                        </Grid>
                      </Grid>

                      {/* First Row Start */}
                      {assign > 0 ? (
                        <>
                          <Grid container spacing={1}>
                            <Grid item xs={12} md={4}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {row.attendance.length !== 0 ? (
                                  moment(row.attendance[0].date_added).format(
                                    "LT"
                                  ) >
                                  moment(
                                    "2021-01-01 " + row.day_sched.attn_in
                                  ).format("LT") ? (
                                    <CancelIcon style={{ color: "#e74c3c" }} />
                                  ) : (
                                    <CheckCircleIcon
                                      style={{ color: "#2ecc71" }}
                                    />
                                  )
                                ) : undefined}

                                <Typography style={{ fontSize: 13.5 }}>
                                  {row.attendance.length !== 0
                                    ? moment(
                                        row.attendance[0].date_added
                                      ).format("LT")
                                    : undefined}
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {row.jo_accom_list.length >= assign ? (
                                  <CheckCircleIcon
                                    style={{ color: "#2ecc71" }}
                                  />
                                ) : (
                                  <CancelIcon style={{ color: "#e74c3c" }} />
                                )}

                                <Typography style={{ fontSize: 13.5 }}>
                                  COMPLETENESS
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                  onClick={(e) => {
                                    // e.stopPropagation();
                                    // // console.log(bulk_data_new)
                                    // get_bulk(bulk_data_new)
                                    // setmapOption({ ...mapOption, lat: parseFloat(lat), lng: parseFloat(lng), zoom: 19 })
                                  }}
                                >
                                  {bulk2 > 0 ? (
                                    <CancelIcon style={{ color: "#e74c3c" }} />
                                  ) : (
                                    <CheckCircleIcon
                                      style={{ color: "#2ecc71" }}
                                    />
                                  )}

                                  <Typography style={{ fontSize: 13.5 }}>
                                    {bulk2} BULK
                                  </Typography>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                          {/* First Row End */}
                          {/* Second Row Start */}
                          <Grid container spacing={1}>
                            <Grid item xs={12} md={4}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {countInvalid > 0 ? (
                                  <CancelIcon style={{ color: "#e74c3c" }} />
                                ) : (
                                  <CheckCircleIcon
                                    style={{ color: "#2ecc71" }}
                                  />
                                )}
                                <Typography style={{ fontSize: 13.5 }}>
                                  FIELD FINDINGS
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <CheckCircleIcon style={{ color: "#2ecc71" }} />
                                <Typography style={{ fontSize: 13.5 }}>
                                  BATTERY
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {row.jo_accom_list.length === upload_count ? (
                                  <CheckCircleIcon
                                    style={{ color: "#2ecc71" }}
                                  />
                                ) : (
                                  <CancelIcon style={{ color: "#e74c3c" }} />
                                )}

                                <Typography style={{ fontSize: 13.5 }}>
                                  {upload_count} UPLOAD
                                </Typography>
                              </div>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            style={{
                              padding: 10,
                              marginTop: 10,
                            }}
                          >
                            <Card
                              variant={"outlined"}
                              className="card-meter-details"
                            >
                              <Grid item xs={12} md={12}>
                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "24%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      1st METER
                                    </Typography>
                                  </div>
                                  <div style={{ width: "5%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      :
                                    </Typography>
                                  </div>
                                  <div>
                                    <Typography
                                      style={{
                                        fontSize: 13.5,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {hours}
                                    </Typography>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "24%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      FIRST METER
                                    </Typography>
                                  </div>
                                  <div style={{ width: "5%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      :
                                    </Typography>
                                  </div>
                                  <div>
                                    <Typography
                                      style={{
                                        fontSize: 13.5,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {first_meter +
                                        " " +
                                        "(" +
                                        first_battery +
                                        "%)"}
                                    </Typography>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "24%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      LAST METER
                                    </Typography>
                                  </div>
                                  <div style={{ width: "5%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      :
                                    </Typography>
                                  </div>
                                  <div>
                                    <Typography
                                      style={{
                                        fontSize: 13.5,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {last_meter +
                                        " " +
                                        "(" +
                                        end_battery +
                                        "%)"}
                                    </Typography>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "24%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      COMMENT
                                    </Typography>
                                  </div>
                                  <div style={{ width: "5%" }}>
                                    <Typography style={{ fontSize: 13.5 }}>
                                      :
                                    </Typography>
                                  </div>
                                  <div style={{ width: "71%" }}>
                                    <Typography
                                      style={{
                                        fontSize: 13.5,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {String(comments).toLocaleUpperCase()}
                                    </Typography>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <Button
                                  type="button"
                                  variant="contained"
                                  style={{
                                    backgroundColor: "rgba(6,86,147)",
                                    color: "white",
                                    marginTop: 5,
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setState((prev) => ({
                                      ...prev,
                                      modal_comment: true,
                                      jo_assign_id: jo_id,
                                      fieldman_id: row.user_id,
                                    }));
                                  }}
                                >
                                  Add Comment
                                </Button>
                              </Grid>
                            </Card>
                            <Grid item md={12}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontWeight: "bold",
                                    color: "#f6b93b",
                                    fontSize: 13.2,
                                  }}
                                >
                                  VALIDATION :{" "}
                                  {countValidation + " of " + percent}
                                </Typography>
                              </div>
                            </Grid>
                          </Grid>
                        </>
                      ) : undefined}
                      {/* Second Row End */}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </div>
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
            company_id={Selectedcompany}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.pettyCashModel}
        onClose={() => {
          setState({ ...state, pettyCashModel: false });
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
                  pettyCashModel: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <PettyCAsh logo={logo} pettyCash={state.pettyCash} />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={state.fivedots_modal}
        onClose={() => {
          setState({ ...state, fivedots_modal: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">SUMMARY FIVE DOTS</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>
                setState({
                  ...state,
                  fivedots_modal: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <FiveDotsSummary state={state} setState={setState} />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.openFilterDots}
        onClose={() => {
          setState({ ...state, openFilterDots: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Generate Report</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton
            onClick={() => {
              setState({ ...state, openFilterDots: false });
            }}
            aria-label="delete"
          >
            <CloseIcon style={{ color: "#000" }} />
          </IconButton>
        </div>
        <form onSubmit={onFilterJODOTS}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date Start"
                    format="MM-dd-yyyy"
                    name="date_start"
                    value={state.filter_date_start}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setState({ ...state, filter_date_start: e });
                    }}
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
                    onChange={(e) => {
                      setState({ ...state, filter_date_end: e });
                    }}
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
        maxWidth="xs"
        open={state.modal_comment}
        onClose={() => {
          setState({ ...state, modal_comment: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">ADD COMMENT</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton
            onClick={() => {
              setState({ ...state, modal_comment: false });
            }}
            aria-label="delete"
          >
            <CloseIcon style={{ color: "#000" }} />
          </IconButton>
        </div>
        <form onSubmit={insertComment}>
          <DialogContent>
            <Grid container spacing={2}>
              <TextareaAutosize
                ref={comment_ref}
                aria-label="minimum height"
                minRows={10}
                placeholder="Enter your comment"
                style={{ width: "100%", marginTop: 10, height: 40 }}
              />
            </Grid>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "rgba(6,86,147)",
                  color: "white",
                  marginTop: 15,
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
        open={state.modal_assigning}
        onClose={() => {
          setState({ ...state, modal_assigning: false, batchButton: [] });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">MANUAL ASSIGNING</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton
            onClick={() => {
              setState({ ...state, modal_assigning: false, batchButton: [] });
            }}
            aria-label="delete"
          >
            <CloseIcon style={{ color: "#000" }} />
          </IconButton>
        </div>
        <form>
          <DialogContent>
            <Grid container spacing={1} style={{ marginBottom: 6 }}>
              <Grid item xs={12} md={6}>
                {state.batchButton.map((val, index) => {
                  return (
                    <Button
                      size="small"
                      style={{
                        backgroundColor:
                          state.activeBatchButton === index
                            ? "#2a5793"
                            : "#ecf0f1",
                        color:
                          state.activeBatchButton === index
                            ? "#fff"
                            : "#2a5793",
                        marginRight: 5,
                        borderRadius: 15,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                      onClick={() => {
                        onSelectFieldmanAssign(
                          index,
                          state.selected_batch,
                          state.selected_user_id
                        );
                      }}
                    >
                      Batch {index + 1}
                    </Button>
                  );
                })}
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#2a5793",
                    color: "#fff",
                    marginRight: 5,
                    borderRadius: 15,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                  onClick={() => {
                    state.batchButton.push(state.batchButton.length);
                    setState((prev) => ({
                      ...prev,
                    }));
                  }}
                >
                  Add Batch
                </Button>
                {/* <TextField variant="outlined" size="small" label="Rover ID" /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "#2a5793",
                      color: "#fff",
                      marginRight: 5,
                    }}
                    onClick={() => {
                      onAddAssigning();
                    }}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    size="small"
                    style={{ backgroundColor: "#2a5793", color: "#fff" }}
                    onClick={() => {
                      onRemoveAssigning();
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl
                  size="small"
                  variant="outlined"
                  style={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Rover ID
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeValue}
                    label="Rover ID"
                    name="selected_rover"
                    value={state.selected_rover}
                  >
                    {state.rover_details.map((val) => {
                      return (
                        <MenuItem value={val.rover_id}>
                          {val.rover_device_number}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    let amount = e.target.value;
                    setState((prev) => ({
                      ...prev,
                      selected_allowance: amount,
                    }));
                  }}
                  value={state.selected_allowance}
                  label="Allowance"
                  name="selected_allowance"
                />
              </Grid>
            </Grid>
            {state.jo_type_assign.map((val, index) => {
              return (
                <AssigningField
                  val={val}
                  index={index}
                  region={region}
                  state={state}
                  setState={setState}
                />
              );
            })}
            <DialogActions>
              <Button
                onClick={() => {
                  onSubmitAssign();
                }}
                style={{ backgroundColor: "#2a5793", color: "#fff" }}
              >
                Assign
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={state.map_selected_fieldman}
        onClose={() => {
          setState({ ...state, map_selected_fieldman: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Details</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) =>
                setState({
                  ...state,
                  map_selected_fieldman: false,
                })
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          {fieldman_map.map((row, index) => {
            let timeout = "";
            let hours = 0;
            let first_meter = "-- : -- --";
            let last_meter = "-- : -- --";
            let first_battery = 0;
            let end_battery = 0;
            let countValidation = 0;
            let percent = 0;
            let countInvalid = 0;
            let jo_id = "";
            let comments = "";
            if (row.jo_accom_list.length !== 0) {
              let trackAccom2 = row.jo_accom_list;
              countValidation = trackAccom2.reduce((count, val) => {
                if (
                  val.validator_remarks === "INVALID" ||
                  val.validator_remarks === "VALID"
                ) {
                  count++;
                }
                if (val.validator_remarks === "INVALID") {
                  countInvalid++;
                }
                return count;
              }, 0);
              percent = parseInt(
                trackAccom2.length * (map_reducer.count_validation_logs / 100)
              );
              if (trackAccom2.length <= 50) {
                percent = trackAccom2.length;
              }
              if (percent < 50) {
                if (trackAccom2.length > 50) {
                  percent = 50;
                }
              }
              let timeout = row.jo_accom_list[0];
              first_meter = moment(trackAccom2[0].date_accom).format("hh:mm A");
              last_meter = moment(
                trackAccom2[trackAccom2.length - 1].date_accom
              ).format("hh:mm A");
              let new_battery_end = trackAccom2[trackAccom2.length - 1].battery;
              end_battery = String(new_battery_end).replace("%", "");
              let new_battery_first = trackAccom2[0].battery;
              first_battery = String(new_battery_first).replace("%", "");
              row.attendance.map((val, index) => {
                if (
                  val.att_type === "Time-out" &&
                  index > 0 &&
                  index < 3 &&
                  trackAccom2.length > 0
                ) {
                  var oneDay = 24 * 60 * 60 * 1000;

                  var date1 = new Date(trackAccom2[0].date_accom);
                  var date2 = new Date(val.date_added);
                  var diffDays = Math.abs(
                    ((date1.getTime() - date2.getTime()) / oneDay) * 24
                  );
                  hours = parseFloat(diffDays).toFixed(2) + " " + "hr.";
                  if (diffDays < 1) {
                    hours = parseInt(diffDays * 60) + " " + "min.";
                  }
                }
              });
            }
            let assign = 0;
            let bulk = 0;
            let bulk2 = -10;
            let prev_coordinates = "";
            let bulk_val = false;
            let bulk_data = [];
            let bulk_data_new = [];
            let jo_rescue = [];
            let new_batch_count = [];
            let jo_accom_list_count = row.jo_accom_list.length;
            let rover_number = "";
            let rover_data = [];

            row.batch.forEach((val, index_batch) => {
              if (jo_id === "") {
                jo_id = val.jo_assign_id;
                comments = val.jo_comment;
              }
              if (val.jo_rescue !== "") {
                jo_rescue = JSON.parse(val.jo_rescue);
              }
              assign += parseInt(val.jo_count);
              let assign_jo_count = parseInt(val.jo_count);
              if (jo_accom_list_count < 0) {
                jo_accom_list_count = 0;
              }
              let new_jo_accom_list_count = jo_accom_list_count;
              if (
                jo_accom_list_count > assign_jo_count &&
                index_batch < row.batch.length - 1
              ) {
                new_jo_accom_list_count = assign_jo_count;
              }
              if (
                val.rover_assigned !== null &&
                typeof val.rover_assigned !== "undefined"
              ) {
                let rover_details = JSON.parse(val.rover_assigned);
                rover_data = rover_details;
              }
              new_batch_count.push({
                assigned: assign_jo_count,
                accom: new_jo_accom_list_count,
              });
              jo_accom_list_count -= assign_jo_count;

              // if (index_batch + 1 === row.batch.length) {
              //   jo_per_batch = jo_accom_list_count;
              //   new_batch_count.push({
              //     assigned: assign_jo_count,
              //     accom: jo_per_batch,
              //   });
              // } else {
              //   if (jo_accom_list_count >= assign_jo_count) {
              //     jo_accom_list_count -= assign_jo_count;
              //     new_batch_count.push({
              //       assigned: assign_jo_count,
              //       accom: assign_jo_count,
              //     });
              //   } else {
              //     new_batch_count.push({
              //       assigned: assign_jo_count,
              //       accom: jo_accom_list_count,
              //     });
              //   }
              // }
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
            let late_val = false;
            if (row.attendance.length !== 0) {
              if (
                moment(row.attendance[0].date_added).format("LT") >
                moment("2021-01-01 " + row.day_sched.attn_in).format("LT")
              ) {
                late_val = true;
              }
            }
            let textColor = "#fff";
            let statusUser = "";
            if (parseInt(row.user_delete_id) === 1) {
              textColor = "#e74c3c";
              statusUser = " - Inactive";
            }

            let new_attendance = [];
            for (let index = 0; index < row.attendance.length; index++) {
              if (new_attendance.length == 0) {
                if (row.attendance[index].att_type === "Time-in") {
                  new_attendance.push(row.attendance[index]);
                }
              } else {
                if (
                  new_attendance[new_attendance.length - 1].att_type ===
                  row.attendance[index].att_type
                ) {
                  let type = "Time-in";
                  if (row.attendance[index].att_type === "Time-in") {
                    type = "Time-out";
                  }
                  new_attendance.push({
                    att_class: "Office",
                    att_type: type,
                    date_added: "--:--",
                    user_id: row.attendance[index].user_id,
                  });
                  new_attendance.push(row.attendance[index]);
                } else {
                  new_attendance.push(row.attendance[index]);
                }
              }
            }
            if (state.map_selected_fieldman_id === row.user_id)
              return (
                <Card
                  variant="outlined"
                  key={index}
                  elevation={4}
                  style={{ background: "#bdc3c7" }}
                  // className='card-fieldman'
                >
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4}>
                        <div
                          style={{
                            background: "#fff",
                            width: "100%",
                            height: 150,
                            paddingBottom: 10,
                          }}
                        >
                          <img
                            alt="picture"
                            onError={(e) => {
                              e.target.src = UserImage;
                            }}
                            src={
                              row.user_pic === ""
                                ? UserImage
                                : serverProfile + row.user_pic
                            }
                            style={{
                              width: "90%",
                              height: 150,
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "#fff",
                          }}
                        >
                          <div style={{ padding: 15 }}>
                            <Typography
                              style={{ fontSize: 20, fontWeight: "bold" }}
                            >
                              {String(row.completename).toUpperCase()}
                            </Typography>
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={7}>
                                <Typography style={{ fontSize: 15 }}>
                                  {(row.user_jobposition !== ""
                                    ? String(row.user_jobposition).toUpperCase()
                                    : undefined) +
                                    " - " +
                                    row.employee_status}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={5}>
                                {/* Five Dots Start */}
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "row",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: 15,
                                        height: 15,
                                        background:
                                          new_attendance.length > 0
                                            ? "#2ecc71"
                                            : "#dfe6e9",
                                        borderRadius: 15 / 2,
                                        marginRight: 10,
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: 15,
                                        height: 15,
                                        background:
                                          assign > 0 ? "#2ecc71" : "#dfe6e9",
                                        borderRadius: 15 / 2,
                                        marginRight: 10,
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: 15,
                                        height: 15,
                                        background:
                                          new_attendance.length > 1
                                            ? new_attendance[1].date_added !=
                                              "--:--"
                                              ? "#2ecc71"
                                              : "#dfe6e9"
                                            : "#dfe6e9",
                                        borderRadius: 15 / 2,
                                        marginRight: 10,
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: 15,
                                        height: 15,
                                        background:
                                          new_attendance.length > 2
                                            ? new_attendance[2].date_added !=
                                              "--:--"
                                              ? "#2ecc71"
                                              : "#dfe6e9"
                                            : "#dfe6e9",
                                        borderRadius: 15 / 2,
                                        marginRight: 10,
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: 15,
                                        height: 15,
                                        background:
                                          new_attendance.length > 3
                                            ? new_attendance[3].date_added !=
                                              "--:--"
                                              ? "#2ecc71"
                                              : "#dfe6e9"
                                            : "#dfe6e9",
                                        borderRadius: 15 / 2,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                {/* Five Dots End */}
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              spacing={1}
                              style={{ marginTop: 10 }}
                            >
                              <Grid item xs={9} md={9}>
                                {new_batch_count.map((batch_data) => {
                                  let bar = 0;
                                  let assigned = 0;

                                  if (batch_data.assigned === 0) {
                                    bar = 0;
                                  } else {
                                    bar =
                                      (batch_data.accom / batch_data.assigned) *
                                      100;
                                  }
                                  if (bar > 100) {
                                    bar = 100;
                                  }
                                  return (
                                    <div
                                      style={{
                                        marginTop: 4,
                                      }}
                                    >
                                      <div
                                        style={{
                                          position: "relative",
                                          width: "100%",
                                          height: 15,
                                          marginBottom: 5,
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "100%",
                                            height: 15,
                                            background: "#dfe6e9",
                                            borderRadius: 5,
                                            position: "absolute",
                                          }}
                                        ></div>
                                        <div
                                          style={{
                                            width: String(bar + "%"),
                                            height: 15,
                                            background: "#3498db",
                                            borderRadius: 5,
                                            position: "absolute",
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </Grid>
                              <Grid item xs={3} md={3}>
                                <div>
                                  {new_batch_count.map((batch_data) => {
                                    return (
                                      <Typography
                                        style={{
                                          fontSize: 12.5,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        ({batch_data.accom} /{" "}
                                        {batch_data.assigned})
                                      </Typography>
                                    );
                                  })}
                                </div>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Typography style={{ fontSize: 13 }}>
                                First Meter : {first_meter}
                              </Typography>
                              <Typography style={{ fontSize: 13 }}>
                                Last Meter : {last_meter}
                              </Typography>
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
});
export default React.memo(FieldmanList);
