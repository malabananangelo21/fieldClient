import React from "react";
import clsx from "clsx";
import "../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import Navigation from "./navigation/navigation";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Routes from "./routes";
import Auth from "../components/auth";
import Maps from "./apps/mapMonitoring/monitoringMapNew2";
import MapsV2 from "./apps/monitoringmapV2/home";
import AccountMasterList from "./apps/monitoringmapV2/accountsMasterList/index";
import TopNav from "./apps/monitoringmapV2/top_navigation";
import ClientMaps from "./apps/clientmapMonitoring/monitoringMapNew2";
import { getData } from "./api/api";
import { useSelector, useDispatch } from "react-redux";
import SummaryAccomplishments from "./apps/monitoringmapV2/summary_accomplishment/index";
import AddJoRoute from "./apps/monitoringmapV2/add_jo_route/index";
import FieldmanHistory from "./apps/monitoringmapV2/fieldman_history/index";
import Attendance from "./apps/monitoringmapV2/attendance/index";
import TrackingCoordinates from "./apps/./monitoringmapV2/trackCoordinates/Trackingmap";
import TrackingCoordinates2 from "./apps/./monitoringmapV2/trackCoordinatesV2/index";

import MapAssigning from "./apps/monitoringmapV2/map_assigning/AssigningMap";
import ExamMap from "./apps/monitoringmapV2/mapExam/initial";
import ReturnedJO from "./apps/monitoringmapV2/returnJo/index";
import { ClientMapProvider } from "./context/clientMapContext/ClientMap";
import ClientMap from "./apps/clientmapMonitoringVersion2/clientmap";
import LandingPage from "./landingPage";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "#2f3640",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const navigation_reducer = useSelector((state) => state.navigation_reducer);
  let filter_map = navigation_reducer.appNav.filter(
    (val2) => val2.parent_name === "Map"
  );
  let filter_map_accom = navigation_reducer.appNav.filter(
    (val2) => val2.parent_name === "Accomplishment"
  );
  let realtime = navigation_reducer.appNav.filter(
    (val2) => val2.parent_name === "Realtime"
  );

  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  // if (window.location.href.split("/")[4] === "map") {
  //   let matches = Auth("Client Map");
  //   return (
  //     <Router>
  //       <Route path="/" component={Maps} />
  //       {/* <Route exact  path="/map" component={Maps} />
  //       <Route exact  path="/map/summaryAccomplishments" component={SummaryAccomplishments} />
  //       <Route exact  path="/map/fieldmanHistory" component={FieldmanHistory} />
  //       <TopNav/> */}

  //       {/* <Route path="/map/AccountMasterList" component={AccountMasterList} /> */}
  //     </Router>
  //   );
  // } else
  // if (window.location.href.split("/")[4] === "") {
  let matches = Auth("New Map");
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={LandingPage} />
      {/* <Route  path="/" component={Maps} /> */}
      {filter_map.length > 0 ? (
        <>
          <Route exact path="/map" component={MapsV2} />
          <Route
            exact
            path="/summaryAccomplishments"
            component={SummaryAccomplishments}
          />
          {/* <Route exact  path="/fieldmanHistory" component={FieldmanHistory} /> */}
          <Route exact path="/attendance" component={Attendance} />
          <Route exact path="/addJoRoute" component={AddJoRoute} />
          <Route
            exact
            path="/trackCoordinates"
            component={TrackingCoordinates}
          />
          <Route exact path="/mapAssigning" component={MapAssigning} />
          <Route exact path="/examMap" component={ExamMap} />
          <Route exact path="/returnedJO" component={ReturnedJO} />
        </>
      ) : undefined}

      {filter_map_accom.length > 0 && filter_map.length > 0 ? (
        <ClientMapProvider>
          <Route exact path="/clientMap" component={ClientMap} />
        </ClientMapProvider>
      ) : undefined}
      {filter_map_accom.length > 0 && filter_map.length == 0 ? (
        <ClientMapProvider>
          <Route exact path="/map" component={ClientMap} />
        </ClientMapProvider>
      ) : undefined}

      <div className={classes.drawerHeader} />
      {Routes.map((value, index) => {
        return (
          <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Route
              key={index}
              exact={value.exact}
              path={value.path}
              component={Auth(value.page_name)}
            />
          </div>
        );
      })}

      <TopNav />
      {/* <Route path="/map/AccountMasterList" component={AccountMasterList} /> */}
    </Router>
  );
  // }else {
  //   return (
  //     <Router>
  //       <div className={classes.root}>
  //         <Navigation />
  //         <main
  //           className={clsx(classes.content, {
  //             [classes.contentShift]: open,
  //           })}
  //         >
  //           <div className={classes.drawerHeader} />
  //           {Routes.map((value, index) => {
  //             return (
  //               <Route
  //                 key={index}
  //                 exact={value.exact}
  //                 path={value.path}
  //                 component={Auth(value.page_name)}
  //               />
  //             );
  //           })}
  //         </main>
  //       </div>
  //     </Router>
  //   );
  // }
}

export default App;
