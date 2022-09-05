import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import "./css/summary.css";
import { width } from "dom-helpers";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import Filter from "./filter";
export default function Dashboard({ setIndexState }) {
  const dispatch = useDispatch();
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const [state, setState] = React.useState({
    filter: false,
    company_id: "",
    branch_id: "",
    filter_date_start: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ),
    filter_date_end: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ),
    job_order_type: "",
    type: "",
    array_dashboard: [
      {
        type: "TOTAL",
        value: 0,
        percentage: "",
        color: "#9b59b6",
      },
      {
        type: "BACKLOG LAST MONTH",
        value: 0,
        percentage: "",
        color: "#004987",
      },
      {
        type: "ACCOMPLISHED",
        value: 0,
        percentage: 0,
        color: "#2bad62",
      },
      {
        type: "UNDELIVERED",
        value: 0,
        percentage: 0,
        color: "#d44b3b",
      },
    ],
    array_dashboard2: [
      {
        type: "TOTAL RE-OUT",
        value: 0,
        percentage: "",
        color: "",
      },
      {
        type: "ASSIGNED RE-OUT",
        value: 0,
        percentage: 0,
        color: "",
      },
      {
        type: "ACCOMPLISHED RE-OUT",
        value: 0,
        percentage: 0,
        color: "",
      },
      {
        type: "UNDELIVERED RE-OUT",
        value: 0,
        percentage: 0,
        color: "",
      },
      {
        type: "AVE. ASSIGN PER FIELDMAN",
        value: 0,
        percentage: "",
        color: "",
      },
      {
        type: "AVE. ACCOM PER DAY",
        value: 0,
        percentage: "",
        color: "",
      },
    ],
    branch_name: "",
    jo_type: "",
  });
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  const closeModal = () => {
    setState((prev) => ({ ...prev, filter: false }));
  };
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  React.useEffect(() => {
    getBranches();
  }, []);

  const getBranches = React.useCallback(async function getBranches() {
    dispatch_data("loading_map", true);
    await getData("HumanResource/getHandleBranch", {
      user_id: localStorage.getItem("u"),
    }).then((response) => {
      //   let match_branch = response.response.filter(
      //     (val, index) => parseInt(val.company_id) === branches.Selectedcompany
      //   );
      let company = [];
      let matchCompany = false;
      response.response.map((item, index) => {
        let match = false;
        company.map((val) => {
          if (val.company_name == item.company_name) {
            match = true;
          }
        });
        if (!match) {
          company.push({
            company_name: item.company_name,
            company_id: item.company_id,
          });
        }
        if (item.company_id === "6") {
          matchCompany = true;
        }
      });
      let match_branch = [];
      let branch_id = "";
      let company_id = "";
      let branch_name = "";
      let jo_type_val = [];
      let jo_type_data = [];
      let job_position = "";
      // if (matchCompany) {
      //     match_branch = response.response.filter(
      //         (val, index) => (parseInt(val.company_id) === 6 && (val.branch_field_work) !== "")
      //     );
      //     match_branch.sort(function (a, b) {
      //         return a["branch_name"].localeCompare(b["branch_name"]);
      //     });
      //     match_branch.forEach((val, index) => {
      //         if ((val.branch_field_work) !== "") {
      //             if (branch_id == "") {
      //                 branch_id = val.branch_id
      //                 company_id = 6
      //                 branch_name = val.branch_name
      //                 let jo_type = JSON.parse(val.branch_field_work)
      //                 jo_type_val = jo_type[0]
      //                 jo_type_data = jo_type
      //                 if (val.branch_field_personnel !== "") {
      //                     let user_pos = JSON.parse(val.branch_field_personnel);
      //                     job_position = user_pos[0];
      //                 }
      //             }
      //         }
      //     })

      // } else {
      //     response.response.forEach(
      //         (val, index) => {
      //             if ((val.branch_field_work) !== "") {
      //                 if (branch_id == "") {
      //                     branch_id = val.branch_id
      //                     company_id = val.company_id
      //                     branch_name = val.branch_name
      //                     let jo_type = JSON.parse(match_branch[0].branch_field_work)
      //                     jo_type_val = jo_type[0]
      //                     jo_type_data = jo_type
      //                     if (val.branch_field_personnel !== "") {
      //                         let user_pos = JSON.parse(val.branch_field_personnel);
      //                         job_position = user_pos[0];
      //                     }
      //                 }
      //             }
      //         }
      //     );
      // }

      let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph");

      if (onSelectData !== null) {
        let data_route = JSON.parse(onSelectData);

        response.response.forEach((val, index) => {
          if (val.branch_field_work !== "") {
            if (parseInt(val.branch_id) === parseInt(data_route.selection[0])) {
              branch_id = val.branch_id;
              company_id = val.company_id;
              branch_name = val.branch_name;
              let jo_type = JSON.parse(val.branch_field_work);
              jo_type_val = jo_type[0];
              jo_type_data = jo_type;
              if (val.branch_field_personnel !== "") {
                let user_pos = JSON.parse(val.branch_field_personnel);
                job_position = user_pos[0];
              }
            }
            if (company_id === val.company_id) {
              match_branch.push(val);
            }
          }
        });

        dispatch_data("job_position", job_position);
        home_reducer.handleBranch = response.response;
        home_reducer.company_name = company;
        home_reducer.SelectedBranches = match_branch;
        setState((prev) => ({ ...prev, branch_id, company_id: company_id }));

        dispatch({
          type: "JobOrderType",
          data: jo_type_data,
        });
        get_accom_report(
          state.filter_date_start,
          state.filter_date_end,
          branch_id,
          company_id,
          branch_name,
          data_route.jo_type
        );
      }
      // else{
      //     get_accom_report(state.filter_date_start, state.filter_date_end, branch_id, company_id, branch_name, [jo_type_val])
      // }
    });
  }, []);
  const get_accom_report = (
    filter_date_start,
    filter_date_end,
    bid,
    c_id,
    b_name,
    jo_type_val
  ) => {
    dispatch_data("loading_map", true);
    var oneDay = 24 * 60 * 60 * 1000;
    var date1 = new Date(filter_date_start + " " + "00:00");
    var date2 = new Date(filter_date_end + " " + "00:00");
    var diffDays = Math.abs((date1.getTime() - date2.getTime()) / oneDay);
    let data = {
      firstDay: moment(filter_date_start).format("YYYY-MM-DD"),
      currentDay: moment(filter_date_end).format("YYYY-MM-DD"),
      branch_id: bid,
      diffDays: diffDays,
      jo_type: jo_type_val,
    };

    getData("tracking/summary_report_accom_version2", data).then((res) => {
      let assigned = res.new_accom.reduce((count, val) => {
        return (count += val.assigned);
      }, 0);
      let unassign = res.new_accom.reduce((count, val) => {
        return (count += val.unassigned);
      }, 0);
      let accom = res.new_accom.reduce((count, val) => {
        return (count += val.accomplishment);
      }, 0);
      let remaining = res.new_accom.reduce((count, val) => {
        return (count += val.remaining);
      }, 0);
      let fieldman = res.new_accom.reduce((count, val) => {
        return (count += val.fieldman);
      }, 0);
      let total = res.new_accom.reduce((count, val) => {
        return (count += val.current_day_total_jo);
      }, 0);
      let assigned_reout = res.new_accom.reduce((count, val, index) => {
        if (index === res.new_accom.length - 1) {
          count += val.re_out_assigned;
        }
        return count;
      }, 0);
      let unassigned_reout = res.new_accom.reduce((count, val, index) => {
        if (index === res.new_accom.length - 1) {
          count += val.re_out_unassigned;
        }
        return count;
      }, 0);
      let total_reout = res.new_accom.reduce((count, val, index) => {
        if (index === res.new_accom.length - 2) {
          count = val.unassigned + val.remaining + val.re_out_unassigned;
        }
        if (res.new_accom.length === 1) {
          count = val.total_reout;
        }
        return count;
      }, 0);
      let re_out_accom = res.new_accom.reduce((count, val, index) => {
        if (index === res.new_accom.length - 1) {
          count += val.re_out_accom;
        }
        return count;
      }, 0);
      let backlog_last_month = res.new_accom.reduce((count, val, index) => {
        if (index === 0) {
          count = val.total_reout;
        }
        return count;
      }, 0);
      let array_dashboard = [
        {
          type: "TOTAL",
          value: total,
          percentage: "",
          color: "#9b59b6",
        },
        {
          type: "BACKLOG LAST MONTH",
          value: backlog_last_month,
          percentage: "",
          color: "#004987",
        },
        {
          type: "ACCOMPLISHED",
          value: accom,
          percentage: (accom / total) * 100,
          color: "#2bad62",
        },
        {
          type: "UNDELIVERED",
          value: backlog_last_month + total - accom,
          percentage:
            backlog_last_month + total - accom < 0
              ? 0
              : ((backlog_last_month + total - accom) / total) * 100,
          color: "#d44b3b",
        },
      ];
      let array_dashboard2 = [
        {
          type: "TOTAL RE-OUT",
          value: total_reout,
          percentage: "",
          color: "",
        },
        {
          type: "ASSIGNED RE-OUT",
          value: assigned_reout,
          percentage: (assigned_reout / total_reout) * 100,
          color: "",
        },
        {
          type: "ACCOMPLISHED RE-OUT",
          value: re_out_accom,
          percentage: (re_out_accom / total_reout) * 100,
          color: "",
        },
        // {
        //     type: 'UNASSIGNED RE-OUT', value: unassigned_reout, percentage: (unassigned_reout / total_reout) * 100, color: ''
        // },
        {
          type: "UNDELIVERED RE-OUT",
          value: total_reout - re_out_accom,
          percentage: ((total_reout - re_out_accom) / total_reout) * 100,
          color: "",
        },
        {
          type: "AVE. ASSIGN PER FIELDMAN",
          value: assigned / fieldman,
          percentage: "",
          color: "",
        },
        {
          type: "AVE. ACCOM PER DAY",
          value: accom / res.count_accom,
          percentage: "",
          color: "",
        },
      ];
      var date = new Date(filter_date_end);
      var lastDay = filter_date_end;
      let new_accom = res.new_accom;
      if (
        moment(filter_date_start).format("MM") === moment(lastDay).format("MM")
      ) {
        if (res.new_accom.length > 0) {
          let last_date = res.new_accom[res.new_accom.length - 1].date;
          let new_date = moment(last_date).format("DD");
          let last_date_of_month = moment(lastDay).format("DD");
          let diff = last_date_of_month - new_date;
          for (let index = 0; index < diff; index++) {
            let date_last_accom = new Date(last_date);
            date_last_accom.setDate(date_last_accom.getDate() + (index + 1));
            new_accom.push({
              accomplishment: undefined,
              assigned: undefined,
              average_assign: undefined,
              date: moment(date_last_accom).format("YYYY-MM-DD"),
              fieldman: undefined,
              name: moment(date_last_accom).format("MMM-DD"),
              re_out: undefined,
              re_out_assigned: undefined,
              re_out_unassigned: undefined,
              remaining: undefined,
              total_jo: undefined,
              unassigned: undefined,
            });
          }
        }
      }
      // let new_data = {
      //     firstDay: moment(filter_date_start).format("YYYY-MM-DD"),
      //     currentDay: moment(filter_date_end).format("YYYY-MM-DD"),
      //     branch_id: bid,
      //     diffDays: diffDays,
      //     jo_type: jo_type_val
      // };
      //
      // let onSelectData_array = JSON.parse(sessionStorage.getItem("onSelectSingleDateGraph"))
      // onSelectData_array.selection = [parseInt(data.branch_id)]
      // onSelectData_array.jo_type = data.jo_type_val
      // sessionStorage.setItem('onSelectSingleDateGraph', JSON.stringify(onSelectData_array))

      dispatch_data("loading_map", false);
      setState({
        ...state,
        count_accom: res.count_accom,
        filter: false,
        branch_name: b_name,
        summary: res.new_accom,
        array_dashboard: array_dashboard,
        show_bar: true,
        filter_date_start: filter_date_start,
        filter_date_end: filter_date_end,
        branch_id: bid,
        company_id: c_id,
        jo_type: jo_type_val,
        type: "",
        array_dashboard2: array_dashboard2,
      });
      setIndexState((prev) => ({
        ...prev,
        dataFilter: data,
        summary: res.new_accom,
        company_id: c_id,
        jo_type: jo_type_val,
      }));
    });
  };

  return (
    <div className="dashboard-summary ">
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setState((prev) => ({ ...prev, filter: true }))}
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
            <Card
              className="card-color-data-summary"
              style={{ padding: 5, marginRight: 5 }}
            >
              <Typography style={{ color: "#fff" }}>{state.jo_type}</Typography>
            </Card>
            <Card
              className="card-color-data-summary"
              style={{ padding: 5, marginRight: 5 }}
            >
              <Typography style={{ color: "#fff" }}>
                {state.branch_name}
              </Typography>
            </Card>
            <Card
              className="card-color-data-summary"
              style={{ padding: 5, marginRight: 5 }}
            >
              <Typography style={{ color: "#fff" }}>
                {moment(state.filter_date_start).format("LL") +
                  " - " +
                  moment(state.filter_date_end).format("LL")}
              </Typography>
            </Card>
          </div>
        </Grid>
        {state.array_dashboard.map((val, index) => {
          return (
            <Grid item xs={12} md={2} key={index}>
              <Card
                variant="outlined"
                style={{
                  padding: 10,
                  backgroundColor: val.color,
                  opacity: 0.9,
                }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      className="text-color-white"
                      style={{ fontSize: 13 }}
                    >
                      {val.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography
                      className="text-color-white"
                      style={{ fontSize: 25, textAlign: "center" }}
                    >
                      {formatNumber(val.value)}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: 17,
                        textAlign: "center",
                        color:
                          val.type !== "TOTAL" &&
                          val.type !== "BACKLOG LAST MONTH"
                            ? "#fff"
                            : val.color,
                        fontWeight: "bold",
                      }}
                    >
                      {isNaN(val.percentage)
                        ? 0
                        : parseFloat(val.percentage).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })}
        {state.array_dashboard2.map((val, index) => {
          if (
            val.type === "AVE. ASSIGN PER FIELDMAN" ||
            val.type === "AVE. ACCOM PER DAY"
          )
            return (
              <Grid item xs={12} md={2}>
                <Card
                  key={index}
                  className="card-color-data-summary"
                  style={{ height: 70, padding: 10, marginRight: 8 }}
                >
                  <div>
                    <Typography
                      style={{
                        textAlign: "left",
                        color: "#fff",
                        fontSize: 12.5,
                        fontWeight: "bold",
                      }}
                    >
                      {val.type}
                    </Typography>
                    <Typography
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {isNaN(val.value) ? 0 : formatNumber(parseInt(val.value))}
                    </Typography>
                    <Typography
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 15,
                      }}
                    >
                      {val.percentage !== ""
                        ? isNaN(val.percentage)
                          ? 0
                          : parseFloat(val.percentage).toFixed(2) + "%"
                        : undefined}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            );
        })}
        <Grid item xs={12} md={2}>
          {/* <Card className='card-color-data-summary '>
                  
                        <Grid container spacing={0}>
                        <Grid item xs={12} md={12}>
                            <Typography style={{color:'#3498db',fontWeight:'bold'}}>TOTAL</Typography>
                         </Grid>
                         <Grid item xs={12} md={12}>
                            <Typography style={{fontSize:25,textAlign:'center',color:'#3498db',fontWeight:'bold'}}>56,352</Typography>
                            <Typography style={{fontSize:15,textAlign:'center',color:'#fff'}}>10%</Typography>

                         </Grid>
                        </Grid>
                   
                </Card> */}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {state.array_dashboard2.map((val, index) => {
          if (
            val.type !== "AVE. ASSIGN PER FIELDMAN" &&
            val.type !== "AVE. ACCOM PER DAY"
          )
            return (
              <Grid item xs={12} md={2}>
                <Card
                  key={index}
                  className="card-color-data-summary"
                  style={{ height: 70, padding: 10, marginRight: 8 }}
                >
                  <div>
                    <Typography
                      style={{
                        textAlign: "left",
                        color: "#fff",
                        fontSize: 12.5,
                        fontWeight: "bold",
                      }}
                    >
                      {val.type}
                    </Typography>
                    <Typography
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {isNaN(val.value) ? 0 : formatNumber(parseInt(val.value))}
                    </Typography>
                    <Typography
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 15,
                      }}
                    >
                      {val.percentage !== ""
                        ? isNaN(val.percentage)
                          ? 0
                          : parseFloat(val.percentage).toFixed(2) + "%"
                        : undefined}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            );
        })}
      </Grid>
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
          <Filter
            company_id={state.company_id}
            branch_id={state.branch_id}
            filter_date_start={state.filter_date_start}
            filter_date_end={state.filter_date_end}
            get_accom_report={get_accom_report}
            closeModal={() => closeModal()}
            job_order_type={state.job_order_type}
            jo_type={state.jo_type}
            onReset={() => setState({ ...state, type: "" })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
