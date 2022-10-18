import React, { useEffect, useRef, useCallback } from "react";
import "../../../App";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
/*import { getUsers, getJD } from '../Functions/home_func'*/
import useStyles from "../../../css/css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { NotificationContainer } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  HashRouter as Router,
  Route,
  Redirect,
  useHistory,
  Link as NewLink,
} from "react-router-dom";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { getData } from "../../api/api";
import PieCharts from "./pie";
import AroundPie from "./aroundFill";
import FillChart from "./fillChart";
import ClusteredChart from "./clusteredAccom";
import GraphicalAccom from "./fieldmanAccom";
import io from "socket.io-client";
import moment from "moment";
import MapIcon from "@material-ui/icons/Map";
import Meralco from "../../../assets/map image/meralco.png";
import Maynilad from "../../../assets/map image/maynilad.png";
import Primewater from "../../../assets/map image/prime.png";

//page visibility when active or inactive
import { usePageVisibility } from "./utilities/visibility";
import BarGraphIcon from "../../../assets/map image/barGraphIcon.png";
import IndexMonthlyReport from "./monthlyReports/indexMonthlyReport";
// const socketData = io("https://ws.greenzoneph.com", { transports: ["websocket"] });

const substyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  box: {
    position: "relative",
    backgroundColor: "black",
    height: "8rem",
    width: "8rem",
  },
  card: {
    width: "100%",
    display: "flex",
  },
  cardHeader: {
    display: "block",
    overflow: "hidden",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
var selectedIndex = null;
let FeedIDs = [];
let UploadedIDs = [];
let activateBackup = null;
let idasdas = 0;
var jo_selected = "Show All";
let joResponse = [];
let socketDataBackup = [];
let socketUploadBackup = [];
let pageDetector = 0;
function RealtimeCharts({ scrollToBottom }) {
  const subClasses = substyle();
  const classes = useStyles();
  const [openLoader, setopenLoader] = React.useState(false);
  const [reloader, setreloader] = React.useState("");
  const [Idrefresh, setIdrefresh] = React.useState("");
  const [state, setState] = React.useState(false);
  // const [socketData] = React.useState(()=>io("https://ws.greenzoneph.com", { transports: ["websocket"] }));

  // Custom timers which are affected by the page visibility
  const isVisible = usePageVisibility();
  // const timerVal = useCurrentVisibilityTimer(isVisible);
  // const totalTimeVal = useTotalVisibilityTimer(isVisible);

  // Change the title based on page visibility
  if (isVisible) {
    document.title = "Active";
    pageDetector = "Active";
    if (activateBackup === false) {
      // so it will not triggered on initial render
      activateBackup = true;
    }
  } else {
    document.title = "Inactive";
    pageDetector = "Inactive";
    activateBackup = false;
  }

  const getFunction = () => {
    setopenLoader(true);
    getData("jls/getInitialData", localStorage.getItem("u")).then(
      (response) => {
        let filterFieldWork = response.filter(
          (item) => item.branch_field_work != ""
        );
        filterFieldWork.map((p_val, p_index) => {
          p_val.lastAccomplished = "";
          p_val.lastUploaded = "";
          p_val.activeType = "";
          p_val.fieldman.map((fvalue, findex) => {
            fvalue.accom.map((avalue, aindex) => {
              FeedIDs.push(avalue.rover_unique_id);
            });
            fvalue.uploaded.map((uvalue, uindex) => {
              UploadedIDs.push(uvalue.rover_unique_id);
            });
          });
        });
        joResponse = filterFieldWork;
        setopenLoader(false);
        // activatingSocket(response)
      }
    );
  };

  const activatingSocket = (response) => {
    socketFunction();
  };

  const socketFunction = () => {
    // socketData.on("new message", (data) => {
    //     receivedRealtimeData(data)
    // });
    // socketData.on("new location", (data) => {
    // });
    // socketData.on("fieldplus upload", (data) => {
    //   receivedUploadedData(data)
    // });
    // return () => { socketData.disconnect(); };
  };

  async function receivedRealtimeData(socketData) {
    await socketData.map((value, index) => {
      if (pageDetector === "Active") {
        const receiverId = FeedIDs.indexOf(value.data.rover_unique);
        if (receiverId === -1) {
          FeedIDs.push(value.data.rover_unique);
          joResponse.map((p_val, p_index) => {
            const fieldmanID = p_val.fieldman.findIndex(
              (x) => x.user_id === value.data.user_id
            );
            if (fieldmanID >= 0) {
              value.data.rover_unique_id = value.data.rover_unique;
              p_val.totalAccom = p_val.fieldman[fieldmanID].accom.length + 1;
              p_val.fieldman[fieldmanID].accom.push(value.data);
              p_val.lastAccomplished =
                socketData[socketData.length - 1].data.date_created;
              setIdrefresh(value.data.rover_unique);
            }
          });
        }
      } else if (pageDetector === "Inactive") {
        const receiverId = FeedIDs.indexOf(value.data.rover_unique);
        if (receiverId === -1) {
          FeedIDs.push(value.data.rover_unique);
          socketDataBackup.push(value);
        }
      }
    });
  }

  async function receivedUploadedData(socketData) {
    await socketData.map((value, index) => {
      if (pageDetector === "Active") {
        const receiverId = UploadedIDs.indexOf(value.rover_unique_id);
        if (receiverId === -1) {
          UploadedIDs.push(value.rover_unique_id);
          joResponse.map((p_val, p_index) => {
            const fieldmanID = p_val.fieldman.findIndex(
              (x) => x.user_id === value.user_id
            );
            if (fieldmanID >= 0) {
              let dateUploaded = new Date();
              p_val.totalUpload =
                p_val.fieldman[fieldmanID].uploaded.length + 1;
              p_val.fieldman[fieldmanID].uploaded.push(value);
              p_val.lastUploaded = moment(dateUploaded).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              setIdrefresh(value.rover_unique_id);
            }
          });
        }
      } else if (pageDetector === "Inactive") {
        const receiverId = UploadedIDs.indexOf(value.rover_unique_id);
        if (receiverId === -1) {
          UploadedIDs.push(value.rover_unique_id);
          socketUploadBackup.push(value);
        }
      }
    });
  }

  const receivableJo = () => {
    let loopCount = socketDataBackup.length;
    for (let index = 0; index < loopCount; index++) {
      if (pageDetector === "Active") {
        const receiverId = FeedIDs.indexOf(
          socketDataBackup[0].data.rover_unique
        );
        if (receiverId === -1) {
          FeedIDs.push(socketDataBackup[0].data.rover_unique);
          for (let jid = 0; jid < joResponse.length; jid++) {
            const fieldmanID = joResponse[jid].fieldman.findIndex(
              (x) => x.user_id === socketDataBackup[0].data.user_id
            );
            if (fieldmanID >= 0) {
              joResponse[jid].totalAccom =
                joResponse[jid].fieldman[fieldmanID].accom.length + 1;
              joResponse[jid].fieldman[fieldmanID].accom.push(
                socketDataBackup[0].data
              );
              joResponse[jid].lastAccomplished =
                socketDataBackup[socketDataBackup.length - 1].data.date_created;
              setIdrefresh(socketDataBackup[0].data.rover_unique);
            }
          }
        }
        socketDataBackup.splice(0, 1);
      }
    }
  };

  const receivableUpload = () => {
    let loopCount = socketUploadBackup.length;
    for (let index = 0; index < loopCount; index++) {
      if (pageDetector === "Active") {
        const receiverId = UploadedIDs.indexOf(
          socketUploadBackup[0].rover_unique_id
        );
        if (receiverId === -1) {
          UploadedIDs.push(socketUploadBackup[0].rover_unique_id);
          for (let jid = 0; jid < joResponse.length; jid++) {
            const fieldmanID = joResponse[jid].fieldman.findIndex(
              (x) => x.user_id === socketUploadBackup[0].user_id
            );
            if (fieldmanID >= 0) {
              let dateUploaded = new Date();
              joResponse[jid].totalUpload =
                joResponse[jid].fieldman[fieldmanID].uploaded.length + 1;
              joResponse[jid].fieldman[fieldmanID].uploaded.push(
                socketUploadBackup[0]
              );
              joResponse[jid].lastUploaded = moment(dateUploaded).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              setIdrefresh(socketUploadBackup[0].rover_unique_id);
            }
          }
        }
        socketUploadBackup.splice(0, 1);
      }
    }
  };

  useEffect(() => {
    getFunction();
  }, []);

  useEffect(() => {
    if (activateBackup) {
      receivableJo();
      receivableUpload();
      activateBackup = false;
    }
  }, [pageDetector]);
  return (
    <div className={classes.root}>
      {/* <button onClick={()=>console.log(joResponse[selectedIndex])}>console</button> */}
      {selectedIndex != null && (
        <>
          {[joResponse[selectedIndex]].map((value, index) => {
            var last_received = "";
            var last_uploadreceived = "";
            let imageDisplay = null;
            let multiplierTable = {};
            let count_AllAccom = 0;
            let count_AllUpload = 0;
            let count_AllAssign = 0;
            let count_AlltotalJo = 0;
            let totalTobeValidate = 0;
            let firstValidate = 0;
            let secondValidate = 0;
            var fieldmanChart = [];
            let finalJo = 0;
            let finalUnasigned = 0;
            let finalRemaining = 0;
            let accomIdentificator = 0;
            let totalAssignedDisplay = 0;
            var Accompercentage = 0;
            let BranchFindinds = [];
            let totalAccomvsUpload = 0;
            //if any of this two will have a value of 1, i will display the branch
            let baseAccom = 0;
            let baseAssign = 0;

            if (value.validation_multiplier != "") {
              multiplierTable = JSON.parse(value.validation_multiplier);
            }
            if (String(value.branch_name).includes("Meralco")) {
              imageDisplay = Meralco;
            }
            if (String(value.branch_name).includes("Maynilad")) {
              imageDisplay = Maynilad;
            }
            if (String(value.branch_name).includes("Primewater")) {
              imageDisplay = Primewater;
            }
            value.fieldman.map((f_value, f_index) => {
              var countAssigned = 0;
              var structureClustered = [];

              let uniqueCountFindings = [];

              let currentJoTypeAssign = f_value.assign.filter(
                (item) => item.jo_type === value.activeType
              );

              let currentJoTypeAccom = f_value.accom.filter(
                (item) => item.accom_jo_type === value.activeType
              );
              let currentJoTypeUploaded = f_value.uploaded.filter(
                (item) => item.accom_jo_type === value.activeType
              );

              let countFirstValidation = currentJoTypeAccom.filter(
                (item) => item.validator_remarks != null
              ).length;
              let countSecondValidation = currentJoTypeAccom.filter(
                (item) => item.validation_validator != null
              ).length;

              if (f_value.accom.length > 0) {
                if (baseAccom === 0) {
                  baseAccom = 1;
                }
              }
              currentJoTypeAccom.forEach((obj) => {
                // totalAccomvsUpload
                uniqueCountFindings.push(obj.rover_unique_id);
                let match = BranchFindinds.findIndex(
                  (y) =>
                    String(y.name).toUpperCase() ===
                    String(obj.accom_findings).toUpperCase()
                );
                if (match === -1) {
                  BranchFindinds.push({ name: obj.accom_findings, count: 1 });
                } else {
                  BranchFindinds[match]["count"] += 1;
                }
              });

              currentJoTypeUploaded.forEach((obj) => {
                if (
                  !JSON.stringify(uniqueCountFindings).includes(
                    obj.rover_unique_id
                  )
                ) {
                  let match = BranchFindinds.findIndex(
                    (y) =>
                      String(y.name).toUpperCase() ===
                      String(obj.accom_findings).toUpperCase()
                  );
                  if (match === -1) {
                    BranchFindinds.push({ name: obj.accom_findings, count: 1 });
                  } else {
                    BranchFindinds[match]["count"] += 1;
                  }
                  uniqueCountFindings.push(obj.rover_unique_id);
                }
              });

              f_value.totalAccom = currentJoTypeAccom.length;
              f_value.totalUpload = currentJoTypeUploaded.length;
              count_AllAccom += currentJoTypeAccom.length;
              count_AllUpload += currentJoTypeUploaded.length;

              currentJoTypeAssign.map((a_value, a_index) => {
                count_AllAssign += parseInt(a_value.total);
                countAssigned += parseInt(a_value.total);
              });

              var validateProduct =
                parseFloat(multiplierTable.multiplier) *
                currentJoTypeAccom.length;
              if (currentJoTypeAccom.length <= parseInt(multiplierTable.min)) {
                validateProduct = currentJoTypeAccom.length;
              }
              if (parseInt(validateProduct) < parseInt(multiplierTable.min)) {
                if (currentJoTypeAccom.length > parseInt(multiplierTable.min)) {
                  validateProduct = parseInt(multiplierTable.min);
                }
              }

              totalTobeValidate += parseInt(validateProduct);
              firstValidate += countFirstValidation;
              secondValidate += countSecondValidation;
              f_value.totalAssigned = countAssigned;
              structureClustered = {
                completename: f_value.completename,
                position: f_value.user_jobposition,
                totalAccom:
                  currentJoTypeAccom.length > currentJoTypeUploaded.length
                    ? currentJoTypeAccom.length
                    : currentJoTypeUploaded.length,
                totalAssigned: countAssigned,
              };
              // structureClustered = {completename:f_value.completename,totalAccom:finalAccomperMR,totalAssigned:countAssigned}
              fieldmanChart.push(structureClustered);
              accomIdentificator += uniqueCountFindings.length;
            });
            //computing Realtime VS Upload
            //  accomIdentificator = totalAccomvsUpload
            //  if(totalAccomvsUpload > count_AllUpload){
            //   accomIdentificator = totalAccomvsUpload
            // }else{
            //     accomIdentificator = count_AllUpload
            // }
            //computing the total of remaing jo, totalAssign - accomplished
            finalRemaining = count_AllAssign - accomIdentificator;
            if (parseInt(finalRemaining) <= 0) {
              finalRemaining = 0;
            }
            if (value.lastAccomplished != "") {
              last_received = moment(value.lastAccomplished).format(
                "MMM DD, YYYY h:m:ss"
              );
            }
            if (value.lastUploaded != "") {
              last_uploadreceived = moment(value.lastUploaded).format(
                "MMM DD, YYYY h:m:ss"
              );
            }
            if (count_AllAssign > accomIdentificator) {
              totalAssignedDisplay = count_AllAssign;
            } else {
              totalAssignedDisplay = accomIdentificator;
            }
            if (count_AlltotalJo > totalAssignedDisplay) {
              finalJo = count_AlltotalJo;
            } else {
              finalJo = totalAssignedDisplay;
            }

            //computing the total of unassigned jo, finalJO - totalAssign
            finalUnasigned = count_AlltotalJo - count_AllAssign;
            if (parseInt(finalUnasigned) <= 0) {
              finalUnasigned = 0;
            }

            if (finalJo === 0) {
              Accompercentage = (accomIdentificator / accomIdentificator) * 100;
            } else {
              Accompercentage = (accomIdentificator / finalJo) * 100;
            }

            if (isNaN(Accompercentage)) {
              Accompercentage = 0;
            }

            let unrevalidated =
              totalTobeValidate - (firstValidate + secondValidate);
            var aroundPie = {
              childPie: [
                {
                  category: "Revalidated",
                  value: secondValidate,
                  color: "#1dd1a1",
                },
                {
                  category: "First Validation",
                  value: firstValidate,
                  color: "#4b83ad",
                },
                {
                  category: "Remaining",
                  value: unrevalidated,
                  color: "#aaa69d",
                  labelDisabled: true,
                },
              ],
            };
            var jobtypepos = 0;
            JSON.parse(value.branch_field_work).map((fival, fvIndex) => {
              if (fival === value.activeType) {
                jobtypepos = fvIndex;
              }
            });
            var jobtypeperson = "";
            if (value.branch_field_personnel !== "") {
              JSON.parse(value.branch_field_personnel).map((fival, fvIndex) => {
                if (fvIndex === jobtypepos) {
                  jobtypeperson = fival;
                }
              });
            }

            var fieldmanFiltered = fieldmanChart.filter(
              (item) => item.totalAccom != 0 || item.totalAssigned != 0
            );
            var fieldmanPosition = fieldmanChart.filter((item) =>
              String(item.position)
                .toUpperCase()
                .includes(String(jobtypeperson).toUpperCase())
            );
            var fieldmanRescue = fieldmanChart.filter(
              (item) =>
                (item.totalAccom != 0 || item.totalAssigned != 0) &&
                !String(item.position)
                  .toUpperCase()
                  .includes(String(jobtypeperson).toUpperCase())
            );
            var fieldmanActive = fieldmanChart.filter(
              (item) =>
                (item.totalAccom != 0 || item.totalAssigned != 0) &&
                String(item.position)
                  .toUpperCase()
                  .includes(String(jobtypeperson).toUpperCase())
            );

            let sortedAccom = fieldmanFiltered.sort(
              (a, b) => b.totalAccom - a.totalAccom
            );
            return (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    width: "180vh",
                    overflowX: "auto",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flex: "wrap",
                      justifyContent: "flex-start",
                    }}
                  >
                    {BranchFindinds.map((bal, balIndx) => {
                      return (
                        <div
                          style={{
                            height: 100,
                            minWidth: 200,
                            backgroundColor: "#487eb0",
                            marginRight: 10,
                          }}
                          key={index}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h4"
                              gutterBottom
                              style={{ color: "#fff", marginTop: 10 }}
                              noWrap
                            >
                              {" "}
                              <b>{bal.count}</b>
                            </Typography>
                            <div
                              style={{
                                position: "absolute",
                                bottom: 1,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                variant="h5"
                                style={{
                                  color: "#fff",
                                  fontSize: 13,
                                  marginBottom: 10,
                                }}
                                noWrap
                              >
                                {" "}
                                {bal.name}{" "}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Grid container spacing={1} key={index}>
                  <Grid item xs={12} md={3}>
                    <Card className={classes.root}>
                      <CardContent>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={12}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                height: 50,
                                width: "100%",
                              }}
                            >
                              <div style={{ width: "85%" }}>
                                <Typography
                                  variant="h6"
                                  style={{ color: "#4b4b4b" }}
                                  noWrap
                                >
                                  <b>{value.branch_name}</b>{" "}
                                </Typography>
                                <Typography
                                  variant="button"
                                  style={{ color: "#4b6584", fontSize: 15 }}
                                  display="block"
                                  noWrap
                                  mb={2}
                                >
                                  {value.company_name}{" "}
                                </Typography>
                              </div>
                              <div style={{ width: "15%" }}>
                                {imageDisplay != null ? (
                                  <img
                                    src={imageDisplay}
                                    style={{ width: 55, height: 55 }}
                                  />
                                ) : (
                                  <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                  >
                                    {String(value.company_name).charAt(0)}
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              position: "absolute",
                              top: 15,
                            }}
                          >
                            <center>
                              {parseInt(finalJo) >
                                parseInt(count_AllAssign) && (
                                <Typography
                                  variant="h5"
                                  style={{ color: "#4b4b4b", fontSize: 20 }}
                                  noWrap
                                >
                                  <b>{count_AllAssign}</b> Assigned{" "}
                                </Typography>
                              )}
                            </center>
                          </div>
                          <div
                            style={{
                              width: 350,
                              height: 350,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FillChart
                              totalAccom={accomIdentificator}
                              Accompercentage={Accompercentage}
                              totalJo={finalJo}
                            />
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              alignSelf: "center",
                              width: 400,
                              height: 400,
                              borderRadius: "50%",
                            }}
                          >
                            <AroundPie
                              pieId={"pieCharts" + index}
                              aroundData={aroundPie}
                            />
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              alignSelf: "center",
                              display: "flex",
                              bottom: -25,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h5"
                              gutterBottom
                              style={{ color: "#4b4b4b", marginTop: 10 }}
                            >
                              {" "}
                              <b>{count_AllUpload}</b>{" "}
                            </Typography>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{
                                color: "#4b4b4b",
                                marginTop: 13,
                                marginLeft: 5,
                              }}
                            >
                              {" "}
                              UPLOADED
                            </Typography>
                          </div>
                          {/* <div style={{position:'absolute',width:'100%',bottom:-25}}>
                            <div style={{width:'85%'}}>
                              {last_received != "" &&
                                  <Typography variant="h6" style={{fontSize:14,color:'#4b4b4b'}} noWrap> Last Accomplished : <b>{last_received}</b></Typography>
                              } 
                              {last_uploadreceived != "" && 
                                  <Typography variant="h6" style={{fontSize:14,color:'#4b4b4b'}} noWrap> Last Uploaded : <b>{last_uploadreceived}</b></Typography>
                              } 
                            </div>
                          </div> */}
                        </div>
                      </CardContent>

                      <CardActions disableSpacing>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={8}>
                            <IconButton
                              style={{ color: "#4b4b4b" }}
                              aria-label="add to favorites"
                              onClick={() => {
                                scrollToBottom();
                                selectedIndex = index;
                                setState(!state);
                              }}
                            >
                              {fieldmanActive.length}/{fieldmanPosition.length}/
                              {fieldmanRescue.length}
                              <DirectionsWalkIcon
                                style={{ color: "#4b4b4b" }}
                              />
                            </IconButton>
                            <IconButton
                              component={NewLink}
                              to="/"
                              target="_blank"
                              onClick={() => {
                                let currDate = new Date();
                                let joType = JSON.parse(
                                  value.branch_field_work
                                );
                                let data = {
                                  parameter: "branch_id",
                                  selection: [value.b_id],
                                  from: moment(currDate).format("YYYY-MM-DD"),
                                  to: moment(currDate).format("YYYY-MM-DD"),
                                  company_id: value.c_id,
                                  jo_type: [value.activeType],
                                };
                                localStorage.setItem(
                                  "onSelectSingleDateGraph",
                                  JSON.stringify(data)
                                );
                              }}
                            >
                              <MapIcon style={{ color: "#27ae60" }} />
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={4}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <FormControl size="small" style={{ width: "100%" }}>
                              <InputLabel id="demo-simple-select-outlined-label">
                                Jo Type
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={(bfw) => {
                                  fieldmanChart = [];
                                  let currDates = new Date();
                                  joResponse[selectedIndex].activeType =
                                    bfw.target.value;
                                  setreloader(
                                    moment(currDates).format("hh:mm:ss")
                                  );
                                }}
                                label="Company"
                                name="company"
                                value={value.activeType}
                              >
                                {JSON.parse(value.branch_field_work).map(
                                  (fival, fvIndex) => {
                                    return (
                                      <MenuItem value={fival} key={fvIndex}>
                                        {fival}
                                      </MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Card className={classes.root}>
                      <CardContent>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div style={{ marginTop: 20, width: "100%" }}>
                            <div
                              style={{
                                marginBottom: 10,
                                height: 100,
                                width: "100%",
                                backgroundColor: "#487eb0",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="h4"
                                  gutterBottom
                                  style={{ color: "#fff", marginTop: 10 }}
                                >
                                  {" "}
                                  <b>{count_AllAssign}</b>
                                </Typography>
                                <div
                                  style={{
                                    position: "absolute",
                                    bottom: 1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      color: "#fff",
                                      fontSize: 13,
                                      marginBottom: 10,
                                    }}
                                  >
                                    {" "}
                                    ASSIGNED{" "}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                marginBottom: 10,
                                height: 100,
                                width: "100%",
                                backgroundColor: "#58B19F",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="h4"
                                  gutterBottom
                                  style={{ color: "#fff", marginTop: 10 }}
                                >
                                  {" "}
                                  <b>{accomIdentificator}</b>{" "}
                                </Typography>
                                <div
                                  style={{
                                    position: "absolute",
                                    bottom: 1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      color: "#fff",
                                      fontSize: 13,
                                      marginBottom: 10,
                                    }}
                                  >
                                    {" "}
                                    ACCOMPLISHED{" "}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                marginBottom: 10,
                                height: 100,
                                width: "100%",
                                backgroundColor: "#f39c12",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="h4"
                                  gutterBottom
                                  style={{ color: "#fff", marginTop: 10 }}
                                >
                                  {" "}
                                  <b>{finalUnasigned}</b>{" "}
                                </Typography>
                                <div
                                  style={{
                                    position: "absolute",
                                    bottom: 1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      color: "#fff",
                                      fontSize: 13,
                                      marginBottom: 10,
                                    }}
                                  >
                                    {" "}
                                    UNASSIGNED{" "}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                marginBottom: 10,
                                height: 100,
                                width: "100%",
                                backgroundColor: "#e74c3c",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="h4"
                                  gutterBottom
                                  style={{ color: "#fff", marginTop: 10 }}
                                >
                                  {" "}
                                  <b>{finalRemaining}</b>
                                </Typography>
                                <div
                                  style={{
                                    position: "absolute",
                                    bottom: 1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    style={{
                                      color: "#fff",
                                      fontSize: 13,
                                      marginBottom: 10,
                                    }}
                                  >
                                    {" "}
                                    REMAINING{" "}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Card className={classes.root}>
                      <CardContent>
                        <div style={{ position: "relative" }}>
                          {last_received != "" && (
                            <Typography
                              variant="overline"
                              style={{ marginLeft: 10 }}
                            >
                              Last Accomplishment : <b>{last_received}</b> |{" "}
                            </Typography>
                          )}
                          {last_uploadreceived != "" && (
                            <Typography
                              variant="overline"
                              style={{ marginLeft: 10 }}
                            >
                              Last Uploaded : <b>{last_uploadreceived}</b>
                            </Typography>
                          )}
                          <br />
                          <Typography
                            variant="overline"
                            style={{ marginLeft: 10 }}
                          >
                            VALIDATION :{" "}
                            <b style={{ fontSize: 14 }}>{totalTobeValidate}</b>{" "}
                            <b style={{ fontSize: 14 }}> | </b> FIRST VALIDATION
                            : <b style={{ fontSize: 14 }}>{firstValidate} </b>{" "}
                            <b style={{ fontSize: 14 }}> | </b> REVALIDATED :{" "}
                            <b style={{ fontSize: 14 }}>{secondValidate}</b>
                          </Typography>
                          <Divider style={{ marginTop: 10 }} />
                          <div
                            style={{
                              height: 380,
                              width: "100%",
                              overflowY: "auto",
                            }}
                          >
                            {fieldmanFiltered.length > 0 && (
                              <ClusteredChart
                                barID={"barChart" + index}
                                fieldmanArr={fieldmanFiltered}
                                accomIdentificator={accomIdentificator}
                              />
                            )}
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              top: -10,
                              right: -10,
                              display: "flex",
                              justifyContent: "flex-end",
                              width: "100%",
                            }}
                          >
                            <IconButton
                              style={{ backgroundColor: "#f5f6fa" }}
                              aria-label="settings"
                              onClick={() => {
                                selectedIndex = null;
                                setState(!state);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </>
      )}
      <Grid container spacing={1}>
        {joResponse.map((value, index) => {
          var last_received = "";
          var last_uploadreceived = "";
          let imageDisplay = null;
          let multiplierTable = {};
          let count_AllAccom = 0;
          let count_AllUpload = 0;
          let count_AllAssign = 0;
          let count_AlltotalJo = 0;
          let totalTobeValidate = 0;
          let firstValidate = 0;
          let secondValidate = 0;
          var fieldmanChart = [];
          let finalJo = 0;
          let finalUnasigned = 0;
          let finalRemaining = 0;
          let accomIdentificator = 0;
          let totalAssignedDisplay = 0;
          var Accompercentage = 0;

          //if any of this two will have a value of 1, i will display the branch
          let baseAccom = 0;
          let baseAssign = 0;

          if (value.validation_multiplier != "") {
            multiplierTable = JSON.parse(value.validation_multiplier);
          }
          if (String(value.branch_name).includes("Meralco")) {
            imageDisplay = Meralco;
          }
          if (String(value.branch_name).includes("Maynilad")) {
            imageDisplay = Maynilad;
          }
          if (String(value.branch_name).includes("Primewater")) {
            imageDisplay = Primewater;
          }
          value.fieldman.map((f_value, f_index) => {
            var countAssigned = 0;
            var structureClustered = [];
            let uniqueCountFindings = [];

            if (value.activeType === "") {
              if (f_value.accom.length > 0) {
                value.activeType = f_value.accom[0].accom_jo_type;
              } else {
                let assignidentifier = f_value.assign.filter(
                  (item) => parseInt(item.total) != 0
                ).length;
                if (assignidentifier > 0) {
                  value.activeType = f_value.assign[0].jo_type;
                }
              }
            }
            // if(typeIdentifier === ""){
            //   if(f_value.assign.length > 0){
            //     value.activeType = f_value.assign[0].jo_type
            //     typeIdentifier = f_value.assign[0].jo_type
            //   }
            // }

            let assignidentifier = f_value.assign.filter(
              (item) => parseInt(item.total) != 0
            ).length;
            let currentJoTypeAssign = f_value.assign.filter(
              (item) => item.jo_type === value.activeType
            );

            let currentJoTypeAccom = f_value.accom.filter(
              (item) => item.accom_jo_type === value.activeType
            );
            let currentJoTypeUploaded = f_value.uploaded.filter(
              (item) => item.accom_jo_type === value.activeType
            );

            let countFirstValidation = currentJoTypeAccom.filter(
              (item) => item.validator_remarks != null
            ).length;
            let countSecondValidation = currentJoTypeAccom.filter(
              (item) => item.validation_validator != null
            ).length;

            if (f_value.accom.length > 0) {
              if (baseAccom === 0) {
                baseAccom = 1;
              }
            }

            if (assignidentifier > 0) {
              if (baseAssign === 0) {
                baseAssign = 1;
              }
            }

            f_value.totalAccom = currentJoTypeAccom.length;
            f_value.totalUpload = currentJoTypeUploaded.length;
            count_AllAccom += currentJoTypeAccom.length;
            count_AllUpload += currentJoTypeUploaded.length;

            currentJoTypeAssign.map((a_value, a_index) => {
              count_AllAssign += parseInt(a_value.total);
              countAssigned += parseInt(a_value.total);
            });

            currentJoTypeAccom.forEach((obj) => {
              // totalAccomvsUpload
              uniqueCountFindings.push(obj.rover_unique_id);
            });

            currentJoTypeUploaded.forEach((obj) => {
              if (
                !JSON.stringify(uniqueCountFindings).includes(
                  obj.rover_unique_id
                )
              ) {
                uniqueCountFindings.push(obj.rover_unique_id);
              }
            });

            var validateProduct =
              parseFloat(multiplierTable.multiplier) *
              currentJoTypeAccom.length;
            if (currentJoTypeAccom.length <= parseInt(multiplierTable.min)) {
              validateProduct = currentJoTypeAccom.length;
            }
            if (parseInt(validateProduct) < parseInt(multiplierTable.min)) {
              if (currentJoTypeAccom.length > parseInt(multiplierTable.min)) {
                validateProduct = parseInt(multiplierTable.min);
              }
            }
            totalTobeValidate += parseInt(validateProduct);
            firstValidate += countFirstValidation;
            secondValidate += countSecondValidation;
            f_value.totalAssigned = countAssigned;
            structureClustered = {
              completename: f_value.completename,
              position: f_value.user_jobposition,
              totalAccom:
                currentJoTypeAccom.length > currentJoTypeUploaded.length
                  ? currentJoTypeAccom.length
                  : currentJoTypeUploaded.length,
              totalAssign: countAssigned,
            };
            fieldmanChart.push(structureClustered);
            accomIdentificator += uniqueCountFindings.length;
          });

          //computing the total of remaing jo, totalAssign - accomplished
          finalRemaining = count_AllAssign - accomIdentificator;
          if (parseInt(finalRemaining) <= 0) {
            finalRemaining = 0;
          }
          if (value.lastAccomplished != "") {
            last_received = moment(value.lastAccomplished).format(
              "MMM DD, YYYY h:m:ss"
            );
          }
          if (value.lastUploaded != "") {
            last_uploadreceived = moment(value.lastUploaded).format(
              "MMM DD, YYYY h:m:ss"
            );
          }
          if (count_AllAssign > accomIdentificator) {
            totalAssignedDisplay = count_AllAssign;
          } else {
            totalAssignedDisplay = accomIdentificator;
          }
          if (count_AlltotalJo > totalAssignedDisplay) {
            finalJo = count_AlltotalJo;
          } else {
            finalJo = totalAssignedDisplay;
          }

          //computing the total of unassigned jo, finalJO - totalAssign
          finalUnasigned = count_AlltotalJo - count_AllAssign;
          if (parseInt(finalUnasigned) <= 0) {
            finalUnasigned = 0;
          }

          if (finalJo === 0) {
            Accompercentage = (accomIdentificator / accomIdentificator) * 100;
          } else {
            Accompercentage = (accomIdentificator / finalJo) * 100;
          }

          if (isNaN(Accompercentage)) {
            Accompercentage = 0;
          }

          let unrevalidated =
            totalTobeValidate - (firstValidate + secondValidate);
          var aroundPie = {
            childPie: [
              {
                category: "Revalidated",
                value: secondValidate,
                color: "#1dd1a1",
              },
              {
                category: "First Validation",
                value: firstValidate,
                color: "#4b83ad",
              },
              {
                category: "Remaining",
                value: unrevalidated,
                color: "#aaa69d",
                labelDisabled: true,
              },
            ],
          };

          var jobtypepos = 0;
          JSON.parse(value.branch_field_work).map((fival, fvIndex) => {
            if (fival === value.activeType) {
              jobtypepos = fvIndex;
            }
          });
          var jobtypeperson = "";
          if (value.branch_field_personnel !== "") {
            JSON.parse(value.branch_field_personnel).map((fival, fvIndex) => {
              if (fvIndex === jobtypepos) {
                jobtypeperson = fival;
              }
            });
          }

          var fieldmanFiltered = fieldmanChart.filter(
            (item) => item.totalAccom != 0 || item.totalAssign != 0
          );
          var fieldmanPosition = fieldmanChart.filter((item) =>
            String(item.position)
              .toUpperCase()
              .includes(String(jobtypeperson).toUpperCase())
          );
          var fieldmanRescue = fieldmanChart.filter(
            (item) =>
              (item.totalAccom != 0 || item.totalAssign != 0) &&
              !String(item.position)
                .toUpperCase()
                .includes(String(jobtypeperson).toUpperCase())
          );
          var fieldmanActive = fieldmanChart.filter(
            (item) =>
              (item.totalAccom != 0 || item.totalAssign != 0) &&
              String(item.position)
                .toUpperCase()
                .includes(String(jobtypeperson).toUpperCase())
          );

          if (baseAssign > 0 || baseAccom > 0) {
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  className={classes.root}
                  style={{
                    backgroundColor:
                      selectedIndex === index ? "#bdc3c7" : "#fff",
                  }}
                >
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: 50,
                            width: "100%",
                          }}
                        >
                          <div style={{ width: "85%" }}>
                            <Typography
                              variant="h6"
                              style={{
                                color:
                                  selectedIndex === index ? "#fff" : "#4b4b4b",
                              }}
                              noWrap
                            >
                              <b>{value.branch_name}</b>{" "}
                            </Typography>
                            <Typography
                              variant="button"
                              style={{
                                color:
                                  selectedIndex === index ? "#fff" : "#4b6584",
                                fontSize: 15,
                              }}
                              display="block"
                              noWrap
                              mb={2}
                            >
                              {value.company_name}{" "}
                            </Typography>
                          </div>
                          <div style={{ width: "15%" }}>
                            {imageDisplay != null ? (
                              <img
                                src={imageDisplay}
                                style={{ width: 55, height: 55 }}
                              />
                            ) : (
                              <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                              >
                                {String(value.company_name).charAt(0)}
                              </Avatar>
                            )}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{ width: "100%", position: "absolute", top: 15 }}
                      >
                        <center>
                          {parseInt(finalJo) > parseInt(count_AllAssign) && (
                            <Typography
                              variant="h5"
                              style={{ color: "#4b4b4b", fontSize: 20 }}
                              noWrap
                            >
                              <b>{count_AllAssign}</b> Assigned{" "}
                            </Typography>
                          )}
                        </center>
                      </div>
                      <div
                        style={{
                          width: 350,
                          height: 350,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FillChart
                          totalAccom={accomIdentificator}
                          Accompercentage={Accompercentage}
                          totalJo={finalJo}
                        />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          alignSelf: "center",
                          width: 400,
                          height: 400,
                          borderRadius: "50%",
                        }}
                      >
                        <AroundPie
                          pieId={"pieCharts" + index}
                          aroundData={aroundPie}
                        />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          bottom: -25,
                        }}
                      >
                        <div style={{ width: "85%" }}>
                          {last_received != "" && (
                            <Typography
                              variant="h6"
                              style={{
                                fontSize: 14,
                                color:
                                  selectedIndex === index ? "#fff" : "#4b4b4b",
                              }}
                              noWrap
                            >
                              {" "}
                              Last Accomplished : <b>{last_received}</b>
                            </Typography>
                          )}
                          {last_uploadreceived != "" && (
                            <Typography
                              variant="h6"
                              style={{
                                fontSize: 14,
                                color:
                                  selectedIndex === index ? "#fff" : "#4b4b4b",
                              }}
                              noWrap
                            >
                              {" "}
                              Last Uploaded : <b>{last_uploadreceived}</b>
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12}>
                        <IndexMonthlyReport
                          b_id={value.b_id}
                          activeType={value.activeType}
                        />
                      </Grid>

                      <Grid item xs={12} md={8}>
                        <IconButton
                          style={{ color: "#4b4b4b" }}
                          aria-label="add to favorites"
                          onClick={() => {
                            scrollToBottom();
                            selectedIndex = index;
                            setState(!state);
                          }}
                        >
                          {fieldmanActive.length}/{fieldmanPosition.length}/
                          {fieldmanRescue.length}
                          <DirectionsWalkIcon style={{ color: "#4b4b4b" }} />
                        </IconButton>
                        <IconButton
                          component={NewLink}
                          to="/map"
                          target="_blank"
                          onClick={() => {
                            let currDate = new Date();
                            let joType = JSON.parse(value.branch_field_work);
                            let data = {
                              parameter: "branch_id",
                              selection: [value.b_id],
                              from: moment(currDate).format("YYYY-MM-DD"),
                              to: moment(currDate).format("YYYY-MM-DD"),
                              company_id: value.c_id,
                              jo_type: [value.activeType],
                            };
                            localStorage.setItem(
                              "onSelectSingleDateGraph",
                              JSON.stringify(data)
                            );
                          }}
                        >
                          <MapIcon style={{ color: "#27ae60" }} />
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <FormControl size="small" style={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-outlined-label">
                            Jo Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(bfw) => {
                              let currDates = new Date();
                              fieldmanChart = [];
                              joResponse[index].activeType = bfw.target.value;
                              setreloader(moment(currDates).format("hh:mm:ss"));
                            }}
                            label="Company"
                            name="company"
                            value={value.activeType}
                          >
                            {JSON.parse(value.branch_field_work).map(
                              (fival, fvIndex) => {
                                return (
                                  <MenuItem value={fival} key={fvIndex}>
                                    {fival}
                                  </MenuItem>
                                );
                              }
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
      <Backdrop className={subClasses.backdrop} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default RealtimeCharts;
