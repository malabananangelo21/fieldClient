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
import "../css/summary.css";
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
          width: 600,
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <DateRangeIcon style={{ marginRight: 5, color: "#115293" }} />
              <p style={{}}>{moment(payload[0].payload.date).format("LL")}</p>
            </div>
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
          <Grid item xs={4} md={4}>
            <Card variant={"outlined"} style={{ backgroundColor: "#9b59b6" }}>
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
                  style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                >
                  TOTAL
                </p>
                <p
                  className="label"
                  style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                >
                  <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                    payload[0].payload.total_jo
                  )}`}</span>
                </p>
              </div>
            </Card>
          </Grid>
          {checkState.assigned ? (
            <Grid item xs={4} md={4}>
              <Card variant={"outlined"} style={{ backgroundColor: "#004987" }}>
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
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    Assigned
                  </p>
                  <p
                    className="label"
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                      payload[0].payload.assigned
                    )}`}</span>
                  </p>
                </div>
              </Card>
            </Grid>
          ) : undefined}
          {checkState.unassigned ? (
            <Grid item xs={4} md={4}>
              <Card variant={"outlined"} style={{ backgroundColor: "#f39c12" }}>
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
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    Unassigned
                  </p>
                  <p
                    className="label"
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                      payload[0].payload.unassigned
                    )}`}</span>
                  </p>
                </div>
              </Card>
            </Grid>
          ) : undefined}
          {checkState.accomplishment ? (
            <Grid item xs={4} md={4}>
              <Card variant={"outlined"} style={{ backgroundColor: "#2bad62" }}>
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
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    Accomplished
                  </p>
                  <p
                    className="label"
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                      payload[0].payload.accomplishment
                    )}`}</span>
                  </p>
                </div>
              </Card>
            </Grid>
          ) : undefined}
          {checkState.re_out_assigned ? (
            <Grid item xs={4} md={4}>
              <Card variant={"outlined"} style={{ backgroundColor: "#009DCF" }}>
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
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    Re-out Assigned
                  </p>
                  <p
                    className="label"
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                      payload[0].payload.re_out_assigned
                    )}`}</span>
                  </p>
                </div>
              </Card>
            </Grid>
          ) : undefined}
          {checkState.re_out_unassigned ? (
            <Grid item xs={4} md={4}>
              <Card variant={"outlined"} style={{ backgroundColor: "#FF6103" }}>
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
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    Re-out Unssigned
                  </p>
                  <p
                    className="label"
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                      payload[0].payload.re_out_unassigned
                    )}`}</span>
                  </p>
                </div>
              </Card>
            </Grid>
          ) : undefined}
          {checkState.remaining ? (
            <Grid item xs={4} md={4}>
              <Card variant={"outlined"} style={{ backgroundColor: "#d44b3b" }}>
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
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    Delay
                  </p>
                  <p
                    className="label"
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    <span style={{ fontWeight: "bold" }}>{`${formatNumber(
                      payload[0].payload.remaining
                    )}`}</span>
                  </p>
                </div>
              </Card>
            </Grid>
          ) : undefined}
        </Grid>
      </div>
    );
  }

  return null;
};
export default function Barline({
  checkState,
  summary,
  dataFilter,
  company_id,
  jo_type,
}) {
  // static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';
  let history = useHistory();
  const dispatch = useDispatch();
  return (
    <div style={{ width: "100%", height: "100%" }}>
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
              sessionStorage.setItem(
                "onSelectSingleDateGraph",
                JSON.stringify(data)
              );
              history.push("/map");
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
            position={{ y: -255 }}
            content={<CustomTooltip checkState={checkState} />}
          />
          {/* <Legend /> */}
          {/* <Bar dataKey="average_assign"  stackId="a" fill="#d35400" /> */}
          {checkState.assigned ? (
            <Bar dataKey="assigned" stackId="a" fill="#004987" />
          ) : undefined}
          {checkState.re_out_assigned ? (
            <Bar dataKey="re_out_assigned" stackId="a" fill="#009DCF" />
          ) : undefined}
          {checkState.unassigned ? (
            <Bar dataKey="unassigned" stackId="a" fill="#f39c12" />
          ) : undefined}
          {checkState.re_out_unassigned ? (
            <Bar dataKey="re_out_unassigned" stackId="a" fill="#FF6103" />
          ) : undefined}
          {checkState.remaining ? (
            <Line
              strokeWidth={3}
              type="monotone"
              dataKey="remaining"
              stroke="#e74c3c"
            />
          ) : undefined}
          {checkState.accomplishment ? (
            <Line
              strokeWidth={3}
              type="monotone"
              dataKey="accomplishment"
              stroke="#2bad62"
            />
          ) : undefined}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
