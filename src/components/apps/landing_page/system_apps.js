import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Fieldplusplus from "../../../../src/assets/map image/fieldplusplus.png";
import Glogo from "../../../../src/assets/map image/glogos.png";
import HR from "../../../../src/assets/map image/hr.png";
import "../../../App";
import useStyles from "../../../css/css";
import Fieldapps from "./field_apps";
function Index() {
  const classes = useStyles();
  const home_reducer = useSelector((state) => state.home_reducer);
  const navigation_reducer = useSelector((state) => state.navigation_reducer);
  const [state, setState] = React.useState({
    search: "",
  });
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  return (
    <div className={classes.root}>
      {home_reducer.field_apps === false ? (
        <Grid container spacing={6}>
          {String(navigation_reducer.userLoginData.app_access).includes(
            "Fieldplus"
          ) && (
            <Grid item xs={12} sm={12} md={2}>
              <Card className={classes.boxingshadow}>
                <CardActionArea
                  onClick={() => {
                    dispatch_data("field_apps", true);
                  }}
                >
                  <CardContent style={{ height: 200 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <img
                        src={Fieldplusplus}
                        style={{ width: "50%", height: "auto", margin: "auto" }}
                      />
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
          {String(navigation_reducer.userLoginData.app_access).includes(
            "Pockethr"
          ) && (
            <Grid item xs={12} sm={12} md={2}>
              <Card className={classes.boxingshadow}>
                <CardActionArea>
                  <a
                    href={"http://pockethr.gzonetechph.com/#/"}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <CardContent style={{ height: 200 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignContent: "center",
                          margin: "auto",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={HR}
                          style={{ width: "50%", height: "auto" }}
                        />
                      </div>
                    </CardContent>
                  </a>
                </CardActionArea>
              </Card>
            </Grid>
          )}
          {String(navigation_reducer.userLoginData.app_access).includes(
            "Greenmovers"
          ) && (
            <Grid item xs={12} sm={12} md={2}>
              <Card className={classes.boxingshadow}>
                <CardActionArea>
                  <a
                    href={"http://gzone21.gmoversph.com/#/"}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <CardContent style={{ height: 200 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <img
                          src={Glogo}
                          style={{
                            width: "50%",
                            height: "auto",
                            margin: "auto",
                          }}
                        />
                      </div>
                    </CardContent>
                  </a>
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>
      ) : (
        <Fieldapps />
      )}
    </div>
  );
}

export default Index;
