import React, { useEffect } from "react";
import logo from "./logo.svg";
import clsx from "clsx";
import "./App.css";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Navigation from "./components/navigation/navigation";
import Routing from "./components/router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "react-notifications/lib/notifications.css";
import Typography from "@material-ui/core/Typography";
import TestPage from "./components/apps/mapMonitoring/Comps/realtime";
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
    // padding: theme.spacing(3),
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
  const [state, setState] = React.useState({
    loginData: {
      app_id: 0,
      user_id: localStorage.getItem("u"),
    },
  });
  const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  const getUrlParam = (parameter, defaultvalue) => {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
      urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
  };
  useEffect(async () => {
    localStorage.setItem("login_state", 0);
    if (typeof localStorage.getItem("u") === "object") {
      if (typeof getUrlVars()["u"] !== "undefined") {
        localStorage.setItem("u", getUrlVars()["u"]);
        window.location.replace("http://client.fieldplus.gzonetechph.com/#/");
        // window.location.replace('http://localhost:3000');
      } else {
        console.log(localStorage.getItem("u"));
        localStorage.setItem("cookies", 1);
        window.location.replace(
          "https://accounts.workflow.gzonetechph.com/?goto=" +
            window.location +
            "&app=" +
            state.loginData.app_id
        );
      }
    }
  }, []);

  if (window.location.href.split("/")[4] === "map") {
    // console.log((window.location.href.split('/'))[4])
    return (
      // <Typography component={'div'} className="App">
      // <Typography component={'div'} className={classes.root}>
      <HashRouter>
        {/* <Navigation/> */}
        <Route path="/" component={Routing} />
      </HashRouter>
      // </Typography>
      // </Typography>
    );
  } else {
    return (
      // <Typography component={'div'} className="App">
      // <Typography component={'div'} className={classes.root}>
      <HashRouter>
        {/* <Navigation/>
        <main className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                    <div className={classes.drawerHeader} /> */}
        {/* <Typography component={'main'} className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}> */}
        {/* <Typography component={'div'} className={classes.drawerHeader} /> */}
        {/* <div className={classes.drawerHeader} /> */}
        <Route path="/" component={Routing} />
        <Route path="/testpage" component={TestPage} />
        {/* </main> */}
        {/* </Typography> */}
      </HashRouter>
      //   </Typography>
      // </Typography>
    );
  }
}
{
  /* <Typography component={'div'} className="App">
        <Typography component={'div'} className={classes.root}>
          <HashRouter>
            <Navigation />
            <Typography component={'main'} className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}>
              <Typography component={'div'} className={classes.drawerHeader} />
              <Route path="/" component={PageRoutes} />
            </Typography>
          </HashRouter>
        </Typography>
      </Typography> */
}
export default App;
