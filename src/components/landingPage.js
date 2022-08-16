import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import imgLogo from "../../src/components/media/field_logo.gif";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import gsap from "gsap";
import { getData, serverProfile } from "../../src/components/api/api";
import { HashRouter, Route, Redirect, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const height = window.innerHeight;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const appNav = useSelector((state) => state.navigation_reducer.appNav);
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [route, setRoute] = React.useState("map");
  const [readyToBeAnimated, setReadyToBeAnimated] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPriviledge = () => {
    appNav.forEach((val) => {
      if (val.href === "/realtime_charts/") {
        setRoute("realtime_charts");
      }
      setTimeout(() => {
        document.getElementById("logo").style.visibility = "visible";
        document.getElementById("logo").click();
      }, 500);
    });
  };
  function random(min, max) {
    const delta = max - min;
    return (direction = 1) => (min + delta * Math.random()) * direction;
  }

  React.useEffect(() => {
    getPriviledge();
  }, [appNav, readyToBeAnimated]);
  const routePage = () => {
    // document.getElementById("topNav").style.visibility = "visible";
    history.push("/" + route);
  };
  console.log();
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <DialogContent>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              onClick={() => {
                var tl = gsap.timeline({
                  onComplete: routePage,
                });
                gsap.set("#logo", {
                  scale: 0,
                  //   rotation: 0.01,
                  z: 0.01,
                  transformOrigin: "50% 50%",
                });
                tl.to("#logo", 2, { scale: 1 }).play();
              }}
              id="logo"
              src={imgLogo}
              //   onLoad={() => setReadyToBeAnimated(true)}
              style={{ width: 310, height: 100, visibility: "hidden" }}
            />
            <div style={{ width: 200, height: 150 }}></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
