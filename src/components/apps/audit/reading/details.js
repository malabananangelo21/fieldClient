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
import Mapa from "../../map/map4";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import Carousel from "react-material-ui-carousel";
import BorderColorIcon from "@material-ui/icons/BorderColor";

const Details = (props) => {
  const { ...param } = props;
  console.log(param);
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
    <div>
      {param.selectedAccom.map((val, index) => {
        let images = [];
        if (val.accom_images !== "" && val.accom_images !== null) {
          images = JSON.parse(val.accom_images);
        }
        return (
          <Grid container spacing={1} key={index}>
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
                <Grid item xs={12} md={12}>
                  <Mapa />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography style={{ fontWeight: "bold" }}>
                    COMPARISON
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    style={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    label="Previous"
                    size="small"
                    variant="outlined"
                    readOnly
                    value={val.new_previous_reading}
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
                    value={val.audit_present_reading}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    style={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    label="Present"
                    size="small"
                    variant="outlined"
                    value={val.actual_reading}
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
                      val.audit_present_reading,
                      val.actual_reading
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    style={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    label="Meter Number"
                    size="small"
                    variant="outlined"
                    value={val.meter_no}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    style={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    label="Meter Type"
                    size="small"
                    variant="outlined"
                    value={val.meter_type}
                  />
                </Grid>
                <Grid container justify="flex-start" item xs={12} md={12}>
                  <Tooltip
                    onClick={param.onValidationDisplay}
                    title="View Validation"
                    style={{ cursor: "pointer", marginLeft: 10 }}
                  >
                    <BorderColorIcon />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#1b5ea0",
                    }}
                  >
                    VALIDATION
                  </Typography>
                </Grid>
                <Grid xs={12} md={12}>
                  <div
                    style={{
                      display: param.validationDisplay ? undefined : "none",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card variant="outlined" style={{ width: "100%" }}>
                      <CardContent>
                        <form onSubmit={param.onSubmitRemarks}>
                          <TextField
                            required
                            select
                            label="Select Status"
                            style={{ width: "100%" }}
                            name="validation_status"
                            value={param.validation_status}
                            onChange={param.onChangeText}
                          >
                            <MenuItem value="VALID">VALID</MenuItem>
                            <MenuItem value="INVALID">INVALID</MenuItem>
                          </TextField>
                          {param.validation_status === "INVALID" ? (
                            <>
                              <TextField
                                required
                                select
                                label="Findings"
                                style={{ width: "100%" }}
                                value={param.validation_remarks}
                                onChange={param.onChangeRemarks}
                              >
                                {param.field_findings.map((val_findings) => {
                                  if (
                                    val_findings.status ===
                                    param.validation_status
                                  )
                                    return (
                                      <MenuItem value={val_findings.findings}>
                                        {val_findings.findings}
                                      </MenuItem>
                                    );
                                })}
                              </TextField>
                              {param.category_remarks.length > 0 ? (
                                <TextField
                                  required
                                  select
                                  label="Remarks"
                                  style={{ width: "100%" }}
                                  value={param.validation_remarks_category}
                                  name="validation_remarks_category"
                                  onChange={param.onChangeRemarks}
                                >
                                  {param.category_remarks.map(
                                    (val_findings) => {
                                      return (
                                        <MenuItem value={val_findings}>
                                          {val_findings}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </TextField>
                              ) : undefined}

                              <div>
                                <TextareaAutosize
                                  onChange={param.onChangeText}
                                  name="validator_comment"
                                  aria-label="minimum height"
                                  minRows={4}
                                  placeholder="Enter your comment"
                                  style={{
                                    width: "100%",
                                    marginTop: 10,
                                    height: 40,
                                  }}
                                />
                              </div>
                            </>
                          ) : (
                            <div>
                              <TextareaAutosize
                                onChange={param.onChangeText}
                                name="validator_comment"
                                aria-label="minimum height"
                                minRows={4}
                                placeholder="Enter your comment"
                                style={{
                                  width: "100%",
                                  marginTop: 10,
                                  height: 40,
                                }}
                              />
                            </div>
                          )}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              onClick={param.onChangeRemarks}
                              variant="contained"
                              type="button"
                              style={{
                                backgroundColor: "#636e72",
                                color: "white",
                                marginTop: 15,
                                marginBottom: 15,
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              style={{
                                backgroundColor: "rgba(6,86,147)",
                                color: "white",
                                margin: 15,
                              }}
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  {(val.validator_remarks == "VALID" ||
                    val.validator_remarks == "INVALID") && (
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
                                    Validation
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  style={{ background: "#115293" }}
                                ></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {param.initialValidation.map((val2) => {
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
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
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
                            {param.branchFieldDtails.map((val2) => {
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
                </Grid>
                <Grid item xs={12} md={12}>
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
                          <TableBody>
                            {param.initialActual.map((val2) => {
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default React.memo(Details);
