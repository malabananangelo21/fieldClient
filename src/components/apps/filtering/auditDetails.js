import React from "react";
import {
  Grid,
  Breadcrumbs,
  Typography,
  Divider,
  Backdrop,
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Tooltip,
  MenuItem,
  TextareaAutosize,
} from "@material-ui/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import Carousel from "react-material-ui-carousel";
import BorderColorIcon from "@material-ui/icons/BorderColor";
let initial = [
  {
    name: "Fieldman",
    key: "completename",
  },
  {
    name: "Audit Reading",
    key: "present_reading",
  },
  //   {
  //     name: "Previous Reading",
  //     key: "new_previous_reading",
  //   },
  {
    name: "Date",
    key: "date_accomplished",
  },
];
let initialActual = [
  {
    name: "Fieldman",
    key: "completename",
  },
  {
    name: "Actual Reading",
    key: "present_reading",
  },
  {
    name: "Date",
    key: "date_accomplished",
  },
];
const AuditDetails = (props) => {
  const { ...param } = props;
  const discrepancy = (audit_reading, actual_reading) => {
    if (audit_reading == null) {
      audit_reading = 0;
    }
    if (actual_reading == null) {
      actual_reading = 0;
    }
    const discrepancy = parseInt(audit_reading) - actual_reading;
    return discrepancy;
  };
  return (
    <>
      {param.audit.map((val, index) => {
        let images = [];
        if (val.accom_images !== "" && val.accom_images !== null) {
          images = JSON.parse(val.accom_images);
        }
        return (
          <Grid container spacing={1} key={index}>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Audit</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Carousel style={{}} autoPlay={false}>
                    {images.map((images, index) => {
                      return (
                        <TransformWrapper
                          defaultScale={1}
                          defaultPositionX={200}
                          defaultPositionY={100}
                        >
                          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <React.Fragment>
                              <div
                                className="tools"
                                style={{
                                  position: "absolute",
                                  display: "flex",
                                  flexDirection: "row",

                                  marginTop: 10,
                                  marginLeft: 10,
                                  marginBottom: 10,
                                }}
                              >
                                <IconButton
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    borderStyle: "none",
                                    fontSize: 20,
                                    marginRight: 7,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40 / 2,
                                    // borderRadius: 3,
                                    outline: "none",
                                    zIndex: 999999999999999999,
                                  }}
                                  onClick={zoomIn}
                                >
                                  <AddIcon
                                    style={{
                                      color: "#fff",
                                      fontSize: 15,
                                    }}
                                  />
                                </IconButton>
                                <br />
                                <IconButton
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    borderStyle: "none",
                                    fontSize: 20,
                                    marginRight: 7,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40 / 2,
                                    // borderRadius: 3,
                                    outline: "none",
                                    zIndex: 999999999999999999,
                                  }}
                                  onClick={zoomOut}
                                >
                                  <RemoveIcon
                                    style={{
                                      color: "#fff",
                                      fontSize: 22,
                                    }}
                                  />
                                </IconButton>
                                <br />
                                <IconButton
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    borderStyle: "none",
                                    fontSize: 20,
                                    marginRight: 7,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40 / 2,
                                    // borderRadius: 3,
                                    outline: "none",
                                    zIndex: 999999999999999999,
                                  }}
                                  onClick={resetTransform}
                                >
                                  <ClearIcon
                                    style={{
                                      color: "#fff",
                                      fontSize: 22,
                                    }}
                                  />
                                </IconButton>
                                <IconButton
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    borderStyle: "none",
                                    fontSize: 20,
                                    marginRight: 7,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40 / 2,
                                    // borderRadius: 3,
                                    outline: "none",
                                    zIndex: 999999999999999999,
                                  }}
                                  onClick={param.leftRotate}
                                >
                                  <RotateLeftIcon
                                    style={{
                                      color: "#fff",
                                      fontSize: 22,
                                    }}
                                  />
                                </IconButton>
                                <IconButton
                                  style={{
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    borderStyle: "none",
                                    fontSize: 20,
                                    marginRight: 7,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40 / 2,
                                    zIndex: 999999999999999999,
                                  }}
                                  onClick={param.rightRotate}
                                >
                                  <RotateRightIcon
                                    style={{
                                      color: "#fff",
                                      fontSize: 22,
                                    }}
                                  />
                                </IconButton>
                              </div>
                              <TransformComponent style={{ zIndex: 999 }}>
                                <img
                                  // onClick={() => {
                                  //   onCLickImage(images);
                                  // }}
                                  src={
                                    "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                                    images.path
                                  }
                                  alt="test"
                                  style={{
                                    width: window.innerWidth * 0.5,
                                    height: window.innerHeight * 0.45,
                                    transform:
                                      "rotate(" + String(param.degree) + "deg)",
                                  }}
                                />
                              </TransformComponent>
                            </React.Fragment>
                          )}
                        </TransformWrapper>
                      );
                    })}
                  </Carousel>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                <Mapa />
              </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              {param.dataList.map((val3, index2) => {
                if (index2 == 0)
                  return (
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={3}>
                        <TextField
                          style={{ width: "100%" }}
                          InputLabelProps={{ shrink: true }}
                          label="Previous"
                          size="small"
                          variant="outlined"
                          readOnly
                          value={val3.previous_reading}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          style={{ width: "100%" }}
                          InputLabelProps={{ shrink: true }}
                          label="Audit"
                          size="small"
                          variant="outlined"
                          readOnly
                          value={val.present_reading}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          style={{ width: "100%" }}
                          InputLabelProps={{ shrink: true }}
                          label="Present"
                          size="small"
                          variant="outlined"
                          value={val3.present_reading}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          style={{ width: "100%" }}
                          InputLabelProps={{ shrink: true }}
                          label="Discrepancy"
                          size="small"
                          variant="outlined"
                          value={discrepancy(
                            val.present_reading,
                            val3.present_reading
                          )}
                        />
                      </Grid>
                    </Grid>
                  );
              })}

              <Card variant="outlined">
                <CardContent>
                  <TableContainer style={{ maxHeight: 490 }}>
                    <Table hover stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ background: "#115293" }}>
                            {" "}
                            <Typography
                              style={{
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#fff",
                              }}
                            >
                              Audit Details
                            </Typography>
                          </TableCell>
                          <TableCell
                            style={{ background: "#115293" }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {initial.map((val2) => {
                          const newValue = val[val2.key];
                          return (
                            <TableRow>
                              <TableCell style={{ fontWeight: 600 }}>
                                {String(val2.name).toLocaleUpperCase()}
                              </TableCell>
                              <TableCell>
                                {String(
                                  newValue == undefined ? "" : newValue
                                ).toLocaleUpperCase()}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent>
                  <TableContainer style={{ maxHeight: 490 }}>
                    <Table hover stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ background: "#115293" }}>
                            {" "}
                            <Typography
                              style={{
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#fff",
                              }}
                            >
                              Actual Details
                            </Typography>
                          </TableCell>
                          <TableCell
                            style={{ background: "#115293" }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      {param.dataList.map((val3, index2) => {
                        if (index2 == 0)
                          return (
                            <TableBody key={index2}>
                              {initialActual.map((val2) => {
                                const newValue = val3[val2.key];
                                return (
                                  <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                      {String(val2.name).toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                      {String(
                                        newValue == undefined ? "" : newValue
                                      ).toLocaleUpperCase()}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          );
                      })}
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default React.memo(AuditDetails);
