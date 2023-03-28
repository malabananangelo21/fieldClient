import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
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
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ReorderIcon from "@material-ui/icons/Reorder";
import {
  HashRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import MapIcon from "@material-ui/icons/Map";
import imglogo from "../../media/field_logo.gif";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import PublicIcon from "@material-ui/icons/Public";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Menu from "@material-ui/core/Menu";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Auth from "../../auth";
import { Scrollbars } from "react-custom-scrollbars";
import Routes from "../../routes";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import Drawer from "@material-ui/core/Drawer";
let width = window.innerWidth;

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
});
export default function Home() {
  const classes = useStyles();
  const map_reducer = useSelector((state) => state.map_reducer);
  const navigation_reducer = useSelector((state) => state.navigation_reducer);

  React.useEffect(() => {
    getPriviledge();
  }, []);
  const [state, setState] = React.useState({
    navigation: [],
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getPriviledge = () => {
    let mapOtion = localStorage.getItem("MapOption");
    if (typeof mapOtion == "undefined") {
      localStorage.setItem("MapOption", "HYBRID");
    }
    getData("audit/getappHomeNav", {
      app_id: 13,
      user_id: localStorage.getItem("u"),
    }).then((response) => {
      dispatch_data("appNav", response.appHomeNav);
      let match_nav = [];
      response.appHomeNav.forEach((val) => {
        if (val.parent_name === "summaryAccomplishments") {
          match_nav.push("summaryAccomplishments");
        }
        if (val.parent_name === "trackCoordinates") {
          match_nav.push("trackCoordinates");
        }
        if (val.href === "/clientMap") {
          match_nav.push("clientMap");
        }
        if (val.href === "/newmap/") {
          match_nav.push("newmap");
        }
      });
      setState((prev) => ({ ...prev, navigation: match_nav }));
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.replace("https://client.fieldplus.gzonetechph.com/#/");
      // window.location.replace("http://localhost:3000/#/")
      window.location.reload();
    }
  };
  Routes.sort(function (a, b) {
    return a["page_name"].localeCompare(b["page_name"]);
  });

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        style={{
          paddingLeft: 10,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#115293",
        }}
      >
        <div>
          <Typography
            style={{ fontSize: 11, color: "#fff", fontWeight: "bold" }}
          >
            Navigation
          </Typography>
          <div style={{ display: "flex" }}>
            <Icon style={{ marginRight: 10, color: "#fff" }}>
              {"account_circle"}
            </Icon>
            <Typography style={{ fontSize: 13, color: "#fff" }}>
              {navigation_reducer.userLoginData.complete_name}
            </Typography>
          </div>
        </div>

        <div style={{ marginRight: 10 }}>
          <Tooltip onClick={() => logout()} title="Logout">
            <ExitToAppIcon style={{ color: "#fff", cursor: "pointer" }} />
          </Tooltip>
          <Typography style={{ color: "#fff", fontSize: 11 }}>
            Logout
          </Typography>
        </div>
      </List>
      <Divider />
      <List>
        {state.navigation.filter((val) => val === "newmap").length > 0 ? (
          <>
            <ListItem button onClick={() => history.push("/map")}>
              <ListItemIcon>
                {" "}
                <HomeIcon style={{ color: "#115293" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography style={{ fontSize: 12 }}>MAIN</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => history.push("/summaryAccomplishments")}
            >
              <ListItemIcon>
                {" "}
                <DateRangeIcon style={{ color: "#115293" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: 12 }}>SUMMARY</Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => history.push("/trackCoordinates")}>
              <ListItemIcon>
                {" "}
                <MapIcon style={{ color: "#115293" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography style={{ fontSize: 12 }}>AREA</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => history.push("/MapAssigning")}>
              <ListItemIcon>
                {" "}
                <AssignmentIndIcon style={{ color: "#115293" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: 12 }}>ASSIGNING</Typography>
                }
              />
            </ListItem>
            <Divider />
          </>
        ) : undefined}
        {state.navigation.filter((val) => val === "clientMap").length > 0 &&
        state.navigation.filter((val) => val === "newmap").length > 0 ? (
          <ListItem button onClick={() => history.push("/clientMap")}>
            <ListItemIcon>
              {" "}
              <WorkIcon style={{ color: "#115293" }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography style={{ fontSize: 12 }}>ACCOM</Typography>}
            />
          </ListItem>
        ) : undefined}
        {state.navigation.filter((val) => val === "clientMap").length > 0 &&
        state.navigation.filter((val) => val === "newmap").length == 0 ? (
          <ListItem button onClick={() => history.push("/map")}>
            <ListItemIcon>
              {" "}
              <WorkIcon style={{ color: "#115293" }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography style={{ fontSize: 12 }}>ACCOM</Typography>}
            />
          </ListItem>
        ) : undefined}
        {state.navigation.filter((val) => val === "clientMap").length > 0 ? (
          <Divider />
        ) : undefined}
        {Routes.map((value, index) => {
          let match = navigation_reducer.appNav.filter(
            (val) => val.parent_name == value.page_name
          );
          if (match.length > 0)
            return (
              <>
                <ListItem button onClick={() => history.push(value.path)}>
                  <ListItemIcon>
                    <Icon style={{ marginRight: 10, color: "#115293" }}>
                      {value?.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography style={{ fontSize: 12 }}>
                        {String(value.page_name).toLocaleUpperCase()}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            );
        })}
      </List>
    </div>
  );
  const onSelectMap = (map_type) => {
    localStorage.setItem("MapOption", map_type);
    dispatch_data("MapReducerState", { refresh: !map_reducer.refresh });
    handleClose();
  };

  let history = useHistory();

  return (
    <>
      {window.location.href.split("/")[4] !== "" && (
        <div className="top-nav" id="topNav">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            <div>
              <Avatar
                noWrap
                variant="square"
                alt="picture"
                src={imglogo}
                style={{ width: 125, height: "auto" }}
              />
              {/* <Typography variant={'p'} style={{color:'#115293',fontWeight:'bold',fontSize:20}}>FIELD TRACKING SYSTEM</Typography> */}
            </div>
            {width > 600 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {state.navigation.filter((val) => val === "newmap").length >
                0 ? (
                  <>
                    {navigation_reducer.appNav[0].user_id ===
                    "0" ? undefined : (
                      <>
                        <div
                          onClick={() => history.push("/map")}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: 20,
                            cursor: "pointer",
                          }}
                        >
                          <HomeIcon style={{ color: "#115293" }} />
                          <span style={{ fontSize: 11, color: "#115293" }}>
                            MAIN
                          </span>
                        </div>
                        <div
                          onClick={() =>
                            history.push("/summaryAccomplishments")
                          }
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: 20,
                            cursor: "pointer",
                          }}
                        >
                          <DateRangeIcon style={{ color: "#115293" }} />
                          <span style={{ fontSize: 11, color: "#115293" }}>
                            SUMMARY
                          </span>
                        </div>
                      </>
                    )}
                    <div
                      onClick={() => history.push("/trackCoordinates")}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: 20,
                        cursor: "pointer",
                      }}
                    >
                      <MapIcon style={{ color: "#115293" }} />
                      <span style={{ fontSize: 11, color: "#115293" }}>
                        AREA
                      </span>
                    </div>
                    {navigation_reducer.appNav[0].user_id ===
                    "0" ? undefined : (
                      <div
                        onClick={() => history.push("/MapAssigning")}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginRight: 20,
                          cursor: "pointer",
                        }}
                      >
                        <AssignmentIndIcon style={{ color: "#115293" }} />
                        <span style={{ fontSize: 11, color: "#115293" }}>
                          ASSIGNING
                        </span>
                      </div>
                    )}
                    {/* <div onClick={() => history.push("/returnedJO")} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20, cursor: 'pointer' }}>
                    <AssignmentReturnedIcon style={{ color: "#115293" }} />
                    <span style={{ fontSize: 11, color: '#115293' }}>Returned JO</span>
                </div> */}
                  </>
                ) : undefined}
                {state.navigation.filter((val) => val === "clientMap").length >
                  0 &&
                state.navigation.filter((val) => val === "newmap").length >
                  0 ? (
                  <div
                    onClick={() => history.push("/clientMap")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: 20,
                      cursor: "pointer",
                    }}
                  >
                    <WorkIcon style={{ color: "#115293" }} />
                    <span style={{ fontSize: 11, color: "#115293" }}>
                      ACCOM
                    </span>
                  </div>
                ) : undefined}
                {state.navigation.filter((val) => val === "clientMap").length >
                  0 &&
                state.navigation.filter((val) => val === "newmap").length ==
                  0 ? (
                  <div
                    onClick={() => history.push("/map")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: 20,
                      cursor: "pointer",
                    }}
                  >
                    <WorkIcon style={{ color: "#115293" }} />
                    <span style={{ fontSize: 11, color: "#115293" }}>
                      ACCOM
                    </span>
                  </div>
                ) : undefined}
                {/* <div onClick={() => history.push("/examMap")} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20, cursor: 'pointer' }}>
                <AssignmentTurnedInIcon style={{ color: "#115293" }} />
                <span style={{ fontSize: 11, color: '#115293' }}>EXAM</span>
            </div> */}
                {navigation_reducer.appNav.length < 5 &&
                  Routes.map((value, index) => {
                    let match = navigation_reducer.appNav.filter(
                      (val) => val.parent_name == value.page_name
                    );
                    if (match.length > 0)
                      return (
                        <div
                          onClick={() => history.push(value.path)}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: 20,
                            cursor: "pointer",
                          }}
                        >
                          <Icon style={{ marginRight: 10, color: "#115293" }}>
                            {value?.icon}
                          </Icon>
                          <span
                            style={{
                              fontSize: 11,
                              color: "#115293",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {String(value.page_name).toLocaleUpperCase()}
                          </span>
                        </div>
                      );
                  })}
              </div>
            ) : undefined}

            <div style={{ display: "flex" }}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <PublicIcon style={{ color: "#115293" }} />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    onSelectMap("ROAD MAP");
                  }}
                >
                  ROAD MAP
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onSelectMap("SATELLITE");
                  }}
                >
                  SATELLITE
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onSelectMap("HYBRID");
                  }}
                >
                  HYBRID
                </MenuItem>
              </Menu>
              <div>
                {["right"].map((anchor) => (
                  <div key={anchor}>
                    <IconButton
                      onClick={toggleDrawer(anchor, true)}
                      style={{ background: "none", marginRight: 12 }}
                    >
                      <ReorderIcon
                        style={{ color: "#115293", cursor: "pointer" }}
                      />
                    </IconButton>

                    <SwipeableDrawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </div>
                ))}
              </div>
            </div>

            {/* <div onClick={() => history.push("/attendance")} style={{display:'flex',flexDirection:'column',alignItems:'center',marginRight:20,cursor:'pointer'}}>
            <AccessAlarmsIcon style={{ color: "#fff" }} />
            <span style={{ fontSize: 11, color: '#fff' }}>ATTENDANCE</span>
        </div>
        <div onClick={() => history.push("/attendance")} style={{display:'flex',flexDirection:'column',alignItems:'center',marginRight:20,cursor:'pointer'}}>
            <AccessAlarmsIcon style={{ color: "#fff" }} />
            <span style={{ fontSize: 12.2, color: '#fff' }}>ATTENDANCE</span>
        </div>           */}

            {/* <IconButton
    aria-label="delete"
    style={{
    backgroundColor: "#1b5ea0",
    marginRight: 5,
    width: 40,
    height: 40,
    }}
>
    <QueryBuilderIcon style={{ color: "#fff" }} />
</IconButton> */}
          </div>
        </div>
      )}
    </>
  );
}
