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
} from "@material-ui/core";
import "../../summary_accomplishment/css/summary.css";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
  if (active && payload && payload.length) {
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
          width: 400,
        }}
      >
        {/* <p className="label" style={{fontSize:18,fontWeight:'bold'}}>Date : {`${label}`}</p>
          <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>APF</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.average_assign)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Fieldman</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.fieldman)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Total</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.total_jo)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Assigned</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.assigned)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Unassigned</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.unassigned)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Accomplished</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.accomplishment)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Delay</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.remaining)}`}</span></p>
          </div>
        </div> */}
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <DateRangeIcon style={{ marginRight: 5, color: "#115293" }} />
                <p style={{}}>{moment(payload[0].payload.date).format("LL")}</p>
              </div>
              {typeof payload[0].payload.type !== "undefined" ? (
                <div>
                  <p
                    className="label"
                    style={{ fontSize: 16, color: "red", fontWeight: "bold" }}
                  >
                    ABSENT
                  </p>
                </div>
              ) : undefined}
            </div>
          </Grid>
        </Grid>
        {typeof payload[0].payload.type === "undefined" ? (
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={4} md={4}>
                  <Card variant={"outlined"}>
                    <div
                      style={{
                        padding: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="label" style={{ fontSize: 16 }}>
                        APF
                      </p>
                      <p className="label" style={{ fontSize: 16 }}>
                        <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                          payload[0].payload.average_assign
                        )}`}</span>
                      </p>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card variant={"outlined"}>
                    <div
                      style={{
                        padding: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="label" style={{ fontSize: 16 }}>
                        FIELDMAN
                      </p>
                      <p className="label" style={{ fontSize: 16 }}>
                        <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                          payload[0].payload.fieldman
                        )}`}</span>
                      </p>
                    </div>
                  </Card>
                </Grid>
                {/* <Grid item xs={4} md={4}>
            <Card variant={"outlined"} style={{ backgroundColor: '#9b59b6' }}>
              <div style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>TOTAL</p>
                <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>{`${formatNumber(payload[0].payload.total_jo)}`}</span></p>
              </div>
            </Card>
          </Grid> */}
                {checkState.assigned ? (
                  <Grid item xs={4} md={4}>
                    <Card
                      variant={"outlined"}
                      style={{ backgroundColor: "#004987" }}
                    >
                      <div
                        style={{
                          padding: 10,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          className="label"
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          Assigned
                        </p>
                        <p
                          className="label"
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                            payload[0].payload.assigned
                          )}`}</span>
                        </p>
                      </div>
                    </Card>
                  </Grid>
                ) : undefined}
              </Grid>
              {/* {checkState.unassigned ?
            <Grid item xs={4} md={4} >
              <Card variant={"outlined"} style={{ backgroundColor: '#f39c12' }}>
                <div style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Unassigned</p>
                  <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>{`${formatNumber(payload[0].payload.unassigned)}`}</span></p>
                </div>
              </Card>
            </Grid>
            : undefined
          } */}
              <Grid container spacing={1}>
                {checkState.accomplishment ? (
                  <Grid item xs={4} md={4}>
                    <Card
                      variant={"outlined"}
                      style={{ backgroundColor: "#2bad62" }}
                    >
                      <div
                        style={{
                          padding: 10,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          className="label"
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          Accom
                        </p>
                        <p
                          className="label"
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                            payload[0].payload.accomplishment
                          )}`}</span>
                        </p>
                      </div>
                    </Card>
                  </Grid>
                ) : undefined}
                {checkState.remaining ? (
                  <Grid item xs={4} md={4}>
                    <Card
                      variant={"outlined"}
                      style={{ backgroundColor: "#d44b3b" }}
                    >
                      <div
                        style={{
                          padding: 10,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          className="label"
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          Delay
                        </p>
                        <p
                          className="label"
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                            payload[0].payload.remaining
                          )}`}</span>
                        </p>
                      </div>
                    </Card>
                  </Grid>
                ) : undefined}

                <Grid item xs={4} md={4}>
                  <Card
                    variant={"outlined"}
                    style={{
                      backgroundColor: "#fff",
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 3,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 20,
                      }}
                    >
                      <p
                        className="label"
                        style={{
                          fontSize: 13.6,
                          color: "#27ae60",
                          fontWeight: "bold",
                        }}
                      >
                        VALID
                      </p>
                      <p
                        className="label"
                        style={{
                          fontSize: 13.6,
                          color: "#27ae60",
                          fontWeight: "bold",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                          payload[0].payload.valid
                        )}`}</span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 20,
                      }}
                    >
                      <p
                        className="label"
                        style={{
                          fontSize: 13.6,
                          color: "#d35400",
                          fontWeight: "bold",
                        }}
                      >
                        INVALID
                      </p>
                      <p
                        className="label"
                        style={{
                          fontSize: 13.6,
                          color: "#d35400",
                          fontWeight: "bold",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                          payload[0].payload.invalid
                        )}`}</span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 30,
                      }}
                    >
                      <p
                        className="label"
                        style={{
                          fontSize: 13.6,
                          color: "#2c3e50",
                          fontWeight: "bold",
                        }}
                      >
                        REMAINING
                      </p>
                      <p
                        className="label"
                        style={{
                          fontSize: 13.6,
                          color: "#2c3e50",
                          fontWeight: "bold",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                          payload[0].payload.count_to_validate_stack
                        )}`}</span>
                      </p>
                    </div>
                  </Card>
                </Grid>
              </Grid>
              {/* {checkState.re_out_assigned ?
            <Grid item xs={4} md={4}>
              <Card variant={"outlined"} style={{ backgroundColor: '#009DCF' }}>
                <div style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Re-out Assigned</p>
                  <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>{`${formatNumber(payload[0].payload.re_out_assigned)}`}</span></p>
                </div>
              </Card>
            </Grid>
            : undefined
          }
          {checkState.re_out_unassigned ?
             <Grid item xs={4} md={4}>
             <Card variant={"outlined"} style={{ backgroundColor: '#FF6103' }}>
               <div style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                 <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Re-out Unssigned</p>
                 <p className="label" style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>{`${formatNumber(payload[0].payload.re_out_unassigned)}`}</span></p>
               </div>
             </Card>
           </Grid>
            : undefined
          } */}
            </Grid>
            {payload[0].payload.appeal_requests_justification !== "" ? (
              <Grid item xs={12} md={12}>
                <Card style={{ background: "#faebaf" }}>
                  <div style={{ padding: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        style={{ fontSize: 12.5, fontWeight: "bold" }}
                      >
                        Appeal Justification
                      </Typography>
                      <Typography
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color:
                            payload[0].payload.appeal_status === "Approved"
                              ? "#6ab04c"
                              : "#e74c3c",
                        }}
                      >
                        {payload[0].payload.appeal_status}
                      </Typography>
                    </div>

                    <Card
                      variant="outlined"
                      style={{ background: "#faf0ca", padding: 5 }}
                    >
                      <Typography
                        style={{
                          fontSize: 12.5,
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        Approver
                      </Typography>
                      {payload[0].payload.approver_hierarchy.map(
                        (val, index) => {
                          let payroll_status = "PENDING";
                          if (
                            parseInt(payload[0].payload.req_hierarchy_level) >
                            index
                          ) {
                            payroll_status = "APPROVED";
                          }
                          return (
                            <div style={{ marginLeft: 15 }}>
                              {val.approver.map((approver, index_approver) => {
                                return (
                                  <Typography
                                    style={{
                                      fontSize: 12.5,
                                      marginTop: 5,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {approver.name}{" "}
                                    <span
                                      style={{
                                        marginLeft: 10,
                                        color:
                                          payroll_status == "APPROVED"
                                            ? "#6ab04c"
                                            : "#e74c3c",
                                      }}
                                    >
                                      {payroll_status}
                                    </span>
                                  </Typography>
                                );
                              })}
                            </div>
                          );
                        }
                      )}
                    </Card>
                    <Card
                      variant="outlined"
                      style={{
                        background: "#faf0ca",
                        marginTop: 5,
                        padding: 5,
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 12.5,
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        Appeal Percentage : {payload[0].payload.approved_hours}%
                      </Typography>

                      <Typography style={{ fontSize: 13.5 }}>
                        {payload[0].payload.appeal_requests_justification}
                      </Typography>
                    </Card>
                  </div>
                </Card>
              </Grid>
            ) : undefined}
          </Grid>
        ) : undefined}
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
export default function Barline2({
  checkState,
  summary,
  dataFilter,
  company_id,
  jo_type,
  getdateDetails,
}) {
  // static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';
  let history = useHistory();
  const dispatch = useDispatch();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <p style={{color:'#fff'}}>{summary[0].assigned}</p> */}
      <ResponsiveContainer>
        <ComposedChart
          onClick={(e) => {
            if (typeof e.activePayload[0].payload.assigned !== "undefined") {
              let data = {
                parameter: "branch_id",
                selection: [dataFilter.branch_id],
                from: moment(e.activePayload[0].payload.date).format(
                  "YYYY-MM-DD"
                ),
                to: moment(e.activePayload[0].payload.date).format(
                  "YYYY-MM-DD"
                ),
                company_id: company_id,
                jo_type: jo_type,
              };
              getdateDetails(data);
              //  localStorage.setItem('onSelectSingleDateGraph',JSON.stringify(data))
              //  history.push("/map/");
            }
          }}
          style={{ cursor: "pointer" }}
          width={500}
          height={300}
          data={summary}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis tick={{ fill: "#fff" }} dataKey="name" scale="band" />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            position={{ y: -250 }}
            content={<CustomTooltip checkState={checkState} />}
          />

          {/* <Legend /> */}
          {/* <Bar dataKey="average_assign"  stackId="a" fill="#d35400" /> */}
          {checkState.assigned ? (
            <Bar dataKey="assigned" stackId="a" fill="#004987" />
          ) : undefined}
          {/* {checkState.re_out_assigned ?
              <Bar dataKey="re_out_assigned" stackId="a" fill="#009DCF" />
              : undefined
            } */}
          {checkState.unassigned ? (
            <Bar dataKey="unassigned" stackId="a" fill="#f39c12" />
          ) : undefined}
          {/* <Bar dataKey="count_to_validate_stack" stackId="b" fill="#95a5a6" />
           <Bar dataKey="invalid" stackId="b" fill="#d35400" />
           <Bar dataKey="valid" stackId="b" fill="#27ae60" />  */}

          {/* {checkState.re_out_unassigned ?
              <Bar dataKey="re_out_unassigned" stackId="a" fill="#FF6103" />
              : undefined
            } */}

          {checkState.accomplishment ? (
            <Line
              strokeWidth={3}
              type="monotone"
              dataKey="accomplishment"
              stroke="#2bad62"
            />
          ) : undefined}
          {checkState.remaining ? (
            <Line
              strokeWidth={3}
              type="monotone"
              dataKey="remaining"
              stroke="#e74c3c"
              dot={<CustomizedDot />}
            />
          ) : undefined}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
