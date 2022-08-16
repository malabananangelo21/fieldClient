import React from "react";
import clsx from "clsx";
import "../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import UserImage from "../../../assets/map image/user_image.png";
import moment from "moment";
import {
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import PieGrap from "./charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../api/api";
import GroupIcon from "@material-ui/icons/Group";

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

function Initial({ date_start, count_fieldman, fieldman }) {
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
  });

  const classes = useStyles();
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  return (
    <div>
      <Grid container className={classes.whiteText} spacing={2}>
        <Grid  item xs={12} md={5}>
          <Grid container className={classes.whiteText} spacing={2}>
            {/* Fieldman Start */}
            <Grid  item xs={12} md={6}>
                <div className={classes.dashboards} style={{padding:5,width:'100%',  zIndex: 2,}}>
                <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {count_fieldman + "/" + fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>
                <Grid></Grid>
              </Grid>
                </div>
                <div className={classes.dashboards} style={{padding:5,width:'100%'}}>
                <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {count_fieldman + "/" + fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>
                <Grid></Grid>
              </Grid>
                </div>
                <div className={classes.dashboards} style={{padding:5,width:'100%'}}>
                <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {count_fieldman + "/" + fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>
                <Grid></Grid>
              </Grid>
                </div>
                <div className={classes.dashboards} style={{padding:5,width:'100%'}}>
                <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {count_fieldman + "/" + fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>
                <Grid></Grid>
              </Grid>
                </div>
                <div className={classes.dashboards} style={{padding:5,width:'100%'}}>
                <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {count_fieldman + "/" + fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>
                <Grid></Grid>
              </Grid>
                </div>
                <div className={classes.dashboards} style={{padding:5,width:'100%'}}>
                <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {count_fieldman + "/" + fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>
                <Grid></Grid>
              </Grid>
                </div>
                <div className={classes.dashboards} style={{padding:5,width:'100%'}}>
                <Grid container className={classes.whiteText} spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: 18 }}>
                    {moment(date_start).format("LL")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon style={{ fontSize: 40, color: "#f39c12" }} />
                    <Typography style={{ marginLeft: 10, fontSize: 30 }}>
                      {count_fieldman + "/" + fieldman.length}
                    </Typography>
                  </div>
                  <Typography style={{ marginTop: -12, fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </Grid>
                <Grid></Grid>
              </Grid>
                </div>
            
            </Grid>
             {/* Fieldman End */}
               {/* Total Jo Start */}
            <Grid  item xs={12} md={6}>
              <Grid container className={classes.whiteText} spacing={2}>
                <div  className={classes.dashboards} style={{padding:5,width:'100%'}}>
                <Typography style={{ fontSize: 18 }}>
                    Fieldman
                  </Typography>
                </div>
              </Grid>
            </Grid>
             {/* Total Jo End */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}></Grid>
      </Grid>
    </div>
  );
}

export default Initial;
