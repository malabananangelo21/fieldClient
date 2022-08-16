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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars"
import ListAltIcon from "@material-ui/icons/ListAlt";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import moment from "moment";
import Map from "./monitoringMap";
import "./css/home.css";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Dashbboard from "./initial/dashboard";
import FieldmanList from "./initial/fieldman_list";
import { getData } from "../../api/api";
import Line from "./initial/charts/line";
import Bar from "./initial/charts/bar";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import TopNavigation from "./top_navigation";
import UserImage from "../../../assets/map image/user_image.png";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ValidationValidator from './validation/validation_validator'
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

function renderPropsAreEqual(prevProps, nextProps) {
  if (prevProps.refreshMap === nextProps.refreshMap) {
    return true;
  } else {
    return false;
  }
}
const FieldmanDetails = forwardRef((props, ref) => {
  const map_reducer = useSelector((state) => state.map_reducer);
  const { fieldman_details, trackAccom, playButton, onNext, refreshOnClickFieldman, state, onclickValidation, setState, getDurationInterval, onrefreshMapFDetails, onClick_list_Duration, resetTrackSpan, resetSelected } = props
  const [displayArray, setDisplayArray] = React.useState([]);
  const [displayEl, setDisplayEl] = React.useState();
  const [validation_type, setValidation_type] = React.useState('');
  const [validation_index, setValidation_index] = React.useState('');
  const [validationState, setValidationState] = React.useState({
    openValidation: false,
    joToValidate: [],
    leftPageSelect: false,
    validateValidator: []
  });


  React.useEffect(() => {
    setValidation_type("")
    // getfield_findings()
  }, [refreshOnClickFieldman]);
  const validatorValidation = () => {
    let total_validation = state.trackAccomMasterList.filter((val) => (val.validator_remarks === "Invalid" ||
      val.validator_remarks === "INVALID" ||
      val.validator_remarks === "Valid" ||
      val.validator_remarks === "VALID"))
    let percent = parseInt(total_validation.length * (10 / 100));
    let interval = parseInt(total_validation.length / percent);
    let interval_array = [];

    for (let index = 0; index < percent; index++) {
      const index_val = interval * index;
      interval_array.push(index_val);
    }
    let val_index = []
    let data = state.trackAccomMasterList.filter((val, index) => {
      let match_random = interval_array.filter(
        (val) => val == index
      );
      let match_val = false;
      if (match_random.length > 0) {
        match_val = true;
      }
      if (
        (val.validator_remarks === "Invalid" ||
          val.validator_remarks === "INVALID" ||
          val.validator_remarks === "Valid" ||
          val.validator_remarks === "VALID") &&
        match_val
      ) {
        val_index.push(index)
        return val
      }
    })

    setValidation_type('Validator Validation')
    setValidationState(prev => ({ ...prev, validateValidator: val_index }))

  }
  // React.useEffect(() => {
  //   displayEl && setDisplayArray((prev) => [...prev, displayEl]);
  // }, [displayEl]);
  const countValidationPercentage = () => {
    let percent = parseInt(state.trackAccomMasterList.length * (map_reducer.count_validation_logs / 100));
    if (state.trackAccomMasterList.length <= 50) {
      percent = state.trackAccomMasterList.length;
    }
    if (percent < 50) {
      if (state.trackAccomMasterList.length > 50) {
        percent = 50;
      }
    }
    let interval = parseInt(state.trackAccomMasterList.length / percent);
    let interval_array = [];

    for (let index = 0; index < percent; index++) {
      const index_val = interval * index;
      interval_array.push(index_val);
    }

    let total = trackAccom.reduce((count, val, index) => {
      let match_random = interval_array.filter(
        (val) => val == index
      );
      let match_val = false;
      if (match_random.length > 0) {
        match_val = true;
      }
      if (
        (val.validator_remarks === "Invalid" ||
          val.validator_remarks === "INVALID" ||
          val.validator_remarks === "Valid" ||
          val.validator_remarks === "VALID") &&
        match_val
      ) {
        count++;
      }
      return count;
    }, 0);

    let countVal = trackAccom.length * 0.2;
    if (trackAccom.length <= 50) {
      countVal = trackAccom.length;
    }
    if (countVal < 50) {
      if (trackAccom.length > 50) {
        countVal = 50;
      }
    }
    let remaining = parseInt(countVal) - total;
    if (remaining < 0) {
      remaining = 0;
    }
    return remaining;
  };
  const invalid = (data) => {
    setValidation_type(data)
    setValidation_index('')
  }
  useImperativeHandle(ref, () => ({
    closeCountValidatioList() {
      setValidation_type('')
      setValidation_index('')
    }
  }));
  const onChangeDuration = (e) => {
    // setState(prev => ({ ...prev, duration: e.target.value }));
    getDurationInterval(
      state.new_trackAccom,
      state.field_findings,
      e.target.value,
      trackAccom
    );
  };
  const onClickMatch = () => {
    let match_data = [];
    state.new_trackAccom.forEach((row, index) => {
      if (row.bg_color == "#e74c3c") {
        match_data.push(row);
      }
    });
    onrefreshMapFDetails(match_data)
  };
  return (
    <div>

      {fieldman_details.map((val, index) => {

        let width_percentage = (trackAccom.length / val.assign2) * 100
        if (width_percentage > 100) {
          width_percentage = 100
        }
        let date_accom
        if (trackAccom.length > 0) {
          date_accom = moment(trackAccom[trackAccom.length - 1].date_accom).format('HH:mm A')
        }
        console.log(state.attendance)
        return (
          <div key={index}>
            {" "}
            <div

              className="card-color-no-h font-size-fieldman"
              style={{ position: "absolute", right: 10, top: 70, width: 250 }}
            >

              <Grid container spacing={1}>
                <Grid item xs={3} md={3}>
                  <img
                    alt="picture"
                    onError={(e) => {
                      e.target.src = UserImage;
                    }}
                    src={UserImage}
                    style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                  />
                </Grid>
                <Grid item xs={9} md={9}>
                  <Typography style={{ fontSize: 14 }}>
                    {val.completeName}
                  </Typography>
                  <Typography style={{ fontSize: 14 }}>
                    {val.trackAccom.length != 0
                      ? moment(val.trackAccom[0].date_accom).format("LT") +
                      " - " +
                      moment(
                        val.trackAccom[val.trackAccom.length - 1].date_accom
                      ).format("LT")
                      : undefined}
                  </Typography>
                  <Typography style={{ fontSize: 15 }}>
                    {val.accom_diff}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        background: state.attendance.length> 0 ? "#2ecc71" : "#fff",
                        borderRadius: 12 / 2,
                        marginRight: 10,
                      }}
                    ></div>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        background: val.assign2 > 0 ? "#2ecc71" : "#fff",
                        borderRadius: 12 / 2,
                        marginRight: 10,
                      }}
                    ></div>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        background: state.attendance.length > 1 ? state.attendance[1].date_added !="--:--"? "#2ecc71" :"#fff": "#fff",
                        borderRadius: 12 / 2,
                        marginRight: 10,
                      }}
                    ></div>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        background: state.attendance.length > 2 ?state.attendance[2].date_added !="--:--"? "#2ecc71" :"#fff" : "#fff",
                        borderRadius: 12 / 2,
                        marginRight: 10,
                      }}
                    ></div>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        background: state.attendance.length > 3 ?state.attendance[3].date_added !="--:--"? "#2ecc71" :"#fff" : "#fff",
                        borderRadius: 12 / 2,
                      }}
                    ></div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div style={{ cursor: 'pointer' }} onClick={() => {
                    resetTrackSpan();
                    setTimeout(() => {
                      resetSelected()
                      onNext(0)
                    }, 10)
                  }}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: 10,
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: 10,
                          background: "#fff",
                          borderRadius: 5,
                          position: "absolute",
                        }}
                      ></div>
                      <div
                        style={{
                          width: String(width_percentage + "%"),
                          height: 10,
                          background: "#3498db",
                          borderRadius: 5,
                          position: "absolute",
                        }}
                      ></div>
                    </div>
                    <div>
                      <Typography style={{ textAlign: "center", fontSize: 14 }}>
                        {trackAccom.length !== 0
                          ? trackAccom.length
                          : 0}
                        /{val.assign2}
                      </Typography>
                    </div>
                  </div>


                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div>
                      <Typography style={{ fontSize: 22 }}>{playButton ? date_accom : "--:--"}</Typography>

                    </div>
                    <div style={{ display: 'flex' }}>
                      {state.validation_priviledge != null &&
                        state.validation_priviledge != "" ? <div style={{ cursor: 'pointer' }} onClick={() => { validatorValidation() }}>
                        <PlaylistAddCheckIcon />
                      </div> : undefined
                      }
                      <div
                        onClick={() => {
                          setValidationState(prev => ({ ...prev, leftPageSelect: true }))
                          const scrollPosition =
                            sessionStorage.getItem("scrollPosition");
                          // accomlistdurationpermeter();
                          setTimeout(() => {
                            var elmnt = document.getElementById("tableScroll");
                            elmnt.scrollTop = scrollPosition;
                          }, 100);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <ListAltIcon />
                      </div>
                      <div onClick={() => {

                        onNext(trackAccom.length - 1)
                      }}>
                        <PersonPinCircleIcon style={{ color: "#2980b9", fontSize: 27, cursor: 'pointer' }} />
                      </div>
                    </div>

                  </div>

                </Grid>
              </Grid>
            </div>
            <div
              className="card-color-no-h font-size-fieldman"
              style={{ position: "absolute", right: 10, top: 300, width: 250 }}
            >
              <Typography
                style={{ fontSize: 14, color: "#F79F1F", fontWeight: "bold" }}
              >
                DURATION FROM 1st METER
              </Typography>
              {val.attendance.map((val_attn, index_attn) => {
                let hours = 0;
                if (
                  val_attn.att_type === "Time-out" &&
                  index_attn > 0 &&
                  index_attn < 3 &&
                  val.trackAccom.length > 0
                ) {
                  var oneDay = 24 * 60 * 60 * 1000;
                  var date1 = new Date(val.trackAccom[0].date_accom);
                  var date2 = new Date(val_attn.date_added);
                  var diffDays = Math.abs(
                    ((date1.getTime() - date2.getTime()) / oneDay) * 24
                  );
                  hours = parseInt(diffDays).toFixed(2) + " " + "hr.";
                  if (diffDays < 1) {
                    hours = parseInt(diffDays * 60) + " " + "min.";
                  }
                }
                if (
                  val_attn.att_type === "Time-out" &&
                  index_attn > 0 &&
                  index_attn < 3
                )
                  return (
                    <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                      {hours}
                    </Typography>
                  );
              })}
            </div>
            <div
              className="card-color-no-h font-size-fieldman"
              style={{ position: "absolute", right: 10, top: 370, width: 180 }}>
              <div
                style={{
                  paddingRight: 15,
                  paddingLeft: 15,
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  onClick={() => { resetTrackSpan(); invalid("Valid") }}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: 13,
                      color: "#2ecc71",
                      position: "absolute",
                      top: -14,
                      left: 4,
                      fontWeight: "bold",
                    }}
                  >
                    Valid
                  </Typography>
                  <div>
                    <Typography
                      style={{
                        fontSize: 18,
                        color: "#2ecc71",
                        fontWeight: "bold",
                      }}
                    >
                      {trackAccom.reduce((count, val) => {
                        if (
                          val.validator_remarks === "Valid" ||
                          val.validator_remarks === "VALID"
                        ) {
                          count++;
                        }
                        return count;
                      }, 0)}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography
                    style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}
                  >
                    |
                  </Typography>
                </div>
                <div
                  onClick={() => { resetTrackSpan(); invalid("Invalid") }}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: 13,
                      color: "#e74c3c",
                      position: "absolute",
                      top: -14,
                      left: 4,
                      fontWeight: "bold",
                    }}
                  >
                    Invalid
                  </Typography>
                  <div>
                    <Typography
                      style={{
                        fontSize: 18,
                        color: "#e74c3c",
                        fontWeight: "bold",
                      }}
                    >
                      {trackAccom.reduce((count, val) => {
                        if (
                          val.validator_remarks === "Invalid" ||
                          val.validator_remarks === "INVALID"
                        ) {
                          count++;
                        }
                        return count;
                      }, 0)}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
       
            <div
              className="card-color-no-h font-size-fieldman"
              onClick={() => { resetTrackSpan(); invalid('Random JO') }}
              style={{
                cursor: "pointer",
                width: 43,
                right: 217,
                top: 370,
                position: "absolute",
                height: 37,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                { }
                <Typography
                  style={{
                    fontSize: 23,
                    color: "#e67e22",
                    fontWeight: "bold",
                  }}
                >
                  {countValidationPercentage()}
                </Typography>
                {/* <PowerSettingsNewIcon style={{color:'#e67e22',display:state.randomJOToValidate.length>0?'none':undefined}} onClick={()=>{
                  onClickPercentage()
                }}/> */}
              </div>
            </div>
            {validation_type == "Valid" || validation_type == "Invalid" ? <div
              className="card-color-no-h font-size-fieldman"
              style={{ position: "absolute", right: 10, top: 435, width: 250 }}>
              <Scrollbars style={{ height: 200 }}>
                {trackAccom.map((val, index) => {
                  let bg_color = undefined
                  let color = '#fff'
                  if (index === validation_index) {
                    bg_color = '#fff'
                    color = '#000'
                  }
                  if (
                    val.validator_remarks === validation_type ||
                    val.validator_remarks ===
                    String(validation_type).toUpperCase()
                  )
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          var latlong = "";
                          var splitlatlng = "";
                          var lat = "";
                          var lng = "";
                          var complete_name = "";
                          splitlatlng = val.fetched_coordinates.split(",");
                          lat = splitlatlng[0];
                          lng = splitlatlng[1];

                          setValidation_index(index)
                          resetSelected()
                          onNext(index)

                          // setmapOption({
                          //   ...mapOption,
                          //   lat: parseFloat(lat),
                          //   lng: parseFloat(lng),
                          //   zoom: 20,
                          // });
                          // onClickMarker2(
                          //   val,
                          //   index,
                          //   lat,
                          //   lng,
                          //   val.fetched_coordinates,
                          //   "single"
                          // );
                          // onToggleOpen(index);
                        }}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          backgroundColor: bg_color,
                          padding: 10,
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              state.validation_priviledge != null &&
                              state.validation_priviledge != ""
                            ) {
                              setValidationState(prev => ({ ...prev, openValidation: true, joToValidate: val }))

                            }
                          }}
                          style={{
                            display: "flex",
                            width: 13.5,
                            height: 13.5,
                            borderRadius: 13.5 / 2,
                            backgroundColor:
                              validation_type === "Invalid"
                                ? val.validation_validator_status === "Valid"
                                  ? "#e74c3c"
                                  : "#e74c3c"
                                : val.validation_validator_status === "Invalid"
                                  ? "#27ae60"
                                  : "#27ae60",
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            padding: 5,
                          }}
                        >
                          {val.validation_validator_status === "Valid" ? (
                            <CheckIcon style={{ fontSize: 20 }} />
                          ) : val.validation_validator_status === "Invalid" ? (
                            <ClearIcon style={{ fontSize: 20 }} />
                          ) : undefined}
                        </div>
                        <Typography style={{ color: color, fontSize: 14 }}>
                          {val.meter_number} | {val.accom_findings}
                        </Typography>
                      </div>
                    );
                })}
              </Scrollbars>
            </div>
              : undefined
            }
            {validation_type == "Random JO" ? <div
              className="card-color-no-h font-size-fieldman"
              style={{ position: "absolute", right: 10, top: 435, width: 250 }}>
              <Scrollbars style={{ height: 200 }}>
                {trackAccom.map((val, index) => {
                  let bg_color = undefined
                  let color = '#fff'
                  if (index === validation_index) {
                    bg_color = '#fff'
                    color = '#000'
                  }
                  let match_random = state.index_randomJOToValidate.filter(
                    (val) => val == index
                  );

                  let match = false;
                  if (match_random.length > 0) {
                    if (
                      val.validator_remarks !== "VALID" &&
                      val.validator_remarks !== "INVALID"
                    ) {
                      match = true;
                    }
                  }
                  if (match)
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          var latlong = "";
                          var splitlatlng = "";
                          var lat = "";
                          var lng = "";
                          var complete_name = "";
                          splitlatlng = val.fetched_coordinates.split(",");
                          lat = splitlatlng[0];
                          lng = splitlatlng[1];
                          setValidation_index(index)
                          onNext(index)
                          // setmapOption({
                          //   ...mapOption,
                          //   lat: parseFloat(lat),
                          //   lng: parseFloat(lng),
                          //   zoom: 20,
                          // });
                          // onClickMarker2(
                          //   val,
                          //   index,
                          //   lat,
                          //   lng,
                          //   val.fetched_coordinates,
                          //   "single"
                          // );
                          // onToggleOpen(index);
                        }}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          backgroundColor: bg_color,
                          padding: 10,
                        }}
                      >
                        <div

                          style={{
                            display: "flex",
                            width: 13.5,
                            height: 13.5,
                            borderRadius: 13.5 / 2,
                            backgroundColor: "#e67e22",
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            padding: 5,
                            cursor: 'pointer'
                          }}
                        >
                          {val.validation_validator_status === "Valid" ? (
                            <CheckIcon style={{ fontSize: 20 }} />
                          ) : val.validation_validator_status === "Invalid" ? (
                            <ClearIcon style={{ fontSize: 20 }} />
                          ) : undefined}
                        </div>
                        <Typography style={{ color: color, fontSize: 14 }}>
                          {val.meter_number} | {val.accom_findings}
                        </Typography>
                      </div>
                    );
                })}
              </Scrollbars>
            </div>
              : undefined
            }
            {validation_type == "Validator Validation" ? <div
              className="card-color-no-h font-size-fieldman"
              style={{ position: "absolute", right: 10, top: 435, width: 250 }}>
              <Scrollbars style={{ height: 200 }}>
                {trackAccom.map((val, index) => {
                  let bg_color = undefined
                  let color = '#fff'
                  if (index === validation_index) {
                    bg_color = '#fff'
                    color = '#000'
                  }
                  let match_random = validationState.validateValidator.filter(
                    (val) => val == index
                  );

                  let match = false;
                  if (match_random.length > 0) {
                    match = true;
                  }
                  if (match)
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          var latlong = "";
                          var splitlatlng = "";
                          var lat = "";
                          var lng = "";
                          var complete_name = "";
                          splitlatlng = val.fetched_coordinates.split(",");
                          lat = splitlatlng[0];
                          lng = splitlatlng[1];
                          setValidation_index(index)
                          onNext(index)
                          // setmapOption({
                          //   ...mapOption,
                          //   lat: parseFloat(lat),
                          //   lng: parseFloat(lng),
                          //   zoom: 20,
                          // });
                          // onClickMarker2(
                          //   val,
                          //   index,
                          //   lat,
                          //   lng,
                          //   val.fetched_coordinates,
                          //   "single"
                          // );
                          // onToggleOpen(index);
                        }}
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          backgroundColor: bg_color,
                          padding: 10,
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              state.validation_priviledge != null &&
                              state.validation_priviledge != ""
                            ) {
                              setValidationState(prev => ({ ...prev, openValidation: true, joToValidate: val }))
                            }
                          }}
                          style={{
                            display: "flex",
                            width: 13.5,
                            height: 13.5,
                            borderRadius: 13.5 / 2,
                            backgroundColor: "#e67e22",
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            padding: 5,
                            cursor: 'pointer'
                          }}
                        >
                          {val.validation_validator_status === "Valid" ? (
                            <CheckIcon style={{ fontSize: 20 }} />
                          ) : val.validation_validator_status === "Invalid" ? (
                            <ClearIcon style={{ fontSize: 20 }} />
                          ) : undefined}
                        </div>
                        <Typography style={{ color: color, fontSize: 14 }}>
                          {val.meter_number} | {val.accom_findings}
                        </Typography>
                      </div>
                    );
                })}
              </Scrollbars>
            </div>
              : undefined
            }

          </div>
        );
      })}
      <Dialog
        fullWidth
        maxWidth="xs"
        open={validationState.openValidation}
        onClose={() => {
          setValidationState(prev => ({ ...prev, openValidation: false }))
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Validation</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={() =>
                setValidationState(prev => ({ ...prev, openValidation: false }))
              }
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <ValidationValidator

            jo={validationState.joToValidate}
            close={(jo) => {
              setValidationState(prev => ({ ...prev, openValidation: false }))
              trackAccom.forEach((val) => {
                if (jo.accom_id === val.accom_id) {
                  val.validation_validator = jo.validation_validator;
                  val.validation_validator_status =
                    jo.validation_validator_status;
                  val.validation_validator_date = jo.validation_validator_date;
                }
              });
            }} />
          {/* <ValidationValidator
            jo={state.jo_to_validate}
            close={(jo) => {
              setOpenValidation(false)

              trackAccom2.forEach((val) => {
                if (jo.accom_id === val.accom_id) {
                  val.validation_validator = jo.validation_validator;
                  val.validation_validator_status =
                    jo.validation_validator_status;
                  val.validation_validator_date = jo.validation_validator_date;
                }
              });
            }}
          /> */}
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={validationState.leftPageSelect}
        onClose={() => {
          setValidationState(prev => ({ ...prev, leftPageSelect: false }));
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Accomplishments</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={() => setValidationState(prev => ({ ...prev, leftPageSelect: false }))}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* <div style={{display:'flex',alignItems:'center',borderWidth:1,borderColor:'#95a5a6',borderStyle:'solid',width:'40%',borderRadius:5,padding:5}}>
          <input style={{border:'none',outline:'none',width:'100%'}} placeholder='Search'/>
          <SearchIcon/>

          </div > */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#95a5a6",
                borderStyle: "solid",
                width: "30%",
                borderRadius: 5,
                padding: 8,
              }}
            >
              <select
                style={{ border: "none", outline: "none", width: "100%" }}
                value={state.duration}
                onChange={onChangeDuration}
              >
                <option value={5}>5 Minutes and Above</option>
                <option value={10}>10 Minutes and Above</option>
                <option value={15}>15 Minutes and Above</option>
                <option value={30}>30 Minutes and Above</option>
                <option value={45}>45 Minutes and Above</option>
                <option value={60}>1 Hour and Above</option>
                <option value={120}>2 Hours and Above</option>
              </select>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                endIcon={<RotateLeftIcon />}
                style={{ marginRight: 5, backgroundColor: "rgb(6, 86, 147)" }}
                onClick={() => {
                  getDurationInterval(
                    state.new_trackAccom,
                    state.field_findings,
                    state.duration,
                    trackAccom
                  );
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "rgb(6, 86, 147)" }}
                onClick={() => {
                  onClickMatch();
                }}
              >
                Match :{" "}
                {state.new_trackAccom.reduce((count, row, index) => {
                  if (row.bg_color == "#e74c3c") {
                    count++;
                  }
                  return count;
                }, 0)}
              </Button>
            </div>
          </div>
          <TableContainer
            onScroll={() => {
              var elmnt = document.getElementById("tableScroll");
              sessionStorage.setItem("scrollPosition", elmnt.scrollTop);
            }}
            id={"tableScroll"}
            component={Paper}
            style={{ height: 400, marginTop: 15 }}
          >
            <Table
              stickyHeader
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  ></TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Reference
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Field Findings
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Battery
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Time from Previous
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                  >
                    Distance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.match_new_trackAccom.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      style={{
                        cursor: "pointer",
                        backgroundColor: row.bg_color,
                      }}
                      onClick={() => {
                        if (row.current_previous_data.length > 0) {
                          setValidationState(prev => ({ ...prev, leftPageSelect: false }))
                          onClick_list_Duration(
                            row.current_previous_data,
                            row.pathCoordinates,
                            row.midPoint
                          );

                        } else {
                          resetTrackSpan()
                          // onClickListDetails(row,state.new_trackAccom.length - (index+1))
                          setTimeout(() => {
                            setValidationState(prev => ({ ...prev, leftPageSelect: false }))
                            onNext(
                              state.match_new_trackAccom.length - (index + 1)
                            );
                          }, 100)

                        }
                      }}
                    >
                      <TableCell style={{ color: row.color }}>
                        {state.match_new_trackAccom.length - index}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {row.meter_number}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {row.accom_findings}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {moment(row.date_accom).format("hh:mm A")}
                      </TableCell>
                      <TableCell style={{ color: row.color }}>
                        {row.accom_battery_life}
                      </TableCell>
                      <TableCell
                        style={{ color: row.color, fontWeight: "bold" }}
                      >
                        {parseInt(row.duration_from_previous)} min/s
                      </TableCell>
                      <TableCell
                        style={{ color: row.color, fontWeight: "bold" }}
                      >
                        {parseFloat(row.distance).toFixed(2)} meters
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
})
export default React.memo(FieldmanDetails, renderPropsAreEqual);
