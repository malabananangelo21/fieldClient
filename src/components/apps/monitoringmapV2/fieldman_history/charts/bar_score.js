import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tab,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "../../summary_accomplishment/css/summary.css";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
const data = [
  {
    name: "Page A",
    remaining: 590,
    unassign: 800,
    accom: 421,
    assign: 200,
  },
  {
    name: "Page B",
    remaining: 732,
    unassign: 967,
    accom: 879,
    assign: 200,
  },
  {
    name: "Page C",
    remaining: 782,
    unassign: 1098,
    accom: 124,
    assign: 200,
  },
  {
    name: "Page D",
    remaining: 123,
    unassign: 1200,
    accom: 321,
    assign: 200,
  },
  {
    name: "Page E",
    remaining: 983,
    unassign: 1108,
    accom: 650,
    assign: 200,
  },
  {
    name: "Page F",
    remaining: 0,
    assign: 200,
    unassign: 680,
    accom: 880,
  },
];
const formatNumber = (num) => {
  if (num != "") {
    let num2 = parseFloat(num);
    return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return 0;
  }
};
const CustomTooltip = ({ active, payload, label, checkState }) => {
  if (active && payload && payload.length && payload[0].payload.count !== 0) {
    return (
      <div
        className="custom-tooltip card-color-data2"
        style={{
          backgroundColor: "#fff",
          paddingRight: 10,
          paddingLeft: 10,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          borderRadius: 5,
          width: 200,
        }}
      >
        <Typography style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
          Grade : {parseFloat(payload[0].payload.totalScore).toFixed(2)}%
        </Typography>
      </div>
    );
  }
  return null;
};
const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
  let match_absent = false;
  if (
    (payload.accomplishment < payload.total_jo * 0.95 &&
      !payload.appeal_requests) ||
    (!payload.attendance && !payload.appeal_requests)
  ) {
    match_absent = true;
  }
  if (typeof payload.type !== "undefined" || match_absent) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        x={cx - 10}
        y={cy - 10}
        width={23}
        height={23}
        fill="#f39c12"
      >
        <path d="M24,10V24H0V10Zm0-2V5a3,3,0,0,0-3-3H18V0H16V2H8V0H6V2H3A3,3,0,0,0,0,5V8Zm-6,6H16v2h2Zm-5,0H11v2h2ZM8,14H6v2H8Zm10,4H16v2h2Zm-5,0H11v2h2ZM8,18H6v2H8Z" />
      </svg>
      // <svg xmlns="http://www.w3.org/2000/svg" x={cx - 10} y={cy - 10} width={20} class="bi bi-calendar-x-fill" height={20} fill="#f39c12" viewBox="0 0 1024 1024">
      //   <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708z"/>
      // </svg>
      // <svg xmlns="http://www.w3.org/2000/svg" x={cx - 10} y={cy - 10} width={20} height={20}  viewBox="0 0 1024 1024" fill="none" stroke="#f8e71c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
      // <svg xmlns="http://www.w3.org/2000/svg" x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>
      //     <svg xmlns="http://www.w3.org/2000/svg" x={cx - 10} y={cy - 10} width={20} height={20} class="bi bi-calendar-x-fill" viewBox="0 0 1024 1024">
      // <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708z"/>
      // </svg>
    );
  } else {
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        fill="red"
        viewBox="0 0 1024 1024"
      >
        {/* <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" /> */}
      </svg>
    );
  }
};
export default function Barline2({ indexState }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';
  let history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    filter_modal: false,
    eval_modal: false,
    break_modal: false,
    fieldman: [
      {
        complete_productivity: 20,
        accuracy: 40,
        attendance: 10,
        tardiness: 10,
        attitude: 10,
        completename: "Test",
      },
      {
        complete_productivity: 10,
        accuracy: 15,
        attendance: 10,
        tardiness: 35,
        attitude: 10,
        completename: "Juan Dela Cruz",
      },
      {
        complete_productivity: 30,
        accuracy: 40,
        attendance: 10,
        tardiness: 10,
        attitude: 10,
        completename: "Cruz",
      },
    ],
    submit_data: [],
    details: [],
    passing_score: 0,
    sel_elav: [],
    score: "",
    break_data: [],
    accuracy_break: [],
    completeness_break: [],
    absent_break: [],
    tardiness_break: [],
    completeness_rate: "",
    absentism_present: 0,
    absentism_absent: 0,
    late_hour: new Date(),
    tardiness_count: 0,
    attitude_break: [],
    attitude_overwrite: "",
    b_name: "",
  });

  const onClickBreak = (response) => {
    let complete_details = response.data[0].breakdown_completeness;
    let complete_rate =
      (parseInt(complete_details.count_accomplish) /
        parseInt(complete_details.count_assign)) *
      25;
    let absent_details_attendance =
      response.data[0].breakdown_absentism.attendance;
    let absent_details_schedule = response.data[0].breakdown_absentism.schedule;
    let tardiness_details_attendance =
      response.data[0].breakdown_tardiness.attendance;
    let tardiness_details_schedule =
      response.data[0].breakdown_tardiness.schedule;
    let atd_break = response.data[0].attitude_data;
    let attnd = [];
    let present = 0;
    let absent = 0;
    let tardiness = [];
    let late = 0;
    absent_details_schedule.map((val) => {
      if (typeof absent_details_attendance[val] === "object") {
        attnd.push({
          date: val,
          status: "Present",
        });
        present++;
      } else {
        attnd.push({
          date: val,
          status: "Absent",
        });
        absent++;
      }
    });
    tardiness_details_schedule.map((val) => {
      if (typeof tardiness_details_attendance[val] === "object") {
        if (
          moment(tardiness_details_attendance[val][0].date_added).format(
            "hh:mm"
          ) < moment("2021-01-01 05:00").format("hh:mm")
        ) {
          tardiness.push({
            in: moment(tardiness_details_attendance[val][0].date_added).format(
              "LLL"
            ),
            status: "Early",
          });
        } else {
          tardiness.push({
            in: moment(tardiness_details_attendance[val][0].date_added).format(
              "LLL"
            ),
            status: "Late",
          });
          late++;
        }
      }
    });

    setState((prev) => ({
      ...prev,
      break_modal: true,
      break_data: response.data[0],
      accuracy_break: response.data[0].breakdown_accuracy,
      completeness_break: response.data[0].breakdown_completeness,
      absent_break: attnd,
      absentism_present: present,
      absentism_absent: absent,
      tardiness_break: tardiness,
      tardiness_count: late,
      completeness_rate: complete_rate.toFixed(2),
      attitude_break: response.data[0].attitude_data,
      attitude_overwrite: response.data[0].attitude,
    }));
  };
  return (
    <>
      <ResponsiveContainer width="100%" aspect={1.6}>
        <ComposedChart
          onClick={(e) => {
            if (typeof e.activePayload[0].payload.totalScore !== "undefined") {
              onClickBreak(e.activePayload[0].payload);
              //   let data = {
              //     parameter: "branch_id",
              //     selection: [dataFilter.branch_id],
              //     from: moment(e.activePayload[0].payload.date).format("YYYY-MM-DD"),
              //     to: moment(e.activePayload[0].payload.date).format("YYYY-MM-DD"),
              //     company_id: company_id,
              //     jo_type: jo_type
              //   }
              //   getdateDetails(data)
              //  localStorage.setItem('onSelectSingleDateGraph',JSON.stringify(data))
              //  history.push("/map/");
            }
          }}
          style={{ cursor: "pointer" }}
          data={indexState.totalScore}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis tick={{ fill: "#fff" }} dataKey="month" scale="band" />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="totalScore" stackId="a" fill="#3498db" />
        </ComposedChart>
      </ResponsiveContainer>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={state.break_modal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Grading Breakdown Details</Typography>
            <Button
              onClick={() =>
                setState((prev) => ({ ...prev, break_modal: false }))
              }
              color="primary"
              size="small"
            >
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <AppBar position="static" color="default" variant="outlined">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Accuracy" {...a11yProps(0)} />
              <Tab label="Completeness" {...a11yProps(1)} />
              <Tab label="Attendant" {...a11yProps(2)} />
              <Tab label="Timeliness" {...a11yProps(3)} />
              <Tab label="Attitude" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Accuracy
            <TableContainer>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Accomplishment</TableCell>
                    <TableCell>No of invalid</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Accuracy Rate
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {state.accuracy_break.count_accomplish}
                    </TableCell>
                    <TableCell> {state.accuracy_break.count_invalid}</TableCell>
                    {parseInt(state.accuracy_break.count_invalid) <= 10 && (
                      <TableCell>20%</TableCell>
                    )}
                    {parseInt(state.accuracy_break.count_invalid) > 10 &&
                      parseInt(state.accuracy_break.count_invalid) <= 16 && (
                        <TableCell>15%</TableCell>
                      )}
                    {parseInt(state.accuracy_break.count_invalid) > 16 &&
                      parseInt(state.accuracy_break.count_invalid) <= 20 && (
                        <TableCell>10%</TableCell>
                      )}
                    {parseInt(state.accuracy_break.count_invalid) > 20 && (
                      <TableCell>5%</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Completeness
            <TableContainer>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Assigned</TableCell>
                    <TableCell>No of Accomplishment</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Completeness Rate
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {state.completeness_break.count_accomplish}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {state.completeness_break.count_assign}
                    </TableCell>
                    <TableCell>{state.completeness_rate + "%"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Attendant
            <TableContainer style={{ marginBottom: 25 }}>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Attendance</TableCell>
                    <TableCell>Total Absent</TableCell>
                    <TableCell>Total Schedule</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{state.absentism_present}</TableCell>
                    <TableCell>{state.absentism_absent}</TableCell>
                    <TableCell>{state.absent_break.length}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      {state.break_data.absentism + "%"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer style={{ maxHeight: 300 }}>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.absent_break.map((val) => {
                    let present = "green";

                    if (val.status === "Absent") {
                      present = "red";
                    }
                    return (
                      <TableRow>
                        <TableCell>{moment(val.date).format("LL")}</TableCell>
                        <TableCell style={{ color: present, fontWeight: 900 }}>
                          {val.status}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={3}>
            Timeliness
            <TableContainer style={{ marginBottom: 25 }}>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Late</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{state.tardiness_count}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      {state.break_data.tardiness + "%"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer style={{ maxHeight: 300 }}>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.tardiness_break.map((val) => {
                    let present = "green";

                    if (val.status === "Late") {
                      present = "red";
                    }
                    return (
                      <TableRow>
                        <TableCell>{moment(val.in).format("LLL")}</TableCell>
                        <TableCell style={{ color: present, fontWeight: 900 }}>
                          {val.status}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={4}>
            Attitude
            {state.attitude_overwrite !== null ? (
              <TableContainer style={{ maxHeight: 300 }}>
                <Table
                  className={classes.table}
                  aria-label="simple table"
                  size="small"
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Evaluation Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {state.attitude_overwrite + "/" + "5"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer style={{ maxHeight: 300 }}>
                <Table
                  className={classes.table}
                  aria-label="simple table"
                  size="small"
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Evaluator</TableCell>
                      <TableCell>Evaluation Grade</TableCell>
                      <TableCell>Date Added</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.attitude_break.map((val) => {
                      let name = val.level;
                      if (val.evaluation_id === 0) {
                        name = "n/a";
                      }
                      return (
                        <TableRow>
                          <TableCell>{name}</TableCell>
                          <TableCell>
                            {val.evaluation_grade + "/" + "5"}
                          </TableCell>
                          <TableCell>
                            {moment(val.evaluation_date_added).format("LL")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
}
